import { posix } from "path";
import type { IConstruct } from "constructs";
import { Component } from "../component";
import type { Project } from "../project";
import type { JavaScriptTestRunnerOptions } from "./javascript-test-runner";
import {
  DEFAULT_COVERAGE_DIR,
  DEFAULT_TEST_REPORTS_DIR,
  UpdateSnapshot,
} from "./javascript-test-runner";
import type {
  NodeConfigSchemaNodeOptions,
  NodeConfigSchemaTest,
} from "./node-config";
import { NodeConfigFile } from "./node-config-file";
import { NodeProject } from "./node-project";
import { TestMatch } from "../test-runner";
import { deepMerge } from "../util";
import { closestProjectMustBe } from "../util/constructs";

const DEFAULT_NODE_TEST_MATCH_EXTENSIONS = "cjs,mjs,js,jsx,cts,mts,ts,tsx";

/**
 * Default glob patterns used to discover test files for Node's built-in test
 * runner, combining Node.js' own default test file discovery with common
 * Jest conventions, so that projects moving from Jest keep matching their
 * existing test files.
 *
 * Node's test runner glob matching follows `glob(7)` and does not support
 * extglobs (e.g. `@(...)`, `+(...)`, `?(...)`), so, unlike Jest's own
 * defaults, each alternative is spelled out explicitly instead of relying on
 * extended glob groups.
 *
 * @see https://nodejs.org/api/test.html#running-tests-from-the-command-line
 */
const DEFAULT_NODE_TEST_MATCH: string[] = [
  // Node.js' own defaults: files inside a "test" directory, or named/prefixed/suffixed "test"
  `**/test/**/*.{${DEFAULT_NODE_TEST_MATCH_EXTENSIONS}}`,
  `**/test.{${DEFAULT_NODE_TEST_MATCH_EXTENSIONS}}`,
  `**/test-*.{${DEFAULT_NODE_TEST_MATCH_EXTENSIONS}}`,
  `**/*.test.{${DEFAULT_NODE_TEST_MATCH_EXTENSIONS}}`,
  `**/*-test.{${DEFAULT_NODE_TEST_MATCH_EXTENSIONS}}`,
  `**/*_test.{${DEFAULT_NODE_TEST_MATCH_EXTENSIONS}}`,
  // Jest conventions: files inside a "__tests__" directory, or named/suffixed "spec"
  `**/__tests__/**/*.{${DEFAULT_NODE_TEST_MATCH_EXTENSIONS}}`,
  `**/spec.{${DEFAULT_NODE_TEST_MATCH_EXTENSIONS}}`,
  `**/*.spec.{${DEFAULT_NODE_TEST_MATCH_EXTENSIONS}}`,
];

export type ReporterKind = "dot" | "junit" | "lcov" | "spec" | "tap";

export type FilePathDestination = string & {};
export type Destination = "stdout" | "stderr" | FilePathDestination;

/**
 * A single reporter/destination pair for the Node.js native test runner.
 *
 * @see https://nodejs.org/api/test.html#test-reporters
 */
export interface NodeReporter {
  /**
   * The name/kind of the reporter.
   */
  readonly name: ReporterKind;
  /**
   * Where the reporter's output is written.
   *
   * @default "stdout"
   */
  // As presented here:
  // https://github.com/nodejs/node/blob/4215cc35e25c44f9f4fea5a4541afc862db7ef0a/test/parallel/test-runner-reporters.js#L46-L77
  readonly destination: Destination;
}

/**
 * Holds the set of reporters configured for a `NodeNativeTest` component,
 * backing the `test.testReporter`/`test.testReporterDestination` fields of
 * the generated Node.js configuration file.
 */
export class NodeReporters extends Component {
  private readonly _reporters: Map<ReporterKind, Destination> = new Map();

  public constructor(scope: IConstruct) {
    super(scope);
  }

  /**
   * Adds a reporter, or updates its destination if one with the same name
   * is already configured.
   * @param name The name/kind of the reporter, e.g. `spec`, `junit`, `lcov`.
   * @param destination Where the reporter's output is written.
   * @default "stdout"
   */
  public add(name: ReporterKind, destination: Destination = "stdout"): void {
    this._reporters.set(name, destination);

    if (destination !== "stdout" && destination !== "stderr") {
      this.ensureDestinationDirectory(destination);
    }
  }

  /**
   * Removes a reporter, if configured.
   * @param name The name/kind of the reporter to remove.
   */
  public remove(name: ReporterKind): void {
    this._reporters.delete(name);
  }

  /**
   * Lists the configured reporters, in the order they were added.
   */
  public list(): NodeReporter[] {
    return Array.from(this._reporters, ([name, destination]) => ({
      name,
      destination,
    }));
  }

  /**
   * Ensures the directory of a reporter's file destination exists before the
   * test runner is invoked, and excludes it from the project's `.gitignore`
   * and package (e.g. `.npmignore`) files.
   */
  private ensureDestinationDirectory(destination: Destination): void {
    const dir = posix.dirname(destination);
    if (dir === ".") {
      return;
    }
    // the reporter does not create the test reports directory
    // itself, so it must exist before the test runner is invoked.
    this.project.testTask.prependExec(`mkdir -p ${dir}`);

    const dirPattern = posix.join("/", dir, "/");
    this.project.addGitIgnore(dirPattern);
    this.project.addPackageIgnore(dirPattern);
  }
}

