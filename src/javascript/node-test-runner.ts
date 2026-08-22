import type { IConstruct } from "constructs";
import { Component } from "../component";
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
   * Glob patterns of files to exclude from code coverage.
   *
   * @default ["**\/test/**","**\/__tests__/**"]
   */
  readonly coverageExclude?: string[];

  /**
   * Update snapshots when running the "test" task (which is executed in the
   * "build" task and build workflows) via `--test-update-snapshots`.
   *
   * @default false
   */
  readonly updateSnapshots?: boolean;

  /**
   * Path to a module that is required before running any test files, used
   * for one-time global setup. Written as `test-global-setup` in the
   * generated Node.js configuration file.
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
  readonly additionalOptions?: NodeConfigSchemaTest;
}

/**
 * Installs the following npm scripts:
 *
 * - `test`, intended for testing locally and in CI, running the tests with
 *   Node.js' built-in test runner (`node --test`).
 * - `test:watch`, intended for automatically rerunning tests when files change.
 * - `test:update`, intended for updating snapshots to match the latest unit
 *   under test.
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

    const coverage = options.coverage ?? true;
    const coverageDirectory = options.coverageDirectory ?? "coverage";

    if (coverage) {
      this.project.gitignore.exclude(`/${coverageDirectory}/`);
      this.project.npmignore?.exclude(`/${coverageDirectory}/`);
    }

    this.config = {
      test: {
        test: true,
        testGlobalSetup: options.globalSetup,
        ...(coverage
          ? {
              experimentalTestCoverage: true,
              testReporter: ["spec", "lcov"],
              testReporterDestination: [
                "stdout",
                `${coverageDirectory}/lcov.info`,
              ],
              testCoverageExclude: options.coverageExclude ?? ["**/test/**", "**/__tests__/**"],
            }
          : {}),
        experimentalTestModuleMocks: options.moduleMocks,
        ...options.additionalOptions,
      },
      nodeOptions: options.nodeOptions,
    };

    const configFilePath =
      options.configFilePath ?? "node.test-coverage-config.json";
    this.file = new JsonFile(this.project, configFilePath, {
      obj: () => toJson_NodeConfigSchema(this.config),
    });
    this.project.npmignore?.addPatterns(`/${this.file.path}`);

    this.configureTestCommand(options.updateSnapshots ?? false);
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

  private configureTestCommand(updateSnapshots: boolean) {
    const baseArgs = this.buildBaseArgs();

    if (updateSnapshots) {
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
