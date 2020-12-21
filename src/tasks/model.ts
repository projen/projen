import { TaskCommonOptions } from './task';

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
   * Environment variables for this step.
   * @default - inherited from the task
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
  readonly execTask?: string;

  /**
   * Environment variabbles for this step.
   * @default - inherit
   */
  readonly env?: { [name: string]: string };
}
