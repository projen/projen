import type { DependencyRequest } from "./dependencies";
import type { Project } from "./project";
import type { TaskStep } from "./task-model";

/**
 * The resolved configuration for running a script.
 */
export interface RunScriptConfig {
  /**
   * Dependencies required to run the script.
   */
  readonly dependencies: DependencyRequest[];

  /**
   * The task steps to execute the script.
   */
  readonly steps: TaskStep[];
}

/**
 * A script runner that can execute files of a particular type.
 */
export interface IScriptRunner {
  /**
   * Bind the runner to a project and entrypoint, producing a resolved config.
   */
  bind(project: Project, entrypoint: string): RunScriptConfig;
}

/**
 * A script runner that executes the entrypoint file directly.
 */
export class ScriptRunner implements IScriptRunner {
  public bind(_project: Project, entrypoint: string): RunScriptConfig {
    return {
      dependencies: [],
      steps: [{ exec: entrypoint }],
    };
  }
}
