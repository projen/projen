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
}

/**
 * The Gitpod component which emits .gitpod.yml
 */
export class Gitpod extends Component {
  private readonly tasks = new Array<GitpodTask>();
  private docker: GitpodDocker | undefined;

  constructor(project: Project, options?: GitpodOptions) {
    super(project);

    if (options?.docker) {
      this.addCustomDocker(options?.docker);
    }
    if (options?.tasks) {
      this.addTasks(...options?.tasks);
    }

    let obj: any;
    obj['image'] = 'foo';

    new YamlFile(this.project, GITPOD_FILE, {
      obj: {
        image: () => 
        tasks: () => this.renderTasks(),
      },
    });
  }

  /**
   *
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

  private renderTasks() : GitpodTask[] | undefined {
    if (this.tasks) {
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
}
