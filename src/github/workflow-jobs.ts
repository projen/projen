import { GitIdentity, GithubCredentials, WorkflowActions, workflows } from ".";
import { Job, JobStep } from "./workflows-model";

function context(value: string) {
  return `\${{ ${value} }}`;
}

const REPO = context("github.repository");
const RUN_ID = context("github.run_id");
const RUN_URL = `https://github.com/${REPO}/actions/runs/${RUN_ID}`;

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
    // default to API access method used by all GitHub workflows, unless a
    // custom one is specified
    const apiAccess = options.credentials;
    const token = apiAccess.tokenRef;
    const runsOn = options.runsOn ?? ["ubuntu-latest"];
    const workflowName = options.patch.workflowName;
    const branchName = `github-actions/${workflowName}`;
    const prStepId = "create-pr";

    const title = options.pullRequestTitle;
    const description = [
      `${options.pullRequestDescription} See details in [workflow run].`,
      "",
      `[Workflow Run]: ${RUN_URL}`,
      "",
      "------",
      "",
      `*Automatically created by projen via the "${workflowName}" workflow*`,
    ].join("\n");

    const committer = `${options.gitIdentity.name} <${options.gitIdentity.email}>`;
    const jobName = options.jobName ?? "Create Pull Request";

    const steps: JobStep[] = [
      ...apiAccess.setupSteps,
      ...WorkflowActions.checkoutWithPatch({
        ref: options.ref,
        patchFile: options.patch?.patchFile,
      }),
      ...WorkflowActions.setupGitIdentity(options.gitIdentity),
      {
        name: jobName,
        id: prStepId,
        uses: "peter-evans/create-pull-request@v4",
        with: {
          // the pr can modify workflow files, so we need to use the custom
          // secret if one is configured.
          token,
          "commit-message": `${title}\n\n${description}`,
          branch: branchName,
          title: title,
          labels: options.labels?.join(",") || undefined,
          assignees: options.assignees?.join(",") || undefined,
          body: description,
          author: committer,
          committer: committer,
          signoff: options.signoff ?? true,
        },
      },
    ];

    return {
      name: jobName,
      if: `\${{ needs.${options.patch.jobId}.outputs.${options.patch.outputName} }}`,
      needs: [options.patch.jobId],
      permissions: {
        contents: workflows.JobPermission.READ,
      },
      runsOn,
      steps,
    };
  }
}

export interface PullRequestPatchSource {
  /**
   * The name of the workflow that will create the PR
   */
  readonly workflowName: string;

  /**
   * The id of the job that created the patch file
   */
  readonly jobId: string;

  /**
   * The name of the output that indicates if a patch has been created
   */
  readonly outputName: string;

  /**
   * The name of the artifact the patch is stored as.
   * @default ".repo.patch"
   */
  readonly patchFile?: string;
}

export interface PullRequestFromPatchOptions {
  /**
   * Information about the patch that is used to create the pull request.
   */
  readonly patch: PullRequestPatchSource;

  /**
   * The full title used to create the pull request.
   *
   * If PR titles are validated in this repo, the title should comply with the respective rules.
   */
  readonly pullRequestTitle: string;

  /**
   * Description added to the pull request.
   *
   * Providence information are automatically added.
   */
  readonly pullRequestDescription: string;

  /**
   * The git identity used to create the commit.
   */
  readonly gitIdentity: GitIdentity;

  /**
   * Add Signed-off-by line by the committer at the end of the commit log message.
   *
   * @default true
   */
  readonly signoff?: boolean;

  /**
   * The name of the job displayed on GitHub.
   * @default "Create Pull Request"
   */
  readonly jobName?: string;

  /**
   * The job credentials used to create the pull request.
   *
   * Provided credentials must have permissions to create a pull request on the repository.
   */
  readonly credentials: GithubCredentials;

  /**
   * Branch or tag name.
   * @default - the default branch is implicitly used
   */
  readonly ref?: string;

  /**
   * Github Runner selection labels
   * @default ["ubuntu-latest"]
   */
  readonly runsOn?: string[];

  /**
   * Labels to apply on the PR.
   *
   * @default - no labels.
   */
  readonly labels?: string[];

  /**
   * Assignees to add on the PR.
   *
   * @default - no assignees
   */
  readonly assignees?: string[];
}
