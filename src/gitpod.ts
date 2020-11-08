import { Component } from './component';
import { NodeProject } from './node-project';
import { YamlFile } from './yaml';

/**
 * https://www.gitpod.io/docs/configuration/
 * https://www.gitpod.io/docs/config-start-tasks/
 */

/**
 * If the standard Docker image provided by Gitpod does not include the tools
 * you need for your project, you can provide a custom Docker image or Dockerfile.
 */
export interface GitpodDocker {
  readonly image?: string;
  readonly file?: string;
}

/**
  * Configure how the terminal should be opened relative to the previous task.
  */
export enum GitpodOpenMode {
  TAB_AFTER = 'tab-after',
  TAB_BEFORE = 'tab-before',
  SPLIT_RIGHT = 'split-right',
  SPLIT_LEFT = 'split-left',
  SPLIT_TOP = 'split-top',
  SPLIT_BOTTOM = 'split-bottom'
}

/**
 * Configure where in the IDE the terminal should be opened.
 */
export enum GitpodOpenIn {
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
  MAIN = 'main'
}

/**
 * Configure options for a task to be run when opening a Gitpod
 * workspace (e.g. running tests, or starting a dev server).
 */
export interface GitpodTask {
  readonly name?: string;
  readonly openMode?: GitpodOpenMode;
  readonly openIn?: GitpodOpenIn;
  readonly before?: string;
  readonly init?: string;
  readonly prebuild?: string;
  readonly command: string;
}

export interface GitpodOptions {
  /**
   * Optional Docker Configuration
   * Defaults to https://github.com/gitpod-io/workspace-images/blob/master/full/Dockerfile
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
  * Relative path of Gitpod file to generate
  */
const GITPOD_FILE = '.gitpod.yml';

export class Gitpod extends Component {
  private tasks = new Array<GitpodTask>();
  private docker?: GitpodDocker;

  constructor(project: NodeProject, options: GitpodOptions) {
    super(project);

    this.addTask(options.tasks);
    this.docker = options.docker ?? undefined;

    new YamlFile(project, GITPOD_FILE, {
      obj: {
        tasks: this.tasks,
        docker: this.docker,
      },
    });
  }

  /**
   * Adds another task to the Gitpod configuration
   */
  public addTask(task: GitpodTask[]) {
    this.tasks.push(...task);
  }

  /**
   * Specify a custom Docker setup
   */
  public customDocker(docker: GitpodDocker) {
    this.docker = docker;
  }
}
