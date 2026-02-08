import * as fs from "fs";
import * as path from "path";
import { Component } from "./component";
import { JsonFile } from "./json";
import { warn } from "./logging";
import { Project } from "./project";
import { Task, TaskOptions } from "./task";
import { TasksManifest, TaskSpec } from "./task-model";
import { TaskRuntime } from "./task-runtime";

/**
 * Defines project tasks.
 *
 * Tasks extend the projen CLI by adding subcommands to it. Task definitions are
 * synthesized into `.projen/tasks.json`.
 */
export class Tasks extends Component {
  private readonly _tasks: { [name: string]: Task };
  private readonly _env: { [name: string]: string };

  constructor(project: Project) {
    super(project);

    this._tasks = {};
    this._env = {};

    new JsonFile(project, TaskRuntime.MANIFEST_FILE, {
      omitEmpty: true,
      obj: {
        tasks: (() => this.renderTasks()) as any,
        env: (() => this.renderEnv()) as any,
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

  public synthesize(): void {
    if (this.project.ejected) {
      // Insert a task-runner script so that tasks can be run after ejecting
      fs.mkdirSync(path.join(this.project.outdir, "scripts"), {
        recursive: true,
      });
      fs.copyFileSync(
        path.join(__dirname, "..", "lib", "run-task.cjs"),
        path.join(this.project.outdir, "scripts", "run-task.cjs"),
      );
      fs.chmodSync(
        path.join(this.project.outdir, "scripts", "run-task.cjs"),
        "755",
      );
    }
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
