import { Component } from './component';
import { JsonFile } from './json';
import { Project } from './project';
import { Task } from './tasks';

/**
 * Base options for configuring container-based IDE tools.
 */
export interface WorkspaceConfigOptions {
  /**
   * Options to configure the underlying docker container, such as the image
   * to use.
   */
  readonly dockerImage?: WorkspaceDockerImage;

  /**
   * An array of tasks that should be run when the container starts.
   */
  readonly tasks?: Task[];

  /**
   * An array of ports that should be exposed from the container.
   */
  readonly ports?: string[];

  /**
   * An array of extension IDs that specify the extensions that should be
   * installed inside the container when it is created.
   */
  readonly vscodeExtensions?: string[];
}

/**
 * Options for specifying the Docker image of a container-based IDE.
 */
export interface WorkspaceDockerImage {
  /**
   * A publicly available image to use
   *
   * @default - uses the default workspace image
   */
  readonly image?: string;

  /**
   * The relative path of a Dockerfile that defines the container contents.
   *
   * @default - undefined
   *
   * @example '.gitpod.Docker'
   */
  readonly file?: string;
}

/**
 * Abstract interface for container-based IDE tools, such as Gitpod and
 * GitHub Codespaces.
 */
export abstract class WorkspaceConfig extends Component {
  constructor(project: Project, _options: WorkspaceConfigOptions) {
    super(project);
  }

  public abstract set dockerImage(options: WorkspaceDockerImage);
  public abstract get dockerImage();

  /**
   * Adds tasks to run when the workspace starts.
   *
   * @param tasks The new tasks
   */
  public abstract addTasks(...tasks: Task[]): void;

  /**
   * Adds ports that should be exposed (forwarded) from the container.
   *
   * @param ports The new ports
   */
  public abstract addPorts(...ports: string[]): void;

  /**
   * Adds a list of VSCode extensions that should be automatically installed
   * in the container.
   *
   * @param extensions The extension IDs
   */
  public abstract addVscodeExtensions(...extensions: string[]): void;
}

/**
  * Relative path of Gitpod file to generate
  */
const DEVCONTAINER_FILE = '.devcontainer.json';

/**
 * Configuration options for the DevContainer component.
 *
 * The default docker image used for GitHub codespaces is defined here:
 * @see https://github.com/microsoft/vscode-dev-containers/tree/master/containers/codespaces-linux
 */
export interface DevContainerOptions extends WorkspaceConfigOptions {}

/**
 * Creates a configuration file for running VSCode in a container; used by GitHub
 * codespaces.
 */
export class DevContainer extends WorkspaceConfig {
  private _dockerImage: WorkspaceDockerImage | undefined;
  private readonly postCreateTasks: Task[];
  private readonly ports: string[];
  private readonly vscodeExtensions: string[];

  /**
   * Direct access to the devcontainer configuration (escape hatch)
   */
  public readonly config: any;

  constructor(project: Project, options: DevContainerOptions = {}) {
    super(project, options);

    this.postCreateTasks = new Array<Task>();
    this.ports = new Array<string>();
    this.vscodeExtensions = new Array<string>();

    if (options?.dockerImage) {
      this.dockerImage = options.dockerImage;
    }
    if (options?.tasks) {
      for (const task of options.tasks) {
        this.addTasks(task);
      }
    }
    if (options?.ports) {
      this.addPorts(...options.ports);
    }
    if (options?.vscodeExtensions) {
      this.addVscodeExtensions(...options.vscodeExtensions);
    }

    this.config = {
      image: () => this._dockerImage?.image,
      build: {
        dockerfile: () => this._dockerImage?.file,
      },
      postCreateCommand: () => this.renderTasks(),
      forwardPorts: this.ports,
      extensions: this.vscodeExtensions,
    };

    new JsonFile(this.project, DEVCONTAINER_FILE, { obj: this.config, omitEmpty: true });
  }

  public set dockerImage(docker: WorkspaceDockerImage) {
    if (docker?.file && docker?.image) {
      throw new Error('Can not specific both `file` and `image` at the same time');
    }
    this._dockerImage = docker;
  }

  public get dockerImage() {
    if (!this._dockerImage) {
      throw new Error('dockerImage has not been configured.');
    }
    return this._dockerImage;
  }

  /**
   * Adds tasks to run when the container starts. Tasks will be run in sequence.
   *
   * @param tasks The new tasks
   */
  public addTasks(...tasks: Task[]) {
    this.postCreateTasks.push(...tasks);
  }

  /**
   * Adds ports that should be exposed (forwarded) from the container.
   *
   * @param ports The new ports
   */
  public addPorts(...ports: string[]) {
    this.ports.push(...ports);
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

  private renderTasks() {
    if (this.postCreateTasks.length !== 0) {
      return this.postCreateTasks.map(c => `( ${c.toShellCommand()} )`).join(' && ');
    } else {
      return undefined;
    }
  }
}
