import { Component } from './component';
import { Project } from './project';
import { YamlFile } from './yaml';

/**
  * Relative path of Gitpod file to generate
  */
const GITPOD_FILE = '.gitpod.yml';

/**
 * https://www.gitpod.io/docs/configuration/
 * https://www.gitpod.io/docs/config-start-tasks/
 * https://www.gitpod.io/docs/prebuilds/#configure-the-github-app
 * https://www.gitpod.io/docs/vscode-extensions/
 */

/**
 * If the standard Docker image provided by Gitpod does not include the tools
 * you need for your project, you can provide a custom Docker image OR Dockerfile.
 * https://hub.docker.com/r/gitpod/workspace-full/ is the default Gitpod image
 */
export interface GitpodDocker {

  /**
   *
   * A publicly available image to use
   *
   * @default - uses the standard gitpod image (see [LINK] above)
   */
  readonly image?: string;

  /**
   *
   * a Dockerfile to install deps
   *
   * @default
   *
   * @example
   * {
   *   file: '.gitpod.Docker',
   * }
   */
  readonly file?: string;
}

/**
 * Configure the Gitpod App for prebuilds
 * Currently only GitHub is supported.
 * See: https://www.gitpod.io/docs/prebuilds/
 */
export interface GitpodPrebuilds {
  /**
   * Enable for the master/default branch
   * @default true
   */
  readonly master?: boolean;
  /**
   * Enable for all branches in this repo
   * @default false
   */
  readonly branches?: boolean;
  /**
   * Enable for pull requests coming from this repo
   * @default true
   */
  readonly pullRequests?: boolean;
  /**
   * Enable for pull requests coming from forks
   * @default false
   */
  readonly pullRequestsFromForks?: boolean;
  /**
   * Add a check to pull requests
   * @default true
   */
  readonly addCheck?: boolean;
  /**
   * Add a "Review in Gitpod" button as a comment to pull requests
   * @default false
   */
  readonly addComment?: boolean;
  /**
   * Add a "Review in Gitpod" button to the pull request's description
   * @default false
   */
  readonly addBadge?: boolean;
  /**
   * Add a label once the prebuild is ready to pull requests
   * @default false
   */
  readonly addLabel?: boolean;
}

/**
  * Configure how the terminal should be opened relative to the previous task.
  */
export enum GitpodOpenMode {
  /**
   * Opens in the same tab group right after the previous tab
   */
  TAB_AFTER = 'tab-after',
  /**
   * Opens in the same tab group left before the previous tab
   */
  TAB_BEFORE = 'tab-before',
  /**
   * Splits and adds the terminal to the right
   */
  SPLIT_RIGHT = 'split-right',
  /**
   * Splits and adds the terminal to the left
   */
  SPLIT_LEFT = 'split-left',
  /**
   * Splits and adds the terminal to the top
   */
  SPLIT_TOP = 'split-top',
  /**
   * Splits and adds the terminal to the bottom
   */
  SPLIT_BOTTOM = 'split-bottom'
}

/**
 * Configure where in the IDE the terminal should be opened.
 */
export enum GitpodOpenIn {
  /**
   * the bottom panel (default)
   */
  BOTTOM = 'bottom',
  /**
   * the left panel
   */
  LEFT = 'left',
  /**
   * the right panel
   */
  RIGHT = 'right',
  /**
   * the main editor area
   */
  MAIN = 'main'
}

/**
 * Configure options for a task to be run when opening a Gitpod
 * workspace (e.g. running tests, or starting a dev server).
 *
 * Start Mode         | Execution
 * Fresh Workspace    | before && init && command
 * Restart Workspace  | before && command
 * Snapshot           | before && command
 * Prebuild           | before && init && prebuild
*/
export interface GitpodTask {

  /**
   * Required. What to run
   */
  readonly command: string;

  /**
   * A name for this
   * @default - task names are omitted when blank like GH actions
   */
  readonly name?: string;

  /**
   * You can configure how the terminal should be opened relative to the previous task.
   * @default GitpodOpenMode.TAB_AFTER
   */
  readonly openMode?: GitpodOpenMode;

  /**
   * You can configure where in the IDE the terminal should be opened
   * @default GitpodOpenIn.BOTTOM
   */
  readonly openIn?: GitpodOpenIn;

  /**
   * In case you need to run something even before init, that is a requirement for both init and command,
   * you can use the before property.
   * @default
   */
  readonly before?: string;

