import type { IConstruct } from "constructs";
import { Component } from "../component";
import { PropertiesFile } from "../properties-file";

/**
 * Log level for SonarQube analysis.
 */
export enum SonarqubeLogLevel {
  /** Standard logging (default) */
  INFO = "INFO",
  /** Verbose logging */
  DEBUG = "DEBUG",
  /** Most verbose, includes plugin/library output */
  TRACE = "TRACE",
}

/**
 * SonarQube Cloud region.
 */
export enum SonarqubeRegion {
  /** EU instance (default) */
  EU = "",
  /** US instance */
  US = "us",
}

// ---------------------------------------------------------------------------
// Nested option interfaces matching the sonar.* dot-notation structure
// ---------------------------------------------------------------------------

/**
 * Options for `sonar.scm.*` properties.
 */
export interface SonarqubeScmOptions {
  /**
   * The SCM provider to use.
   *
   * Maps to `sonar.scm.provider`.
   *
   * @default - auto-detected
   */
  readonly provider?: string;

  /**
   * Options for `sonar.scm.exclusions.*`.
   *
   * @default - no exclusion overrides
   */
  readonly exclusions?: SonarqubeScmExclusionsOptions;
}

/**
 * Options for `sonar.scm.exclusions.*` properties.
 */
export interface SonarqubeScmExclusionsOptions {
  /**
   * Whether to disable files ignored by the SCM (e.g., files in .gitignore)
   * from being excluded from analysis.
   *
   * Maps to `sonar.scm.exclusions.disabled`.
   *
   * @default false
   */
  readonly disabled?: boolean;
}

/**
 * Options for `sonar.coverage.*` properties.
 */
export interface SonarqubeCoverageOptions {
  /**
   * Comma-separated file path patterns to exclude from test coverage
   * calculations.
   *
   * Maps to `sonar.coverage.exclusions`.
   *
   * @default - no coverage exclusions
   */
  readonly exclusions?: string[];
}

/**
 * Options for `sonar.cpd.*` properties.
 */
export interface SonarqubeCpdOptions {
  /**
   * Comma-separated file path patterns to exclude from code
   * duplication detection.
   *
   * Maps to `sonar.cpd.exclusions`.
   *
   * @default - no duplication exclusions
   */
  readonly exclusions?: string[];
}

/**
 * Options for `sonar.javascript.*` properties.
 */
export interface SonarqubeJavascriptOptions {
  /**
   * Options for `sonar.javascript.lcov.*`.
   *
   * @default - no LCOV configuration
   */
  readonly lcov?: SonarqubeLcovOptions;
}

/**
 * Options for `sonar.typescript.*` properties.
 */
export interface SonarqubeTypescriptOptions {
  /**
   * Path to the TypeScript configuration file.
   *
   * Maps to `sonar.typescript.tsconfigPath`.
   *
   * @default - not set
   */
  readonly tsconfigPath?: string;
}

/**
 * Options for `sonar.rust.*` properties.
 */
export interface SonarqubeRustOptions {
  /**
   * Options for `sonar.rust.lcov.*`.
   *
   * @default - no Rust LCOV configuration
   */
  readonly lcov?: SonarqubeLcovOptions;

  /**
   * Options for `sonar.rust.clippy.*`.
   *
   * @default - no clippy configuration
   */
  readonly clippy?: SonarqubeRustClippyOptions;

  /**
   * Options for `sonar.rust.clippyReport.*`.
   *
   * @default - no clippy report configuration
   */
  readonly clippyReport?: SonarqubeRustClippyReportOptions;
}

/**
 * Options for lcov report paths (shared between languages).
 */
export interface SonarqubeLcovOptions {
  /**
   * Comma-separated paths to LCOV coverage report files.
   *
   * Maps to `sonar.<language>.lcov.reportPaths`.
   *
   * @default - not set
   */
  readonly reportPaths?: string[];
}

