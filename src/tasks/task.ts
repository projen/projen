import { TaskCommonOptions, TaskSpec, TaskStep, TaskStepOptions } from './model';

export interface TaskOptions extends TaskCommonOptions {
  /**
   * Shell command to execute as the first command of the task.
   * @default - add steps using `task.exec(command)` or `task.spawn(subtask)`
   */
  readonly exec?: string;
}

/**
 * A task that can be performed on the project. Modeled as a series of shell
 * commands and subtasks.
 */
export class Task {
  /**
   * Task name.
   */
  public readonly name: string;

  /**
   * The description of the task.
   */
  public readonly description?: string;

  /**
   * A command to execute which determines if the task should be skipped. If it
   * returns a zero exit code, the task will not be executed.
   */
  public readonly condition?: string;

  private readonly _steps: TaskStep[];
  private readonly _env: { [name: string]: string };
  private readonly cwd?: string;

  constructor(name: string, props: TaskOptions = { }) {
    this.name = name;
    this.description = props.description;
    this.condition = props.condition;
    this.cwd = props.cwd;

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
  public reset(command?: string, options: TaskStepOptions = { }) {
    while (this._steps.length) {
      this._steps.shift();
    }

    if (command) {
      this.exec(command, options);
    }
  }

  /**
   * Executes a shell command
   * @param command Shell command
   * @param options Options
   */
  public exec(command: string, options: TaskStepOptions = { }) {
    this._steps.push({ exec: command, ...options });
  }

  /**
   * Execute a builtin task.
   *
   * Builtin tasks are programs bundled as part of projen itself and used as
   * helpers for various components.
   *
   * In the future we should support built-in tasks from external modules.
   *
   * @param name The name of the builtin task to execute (e.g.
   * `release/resolve-version`).
   */
  public builtin(name: string) {
    this._steps.push({ builtin: name });
  }

  /**
   * Say something.
   * @param message Your message
   * @param options Options
   */
  public say(message: string, options: TaskStepOptions = { }) {
    this._steps.push({ say: message, ...options });
  }

  /**
   * Adds a command at the beginning of the task.
   * @param shell The command to add.
   *
   * @deprecated use `prependExec()`
   */
  public prepend(shell: string, options: TaskStepOptions = {}) {
    this.prependExec(shell, options);
  }

  /**
   * Spawns a sub-task.
   * @param subtask The subtask to execute.
   */
  public spawn(subtask: Task, options: TaskStepOptions = {}) {
    this._steps.push({ spawn: subtask.name, ...options });
  }

  /**
   * Adds a command at the beginning of the task.
   * @param shell The command to add.
   */
  public prependExec(shell: string, options: TaskStepOptions = {}) {
    this._steps.unshift({
      exec: shell,
      ...options,
    });
  }

  /**
   * Adds a spawn instruction at the beginning of the task.
   * @param subtask The subtask to execute.
   */
  public prependSpawn(subtask: Task, options: TaskStepOptions = {}) {
    this._steps.unshift({
      spawn: subtask.name,
      ...options,
    });
  }

  /**
   * Says something at the beginning of the task.
   * @param message Your message
   */
  public prependSay(message: string, options: TaskStepOptions = {}) {
    this._steps.unshift({
      say: message,
      ...options,
    });
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
      description: this.description,
      env: this._env,
      steps: this._steps,
      condition: this.condition,
      cwd: this.cwd,
    };
  }
}
