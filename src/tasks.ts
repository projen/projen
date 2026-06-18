import * as fs from "fs";
import * as path from "path";
import { Component } from "./component";
import type { IResolver } from "./file";
import { warn } from "./logging";
import type { Project } from "./project";
import type { TaskOptions } from "./task";
import { Task } from "./task";
import type { TasksManifest, TaskSpec } from "./task-model";
import { ProjenTaskRunner, type ITaskRunner } from "./task-runner";

/**
 * Defines and manages project tasks.
 *
 * Tasks extend the projen CLI by adding subcommands to it. Task definitions are
 * synthesized into `.projen/tasks.json`.
 */
export class Tasks extends Component {
  private readonly _tasks: { [name: string]: Task };
  private readonly _env: { [name: string]: string };
  private _runner: ITaskRunner;

  constructor(project: Project) {
    super(project);

    this._tasks = {};
    this._env = {};

    // Eagerly create the default task runner. The runner is a component that
    // owns the `.projen/tasks.json` manifest, so it must be part of the
    // construct tree for the manifest to be synthesized.
    this._runner = new ProjenTaskRunner(this);
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
      throw new Error(
        `A task with the name ${name} already exists. To override it, call removeTask first and then create the new task.`,
      );
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
    const dependentTasks = this.all.filter((task) =>
      task.steps.find((step) => step.spawn == name),
    );
    if (dependentTasks.length > 0) {
      const errList = dependentTasks.map((depTask) => depTask.name).join(", ");
      throw new Error(
        `Unable to remove task "${name}" because the following tasks depend on it: ${errList}`,
      );
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

  /**
   * Runs the specified task.
   *
   * @param name The name of the task to run.
   * @param args Arguments to pass to the task.
   */
  public runTask(name: string, args?: (string | number)[]) {
    const task = this._tasks[name];
    if (!task) {
      throw new Error(`cannot find command ${name}`);
    }
    this._runner.runTask(task, args);
  }

  public synthesize(): void {
    if (this.project.ejected) {
      // Insert a task-runner script so that tasks can be run after ejecting
      fs.mkdirSync(path.join(this.project.outdir, "scripts"), {
        recursive: true,
      });
      fs.copyFileSync(
        // The bundled task runner lives at <pkg>/lib/run-task.cjs. This file is
        // at src/ (ts-jest) or lib/ (compiled); in both cases
        // "../lib/run-task.cjs" resolves to the real bundle under lib/.
        path.join(__dirname, "..", "lib", "run-task.cjs"),
        path.join(this.project.outdir, "scripts", "run-task.cjs"),
      );
      fs.chmodSync(
        path.join(this.project.outdir, "scripts", "run-task.cjs"),
        "755",
      );
    }
  }

  public resolveTasksManifest(resolver: IResolver): TasksManifest {
    const obj = {
      env: (() => this.renderEnv()) as any,
      tasks: (() => this.renderTasks()) as any,
    };

    return (
      resolver.resolve(obj, {
        omitEmpty: true,
      }) ?? undefined
    );
  }

  private renderTasks() {
    const tasks: { [name: string]: TaskSpec } = {};
    for (const task of Object.values(this._tasks).sort((x, y) =>
      x.name.localeCompare(y.name),
    )) {
      tasks[task.name] = task._renderSpec();
    }

    return tasks;
  }

  private renderEnv() {
    return Object.keys(this._env).reduce(
      (prev, curr) => ({
        ...prev,
        [curr]: this.getEnvString(curr, this._env[curr]),
      }),
      {},
    );
  }

  /**
   * Ensure that environment variables are persisted as strings
   * to prevent type errors when parsing from tasks.json in future
   */
  private getEnvString(name: string, value: any) {
    if (typeof value !== "string" && value !== undefined) {
      warn(
        `Received non-string value for environment variable ${name}. Value will be stringified.`,
      );
      return String(value);
    } else {
      return value;
    }
  }
}
