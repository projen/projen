import { Component } from "../component";
import { DependencyType } from "../dependencies";
import type { Project } from "../project";

export interface PytestOptions {
  /**
   * Pytest version
   *
   * @default "8.3.5"
   */
  readonly version?: string;

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
   * Glob patterns are supported, including `**` for recursive matching.
   *
   * The entries form pytest's `testpaths` setting, which is parsed like a shell
   * word list, so a path containing spaces has to be quoted: `["'my tests'"]`.
   *
   * @example ["tests/unit", "tests/qa"]
   * @default []
   */
  readonly testMatch?: string[];
}

export class Pytest extends Component {
  readonly testMatch: string[];

  constructor(project: Project, options: PytestOptions = {}) {
    super(project);

    const version = options.version ?? "8.3.5";

    this.testMatch = options.testMatch ?? [];

    project.deps.addDependency(`pytest@${version}`, DependencyType.TEST);

    project.testTask.execArgs([
      "pytest",
      ...(options.maxFailures ? [`--maxfail=${options.maxFailures}`] : []),
      // `testpaths` is expanded by pytest, so glob patterns are supported
      ...(this.testMatch.length > 0
        ? ["-o", `testpaths=${this.testMatch.join(" ")}`]
        : []),
    ]);
  }
}
