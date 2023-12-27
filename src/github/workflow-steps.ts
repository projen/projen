import { GitIdentity } from "./task-workflow";
import { JobStep } from "./workflows-model";

export class WorkflowSteps {
  /**
   * Checks out a repository.
   *
   * @param options Options
   * @returns Job steps
   */
  public static checkout(options: CheckoutOptions = {}): JobStep {
    const checkoutWith = Object.fromEntries(
      Object.entries({
        "fetch-depth": options?.with?.fetchDepth,
        token: options?.with?.token,
        ref: options?.with?.ref,
        repository: options?.with?.repository,
        ...(options?.with?.lfs ? { lfs: true } : {}),
      }).filter(([_, value]) => value !== undefined)
    );

    return {
      id: options?.id,
      if: options?.if,
      name: options?.name ?? "Checkout",
      uses: "actions/checkout@v3",
      with: Object.keys(checkoutWith).length > 0 ? checkoutWith : undefined,
    };
  }

  /**
   * Configures the git identity (user name and email).
   * @param id The identity to use
   * @returns Job steps
   */
  public static setupGitIdentity(id: GitIdentity): JobStep {
    return {
      name: "Set git identity",
      run: [
        `git config user.name "${id.name}"`,
        `git config user.email "${id.email}"`,
      ].join("\n"),
    };
  }
}

export interface CommonWorkflowStepOptions {
  /**
   * A unique identifier for the step.
   */
  readonly id?: string;

  /**
   * A condition to determine whether to run this step.
   */
  readonly if?: string;

  /**
   * The name of the step.
   */
  readonly name?: string;
}

export interface CheckoutOptions extends CommonWorkflowStepOptions {
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
