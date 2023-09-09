import { GitHub } from "./github";
import { Job, JobPermission } from "./workflows-model";
import { Component } from "../component";
import { GroupRunnerOptions, filteredRunsOnOptions } from "../runner-options";

/**
 * Options for 'AutoApprove'
 */
export interface AutoApproveOptions {
  /**
   * Only pull requests authored by these Github usernames will be auto-approved.
   * @default ['github-bot']
   */
  readonly allowedUsernames?: string[];

  /**
   * Only pull requests with this label will be auto-approved.
   * @default 'auto-approve'
   */
  readonly label?: string;

  /**
   * A GitHub secret name which contains a GitHub Access Token
   * with write permissions for the `pull_request` scope.
   *
   * This token is used to approve pull requests.
   *
   * Github forbids an identity to approve its own pull request.
   * If your project produces automated pull requests using the Github default token -
   * {@link https://docs.github.com/en/actions/reference/authentication-in-a-workflow `GITHUB_TOKEN` }
   * - that you would like auto approved, such as when using the `depsUpgrade` property in
   * `NodeProjectOptions`, then you must use a different token here.
   *
   * @default "GITHUB_TOKEN"
   */
  readonly secret?: string;

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

/**
 * Auto approve pull requests that meet a criteria
 */
export class AutoApprove extends Component {
  public readonly label: string;

  constructor(github: GitHub, options: AutoApproveOptions = {}) {
    super(github.project);

    this.label = options.label ?? "auto-approve";
    const usernames = options.allowedUsernames ?? ["github-actions[bot]"];

    let condition = `contains(github.event.pull_request.labels.*.name, '${this.label}')`;
    if (usernames.length > 0) {
      condition += " && (";
      condition += usernames
        .map((u) => `github.event.pull_request.user.login == '${u}'`)
        .join(" || ");
      condition += ")";
    }

    const secret = options.secret ?? "GITHUB_TOKEN";

    const approveJob: Job = {
      ...filteredRunsOnOptions(options.runsOn, options.runsOnGroup),
      permissions: {
        pullRequests: JobPermission.WRITE,
      },
      if: condition,
      steps: [
        {
          uses: "hmarr/auto-approve-action@v2.2.1",
          with: {
            "github-token": `\${{ secrets.${secret} }}`,
          },
        },
      ],
    };

    const workflow = github.addWorkflow("auto-approve");
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
      pullRequestTarget: {
        types: [
          "labeled",
          "opened",
          "synchronize",
          "reopened",
          "ready_for_review",
        ],
      },
    });
    workflow.addJobs({ approve: approveJob });
  }
}
