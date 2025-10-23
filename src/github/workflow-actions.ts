import { GitIdentity, GithubCredentials } from ".";
import { DEFAULT_GITHUB_ACTIONS_USER } from "./constants";
import { context, isHiddenPath } from "./private/util";
import { CheckoutWith, WorkflowSteps } from "./workflow-steps";
import { JobStep } from "./workflows-model";

const REPO = context("github.repository");
const RUN_ID = context("github.run_id");
const SERVER_URL = context("github.server_url");
const RUN_URL = `${SERVER_URL}/${REPO}/actions/runs/${RUN_ID}`;
const GIT_PATCH_FILE_DEFAULT = "repo.patch";
const RUNNER_TEMP = "${{ runner.temp }}";

/**
 * A set of utility functions for creating GitHub actions in workflows.
 */
export class WorkflowActions {
  /**
   * Creates a .patch file from the current git diff and uploads it as an
   * artifact. Use `checkoutWithPatch` to download and apply in another job.
   *
   * If a patch was uploaded, the action can optionally fail the job.
   *
   * @param options Options
   * @returns Job steps
   */
  public static uploadGitPatch(options: UploadGitPatchOptions): JobStep[] {
    const MUTATIONS_FOUND = `steps.${options.stepId}.outputs.${options.outputName}`;
    const GIT_PATCH_FILE = options.patchFile ?? GIT_PATCH_FILE_DEFAULT;

    const steps: JobStep[] = [
      {
        id: options.stepId,
        name: options.stepName ?? "Find mutations",
        shell: "bash",
        run: [
          "git add .",
          `git diff --staged --patch --exit-code > ${GIT_PATCH_FILE} || echo "${options.outputName}=true" >> $GITHUB_OUTPUT`,
        ].join("\n"),
        // always run from root of repository
        // overrides default working directory which is set by some workflows using this function
        workingDirectory: "./",
      },
      WorkflowSteps.uploadArtifact({
        if: MUTATIONS_FOUND,
        name: "Upload patch",
        with: {
          name: GIT_PATCH_FILE,
          path: GIT_PATCH_FILE,
          includeHiddenFiles: isHiddenPath(GIT_PATCH_FILE) ? true : undefined,
        },
      }),
    ];

    if (options.mutationError) {
      steps.push({
        name: "Fail build on mutation",
        if: MUTATIONS_FOUND,
        run: [
          `echo "::error::${options.mutationError}"`,
          `cat ${GIT_PATCH_FILE}`,
          "exit 1",
        ].join("\n"),
      });
    }

    return steps;
  }
  /**
   * Checks out a repository and applies a git patch that was created using
   * `uploadGitPatch`.
   *
   * @param options Options
   * @returns Job steps
   */
  public static checkoutWithPatch(
    options: CheckoutWithPatchOptions = {}
  ): JobStep[] {
    const { patchFile, ...restOfOptions } = options;
    const GIT_PATCH_FILE = options.patchFile ?? GIT_PATCH_FILE_DEFAULT;

    return [
      WorkflowSteps.checkout({ with: restOfOptions }),
      {
        name: "Download patch",
        uses: "actions/download-artifact@v5",
        with: { name: GIT_PATCH_FILE, path: RUNNER_TEMP },
      },
      {
        name: "Apply patch",
        run: `[ -s ${RUNNER_TEMP}/${GIT_PATCH_FILE} ] && git apply ${RUNNER_TEMP}/${GIT_PATCH_FILE} || echo "Empty patch. Skipping."`,
      },
    ];
  }

  /**
   * A step that creates a pull request based on the current repo state.
   *
   * @param options Options
   * @returns Job steps
   */
  public static createPullRequest(
    options: CreatePullRequestOptions
  ): JobStep[] {
    const workflowName = options.workflowName;
    const branchName = options.branchName ?? `github-actions/${workflowName}`;
    const stepId = options.stepId ?? "create-pr";
    const stepName = options.stepName ?? "Create Pull Request";
    const gitIdentity = options.gitIdentity ?? DEFAULT_GITHUB_ACTIONS_USER;
    const committer = `${gitIdentity.name} <${gitIdentity.email}>`;
    const pullRequestDescription = options.pullRequestDescription
      .trimEnd()
      .endsWith(".")
      ? options.pullRequestDescription.trimEnd()
      : `${options.pullRequestDescription.trimEnd()}.`;

    const title = options.pullRequestTitle;
    const description = [
      `${pullRequestDescription} See details in [workflow run].`,
      "",
      `[Workflow Run]: ${RUN_URL}`,
      "",
      "------",
      "",
      `*Automatically created by projen via the "${workflowName}" workflow*`,
    ].join("\n");

    return [
      {
        name: stepName,
        id: stepId,
        uses: "peter-evans/create-pull-request@v7",
        with: {
          token: options.credentials?.tokenRef,
          "commit-message": `${title}\n\n${description}`,
          branch: branchName,
          base: options.baseBranch,
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
  }

  /**
   * Configures the git identity (user name and email).
   * @param id The identity to use
   * @returns Job steps
   *
   * @deprecated use `WorkflowSteps.setupGitIdentity` instead
   */
  public static setupGitIdentity(id: GitIdentity): JobStep[] {
    return [WorkflowSteps.setupGitIdentity({ gitIdentity: id })];
  }
}

/**
 * Options for `checkoutWithPatch`.
 */
export interface CheckoutWithPatchOptions extends CheckoutWith {
  /**
   * The name of the artifact the patch is stored as.
   * @default ".repo.patch"
   */
  readonly patchFile?: string;
}

/**
 * Options for `uploadGitPatch`.
 */
export interface UploadGitPatchOptions {
  /**
   * The step ID which produces the output which indicates if a patch was created.
   */
  readonly stepId: string;

  /**
   * The name of the step.
   * @default "Find mutations"
   */
  readonly stepName?: string;

  /**
   * The name of the artifact the patch is stored as.
   * @default ".repo.patch"
   */
  readonly patchFile?: string;

  /**
   * The name of the output to emit. It will be set to `true` if there was a diff.
   */
  readonly outputName: string;

  /**
   * Fail if a mutation was found and print this error message.
   * @default - do not fail upon mutation
   */
  readonly mutationError?: string;
}

export interface CreatePullRequestOptions {
  /**
   * The step ID which produces the output which indicates if a patch was created.
   * @default "create_pr"
   */
  readonly stepId?: string;

  /**
   * The name of the step displayed on GitHub.
   * @default "Create Pull Request"
   */
  readonly stepName?: string;

  /**
   * The job credentials used to create the pull request.
   *
   * Provided credentials must have permissions to create a pull request on the repository.
   */
  readonly credentials?: GithubCredentials;

  /**
   * The name of the workflow that will create the PR
   */
  readonly workflowName: string;

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
   * Sets the pull request base branch.
   *
   * @default - The branch checked out in the workflow.
   */
  readonly baseBranch?: string;

  /**
   * The pull request branch name.
   *
   * @default `github-actions/${options.workflowName}`
   */
  readonly branchName?: string;

  /**
   * The git identity used to create the commit.
   * @default - default GitHub Actions user
   */
  readonly gitIdentity?: GitIdentity;

  /**
   * Add Signed-off-by line by the committer at the end of the commit log message.
   *
   * @default true
   */
  readonly signoff?: boolean;

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