/**
 * Options for `sonar.rust.clippy.*` properties.
 */
export interface SonarqubeRustClippyOptions {
  /**
   * Whether Clippy analysis is enabled.
   *
   * Maps to `sonar.rust.clippy.enabled`.
   *
   * @default true
   */
  readonly enabled?: boolean;
}

/**
 * Options for `sonar.rust.clippyReport.*` properties.
 */
export interface SonarqubeRustClippyReportOptions {
  /**
   * Paths to Clippy JSON report files.
   *
   * Maps to `sonar.rust.clippyReport.reportPaths`.
   *
   * @default - not set
   */
  readonly reportPaths?: string[];
}

/**
 * Options for `sonar.log.*` properties.
 */
export interface SonarqubeLogOptions {
  /**
   * Controls the quantity/level of logs produced during analysis.
   *
   * Maps to `sonar.log.level`.
   *
   * @default SonarqubeLogLevel.INFO
   */
  readonly level?: SonarqubeLogLevel;
}

/**
 * Options for `sonar.qualitygate.*` properties.
 */
export interface SonarqubeQualityGateOptions {
  /**
   * Forces the analysis step to poll the server and wait for the
   * Quality Gate status. Will fail the pipeline if the quality gate fails.
   *
   * Maps to `sonar.qualitygate.wait`.
   *
   * @default false
   */
  readonly wait?: boolean;

  /**
   * The number of seconds that the scanner should wait for a report
   * to be processed.
   *
   * Maps to `sonar.qualitygate.timeout`.
   *
   * @default 300
   */
  readonly timeout?: number;
}

/**
 * Options for `SonarqubeProperties`.
 *
 * The interface structure mirrors the `sonar.*` dot-notation used in
 * `sonar-project.properties`. Nested interfaces map to nested property
 * namespaces. For example, `scm.provider` maps to `sonar.scm.provider`.
 */
export interface SonarqubePropertiesOptions {
  /**
   * The project's unique key.
   *
   * Can include up to 400 characters. Allowed characters:
   * letters, digits, dash, underscore, periods, and colons.
   *
   * Maps to `sonar.projectKey`. This parameter is mandatory.
   */
  readonly projectKey: string;

  /**
   * The key of the organization to which the project belongs.
   *
   * Maps to `sonar.organization`. Mandatory for SonarQube Cloud.
   *
   * @default - no organization
   */
  readonly organization?: string;

  /**
   * Name of the project displayed on the web interface.
   *
   * Maps to `sonar.projectName`.
   *
   * @default - not set
   */
  readonly projectName?: string;

  /**
   * The project version.
   *
   * Maps to `sonar.projectVersion`.
   *
   * @default - not set
   */
  readonly projectVersion?: string;

  /**
   * Comma-separated paths to directories containing main source code
   * (non-test code).
   *
   * Maps to `sonar.sources`.
   *
   * @default - the project base directory
   */
  readonly sources?: string;

  /**
   * Comma-separated paths to directories containing test code.
   *
   * Maps to `sonar.tests`.
   *
   * @default - no test code analyzed
   */
  readonly tests?: string;

  /**
   * The project's base directory when the analysis needs to take place
   * in a directory other than the one from which it was started.
   *
   * Maps to `sonar.projectBaseDir`.
   *
   * @default - the directory from which the analysis was started
   */
  readonly projectBaseDir?: string;

  /**
   * Encoding of the source files.
   *
   * Maps to `sonar.sourceEncoding`.
   *
   * @default - system encoding
   */
  readonly sourceEncoding?: string;

  /**
   * Comma-separated file path patterns to exclude from the analysis scope.
   *
   * Maps to `sonar.exclusions`.
   *
   * @default - no exclusions
   */
  readonly exclusions?: string[];

  /**
   * The language for analysis.
   *
   * Maps to `sonar.language`.
   *
   * @default - auto-detected
   */
  readonly language?: string;

