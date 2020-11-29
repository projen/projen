import { join } from 'path';
import { PROJEN_DIR } from '../common';
import { TaskSpec, TaskStep } from './model';
import { Tasks } from './tasks';

export interface TaskOptions {
  /**
   * The description of this build command.
   * @default - the task name
   */
  readonly description?: string;

  /**
   * Category for start menu.
   *
   * @default TaskCategory.MISC
   */
  readonly category?: TaskCategory;

  /**
   * Defines environment variables for the execution of this task.
   * Values in this map will be evaluated in a shell, so you can do stuff like `$(echo "foo")`.
   * @default {}
   */
  readonly env?: { [name: string]: string };

  /**
   * A shell command which determines if the steps of this task should be
   * skipped. If the program exits with a zero exit code, steps will be skipped.
   * A non-zero code means that task should be executed.
   */
  readonly skipIf?: string;

  /**
   * Shell command to execute as the first command of the task.
   * @default - add commands using `task.add()` or `task.addSubtask()`
   */
  readonly exec?: string;
}

/**
 * A task that can be performed on the project. Modeled as a series of shell
 * commands and subtasks.
 */
export class Task {
  /**
   * The manifest file where all tasks are declared.
   */
  public static readonly MANIFEST_FILE = join(PROJEN_DIR, 'tasks.json');

  /**
   * Task name.
   */
  public readonly name: string;

  /**
   * The description of the task.
   */
  public readonly description?: string;

  /**
   * The start menu category of the task.
   */
  public readonly category?: TaskCategory;

  /**
   * Project task list.
   */
  public readonly tasks: Tasks;

  private readonly _steps: TaskStep[];
  private readonly _env: { [name: string]: string };

  constructor(tasks: Tasks, name: string, props: TaskOptions = { }) {
    this.tasks = tasks;
    this.name = name;
    this.description = props.description;
    this.category = props.category;

    this._env = props.env ?? {};
    this._steps = [];

    if (props.exec) {
      this.exec(props.exec);
    }
  }

  /**
   * Reset the task so it no longer has any commands.
   * @param command the first command to add to the task after it was cleared.
  */
  public reset(command?: string) {
    while (this._steps.length) {
      this._steps.shift();
    }

    if (command) {
      this.exec(command);
    }
  }

  /**
   * Executes a shell command
   * @param command Shell command
   */
  public exec(command: string) {
    this._steps.push({ exec: command });
  }

  /**
   * Adds a command at the beginning of the task.
   * @param shell The command to add.
   */
  public prepend(shell: string) {
    this._steps.unshift({
      exec: shell,
    });
  }

  /**
   * Runs a sub-task.
   * @param subtask The subtask to execute.
   */
  public subtask(subtask: Task) {
    this._steps.push({ subtask: subtask.name });
  }

  /**
   * Adds an environment variable to this task.
   * @param name The name of the variable
   * @param value The value. If the value is surrounded by `$()`, we will
   * evaluate it within a subshell and use the result as the value of the
   * environment variable.
   */
  public env(name: string, value: string) {
    this._env[name] = value;
  }

  /**
   * Returns an immutable copy of all the step specifications of the task.
   */
  public get steps() {
    return [...this._steps];
  }

  /**
   * Renders a task spec into the manifest.
   *
   * @internal
   */
  public _renderSpec(): TaskSpec {
    return {
      name: this.name,
      category: this.category,
      description: this.description,
      env: this._env,
      steps: this._steps,
    };
  }
}

export enum TaskCategory {
  BUILD = '00.build',
  TEST = '10.test',
  RELEASE = '20.release',
  MAINTAIN = '30.maintain',
  MISC = '99.misc',
}
