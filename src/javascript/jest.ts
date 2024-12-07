import * as path from "path";
import { Component } from "../component";
import { NodePackageType, NodeProject } from "../javascript";
import { JsonFile } from "../json";
import { Project } from "../project";
import { normalizePersistedPath } from "../util";

const DEFAULT_TEST_REPORTS_DIR = "test-reports";

// Pulled from https://jestjs.io/docs/en/configuration
export interface JestConfigOptions {
  /**
   * This option tells Jest that all imported modules in your tests should be mocked automatically.
   * All modules used in your tests will have a replacement implementation, keeping the API surface
   * @default - false
   */
  readonly automock?: boolean;

  /**
   * By default, Jest runs all tests and produces all errors into the console upon completion.
   * The bail config option can be used here to have Jest stop running tests after n failures.
   * Setting bail to true is the same as setting bail to 1.
   * @default - 0
   */
  readonly bail?: boolean | number;

  /**
   * The directory where Jest should store its cached dependency information
   * @default - "/tmp/<path>"
   */
  readonly cacheDirectory?: string;

  /**
   * Automatically clear mock calls and instances before every test.
   * Equivalent to calling jest.clearAllMocks() before each test.
   * This does not remove any mock implementation that may have been provided
   * @default true
   */
  readonly clearMocks?: boolean;

  /**
   * Indicates whether the coverage information should be collected while executing the test.
   * Because this retrofits all executed files with coverage collection statements,
   * it may significantly slow down your tests
   * @default true
   */
  readonly collectCoverage?: boolean;

  /**
   * An array of glob patterns indicating a set of files for which coverage information should be collected.
   * @default - undefined
   */
  readonly collectCoverageFrom?: string[];

  /**
   * The directory where Jest should output its coverage files.
   * @default "coverage"
   */
  readonly coverageDirectory?: string;

  /**
   * An array of regexp pattern strings that are matched against all file paths before executing the test.
   * If the file path matches any of the patterns, coverage information will be skipped
   * @default "/node_modules/"
   */
  readonly coveragePathIgnorePatterns?: string[];

  /**
   * Indicates which provider should be used to instrument code for coverage.
   * Allowed values are v8 (default) or babel
   * @default - "v8"
   */
  readonly coverageProvider?: "babel" | "v8";

  /**
   * A list of reporter names that Jest uses when writing coverage reports. Any istanbul reporter can be used
   * @default - ["json", "lcov", "text", "clover", "cobertura"]
   */
  readonly coverageReporters?: string[];

  /**
   * Specify the global coverage thresholds. This will be used to configure minimum threshold enforcement
   * for coverage results. Thresholds can be specified as global, as a glob, and as a directory or file path.
   * If thresholds aren't met, jest will fail.
   * @default - undefined
   */
  readonly coverageThreshold?: CoverageThreshold;

  /**
   * This option allows the use of a custom dependency extractor.
   * It must be a node module that exports an object with an extract function
   * @default - undefined
   */
  readonly dependencyExtractor?: string;

  /**
   * Allows for a label to be printed alongside a test while it is running.
   * @default - undefined
   */
  readonly displayName?: string | any;

  /**
   * Make calling deprecated APIs throw helpful error messages. Useful for easing the upgrade process.
   * @default - false
   */
  readonly errorOnDeprecated?: boolean;

  /**
   * Test files run inside a vm, which slows calls to global context properties (e.g. Math).
   * With this option you can specify extra properties to be defined inside the vm for faster lookups.
   * @default - undefined
   */
  readonly extraGlobals?: string[];

  /**
   * Test files are normally ignored from collecting code coverage.
   * With this option, you can overwrite this behavior and include otherwise ignored files in code coverage.
   * @default - ['']
   */
  readonly forceCoverageMatch?: string[];

  /**
   * A set of global variables that need to be available in all test environments.
   * @default - {}
   */
  readonly globals?: any;

  /**
   * This option allows the use of a custom global setup module which exports an async function that is
   * triggered once before all test suites. This function gets Jest's globalConfig object as a parameter.
   * @default - undefined
   */
  readonly globalSetup?: string;

  /**
   * This option allows the use of a custom global teardown module which exports an async function that is
   * triggered once after all test suites. This function gets Jest's globalConfig object as a parameter.
   * @default - undefined
   */
  readonly globalTeardown?: string;