  /**
   * The quality profile name.
   *
   * Maps to `sonar.profile`.
   *
   * @default - uses the default profile configured on the server
   */
  readonly profile?: string;

  /**
   * The SonarQube Cloud instance's region.
   *
   * Maps to `sonar.region`.
   *
   * @default SonarqubeRegion.EU
   */
  readonly region?: SonarqubeRegion;

  /**
   * SCM-related options (`sonar.scm.*`).
   *
   * @default - no SCM configuration
   */
  readonly scm?: SonarqubeScmOptions;

  /**
   * Coverage-related options (`sonar.coverage.*`).
   *
   * @default - no coverage configuration
   */
  readonly coverage?: SonarqubeCoverageOptions;

  /**
   * Duplication detection options (`sonar.cpd.*`).
   *
   * @default - no CPD configuration
   */
  readonly cpd?: SonarqubeCpdOptions;

  /**
   * JavaScript-specific options (`sonar.javascript.*`).
   *
   * @default - no JavaScript configuration
   */
  readonly javascript?: SonarqubeJavascriptOptions;

  /**
   * TypeScript-specific options (`sonar.typescript.*`).
   *
   * @default - no TypeScript configuration
   */
  readonly typescript?: SonarqubeTypescriptOptions;

  /**
   * Rust-specific options (`sonar.rust.*`).
   *
   * @default - no Rust configuration
   */
  readonly rust?: SonarqubeRustOptions;

  /**
   * Logging options (`sonar.log.*`).
   *
   * @default - INFO level
   */
  readonly log?: SonarqubeLogOptions;

  /**
   * Quality gate options (`sonar.qualitygate.*`).
   *
   * @default - quality gate not awaited
   */
  readonly qualitygate?: SonarqubeQualityGateOptions;

  /**
   * Additional arbitrary properties to include in the configuration.
   *
   * Use this for properties not covered by the typed options.
   * Keys use dot-notation (e.g., `sonar.java.binaries`).
   *
   * @default - no additional properties
   */
  readonly extraProperties?: Record<string, string>;

  /**
   * Options for the generated properties file.
   *
   * @default - default file options
   */
  readonly fileOptions?: SonarqubeFileOptions;
}

/**
 * File options for the generated `sonar-project.properties` file.
 */
export interface SonarqubeFileOptions {
  /**
   * Whether the generated file should be committed to git.
   *
   * @default true
   */
  readonly committed?: boolean;

  /**
   * Whether the generated file should be readonly.
   *
   * @default true
   */
  readonly readonly?: boolean;

  /**
   * Adds the projen marker to the file.
   *
   * @default - marker will be included as long as the project is not ejected
   */
  readonly marker?: boolean;

  /**
   * A comment to include at the top of the file.
   *
   * @default - no additional comment
   */
  readonly comment?: string[];
}

/**
 * Manages the `sonar-project.properties` configuration file for SonarQube
 * analysis.
 *
 * This component generates a `sonar-project.properties` file at the project
 * root with the specified configuration parameters. It provides typed options
 * whose structure mirrors the dot-notation property namespaces.
 *
 * @see https://docs.sonarsource.com/sonarqube-cloud/analyzing-source-code/analysis-parameters/parameters-not-settable-in-ui
 *
 * @example
 * new SonarqubeProperties(project, {
 *   projectKey: 'my-org_my-project',
 *   organization: 'my-org',
 *   sources: 'src',
 *   tests: 'test',
 *   exclusions: ['*{@literal *}/node_modules/**'],
 *   coverage: { exclusions: ['*{@literal *}/test/**'] },
 *   javascript: { lcov: { reportPaths: ['coverage/lcov.info'] } },
 *   sourceEncoding: 'UTF-8',
 * });
 */
export class SonarqubeProperties extends Component {
  /**
   * The underlying properties file.
   */
  public readonly file: PropertiesFile;

