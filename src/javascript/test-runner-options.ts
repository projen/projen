import type { Project } from "../project";

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
 * Options shared by all JavaScript test runner components (e.g. `Jest`, `NodeNativeTest`).
 */
export interface JavaScriptTestRunnerOptions {
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
 * Options for `configureTestCommand`.
 */
export interface ConfigureTestCommandOptions {
  /**
   * The CLI binary used to invoke the test runner (e.g. `jest`, `node`).
   */
  readonly binary: string;

  /**
   * Whether to update snapshots in task "test", or create a separate
   * task "test:update" for updating snapshots.
   */
  readonly updateSnapshot: UpdateSnapshot;

  /**
   * The CLI arguments (after the binary) used for the "test" task.
   */
  readonly testArgs: string[];

  /**
   * The CLI arguments (after the binary) used for the "test:update" task.
   * Only used when `updateSnapshot` is `UpdateSnapshot.NEVER`.
   */
  readonly updateArgs: string[];

  /**
   * The CLI arguments (after the binary) used for the "test:watch" task.
   */
  readonly watchArgs: string[];

  /**
   * Description used for the "test:update" task.
   * @default "Update test snapshots"
   */
  readonly testUpdateTaskDescription?: string;

  /**
   * Description used for the "test:watch" task.
   * @default "Run tests in watch mode"
   */
  readonly testWatchTaskDescription?: string;
}

/**
 * Wires up the "test", "test:watch" and "test:update" tasks for a JavaScript
 * test runner component (e.g. `Jest`, `NodeNativeTest`).
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
export function configureTestCommand(
  project: Project,
  options: ConfigureTestCommandOptions,
) {
  const {
    binary,
    updateSnapshot,
    testArgs,
    updateArgs,
    watchArgs,
    testUpdateTaskDescription = "Update test snapshots",
    testWatchTaskDescription = "Run tests in watch mode",
  } = options;

  if (updateSnapshot !== UpdateSnapshot.ALWAYS) {
    const testUpdate = project.tasks.tryFind("test:update");
    if (!testUpdate) {
      project.addTask("test:update", {
        description: testUpdateTaskDescription,
        execArgs: [binary, ...updateArgs],
        receiveArgs: true,
      });
    }
  }

  project.testTask.execArgs([binary, ...testArgs], {
    receiveArgs: true,
  });

  const testWatch = project.tasks.tryFind("test:watch");
  if (!testWatch) {
    project.addTask("test:watch", {
      description: testWatchTaskDescription,
      execArgs: [binary, ...watchArgs],
    });
  }
}
