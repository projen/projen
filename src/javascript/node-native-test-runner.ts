import { posix } from "path";
import type { IConstruct } from "constructs";
import { Component } from "../component";
import type { Project } from "../project";
import type {
  NodeConfigSchemaNodeOptions,
  NodeConfigSchemaTest,
} from "./node-config";
import { NodeConfigFile } from "./node-config-file";
import { NodeProject } from "./node-project";
import { deepMerge } from "../util";
import { closestProjectMustBe } from "../util/constructs";

/**
 * The default directory used for coverage test reports.
 */
const DEFAULT_COVERAGE_DIR = "coverage";

/**
 * The default directory used for JUnit-compatible test reports.
 */
const DEFAULT_TEST_REPORTS_DIR = "test-reports";

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

/**
 * Whether to update snapshots in task "test" (which is executed in task
 * "build" and build workflows), or create a separate task "test:update" for
 * updating snapshots.
 */
export enum NodeTestUpdateSnapshot {
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
 * Glob patterns matching the files that contain tests.
 */
class TestMatch {
  private readonly _patterns = new Set<string>();
  private readonly _defaultValue: string[];

  constructor(defaultValue: string[]) {
    this._defaultValue = defaultValue;
  }

  /**
   * Adds a test match pattern.
   * @param pattern glob pattern to match for tests
   */
  public add(pattern: string) {
    this._patterns.add(pattern);
  }

  /**
   * Removes a test match pattern, if configured.
   * @param pattern glob pattern to remove
   */
  public remove(pattern: string) {
    this._patterns.delete(pattern);
  }

  /**
   * Lazily resolved, so that `TestMatch` (via `add`/ `remove`) can
   * still be changed after construction and be reflected here.
   */
  public deferred(): string[] {
    return this._patterns.size > 0
      ? Array.from(this._patterns)
      : this._defaultValue;
  }
}

export type ReporterKind = "dot" | "junit" | "lcov" | "spec" | "tap";

/**
 * Where a reporter's output is written.
 *
 * @see https://nodejs.org/api/test.html#test-reporters
 */
export class Destination {
  /**
   * Write to standard output.
   */
  public static readonly STDOUT = new Destination("stdout");

  /**
   * Write to standard error.
   */
  public static readonly STDERR = new Destination("stderr");

  /**
   * Write to a file at the given path.
   * @param path path of the file to write to
   */
  public static file(path: string): Destination {
    return new Destination(path);
  }

  private constructor(
    /**
     * The underlying value: `"stdout"`, `"stderr"`, or a file path.
     */
    public readonly value: string,
  ) {}
}

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
   * @see https://github.com/nodejs/node/blob/4215cc35e25c44f9f4fea5a4541afc862db7ef0a/test/parallel/test-runner-reporters.js#L46-L77
   * @default Destination.STDOUT
   */
  readonly destination: Destination;
}