  constructor(scope: IConstruct, options: SonarqubePropertiesOptions) {
    super(scope);

    const sonar: Record<string, any> = {};

    // Project identification (mandatory)
    sonar.projectKey = options.projectKey;

    if (options.organization) {
      sonar.organization = options.organization;
    }

    // Server connection
    if (options.region === SonarqubeRegion.US) {
      sonar.region = options.region;
    }

    // Project information
    if (options.projectName) {
      sonar.projectName = options.projectName;
    }
    if (options.projectVersion) {
      sonar.projectVersion = options.projectVersion;
    }

    // SCM (sonar.scm.*)
    if (options.scm) {
      sonar.scm = {} as Record<string, any>;
      if (options.scm.provider) {
        sonar.scm.provider = options.scm.provider;
      }
      if (options.scm.exclusions?.disabled) {
        sonar.scm.exclusions = { disabled: "true" };
      }
    }

    // Analysis scope
    if (options.sources) {
      sonar.sources = options.sources;
    }
    if (options.tests) {
      sonar.tests = options.tests;
    }
    if (options.projectBaseDir) {
      sonar.projectBaseDir = options.projectBaseDir;
    }
    if (options.exclusions && options.exclusions.length > 0) {
      sonar.exclusions = options.exclusions.join(",");
    }

    // Language & profile
    if (options.language) {
      sonar.language = options.language;
    }
    if (options.profile) {
      sonar.profile = options.profile;
    }

    // Coverage (sonar.coverage.*)
    if (
      options.coverage?.exclusions &&
      options.coverage.exclusions.length > 0
    ) {
      sonar.coverage = { exclusions: options.coverage.exclusions.join(",") };
    }

    // JavaScript (sonar.javascript.*)
    if (
      options.javascript?.lcov?.reportPaths &&
      options.javascript.lcov.reportPaths.length > 0
    ) {
      sonar.javascript = {
        lcov: { reportPaths: options.javascript.lcov.reportPaths.join(",") },
      };
    }

    // TypeScript (sonar.typescript.*)
    if (options.typescript?.tsconfigPath) {
      sonar.typescript = { tsconfigPath: options.typescript.tsconfigPath };
    }

    // Rust (sonar.rust.*)
    if (options.rust) {
      sonar.rust = {} as Record<string, any>;
      if (
        options.rust.lcov?.reportPaths &&
        options.rust.lcov.reportPaths.length > 0
      ) {
        sonar.rust.lcov = {
          reportPaths: options.rust.lcov.reportPaths.join(","),
        };
      }
      if (options.rust.clippy?.enabled !== undefined) {
        sonar.rust.clippy = { enabled: String(options.rust.clippy.enabled) };
      }
      if (
        options.rust.clippyReport?.reportPaths &&
        options.rust.clippyReport.reportPaths.length > 0
      ) {
        sonar.rust.clippyReport = {
          reportPaths: options.rust.clippyReport.reportPaths.join(","),
        };
      }
    }

    // Duplication (sonar.cpd.*)
    if (options.cpd?.exclusions && options.cpd.exclusions.length > 0) {
      sonar.cpd = { exclusions: options.cpd.exclusions.join(",") };
    }

    // Encoding
    if (options.sourceEncoding) {
      sonar.sourceEncoding = options.sourceEncoding;
    }

    // Logging (sonar.log.*)
    if (options.log?.level && options.log.level !== SonarqubeLogLevel.INFO) {
      sonar.log = { level: options.log.level };
    }

    // Quality gate (sonar.qualitygate.*)
    if (options.qualitygate) {
      const qg: Record<string, any> = {};
      if (options.qualitygate.wait) {
        qg.wait = "true";
      }
      if (
        options.qualitygate.timeout !== undefined &&
        options.qualitygate.timeout !== 300
      ) {
        qg.timeout = String(options.qualitygate.timeout);
      }
      if (Object.keys(qg).length > 0) {
        sonar.qualitygate = qg;
      }
    }

    // Extra properties (user-specified arbitrary properties).
    if (options.extraProperties) {
      for (const [key, value] of Object.entries(options.extraProperties)) {
        const parts = key.split(".");
        if (parts[0] === "sonar") {
          let target: Record<string, any> = sonar;
          for (let i = 1; i < parts.length - 1; i++) {
            if (!target[parts[i]] || typeof target[parts[i]] !== "object") {
              target[parts[i]] = {};
            }
            target = target[parts[i]];
          }
          target[parts[parts.length - 1]] = value;
        }
      }
    }

    this.file = new PropertiesFile(this.project, "sonar-project.properties", {
      obj: { sonar },
      committed: options.fileOptions?.committed,
      readonly: options.fileOptions?.readonly,
      marker: options.fileOptions?.marker,
      comment: options.fileOptions?.comment,
    });

    // Apply non-sonar extra properties as overrides at the root level
    if (options.extraProperties) {
      for (const [key, value] of Object.entries(options.extraProperties)) {
        const parts = key.split(".");
        if (parts[0] !== "sonar") {
          this.file.addOverride(key, value);
        }
      }
    }
  }

