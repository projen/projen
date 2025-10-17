import { IConstruct } from "constructs";
import {
  EslintConfigs,
  StylisticConfigs,
  TypeScriptEslintConfigs,
} from "./configs";
import { IEslintConfig } from "./flat-config";
import { Component } from "../../component";
import { DependencyType } from "../../dependencies";
import { Project } from "../../project";
import { Task } from "../../task";
import { ModuleType } from "../module-type";
import { EslintConfigFile } from "./flat-config-file";
import { TypeScriptProject } from "../../typescript";
import { TypescriptConfig } from "../typescript-config";

export interface ESLintOptions {
  /**
   * List of files or glob patterns matching files to globally include.
   *
   * @example ["src/*.ts"]
   * @default - recommended files are included
   */
  readonly files: string[];

  /**
   * List of files or glob patterns matching files that include tests and build tools.
   * These files are included, but some default rules will be disabled `devDependencies`.
   *
   * @default []
   */
  readonly devFiles?: string[];

  /**
   * List of files or glob patterns matching files to globally ignore.
   *
   * @default - default exclusions based on the project type
   */
  readonly ignores?: string[];

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
  readonly configs?: IEslintConfig[];

  // @todo typed linting ???
  // /**
  //  * Path to `tsconfig.json` which should be used by eslint.
  //  *
  //  * @default "./tsconfig.json"
  //  */
  // readonly tsconfigPath?: string;

  // /**
  //  * Always try to resolve types under `<root>@types` directory even it doesn't contain any source code.
  //  * This prevents `import/no-unresolved` eslint errors when importing a `@types/*` module that would otherwise remain unresolved.
  //  * @default true
  //  */
  // readonly tsAlwaysTryTypes?: boolean;

  /**
   * The module type of configuration file.
   * - When specified `module`, generate `eslint.config.mjs` file.
   * - When specified `commonjs`, generate `eslint.config.cjs` file.
   *
   * @default ModuleType.ESM
   */
  readonly moduleType?: ModuleType;

  /**
   * Options for the ESLint command.
   */
  readonly commandOptions?: {
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
  };
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
  public readonly file: EslintConfigFile;
  /**
   * The ESLint configurations as an ordered list.
   */
  public readonly configs: IEslintConfig[];

  constructor(scope: IConstruct, options: ESLintOptions) {
    super(scope);

    // Declare deps
    this.addDevDep("eslint");

    this.task = this.createTask(options.commandOptions);
    this.project.testTask.spawn(this.task);

    if (options.commandOptions?.cache ?? true) {
      this.project.addGitIgnore(".eslintcache");
    }

    const defaultLinterRules = options.linter ?? true;
    const defaultFormatterRules = options.formatter ?? true;

    this.configs = [];
    // @todo convert options into default configs
    // const devDirs = options.devDirs ?? [];
    // const ignorePatterns = options.ignorePatterns ?? [
    //   "*.js",
    //   "*.d.ts",
    //   "node_modules/",
    //   "*.generated.ts",
    //   "coverage",
    // ];
    // this.config = new EslintFlatConfig(project, {
    //   devDirs,
    // });
    // this.config.addEnablePatterns(...options.enablePatterns);
    // this.config.addIgnorePatterns(...ignorePatterns);
    // this.config.addRules(options.styleConfig.rules ?? {});
    // this.config.addPlugins(...(options.styleConfig.plugins ?? []));
    // this.config.addExtensions(...(options.styleConfig.extensions ?? []));

    // @todo config for files
    // @todo config for ignores

    // try to guess if this is a typescript project
    const isTypeScript =
      this.project instanceof TypeScriptProject ||
      this.project.components.find((c) => c instanceof TypescriptConfig);

    const configs = [];

    if (defaultLinterRules) {
      configs.push(EslintConfigs.RECOMMENDED);
      if (isTypeScript) {
        configs.push(TypeScriptEslintConfigs.RECOMMENDED);
      }
    }

    if (defaultFormatterRules) {
      if (isTypeScript) {
        configs.push(TypeScriptEslintConfigs.STYLISTIC);
      } else {
        configs.push(StylisticConfigs.RECOMMENDED);
      }
    }

    // Add user configs
    configs.push(...(options.configs || []));
    this.addConfigs(...configs);

    // Create eslint config file
    this.file = new EslintConfigFile(this.project, {
      configs: this.configs,
      moduleType: options.moduleType,
    });
    this.project.addPackageIgnore(this.file.path);
  }

  /**
   * Add configs to eslint.
   */
  public addConfigs(...configs: IEslintConfig[]) {
    this.configs.push(...configs);
    this.addDepsForConfigs(configs);
  }

  /**
   * Adds dependencies needed for configs
   */
  private addDepsForConfigs(configs: IEslintConfig[]) {
    const modules = new Set(configs.flatMap((c) => c.imports?.modules ?? []));
    for (const dep of modules) {
      this.addDevDep(dep);
    }
  }

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

    return this.project.addTask("eslint", {
      description: "Runs eslint against the codebase",
      exec: [taskExecCommand, ...cliArgs].join(" "),
      receiveArgs: true,
    });
  }
}