  /**
   * This will be used to configure the behavior of jest-haste-map, Jest's internal file crawler/cache system.
   * @default - {}
   */
  readonly haste?: HasteConfig;

  /**
   * Insert Jest's globals (expect, test, describe, beforeEach etc.) into the global environment.
   * If you set this to false, you should import from @jest/globals
   * @default - true
   */
  readonly injectGlobals?: boolean;

  /**
   * A number limiting the number of tests that are allowed to run at the same time when using test.concurrent.
   * Any test above this limit will be queued and executed once a slot is released.
   * @default - 5
   */
  readonly maxConcurrency?: number;

  /**
   * Specifies the maximum number of workers the worker-pool will spawn for running tests. In single run mode,
   * this defaults to the number of the cores available on your machine minus one for the main thread
   * In watch mode, this defaults to half of the available cores on your machine.
   * For environments with variable CPUs available, you can use percentage based configuration: "maxWorkers": "50%"
   * @default - the number of the cores available on your machine minus one for the main thread
   */
  readonly maxWorkers?: number | string;

  /**
   * An array of directory names to be searched recursively up from the requiring module's location.
   * Setting this option will override the default, if you wish to still search node_modules for packages
   * include it along with any other options: ["node_modules", "bower_components"]
   * @default - ["node_modules"]
   */
  readonly moduleDirectories?: string[];

  /**
   * An array of file extensions your modules use. If you require modules without specifying a file extension,
   * these are the extensions Jest will look for, in left-to-right order.
   * @default - ["js", "json", "jsx", "ts", "tsx", "node"]
   */
  readonly moduleFileExtensions?: string[];

  /**
   * A map from regular expressions to module names or to arrays of module names that allow to stub out
   * resources, like images or styles with a single module.
   * @default - null
   */
  readonly moduleNameMapper?: { [key: string]: string | string[] };

  /**
   * An array of regexp pattern strings that are matched against all module paths before those paths are
   * to be considered 'visible' to the module loader. If a given module's path matches any of the patterns,
   * it will not be require()-able in the test environment.
   * @default - []
   */
  readonly modulePathIgnorePatterns?: string[];

  /**
   * An alternative API to setting the NODE_PATH env variable, modulePaths is an array of absolute paths
   * to additional locations to search when resolving modules. Use the <rootDir> string token to include
   * the path to your project's root directory. Example: ["<rootDir>/app/"].
   * @default - []
   */
  readonly modulePaths?: string[];

  /**
   * Activates notifications for test results.
   * @default - false
   */
  readonly notify?: boolean;

  /**
   * Specifies notification mode. Requires notify: true
   * @default - failure-change
   */
  readonly notifyMode?:
    | "always"
    | "failure"
    | "success"
    | "change"
    | "success-change"
    | "failure-change";

  /**
   * A preset that is used as a base for Jest's configuration. A preset should point to an npm module
   * that has a jest-preset.json or jest-preset.js file at the root.
   * @default - undefined
   */
  readonly preset?: string;

  /**
   * Sets the path to the prettier node module used to update inline snapshots.
   * @default - "prettier"
   */
  readonly prettierPath?: string;

  /**
   * When the projects configuration is provided with an array of paths or glob patterns, Jest will
   * run tests in all of the specified projects at the same time. This is great for monorepos or
   * when working on multiple projects at the same time.
   * @default - undefined
   */
  readonly projects?: Array<string | { [key: string]: any }>;

  /**
   * Use this configuration option to add custom reporters to Jest. A custom reporter is a class
   * that implements onRunStart, onTestStart, onTestResult, onRunComplete methods that will be
   * called when any of those events occurs.
   * @default - undefined
   */
  readonly reporters?: JestReporter[];

  /**
   * Automatically reset mock state before every test. Equivalent to calling jest.resetAllMocks()
   * before each test. This will lead to any mocks having their fake implementations removed but
   * does not restore their initial implementation.
   * @default - false
   */
  readonly resetMocks?: boolean;

  /**
   * By default, each test file gets its own independent module registry. Enabling resetModules
   * goes a step further and resets the module registry before running each individual test.
   * @default - false
   */
  readonly resetModules?: boolean;

  /**
   * This option allows the use of a custom resolver.
   * https://jestjs.io/docs/en/configuration#resolver-string
   * @default - undefined
   */
  readonly resolver?: string;

  /**
   * Automatically restore mock state before every test. Equivalent to calling jest.restoreAllMocks()
   * before each test. This will lead to any mocks having their fake implementations removed and
   * restores their initial implementation.
   * @default - false
   */
  readonly restoreMocks?: boolean;

