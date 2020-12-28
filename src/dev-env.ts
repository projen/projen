import { Task } from './tasks';

/**
 * Base options for configuring a container-based development environemnt.
 */
export interface DevEnvironmentOptions {
  /**
   * A Docker image or Dockerfile for the container.
   */
  readonly dockerImage?: DevEnvironmentDockerImage;

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
 * Options for specifying the Docker image of the container.
 */
export class DevEnvironmentDockerImage {
  /**
   * A publicly available Docker image.
   * @example 'ubuntu:latest'
   * @param image a Docker image
   */
  public static fromImage(image: string): DevEnvironmentDockerImage {
    return { image };
  }

  /**
   * The relative path of a Dockerfile that defines the container contents.
   * @example '.gitpod.Docker'
   * @param dockerFile a relative path
   */
  public static fromFile(dockerFile: string): DevEnvironmentDockerImage {
    return { dockerFile };
  }

  /**
   * A publicly available Docker image.
   */
  public readonly image?: string;

  /**
   * The relative path of a Dockerfile that defines the container contents.
   */
  public readonly dockerFile?: string;

  private constructor() { }
}

/**
 * Abstract interface for container-based development environments, such as
 * Gitpod and GitHub Codespaces.
 */
export interface IDevEnvironment {
  /**
   * A Docker image or Dockerfile for the container.
   */
  readonly dockerImage: DevEnvironmentDockerImage;

  /**
   * Adds tasks to run when the container starts.
   *
   * @param tasks The new tasks
   */
  addTasks(...tasks: Task[]): void;

  /**
   * Adds ports that should be exposed (forwarded) from the container.
   *
   * @param ports The new ports
   */
  addPorts(...ports: string[]): void;

  /**
   * Adds a list of VSCode extensions that should be automatically installed
   * in the container.
   *
   * @param extensions The extension IDs
   */
  addVscodeExtensions(...extensions: string[]): void;
}
