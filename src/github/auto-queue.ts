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
   * A GitHub secret name which contains a GitHub Access Token
   * with write permissions for the `pull_request` scope.
   *
   * This token is used to enable auto-queue on pull requests.
   *
   * @default "GITHUB_TOKEN"
   */
  readonly secret?: string;

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

    const secret = options.secret ?? "GITHUB_TOKEN";
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
        {
          uses: "peter-evans/enable-pull-request-automerge@v3",
          with: {
            token: `\${{ secrets.${secret} }}`,
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
      // We only enable auto-queue when a PR is opened, reopened or moving from Draft to Ready.
      // That way a user can always disable auto-queue if they want to and the workflow will
      // not automatically re-enable it, unless one of the events occurs.
      pullRequestTarget: {
        types: ["opened", "reopened", "ready_for_review"],
      },
    });
    workflow.addJobs({ enableAutoQueue: autoQueueJob });
  }
}
