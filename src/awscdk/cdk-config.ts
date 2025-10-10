import { deepClone } from "fast-json-patch";
import { Component } from "../component";
import { JsonFile } from "../json";
import { Project } from "../project";
import { tryReadFileSync } from "../util";
import { FEATURE_FLAGS_V1, FEATURE_FLAGS_V2 } from "./internal";

/**
 * CDK V1 feature flags configuration.
 * @deprecated CDK V1 is EOS. Upgrade to CDK V2.
 */
export class CdkFeatureFlagsV1 implements ICdkFeatureFlags {
  /**
   * Disable all feature flags.
   */
  public static readonly NONE = new CdkFeatureFlagsV1({});

  /**
   * Enable all CDK V1 feature flags.
   */
  public static readonly ALL = new CdkFeatureFlagsV1(FEATURE_FLAGS_V1);

  public readonly flags: Record<string, unknown>;

  private constructor(flags: Record<string, unknown>) {
    this.flags = flags;
  }
}

/**
 * CDK V2 feature flags configuration.
 */
export class CdkFeatureFlagsV2 implements ICdkFeatureFlags {
  /**
   * Disable all feature flags.
   */
  public static readonly NONE = new CdkFeatureFlagsV2({});

  /**
   * Enable all CDK V2 feature flags known to projen.
   * These might not include feature flags, if your version of projen isn't up-to-date.
   *
   * Make sure to double-check any changes to feature flags in `cdk.json` before deploying.
   * Unexpected changes may cause breaking changes in your CDK app.
   * You can overwrite any feature flag by passing it into the context field.
   */
  public static readonly ALL = new CdkFeatureFlagsV2(FEATURE_FLAGS_V2);

  /**
   * Attempt to load the feature flags from the `aws-cdk-lib/recommended-feature-flags.json` in a locally available npm package.
   * This file is typically only present in AWS CDK TypeScript projects, but can yield more accurate results.
   *
   * Falls back to all known feature flags if not found.
   */
  public static fromLocalAwsCdkLib() {
    try {
      const featureFlags =
        tryReadFileSync(
          require.resolve("aws-cdk-lib/recommended-feature-flags.json", {
            paths: [process.cwd()],
          })
        ) || "{}";

      return new CdkFeatureFlagsV2(JSON.parse(featureFlags));
    } catch {
      return CdkFeatureFlags.V2.ALL;
    }
  }

  public readonly flags: Record<string, unknown>;

  private constructor(flags: Record<string, unknown>) {
    this.flags = flags;
  }
}

/**
 *
 * @subclassable
 */
export interface ICdkFeatureFlags {
  readonly flags: Record<string, unknown>;
}

/**
 * CDK feature flags configuration.
 */
export class CdkFeatureFlags implements ICdkFeatureFlags {
  /**
   * CDK V1 feature flags configuration.
   * @deprecated CDK V1 is EOS. Upgrade to CDK V2.
   */
  public static readonly V1 = CdkFeatureFlagsV1;

  /**
   * CDK V2 feature flags configuration.
   */
  public static readonly V2 = CdkFeatureFlagsV2;

  public readonly flags: Record<string, unknown>;

  private constructor(flags: Record<string, unknown>) {
    this.flags = flags;
  }
}

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
   * Feature flags that should be enabled in `cdk.json`.
   *
   * Make sure to double-check any changes to feature flags in `cdk.json` before deploying.
   * Unexpected changes may cause breaking changes in your CDK app.
   * You can overwrite any feature flag by passing it into the context field.
   *
   * @default - no feature flags are enabled by default
   */
  readonly featureFlags?: ICdkFeatureFlags;

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
  private readonly _context: Record<string, unknown>;

  constructor(project: Project, options: CdkConfigOptions) {
    super(project);

    this.cdkout = options.cdkout ?? "cdk.out";
    this._include = options.watchIncludes ?? [];
    this._exclude = options.watchExcludes ?? [];

    const flags: Record<string, unknown> = options.featureFlags?.flags ?? {};
    this._context = {
      ...flags,
      // Customer context should take precedence over the default feature flags
      ...(options.context ?? {}),
    };

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
  public get context(): Record<string, unknown> {
    return deepClone(this._context);
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