/**
 * Holds the set of reporters configured for a `NodeNativeTestRunner` component,
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
   * @default Destination.STDOUT
   */
  public add(
    name: ReporterKind,
    destination: Destination = Destination.STDOUT,
  ): void {
    this._reporters.set(name, destination);

    if (
      destination !== Destination.STDOUT &&
      destination !== Destination.STDERR
    ) {
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
    const dir = posix.dirname(destination.value);
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
export interface NodeNativeTestRunnerOptions {
  /**
   * The directory where coverage files are output, if coverage collection
   * is enabled.
   *
   * @default "coverage"
   */
  readonly coverageDirectory?: string;

  /**
   * Whether to update snapshots in task "test" (which is executed in task
   * "build" and build workflows), or create a separate task "test:update"
   * for updating snapshots.
   *
   * @default - ALWAYS
   */
  readonly updateSnapshot?: NodeTestUpdateSnapshot;

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
   * Preserve the default reporters (`spec`, `lcov`, `junit`) when additional
   * reporters are added.
   *
   * @default true
   */
  readonly preserveDefaultReporters?: boolean;

  /**
   * Additional reporters to configure (e.g. `{ name: "tap", destination:
   * Destination.file("test-reports/tap.txt") }`).
   *
   * These are added on top of the default reporters (`spec`, `lcov`, `junit`),
   * which are controlled via `collectCoverage`. `NodeNativeTestRunner.reporters`
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
   * Additional entries for the `test` section of the generated
   * configuration file (e.g. `testConcurrency`, `testTimeout`).
   *
   * @default - no additional options
   */
  readonly testConfig?: NodeConfigSchemaTest;
}

/**
 * Configures Node's built-in test runner (`node --test`).
 *
 * Manages the generated Node.js configuration file, the "test"/"test:update"/
 * "test:watch" tasks, and the reporters and test match patterns used by them.
 */
export class NodeNativeTestRunner extends Component {
  /**
   * Returns the singleton NodeNativeTestRunner component of a project or undefined
   * if there is none.
   */
  public static of(project: Project): NodeNativeTestRunner | undefined {
    const isNodeNativeTestRunner = (c: Component): c is NodeNativeTestRunner =>
      c instanceof NodeNativeTestRunner;
    return project.components.find(isNodeNativeTestRunner);
  }

  public readonly project: NodeProject;

  /**
   * The directory where Node outputs its coverage files.
   */
  private readonly coverageDirectory?: string;

  /**
   * Whether snapshots are updated in task "test", or in a separate
   * "test:update" task.
   */
  private readonly updateSnapshot: NodeTestUpdateSnapshot;

  /**
   * The reporters configured for this test runner. Use `add`/`remove`/`list`
   * to manage reporters after construction.
   */
  public readonly reporters: NodeReporters;

  /**
   * The generated Node.js configuration file.
   */
  public readonly configFile: NodeConfigFile;

  /**
   * The directory used for JUnit-compatible test reports.
   */
  private readonly testReportsDir: string = DEFAULT_TEST_REPORTS_DIR;

  /**
   * Glob patterns matching the files that contain tests.
   */
  private readonly testMatch: TestMatch;

  constructor(scope: IConstruct, options: NodeNativeTestRunnerOptions = {}) {
    super(scope);
    this.project = closestProjectMustBe(scope, NodeProject, new.target.name);

    // Node's own snapshot files are generated files!
    this.project.root.annotateGenerated("*.snap");
    this.project.root.annotateGenerated("*.snapshot");

    this.updateSnapshot =
      options.updateSnapshot ?? NodeTestUpdateSnapshot.ALWAYS;

    this.reporters = new NodeReporters(this);
    const preserveDefaultReporters = options.preserveDefaultReporters ?? true;

    this.testMatch = new TestMatch(DEFAULT_NODE_TEST_MATCH);

    if (options.testMatch && options.testMatch.length > 0) {
      options.testMatch.forEach((pattern) => this.testMatch.add(pattern));
    }

    const collectCoverage = options.collectCoverage ?? true;
    const coverageDirectory = options.coverageDirectory ?? DEFAULT_COVERAGE_DIR;
    this.coverageDirectory = collectCoverage ? coverageDirectory : undefined;

    if (this.coverageDirectory) {
      const coverageDirectoryPath = posix.join(
        "/",
        this.coverageDirectory,
        "/",
      );
      this.project.addGitIgnore(coverageDirectoryPath);
      this.project.addPackageIgnore(coverageDirectoryPath);
    }

    if (preserveDefaultReporters && collectCoverage) {
      this.reporters.add("spec", Destination.STDOUT);
      this.reporters.add(
        "lcov",
        Destination.file(`${coverageDirectory}/lcov.info`),
      );
      this.reporters.add(
        "junit",
        Destination.file(`${this.testReportsDir}/junit.xml`),
      );
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
        this.reporters.list().map((r) => r.destination.value)) as any,
    };
    const test: NodeConfigSchemaTest = deepMerge(
      [defaultTest, options.testConfig ?? {}],
      { destructive: true },
    );

    let nodeOptions: NodeConfigSchemaNodeOptions = { ...options.nodeOptions };
    const extraCliOptions = options.extraCliOptions ?? [];

    if (options.transformTypes ?? false) {
      this.project.addDevDeps("amaro");
      const imports = nodeOptions.import ?? [];
      if (!imports.includes("amaro/transform")) {
        imports.unshift("amaro/transform");
      }
      nodeOptions = {
        ...nodeOptions,
        enableSourceMaps: true,
        import: imports,
      };
    }

    this.configFile = new NodeConfigFile(this.project, {
      filePath: options.configFilePath,
      test,
      nodeOptions,
    });
    this.project.npmignore?.addPatterns(`/${this.configFile.file.path}`);

    // Flags common to every invocation. Test match patterns are positional
    // arguments, so they must come after every flag - once Node sees the
    // first positional argument, it stops parsing flags, so any flag
    // appended after them (e.g. `--watch`) is ignored.
    const command: string[] = [
      "node",
      `--experimental-config-file=${this.configFile.file.path}`,
      ...extraCliOptions,
    ];

    // `testMatch` is a live collection (`add`/`remove` can still be called
    // after construction), so its resolution is deferred with `lazyExecArgs`
    // rather than read eagerly here.
    const testMatchArgs = () => this.testMatch.deferred();

    if (this.updateSnapshot === NodeTestUpdateSnapshot.ALWAYS) {
      this.project.testTask.execArgs(
        lazyExecArgs(() => [
          ...command,
          "--test-update-snapshots",
          ...testMatchArgs(),
        ]),
        { receiveArgs: true },
      );
    } else {
      const testUpdate = this.project.tasks.tryFind("test:update");
      if (!testUpdate) {
        this.project.addTask("test:update", {
          description: "Update test snapshots",
          execArgs: lazyExecArgs(() => [
            ...command,
            "--test-update-snapshots",
            ...testMatchArgs(),
          ]),
          receiveArgs: true,
        });
      }

      this.project.testTask.execArgs(
        lazyExecArgs(() => [...command, ...testMatchArgs()]),
        { receiveArgs: true },
      );
    }

    const testWatch = this.project.tasks.tryFind("test:watch");
    if (!testWatch) {
      this.project.addTask("test:watch", {
        description: "Run tests in watch mode",
        execArgs: lazyExecArgs(() => [
          ...command,
          "--watch",
          ...testMatchArgs(),
        ]),
      });
    }
  }

  /**
   * Adds a test match pattern.
   * @param pattern glob pattern to match for tests
   */
  public addTestMatch(pattern: string) {
    this.testMatch.add(pattern);
  }

  /**
   * Removes a test match pattern, if configured.
   * @param pattern glob pattern to remove
   */
  public removeTestMatch(pattern: string) {
    this.testMatch.remove(pattern);
  }
}

/**
 * Defers resolution of a `TaskStep`'s `execArgs` to synthesis time, when the
 * tasks manifest is rendered.
 *
 * `TaskStep.execArgs` is typed as a plain `string[]`, but the manifest is
 * written through the generic `resolve()` walker (see
 * `ProjenTaskRunner.tasksManifest`) - the same mechanism `JsonFile`/`ObjectFile`
 * use for lazy values elsewhere (e.g. `NodeReporters.list`, `TestMatch`).
 * That walker calls any function it finds, so a callback deferred here runs
 * once, at that point, in place of a plain array.
 */
function lazyExecArgs(fn: () => string[]): string[] {
  return fn as any;
}
