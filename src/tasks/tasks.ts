import * as os from 'os';
import * as path from 'path';
import { resolve } from '../_resolve';
import { PROJEN_DIR } from '../common';
import { Component } from '../component';
import { JsonFile } from '../json';
import { Makefile } from '../makefile';
import { Project } from '../project';
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

    if (options.makefile) {
      this.makefile = new Makefile(project, 'Makefile');
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

    return tasks;
  }

  /**
   * Obtains the full runtime environment for a task. This defers evaluation of
   * values using the $(xx) syntax.
   */
  public getFullEnvironment(task: Task) {
    let env = this._env ?? {};

    env = {
      ...env,
      ...task._renderSpec().env ?? {},
    };

    return env;
  }

  private renderTaskAsRecipe(task: Task): string[] {
    const recipe: string[] = [];

    const env = this.getFullEnvironment(task);
    for (const [key, value] of Object.entries(env)) {
      recipe.push(`export ${key}=${value}`);
    }

    for (const step of task.steps) {
      if (step.say) {
        recipe.push(`echo ${step.say}`);
      }

      if (step.spawn) {
        recipe.push(`make ${step.spawn}`); // use $(MAKE) here?
      }

      if (step.builtin) {
        recipe.push(renderBuiltin(step.builtin));
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
        recipe.push(command);
      }
    }
    return recipe;
  }

  preSynthesize() {
    if (this.makefile) {
      for (let [name, task] of Object.entries(this._tasks)) {

        // Make doesn't like : in the middle of target names
        name = name.replace(/:/g, '-');

        this.makefile.addAll(name);
        this.makefile.addRule({
          targets: [name],
          recipe: this.renderTaskAsRecipe(task),
          phony: true,
        });
      }
    }
  }
}

function renderBuiltin(builtin: string) {
  const moduleRoot = path.dirname(require.resolve('../../package.json'));
  const program = require.resolve(path.join(moduleRoot, 'lib', `${builtin}.task.js`));
  return `${process.execPath} ${program}`;
}