  /**
   * The root directory that Jest should scan for tests and modules within. If you put your Jest
   * config inside your package.json and want the root directory to be the root of your repo, the
   * value for this config param will default to the directory of the package.json.
   * @default - directory of the package.json
   */
  readonly rootDir?: string;

  /**
   * A list of paths to directories that Jest should use to search for files in.
   * @default - ["<rootDir>"]
   */
  readonly roots?: string[];

  /**
   * This option allows you to use a custom runner instead of Jest's default test runner.
   * @default - "jest-runner"
   */
  readonly runner?: string;

  /**
   * A list of paths to modules that run some code to configure or set up the testing environment.
   * Each setupFile will be run once per test file. Since every test runs in its own environment,
   * these scripts will be executed in the testing environment immediately before executing the
   * test code itself.
   * @default - []
   */
  readonly setupFiles?: string[];

  /**
   * A list of paths to modules that run some code to configure or set up the testing framework
   * before each test file in the suite is executed. Since setupFiles executes before the test
   * framework is installed in the environment, this script file presents you the opportunity of
   * running some code immediately after the test framework has been installed in the environment.
   * @default - []
   */
  readonly setupFilesAfterEnv?: string[];

  /**
   * The number of seconds after which a test is considered as slow and reported as such in the results.
   * @default - 5
   */
  readonly slowTestThreshold?: number;

  /**
   * The path to a module that can resolve test<->snapshot path. This config option lets you customize
   * where Jest stores snapshot files on disk.
   * @default - undefined
   */
  readonly snapshotResolver?: string;

  /**
   * A list of paths to snapshot serializer modules Jest should use for snapshot testing.
   * @default = []
   */
  readonly snapshotSerializers?: string[];

  /**
   * The test environment that will be used for testing. The default environment in Jest is a
   * browser-like environment through jsdom. If you are building a node service, you can use the node
   * option to use a node-like environment instead.
   * @default - "jsdom"
   */
  readonly testEnvironment?: string;

  /**
   * Test environment options that will be passed to the testEnvironment.
   * The relevant options depend on the environment.
   * @default - {}
   */
  readonly testEnvironmentOptions?: any;

  /**
   * The exit code Jest returns on test failure.
   * @default - 1
   */
  readonly testFailureExitCode?: number;

  /**
   * The glob patterns Jest uses to detect test files. By default it looks for .js, .jsx, .ts and .tsx
   * files inside of __tests__ folders, as well as any files with a suffix of .test or .spec
   * (e.g. Component.test.js or Component.spec.js). It will also find files called test.js or spec.js.
   * @default ['**\/__tests__/**\/*.[jt]s?(x)', '**\/*(*.)@(spec|test).[tj]s?(x)']
   */
  readonly testMatch?: string[];

  /**
   * An array of regexp pattern strings that are matched against all test paths before executing the test.
   * If the test path matches any of the patterns, it will be skipped.
   * @default - ["/node_modules/"]
   */
  readonly testPathIgnorePatterns?: string[];

  /**
   * The pattern or patterns Jest uses to detect test files. By default it looks for .js, .jsx, .ts and .tsx
   * files inside of __tests__ folders, as well as any files with a suffix of .test or .spec
   * (e.g. Component.test.js or Component.spec.js). It will also find files called test.js or spec.js.
   * @default - (/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$
   */
  readonly testRegex?: string | string[];

  /**
   * This option allows the use of a custom results processor.
   * @default - undefined
   */
  readonly testResultsProcessor?: string;

  /**
   * This option allows the use of a custom test runner. The default is jasmine2. A custom test runner
   * can be provided by specifying a path to a test runner implementation.
   * @default - "jasmine2"
   */
  readonly testRunner?: string;

  /**
   * This option allows you to use a custom sequencer instead of Jest's default.
   * Sort may optionally return a Promise.
   * @default - "@jest/test-sequencer"
   */
  readonly testSequencer?: string;

  /**
   * Default timeout of a test in milliseconds.
   * @default - 5000
   */
  readonly testTimeout?: number;

  /**
   * This option sets the URL for the jsdom environment. It is reflected in properties such as location.href.
   * @default - "http://localhost"
   */
  readonly testURL?: string;

