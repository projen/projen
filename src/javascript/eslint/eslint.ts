import { Task } from "../../task";
import { TaskStepOptions } from "../../task-model";
import { NodeProject } from "../node-project";
import {
  EslintFlatConfigFile,
  EslintFlatConfigFileOptions,
  IESLintFlatConfigFile,
} from "./eslint-flat-config-file";

export interface EslintCommandOptions {
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

export interface ESLintFlatConfigFile {
  filename: string;
}

export class ESLint {
  public readonly config: IESLintFlatConfigFile;

  private _task: Task;

  constructor(
    project: NodeProject,
    options: EslintFlatConfigFileOptions & {
      commandOptions?: EslintCommandOptions;
    }
  ) {
    this._task = project.addTask("eslint", {
      description: "Runs eslint against the codebase",
    });
    this.config = new EslintFlatConfigFile(project, options);
    this.initializeEslintTask(options.commandOptions);
    project.testTask.spawn(this._task);
    project.npmignore?.exclude(this.config.filename);
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
  private initializeEslintTask(options?: EslintCommandOptions) {
    const taskExecCommand = "eslint";
    const extraArgs = options?.extraArgs ?? [];
    const cliArgs = new Set(["--config", this.config.filename, ...extraArgs]);
    if (options?.fix) {
      cliArgs.add("--fix");
    }
    this._task.reset(
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
    const currentEslintTaskStep = this._task?.steps?.find((step) =>
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
