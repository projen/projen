import { Component } from "./component";
import {
  IDevEnvironment,
  DevEnvironmentOptions,
  DevEnvironmentDockerImage,
} from "./dev-env";
import { Project } from "./project";
import { Task } from "./task";
import { YamlFile } from "./yaml";

/**
 * Relative path of Gitpod file to generate
 */
const GITPOD_FILE = ".gitpod.yml";

/**
 * https://www.gitpod.io/docs/configuration/
 * https://www.gitpod.io/docs/config-start-tasks/
 * https://www.gitpod.io/docs/prebuilds/#configure-the-github-app
 * https://www.gitpod.io/docs/vscode-extensions/
 */

/**
 * Configure how the terminal should be opened relative to the previous task.
 */
export enum GitpodOpenMode {
  /**
   * Opens in the same tab group right after the previous tab
   */
  TAB_AFTER = "tab-after",
  /**
   * Opens in the same tab group left before the previous tab
   */
  TAB_BEFORE = "tab-before",
  /**
   * Splits and adds the terminal to the right
   */
  SPLIT_RIGHT = "split-right",
  /**
   * Splits and adds the terminal to the left
   */
  SPLIT_LEFT = "split-left",
  /**
   * Splits and adds the terminal to the top
   */
  SPLIT_TOP = "split-top",
  /**
   * Splits and adds the terminal to the bottom
   */
  SPLIT_BOTTOM = "split-bottom",
}

/**
 * Configure where in the IDE the terminal should be opened.
 */
export enum GitpodOpenIn {
  /**
   * the bottom panel (default)
   */
  BOTTOM = "bottom",
  /**
   * the left panel
   */
  LEFT = "left",
  /**
   * the right panel
   */
  RIGHT = "right",
  /**
   * the main editor area
   */
  MAIN = "main",
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
   * Required. The shell command to run
   */
  readonly command: string;

  /**
   * A name for this task.
   * @default - task names are omitted when blank
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
 * What to do when a service on a port is detected.
 */
export enum GitpodOnOpen {
  /**
   * Open a new browser tab
   */
  OPEN_BROWSER = "open-browser",

  /**
   * Open a preview on the right side of the IDE
   */
  OPEN_PREVIEW = "open-preview",

  /**
   * Show a notification asking the user what to do (default)
   */
  NOTIFY = "notify",

  /**
   * Do nothing.
   */
  IGNORE = "ignore",
}

/**
 * Whether the port visibility should be private or public
 */
export enum GitpodPortVisibility {
  /**
   * Allows everyone with the port URL to access the port (default)
   */
  PUBLIC = "public",

  /**
   * Only allows users with workspace access to access the port
   */
  PRIVATE = "private",
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
 * Configure the Gitpod App for prebuilds.
 * Currently only GitHub is supported.
 * @see https://www.gitpod.io/docs/prebuilds/
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
 * Constructor options for the Gitpod component.
 *
 * By default, Gitpod uses the 'gitpod/workspace-full' docker image.
 * @see https://github.com/gitpod-io/workspace-images/blob/master/full/Dockerfile
 *
 * By default, all tasks will be run in parallel. To run the tasks in sequence,
 * create a new task and specify the other tasks as subtasks.
 */
export interface GitpodOptions extends DevEnvironmentOptions {
  /**
   * Optional Gitpod's Github App integration for prebuilds
   * If this is not set and Gitpod's Github App is installed, then Gitpod will apply
   * these defaults: https://www.gitpod.io/docs/prebuilds/#configure-the-github-app
   * @default undefined
   */
  readonly prebuilds?: GitpodPrebuilds;
}

/**
 * The Gitpod component which emits .gitpod.yml
 */
export class Gitpod extends Component implements IDevEnvironment {
  private dockerImage: DevEnvironmentDockerImage | undefined;
  private prebuilds: GitpodPrebuilds | undefined;
  private readonly tasks = new Array<GitpodTask>();
  private readonly ports = new Array<GitpodPort>();
  private readonly vscodeExtensions = new Array<string>();