  /**
   * Setting this value to legacy or fake allows the use of fake timers for functions such as setTimeout.
   * Fake timers are useful when a piece of code sets a long timeout that we don't want to wait for in a test.
   * @default - "real"
   */
  readonly timers?: string;

  /**
   * A map from regular expressions to paths to transformers. A transformer is a module that provides a
   * synchronous function for transforming source files.
   * @default - {"\\.[jt]sx?$": "babel-jest"}
   */
  readonly transform?: { [key: string]: Transform };

  /**
   * An array of regexp pattern strings that are matched against all source file paths before transformation.
   * If the test path matches any of the patterns, it will not be transformed.
   * @default - ["/node_modules/", "\\.pnp\\.[^\\\/]+$"]
   */
  readonly transformIgnorePatterns?: string[];

  /**
   * An array of regexp pattern strings that are matched against all modules before the module loader will
   * automatically return a mock for them. If a module's path matches any of the patterns in this list, it
   * will not be automatically mocked by the module loader.
   * @default - []
   */
  readonly unmockedModulePathPatterns?: string[];

  /**
   * Indicates whether each individual test should be reported during the run. All errors will also
   * still be shown on the bottom after execution. Note that if there is only one test file being run
   * it will default to true.
   * @default - false
   */
  readonly verbose?: boolean;

  /**
   * An array of RegExp patterns that are matched against all source file paths before re-running tests
   * in watch mode. If the file path matches any of the patterns, when it is updated, it will not trigger
   * a re-run of tests.
   * @default - []
   */
  readonly watchPathIgnorePatterns?: string[];

  /**
   *
   * @default -
   */
  readonly watchPlugins?: WatchPlugin[];

  /**
   * Whether to use watchman for file crawling.
   * @default - true
   */
  readonly watchman?: boolean;

  /**
   * Escape hatch to allow any value
   */
  readonly additionalOptions?: { [name: string]: any };

  /**
   * Escape hatch to allow any value (JS/TS only)
   *
   * @deprecated use `additionalOptions` instead.
   *
   * @jsii ignore
   */
  readonly [name: string]: any;
}

/**
 * Options for discoverTestMatchPatternsForDirs.
 */
export interface JestDiscoverTestMatchPatternsForDirsOptions {
  /** The file extension pattern to use. Defaults to "[jt]s?(x)". */
  readonly fileExtensionPattern?: string;
}

export class Transform {
  public constructor(
    private readonly name: string,
    private readonly options?: any
  ) {}

  /**
   * @jsii ignore
   * @internal
   */
  public toJSON() {
    if (this.options != null) {
      return [this.name, this.options];
    }
    return this.name;
  }
}

export class WatchPlugin {
  public constructor(
    private readonly name: string,
    private readonly options?: any
  ) {}

  /**
   * @jsii ignore
   * @internal
   */
  public toJSON() {
    if (this.options != null) {
      return [this.name, this.options];
    }
    return this.name;
  }
}

export interface JestOptions {
  /**
   * Collect coverage. Deprecated
   * @default true
   * @deprecated use jestConfig.collectCoverage
   */
  readonly coverage?: boolean;

  /**
   * Include the `text` coverage reporter, which means that coverage summary is printed
   * at the end of the jest execution.
   *
   * @default true
   */
  readonly coverageText?: boolean;

  /**
   * Defines `testPathIgnorePatterns` and `coveragePathIgnorePatterns`
   * @default ["/node_modules/"]
   * @deprecated use jestConfig.coveragePathIgnorePatterns or jestConfig.testPathIgnorePatterns respectively
   */
  readonly ignorePatterns?: string[];

  /**
   * Result processing with jest-junit.
   *
   * Output directory is `test-reports/`.
   *
   * @default true
   */
  readonly junitReporting?: boolean;

  /**
   * Preserve the default Jest reporter when additional reporters are added.
   *
   * @default true
   */
  readonly preserveDefaultReporters?: boolean;

  /**
   * Whether to update snapshots in task "test" (which is executed in task "build" and build workflows),
   * or create a separate task "test:update" for updating snapshots.
   *
   * @default - ALWAYS
   */
  readonly updateSnapshot?: UpdateSnapshot;

  /**
   * The version of jest to use.
   *
   * Note that same version is used as version of `@types/jest` and `ts-jest` (if Typescript in use), so given version should work also for those.
   *
   * @default - installs the latest jest version
   */
  readonly jestVersion?: string;

