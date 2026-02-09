import { IConstruct } from "constructs";
import { ESLintConfig, IESLintConfig } from "./config";
import { ESLintJs, Stylistic, Tseslint } from "./presets";
import { Component } from "../../component";
import { DependencyType } from "../../dependencies";
import { Project } from "../../project";
import { Task } from "../../task";
import { TypeScriptProject } from "../../typescript";
import { ModuleType } from "../module-type";
import { ESLintConfigFile } from "./config-file";
import { TypescriptConfig } from "../typescript-config";
import { ImportX } from "./presets/import-x";

export interface ESLintFileOptions {
  /**
   * The module type of configuration file.
   * - When specified `module`, generate `eslint.config.mjs` file.
   * - When specified `commonjs`, generate `eslint.config.cjs` file.
   *
   * @default ModuleType.ESM
   */
  readonly moduleType?: ModuleType;

  /**
   * The filename of configuration file.
   * @default - "eslint.config.mjs" for ESM, "eslint.config.cjs" for CommonJS
   */
  readonly fileName?: string;
}

export interface ESLintCommandOptions {
  /**
   * Whether to fix eslint issues when running the eslint task
   * @default true
   */
  readonly fix?: boolean;

  /**
   * Whether to enable caching
   * @default true
   */
  readonly cache?: boolean;

  /**
   * Extra arguments to pass to eslint command
   *
   * @see https://eslint.org/docs/latest/use/command-line-interface
   */
  readonly extraArgs?: string[];
}

export interface ESLintOptions {
  /**
   * List of files or glob patterns matching files to globally include.
   *
   * @example ["src/*.ts"]
   * @default - recommended files are included
   */
  readonly files?: string[];

  /**
   * List of files or glob patterns matching files to globally ignore.
   *
   * @default - default exclusions based on the project type
   */
  readonly ignores?: string[];

  /**
   * Automatically ignore all generated files.
   *
   * This prevents ESLint from trying to format or lint files that are marked as generated,
   * which would fail since generated files are typically read-only.
   *
   * @default true
   */
  readonly ignoreGeneratedFiles?: boolean;

  /**
   * Enable linting with recommended rules.
   *
   * @default true
   */
  readonly linter?: boolean;

  /**
   * Enable code formatter with recommended settings.
   *
   * @default true
   */
  readonly formatter?: boolean;

  /**
   * Additional configuration objects
   *
   * @default - no additional configs
   */
  readonly configs?: IESLintConfig[];

  /**
   * Options to for the config file.
   */
  readonly fileOptions?: ESLintFileOptions;

  /**
   * Options for the ESLint command.
   */
  readonly commandOptions?: ESLintCommandOptions;
}

export class ESLint extends Component {
  /**
   * Returns the singleton ESLint component of a project or undefined if there is none.
   */
  public static of(project: Project): ESLint | undefined {
    const isEslint = (c: Component): c is ESLint => c instanceof ESLint;
    return project.components.find(isEslint);
  }

  /**
   * The task running eslint.
   */
  public readonly task: Task;
  /**
   * The ESLint flat config file used.
   */
  public readonly file: ESLintConfigFile;
  /**
   * The ESLint configurations as an ordered list.
   */
  public readonly configs: IESLintConfig[] = [];

  constructor(scope: IConstruct, options: ESLintOptions = {}) {
    super(scope);

    // Declare deps
    this.addDevDep("eslint");

    this.task = this.createTask(options.commandOptions);
    this.project.testTask.spawn(this.task);

    if (options.commandOptions?.cache ?? true) {
      this.project.addGitIgnore(".eslintcache");
    }

    // try to guess if this is a typescript project
    const isTypeScript = Boolean(
      this.project instanceof TypeScriptProject ||
      this.project.components.find((c) => c instanceof TypescriptConfig),
    );

    // Defaults
    const defaultLinterRules = options.linter ?? true;
    const defaultFormatterRules = options.formatter ?? true;
    const files = options.files ?? [];
    const ignores = options.ignores ?? this.defaultIgnores(isTypeScript);
    const ignoreGenerated = options.ignoreGeneratedFiles ?? true;

    // @todo jest
    const defaultConfigs: IESLintConfig[] = [];

    if (files.length) {
      defaultConfigs.push(ESLintConfig.files(files));
    }
    if (ignores.length) {
      defaultConfigs.push(ESLintConfig.ignores(ignores));
    }
    if (ignoreGenerated) {
      defaultConfigs.push(ESLintConfig.ignoreGenerated());
    }

    if (defaultLinterRules) {
      defaultConfigs.push(ESLintJs.RECOMMENDED);
      defaultConfigs.push(ImportX.RECOMMENDED);
      if (isTypeScript) {
        defaultConfigs.push(Tseslint.RECOMMENDED);
        defaultConfigs.push(ImportX.TYPESCRIPT);
      }
    }

    if (defaultFormatterRules) {
      if (isTypeScript) {
        defaultConfigs.push(Tseslint.STYLISTIC);
      } else {
        defaultConfigs.push(Stylistic.RECOMMENDED);
      }
    }

    // Add the default configs
    this.addConfigs(...defaultConfigs);

    // Add user configs
    const userConfigs = options.configs || [];
    this.addConfigs(...userConfigs);

    // Create eslint config file
    this.file = new ESLintConfigFile(this.project, {
      ...options.fileOptions,
      configs: this.configs,
    });
    this.project.addPackageIgnore(this.file.path);
  }

  /**
   * The default ignore patterns
   */
  private defaultIgnores(isTypeScript: boolean): string[] {
    if (isTypeScript) {
      return [
        "**/*.js",
        "**/*.d.ts",
        "**/node_modules/",
        "**/*.generated.ts",
        "coverage/",
      ];
    }
    return ["**/node_modules/", "coverage/"];
  }

  /**
   * Add configs to eslint.
   */
  public addConfigs(...configs: IESLintConfig[]) {
    this.configs.push(...configs);
  }

  /**
   * Helper to add a linter dependency to the project
   */
  private addDevDep(dep: string) {
    this.project.deps.addDependency(dep, DependencyType.BUILD);
  }

  /**
   * Creates a task to run ESLint
   */
  private createTask(options: ESLintOptions["commandOptions"] = {}): Task {
    const taskExecCommand = "eslint";
    const extraArgs = options?.extraArgs ?? [];
    const cliArgs = new Set([...extraArgs]);

    if (options?.fix ?? true) {
      cliArgs.add("--fix");
    }

    if (options?.cache ?? true) {
      cliArgs.add("--cache");
    }

    // @todo still needed?
    cliArgs.add("--no-error-on-unmatched-pattern");

    return this.project.addTask("eslint", {
      description: "Runs eslint against the codebase",
      exec: [taskExecCommand, ...cliArgs].join(" "),
      receiveArgs: true,
    });
  }
}
