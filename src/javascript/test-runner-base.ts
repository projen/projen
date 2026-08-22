import * as path from "path";
import type { IConstruct } from "constructs";
import { Component } from "../component";
import type { NodeProject } from "./node-project";
import { closestProjectMustBe } from "../util/constructs";

/**
 * The default directory used for JUnit-compatible test reports.
 */
export const DEFAULT_TEST_REPORTS_DIR = "test-reports";

/**
 * Whether to update snapshots in task "test" (which is executed in task
 * "build" and build workflows), or create a separate task "test:update" for
 * updating snapshots.
 */
export enum UpdateSnapshot {
  /**
   * Always update snapshots in "test" task.
   */
  ALWAYS = "always",

  /**
   * Never update snapshots in "test" task and create a separate "test:update" task.
   */
  NEVER = "never",
}

/**
 * Options shared by all test runner components (e.g. `Jest`, `NodeTestRunner`).
 */
export interface TestRunnerBaseOptions {
  /**
   * Additional options to pass to the test runner's CLI invocation.
   *
   * Each element is passed as a single argument, exactly as given: no shell
   * parses these, so a flag and its value need separate elements
   * (`["--foo", "bar"]`, not `["--foo bar"]`).
   *
   * @default - no extra options
   */
  readonly extraCliOptions?: string[];

  /**
   * Whether to update snapshots in task "test" (which is executed in task "build" and build workflows),
   * or create a separate task "test:update" for updating snapshots.
   *
   * @default - ALWAYS
   */
  readonly updateSnapshot?: UpdateSnapshot;

  /**
   * Include the default text/spec reporter, so that a summary is printed to
   * stdout upon completion.
   *
   * @default true
   */
  readonly coverageText?: boolean;

  /**
   * Result processing with a JUnit-compatible reporter.
   *
   * Output directory is `test-reports/`.
   *
   * @default true
   */
  readonly junitReporting?: boolean;

  /**
   * Preserve the default reporter when additional reporters are added.
   *
   * @default true
   */
  readonly preserveDefaultReporters?: boolean;

  /**
   * Path to the JSON configuration file for the test runner.
   *
   * @default - no separate config file
   */
  readonly configFilePath?: string;
}

/**
 * Base class shared by test runner components (e.g. `Jest`, `NodeTestRunner`).
 *
 * Installs the following npm scripts:
 *
 * - `test`, intended for testing locally and in CI. Will update snapshots
 *   unless `updateSnapshot: UpdateSnapshot.NEVER` is set.
 * - `test:watch`, intended for automatically rerunning tests when files change.
 * - `test:update`, intended for testing locally and updating snapshots to
 *   match the latest unit under test. Only available when
 *   `updateSnapshot: UpdateSnapshot.NEVER`.
 */
export abstract class TestRunnerBase extends Component {
  public readonly project: NodeProject;

  /**
   * Additional CLI options passed to every invocation of the test runner.
   */
  protected readonly extraCliOptions: string[];

  /**
   * Glob patterns matching the files that contain tests.
   */
  protected readonly testMatch: string[] = [];

  /**
   * Include the default text/spec reporter, so that a summary is printed to
   * stdout upon completion.
   */
  protected readonly coverageText: boolean;

  /**
   * Result processing with a JUnit-compatible reporter.
   */
  protected readonly junitReporting: boolean;

  /**
   * Preserve the default reporter when additional reporters are added.
   */
  protected readonly preserveDefaultReporters: boolean;

  /**
   * The directory used for JUnit-compatible test reports.
   */
  protected readonly testReportsDir: string = DEFAULT_TEST_REPORTS_DIR;

  /**
   * The CLI binary used to invoke the test runner (e.g. `jest`, `node`).
   */
  protected abstract readonly binary: string;

  /**
   * Description used for the "test:update" task.
   */
  protected readonly testUpdateTaskDescription: string =
    "Update test snapshots";

