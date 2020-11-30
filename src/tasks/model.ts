import { TaskCategory } from './task';

/**
 * Schema for `tasks.json`.
 */
export interface TaskManifest {
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
export interface TaskSpec {
  /**
   * Task name.
   */
  readonly name: string;

  /**
   * Task description.
   */
  readonly description?: string;

  /**
   * Task category.
   */
  readonly category?: TaskCategory;

  /**
   * Task steps.
   */
  readonly steps?: TaskStep[];

  /**
   * Task environment variables.
   */
  readonly env?: { [name: string]: string };
}

/**
 * A single step within a task. The step could either be  the execution of a
 * shell command or execution of a sub-task, by name.
 */
export interface TaskStep {
  /**
   * Shell command to execute
   */
  readonly exec?: string;

  /**
   * Subtask to execute
   */
  readonly subtask?: string;
}
