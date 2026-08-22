import type { IConstruct } from "constructs";
import { Component } from "../component";
import type { Project } from "../project";
import type {
  NodeConfigSchemaNodeOptions,
  NodeConfigSchemaTest,
} from "./node-config";
import { NodeConfigFile } from "./node-config-file";
import { NodeProject } from "./node-project";
import type { JavaScriptTestRunnerOptions } from "./test-runner-options";
import {
  configureTestCommand,
  DEFAULT_TEST_REPORTS_DIR,
  UpdateSnapshot,
} from "./test-runner-options";
import { excludeCoverageDirectory, excludeTestReportsDirectory } from "./util";
import { closestProjectMustBe } from "../util/constructs";

export interface NodeNativeTestOptions extends JavaScriptTestRunnerOptions {
  /**
   * Glob patterns matching the files that contain tests.
   *
   * @default - Node's own default test file discovery
   */
  readonly testMatch?: string[];

  /**
   * Indicates whether the coverage information should be collected while
   * executing the test, via `--experimental-test-coverage`.
   *
   * @default true
   */
  readonly collectCoverage?: boolean;

  /**
   * The directory where Node should output its coverage files.
   *
   * @default "coverage"
   */
  readonly coverageDirectory?: string;

  /**
   * An array of glob patterns that are matched against all file paths before
   * executing coverage collection. If a file path matches any of the
   * patterns, coverage information will be skipped for it.
   *
   * @default ["**\/test/**", "**\/__tests__/**"]
   */
  readonly coveragePathIgnorePatterns?: string[];

  /**
   * This option allows the use of a custom global setup module which
   * exports a function that is triggered once before all test suites.
   * Written as `test-global-setup` in the generated Node.js configuration
   * file.
   *
   * @default - undefined
   */
  readonly globalSetup?: string;

  /**
   * Enable module mocking support via `--experimental-test-module-mocks`.
   *
   * @default false
   */
  readonly moduleMocks?: boolean;

  /**
   * Additional entries for the `nodeOptions` section of the generated
   * configuration file (e.g. `experimentalTransformTypes`, `disableWarning`).
   *
   * @default - no additional node options
   */
  readonly nodeOptions?: NodeConfigSchemaNodeOptions;

  /**
   * Escape hatch to add or override any value in the `test` section of the
   * generated configuration file.
   *
   * @default - no additional options
   */
  readonly testConfig?: NodeConfigSchemaTest;
}

/**
 * Installs the following npm scripts:
 *
 * - `test`, intended for testing locally and in CI. Will update snapshots
 *   unless `updateSnapshot: UpdateSnapshot.NEVER` is set.
 * - `test:watch`, intended for automatically rerunning tests when files change.
 * - `test:update`, intended for testing locally and updating snapshots to
 *   match the latest unit under test. Only available when
 *   `updateSnapshot: UpdateSnapshot.NEVER`.
 *
 * Configuration (coverage, reporters, global setup, etc.) is written to a
 * Node.js configuration file, which is loaded via `--experimental-config-file`.
 */
export class NodeNativeTest extends Component {
  /**
   * Returns the singleton NodeNativeTest component of a project or undefined
   * if there is none.
   */
  public static of(project: Project): NodeNativeTest | undefined {
    const isNodeNativeTest = (c: Component): c is NodeNativeTest =>
      c instanceof NodeNativeTest;
    return project.components.find(isNodeNativeTest);
  }

  public readonly project: NodeProject;

  /**
   * The directory where Node outputs its coverage files.
   */
  public readonly coverageDirectory?: string;

  /**
   * Additional CLI options passed to every invocation of the test runner.
   */
  private readonly extraCliOptions: string[];

  /**
   * Glob patterns matching the files that contain tests.
   */
  private readonly testMatch: string[] = [];

  /**
   * Include the default text/spec reporter, so that a summary is printed to
   * stdout upon completion.
   */
  private readonly coverageText: boolean;

  /**
   * Result processing with a JUnit-compatible reporter.
   */
  private readonly junitReporting: boolean;

  /**
   * Preserve the default reporter when additional reporters are added.
   */
  private readonly preserveDefaultReporters: boolean;

