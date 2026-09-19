import * as path from "path";
import type { IConstruct, IMixin } from "constructs";
import { Project } from "../project";
import type { ITestRunner, RunTestConfig, TestMatch } from "../test-runner";

/**
 * The default directory used for coverage test reports.
 */
export const DEFAULT_COVERAGE_DIR = "coverage";

/**
 * The default directory used for JUnit-compatible test reports.
 */
export const DEFAULT_TEST_REPORTS_DIR = "test-reports";

/**
 * The steps to run for each of the test tasks.
 */
enum RunTestStepKind {
  /**
   * Default step for "test" task.
   */
  TEST = "test",

  /**
   * Default step for "test:update" task.
   */
  UPDATE = "update",

  /**
   * Default step for "test:watch" task.
   */
  WATCH = "watch",
}

/**
 * Whether to update snapshots in task "test" (which is executed in task
 * "build" and build workflows), or create a separate task "test:update" for
 * updating snapshots.
 *
 * Shared by every `IJavaScriptTestRunner` implementation (`Jest`,
 * `NodeNativeTest`), so it lives here rather than in any one of them.
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

export interface JavaScriptTestRunnerOptions {
  /**
   * The directory where coverage files are output, if coverage collection
   * is enabled for the configured test runner.
   *
   * @default "coverage"
   */
  readonly coverageDirectory?: string;

  /**
   * Whether to update snapshots in task "test" (which is executed in task "build" and build workflows),
   * or create a separate task "test:update" for updating snapshots.
   *
   * @default - ALWAYS
   */
  readonly updateSnapshot?: UpdateSnapshot;
}

/**
 * A runner that can execute the tests for a JavaScript project.
 *
 * Implementations (e.g. `Jest`, `NodeNativeTest`) are self-contained
 * components: they can be used directly, or composed onto a project through
 * the {@link JavaScriptTestRunner} mixin.
 */
export interface IJavaScriptTestRunner extends ITestRunner {
  /**
   * Glob patterns matching the files that contain tests.
   */
  readonly testMatch: TestMatch;

  /**
   * Whether snapshots are updated in task "test", or in a separate
   * "test:update" task.
   */
  readonly updateSnapshot: UpdateSnapshot;

  /**
   * The directory where coverage files are output, if coverage collection
   * is enabled for the configured test runner.
   */
  readonly coverageDirectory?: string;
}

/**
 * Wires up a {@link IJavaScriptTestRunner} onto a project: requests its
 * dependencies, registers its coverage output as ignored, and creates the
 * "test", "test:update" and "test:watch" tasks from its {@link RunTestConfig}.
 *
 * Unlike its runner, this mixin holds no test-kind-specific logic (no Jest
 * or Node.js-specific behavior) - it only knows how to apply the generic
 * shape of an `IJavaScriptTestRunner` to a project.
 */
export class JavaScriptTestRunner implements IMixin {
  constructor(private readonly runner: IJavaScriptTestRunner) {}

  public supports(construct: IConstruct): construct is Project {
    return construct instanceof Project;
  }

  public applyTo(construct: IConstruct): void {
    if (!this.supports(construct)) {
      return;
    }

    const project = construct;
    const runner = this.runner;

    if (runner.coverageDirectory) {
      const coverageDirectoryPath = path.posix.join(
        "/",
        runner.coverageDirectory,
        "/",
      );
      project.addPackageIgnore(coverageDirectoryPath);
      project.addGitIgnore(coverageDirectoryPath);
    }

    const { dependencies, steps }: RunTestConfig = runner.configFor();

    // Register any runner dependencies
    for (const dep of dependencies) {
      project.deps.requestDependency(dep);
    }

    const updateStep = steps.find((s) => s.name === RunTestStepKind.UPDATE);
    const testUpdate = project.tasks.tryFind("test:update");
    if (updateStep && !testUpdate) {
      project.addTask("test:update", {
        description: "Update test snapshots",
        steps: [{ ...updateStep, name: undefined }],
      });
    }

    const testStep = steps.find((s) => s.name === RunTestStepKind.TEST);
    if (testStep) {
      project.testTask.addSteps({ ...testStep, name: undefined });
    }

    const watchStep = steps.find((s) => s.name === RunTestStepKind.WATCH);
    const testWatch = project.tasks.tryFind("test:watch");
    if (watchStep && !testWatch) {
      project.addTask("test:watch", {
        description: "Run tests in watch mode",
        steps: [{ ...watchStep, name: undefined }],
      });
    }
  }
}
