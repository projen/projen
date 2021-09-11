import * as os from 'os';
import * as path from 'path';
import { resolve } from '../_resolve';
import { PROJEN_DIR } from '../common';
import { Component } from '../component';
import { JsonFile } from '../json';
import { Makefile } from '../makefile';
import { Project } from '../project';
import { sorted } from '../util';
import { TasksManifest, TaskSpec } from './model';
import { Task, TaskOptions } from './task';

export interface TasksOptions {
  /**
   * Whether to render the tasks as a Makefile.
   * @default false
   */
  readonly makefile?: boolean;
}

/**
 * Defines project tasks.
 *
 * Tasks extend the projen CLI by adding subcommands to it. Task definitions are
 * synthesized into `.projen/tasks.json`.
 */
export class Tasks extends Component {
  /**
   * The project-relative path of the tasks manifest file.
   */
  public static readonly MANIFEST_FILE = path.posix.join(PROJEN_DIR, 'tasks.json');

  private readonly _tasks: { [name: string]: Task };
  private readonly _env: { [name: string]: string };

  private readonly makefile?: Makefile;

  constructor(project: Project, options: TasksOptions = {}) {
    super(project);

    const manifestFile = Tasks.MANIFEST_FILE;
    this._tasks = {};
    this._env = {};

    if (options.makefile ?? false) {
      this.makefile = new Makefile(project, 'Makefile', { prelude: ['.ONESHELL:'] });
    }

    new JsonFile(project, manifestFile, {
      omitEmpty: true,
      obj: {
        tasks: (() => this.renderTasks()) as any,
        env: (() => this._env) as any,
      } as TasksManifest,
    });
  }

  /**
   * All tasks.
   */
  public get all() {
    return Object.values(this._tasks);
  }

  /**
   * Adds a task to a project.
   * @param name The name of the task
   * @param options Task options.
   */
  public addTask(name: string, options: TaskOptions = {}) {
    const task = new Task(name, options);
    if (this._tasks[name]) {
      throw new Error(`A task with the name ${name} already exists. To override it, call removeTask first and then create the new task.`);
    }
    this._tasks[name] = task;
    return task;
  }

  /**
   * Removes a task from a project.
   *
   * @param name The name of the task to remove.
   *
   * @returns The `Task` that was removed, otherwise `undefined`.
   */
  public removeTask(name: string): undefined | Task {
    const dependentTasks = this.all.filter(task => task.steps.find(step => step.spawn == name));
    if (dependentTasks.length > 0) {
      const errList = dependentTasks.map(depTask => depTask.name).join(', ');
      throw new Error(`Unable to remove task "${name}" because the following tasks depend on it: ${errList}`);
    }

    const task = this._tasks[name];
    if (task) {
      delete this._tasks[name];
      return task;
    } else {
      return undefined;
    }
  }

  /**
   * Adds global environment.
   * @param name Environment variable name
   * @param value Value
   */
  public addEnvironment(name: string, value: string) {
    this._env[name] = value;
  }

  /**
   * Returns a copy of the currently global environment for this project.
   */
  public get env(): { [key: string]: string } {
    return {
      ...this._env,
    };
  }

  /**
   * Finds a task by name. Returns `undefined` if the task cannot be found.
   * @param name The name of the task
   */
  public tryFind(name: string): undefined | Task {
    return this._tasks[name];
  }

  private renderTasks() {
    const tasks: { [name: string]: TaskSpec } = {};
    for (const task of Object.values(this._tasks)) {
      tasks[task.name] = task._renderSpec();
    }

    return sorted(tasks);
  }

  /**
   * Obtains the full runtime environment for a task. This defers evaluation of
   * values using the $(xx) syntax.
   */
  public getFullEnvironment(task: Task): { [name: string]: string | undefined } {
    return {
      ...this._env,
      ...task._renderSpec().env,
    };
  }

  private renderTaskAsRecipe(task: Task): string[] {
    const recipe: string[] = [];

    recipe.push(`@echo [info] Running task \\"${task.name}\\"...`);

    const env = this.getFullEnvironment(task);
    for (const [key, value] of Object.entries(env)) {
      if (value === undefined) {
        // do nothing
      } else if (value.startsWith('$(') && value.endsWith(')')) {
        const query = value.substring(2, value.length - 1);
        recipe.push(`export ${key}=$(shell ${sanitize(query)})`);
      } else {
        recipe.push(`export ${key}=${sanitize(value)}`);
      }
    }

    for (const step of task.steps) {
      if (step.say) {
        recipe.push(`@echo [info] ${sanitize(step.say)}`);
      }

      if (step.spawn) {
        recipe.push(`make ${step.spawn}`); // use $(MAKE) here?
      }

      if (step.builtin) {
        recipe.push(this.renderBuiltin(step.builtin));
      }

      const execs = step.exec ? [step.exec] : [];

      for (let exec of execs) {
        exec = resolve(exec);

        let command = '';
        const cmd = exec.split(' ')[0];
        if (os.platform() == 'win32' && ['mkdir', 'mv', 'rm'].includes(cmd)) {
          command = `shx ${exec}`;
        } else {
          command = exec;
        }
        const cwd = step.cwd;
        if (cwd) {
          command = `(cd ${cwd} && ${command})`;
        }
        recipe.push(sanitize(command));
      }
    }
    return recipe;
  }

  synthesize() {
    if (this.makefile) {
      const tasks = sorted(this._tasks) ?? {};
      for (let [name, task] of Object.entries(tasks)) {

        // Make doesn't like : in the middle of target names
        name = name.replace(/:/g, '-');

        this.makefile.addRule({
          targets: [name],
          recipe: this.renderTaskAsRecipe(task),
          description: task.description ?? 'No description',
          phony: true,
        });
      }

      if (!('help' in this._tasks)) {
        this.makefile.addAll('help');
        this.makefile.addRule({
          targets: ['help'],
          recipe: [sanitize('@echo "\\033[1;39mCOMMANDS:\\033[0m"; grep -E \'^[a-zA-Z_-]+:.*?## .*$$\' $(MAKEFILE_LIST) | sort | awk \'BEGIN {FS = ":.*?## "}; {printf "\t\\033[32m%-30s\\033[0m %s\n", $$1, $$2}\'')],
          description: 'Show help messages for make targets',
          phony: true,
        });
      }
    }
  }

  private renderBuiltin(builtin: string) {
    const moduleRoot = path.dirname(require.resolve('../../package.json'));
    const absolutePath = require.resolve(path.join(moduleRoot, 'lib', `${builtin}.task.js`));
    const relativePath = path.relative(this.project.outdir, absolutePath);
    return `node ${relativePath}`;
  }
}

function sanitize(value: string) {
  // we do not want "\n" or "\t" in tasks to generate actual new lines or tabs in Makefiles
  value = value.replace(/\n/g, '\\n');
  value = value.replace(/\t/g, '\\t');
  return value;
}
