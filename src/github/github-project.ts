import {
  AutoApprove,
  AutoApproveOptions,
  AutoMergeOptions,
  GitHub,
  GitHubOptions,
  MergifyOptions,
  Stale,
  StaleOptions,
} from ".";
import { Project, ProjectOptions } from "../project";

/**
 * Options for `GitHubProject`.
 */
export interface GitHubProjectOptions extends ProjectOptions {
  /**
   * Enable GitHub integration.
   *
   * Enabled by default for root projects. Disabled for non-root projects.
   *
   * @default true
   */
  readonly github?: boolean;

  /**
   * Options for GitHub integration
   *
   * @default - see GitHubOptions
   */
  readonly githubOptions?: GitHubOptions;

  /**
   * Whether mergify should be enabled on this repository or not.
   *
   * @default true
   * @deprecated use `githubOptions.mergify` instead
   */
  readonly mergify?: boolean;

  /**
   * Options for mergify
   *
   * @default - default options
   * @deprecated use `githubOptions.mergifyOptions` instead
   */
  readonly mergifyOptions?: MergifyOptions;

  /**
   * Enable and configure the 'auto approve' workflow.
   * @default - auto approve is disabled
   */
  readonly autoApproveOptions?: AutoApproveOptions;

  /**
   * Configure options for automatic merging on GitHub. Has no effect if
   * `github.mergify` is set to false.
   *
   * @default - see defaults in `AutoMergeOptions`
   */
  readonly autoMergeOptions?: AutoMergeOptions;

  /**
   * Auto-close stale issues and pull requests. To disable set `stale` to `false`.
   *
   * @default - see defaults in `StaleOptions`
   */
  readonly staleOptions?: StaleOptions;

  /**
   * Auto-close of stale issues and pull request. See `staleOptions` for options.
   *
   * @default true
   */
  readonly stale?: boolean;

  /**
   * The name of a secret which includes a GitHub Personal Access Token to be
   * used by projen workflows. This token needs to have the `repo`, `workflows`
   * and `packages` scope.
   *
   * @default "PROJEN_GITHUB_TOKEN"
   */
  readonly projenTokenSecret?: string;
}

/**
 * GitHub-based project.
 *
 * @deprecated This is a *temporary* class. At the moment, our base project
 * types such as `NodeProject` and `JavaProject` are derived from this, but we
 * want to be able to use these project types outside of GitHub as well. One of
 * the next steps to address this is to abstract workflows so that different
 * "engines" can be used to implement our CI/CD solutions.
 */
export class GitHubProject extends Project {
  /**
   * Access all github components.
   *
   * This will be `undefined` for subprojects.
   */
  public readonly github: GitHub | undefined;

  /**
   * Auto approve set up for this project.
   */
  public readonly autoApprove?: AutoApprove;

  constructor(options: GitHubProjectOptions) {
    super(options);

    // we only allow these global services to be used in root projects
    const github = options.github ?? (this.parent ? false : true);
    this.github = github
      ? new GitHub(this, {
          projenTokenSecret: options.projenTokenSecret,
          mergify: options.mergify,
          mergifyOptions: options.mergifyOptions,
          ...options.githubOptions,
        })
      : undefined;

    if (options.autoApproveOptions && this.github) {
      this.autoApprove = new AutoApprove(
        this.github,
        options.autoApproveOptions
      );
    }

    const stale = options.stale ?? true;
    if (stale && this.github) {
      new Stale(this.github, options.staleOptions);
    }
  }
}
