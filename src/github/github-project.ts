import type { AutoApproveOptions } from "./auto-approve";
import { AutoApprove } from "./auto-approve";
import type { AutoMergeOptions } from "./auto-merge";
import type { GitHub, GitHubOptions } from "./github";
import type { GithubCredentials } from "./github-credentials";
import { GitHubRepository } from "./github-repository";
import type { MergifyOptions } from "./mergify";
import type { StaleOptions } from "./stale";
import { Stale } from "./stale";
import { Clobber } from "../clobber";
import { Gitpod } from "../gitpod";
import type { ProjectOptions } from "../project";
import { Project, ProjectType, _setPreCreatedRepository } from "../project";
import type { SampleReadmeProps } from "../readme";
import { SampleReadme } from "../readme";
import { normalizePersistedPath } from "../util";
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
   * Which type of project this is (library/app).
   * @default ProjectType.UNKNOWN
   * @deprecated no longer supported at the base project level
   */
  readonly projectType?: ProjectType;

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

  /**
   * The name of a secret which includes a GitHub Personal Access Token to be
   * used by projen workflows. This token needs to have the `repo`, `workflows`
   * and `packages` scope.
   *
   * @default "PROJEN_GITHUB_TOKEN"
   * @deprecated use `projenCredentials`
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

  /*
   * Which project type this is.
   *
   * @deprecated
   */
  public readonly projectType: ProjectType;

  /**
   * Auto approve set up for this project.
   */
  public readonly autoApprove?: AutoApprove;

  constructor(options: GitHubProjectOptions) {
    prepareGitHubRepository(options);
    super(options);

    this.projectType = options.projectType ?? ProjectType.UNKNOWN;

    const { github, autoApprove } = initGitHubComponents(this, options);
    this.github = github;
    this.autoApprove = autoApprove;

    const vscode = options.vscode ?? !this.parent;
    this.vscode = vscode ? new VsCode(this) : undefined;

    this.gitpod = options.gitpod ? new Gitpod(this) : undefined;
    this.devContainer = options.devContainer
      ? new DevContainer(this)
      : undefined;

    if (options.clobber ?? !this.parent) {
      new Clobber(this);
    }

    new SampleReadme(this, options.readme);
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
    this.gitattributes.addAttributes(
      normalizePersistedPath(glob),
      "linguist-generated",
    );
  }
}

/**
 * For root projects, create a GitHubRepository with the full GitHub options
 * before the Project constructor runs.
 */
function prepareGitHubRepository(options: GitHubProjectOptions): void {
  if (options.parent || options.repoRoot) {
    return;
  }

  const repo = new GitHubRepository({
    name: options.name,
    outdir: options.outdir,
    gitOptions: options.gitOptions,
    gitIgnoreOptions: options.gitIgnoreOptions,
    github: options.github,
    githubOptions: options.githubOptions,
    projenCredentials: options.projenCredentials,
    projenTokenSecret: options.projenTokenSecret,
    mergify: options.mergify,
    mergifyOptions: options.mergifyOptions,
    autoApproveOptions: options.autoApproveOptions,
    stale: options.stale,
    staleOptions: options.staleOptions,
  });
  _setPreCreatedRepository(repo);
}

/**
 * Initialize GitHub component and related features.
 * For root projects under a GitHubRepository, delegates to the repository.
 * For subprojects, creates components directly.
 */
function initGitHubComponents(
  project: GitHubProject,
  options: GitHubProjectOptions,
): { github: GitHub | undefined; autoApprove: AutoApprove | undefined } {
  const repo = project.node.scopes.find(
    (s): s is GitHubRepository => s instanceof GitHubRepository,
  );

  if (repo && !project.parent) {
    // Root project — delegate to repository
    const github = repo._initGitHub(project);
    return { github, autoApprove: repo.autoApprove };
  }

  // Subproject or no GitHubRepository — original behavior
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { GitHub: GitHubClass } = require("./github");
  const enableGithub = options.github ?? !project.parent;
  const github = enableGithub
    ? new GitHubClass(project, {
        projenTokenSecret: options.projenTokenSecret,
        projenCredentials: options.projenCredentials,
        mergify: options.mergify,
        mergifyOptions: options.mergifyOptions,
        ...options.githubOptions,
      })
    : undefined;

  let autoApprove: AutoApprove | undefined;
  if (options.autoApproveOptions && github) {
    autoApprove = new AutoApprove(github, options.autoApproveOptions);
  }

  const stale = options.stale ?? false;
  if (stale && github) {
    new Stale(github, options.staleOptions);
  }

  return { github, autoApprove };
}
