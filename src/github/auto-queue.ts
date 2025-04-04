import { IConstruct } from "constructs";
import { Component } from "../component";
import * as gh from "../github";

/**
 * The merge method used to add the PR to the merge queue
 *
 * Behavior can be further configured in repository settings.
 */
export enum MergeMethod {
  SQUASH = "squash",
  MERGE = "merge",
  REBASE = "rebase",
}

/**
 * Options for 'AutoQueue'
 */
export interface AutoQueueOptions {
  /**
   * Only pull requests authored by these Github usernames will have auto-queue enabled.
   * @default - pull requests from all users are eligible for auto-queuing
   */
  readonly allowedUsernames?: string[];

  /**
   * Only pull requests with one of this labels will have auto-queue enabled.
   * @default - all pull requests are eligible for auto-queueing
   */
  readonly labels?: string[];

  /**
   * Choose a method for authenticating with GitHub to enable auto-queue on pull requests.
   *
   * The workflow cannot use a default github token. Queuing a PR
   * with the default token will not trigger any merge queue workflows,
   * which results in the PR just not getting merged at all.
   *
   * @see https://projen.io/docs/integrations/github/
   * @default - uses credentials from the GitHub component
   */
  readonly projenCredentials?: gh.GithubCredentials;

  /**
   * The method used to add the PR to the merge queue
   * Any branch protection rules must allow this merge method.
   * @default MergeMethod.SQUASH
   */
  readonly mergeMethod?: MergeMethod;

  /**
   * Github Runner selection labels
   * @default ["ubuntu-latest"]
   */
  readonly runsOn?: string[];

  /**
   * The branch names that we should auto-queue for
   *
   * This set of branches should be a subset of `MergeQueueOptions.targetBranches`.
   *
   * ## Automatically merging a set of Stacked PRs
   *
   * If you set this to `['main']` you can automatically merge a set of Stacked PRs
   * in the right order. It works like this:
   *
   * - Create PR #1 from branch `a`, targeting `main`.
   * - Create PR #2 from branch `b`, targeting branch `a`.
   * - Create PR #3 from branch `c`, targeting branch `b`.
   *
   * Initially, PR #1 will be set to auto-merge, PRs #2 and #3 will not.
   *
   * Once PR #1 passes all of its requirements it will merge. That will delete
   * branch `a` and change  the target branch of PR #2 change to `main`. At that
   * point, auto-queueing will switch on for PR #2 and it gets merged, etc.
   *
   * > [!IMPORTANT]
   * > This component will disable AutoMerge, only enable it. So if a PR is
   * > initially targeted one of the branches in this list, and then
   * > subsequently retargeted to another branch, *AutoMerge is not
   * > automatically turned off*.
   */
  readonly targetBranches?: string[];
}

/**
 * Automatically add pull requests to the merge queue
 * PRs will be merged once they pass required checks.
 */
export class AutoQueue extends Component {
  constructor(scope: IConstruct, options: AutoQueueOptions = {}) {
    super(scope);

    const workflowEngine = gh.GitHub.of(this.project);
    if (!workflowEngine) {
      throw new Error(
        `Cannot add ${
          new.target.name
        } to project without GitHub enabled. Please enable GitHub for this project.`
      );
    }

    const labels = options.labels ?? [];
    const usernames = options.allowedUsernames ?? [];

    const conditions: string[] = [];
    if (labels.length > 0) {
      conditions.push(
        "(" +
          labels
            .map(
              (l) => `contains(github.event.pull_request.labels.*.name, '${l}')`
            )
            .join(" || ") +
          ")"
      );
    }
    if (usernames.length > 0) {
      conditions.push(
        "(" +
          usernames
            .map((u) => `github.event.pull_request.user.login == '${u}'`)
            .join(" || ") +
          ")"
      );
    }

    let needsEditedEvent = false;
    if (options.targetBranches) {
      // Branch conditions, based off the 'opened' or 'edited' events.
      //
      // The current workflow will only run if the target branch is one of the intended
      // ones, so we only need to check if the event type is correct.
      needsEditedEvent = true;

      const isOpened = `github.event.action == 'opened'`;
      const isBranchChanged = `(github.event.action == 'edited' && github.event.changes.base)`;

      conditions.push(`(${isOpened} || ${isBranchChanged})`);
    }

    const credentials =
      options.projenCredentials ?? workflowEngine.projenCredentials;
    const mergeMethod = options.mergeMethod ?? MergeMethod.SQUASH;

    const autoQueueJob: gh.workflows.Job = {
      name: "Set AutoQueue on PR #${{ github.event.number }}",
      runsOn: options.runsOn ?? ["ubuntu-latest"],
      permissions: {
        pullRequests: gh.workflows.JobPermission.WRITE,
        contents: gh.workflows.JobPermission.WRITE,
      },
      if: conditions.length ? conditions.join(" && ") : undefined,
      steps: [
        ...credentials.setupSteps,
        {
          uses: "peter-evans/enable-pull-request-automerge@v3",
          with: {
            token: credentials.tokenRef,
            "pull-request-number": "${{ github.event.number }}",
            "merge-method": mergeMethod,
          },
        },
      ],
    };

    const workflow = workflowEngine.addWorkflow("auto-queue");
    workflow.on({
      // The 'pull request' event gives the workflow 'read-only' permissions on some
      // pull requests (such as the ones from dependabot) when using the `GITHUB_TOKEN`
      // security token. This prevents the workflow from approving these pull requests.
      // Github has placed this guard so as to prevent security attacks by simply opening
      // a pull request and triggering a workflow on a commit that was not vetted to make
      // unintended changes to the repository.
      //
      // Instead use the 'pull request target' event here that gives the Github workflow
      // 'read-write' permissions. This is safe because, this event, unlike the 'pull request'
      // event references the BASE commit of the pull request and not the HEAD commit.
      //
      // We only enable auto-queue when a PR is opened, reopened or moving from Draft to Ready,
      // or retargeted to a different branch. Specifically, if a user disableds auto-queue we try very hard to avoid
      // accidentally re-enabling it.
      //
      // The 'edited' trigger is only used to detect base branch changes.
      pullRequestTarget: {
        types: [
          "opened",
          "reopened",
          "ready_for_review",
          ...(needsEditedEvent ? ["edited" as const] : []),
        ],
        branches: options.targetBranches,
      },
    });
    workflow.addJobs({ enableAutoQueue: autoQueueJob });
  }
}