  /**
   * Adds a property to the SonarQube configuration using dot-notation path.
   *
   * The key uses dot notation as a nested path separator, matching the
   * ObjectFile override semantics. For example, `"sonar.coverage.exclusions"`
   * navigates to `{ sonar: { coverage: { exclusions: value } } }`.
   *
   * @param key The property path in dot notation (e.g., `sonar.java.binaries`)
   * @param value The property value
   */
  public addProperty(key: string, value: string) {
    this.file.addOverride(key, value);
  }
}

// ---------------------------------------------------------------------------
// Language-specific presets
// ---------------------------------------------------------------------------

/**
 * Options for `SonarqubeJavascriptProperties`.
 *
 * Extends base options with JavaScript-specific defaults.
 */
export interface SonarqubeJavascriptPropertiesOptions extends SonarqubePropertiesOptions {}

/**
 * A SonarQube configuration preset for JavaScript projects.
 *
 * Provides sensible defaults for JavaScript analysis:
 * - `sonar.language` = `js`
 * - `sonar.sources` = `src`
 * - `sonar.tests` = `test`
 * - `sonar.sourceEncoding` = `UTF-8`
 * - `sonar.profile` = `Sonar Way`
 * - `sonar.scm.provider` = `git`
 * - Typical exclusions for `node_modules`, `coverage`, and test files
 * - `sonar.javascript.lcov.reportPaths` = `coverage/lcov.info`
 *
 * All defaults can be overridden via options.
 *
 * @example
 * new SonarqubeJavascriptProperties(project, {
 *   projectKey: 'my-org_my-js-project',
 * });
 */
export class SonarqubeJavascriptProperties extends SonarqubeProperties {
  constructor(
    scope: IConstruct,
    options: SonarqubeJavascriptPropertiesOptions,
  ) {
    super(scope, {
      language: "js",
      sources: "src",
      tests: "test",
      sourceEncoding: "UTF-8",
      profile: "Sonar Way",
      scm: { provider: "git" },
      exclusions: [
        "**/node_modules/**",
        "**/coverage/**",
        "**/test/**",
        "**/__tests__/**",
        "**/*.test.ts",
        "**/*.spec.ts",
      ],
      coverage: { exclusions: ["**/test/**", "**/__tests__/**"] },
      cpd: { exclusions: ["**/test/**/*.json", "**/__tests__/**/*.json"] },
      javascript: { lcov: { reportPaths: ["coverage/lcov.info"] } },
      // User options override defaults
      ...options,
    });
  }
}

/**
 * Options for `SonarqubeTypescriptProperties`.
 *
 * Extends base options with TypeScript-specific defaults.
 */