/**
 * Options for Node.js' built-in test runner (`node --test`).
 */
export interface NodeNativeTestOptions extends JavaScriptTestRunnerOptions {
  /**
   * Additional options to pass to the `node --test` CLI invocation.
   *
   * Each element is passed as a single argument, exactly as given: no shell
   * parses these, so a flag and its value need separate elements
   * (`["--foo", "bar"]`, not `["--foo bar"]`).
   *
   * @default - no extra options
   */
  readonly extraCliOptions?: string[];

  /**
   * Preserve the default reporter when additional reporters are added.
   *
   * @default true
   */
  readonly preserveDefaultReporters?: boolean;

  /**
   * Additional reporters to configure, as reporter name to destination
   * key-value pairs (e.g. `{ dot: "stdout", tap: "test-reports/tap.txt" }`).
   *
   * These are added on top of the default reporters (`spec`, `lcov`, `junit`),
   * which are controlled via `collectCoverage`. `NodeNativeTest.reporters`
   * give access to add, remove or list reporters after construction.
   *
   * @default - no additional reporters
   */
  readonly reporters?: NodeReporter[];

  /**
   * Path to the JSON configuration file for the test runner.
   *
   * @default "node.config.json"
   */
  readonly configFilePath?: string;

  /**
   * Glob patterns matching the files that contain tests. By default it
   * combines Node.js' own default test file discovery with Jest conventions.
   *
   * @default - combines Node.js' own default test file discovery with Jest conventions
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
   * Whether to enable transformation of TypeScript-only syntax (e.g. enums, namespaces).
   *
   * Uses `amaro` (the TypeScript transformer used internally by Node.js) as an
   * external loader via `--import=amaro/transform`. Adds a dependency on the
   * `amaro` package and enables `--enable-source-maps` to preserve accurate
   * stack traces.
   *
   * @see https://github.com/nodejs/amaro
   * @default false
   */
  readonly transformTypes?: boolean;

  /**
   * Additional entries for the `nodeOptions` section of the generated
   * configuration file (e.g. `enableSourceMaps`, `disableWarning`).
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
 * Wires up Node's built-in test runner (`node --test`): the generated
 * configuration file (coverage, reporters, global setup, etc., written via
 * `--experimental-config-file`), the coverage/report directories'
 * gitignore/npmignore entries, and the live `testMatch`/`reporters`
 * collections that feed into it.
 *
 * The "test"/"test:update"/"test:watch" tasks themselves - and the CLI
 * arguments built from this component's options - are owned by
 * `JavaScriptTestRunner`, which constructs this component from
 * `JavaScriptTestRunner.nodejs()` and is the only supported way to attach it
 * to a project.
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
   * Whether snapshots are updated in task "test", or in a separate
   * "test:update" task.
   */
  public readonly updateSnapshot = UpdateSnapshot.ALWAYS;

  /**
   * Glob patterns matching the files that contain tests.
   */
  public readonly testMatch: TestMatch;

  /**
   * The reporters configured for this test runner. Use `add`/`remove`/`list`
   * to manage reporters after construction.
   */
  public readonly reporters: NodeReporters;

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

    // Node's own snapshot files are generated files!
    this.project.root.annotateGenerated("*.snap");

    this.reporters = new NodeReporters(this);
    const preserveDefaultReporters = options.preserveDefaultReporters ?? true;

    this.testMatch = new TestMatch({
      defaultValue: DEFAULT_NODE_TEST_MATCH,
    });

    if (options.testMatch && options.testMatch.length > 0) {
      options.testMatch.forEach((pattern) => this.testMatch.add(pattern));
    }

    const collectCoverage = options.collectCoverage ?? true;
    const coverageDirectory = options.coverageDirectory ?? DEFAULT_COVERAGE_DIR;
    this.coverageDirectory = collectCoverage ? coverageDirectory : undefined;

    if (preserveDefaultReporters && collectCoverage) {
      this.reporters.add("spec", "stdout");
      this.reporters.add("lcov", `${coverageDirectory}/lcov.info`);
      this.reporters.add("junit", `${this.testReportsDir}/junit.xml`);
    }

    for (const { name, destination } of options.reporters ?? []) {
      this.reporters.add(name, destination);
    }

    const defaultTest: NodeConfigSchemaTest = {
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
      experimentalTestModuleMocks: options.moduleMocks,
      // lazily resolved at synthesis time, so that reporters added or
      // removed via `reporters` after construction are reflected in the
      // generated file.
      testReporter: (() => this.reporters.list().map((r) => r.name)) as any,
      testReporterDestination: (() =>
        this.reporters.list().map((r) => r.destination)) as any,
    };
    const test: NodeConfigSchemaTest = deepMerge(
      [defaultTest, options.testConfig ?? {}],
      { destructive: true },
    );

    this.configFile = new NodeConfigFile(this.project, {
      filePath: options.configFilePath,
      test,
      nodeOptions: options.nodeOptions,
    });
    this.project.npmignore?.addPatterns(`/${this.configFile.file.path}`);
  }
}