  /**
   * Direct access to the gitpod configuration (escape hatch)
   */
  public readonly config: any;

  constructor(project: Project, options: GitpodOptions = {}) {
    super(project);

    this.dockerImage = options?.dockerImage;

    if (options?.tasks) {
      for (const task of options.tasks) {
        this.addTasks(task);
      }
    }

    if (options?.prebuilds) {
      this.addPrebuilds(options.prebuilds);
    }

    if (options?.ports) {
      this.addPorts(...options.ports);
    }

    if (options?.vscodeExtensions) {
      this.addVscodeExtensions(...options.vscodeExtensions);
    }

    this.config = {
      image: () => this.renderDockerImage(),
      tasks: this.tasks,
      github: () => this.renderPrebuilds(),
      ports: this.ports,
      vscode: {
        extensions: this.vscodeExtensions,
      },
    };

    new YamlFile(this.project, GITPOD_FILE, {
      obj: this.config,
      omitEmpty: true,
      // GitPod needs to read the file from the repository in order to work.
      committed: true,
    });
  }

  /**
   * Add a custom Docker image or Dockerfile for the container.
   *
   * @param image The Docker image
   */
  public addDockerImage(image: DevEnvironmentDockerImage) {
    if (this.dockerImage) {
      throw new Error("dockerImage cannot be redefined.");
    }
    this.dockerImage = image;
  }

  /**
   * Add tasks to run when gitpod starts.
   *
   * By default, all tasks will be run in parallel. To run tasks in sequence,
   * create a new `Task` and specify the other tasks as subtasks.
   *
   * @param tasks The new tasks
   */
  public addTasks(...tasks: Task[]) {
    this.tasks.push(
      ...tasks.map((task) => ({
        name: task.name,
        command: `npx projen ${task.name}`,
      })),
    );
  }

  /**
   * Add a prebuilds configuration for the Gitpod App
   * @param config The configuration
   */
  public addPrebuilds(config: GitpodPrebuilds) {
    this.prebuilds = config;
  }

  /**
   * Add a task with more granular options.
   *
   * By default, all tasks will be run in parallel. To run tasks in sequence,
   * create a new `Task` and set the other tasks as subtasks.
   *
   * @param options The task parameters
   */
  public addCustomTask(options: GitpodTask) {
    this.tasks.push({
      name: options.name,
      command: options.command,
      openMode: options.openMode,
      openIn: options.openIn,
      before: options.before,
      init: options.init,
      prebuild: options.prebuild,
    });
  }

  /**
   * Add ports that should be exposed (forwarded) from the container.
   *
   * @param ports The new ports
   */
  public addPorts(...ports: string[]) {
    this.ports.push(...ports.map((port) => ({ port: port })));
  }

  /**
   * Add a list of VSCode extensions that should be automatically installed
   * in the container.
   *
   * These must be in the format defined in the Open VSX registry.
   * @example 'scala-lang.scala@0.3.9:O5XmjwY5Gz+0oDZAmqneJw=='
   * @see https://www.gitpod.io/docs/vscode-extensions/
   *
   * @param extensions The extension IDs
   */
  public addVscodeExtensions(...extensions: GitpodCodeExtensionId[]) {
    this.vscodeExtensions.push(...extensions);
  }

  private renderDockerImage() {
    if (this.dockerImage?.image) {
      return this.dockerImage.image;
    } else if (this.dockerImage?.dockerFile) {
      return {
        file: this.dockerImage.dockerFile,
      };
    } else {
      return undefined;
    }
  }

  private renderPrebuilds() {
    if (this.prebuilds) {
      return {
        prebuilds: this.prebuilds,
      };
    } else {
      return undefined;
    }
  }
}

/**
 * VS Code extensions as defined in the Open VSX registry
 * Example: `scala-lang.scala@0.3.9:O5XmjwY5Gz+0oDZAmqneJw==`
 */
type GitpodCodeExtensionId = string;