  /**
   *
   * The init property can be used to specify shell commands that should only be executed after a workspace
   * was freshly cloned and needs to be initialized somehow. Such tasks are usually builds or downloading
   * dependencies. Anything you only want to do once but not when you restart a workspace or start a snapshot.
   * @default
   */
  readonly init?: string;

  /**
   * The optional prebuild command will be executed during prebuilds. It is meant to run additional long running
   * processes that could be useful, e.g. running test suites.
   * @default
   */
  readonly prebuild?: string;
}

/**
 * VS Code extensions as defined in the Open VSX registry
 * Example: `scala-lang.scala@0.3.9:O5XmjwY5Gz+0oDZAmqneJw==`
 */
type GitpodCodeExtensionId = string;

/**
 * What can we configure for the GitPod component
 */
export interface GitpodOptions {
  /**
   * Optional Docker Configuration
   * Gitpod defaults to https://github.com/gitpod-io/workspace-images/blob/master/full/Dockerfile
   * if this is unset, so undefined here means `gitpod/workspace-full`
   * @default undefined
   */
  readonly docker?: GitpodDocker;

  /**
   * This must be defaulted per project
   * @default []
   */
  readonly tasks?: GitpodTask[];

  /**
   * Optional Gitpod's Github App integration for prebuilds
   * If this is not set and Gitpod's Github App is installed, then Gitpod will apply
   * these defaults: https://www.gitpod.io/docs/prebuilds/#configure-the-github-app
   * @default undefined
   */
  readonly prebuilds?: GitpodPrebuilds;

  /**
   * Optional Include VS Code Extensions to be installed with the project
   * See: https://www.gitpod.io/docs/vscode-extensions/
   */
  readonly extensions?: GitpodCodeExtensionId[];
}

/**
 * The Gitpod component which emits .gitpod.yml
 */
export class Gitpod extends Component {
  private readonly tasks = new Array<GitpodTask>();
  private docker: GitpodDocker | undefined;
  private prebuilds: GitpodPrebuilds | undefined;
  private readonly extensions = new Array<GitpodCodeExtensionId>();

  constructor(project: Project, options?: GitpodOptions) {
    super(project);

    if (options?.docker) {
      this.addCustomDocker(options?.docker);
    }
    if (options?.tasks) {
      this.addTasks(...options?.tasks);
    }
    if (options?.prebuilds) {
      this.addPrebuilds(options?.prebuilds);
    }
    if (options?.extensions) {
      this.addExtensions(...options?.extensions);
    }

    new YamlFile(this.project, GITPOD_FILE, {
      obj: {
        image: () => this.renderDockerImage(),
        tasks: () => this.renderTasks(),
        github: () => this.renderPrebuilds(),
        vscode: () => this.renderExtensions(),
      },
    });
  }

  /**
   * Specify a customer docker setup
   * @param docker
   */
  public addCustomDocker(docker: GitpodDocker) {
    if (docker?.file && docker?.image) {
      throw new Error('Can not specific both `file` and `image` at the same time');
    }

    this.docker = docker;
  }

  /**
   * Adds another task to the Gitpod configuration
   * @param tasks The additional tasks
   */
  public addTasks(...tasks: GitpodTask[]) {
    this.tasks.push(...tasks);
  }

  /**
   * Add a prebuilds configuration for the Gitpod App
   * @param config The configuration
   */
  public addPrebuilds(config: GitpodPrebuilds) {
    this.prebuilds = config;
  }

  /**
   * Adds another VS Code extension to the Gitpod configuration
   * @param extensions The additional tasks
   */
  public addExtensions(...extensions: GitpodCodeExtensionId[]) {
    this.extensions.push(...extensions);
  }

  private renderTasks(): GitpodTask[] | undefined {
    if (this.tasks && this.tasks.length > 0) {
      return this.tasks;
    } else {
      return undefined;
    }
  }

  private renderDockerImage() {
    if (this.docker?.image) {
      return this.docker.image;
    } else if (this.docker?.file) {
      return {
        file: this.docker.file,
      };
    } else {
      return undefined;
    }
  }

  private renderPrebuilds(): GitpodPrebuildsRender | undefined {
    if (this.prebuilds) {
      return {
        prebuilds: this.prebuilds,
      };
    } else {
      return undefined;
    }
  }

  private renderExtensions(): GitpodCodeExtensionsRender | undefined {
    if (this.extensions && this.extensions.length > 0) {
      return {
        extensions: this.extensions,
      };
    } else {
      return undefined;
    }
  }
}

type GitpodCodeExtensionsRender = {
  extensions: GitpodCodeExtensionId[];
};
type GitpodPrebuildsRender = {
  prebuilds: GitpodPrebuilds;
};