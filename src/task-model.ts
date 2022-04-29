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
   * A list of glob patterns representing input files for the task. Used to
   * determine the cache key if `wireit` is enabled in a node project. Specify an
   * empty array if it does not depend on any files.
   */
  readonly inputs?: string[];

  // TODO
  readonly outputs?: string[];

  /**
   * @default false
   */
  readonly clean?: boolean;

  /**
   * Names of tasks that this task depends on.
   */
  readonly dependencies?: string[];

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
