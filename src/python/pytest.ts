import { Construct } from "constructs";
import { Component } from "../component";
import { PythonProject } from "./python-project";

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

  constructor(scope: Construct, options: PytestOptions = {}) {
    super(scope, "Pytest");

    const project = PythonProject.ofPythonProject(this);

    const version = options.version ?? "6.2.1";

    this.testdir = options.testdir ?? "tests";

    project.addDevDependency(`pytest@${version}`);

    project.testTask.exec(
      [
        "pytest",
        ...(options.maxFailures ? [`--maxfail=${options.maxFailures}`] : []),
      ].join(" ")
    );
  }
}
