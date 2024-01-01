import { GitIdentity } from "./task-workflow";
import { CommonJobStep, JobStep } from "./workflows-model";
import { removeNullOrUndefinedProperties } from "../util/object";

/**
 * A collection of very commonly used, individual, GitHub Workflow Job steps.
 */
export class WorkflowSteps {
  /**
   * Checks out a repository.
   *
   * @param options Options
   * @returns Job steps
   */
  public static checkout(options: CheckoutOptions = {}): JobStep {
    const checkoutWith = removeNullOrUndefinedProperties({
      "fetch-depth": options?.with?.fetchDepth,
      token: options?.with?.token,
      ref: options?.with?.ref,
      repository: options?.with?.repository,
      ...(options?.with?.lfs ? { lfs: true } : {}),
    });

    return {
      ...this.buildCommonJobStep({
        ...options,
        name: options.name ?? "Checkout",
      }),
      uses: "actions/checkout@v3",
      with: Object.keys(checkoutWith).length > 0 ? checkoutWith : undefined,
    };
  }

  /**
   * Configures the git identity (user name and email).
   * @param options SetupGitIdentityOptions
   * @returns Job steps
   */
  public static setupGitIdentity(options: SetupGitIdentityOptions): JobStep {
    return {
      ...this.buildCommonJobStep({
        ...options,
        name: options.name ?? "Set git identity",
      }),
      run: [
        `git config user.name "${options.gitIdentity.name}"`,
        `git config user.email "${options.gitIdentity.email}"`,
      ].join("\n"),
    };
  }

  public static uploadArtifact(options: UploadArtifactOptions): JobStep {
    const uploadArtifactWith: UploadArtifactWith =
      removeNullOrUndefinedProperties({
        name: options?.with?.name,
        path: options?.with?.path,
        "if-no-files-found": options?.with?.ifNoFilesFound,
        "retention-days": options?.with?.retentionDays,
        "compression-level": options?.with?.compressionLevel,
      });

    return {
      ...this.buildCommonJobStep({
        ...options,
        name: options.name ?? "Upload artifact",
      }),
      uses: "actions/upload-artifact@v3",
      with: uploadArtifactWith,
    };
  }

  private static buildCommonJobStep(options: CommonJobStep): CommonJobStep {
    return {
      continueOnError: options?.continueOnError,
      env: options?.env,
      id: options?.id,
      if: options?.if,
      name: options?.name,
      timeoutMinutes: options?.timeoutMinutes,
      workingDirectory: options?.workingDirectory,
    };
  }
}
export interface CheckoutOptions extends CommonJobStep {
  /**
   * Options for `checkout`.
   */
  readonly with?: CheckoutWith;
}

/**
 * Options for `checkout`.
 */
export interface CheckoutWith {
  /**
   * Number of commits to fetch. 0 indicates all history for all branches and tags.
   *
   * @default 1
   */
  readonly fetchDepth?: number;
  /**
   * Whether LFS is enabled for the GitHub repository
   *
   * @default false
   */
  readonly lfs?: boolean;

  /**
   * Branch or tag name.
   * @default - the default branch is implicitly used
   */
  readonly ref?: string;

  /**
   * The repository (owner/repo) to use.
   * @default - the default repository is implicitly used
   */
  readonly repository?: string;

  /**
   * A GitHub token to use when checking out the repository.
   *
   * If the intent is to push changes back to the branch, then you must use a
   * PAT with `repo` (and possibly `workflows`) permissions.
   * @default - the default GITHUB_TOKEN is implicitly used
   */
  readonly token?: string;
}

export interface SetupGitIdentityOptions extends CommonJobStep {
  /**
   * The identity to use.
   */
  readonly gitIdentity: GitIdentity;
}

export interface UploadArtifactWith {
  /**
   * Name of the artifact to upload.
   *
   * @default "artifact"
   */
  readonly name?: string;

  /**
   * A file, directory or wildcard pattern that describes what to upload
   */
  readonly path: string;

  /**
   * The desired behavior if no files are found using the provided path.
   * Available Options:
   *   warn: Output a warning but do not fail the action
   *   error: Fail the action with an error message
   *   ignore: Do not output any warnings or errors, the action does not fail
   *
   * @default "warn"
   */
  readonly ifNoFilesFound?: "error" | "warn" | "ignore";

  /**
   * Duration after which artifact will expire in days. 0 means using default repository retention.
   *
   * Minimum 1 day.
   * Maximum 90 days unless changed from the repository settings page.
   *
   * @default - The default repository retention
   */
  readonly retentionDays?: number;

  /**
   * The level of compression for Zlib to be applied to the artifact archive.
   *
   * The value can range from 0 to 9.
   * For large files that are not easily compressed, a value of 0 is recommended for significantly faster uploads.
   *
   * @default 6
   */
  readonly compressionLevel?: number;
}

export interface UploadArtifactOptions extends CommonJobStep {
  /**
   * Options for `upload-artifact`.
   */
  readonly with: UploadArtifactWith;
}
