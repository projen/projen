import type { IConstruct } from "constructs";
import { Component } from "../component";
import { UpdateSnapshot } from "./jest";
import { NodeProject } from "../javascript";
import { JsonFile } from "../json";
import type {
  NodeConfigSchema,
  NodeConfigSchemaNodeOptions,
  NodeConfigSchemaTest,
} from "./node-config";
import { toJson_NodeConfigSchema } from "./node-config";
import type { Project } from "../project";
import { closestProjectMustBe } from "../util/constructs";

const DEFAULT_TEST_REPORTS_DIR = "test-reports";

export interface NodeTestRunnerOptions {
  /**
   * Additional options to pass to the `node` CLI invocation.
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
   * Include the `spec` reporter, which means that a coverage summary and
   * test results are printed to stdout.
   *
   * @default true
   */
  readonly coverageText?: boolean;

  /**
   * Result processing with Node's built-in `junit` reporter.
   *
   * Output directory is `test-reports/`.
   *
   * @default true
   */
  readonly junitReporting?: boolean;

  /**
   * Preserve the default `spec` reporter when additional reporters (e.g.
   * `junit`) are added.
   *
   * @default true
   */
  readonly preserveDefaultReporters?: boolean;

  /**
   * Whether to update snapshots in task "test" (which is executed in task
   * "build" and build workflows), or create a separate task "test:update"
   * for updating snapshots.
   *
   * @default - ALWAYS
   */
  readonly updateSnapshot?: UpdateSnapshot;

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
   * Path to the Node.js configuration file, passed to the test runner via
   * `--experimental-config-file`.
   *
   * @default "node.test-coverage-config.json"
   */
  readonly configFilePath?: string;

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
 * Node.js configuration file (following the schema at
 * https://nodejs.org/dist/latest-v24.x/docs/node-config-schema.json), which
 * is loaded via `--experimental-config-file`.
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

  /**
   * Escape hatch for the generated configuration file.
   */
  public readonly config: NodeConfigSchema;

  /**
   * The generated Node.js configuration file.
   */
  public readonly file: JsonFile;

  private readonly extraCliOptions: string[];
  private readonly testMatch: string[];

  constructor(scope: IConstruct, options: NodeTestRunnerOptions = {}) {
    super(scope);
    this.project = closestProjectMustBe(scope, NodeProject, new.target.name);

    this.extraCliOptions = options.extraCliOptions ?? [];
    this.testMatch = options.testMatch ?? [];

    const collectCoverage = options.collectCoverage ?? true;
    const coverageDirectory = options.coverageDirectory ?? "coverage";
    const coverageText = options.coverageText ?? true;
    const junitReporting = options.junitReporting ?? true;
    const preserveDefaultReporters = options.preserveDefaultReporters ?? true;

    const reporters: string[] = [];
    const reporterDestinations: string[] = [];
    const addReporter = (reporter: string, destination: string) => {
      reporters.push(reporter);
      reporterDestinations.push(destination);
    };

    if (preserveDefaultReporters && coverageText) {
      addReporter("spec", "stdout");
    }

    if (collectCoverage) {
      addReporter("lcov", `${coverageDirectory}/lcov.info`);
      this.project.gitignore.exclude(`/${coverageDirectory}/`);
      this.project.npmignore?.exclude(`/${coverageDirectory}/`);
    }

    if (junitReporting) {
      const reportsDir = DEFAULT_TEST_REPORTS_DIR;
      addReporter("junit", `${reportsDir}/junit.xml`);

      this.project.gitignore.exclude("# junit artifacts", `/${reportsDir}/`);
      this.project.npmignore?.exclude("# junit artifacts", `/${reportsDir}/`);
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

  /**
   * Adds a test match pattern.
   * @param pattern glob pattern to match for tests
   */
  public addTestMatch(pattern: string) {
    this.testMatch.push(pattern);
  }

  private buildBaseArgs(): string[] {
    return [
      `--experimental-config-file=${this.file.path}`,
      ...this.extraCliOptions,
      ...this.testMatch,
    ];
  }

  private configureTestCommand(updateSnapshot: UpdateSnapshot) {
    const baseArgs = this.buildBaseArgs();

    if (updateSnapshot === UpdateSnapshot.ALWAYS) {
      baseArgs.push("--test-update-snapshots");
    } else {
      const testUpdate = this.project.tasks.tryFind("test:update");
      if (!testUpdate) {
        this.project.addTask("test:update", {
          description: "Update test snapshots",
          execArgs: ["node", ...baseArgs, "--test-update-snapshots"],
          receiveArgs: true,
        });
      }
    }

    this.project.testTask.execArgs(["node", ...baseArgs], {
      receiveArgs: true,
    });

    const testWatch = this.project.tasks.tryFind("test:watch");
    if (!testWatch) {
      this.project.addTask("test:watch", {
        description: "Run tests in watch mode",
        execArgs: ["node", ...this.buildBaseArgs(), "--watch"],
      });
    }
  }
}
