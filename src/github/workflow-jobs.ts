import {
  CheckoutWithPatchOptions,
  CreatePullRequestOptions,
  WorkflowActions,
  WorkflowSteps,
  workflows,
} from ".";
import { DEFAULT_GITHUB_ACTIONS_USER } from "./constants";
import { Job, JobPermission, JobStep } from "./workflows-model";
import { GroupRunnerOptions, filteredRunsOnOptions } from "../runner-options";

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
      WorkflowSteps.setupGitIdentity({ gitIdentity }),
      ...WorkflowActions.createPullRequest({
        ...options,
        gitIdentity,
      }),
    ];

    const permissions =
      options.credentials?.tokenRef == "${{ secrets.GITHUB_TOKEN }}"
        ? {
            contents: JobPermission.WRITE,
            pullRequests: JobPermission.WRITE,
          }
        : {
            contents: workflows.JobPermission.READ,
          };

    return {
      name: jobName,
      if: `\${{ needs.${options.patch.jobId}.outputs.${options.patch.outputName} }}`,
      needs: [options.patch.jobId],
      environment: options.credentials?.environment,
      permissions,
      ...filteredRunsOnOptions(options.runsOn, options.runsOnGroup),
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
   * @description Defines a target Runner by labels
   * @throws {Error} if both `runsOn` and `runsOnGroup` are specified
   */
  readonly runsOn?: string[];

  /**
   * Github Runner Group selection options
   * @description Defines a target Runner Group by name and/or labels
   * @throws {Error} if both `runsOn` and `runsOnGroup` are specified
   */
  readonly runsOnGroup?: GroupRunnerOptions;
}
