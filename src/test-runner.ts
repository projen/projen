import { FutureComponent } from "./component";
import type { DependencyRequest } from "./dependencies";
import type { TaskStep } from "./task-model";

export interface TestMatchOptions {
  readonly defaultValue: string[];
}

/**
 * Glob patterns matching the files that contain tests.
 */
export class TestMatch {
  private readonly _patterns = new Set<string>();
  private readonly _defaultValue;

  constructor(options: TestMatchOptions) {
    this._defaultValue = options.defaultValue;
  }

  /**
   * Adds a test match pattern.
   * @param pattern glob pattern to match for tests
   */
  public add(pattern: string) {
    this._patterns.add(pattern);
  }

  /**
   * Removes a test match pattern, if configured.
   * @param pattern glob pattern to remove
   */
  public remove(pattern: string) {
    this._patterns.delete(pattern);
  }

  /**
   * Lazily resolved, so that `TestMatch` (via `add`/ `remove`) can
   * still be changed after construction and be reflected here.
   */
  public deferred(): string[] {
    return this._patterns.size > 0
      ? Array.from(this._patterns)
      : this._defaultValue;
  }
}

/**
 * The resolved configuration needed to run a project's tests:
 * dependencies, and the steps for each of the testing tasks.
 */
export interface RunTestConfig {
  /**
   * Dependencies required to run the tests.
   */
  readonly dependencies: DependencyRequest[];

  /**
   * The task steps to run for each of the "test", "test:update" and
   * "test:watch" tasks.
   */
  readonly steps: TaskStep[];
}

/**
 * A test runner that can produce the configuration to execute a file of a
 * particular type.
 */
export interface ITestRunner {
  /**
   * Produce the configuration to test the given project.
   */
  configFor(): RunTestConfig;
}

/**
 * A runner that executes a project's tests.
 *
 * A runner is a {@link FutureComponent}: create it standalone and it is
 * attached to a project by whoever consumes it.
 */
export abstract class TestRunner
  extends FutureComponent
  implements ITestRunner
{
  public configFor(): RunTestConfig {
    return {
      dependencies: [],
      steps: [{ execArgs: [] }],
    };
  }
}
