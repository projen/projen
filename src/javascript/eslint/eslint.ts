import { Task } from "../../task";
import { TaskStepOptions } from "../../task-model";
import { NodeProject } from "../node-project";
import { IEslintConfig } from "./config/eslint-config";
import { EslintFlatConfig } from "./config/eslint-flat-config";
import {
  EslintFlatConfigFile,
  IEslintFlatConfigFile,
  ModuleType,
} from "./eslint-flat-config-file";

export interface ESLintOptions {
  /**
   * The style configuration to use for ESLint.
   * This is used to extend the base ESLint configuration with additional rules and plugins.
   */
  readonly styleConfig: IEslintConfig;

  /**
   * List of files or glob patterns or directories with source files to enable.
   *
   * @example ["src/*.ts"]
   */
  readonly enablePatterns: string[];

  /**
   * List of files or glob patterns or directories with source files to ignore.
   * as .gitignore patterns.
   *
   * @default - [ '*.js', '*.d.ts', 'node_modules/', '*.generated.ts', 'coverage' ]
   */
  readonly ignorePatterns?: string[];

  /**
   * Path to `tsconfig.json` which should be used by eslint.
   *
   * @default "./tsconfig.json"
   */
  readonly tsconfigPath?: string;

  /**
   * Always try to resolve types under `<root>@types` directory even it doesn't contain any source code.
   * This prevents `import/no-unresolved` eslint errors when importing a `@types/*` module that would otherwise remain unresolved.
   * @default true
   */
  readonly tsAlwaysTryTypes?: boolean;

  /**
   * The module type of configuration file.
   * - When specified `module`, generate `eslint.config.mjs` file.
   * - When specified `commonjs`, generate `eslint.config.cjs` file.
   *
   * @default "module"
   */
  readonly moduleType?: ModuleType;

  /**
   * Files or glob patterns or directories with source files that include tests and build tools.
   * These sources are linted but may also import packages from `devDependencies`.
   *
   * @default []
   */
  readonly devDirs?: string[];

  /**
   * Options for the ESLint command.
   */
  readonly commandOptions?: EslintCommandOptions;
}

interface EslintCommandOptions {
  /**
   * Whether to fix eslint issues when running the eslint task
   * @default true
   */
  readonly fix?: boolean;

  /**
   * Extra flag arguments to pass to eslint command
   */
  readonly extraArgs?: string[];
}

export class ESLint {
  public get file(): IEslintFlatConfigFile {
    return this.configFile;
  }
  public readonly task: Task;
  public readonly config: EslintFlatConfig;

  private readonly configFile: IEslintFlatConfigFile;

  constructor(project: NodeProject, options: ESLintOptions) {
    const devDirs = options.devDirs ?? [];
    const ignorePatterns = options.ignorePatterns ?? [
      "*.js",
      "*.d.ts",
      "node_modules/",
      "*.generated.ts",
      "coverage",
    ];

    this.task = project.addTask("eslint", {
      description: "Runs eslint against the codebase",
    });

    this.config = new EslintFlatConfig(project, {
      devDirs,
    });
    this.config.addEnablePatterns(...options.enablePatterns);
    this.config.addIgnorePatterns(...ignorePatterns);
    this.config.addRules(options.styleConfig.rules ?? {});
    this.config.addPlugins(...(options.styleConfig.plugins ?? []));
    this.config.addExtensions(...(options.styleConfig.extensions ?? []));

    this.configFile = new EslintFlatConfigFile(project, {
      ...options,
      config: this.config,
    });

    this.initializeTask(options.commandOptions);
    project.testTask.spawn(this.task);
    project.npmignore?.exclude(this.configFile.filename);
  }

  public synthesize() {
    this.configFile.updateConfig(this.config);
    this.configFile.synthesize();
  }

  /**
   * Initializes and updates the ESLint task configuration.
   * This method performs the following:
   * 1. Sets up the base ESLint command
   * 2. Configures command line arguments including config file path
   * 3. Adds the `--fix` flag if the fix option is enabled
   * 4. Updates the ESLint task while preserving existing task settings
   *
   * @param options - Configuration options for the ESLint task
   * @remarks
   * - Preserves existing step options (args, condition, cwd, env, name, receiveArgs) when updating the task
   * - Maintains any externally edited task configurations if they exist
   */
  private initializeTask(options?: EslintCommandOptions) {
    const taskExecCommand = "eslint";
    const extraArgs = options?.extraArgs ?? [];
    const cliArgs = new Set([
      "--config",
      this.configFile.filename,
      ...extraArgs,
    ]);
    if (options?.fix) {
      cliArgs.add("--fix");
    }
    this.task.reset(
      [taskExecCommand, ...cliArgs].join(" "),
      this.buildTaskStepOptions(taskExecCommand)
    );
  }

  /**
   * In case of external editing of the eslint task step, we preserve those changes.
   * Otherwise, we return the default task step options.
   *
   * @param taskExecCommand The command that the ESLint tasks executes
   * @returns Either the externally edited, or the default task step options
   */
  private buildTaskStepOptions(taskExecCommand: string): TaskStepOptions {
    const currentEslintTaskStep = this.task?.steps?.find((step) =>
      step?.exec?.startsWith?.(taskExecCommand)
    );

    if (currentEslintTaskStep) {
      const { args, condition, cwd, env, name, receiveArgs } =
        currentEslintTaskStep;
      return {
        args,
        condition,
        cwd,
        env,
        name,
        receiveArgs,
      };
    }

    return {
      receiveArgs: true,
    };
  }
}
