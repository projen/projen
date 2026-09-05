import * as path from "path";
import type { DependencyRequest } from "../dependencies";
import type { RunTestConfig, TestMatch } from "../test-runner";
import { TestRunner } from "../test-runner";
import type { JestOptions } from "./jest";
import { Jest } from "./jest";
import type { NodeNativeTestOptions } from "./node-native-test";
import { NodeNativeTest } from "./node-native-test";
import type { TaskStep } from "../task-model";

/**
 * The default directory used for coverage test reports.
 */
export const DEFAULT_COVERAGE_DIR = "coverage";

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
 */
export interface IJavaScriptTestRunner {
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

type TestRunnerKind = "jest" | "node";

/**
 * The full, internal option set for a runner: the options shared by every
 * kind, plus whichever kind-specific options apply. Never exposed publicly.
 */
interface RunnerState extends JavaScriptTestRunnerOptions {
  readonly configFilePath?: string;
  readonly passWithNoTests?: boolean;
  readonly extraCliOptions?: string[];
  readonly transformTypes?: boolean;
  readonly jestVersion?: string;
}

/**
 * The runner used to execute a JavaScript project's tests.
 *
 * A runner is a {@link TestRunner} (and therefore a `FutureComponent`):
 * create it standalone (e.g. via one of the static factories) and it is
 * attached to a project by whoever consumes it (typically `NodeProject`
 * itself, via its `testRunner` option).
 */
export class JavaScriptTestRunner
  extends TestRunner
  implements IJavaScriptTestRunner
{
  /**
   * Use Jest to execute tests.
   */
  public static jest(options: JestOptions = {}): JavaScriptTestRunner {
    return new JavaScriptTestRunner("jest", options);
  }

  /**
   * Use Node.js' built-in test runner (`node --test`) to execute tests.
   */
  public static nodejs(
    options: NodeNativeTestOptions = {},
  ): JavaScriptTestRunner {
    return new JavaScriptTestRunner("node", options);
  }

  private readonly _kind: TestRunnerKind;
  private readonly _options: RunnerState;

  private _runner?: IJavaScriptTestRunner;

  private constructor(kind: TestRunnerKind, options: RunnerState) {
    super();
    this._kind = kind;
    this._options = options;
  }

  protected init(): void {
    if (this._kind === "jest") {
      this._runner = new Jest(this.project, this._options as JestOptions);
    } else {
      const nodeNativeTest = new NodeNativeTest(
        this.project,
        this._options as NodeNativeTestOptions,
      );
      this._runner = nodeNativeTest;

      const resolvedNodeOptions = {
        ...nodeNativeTest.configFile.config.nodeOptions,
      };
      if (this._options.transformTypes ?? false) {
        resolvedNodeOptions.enableSourceMaps = true;
        const nodeImports = resolvedNodeOptions.import ?? [];
        if (!nodeImports.includes("amaro/transform")) {
          nodeImports.unshift("amaro/transform");
        }
        resolvedNodeOptions.import = nodeImports;
        // @ts-ignore
        nodeNativeTest.configFile.config.nodeOptions = resolvedNodeOptions;
      }
    }

    if (this.coverageDirectory) {
      const coverageDirectoryPath = path.posix.join(
        "/",
        this.coverageDirectory,
        "/",
      );
      this.project.addPackageIgnore(coverageDirectoryPath);
      this.project.addGitIgnore(coverageDirectoryPath);
    }

    const { dependencies, steps } = this.configFor();

    // Register any runner dependencies
    for (const dep of dependencies) {
      this.project.deps.requestDependency(dep);
    }

    const updateStep = steps.find((s) => s.name === RunTestStepKind.UPDATE);
    const testUpdate = this.project.tasks.tryFind("test:update");
    if (updateStep && !testUpdate) {
      this.project.addTask("test:update", {
        description: "Update test snapshots",
        steps: [{ ...updateStep, name: undefined }],
      });
    }

    const testStep = steps.find((s) => s.name === RunTestStepKind.TEST);
    this.project.testTask.addSteps({ ...testStep, name: undefined });

    const watchStep = steps.find((s) => s.name === RunTestStepKind.WATCH);
    const testWatch = this.project.tasks.tryFind("test:watch");
    if (watchStep && !testWatch) {
      this.project.addTask("test:watch", {
        description: "Run tests in watch mode",
        steps: [{ ...watchStep, name: undefined }],
      });
    }
  }

  public get testMatch() {
    return this._runner!.testMatch;
  }

  public get updateSnapshot() {
    return this._runner!.updateSnapshot;
  }

  public get coverageDirectory() {
    return this._runner!.coverageDirectory;
  }

  /**
   * Produce the {@link RunTestConfig} to run the given entrypoint with this
   * runner.
   */
  public configFor(): RunTestConfig {
    const updateSnapshot =
      this._options.updateSnapshot ?? UpdateSnapshot.ALWAYS;
    switch (this._kind) {
      case "jest":
        return this.renderJest(updateSnapshot);
      case "node":
        return this.renderNode(updateSnapshot);
    }
  }

  private renderJest(updateSnapshot: UpdateSnapshot): RunTestConfig {
    const options = this._options;
    const configFilePath = options.configFilePath;
    const passWithNoTests = options.passWithNoTests ?? true;
    const jestOpts = options.extraCliOptions ?? [];
    const jestConfigOpts: string[] = [];

    const jestVersion = options.jestVersion ? `@${options.jestVersion}` : "";

    const steps: TaskStep[] = [];
    const command: string[] = ["jest"];
    const dependencies: DependencyRequest[] = [{ name: `jest${jestVersion}` }];

    if (configFilePath && configFilePath !== "jest.config.json") {
      jestConfigOpts.push("-c", configFilePath);
    }

    if (passWithNoTests) {
      jestOpts.push("--passWithNoTests");
    }

    if (updateSnapshot === UpdateSnapshot.ALWAYS) {
      jestOpts.push("--updateSnapshot");
    } else {
      jestOpts.push("--ci"); // to prevent accepting new snapshots
      steps.push({
        name: RunTestStepKind.UPDATE,
        execArgs: [...command, ...jestOpts, "--updateSnapshot"],
        receiveArgs: true,
      });
    }

    steps.push({
      name: RunTestStepKind.TEST,
      execArgs: [...command, ...jestOpts, ...jestConfigOpts],
      receiveArgs: true,
    });

    steps.push({
      name: RunTestStepKind.WATCH,
      execArgs: [...command, "--watch", ...jestConfigOpts],
    });

    return {
      dependencies,
      steps,
    };
  }

  /**
   * Builds the dependencies, effective test match patterns, and task steps
   * needed to run Node's built-in test runner.
   *
   * A pure function of `options` (and, for the test match patterns, the
   * live `testMatch` tracked by this runner) - no project access needed,
   * mirroring `TypeScriptRunner.renderNode()`.
   */
  private renderNode(updateSnapshot: UpdateSnapshot): RunTestConfig {
    const options = this._options;
    const configFilePath = options.configFilePath ?? "node.config.json";
    const extraCliOptions = options.extraCliOptions ?? [];

    const steps: TaskStep[] = [];
    const command: string[] = ["node"];
    const dependencies: DependencyRequest[] = [];

    if (this._options.transformTypes ?? false) {
      dependencies.push({ name: "amaro" });
    }

    // Flags common to every invocation. Test match patterns are positional
    // arguments, so they must come after every flag - once Node sees the
    // first positional argument, it stops parsing flags, so any flag
    // appended after them (e.g. `--watch`) is ignored.
    command.push(`--experimental-config-file=${configFilePath}`);
    command.push(...extraCliOptions);

    // `testMatch` is a live collection (`add`/`remove` can still be called
    // after construction), so its resolution is deferred with `lazyExecArgs`
    // rather than read eagerly here.
    const testMatchArgs = () => this.testMatch.deferred();

    const baseArgs: string[] = [];

    if (updateSnapshot === UpdateSnapshot.ALWAYS) {
      baseArgs.push("--test-update-snapshots");
    } else {
      steps.push({
        name: RunTestStepKind.UPDATE,
        execArgs: lazyExecArgs(() => [
          ...command,
          ...baseArgs,
          "--test-update-snapshots",
          ...testMatchArgs(),
        ]),
        receiveArgs: true,
      });
    }

    steps.push({
      name: RunTestStepKind.TEST,
      execArgs: lazyExecArgs(() => [
        ...command,
        ...baseArgs,
        ...testMatchArgs(),
      ]),
      receiveArgs: true,
    });

    steps.push({
      name: RunTestStepKind.WATCH,
      execArgs: lazyExecArgs(() => [...command, "--watch", ...testMatchArgs()]),
    });

    return {
      dependencies,
      steps,
    };
  }
}

/**
 * Defers resolution of a `TaskStep`'s `execArgs` to synthesis time, when the
 * tasks manifest is rendered.
 *
 * `TaskStep.execArgs` is typed as a plain `string[]`, but the manifest is
 * written through the generic `resolve()` walker (see
 * `ProjenTaskRunner.tasksManifest`) - the same mechanism `JsonFile`/`ObjectFile`
 * use for lazy values elsewhere (e.g. `NodeReporters.list`, `Jest.testMatch`).
 * That walker calls any function it finds, so a callback deferred here runs
 * once, at that point, in place of a plain array. Using a `preSynthesize`
 * hook to compute the final args instead would mean tracking this step's
 * position across whatever else might still mutate the same task's steps
 * before synthesis - strictly more fragile than reusing the resolver that
 * already handles this safely.
 */
function lazyExecArgs(fn: () => string[]): string[] {
  return fn as any;
}
