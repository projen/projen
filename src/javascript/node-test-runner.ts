import type { IConstruct } from "constructs";
import { Component } from "../component";
import { NodeProject } from "../javascript";
import type { Project } from "../project";
import { closestProjectMustBe } from "../util/constructs";

export interface NodeTestRunnerOptions {
  /**
   * Additional options to pass to the `node --test` CLI invocation.
   *
   * Each element is passed as a single argument, exactly as given: no shell
   * parses these, so a flag and its value need separate elements
   * (`["--test-name-pattern", "foo"]`, not `["--test-name-pattern foo"]`).
   *
   * @example ["--test-concurrency=4"]
   * @default - no extra options
   */
  readonly extraCliOptions?: string[];

  /**
   * Glob patterns matching the files that contain tests.
   *
   * @default - Node's own default test file discovery
   */
  readonly testMatch?: string[];

  /**
   * Enable code coverage collection via `--experimental-test-coverage`.
   *
   * @default true
   */
  readonly coverage?: boolean;

  /**
   * The directory where coverage output should be written when using an
   * lcov reporter.
   *
   * @default "coverage"
   */
  readonly coverageDirectory?: string;

  /**
   * Update snapshots when running the "test" task (which is executed in the
   * "build" task and build workflows) via `--test-update-snapshots`.
   *
   * @default false
   */
  readonly updateSnapshots?: boolean;
}

/**
 * Installs the following npm scripts:
 *
 * - `test`, intended for testing locally and in CI, running the tests with
 *   Node.js' built-in test runner (`node --test`).
 * - `test:watch`, intended for automatically rerunning tests when files change.
 * - `test:update`, intended for updating snapshots to match the latest unit
 *   under test.
 */
export class NodeTestRunner extends Component {
  /**
   * Returns the singleton NodeTestRunner component of a project or undefined
   * if there is none.
   */
  public static of(project: Project): NodeTestRunner | undefined {
    const isNodeTestRunner = (c: Component): c is NodeTestRunner =>
      c instanceof NodeTestRunner;
    return project.components.find(isNodeTestRunner);
  }

  public readonly project: NodeProject;

  private readonly extraCliOptions: string[];
  private readonly testMatch: string[];
  private readonly coverage: boolean;
  private readonly coverageDirectory: string;

  constructor(scope: IConstruct, options: NodeTestRunnerOptions = {}) {
    super(scope);
    this.project = closestProjectMustBe(scope, NodeProject, new.target.name);

    this.extraCliOptions = options.extraCliOptions ?? [];
    this.testMatch = options.testMatch ?? [];
    this.coverage = options.coverage ?? true;
    this.coverageDirectory = options.coverageDirectory ?? "coverage";

    if (this.coverage) {
      this.project.gitignore.exclude(`/${this.coverageDirectory}/`);
      this.project.npmignore?.exclude(`/${this.coverageDirectory}/`);
    }

    this.configureTestCommand(options.updateSnapshots ?? false);
  }

  /**
   * Adds a test match pattern.
   * @param pattern glob pattern to match for tests
   */
  public addTestMatch(pattern: string) {
    this.testMatch.push(pattern);
  }

  private buildTestArgs(): string[] {
    const args = ["--test", ...this.testMatch, ...this.extraCliOptions];
    if (this.coverage) {
      args.push(
        "--experimental-test-coverage",
        "--test-reporter=spec",
        "--test-reporter-destination=stdout",
        "--test-reporter=lcov",
        `--test-reporter-destination=${this.coverageDirectory}/lcov.info`,
      );
    }
    return args;
  }

  private configureTestCommand(updateSnapshots: boolean) {
    const testArgs = this.buildTestArgs();

    if (updateSnapshots) {
      testArgs.push("--test-update-snapshots");
    } else {
      const testUpdate = this.project.tasks.tryFind("test:update");
      if (!testUpdate) {
        this.project.addTask("test:update", {
          description: "Update test snapshots",
          execArgs: ["node", ...testArgs, "--test-update-snapshots"],
          receiveArgs: true,
        });
      }
    }

    this.project.testTask.execArgs(["node", ...testArgs], {
      receiveArgs: true,
    });

    const testWatch = this.project.tasks.tryFind("test:watch");
    if (!testWatch) {
      this.project.addTask("test:watch", {
        description: "Run tests in watch mode",
        execArgs: ["node", "--watch", ...testArgs],
      });
    }
  }
}
