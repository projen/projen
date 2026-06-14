import type { AutoApproveOptions } from "./auto-approve";
import { AutoApprove } from "./auto-approve";
import type { AutoMergeOptions } from "./auto-merge";
import type { GitHubOptions } from "./github";
import { GitHub } from "./github";
import type { GithubCredentials } from "./github-credentials";
import type { MergifyOptions } from "./mergify";
import type { StaleOptions } from "./stale";
import { Stale } from "./stale";
import type { GitRepositoryOptions } from "../git-repository";
import { GitRepository } from "../git-repository";
import type { Project } from "../project";

/**
 * Options for `GitHubRepository`.
 */
export interface GitHubRepositoryOptions extends GitRepositoryOptions {
  /**
   * Enable GitHub integration.
   *
   * @default true
   */
  readonly github?: boolean;

  /**
   * Options for GitHub integration.
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
   * Options for mergify.
   *
   * @default - default options
   * @deprecated use `githubOptions.mergifyOptions` instead
   */
  readonly mergifyOptions?: MergifyOptions;

  /**
   * Choose a method of providing GitHub API access for projen workflows.
   *
   * @default - use a personal access token named PROJEN_GITHUB_TOKEN
   */
  readonly projenCredentials?: GithubCredentials;

  /**
   * The name of a secret which includes a GitHub Personal Access Token to be
   * used by projen workflows. This token needs to have the `repo`, `workflows`
   * and `packages` scope.
   *
   * @default "PROJEN_GITHUB_TOKEN"
   * @deprecated use `projenCredentials`
   */
  readonly projenTokenSecret?: string;

  /**
   * Enable and configure the 'auto approve' workflow.
   * @default - auto approve is disabled
   */
  readonly autoApproveOptions?: AutoApproveOptions;

  /**
   * Enable automatic merging on GitHub. Has no effect if `github.mergify`
   * is set to false.
   * @default true
   */
  readonly autoMerge?: boolean;

  /**
   * Configure options for automatic merging on GitHub. Has no effect if
   * `github.mergify` or `autoMerge` is set to false.
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
   * @default false
   */
  readonly stale?: boolean;
}

/**
 * A git repository hosted on GitHub.
 *
 * Manages GitHub integration including workflows, PR templates,
 * Dependabot, Mergify, and other GitHub-specific configuration.
 */
export class GitHubRepository extends GitRepository {
  /**
   * Access all GitHub components.
   *
   * This is `undefined` if GitHub integration is disabled.
   */
  public readonly github: GitHub | undefined;

  /**
   * Auto approve set up for this repository.
   */
  public readonly autoApprove?: AutoApprove;

  private readonly _githubOptions: GitHubRepositoryOptions;

  constructor(options: GitHubRepositoryOptions) {
    super(options);
    this._githubOptions = options;

    // GitHub component creation is deferred until a project registers.
    // The GitHub component requires a Project in its scope (via Component),
    // which doesn't exist yet at Repository construction time.
    // See _initGitHub() which is called when the first root project is added.
    this.github = undefined;
  }

  /**
   * Initialize GitHub integration on a project scope.
   *
   * This is called internally when a root project is added to the repository.
   * The GitHub component must be scoped to a Project because Component
   * requires a Project ancestor in the construct tree.
   *
   * @internal
   */
  public _initGitHub(project: Project): GitHub | undefined {
    if ((this as any)._githubInitialized) {
      return this.github;
    }
    (this as any)._githubInitialized = true;

    const options = this._githubOptions;
    const enableGithub = options.github ?? true;

    if (!enableGithub) {
      return undefined;
    }

    const github = new GitHub(project, {
      projenTokenSecret: options.projenTokenSecret,
      projenCredentials: options.projenCredentials,
      mergify: options.mergify,
      mergifyOptions: options.mergifyOptions,
      ...options.githubOptions,
    });

    // Use Object.defineProperty to set the readonly property
    Object.defineProperty(this, "github", { value: github });

    if (options.autoApproveOptions && github) {
      const autoApprove = new AutoApprove(github, options.autoApproveOptions);
      Object.defineProperty(this, "autoApprove", { value: autoApprove });
    }

    const stale = options.stale ?? false;
    if (stale && github) {
      new Stale(github, options.staleOptions);
    }

    return github;
  }
}
