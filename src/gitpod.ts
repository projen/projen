import { WorkspaceConfig, WorkspaceConfigOptions, WorkspaceDockerImage } from './devcontainer';
import { Project } from './project';
import { Task } from './tasks';
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
 * Additional options for specifying tasks in a Gitpod workspace.
 *
 * Start Mode         | Execution
 * Fresh Workspace    | before && init && command
 * Restart Workspace  | before && command
 * Snapshot           | before && command
 * Prebuild           | before && init && prebuild
*/
export interface GitpodTaskOptions {
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
 * Specifies all options for a task to be run when opening a Gitpod
 * workspace (e.g. running tests, or starting a dev server).
 *
 * Start Mode         | Execution
 * Fresh Workspace    | before && init && command
 * Restart Workspace  | before && command
 * Snapshot           | before && command
 * Prebuild           | before && init && prebuild
*/
export interface GitpodTask extends GitpodTaskOptions {
  /**
   * Required. What to run
   */
  readonly command: string;

  /**
   * A name for this
   * @default - task names are omitted when blank like GH actions
   */
  readonly name?: string;
}

/**
 * What to do when a service on a port is detected.
 */
export enum GitpodOnOpen {
  /**
   * Open a new browser tab
   */
  OPEN_BROWSER = 'open-browser',

  /**
   * Open a preview on the right side of the IDE
   */
  OPEN_PREVIEW = 'open-preview',

  /**
   * Show a notification asking the user what to do (default)
   */
  NOTIFY = 'notify',

  /**
   * Do nothing.
   */
  IGNORE = 'ignore',
}

/**
 * Whether the port visibility should be private or public
 */
export enum GitpodPortVisibility {
  /**
   * Allows everyone with the port URL to access the port (default)
   */
  PUBLIC = 'public',

  /**
   * Only allows users with workspace access to access the port
   */
  PRIVATE = 'private'
}

/**
 * Options for an exposed port on Gitpod
 */
export interface GitpodPort {
  /**
   * A port that should be exposed (forwarded) from the container.
   *
   * @example "8080"
   */
  readonly port?: string;

  /**
   * What to do when a service on a port is detected.
   *
   * @default GitpodOnOpen.NOTIFY
   */
  readonly onOpen?: GitpodOnOpen;

  /**
   * Whether the port visibility should be private or public.
   *
   * @default GitpodPortVisibility.PUBLIC
   */
  readonly visibility?: GitpodPortVisibility;
}

/**
 * Configuration options for the Gitpod component.
 *
 * By default, Gitpod uses the 'gitpod/workspace-full' docker image.
 * @see https://github.com/gitpod-io/workspace-images/blob/master/full/Dockerfile
 *
 * By default, all tasks will be run in parallel. To run the tasks in sequence,
 * create a new task and specify the other tasks as subtasks.
 */
export interface GitpodOptions extends WorkspaceConfigOptions {}

/**
 * The Gitpod component which emits .gitpod.yml
 */
export class Gitpod extends WorkspaceConfig {
  private _dockerImage: WorkspaceDockerImage;
  private readonly tasks = new Array<GitpodTask>();
  private readonly ports = new Array<GitpodPort>();
  private readonly vscodeExtensions = new Array<string>();

  /**
   * Direct access to the gitpod configuration (escape hatch)
   */
  public readonly config: any;

  constructor(project: Project, options: GitpodOptions = {}) {
    super(project, options);

    this._dockerImage = options?.dockerImage ?? {};

    if (options?.tasks) {
      for (const task of options.tasks) {
        this.addTasks(task);
      }
    }

    this.config = {
      image: () => this.renderDockerImage(),
      tasks: this.tasks,
      ports: this.ports,
      vscode: {
        extensions: this.vscodeExtensions,
      },
    };

    new YamlFile(this.project, GITPOD_FILE, { obj: this.config, omitEmpty: true });
  }

  public set dockerImage(docker: WorkspaceDockerImage) {
    if (docker?.file && docker?.image) {
      throw new Error('Can not specific both `file` and `image` at the same time');
    }

    this._dockerImage = docker;
  }

  public get dockerImage() {
    return this._dockerImage;
  }

  /**
   * Adds tasks to run when gitpod starts.
   *
   * By default, all tasks will be run in parallel. To run tasks in sequence,
   * create a new `Task` and specify the other tasks as subtasks.
   *
   * @param tasks The new tasks
   */
  public addTasks(...tasks: Task[]) {
    this.tasks.push(...tasks.map(task => ({
      name: task.name,
      command: task.toShellCommand(),
    })));
  }

  /**
   * Adds a task, with additional options to specify when the task runs.
   *
   * By default, all tasks will be run in parallel. To run tasks in sequence,
   * create a new `Task` and specify the other tasks as subtasks.
   *
   * @param task The new task
   */
  public addTaskWithOptions(task: Task, options: GitpodTaskOptions = {}) {
    this.tasks.push({
      name: task.name,
      command: task.toShellCommand(),
      openMode: options.openMode,
      openIn: options.openIn,
      before: options.before,
      init: options.init,
      prebuild: options.prebuild,
    });
  }

  /**
   * Adds ports that should be exposed (forwarded) from the container.
   *
   * @param ports The new ports
   */
  public addPorts(...ports: string[]) {
    this.ports.push(...ports.map(port => ({ port: port })));
  }

  /**
   * Adds a list of VSCode extensions that should be automatically installed
   * in the container.
   *
   * @param extensions The extension IDs
   */
  public addVscodeExtensions(...extensions: string[]) {
    this.vscodeExtensions.push(...extensions);
  }

  private renderDockerImage() {
    if (this._dockerImage?.image) {
      return this._dockerImage.image;
    } else if (this._dockerImage?.file) {
      return {
        file: this._dockerImage.file,
      };
    } else {
      return undefined;
    }
  }
}
