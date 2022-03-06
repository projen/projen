import { Construct } from "constructs";
import { Component } from "../component";
import { Project } from "../project";
import { Dependabot, DependabotOptions } from "./dependabot";
import { Mergify, MergifyOptions } from "./mergify";
import { PullRequestTemplate } from "./pr-template";
import { PullRequestLint, PullRequestLintOptions } from "./pull-request-lint";

export interface GitHubOptions {
  /**
   * Whether mergify should be enabled on this repository or not.
   *
   * @default true
   */
  readonly mergify?: boolean;

  /**
   * Options for Mergify.
   *
   * @default - default options
   */
  readonly mergifyOptions?: MergifyOptions;

  /**
   * Enables GitHub workflows. If this is set to `false`, workflows will not be created.
   *
   * @default true
   */
  readonly workflows?: boolean;

  /**
   * Add a workflow that performs basic checks for pull requests, like
   * validating that PRs follow Conventional Commits.
   *
   * @default true
   */
  readonly pullRequestLint?: boolean;

  /**
   * Options for configuring a pull request linter.
   *
   * @default - see defaults in `PullRequestLintOptions`
   */
  readonly pullRequestLintOptions?: PullRequestLintOptions;

  /**
   * The name of a secret which includes a GitHub Personal Access Token to be
   * used by projen workflows. This token needs to have the `repo`, `workflows`
   * and `packages` scope.
   *
   * @default "PROJEN_GITHUB_TOKEN"
   */
  readonly projenTokenSecret?: string;
}

export class GitHub extends Component {
  /**
   * Returns the `GitHub` component of a project or `undefined` if the project
   * does not have a GitHub component.
   */
  public static of(project: Project): GitHub | undefined {
    const isGitHub = (c: Component): c is GitHub => c instanceof GitHub;
    return project.components.find(isGitHub);
  }

  /**
   * The `Mergify` configured on this repository. This is `undefined` if Mergify
   * was not enabled when creating the repository.
   */
  public readonly mergify?: Mergify;

  /**
   * Are workflows enabled?
   */
  public readonly workflowsEnabled: boolean;

  /**
   * The name of a secret with a GitHub Personal Access Token to be used by
   * projen workflows.
   */
  public readonly projenTokenSecret: string;

  public constructor(scope: Construct, options: GitHubOptions = {}) {
    super(scope, "GitHub");

    this.workflowsEnabled = options.workflows ?? true;
    this.projenTokenSecret = options.projenTokenSecret ?? "PROJEN_GITHUB_TOKEN";

    if (options.mergify ?? true) {
      this.mergify = new Mergify(this, options.mergifyOptions);
    }

    if (options.pullRequestLint ?? true) {
      new PullRequestLint(this, options.pullRequestLintOptions);
    }
  }

  public addPullRequestTemplate(...content: string[]) {
    return new PullRequestTemplate(this, { lines: content });
  }

  public addDependabot(options?: DependabotOptions) {
    return new Dependabot(this, options);
  }
}