  /**
   * Path to JSON config file for Jest
   *
   * @default - No separate config file, jest settings are stored in package.json
   */
  readonly configFilePath?: string;

  /**
   * Jest configuration.
   * @default - default jest configuration
   */
  readonly jestConfig?: JestConfigOptions;

  /**
   * Additional options to pass to the Jest CLI invocation
   * @default - no extra options
   */
  readonly extraCliOptions?: string[];

  /**
   * Pass with no tests
   * @default - true
   */
  readonly passWithNoTests?: boolean;
}

export interface CoverageThreshold {
  readonly branches?: number;
  readonly functions?: number;
  readonly lines?: number;
  readonly statements?: number;
}

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

export interface HasteConfig {
  readonly computeSha1?: boolean;
  readonly defaultPlatform?: string | undefined;
  readonly hasteImplModulePath?: string;
  readonly platforms?: Array<string>;
  readonly throwOnModuleCollision?: boolean;
}

export class JestReporter {
  public constructor(
    private readonly name: string,
    private readonly options?: { [key: string]: any }
  ) {}

  /**
   * @jsii ignore
   * @internal
   */
  public toJSON(): any {
    if (this.options == null) {
      return this.name;
    }
    return [this.name, this.options];
  }
}

/**
 * Installs the following npm scripts:
 *
 * - `test`, intended for testing locally and in CI. Will update snapshots unless `updateSnapshot: UpdateSnapshot: NEVER` is set.
 * - `test:watch`, intended for automatically rerunning tests when files change.
 * - `test:update`, intended for testing locally and updating snapshots to match the latest unit under test. Only available when `updateSnapshot: UpdateSnapshot: NEVER`.
 *
 */
export class Jest extends Component {
  /**
   * Returns the singleton Jest component of a project or undefined if there is none.
   */
  public static of(project: Project): Jest | undefined {
    const isJest = (c: Component): c is Jest => c instanceof Jest;
    return project.components.find(isJest);
  }
  /**
   * Escape hatch.
   */
  readonly config: any;

  /**
   * Jest version, including `@` symbol, like `@^29`
   */
  readonly jestVersion: string;

  /**
   * Jest config file. `undefined` if settings are written to `package.json`
   */
  readonly file?: JsonFile;

  private readonly testMatch = new Array<string>();
  private readonly ignorePatterns: string[];
  private readonly watchIgnorePatterns: string[];
  private readonly coverageReporters: string[];
  private readonly reporters: JestReporter[];
  private readonly jestConfig?: JestConfigOptions & {
    readonly additionalOptions: undefined;
    [key: string]: unknown;
  };
  private readonly extraCliOptions: string[];
  private readonly passWithNoTests: boolean;
  private _snapshotResolver: string | undefined;

