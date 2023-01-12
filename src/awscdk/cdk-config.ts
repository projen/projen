import { FEATURE_FLAGS } from "./internal";
import { Component } from "../component";
import { JsonFile } from "../json";
import { Project } from "../project";

/**
 * Common options for `cdk.json`.
 */
export interface CdkConfigCommonOptions {
  /**
   * Additional context to include in `cdk.json`.
   *
   * @default - no additional context
   */
  readonly context?: { [key: string]: any };

  /**
   * Include all feature flags in cdk.json
   *
   * @default true
   */
  readonly featureFlags?: boolean;

  /**
   * To protect you against unintended changes that affect your security posture,
   * the AWS CDK Toolkit prompts you to approve security-related changes before deploying them.
   *
   * @default ApprovalLevel.BROADENING
   */
  readonly requireApproval?: ApprovalLevel;

  /**
   * cdk.out directory.
   *
   * @default "cdk.out"
   */
  readonly cdkout?: string;

  /**
   * A command to execute before synthesis. This command will be called when
   * running `cdk synth` or when `cdk watch` identifies a change in your source
   * code before redeployment.
   *
   * @default - no build command
   */
  readonly buildCommand?: string;

  /**
   * Glob patterns to include in `cdk watch`.
   *
   * @default []
   */
  readonly watchIncludes?: string[];

  /**
   * Glob patterns to exclude from `cdk watch`.
   *
   * @default []
   */
  readonly watchExcludes?: string[];
}

/**
 * Options for `CdkJson`.
 */
export interface CdkConfigOptions extends CdkConfigCommonOptions {
  /**
   * The command line to execute in order to synthesize the CDK application
   * (language specific).
   */
  readonly app: string;
}

/**
 * Represents cdk.json file.
 */
export class CdkConfig extends Component {
  /**
   * Represents the JSON file.
   */
  public readonly json: JsonFile;

  /**
   * Name of the cdk.out directory.
   */
  public readonly cdkout: string;

  /**
   * List of glob patterns to be included by CDK.
   */
  private readonly _include: string[];

  /**
   * List of glob patterns to be excluded by CDK.
   */
  private readonly _exclude: string[];

  constructor(project: Project, options: CdkConfigOptions) {
    super(project);

    this.cdkout = options.cdkout ?? "cdk.out";
    this._include = options.watchIncludes ?? [];
    this._exclude = options.watchExcludes ?? [];

    const context: Record<string, any> = { ...options.context };
    const fflags = options.featureFlags ?? true;
    if (fflags) {
      for (const flag of FEATURE_FLAGS) {
        context[flag] = true;
      }
    }

    this.json = new JsonFile(project, "cdk.json", {
      omitEmpty: true,
      obj: {
        app: options.app,
        context: context,
        requireApproval: options.requireApproval,
        output: this.cdkout,
        build: options.buildCommand,
        watch: {
          include: () => this._include,
          exclude: () => this._exclude,
        },
      },
    });

    project.gitignore.exclude(`/${this.cdkout}/`);
    project.gitignore.exclude(".cdk.staging/");
  }

  /**
   * Add includes to `cdk.json`.
   * @param patterns The includes to add.
   */
  public addIncludes(...patterns: string[]) {
    this._include.push(...patterns);
  }

  /**
   * Add excludes to `cdk.json`.
   * @param patterns The excludes to add.
   */
  public addExcludes(...patterns: string[]) {
    this._exclude.push(...patterns);
  }

  /**
   * List of glob patterns to be included by CDK.
   */
  public get include(): string[] {
    return [...this._include];
  }

  /**
   * List of glob patterns to be excluded by CDK.
   */
  public get exclude(): string[] {
    return [...this._exclude];
  }
}

/**
 * Which approval is required when deploying CDK apps.
 */
export enum ApprovalLevel {
  /**
   * Approval is never required
   */
  NEVER = "never",
  /**
   * Requires approval on any IAM or security-group-related change
   */
  ANY_CHANGE = "any-change",
  /**
   * Requires approval when IAM statements or traffic rules are added; removals don't require approval
   */
  BROADENING = "broadening",
}