export interface SonarqubeTypescriptPropertiesOptions extends SonarqubePropertiesOptions {}

/**
 * A SonarQube configuration preset for TypeScript projects.
 *
 * Provides sensible defaults for TypeScript analysis:
 * - `sonar.language` = `ts`
 * - `sonar.sources` = `src`
 * - `sonar.tests` = `test`
 * - `sonar.sourceEncoding` = `UTF-8`
 * - `sonar.profile` = `Sonar Way`
 * - `sonar.scm.provider` = `git`
 * - `sonar.typescript.tsconfigPath` = `tsconfig.json`
 * - Typical exclusions for `node_modules`, `coverage`, test files
 * - `sonar.javascript.lcov.reportPaths` = `coverage/lcov.info`
 *
 * All defaults can be overridden via options.
 *
 * @example
 * new SonarqubeTypescriptProperties(project, {
 *   projectKey: 'my-org_my-ts-project',
 * });
 */
export class SonarqubeTypescriptProperties extends SonarqubeProperties {
  constructor(
    scope: IConstruct,
    options: SonarqubeTypescriptPropertiesOptions,
  ) {
    super(scope, {
      language: "ts",
      sources: "src",
      tests: "test",
      sourceEncoding: "UTF-8",
      profile: "Sonar Way",
      scm: { provider: "git" },
      exclusions: [
        "**/node_modules/**",
        "**/coverage/**",
        "**/test/**",
        "**/__tests__/**",
        "**/*.test.ts",
        "**/*.spec.ts",
        "**/dist/**",
        "**/build/**",
      ],
      coverage: { exclusions: ["**/test/**", "**/__tests__/**"] },
      cpd: { exclusions: ["**/test/**/*.json", "**/__tests__/**/*.json"] },
      javascript: { lcov: { reportPaths: ["coverage/lcov.info"] } },
      typescript: { tsconfigPath: "tsconfig.json" },
      // User options override defaults
      ...options,
    });
  }
}

/**
 * Options for `SonarqubeRustProperties`.
 *
 * Extends base options with Rust-specific defaults.
 */
export interface SonarqubeRustPropertiesOptions extends SonarqubePropertiesOptions {}

/**
 * A SonarQube configuration preset for Rust projects.
 *
 * Provides sensible defaults for Rust analysis:
 * - `sonar.language` = `rust`
 * - `sonar.sources` = `src`
 * - `sonar.tests` = `tests`
 * - `sonar.sourceEncoding` = `UTF-8`
 * - `sonar.profile` = `Sonar Way`
 * - `sonar.scm.provider` = `git`
 * - Typical exclusions for `coverage`, test, and `target` dirs
 * - `sonar.rust.lcov.reportPaths` = `target/lcov.info`
 * - `sonar.rust.clippy.enabled` = `false`
 * - `sonar.rust.clippyReport.reportPaths` = `target/clippy.json`
 *
 * All defaults can be overridden via options.
 *
 * @example
 * new SonarqubeRustProperties(project, {
 *   projectKey: 'my-org_my-rust-project',
 * });
 */
export class SonarqubeRustProperties extends SonarqubeProperties {
  constructor(scope: IConstruct, options: SonarqubeRustPropertiesOptions) {
    super(scope, {
      language: "rust",
      sources: "src",
      tests: "tests",
      sourceEncoding: "UTF-8",
      profile: "Sonar Way",
      scm: { provider: "git" },
      exclusions: ["**/coverage/**", "**/tests/**", "**/target/**"],
      coverage: {
        exclusions: ["**/tests/**", "**/target/**"],
      },
      cpd: { exclusions: ["**/tests/**/*.json"] },
      rust: {
        lcov: { reportPaths: ["target/lcov.info"] },
        clippy: { enabled: false },
        clippyReport: { reportPaths: ["target/clippy.json"] },
      },
      // User options override defaults
      ...options,
    });
  }
}
