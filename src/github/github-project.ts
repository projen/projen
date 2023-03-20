import { AutoApprove, AutoApproveOptions } from "./auto-approve";
import { AutoMergeOptions } from "./auto-merge";
import { GitHub, GitHubOptions } from "./github";
import { GithubCredentials } from "./github-credentials";
import { Stale, StaleOptions } from "./stale";
import { Clobber } from "../clobber";
import { Gitpod } from "../gitpod";
import { Project, ProjectOptions } from "../project";
import { SampleReadme, SampleReadmeProps } from "../readme";
import { DevContainer, VsCode } from "../vscode";

/**
 * Options for `GitHubProject`.
 */
export interface GitHubProjectOptions extends ProjectOptions {
  /**
   * Add a Gitpod development environment
   *
   * @default false
   */
  readonly gitpod?: boolean;

  /**
   * Enable VSCode integration.
   *
   * Enabled by default for root projects. Disabled for non-root projects.
   *
   * @default true
   */
  readonly vscode?: boolean;

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
   * Add a VSCode development environment (used for GitHub Codespaces)
   *
   * @default false
   */
  readonly devContainer?: boolean;

  /**
   * Add a `clobber` task which resets the repo to origin.
   * @default - true, but false for subprojects
   */
  readonly clobber?: boolean;

  /**
   * The README setup.
   *
   * @default - { filename: 'README.md', contents: '# replace this' }
   * @example "{ filename: 'readme.md', contents: '# title' }"
   */
  readonly readme?: SampleReadmeProps;

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

  /**
   * Choose a method of providing GitHub API access for projen workflows.
   *
   * @default - use a personal access token named PROJEN_GITHUB_TOKEN
   */
  readonly projenCredentials?: GithubCredentials;
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
   * Access all VSCode components.
   *
   * This will be `undefined` for subprojects.
   */
  public readonly vscode: VsCode | undefined;

  /**
   * Access for Gitpod
   *
   * This will be `undefined` if gitpod boolean is false
   */
  public readonly gitpod: Gitpod | undefined;

  /**
   * Access for .devcontainer.json (used for GitHub Codespaces)
   *
   * This will be `undefined` if devContainer boolean is false
   */
  public readonly devContainer: DevContainer | undefined;

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
          projenCredentials: options.projenCredentials,
          ...options.githubOptions,
        })
      : undefined;

    const vscode = options.vscode ?? (this.parent ? false : true);
    this.vscode = vscode ? new VsCode(this) : undefined;

    this.gitpod = options.gitpod ? new Gitpod(this) : undefined;
    this.devContainer = options.devContainer
      ? new DevContainer(this)
      : undefined;

    if (options.clobber ?? !this.parent) {
      new Clobber(this);
    }

    new SampleReadme(this, options.readme);

    if (options.autoApproveOptions && this.github) {
      this.autoApprove = new AutoApprove(
        this.github,
        options.autoApproveOptions
      );
    }

    const stale = options.stale ?? false;
    if (stale && this.github) {
      new Stale(this.github, options.staleOptions);
    }
  }

  /**
   * Marks the provided file(s) as being generated. This is achieved using the
   * github-linguist attributes. Generated files do not count against the
   * repository statistics and language breakdown.
   *
   * @param glob the glob pattern to match (could be a file path).
   *
   * @see https://github.com/github/linguist/blob/master/docs/overrides.md
   */
  public annotateGenerated(glob: string): void {
    this.gitattributes.addAttributes(glob, "linguist-generated");
  }
}
