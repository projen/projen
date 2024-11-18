import { Component } from "../component";
import { DependencyType } from "../dependencies";
import { Project } from "../project";

export interface PytestOptions {
  /**
   * Pytest version
   *
   * @default "7.4.3"
   */
  readonly version?: string;

  /**
   * Location of sample tests.
   * Typically the same directory where project tests will be located.
   *
   * @default 'tests'
   * @deprecated Reference `testdir` on the project instead.
   */
  readonly testdir?: string;

  /**
   * Stop the testing process after the first N failures
   */
  readonly maxFailures?: number;

  /**
   * List of paths to test files or directories.
   * Useful when all project tests are in a known location to speed up
   * test collection and to avoid picking up undesired tests by accident.
   *
   * Leave empty to discover all test_*.py or *_test.py files, per Pytest default.
   *
   * The array will be concatenated and passed as a single argument to pytest.
   * @example ["tests/unit", "tests/qa"]
   * @default [""]
   */
  readonly testMatch?: string[];
}

export class Pytest extends Component {
  /**
   * @deprecated Use `testdir` on the project instead.
   */
  readonly testdir: string;
  readonly testMatch: string[];

  constructor(project: Project, options: PytestOptions = {}) {
    super(project);

    const version = options.version ?? "7.4.3";

    this.testdir = options.testdir ?? "tests";

    this.testMatch = options.testMatch ?? [""];

    project.deps.addDependency(`pytest@${version}`, DependencyType.TEST);

    project.testTask.exec(
      [
        "pytest",
        ...(options.maxFailures ? [`--maxfail=${options.maxFailures}`] : []),
        ...this.testMatch,
      ]
        .join(" ")
        .trimEnd()
    );
  }
}
