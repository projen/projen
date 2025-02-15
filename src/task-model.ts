/**
 * Schema for `tasks.json`.
 */
export interface TasksManifest {
  /**
   * All tasks available for this project.
   */
  readonly tasks?: { [name: string]: TaskSpec };

  /**
   * Environment for all tasks.
   */
  readonly env?: { [name: string]: string };
}

export interface TaskCommonOptions {
  /**
   * The description of this build command.
   * @default - the task name
   */
  readonly description?: string;

  /**
   * Defines environment variables for the execution of this task.
   * Values in this map will be evaluated in a shell, so you can do stuff like `$(echo "foo")`.
   * @default {}
   */
  readonly env?: { [name: string]: string };

  /**
   * A set of environment variables that must be defined in order to execute
   * this task. Task execution will fail if one of these is not defined.
   */
  readonly requiredEnv?: string[];

  /**
   * A shell command which determines if the this task should be executed. If
   * the program exits with a zero exit code, steps will be executed. A non-zero
   * code means that task will be skipped.
   */
  readonly condition?: string;

  /**
   * The working directory for all steps in this task (unless overridden by the
   * step).
   *
   * @default - process.cwd()
   */
  readonly cwd?: string;
}

/**
 * Specification of a single task.
 */
export interface TaskSpec extends TaskCommonOptions {
  /**
   * Task name.
   */
  readonly name: string;

  /**
   * Task steps.
   */
  readonly steps?: TaskStep[];
}

/**
 * Options for task steps.
 */
export interface TaskStepOptions {
  /**
   * Step name
   *
   * @default - no name
   */
  readonly name?: string;

  /**
   * The working directory for this step.
   *
   * @default - determined by the task
   */
  readonly cwd?: string;

  /**
   * A shell command which determines if the this step should be executed. If
   * the program exits with a zero exit code, the step will be executed. A non-zero
   * code means the step will be skipped (subsequent task steps will still be evaluated/executed).
   */
  readonly condition?: string;

  /**
   * Should this step receive args passed to the task.
   *
   * If `true`, args are passed through at the end of the `exec` shell command.\
   * The position of the args can be changed by including the marker `$@` inside the command string.
   *
   * If the marker is explicitly double-quoted ("$@") arguments will be wrapped in single quotes, approximating
   * the whitespace preserving behavior of bash variable expansion.
   *
   * If the step spawns a subtask, args are passed to the subtask.
   * The subtask must define steps receiving args for this to have any effect.
   *
   * @example task.exec("echo Hello $@ World!", { receiveArgs: true });
   *
   * @default false
   */
  readonly receiveArgs?: boolean;

  /**
   * A list of fixed arguments always passed to the step.
   *
   * Useful to re-use existing tasks without having to re-define the whole task.\
   * Fixed args are always passed to the step, even if `receiveArgs` is `false`
   * and are always passed before any args the task is called with.
   *
   * If the step executes a shell commands, args are passed through at the end of the `exec` shell command.\
   * The position of the args can be changed by including the marker `$@` inside the command string.
   *
   * If the step spawns a subtask, args are passed to the subtask.
   * The subtask must define steps receiving args for this to have any effect.
   *
   * If the step calls a builtin script, args are passed to the script.
   * It is up to the script to use or discard the arguments.
   *
   * @example task.spawn("deploy", { args: ["--force"] });
   *
   * @default - no arguments are passed to the step
   */
  readonly args?: string[];

  /**
   * Defines environment variables for the execution of this step (`exec` and `builtin` only).
   * Values in this map can be simple, literal values or shell expressions that will be evaluated at runtime e.g. `$(echo "foo")`.
   *
   * @example { "foo": "bar", "boo": "$(echo baz)" }
   *
   * @default - no environment variables defined in step
   */
  readonly env?: { [name: string]: string };
}

/**
 * A single step within a task. The step could either be  the execution of a
 * shell command or execution of a sub-task, by name.
 */
export interface TaskStep extends TaskStepOptions {
  /**
   * Shell command to execute
   *
   * @default - don't execute a shell command
   */
  readonly exec?: string;

  /**
   * Subtask to execute
   *
   * @default - don't spawn a subtask
   */
  readonly spawn?: string;

  /**
   * Print a message.
   * @default - don't say anything
   */
  readonly say?: string;

  /**
   * The name of a built-in task to execute.
   *
   * Built-in tasks are node.js programs baked into the projen module and as
   * component runtime helpers.
   *
   * The name is a path relative to the projen lib/ directory (without the .task.js extension).
   * For example, if your built in builtin task is under `src/release/resolve-version.task.ts`,
   * then this would be `release/resolve-version`.
   *
   * @default - do not execute a builtin task
   */
  readonly builtin?: string;
}