  constructor(project: NodeProject, options: JestOptions = {}) {
    super(project);

    // hard deprecation
    if ((options as any).typescriptConfig) {
      throw new Error(
        '"jestOptions.typescriptConfig" is deprecated. Use "typescriptProject.tsconfigDev" instead'
      );
    }

    // Jest snapshot files are generated files!
    project.root.annotateGenerated("*.snap");
    this.jestVersion = options.jestVersion ? `@${options.jestVersion}` : "";
    project.addDevDeps(`jest${this.jestVersion}`);

    // use native v8 coverage collection as default
    // https://jestjs.io/docs/en/cli#--coverageproviderprovider
    const coverageProvider = this.jestConfig?.coverageProvider ?? "v8";

    this.jestConfig = {
      coverageProvider,
      ...options.jestConfig,
      additionalOptions: undefined,
      ...options.jestConfig?.additionalOptions,
    };
    this.extraCliOptions = options.extraCliOptions ?? [];
    this.passWithNoTests = options.passWithNoTests ?? true;

    this.ignorePatterns = this.jestConfig?.testPathIgnorePatterns ??
      options.ignorePatterns ?? ["/node_modules/"];
    this.watchIgnorePatterns = this.jestConfig?.watchPathIgnorePatterns ?? [
      "/node_modules/",
    ];
    this.coverageReporters = this.jestConfig?.coverageReporters ?? [
      "json",
      "lcov",
      "clover",
      "cobertura",
    ];

    if (this.jestConfig?.testMatch && this.jestConfig.testMatch.length > 0) {
      this.jestConfig.testMatch.forEach((pattern) =>
        this.addTestMatch(pattern)
      );
    }

    const coverageDirectory = this.jestConfig?.coverageDirectory ?? "coverage";

    this.reporters = [];

    if (options.preserveDefaultReporters ?? true) {
      this.reporters.unshift(new JestReporter("default"));
    }

    this.config = {
      ...this.jestConfig,
      clearMocks: this.jestConfig?.clearMocks ?? true,
      collectCoverage:
        options.coverage ?? this.jestConfig?.collectCoverage ?? true,
      coverageReporters: this.coverageReporters,
      coverageDirectory: coverageDirectory,
      coveragePathIgnorePatterns:
        this.jestConfig?.coveragePathIgnorePatterns ?? this.ignorePatterns,
      testPathIgnorePatterns: this.ignorePatterns,
      watchPathIgnorePatterns: this.watchIgnorePatterns,
      // @ts-expect-error - lazily loading the testMatch in order to only apply defaults if none are ever added
      testMatch: () =>
        this.testMatch.length > 0
          ? this.testMatch
          : [`**/__tests__/**/*.[jt]s?(x)`, `**/*(*.)@(spec|test).[jt]s?(x)`], // Jest defaults
      reporters: this.reporters,
      snapshotResolver: (() => this._snapshotResolver) as any,
    } satisfies JestConfigOptions;

    if (options.junitReporting ?? true) {
      const reportsDir = DEFAULT_TEST_REPORTS_DIR;

      this.addReporter(
        new JestReporter("jest-junit", { outputDirectory: reportsDir })
      );

      project.addDevDeps("jest-junit@^15");

      project.gitignore.exclude(
        "# jest-junit artifacts",
        `/${reportsDir}/`,
        "junit.xml"
      );
      project.npmignore?.exclude(
        "# jest-junit artifacts",
        `/${reportsDir}/`,
        "junit.xml"
      );
    }

    if (this.jestConfig?.reporters) {
      for (const reporter of this.jestConfig.reporters) {
        this.addReporter(reporter);
      }
    }

    if (this.jestConfig?.coverageThreshold) {
      this.config.coverageThreshold = {
        global: this.jestConfig?.coverageThreshold,
      };
    }

    this.configureTestCommand(options.updateSnapshot ?? UpdateSnapshot.ALWAYS);

    if (options.configFilePath) {
      this.file = new JsonFile(project, options.configFilePath, {
        obj: this.config,
      });
      project.npmignore?.addPatterns(`/${this.file.path}`);
    } else {
      project.addFields({ jest: this.config });
    }

    const coverageDirectoryPath = path.posix.join("/", coverageDirectory, "/");
    project.npmignore?.exclude(coverageDirectoryPath);
    project.gitignore.exclude(coverageDirectoryPath);

    if (options.coverageText ?? true) {
      this.coverageReporters.push("text");
    }
  }

  /**
   * Adds a test match pattern.
   * @param pattern glob pattern to match for tests
   */
  public addTestMatch(pattern: string) {
    this.testMatch.push(pattern);
  }

  /**
   * Build standard test match patterns for a directory.
   * @param dirs The directories to add test matches for. Matches any folder if not specified or an empty array.
   * @param options Options for building test match patterns.
   */
  public discoverTestMatchPatternsForDirs(
    dirs: string[],
    options?: JestDiscoverTestMatchPatternsForDirsOptions
  ): void {
    const testPatterns = this.buildTestMatchPatternsForDirs(dirs, options);

    testPatterns.forEach((pattern) => this.addTestMatch(pattern));
  }

  /**
   * Build standard test match patterns for a directory.
   * @param dirs The directories to add test matches for. Matches any folder if not specified.
   * @param fileExtensionPattern The file extension pattern to use. Defaults to "[jt]s?(x)".
   * @returns The test match patterns.
   */
  private buildTestMatchPatternsForDirs(
    dirs: string[],
    options?: JestDiscoverTestMatchPatternsForDirsOptions
  ): string[] {
    const fileExtensionPattern = options?.fileExtensionPattern ?? "[jt]s?(x)";
    return [
      `<rootDir>/@(${dirs.join(
        "|"
      )})/**/*(*.)@(spec|test).${fileExtensionPattern}`,
      `<rootDir>/@(${dirs.join(
        "|"
      )})/**/__tests__/**/*.${fileExtensionPattern}`,
    ];
  }

  /**
   * Adds a watch ignore pattern.
   * @param pattern The pattern (regular expression).
   */
  public addWatchIgnorePattern(pattern: string) {
    this.watchIgnorePatterns.push(pattern);
  }

