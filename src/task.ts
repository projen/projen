import { warn } from "./logging";
import {
  TaskCommonOptions,
  TaskSpec,
  TaskStep,
  TaskStepOptions,
} from "./task-model";

export interface TaskOptions extends TaskCommonOptions {
  /**
   * Shell command to execute as the first command of the task.
   * @default - add steps using `task.exec(command)` or `task.spawn(subtask)`
   */
  readonly exec?: string;

  /**
   * List of task steps to run.
   */
  readonly steps?: TaskStep[];

  /**
   * Should the provided `exec` shell command receive args passed to the task.
   * @see {@link TaskStepOptions.receiveArgs}
   *
   * @default false
   */
  readonly receiveArgs?: boolean;
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
   * A command to execute which determines if the task should be skipped. If it
   * returns a zero exit code, the task will not be executed.
   */
  public readonly condition?: string;

  private readonly _steps: TaskStep[];
  private readonly _env: { [name: string]: string };
  private readonly cwd?: string;
  private readonly requiredEnv?: string[];
  private _locked: boolean;
  private _description?: string;

  constructor(name: string, props: TaskOptions = {}) {
    this.name = name;
    this._description = props.description;
    this.condition = props.condition;
    this.cwd = props.cwd;
    this._locked = false;
    this._env = {};

    this.addEnv(props.env ?? {});

    this._steps = props.steps ?? [];
    this.requiredEnv = props.requiredEnv;

    if (props.exec && props.steps) {
      throw new Error("cannot specify both exec and steps");
    }

    if (props.exec) {
      this.exec(props.exec, { receiveArgs: props.receiveArgs });
    }
  }

  /**
   * Forbid additional changes to this task.
   */
  public lock() {
    this._locked = true;
  }

  /**
   * Returns the description of this task.
   */
  public get description(): string | undefined {
    return this._description;
  }

  /**
   * Sets the description of this task.
   */
  public set description(desc: string | undefined) {
    this._description = desc;
  }

  /**
   * Reset the task so it no longer has any commands.
   * @param command the first command to add to the task after it was cleared.
   */
  public reset(command?: string, options: TaskStepOptions = {}) {
    this.assertUnlocked();

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
  public exec(command: string, options: TaskStepOptions = {}) {
    this.assertUnlocked();
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
    this.assertUnlocked();
    this._steps.push({ builtin: name });
  }

  /**
   * Say something.
   * @param message Your message
   * @param options Options
   */
  public say(message: string, options: TaskStepOptions = {}) {
    this.assertUnlocked();
    this._steps.push({ say: message, ...options });
  }

  /**
   * Adds a command at the beginning of the task.
   * @param shell The command to add.
   *
   * @deprecated use `prependExec()`
   */
  public prepend(shell: string, options: TaskStepOptions = {}) {
    this.assertUnlocked();
    this.prependExec(shell, options);
  }

  /**
   * Spawns a sub-task.
   * @param subtask The subtask to execute.
   */
  public spawn(subtask: Task, options: TaskStepOptions = {}) {
    this.assertUnlocked();
    this._steps.push({ spawn: subtask.name, ...options });
  }

  /**
   * Adds a command at the beginning of the task.
   * @param shell The command to add.
   */
  public prependExec(shell: string, options: TaskStepOptions = {}) {
    this.assertUnlocked();
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
    this.assertUnlocked();
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
    this.assertUnlocked();
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
    this.assertUnlocked();
    this.addEnv({ [name]: value });
  }

  /**
   * Returns an immutable copy of all the step specifications of the task.
   */
  public get steps() {
    // If the list of steps is a Lazy value, we can't know what the steps
    // are until synthesis occurs, so just return an empty array.
    if (!Array.isArray(this._steps)) {
      return [];
    }
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
      requiredEnv: this.requiredEnv,
      steps: this._steps,
      condition: this.condition,
      cwd: this.cwd,
    };
  }

  private assertUnlocked() {
    if (this._locked) {
      throw new Error(`Task "${this.name}" is locked for changes`);
    }
  }

  private addEnv(env: { [name: string]: string }) {
    Object.entries(env).forEach(([name, value]) => {
      if (typeof value !== "string" && value !== undefined) {
        warn(
          `Received non-string value for environment variable ${name}. Value will be stringified.`
        );
        this._env[name] = String(value);
      } else {
        this._env[name] = value;
      }
    });
  }
}
