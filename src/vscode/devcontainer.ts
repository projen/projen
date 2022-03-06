import { Construct } from "constructs";
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
 * Constructor options for the DevContainer component.
 *
 * The default docker image used for GitHub Codespaces is defined here:
 * @see https://github.com/microsoft/vscode-dev-containers/tree/master/containers/codespaces-linux
 */
export interface DevContainerOptions extends DevEnvironmentOptions {}

/**
 * A development environment running VSCode in a container; used by GitHub
 * codespaces.
 */
export class DevContainer extends Component implements IDevEnvironment {
  private dockerImage: DevEnvironmentDockerImage | undefined;
  private readonly postCreateTasks: Task[];
  private readonly ports: string[];
  private readonly vscodeExtensions: string[];

  /**
   * Direct access to the devcontainer configuration (escape hatch)
   */
  public readonly config: any;

  constructor(scope: Construct, options: DevContainerOptions = {}) {
    super(scope, "DevContainer");

    this.postCreateTasks = new Array<Task>();
    this.ports = new Array<string>();
    this.vscodeExtensions = new Array<string>();

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

    this.config = {
      image: () => this.dockerImage?.image,
      build: {
        dockerfile: () => this.dockerImage?.dockerFile,
      },
      postCreateCommand: () => this.renderTasks(),
      forwardPorts: this.ports,
      extensions: this.vscodeExtensions,
    };

    new JsonFile(Project.of(this), DEVCONTAINER_FILE, {
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

  private renderTasks() {
    if (this.postCreateTasks.length !== 0) {
      return this.postCreateTasks
        .map((task) => `( npx projen ${task.name} )`)
        .join(" && ");
    } else {
      return undefined;
    }
  }
}
