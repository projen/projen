import { Component } from '../component';
import { JsonFile } from '../json';
import { Project } from '../project';
import { TaskSpec } from './model';
import { Task, TaskOptions } from './task';

/**
 * Defines project tasks.
 *
 * Tasks extend the projen CLI by adding subcommands to it. Task definitions are
 * synthesized into `.projen/tasks.json`.
 */
export class Tasks extends Component {
  private readonly _tasks: { [name: string]: Task };

  constructor(project: Project) {
    super(project);

    this._tasks = {};

    new JsonFile(project, Task.MANIFEST_FILE, {
      marker: true,
      omitEmpty: true,
      obj: {
        tasks: () => this.renderTasks(),
      },
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
    const task = new Task(this, name, options);
    this._tasks[name] = task;
    return task;
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
}
