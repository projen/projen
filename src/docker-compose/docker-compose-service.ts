import { DockerCompose, DockerComposeBuild } from "./docker-compose";
import { IDockerComposeNetworkBinding } from "./docker-compose-network";
import {
  DockerComposePortMappingOptions,
  DockerComposeServicePort,
} from "./docker-compose-port";
import { IDockerComposeVolumeBinding } from "./docker-compose-volume";

/**
 * An interface providing the name of a docker compose service.
 */
export interface IDockerComposeServiceName {
  /**
   * The name of the docker compose service.
   */
  readonly serviceName: string;
}

/**
 * A docker-compose service.
 */
export class DockerComposeService implements IDockerComposeServiceName {
  /**
   * Name of the service.
   */
  public readonly serviceName: string;

  /**
   * Docker image.
   */
  public readonly image?: string;

  /**
   * Docker image build instructions.
   */
  public readonly imageBuild?: DockerComposeBuild;

  /**
   * Command to run in the container.
   */
  public readonly command?: string[];

  /**
   * Entrypoint to run in the container.
   */
  public readonly entrypoint?: string[];

  /**
   * Other services that this service depends on.
   */
  public readonly dependsOn: IDockerComposeServiceName[];

  /**
   * Volumes mounted in the container.
   */
  public readonly volumes: IDockerComposeVolumeBinding[];

  /**
   * Networks mounted in the container.
   */
  public readonly networks: IDockerComposeNetworkBinding[];

  /**
   * Published ports.
   */
  public readonly ports: DockerComposeServicePort[];

  /**
   * Environment variables.
   */
  public readonly environment: Record<string, string>;

  /**
   * Attached labels.
   */
  public readonly labels: Record<string, string>;
  /**
   * Target platform
   */
  public readonly platform?: string;

  /**
   * Run in privileged mode
   */
  public readonly privileged?: boolean;

  constructor(
    serviceName: string,
    serviceDescription: DockerComposeServiceDescription,
  ) {
    if (
      (!serviceDescription.imageBuild && !serviceDescription.image) ||
      (serviceDescription.imageBuild && serviceDescription.image)
    ) {
      throw new Error(
        `A service ${serviceName} requires exactly one of a \`imageBuild\` or \`image\` key`,
      );
    }

    this.serviceName = serviceName;
    this.command = serviceDescription.command;
    this.image = serviceDescription.image;
    this.imageBuild = serviceDescription.imageBuild;
    this.dependsOn = serviceDescription.dependsOn ?? [];
    this.volumes = serviceDescription.volumes ?? [];
    this.networks = serviceDescription.networks ?? [];
    this.ports = serviceDescription.ports ?? [];
    this.environment = serviceDescription.environment ?? {};
    this.labels = serviceDescription.labels ?? {};
    this.entrypoint = serviceDescription.entrypoint;
    this.platform = serviceDescription.platform;
    this.privileged = serviceDescription.privileged;
  }

  /**
   * Add a port mapping
   * @param publishedPort Published port number
   * @param targetPort Container's port number
   * @param options Port mapping options
   */
  public addPort(
    publishedPort: number,
    targetPort: number,
    options?: DockerComposePortMappingOptions,
  ) {
    this.ports?.push(
      DockerCompose.portMapping(publishedPort, targetPort, options),
    );
  }

  /**
   * Add an environment variable
   * @param name environment variable name
   * @param value value of the environment variable
   */
  public addEnvironment(name: string, value: string) {
    this.environment[name] = value;
  }

  /**
   * Make the service depend on another service.
   * @param serviceName
   */
  public addDependsOn(serviceName: IDockerComposeServiceName) {
    this.dependsOn.push(serviceName);
  }

  /**
   * Add a volume to the service.
   * @param volume
   */
  public addVolume(volume: IDockerComposeVolumeBinding) {
    this.volumes.push(volume);
  }

  /**
   * Add a network to the service.
   * @param network
   */
  public addNetwork(network: IDockerComposeNetworkBinding) {
    this.networks.push(network);
  }

  /**
   * Add a label
   * @param name environment variable name
   * @param value value of the environment variable
   */
  public addLabel(name: string, value: string) {
    this.labels[name] = value;
  }
}

/**
 * Description of a docker-compose.yml service.
 */
export interface DockerComposeServiceDescription {
  /**
   * Use a docker image.
   * Note: You must specify either `build` or `image` key.
   * @see imageBuild
   */
  readonly image?: string;

  /**
   * Build a docker image.
   * Note: You must specify either `imageBuild` or `image` key.
   * @see image
   */
  readonly imageBuild?: DockerComposeBuild;

  /**
   * Provide a command to the docker container.
   * @default - use the container's default command
   */
  readonly command?: string[];

  /**
   * Entrypoint to run in the container.
   */
  readonly entrypoint?: string[];

  /**
   * Names of other services this service depends on.
   * @default - no dependencies
   */
  readonly dependsOn?: IDockerComposeServiceName[];

  /**
   * Mount some volumes into the service.
   * Use one of the following to create volumes:
   * @see DockerCompose.bindVolume() to mount a host path
   * @see DockerCompose.namedVolume() to create & mount a named volume
   */
  readonly volumes?: IDockerComposeVolumeBinding[];

  /**
   * Add some networks to the service.
   * @see DockerCompose.network() to create & mount a named network
   */
  readonly networks?: IDockerComposeNetworkBinding[];

  /**
   * Map some ports.
   * @default - no ports are mapped
   */
  readonly ports?: DockerComposeServicePort[];

  /**
   * Add environment variables.
   * @default - no environment variables are provided
   */
  readonly environment?: Record<string, string>;

  /**
   * Add labels.
   * @default - no labels are provided
   */
  readonly labels?: Record<string, string>;
  /**
   * Add platform
   * @default - no platform is provided
   */
  readonly platform?: string;

  /**
   * Run in privileged mode
   * @default - no privileged mode flag is provided
   */
  readonly privileged?: boolean;
}
