import { Component } from "../component";
import type { Project } from "../project";
import { YamlFile } from "../yaml";

/**
 * File-based capture filtering options.
 *
 * @see https://docs.blackduck.com/r/cov_polaris/latest/coverity-on-polaris/configuration-file-schema.html
 */
export interface PolarisCoverityCaptureFiles {
  /**
   * A regular expression matching files that should be excluded from capture.
   *
   * @example (node_modules\/.*|dist\/.*)
   * @default - no files are excluded
   */
  readonly excludeRegex?: string;

  /**
   * A regular expression matching files that should be included in capture.
   *
   * @default - all files are included
   */
  readonly includeRegex?: string;
}

/**
 * Languages supported by Coverity Thin Client capture.
 *
 * @see https://docs.blackduck.com/r/polaris/continuous-integration-for-polaris/configuring-coverity-thin-client-for-use-with-bridge-cli-and-polaris.html
 */
export enum PolarisCoverityLanguage {
  /**
   * Apex.
   */
  APEX = "apex",

  /**
   * C, C++, Objective C and Objective C++.
   */
  C_FAMILY = "c-family",

  /**
   * C#.
   */
  CSHARP = "csharp",

  /**
   * Go.
   */
  GO = "go",

  /**
   * Java, including JSP and Android configuration files.
   */
  JAVA = "java",

  /**
   * JavaScript, including TypeScript.
   */
  JAVASCRIPT = "javascript",

  /**
   * Kotlin.
   */
  KOTLIN = "kotlin",

  /**
   * PHP.
   */
  PHP = "php",

  /**
   * Python.
   */
  PYTHON = "python",

  /**
   * Ruby.
   */
  RUBY = "ruby",

  /**
   * Swift.
   */
  SWIFT = "swift",

  /**
   * Visual Basic.
   */
  VB = "vb",
}

/**
 * Language filtering options for capture.
 */
export interface PolarisCoverityCaptureLanguages {
  /**
   * Languages to include in the capture.
   *
   * Mutually exclusive with `exclude`.
   *
   * @example [PolarisCoverityLanguage.JAVASCRIPT]
   * @default - all supported languages are included
   */
  readonly include?: PolarisCoverityLanguage[];

  /**
   * Languages to exclude from the capture.
   *
   * Mutually exclusive with `include`.
   *
   * @default - no languages are excluded
   */
  readonly exclude?: PolarisCoverityLanguage[];
}

/**
 * Build capture options for compiled languages.
 *
 * @see https://docs.blackduck.com/r/polaris/continuous-integration-for-polaris/configuring-coverity-thin-client-for-use-with-bridge-cli-and-polaris.html
 */
export interface PolarisCoverityCaptureBuild {
  /**
   * The build command that will be invoked to use build capture to capture
   * the project.
   */
  readonly buildCommand: string;

  /**
   * The clean command that will be invoked prior to doing build capture.
   *
   * @default - no clean command is run
   */
  readonly cleanCommand?: string;

  /**
   * Enables or disables automatic invocation of the ASP.NET compiler for
   * detected web applications.
   *
   * @default - not set
   */
  readonly aspnetCompiler?: boolean;
}

/**
 * Compiler configuration options, e.g. for cross-compilers.
 *
 * @see https://docs.blackduck.com/r/polaris/continuous-integration-for-polaris/configuring-coverity-thin-client-for-use-with-bridge-cli-and-polaris.html
 */
export interface PolarisCoverityCompilerConfiguration {
  /**
   * A list of `cov-configure` argument lists to run.
   *
   * @example [["--template", "--compiler", "arm-linux-gnueabi-gcc", "--comptype", "gcc"]]
   * @default - no additional compiler configuration
   */
  readonly covConfigure?: string[][];
}

/**
 * Options for the `capture` section of `coverity.yml`.
 */
export interface PolarisCoverityCapture {
  /**
   * File inclusion/exclusion filters for capture.
   *
   * @default - no file filters
   */
  readonly files?: PolarisCoverityCaptureFiles;

  /**
   * Language inclusion/exclusion filters for capture.
   *
   * @default - no language filters
   */
  readonly languages?: PolarisCoverityCaptureLanguages;

  /**
   * Build capture settings for compiled languages.
   *
   * @default - no build capture
   */
  readonly buildCapture?: PolarisCoverityCaptureBuild;

  /**
   * The encoding to use when parsing and emitting source files in C, C++
   * and JavaScript.
   *
   * @default "UTF-8"
   */
  readonly encoding?: string;

  /**
   * Compiler configuration options, e.g. for cross-compilers.
   *
   * @default - no additional compiler configuration
   */
  readonly compilerConfiguration?: PolarisCoverityCompilerConfiguration;
}

/**
 * The revision of the source code being analyzed.
 */
export interface PolarisCoverityProjectRevision {
  /**
   * An identifier for the revision.
   *
   * @default - not set
   */
  readonly name?: string;

