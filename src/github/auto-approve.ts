import type { GitHub } from "./github";
import { GithubCredentials } from "./github-credentials";
import { PullRequestSource } from "./pull-request-source";
import type { GithubWorkflow } from "./workflows";
import type { Job } from "./workflows-model";
import { JobPermission } from "./workflows-model";
import { Component } from "../component";
import type { RunsOnOptions } from "../runner-options";

const DEFAULT_USERNAMES = ["github-actions[bot]"];
const JOB_ID = "approve";

/**
 * Options for 'AutoApprove'
 */
export interface AutoApproveOptions extends RunsOnOptions {
  /**
   * Only pull requests from one of these sources will be auto-approved.
   *
   * Components that create pull requests can add more sources with `AutoApprove.addSource()`.
   * Providing sources, either here or with `addSource()`, replaces the default source.
   *
   * @default [PullRequestSource.fromUsers({ logins: ["github-actions[bot]"] })]
   */
  readonly sources?: PullRequestSource[];

  /**
   * Only pull requests authored by these Github usernames will be auto-approved.
   *
   * An empty list approves pull requests from any user.
   *
   * @default ['github-actions[bot]']
   * @deprecated Use `sources` with `PullRequestSource.fromUsers({ logins })` instead.
   */
  readonly allowedUsernames?: string[];

  /**
   * Only pull requests with this label will be auto-approved.
   *
   * This is required in addition to matching one of the `sources`.
   *
   * @default 'auto-approve'
   */
  readonly label?: string;

  /**
   * The credentials used to approve pull requests.
   *
   * Github forbids an identity to approve its own pull request.
   * These credentials must belong to a different identity than the one creating the pull requests.
   * Use `environment` on the credentials to restrict which branches can access them.
   *
   * @default - the workflow's `GITHUB_TOKEN`
   */
  readonly credentials?: GithubCredentials;

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
   * @deprecated Use `credentials` with `GithubCredentials.fromPersonalAccessToken({ secret })` instead.
   */
  readonly secret?: string;
}

/**
 * Auto approve pull requests that meet a criteria
 */
export class AutoApprove extends Component {
  public readonly label: string;

  private readonly workflow: GithubWorkflow;
  private readonly sources: PullRequestSource[];
  private sourcesProvided: boolean;
  private readonly allowedUsernames?: string[];

  constructor(github: GitHub, options: AutoApproveOptions = {}) {
    super(github.project);

    if (options.sources && options.allowedUsernames) {
      throw new Error(
        "Only one of 'sources' or 'allowedUsernames' may be specified, not both. Remove the deprecated 'allowedUsernames'.",
      );
    }
    if (options.credentials && options.secret) {
      throw new Error(
        "Only one of 'credentials' or 'secret' may be specified, not both. Remove the deprecated 'secret'.",
      );
    }

    this.label = options.label ?? "auto-approve";
    this.allowedUsernames = options.allowedUsernames;
    this.sourcesProvided = options.sources !== undefined;
    this.sources = [...(options.sources ?? [])];

    const credentials =
      options.credentials ??
      GithubCredentials.fromPersonalAccessToken({
        secret: options.secret ?? "GITHUB_TOKEN",
      });

    const approveJob: Job = {
      ...github.runsOnConfig(options),
      permissions: {
        pullRequests: JobPermission.WRITE,
      },
      if: (() => this.renderCondition()) as any,
      environment: credentials.environment,
      steps: [
        ...credentials.setupSteps,
        {
          run: 'gh pr review --approve "$PR_NUMBER" --repo "$GH_REPO"',
          env: {
            GH_TOKEN: credentials.tokenRef,
            GH_REPO: "${{ github.repository }}",
            PR_NUMBER: "${{ github.event.pull_request.number }}",
          },
        },
      ],
    };

    this.workflow = github.addWorkflow("auto-approve");
    this.workflow.on({
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
    this.workflow.addJobs({ [JOB_ID]: approveJob });
  }

  /**
   * Auto-approve pull requests from this source, in addition to the configured sources.
   *
   * Adding a source replaces the default source.
   */
  public addSource(source: PullRequestSource) {
    if (this.allowedUsernames) {
      throw new Error(
        "Cannot add sources while the deprecated 'allowedUsernames' is used. Replace 'allowedUsernames' with 'sources: [PullRequestSource.fromUsers({ logins })]'.",
      );
    }
    this.sourcesProvided = true;
    this.sources.push(source);
  }

  private renderCondition(): string {
    const label = `contains(github.event.pull_request.labels.*.name, '${this.label.replace(/'/g, "''")}')`;

    if (this.allowedUsernames) {
      if (this.allowedUsernames.length === 0) {
        return label;
      }
      const users = this.allowedUsernames
        .map((u) => `github.event.pull_request.user.login == '${u}'`)
        .join(" || ");
      return `${label} && (${users})`;
    }

    const sources = this.sourcesProvided
      ? this.sources
      : [PullRequestSource.fromUsers({ logins: DEFAULT_USERNAMES })];

    if (sources.length === 0) {
      throw new Error(
        "AutoApprove has no sources, so no pull request would ever be approved. Add at least one source with the 'sources' option or 'AutoApprove.addSource()'.",
      );
    }

    // Keeps the rendered condition of the default source stable.
    if (sources.length === 1) {
      return `${label} && ${sources[0]._toCondition()}`;
    }
    const conditions = sources.map((s) => s._toCondition()).join(" || ");
    return `${label} && (${conditions})`;
  }
}
