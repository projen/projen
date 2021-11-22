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

/**
 * Engine to use for running tasks.
 */
export enum TasksEngine {
  /**
   * Run tasks using projen's built-in runtime.
   */
  PROJEN_RUNTIME = 'projen-runtime',

  /**
   * Run tasks using the unix `make` build automation tool.
   */
  MAKE = 'make',
}

export interface TasksOptions {
  /**
   * Engine to use for running tasks.
   * @default TasksEngine.PROJEN_RUNTIME;
   */
  readonly engine?: TasksEngine;
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

  /**
   * Engine used for running tasks.
   */
  public readonly engine: TasksEngine;

  private readonly _tasks: { [name: string]: Task };
  private readonly _env: { [name: string]: string };

  private readonly makefile?: Makefile;

  constructor(project: Project, options: TasksOptions = {}) {
    super(project);

    const manifestFile = Tasks.MANIFEST_FILE;
    this._tasks = {};
    this._env = {};

    this.engine = options.engine ?? TasksEngine.PROJEN_RUNTIME;

    if (this.engine === TasksEngine.MAKE) {
      this.makefile = new Makefile(project, 'Makefile');
    } else if (this.engine === TasksEngine.PROJEN_RUNTIME) {
      new JsonFile(project, manifestFile, {
        omitEmpty: true,
        obj: {
          tasks: (() => this.renderTasksToJson()) as any,
          env: (() => this._env) as any,
        } as TasksManifest,
      });
    }
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

  private renderTasksToJson() {
    const tasks: { [name: string]: TaskSpec } = {};
    for (const task of Object.values(this._tasks).sort((x, y) => x.name.localeCompare(y.name))) {
      tasks[task.name] = task._renderSpec();
    }

    return sorted(tasks);
  }

  synthesize() {
    if (this.makefile) {
      this.renderTasksToMakefile(this.makefile, this._tasks);
    }
  }

  private getFullEnvironment(task: Task): { [name: string]: string } {
    return {
      ...this._env,
      ...task._renderSpec().env,
    };
  }

  private renderTaskAsRecipe(task: Task): string[] {
    const recipe: string[] = [];

    recipe.push(`@>&2 echo 🤖 Running task ${green(task.name)}...`);

    recipe.push('set -e'); // ensure task fails if any step fails

    const taskCwd = task._renderSpec().cwd ?? '$(ROOT)';

    if (task.condition) {
      recipe.push(`cd ${taskCwd}`);
      recipe.push(`${sanitizeCommand(task.condition)} || { >&2 echo "condition exited with non-zero - exiting" && exit 0; }`);
    }

    const env = this.getFullEnvironment(task);
    for (const [key, value] of Object.entries(env)) {
      if (value === undefined) { // values may be undefined
        // do nothing
      } else {
        // variable must be exported for sub-tasks to inherit this variable
        recipe.push(`export ${key}=${sanitizeCommand(value)}`);
      }
    }

    for (const step of task.steps) {
      if (step.cwd) {
        recipe.push(`cd ${step.cwd}`);
      } else {
        recipe.push(`cd ${taskCwd}`);
      }

      if (step.say) {
        recipe.push(`>&2 echo ${sanitizeCommand(step.say)}`);
      }

      if (step.spawn) {
        recipe.push(`make ${sanitizeTaskName(step.spawn)}`);
      }

      if (step.builtin) {
        recipe.push(this.renderBuiltin(step.builtin));
      }

      if (step.exec) {
        const exec = resolve(step.exec);
        let command = exec;
        const cwd = step.cwd;
        if (cwd) {
          command = `(cd ${cwd} && ${command})`;
        }
        recipe.push(sanitizeCommand(command));
      }
    }

    recipe.push(`>&2 echo 🤖 Finished task ${green(task.name)}.`);
    return recipe;
  }

  private renderTasksToMakefile(makefile: Makefile, tasks: { [name: string]: Task }) {
    tasks = sorted(tasks) ?? {};

    for (let [name, task] of Object.entries(tasks)) {
      makefile.addRule({
        targets: [sanitizeTaskName(name)],
        recipe: this.renderTaskAsRecipe(task).map((step) => `${step} ;\\`),
        description: task.description ?? 'No description',
        phony: true,
      });
    }

    if (!('help' in this._tasks)) {
      makefile.addRule({
        targets: ['help'],
        recipe: ['@echo "\\033[1;39mCOMMANDS:\\033[0m"; grep -E \'^[a-zA-Z_-]+:.*?## .*$$\' $(MAKEFILE_LIST) | sort | awk \'BEGIN {FS = ":.*?## "}; {printf "\\t\\033[32m%-30s\\033[0m %s\\n", $$1, $$2}\''],
        description: 'Show help messages for make targets',
        phony: true,
      });
    }

    // determine what runs when "make" is executed with no arguments
    if ('default' in this._tasks) {
      makefile.addAll('default');
    } else {
      makefile.addAll('help');
    }

    // in Makefiles, each line in a recipe is run as a new child process
    // adding this special target will export variables to child processes
    // makefile.addPrelude('.EXPORT_ALL_VARIABLES:');
    makefile.addPrelude('ROOT := $(abspath $(dir $(firstword $(MAKEFILE_LIST))))');
  }

  private renderBuiltin(builtin: string) {
    const moduleRoot = path.dirname(require.resolve('../../package.json'));
    const absolutePath = require.resolve(path.join(moduleRoot, 'lib', `${builtin}.task.js`));
    const relativePath = path.relative(this.project.outdir, absolutePath);
    return `node ${relativePath}`;
  }
}

function green(value: string) {
  return `\\\\033[32m${value}\\\\033[0m`;
}

export function sanitizeTaskName(name: string) {
  // Make doesn't allow ":" within target names
  return name.replace(/:/g, '-');
}

function sanitizeCommand(value: string) {
  // we do not want "\n" or "\t" in commands to generate actual new lines or tabs in Makefiles
  value = value.replace(/\n/g, '\\n');
  value = value.replace(/\t/g, '\\t');

  // $(command) and $VAR have special meanings in Makefiles and get handled by
  // the Makefile preprocessor - so we escape them as $$(command) and $$VAR
  value = value.replace(/\$/g, '$$$$');
  return value;
}