  /**
   * The date the revision was created, in ISO 8601 format.
   *
   * @example "2021-08-16T05:12:39Z"
   * @default - not set
   */
  readonly date?: string;

  /**
   * Whether the revision contains modifications that have not been committed.
   *
   * @default false
   */
  readonly modified?: boolean;
}

/**
 * Options for the `project` section of `coverity.yml`.
 */
export interface PolarisCoverityProject {
  /**
   * The Polaris organization that the project belongs to.
   *
   * @default - not set
   */
  readonly organization?: string;

  /**
   * The name of the project in Polaris.
   *
   * @default - not set
   */
  readonly name?: string;

  /**
   * The branch being analyzed.
   *
   * @default - not set
   */
  readonly branch?: string;

  /**
   * The revision of the source code being analyzed.
   *
   * @default - not set
   */
  readonly revision?: PolarisCoverityProjectRevision;

  /**
   * The directory used to store capture artifacts.
   *
   * @default - not set
   */
  readonly captureDir?: string;

  /**
   * The directory containing the project source.
   *
   * @default - not set
   */
  readonly projectDir?: string;

  /**
   * The URL of the source control repository for the project.
   *
   * @default - not set
   */
  readonly scmUrl?: string;

  /**
   * Custom metadata properties to associate with the analysis.
   *
   * @default - no properties
   */
  readonly properties?: Record<string, string | number>;

  /**
   * A mapping of group names to their role, e.g. "Observer", "Administrator" or "Contributor".
   *
   * @default - no groups
   */
  readonly groups?: Record<string, string>;
}

/**
 * Options for the `install` section of `coverity.yml`.
 */
export interface PolarisCoverityInstall {
  /**
   * The version of Coverity tools to use.
   *
   * @example "2021.06"
   * @default - not set
   */
  readonly version?: string;

  /**
   * The path to an existing Coverity tools installation.
   *
   * @default - not set
   */
  readonly directory?: string;
}

/**
 * The environment in which analysis is executed.
 */
export enum PolarisCoverityAnalyzeMode {
  /**
   * Analysis is executed on the local machine.
   */
  LOCAL = "local",

  /**
   * Analysis is executed on a central server.
   */
  CENTRAL = "central",
}

/**
 * Options for the `analyze` section of `coverity.yml`.
 */
export interface PolarisCoverityAnalyze {
  /**
   * The environment in which analysis is executed.
   *
   * @default - not set
   */
  readonly mode?: PolarisCoverityAnalyzeMode;

  /**
   * The Polaris server endpoint.
   *
   * @default - not set
   */
  readonly serverUrl?: string;

  /**
   * The upload service endpoint.
   *
   * @default - not set
   */
  readonly uploadServiceUrl?: string;
}

/**
 * Options for `PolarisCoverity`.
 */
export interface PolarisCoverityOptions {
  /**
   * The configuration file format version.
   *
   * @default "1"
   */
  readonly version?: string;

  /**
   * Organization, naming and metadata for the analysis.
   *
   * @default - not set
   */
  readonly project?: PolarisCoverityProject;

  /**
   * Capture configuration, controlling which files and languages are analyzed.
   *
   * @default - not set
   */
  readonly capture?: PolarisCoverityCapture;

  /**
   * Coverity tool installation configuration.
   *
   * @default - not set
   */
  readonly install?: PolarisCoverityInstall;

  /**
   * Analysis execution configuration.
   *
   * @default - not set
   */
  readonly analyze?: PolarisCoverityAnalyze;
}

/**
 * Manages `coverity.yml`, the configuration file for Coverity on Polaris
 * (Black Duck's SAST scanning tool).
 *
 * @see https://docs.blackduck.com/r/cov_polaris/latest/coverity-on-polaris/configuration-file-schema.html
 */
export class PolarisCoverity extends Component {
  /**
   * The YAML file for the Coverity on Polaris configuration.
   */
  public readonly file: YamlFile;

  private readonly options: PolarisCoverityOptions;

  constructor(project: Project, options: PolarisCoverityOptions = {}) {
    super(project);

    this.options = options;

    this.file = new YamlFile(project, "coverity.yml", {
      obj: () => this.renderCoverity(),
      omitEmpty: true,
    });
  }

  private renderCoverity() {
    const { capture } = this.options;

    return {
      version: this.options.version ?? "1",
      project: this.options.project,
      capture: capture && {
        build: capture.buildCapture && {
          "build-command": capture.buildCapture.buildCommand,
          "clean-command": capture.buildCapture.cleanCommand,
          "aspnet-compiler": capture.buildCapture.aspnetCompiler,
        },
        encoding: capture.encoding ?? "UTF-8",
        files: capture.files && {
          "exclude-regex": capture.files.excludeRegex,
          "include-regex": capture.files.includeRegex,
        },
        languages: capture.languages,
        "compiler-configuration": capture.compilerConfiguration && {
          "cov-configure": capture.compilerConfiguration.covConfigure,
        },
      },
      install: this.options.install,
      analyze: this.options.analyze,
    };
  }
}
