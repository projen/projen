import { AutoApproveOptions, GitHub, GitHubOptions } from ".";
import { Clobber } from "../clobber";
import { Component } from "../component";
import { Gitpod } from "../gitpod";
import { Project } from "../project";
import { SampleReadme, SampleReadmeProps } from "../readme";
import { DevContainer, VsCode } from "../vscode";

/**
 * Options for `SharedComponents`
 */
export interface SharedComponentsOptions {
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
   * Add a VSCode development environment (used for GitHub Codespaces)
   *
   * @default false
   */
  readonly devContainer?: boolean;

  /**
   * Add a `clobber` task which resets the repo to origin.
   * @default true
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
   * The name of a secret which includes a GitHub Personal Access Token to be
   * used by projen workflows. This token needs to have the `repo`, `workflows`
   * and `packages` scope.
   *
   * @default "PROJEN_GITHUB_TOKEN"
   */
  readonly projenTokenSecret?: string;

  /**
   * Enable and configure the 'auto approve' workflow.
   * @default - auto approve is disabled
   * @deprecated use githubOptions.autoApproveOptions instead
   */
  readonly autoApproveOptions?: AutoApproveOptions;
}

/**
 * A collection of unrelated, language-agnostic components that projen includes
 * in all project types besides the base `Project`.
 *
 * This exists mostly to reduce code repetition and to avoid using an extra
 * layer of inheritance.
 */
export class SharedComponents extends Component {
  /**
   * Access for GitHub component.
   *
   * This will be `undefined` for subprojects, or if github boolean is false.
   */
  public readonly github: GitHub | undefined;

  /**
   * Access for VSCode component.
   *
   * This will be `undefined` for subprojects or if gitpod boolean is false.
   */
  public readonly vscode: VsCode | undefined;

  /**
   * Access for Gitpod component.
   *
   * This will be `undefined` if gitpod boolean is false.
   */
  public readonly gitpod: Gitpod | undefined;

  /**
   * Access for .devcontainer.json (used for GitHub Codespaces)
   *
   * This will be `undefined` if devContainer boolean is false.
   */
  public readonly devContainer: DevContainer | undefined;

  constructor(project: Project, options: SharedComponentsOptions) {
    super(project);

    // we only allow these global services to be used in root projects
    const github = options.github ?? (project.parent ? false : true);
    if (github) {
      new GitHub(project, {
        autoApproveOptions: options.autoApproveOptions,
        ...options.githubOptions,
      });
    }

    const vscode = options.vscode ?? (project.parent ? false : true);
    this.vscode = vscode ? new VsCode(project) : undefined;

    this.gitpod = options.gitpod ? new Gitpod(project) : undefined;

    this.devContainer = options.devContainer
      ? new DevContainer(project)
      : undefined;

    if (options.clobber ?? true) {
      new Clobber(project);
    }

    new SampleReadme(project, options.readme);
  }
}
