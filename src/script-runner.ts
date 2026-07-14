import { FutureComponent } from "./component";
import type { DependencyRequest } from "./dependencies";
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
 * A script runner that can produce the configuration to execute a file of a
 * particular type.
 */
export interface IScriptRunner {
  /**
   * Produce the configuration to run the given entrypoint.
   */
  configFor(entrypoint: string): RunScriptConfig;
}

/**
 * A script runner that executes the entrypoint file directly.
 *
 * A runner is a {@link FutureComponent}: it can be created standalone (e.g. in
 * `.projenrc.ts`) and is attached to a project by whoever consumes it.
 */
export class ScriptRunner extends FutureComponent implements IScriptRunner {
  public configFor(entrypoint: string): RunScriptConfig {
    return {
      dependencies: [],
      steps: [{ execArgs: [entrypoint] }],
    };
  }
}