  /**
   * The directory used for JUnit-compatible test reports.
   */
  private readonly testReportsDir: string = DEFAULT_TEST_REPORTS_DIR;

  /**
   * The generated Node.js configuration file.
   */
  public readonly configFile: NodeConfigFile;

  constructor(scope: IConstruct, options: NodeNativeTestOptions = {}) {
    super(scope);
    this.project = closestProjectMustBe(scope, NodeProject, new.target.name);
    this.extraCliOptions = options.extraCliOptions ?? [];
    this.coverageText = options.coverageText ?? true;
    this.junitReporting = options.junitReporting ?? true;
    this.preserveDefaultReporters = options.preserveDefaultReporters ?? true;

    this.testMatch.push(...(options.testMatch ?? []));

    // Node's own snapshot files are generated files!
    this.project.root.annotateGenerated("*.snap");

    const collectCoverage = options.collectCoverage ?? true;
    const coverageDirectory = options.coverageDirectory ?? "coverage";
    this.coverageDirectory = collectCoverage ? coverageDirectory : undefined;

    const reporters: string[] = [];
    const reporterDestinations: string[] = [];
    const addReporter = (reporter: string, destination: string) => {
      reporters.push(reporter);
      reporterDestinations.push(destination);
    };

    if (this.preserveDefaultReporters && this.coverageText) {
      addReporter("spec", "stdout");
    }

    if (collectCoverage) {
      addReporter("lcov", `${coverageDirectory}/lcov.info`);
      excludeCoverageDirectory(this.project, coverageDirectory);

      // the lcov reporter does not create the coverage directory itself, so
      // it must exist before the test runner is invoked.
      this.project.testTask.prependExec(`mkdir -p ${coverageDirectory}`);
    }

    if (this.junitReporting) {
      addReporter("junit", `${this.testReportsDir}/junit.xml`);
      excludeTestReportsDirectory(
        this.project,
        this.testReportsDir,
        "# junit artifacts",
      );

      // the junit reporter does not create the test reports directory
      // itself, so it must exist before the test runner is invoked.
      this.project.testTask.prependExec(`mkdir -p ${this.testReportsDir}`);
    }

    const filePath = options.configFilePath ?? "node.config.json";
    this.configFile = new NodeConfigFile(this.project, {
      filePath,
      test: {
        test: true,
        testGlobalSetup: options.globalSetup,
        ...(collectCoverage
          ? {
              experimentalTestCoverage: true,
              testCoverageExclude: options.coveragePathIgnorePatterns ?? [
                "**/test/**",
                "**/__tests__/**",
              ],
            }
          : {}),
        ...(reporters.length
          ? {
              testReporter: reporters,
              testReporterDestination: reporterDestinations,
            }
          : {}),
        experimentalTestModuleMocks: options.moduleMocks,
        ...options.testConfig,
      },
      nodeOptions: options.nodeOptions,
    });
    this.project.npmignore?.addPatterns(`/${this.configFile.file.path}`);

    const updateSnapshot = options.updateSnapshot ?? UpdateSnapshot.ALWAYS;
    configureTestCommand(this.project, {
      binary: "node",
      updateSnapshot,
      testArgs: this.buildTestArgs(updateSnapshot),
      updateArgs: this.buildUpdateArgs(),
      watchArgs: this.buildWatchArgs(),
    });
  }

  /**
   * Adds a test match pattern.
   * @param pattern glob pattern to match for tests
   */
  public addTestMatch(pattern: string) {
    this.testMatch.push(pattern);
  }

  private buildBaseArgs(): string[] {
    return [
      `--experimental-config-file=${this.configFile.file.path}`,
      ...this.extraCliOptions,
      ...this.testMatch,
    ];
  }

  private buildTestArgs(updateSnapshot: UpdateSnapshot): string[] {
    const args = this.buildBaseArgs();
    if (updateSnapshot === UpdateSnapshot.ALWAYS) {
      args.push("--test-update-snapshots");
    }
    return args;
  }

  private buildUpdateArgs(): string[] {
    return [...this.buildBaseArgs(), "--test-update-snapshots"];
  }

  private buildWatchArgs(): string[] {
    return [...this.buildBaseArgs(), "--watch"];
  }
}
