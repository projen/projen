import { Component } from "../component";
import {
  DevEnvironmentDockerImage,
  DevEnvironmentOptions,
  IDevEnvironment,
} from "../dev-env";
import { JsonFile } from "../json";
import { Project } from "../project";
import { Task } from "../task";

/**
 * Relative path of devcontainer file to generate
 */
const DEVCONTAINER_FILE = ".devcontainer.json";

/**
 * devcontainer features options
 * @see https://containers.dev/implementors/features/#devcontainer-json-properties
 */
export interface DevContainerFeature {
  /**
   * feature name
   */
  readonly name: string;
  /**
   * feature version
   * @default latest
   */
  readonly version?: string;
}

/**
 * Constructor options for the DevContainer component.
 *
 * The default docker image used for GitHub Codespaces is defined here:
 * @see https://github.com/microsoft/vscode-dev-containers/tree/master/containers/codespaces-linux
 */
export interface DevContainerOptions extends DevEnvironmentOptions {
  /**
   * An array of VSCode features that specify the features that should be
   * installed inside the container when it is created.
   */
  readonly features?: DevContainerFeature[];
}

export interface IDevContainerEnvironment extends IDevEnvironment {
  /**
   * Adds a list of VSCode features that should be automatically installed
   * in the container.
   *
   * @param features featureName and version(optional default: latest)
   */
  addFeatures(...features: DevContainerFeature[]): void;
}

/**
 * A development environment running VSCode in a container; used by GitHub
 * codespaces.
 */
export class DevContainer
  extends Component
  implements IDevContainerEnvironment
{
  private dockerImage: DevEnvironmentDockerImage | undefined;
  private readonly postCreateTasks: Task[];
  private readonly ports: string[];
  private readonly vscodeExtensions: string[];
  private readonly features: DevContainerFeature[];

  /**
   * Direct access to the devcontainer configuration (escape hatch)
   */
  public readonly config: any;

  constructor(project: Project, options: DevContainerOptions = {}) {
    super(project);

    this.postCreateTasks = new Array<Task>();
    this.ports = new Array<string>();
    this.vscodeExtensions = new Array<string>();
    this.features = new Array<DevContainerFeature>();

    this.dockerImage = options?.dockerImage;

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
    if (options.features) {
      this.addFeatures(...options.features);
    }

    this.config = {
      image: () => this.dockerImage?.image,
      build: {
        dockerfile: () => this.dockerImage?.dockerFile,
      },
      postCreateCommand: () => this.renderTasks(),
      forwardPorts: this.ports,
      extensions: this.vscodeExtensions,
      features: () => this.renderFeatures(),
    };

    new JsonFile(this.project, DEVCONTAINER_FILE, {
      obj: this.config,
      omitEmpty: true,
    });
  }

  public addDockerImage(image: DevEnvironmentDockerImage) {
    if (this.dockerImage) {
      throw new Error("dockerImage cannot be redefined.");
    }
    this.dockerImage = image;
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

  /**
   * Adds a list of VSCode features that should be automatically installed
   * in the container.
   *
   * @param features featureName and version(optional default: latest)
   */
  public addFeatures(...features: DevContainerFeature[]): void {
    this.features.push(...features);
  }

  private renderTasks() {
    if (this.postCreateTasks.length !== 0) {
      return this.postCreateTasks
        .map((task) => `( npx projen ${task.name} )`)
        .join(" && ");
    } else {
      return undefined;
    }
  }

  private renderFeatures() {
    if (this.features.length === 0) {
      return undefined;
    }

    return this.features.reduce<{
      [key: string]: { version: string };
    }>((pv, feature) => {
      pv[feature.name] = {
        version: feature.version ?? "latest",
      };
      return pv;
    }, {});
  }
}
