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
   * @default
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
   * Splits and adds the terminal to the tops
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
   * @default
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
   * XXX: NodeProject
   * @default "yarn install"
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
  readonly tasks: GitpodTask[];
}

/**
 * The Gitpod component itself
 */
export class Gitpod extends Component {
  private tasks = new Array<GitpodTask>();
  private docker: GitpodDocker | undefined;

  /**
   *
   * @param project The project
   * @param options The component configuration options for this project
   */
  constructor(project: Project, options?: GitpodOptions) {
    super(project);

    // Docker
    if (options?.docker?.file && options.docker.image) {
      throw new Error('Can not specific both `file` and `image` at the same time');
    }
    if (options?.docker) {
      this.docker = options?.docker;
    }

    let obj: any;
    if (this.docker?.image) {
      obj = {
        image: this.docker.image,
      };
    } else if (this.docker?.file) {
      obj = {
        image: {
          file: this.docker.file,
        },
      };
    }

    // Tasks
    if (options?.tasks) {
      this.addTasks(...options.tasks);
    } else {
      // A future PR will move this from NodeProject to Project
      this.addTasks({
        command: 'echo Initialized',
      });
    }
    obj = {
      ...obj,
      tasks: this.tasks,
    };

    // This is what get synthesized
    new YamlFile(project, GITPOD_FILE, {
      obj: obj,
    });
  }

  /**
   * Adds another task to the Gitpod configuration
   * XXX: no way to clear out the default: yet
   * @param task The additional tasks
   */
  public addTasks(...task: GitpodTask[]) {
    this.tasks.push(...task);
  }

  /**
   * Specify a custom Docker setup
   *
   * @param docker The docker configuration
   */
  public customDocker(docker: GitpodDocker) {
    this.docker = docker;
  }
}
