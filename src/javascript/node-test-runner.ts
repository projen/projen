import type { IConstruct } from "constructs";
import type { Component } from "../component";
import { JsonFile } from "../json";
import type { Project } from "../project";
import type {
  NodeConfigSchema,
  NodeConfigSchemaNodeOptions,
  NodeConfigSchemaTest,
} from "./node-config";
import { toJson_NodeConfigSchema } from "./node-config";
import { TestRunnerBase, UpdateSnapshot } from "./test-runner-base";
import type { TestRunnerBaseOptions } from "./test-runner-base";

export interface NodeTestRunnerOptions extends TestRunnerBaseOptions {
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
export class NodeTestRunner extends TestRunnerBase {
  /**
   * Returns the singleton NodeTestRunner component of a project or undefined
   * if there is none.
   */
  public static of(project: Project): NodeTestRunner | undefined {
    const isNodeTestRunner = (c: Component): c is NodeTestRunner =>
      c instanceof NodeTestRunner;
    return project.components.find(isNodeTestRunner);
  }

  protected readonly binary = "node";

  /**
   * Escape hatch for the generated configuration file.
   */
  public readonly config: NodeConfigSchema;

  /**
   * The generated Node.js configuration file.
   */
  public readonly file: JsonFile;

  constructor(scope: IConstruct, options: NodeTestRunnerOptions = {}) {
    super(scope, options);

    this.testMatch.push(...(options.testMatch ?? []));

    const collectCoverage = options.collectCoverage ?? true;
    const coverageDirectory = options.coverageDirectory ?? "coverage";

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
      this.excludeCoverageDirectory(coverageDirectory);

      // the lcov reporter does not create the coverage directory itself, so
      // it must exist before the test runner is invoked.
      this.project.testTask.prependExec(`mkdir -p ${coverageDirectory}`);
    }

    if (this.junitReporting) {
      addReporter("junit", `${this.testReportsDir}/junit.xml`);
      this.excludeTestReportsDirectory("# junit artifacts");

      // the junit reporter does not create the test reports directory
      // itself, so it must exist before the test runner is invoked.
      this.project.testTask.prependExec(`mkdir -p ${this.testReportsDir}`);
    }

    this.config = {
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
    };

    const configFilePath =
      options.configFilePath ?? "node.test-coverage-config.json";
    this.file = new JsonFile(this.project, configFilePath, {
      obj: () => toJson_NodeConfigSchema(this.config),
    });
    this.project.npmignore?.addPatterns(`/${this.file.path}`);

    this.configureTestCommand(options.updateSnapshot ?? UpdateSnapshot.ALWAYS);
  }

  private buildBaseArgs(): string[] {
    return [
      `--experimental-config-file=${this.file.path}`,
      ...this.extraCliOptions,
      ...this.testMatch,
    ];
  }

  protected buildTestArgs(updateSnapshot: UpdateSnapshot): string[] {
    const args = this.buildBaseArgs();
    if (updateSnapshot === UpdateSnapshot.ALWAYS) {
      args.push("--test-update-snapshots");
    }
    return args;
  }

  protected buildUpdateArgs(): string[] {
    return [...this.buildBaseArgs(), "--test-update-snapshots"];
  }

  protected buildWatchArgs(): string[] {
    return [...this.buildBaseArgs(), "--watch"];
  }
}
