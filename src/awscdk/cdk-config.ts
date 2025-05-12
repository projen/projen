import * as fs from "fs";
import * as path from "path";
import { Component } from "../component";
import { JsonFile } from "../json";
import { Project } from "../project";
import { AwsCdkTypeScriptApp } from "./awscdk-app-ts";
import { FEATURE_FLAGS, FEATURE_FLAGS_V2 } from "./internal";
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
   * The major version of the AWS CDK (e.g. 1, 2, ...)
   */
  readonly cdkMajorVersion?: number;

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

  /**
   * The context to write to cdk.json.
   */
  private readonly _context: Record<string, any>;

  constructor(project: Project, options: CdkConfigOptions) {
    super(project);

    this.cdkout = options.cdkout ?? "cdk.out";
    this._include = options.watchIncludes ?? [];
    this._exclude = options.watchExcludes ?? [];

    this._context = { ...options.context };

    this._context = this.setFeatureFlags(
      this._context,
      options.featureFlags,
      options.cdkMajorVersion
    );

    this.json = new JsonFile(project, "cdk.json", {
      omitEmpty: true,
      obj: {
        app: options.app,
        context: this._context,
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

  /**
   * The context to write to cdk.json.
   */
  public get context(): Record<string, any> {
    return { ...this._context };
  }

  /**
   * Set CDK feature flags based on the given version in the `cdk.json`.
   *
   * @param context The context to add the feature flags to.
   * @param fflagsEnabled Include all feature flags. Defaults to `true`.
   * @param cdkMajorVersion The major version of the CDK to include the feature flags for.
   *     Defaults to 1.
   * @returns The updated context.
   */
  private setFeatureFlags(
    context: Record<string, any>,
    fflagsEnabled: boolean = true,
    cdkMajorVersion: number = 1
  ) {
    if (!fflagsEnabled) {
      return context;
    }

    switch (cdkMajorVersion) {
      case 1:
        for (const flag of FEATURE_FLAGS) {
          context[flag] = true;
        }
        break;
      case 2:
        const featureFlags = this.tryLoadFeatureFlags(this.project);
        if (featureFlags) {
          Object.assign(context, featureFlags);
        } else {
          Object.assign(context, FEATURE_FLAGS_V2);
        }
        break;
    }

    return context;
  }

  /**
   * Attempt to load the feature flags from the `recommended-feature-flags.json` in the CDK package.
   *
   * This file is only present in the CDK package for TypeScript projects.
   *
   * @param project The project to load the feature flags for.
   * @returns The feature flags, or `undefined` if they could not be loaded.
   */
  private tryLoadFeatureFlags(project: Project) {
    if (project instanceof AwsCdkTypeScriptApp) {
      try {
        const jsonFile = fs.readFileSync(
          path.join(
            process.cwd(),
            "node_modules",
            "aws-cdk-lib",
            "recommended-feature-flags.json"
          ),
          "utf-8"
        );

        return JSON.parse(jsonFile);
      } catch (e) {
        return undefined;
      }
    }
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