  public addIgnorePattern(pattern: string) {
    this.ignorePatterns.push(pattern);
  }

  public addReporter(reporter: JestReporter) {
    this.reporters.push(reporter);
  }

  /**
   * Adds a a setup file to Jest's setupFiles configuration.
   * @param file File path to setup file
   */
  public addSetupFile(file: string) {
    if (!this.config.setupFiles) {
      this.config.setupFiles = [];
    }
    this.config.setupFiles.push(file);
  }

  /**
   * Adds a a setup file to Jest's setupFilesAfterEnv configuration.
   * @param file File path to setup file
   */
  public addSetupFileAfterEnv(file: string) {
    if (!this.config.setupFilesAfterEnv) {
      this.config.setupFilesAfterEnv = [];
    }
    this.config.setupFilesAfterEnv.push(file);
  }

  public addSnapshotResolver(file: string) {
    const normalized = normalizePersistedPath(file);

    this._snapshotResolver = normalized;
  }

  /**
   * Adds one or more moduleNameMapper entries to Jest's configuration.
   * Will overwrite if the same key is used as a pre-existing one.
   *
   * @param moduleNameMapperAdditions - A map from regular expressions to module names or to arrays of module names that allow to stub out resources, like images or styles with a single module.
   */
  public addModuleNameMappers(moduleNameMapperAdditions: {
    [key: string]: string | string[];
  }): void {
    const existingModuleNameMapper = this.config.moduleNameMapper ?? {};
    this.config.moduleNameMapper = {
      ...existingModuleNameMapper,
      ...moduleNameMapperAdditions,
    };
  }

  /**
   * Adds one or more modulePaths to Jest's configuration.
   *
   * @param modulePaths - An array of absolute paths to additional locations to search when resolving modules   *
   */
  public addModulePaths(...modulePaths: string[]): void {
    const existingModulePaths = this.config.modulePaths ?? [];
    this.config.modulePaths = [
      ...new Set([...existingModulePaths, ...modulePaths]),
    ];
  }

  /**
   * Adds one or more roots to Jest's configuration.
   *
   * @param roots - A list of paths to directories that Jest should use to search for files in.
   */
  public addRoots(...roots: string[]): void {
    const existingRoots = this.config.roots ?? [];
    this.config.roots = [...new Set([...existingRoots, ...roots])];
  }

  private configureTestCommand(updateSnapshot: UpdateSnapshot) {
    const jestOpts = this.extraCliOptions;
    const jestConfigOpts =
      this.file && this.file.path != "jest.config.json"
        ? ` -c ${this.file.path}`
        : "";

    if (this.passWithNoTests) {
      jestOpts.push("--passWithNoTests");
    }
    if (updateSnapshot === UpdateSnapshot.ALWAYS) {
      jestOpts.push("--updateSnapshot");
    } else {
      jestOpts.push("--ci"); // to prevent accepting new snapshots

      const testUpdate = this.project.tasks.tryFind("test:update");
      if (!testUpdate) {
        this.project.addTask("test:update", {
          description: "Update jest snapshots",
          exec: `jest --updateSnapshot ${jestOpts.join(" ")}${jestConfigOpts}`,
          receiveArgs: true,
        });
      }
    }

    this.project.testTask.exec(`jest ${jestOpts.join(" ")}${jestConfigOpts}`, {
      receiveArgs: true,
    });

    // Add --experimental-vm-modules to NODE_OPTIONS if using ESM
    // See https://jestjs.io/docs/next/ecmascript-modules
    if (
      this.project instanceof NodeProject &&
      this.project.package.type === NodePackageType.ESM
    ) {
      // Note we ADD to NODE_OPTIONS, not replace it
      // That way we don't disturb other things that might be in NODE_OPTIONS
      // such as debug flags

      // We use $( ... ) which is shell evaluated in RunTask.evalEnvironment()
      // Otherwise we cannot include the existing NODE_OPTIONS
      // TODO: Windows Support
      this.project.testTask.env(
        "NODE_OPTIONS",
        "$(echo $NODE_OPTIONS --experimental-vm-modules)"
      );
    }

    const testWatch = this.project.tasks.tryFind("test:watch");
    if (!testWatch) {
      this.project.addTask("test:watch", {
        description: "Run jest in watch mode",
        exec: `jest --watch${jestConfigOpts}`,
      });
    }
  }
}
