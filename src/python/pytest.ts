import { Component } from "../component";
import { DependencyType } from "../dependencies";
import { Project } from "../project";

export interface PytestOptions {
  /**
   * Pytest version
   *
   * @default "6.2.1"
   */
  readonly version?: string;

  /**
   * Directory with tests
   *
   * @default 'tests'
   */
  readonly testdir?: string;

  /**
   * Stop the testing process after the first N failures
   */
  readonly maxFailures?: number;
}

export class Pytest extends Component {
  readonly testdir: string;

  constructor(project: Project, options: PytestOptions = {}) {
    super(project);

    const version = options.version ?? "6.2.1";

    this.testdir = options.testdir ?? "tests";

    project.deps.addDependency(`pytest@${version}`, DependencyType.TEST);

    project.testTask.exec(
      [
        "pytest",
        ...(options.maxFailures ? [`--maxfail=${options.maxFailures}`] : []),
      ].join(" ")
    );
  }
}
