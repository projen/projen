import type { CiConfigurationOptions } from "./configuration";
import { GitlabConfiguration } from "./gitlab-configuration";
import type { GitRepositoryOptions } from "../git-repository";
import { GitRepository } from "../git-repository";
import type { Project } from "../project";

/**
 * Options for `GitLabRepository`.
 */
export interface GitLabRepositoryOptions extends GitRepositoryOptions {
  /**
   * Options for GitLab CI configuration.
   *
   * @default - default options
   */
  readonly gitlabOptions?: CiConfigurationOptions;
}

/**
 * A git repository hosted on GitLab.
 *
 * Manages GitLab CI configuration at the repository level.
 */
export class GitLabRepository extends GitRepository {
  /**
   * The GitLab CI configuration.
   *
   * This is `undefined` until a project is added to the repository.
   */
  public readonly gitlab: GitlabConfiguration | undefined;

  private readonly _gitlabOptions?: CiConfigurationOptions;

  constructor(options: GitLabRepositoryOptions) {
    super(options);
    this._gitlabOptions = options.gitlabOptions;

    // GitlabConfiguration requires a Project scope (via Component).
    // Deferred until a root project is added. See _initGitLab().
    this.gitlab = undefined;
  }

  /**
   * Initialize GitLab CI on a project scope.
   *
   * Called internally when a root project is added to the repository.
   *
   * @internal
   */
  public _initGitLab(project: Project): GitlabConfiguration | undefined {
    if ((this as any)._gitlabInitialized) {
      return this.gitlab;
    }
    (this as any)._gitlabInitialized = true;

    const gitlab = new GitlabConfiguration(project, this._gitlabOptions);
    Object.defineProperty(this, "gitlab", { value: gitlab });
    return gitlab;
  }
}