  /**
   * Description used for the "test:watch" task.
   */
  protected readonly testWatchTaskDescription: string =
    "Run tests in watch mode";

  constructor(scope: IConstruct, options: TestRunnerBaseOptions = {}) {
    super(scope);
    // Lazy require to avoid a circular-require deadlock: this module is
    // loaded from `jest.ts`/`node-test-runner.ts`, which are themselves
    // loaded from `node-project.ts` - a static, module-scope import of
    // `NodeProject` here would be `undefined` at class-evaluation time.
    const { NodeProject } = require("./node-project"); // eslint-disable-line @typescript-eslint/no-require-imports
    this.project = closestProjectMustBe(scope, NodeProject, new.target.name);
    this.extraCliOptions = options.extraCliOptions ?? [];
    this.coverageText = options.coverageText ?? true;
    this.junitReporting = options.junitReporting ?? true;
    this.preserveDefaultReporters = options.preserveDefaultReporters ?? true;
  }

  /**
   * Adds a test match pattern.
   * @param pattern glob pattern to match for tests
   */
  public addTestMatch(pattern: string) {
    this.testMatch.push(pattern);
  }

  /**
   * Excludes a set of patterns from both the project's `.gitignore` and
   * `.npmignore` files (if present).
   */
  protected excludeFromVcs(...patterns: string[]) {
    this.project.gitignore.exclude(...patterns);
    this.project.npmignore?.exclude(...patterns);
  }

  /**
   * Excludes a coverage directory from both the project's `.gitignore` and
   * `.npmignore` files (if present).
   * @param coverageDirectory The coverage output directory to exclude.
   */
  protected excludeCoverageDirectory(coverageDirectory: string) {
    const coverageDirectoryPath = path.posix.join("/", coverageDirectory, "/");
    this.excludeFromVcs(coverageDirectoryPath);
  }

  /**
   * Excludes the JUnit test reports directory from both the project's
   * `.gitignore` and `.npmignore` files (if present).
   * @param comment Comment to add above the excluded patterns.
   * @param additionalPatterns Additional patterns to exclude alongside the reports directory.
   */
  protected excludeTestReportsDirectory(
    comment: string,
    ...additionalPatterns: string[]
  ) {
    this.excludeFromVcs(
      comment,
      `/${this.testReportsDir}/`,
      ...additionalPatterns,
    );
  }

  /**
   * Builds the CLI arguments (after the binary) used for the "test" task.
   * @param updateSnapshot whether snapshots should always be updated
   */
  protected abstract buildTestArgs(updateSnapshot: UpdateSnapshot): string[];

  /**
   * Builds the CLI arguments (after the binary) used for the "test:update"
   * task. Only invoked when `updateSnapshot` is `UpdateSnapshot.NEVER`.
   */
  protected abstract buildUpdateArgs(): string[];

  /**
   * Builds the CLI arguments (after the binary) used for the "test:watch"
   * task.
   */
  protected abstract buildWatchArgs(): string[];

  /**
   * Wires up the "test", "test:watch" and "test:update" tasks.
   */
  protected configureTestCommand(updateSnapshot: UpdateSnapshot) {
    const testArgs = this.buildTestArgs(updateSnapshot);

    if (updateSnapshot !== UpdateSnapshot.ALWAYS) {
      const testUpdate = this.project.tasks.tryFind("test:update");
      if (!testUpdate) {
        this.project.addTask("test:update", {
          description: this.testUpdateTaskDescription,
          execArgs: [this.binary, ...this.buildUpdateArgs()],
          receiveArgs: true,
        });
      }
    }

    this.project.testTask.execArgs([this.binary, ...testArgs], {
      receiveArgs: true,
    });

    const testWatch = this.project.tasks.tryFind("test:watch");
    if (!testWatch) {
      this.project.addTask("test:watch", {
        description: this.testWatchTaskDescription,
        execArgs: [this.binary, ...this.buildWatchArgs()],
      });
    }
  }
}
