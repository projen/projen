import {
  CheckoutWithPatchOptions,
  CreatePullRequestOptions,
  WorkflowActions,
  workflows,
} from ".";
import { DEFAULT_GITHUB_ACTIONS_USER } from "./constants";
import { Job, JobStep } from "./workflows-model";
import { GroupRunnerOptions } from "../group-runner-options";

/**
 * A set of utility functions for creating jobs in GitHub Workflows.
 */
export class WorkflowJobs {
  /**
   * Creates a pull request with the changes of a patch file.
   *
   * @returns Job
   */
  public static pullRequestFromPatch(
    options: PullRequestFromPatchOptions
  ): Job {
    const jobName = options.jobName ?? "Create Pull Request";
    const gitIdentity = options.gitIdentity ?? DEFAULT_GITHUB_ACTIONS_USER;

    const steps: JobStep[] = [
      ...(options.credentials?.setupSteps || []),
      ...WorkflowActions.checkoutWithPatch(options.patch),
      ...WorkflowActions.setupGitIdentity(gitIdentity),
      ...WorkflowActions.createPullRequest({
        ...options,
        gitIdentity,
      }),
    ];

    return {
      name: jobName,
      if: `\${{ needs.${options.patch.jobId}.outputs.${options.patch.outputName} }}`,
      needs: [options.patch.jobId],
      permissions: {
        contents: workflows.JobPermission.READ,
      },
      ...getRunsOnConfig(options),
      steps,
    };
  }
}

export interface PullRequestPatchSource extends CheckoutWithPatchOptions {
  /**
   * The id of the job that created the patch file
   */
  readonly jobId: string;

  /**
   * The name of the output that indicates if a patch has been created
   */
  readonly outputName: string;
}

export interface PullRequestFromPatchOptions extends CreatePullRequestOptions {
  /**
   * Information about the patch that is used to create the pull request.
   */
  readonly patch: PullRequestPatchSource;

  /**
   * The name of the job displayed on GitHub.
   * @default "Create Pull Request"
   */
  readonly jobName?: string;

  /**
   * Github Runner selection labels
   * @default ["ubuntu-latest"]
   */
  readonly runsOn?: string[];

  /**
   * Github Runner Group selection options
   */
  readonly runsOnGroup?: GroupRunnerOptions;
}

/**
 * Generates the runs-on config for Jobs.
 * Throws error if 'runsOn' and 'runsOnGroup' are both set.
 *
 * @param options - 'runsOn' or 'runsOnGroup'.
 */
function getRunsOnConfig(options: PullRequestFromPatchOptions) {
  if (options.runsOnGroup && options.runsOn) {
    throw new Error(
      "Both 'runsOn' and 'runsOnGroup' cannot be set at the same time"
    );
  }

  return options.runsOnGroup
    ? { runsOnGroup: options.runsOnGroup }
    : { runsOn: options.runsOn ?? ["ubuntu-latest"] };
}
