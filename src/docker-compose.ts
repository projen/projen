import { Construct } from "constructs";
import { Component } from "./component";
import { decamelizeKeysRecursively } from "./util";
import { YamlFile } from "./yaml";

/**
 * Props for DockerCompose.
 */
export interface DockerComposeProps {
  /**
   * A name to add to the docker-compose.yml filename.
   * @example 'myname' yields 'docker-compose.myname.yml'
   * @default - no name is added
   */
  readonly nameSuffix?: string;

  /**
   * Docker Compose schema version do be used
   * @default 3.3
   */
  readonly schemaVersion?: string;

  /**
   * Service descriptions.
   */
  readonly services?: Record<string, DockerComposeServiceDescription>;
}

/**
 * Options for port mappings.
 */
export interface DockerComposePortMappingOptions {
  /**
   * Port mapping protocol.
   * @default DockerComposeProtocol.TCP
   */
  readonly protocol?: DockerComposeProtocol;
}

/**
 * Create a docker-compose YAML file.
 */
export class DockerCompose extends Component {
  /**
   * Depends on a service name.
   */
  static serviceName(serviceName: string): IDockerComposeServiceName {
    return {
      serviceName,
    };
  }

  /**
   * Create a port mapping.
   * @param publishedPort Published port number
   * @param targetPort Container's port number
   * @param options Port mapping options
   */
  static portMapping(
    publishedPort: number,
    targetPort: number,
    options?: DockerComposePortMappingOptions
  ): DockerComposeServicePort {
    const protocol = options?.protocol ?? DockerComposeProtocol.TCP;

    return {
      target: targetPort,
      published: publishedPort,
      protocol: protocol,
      mode: "host",
    };
  }

  /**
   * Create a bind volume that binds a host path to the target path in the container.
   * @param sourcePath Host path name
   * @param targetPath Target path name
   */
  static bindVolume(
    sourcePath: string,
    targetPath: string
  ): IDockerComposeVolumeBinding {
    return {
      bind(_volumeInfo: IDockerComposeVolumeConfig): DockerComposeVolumeMount {
        return {
          type: "bind",
          source: sourcePath,
          target: targetPath,
        };
      },
    };
  }

  /**
   * Create a named volume and mount it to the target path. If you use this
   * named volume in several services, the volume will be shared. In this
   * case, the volume configuration of the first-provided options are used.
   *
   * @param volumeName Name of the volume
   * @param targetPath Target path
   * @param options volume configuration (default: docker compose defaults)
   */
  static namedVolume(
    volumeName: string,
    targetPath: string,
    options: DockerComposeVolumeConfig = {}
  ): IDockerComposeVolumeBinding {
    return {
      bind(volumeInfo: IDockerComposeVolumeConfig): DockerComposeVolumeMount {
        volumeInfo.addVolumeConfiguration(volumeName, options);

        return {
          type: "volume",
          source: volumeName,
          target: targetPath,
        };
      },
    };
  }

  private readonly services: Record<string, DockerComposeService>;
  private readonly version: string;

  constructor(scope: Construct, props?: DockerComposeProps) {
    super(scope, "DockerCompose");

    const nameSuffix = props?.nameSuffix ? `${props!.nameSuffix}.yml` : "yml";
    new YamlFile(scope, `docker-compose.${nameSuffix}`, {
      committed: true,
      readonly: true,
      obj: () => this._synthesizeDockerCompose(),
    });

    if (props?.schemaVersion && !parseFloat(props.schemaVersion)) {
      throw Error("Version tag needs to be a number");
    }
    this.version = props?.schemaVersion ? props.schemaVersion : "3.3";
    this.services = {};

    // Add the services provided via the constructor argument.
    const initialServices = props?.services ?? {};
    for (const [name, serviceDescription] of Object.entries(initialServices)) {
      this.addService(name, serviceDescription);
    }
  }

  /**
   * Add a service to the docker-compose file.
   * @param serviceName name of the service
   * @param description a service description
   */
  public addService(
    serviceName: string,
    description: DockerComposeServiceDescription
  ): DockerComposeService {
    const service = new DockerComposeService(serviceName, description);
    this.services[serviceName] = service;
    return service;
  }

  /**
   * @internal
   */
  _synthesizeDockerCompose(): object {
    if (Object.keys(this.services).length === 0) {
      throw new Error("DockerCompose requires at least one service");
    }

    return renderDockerComposeFile(this.services, this.version);
  }
}

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
   * Map some ports.
   * @default - no ports are mapped
   */
  readonly ports?: DockerComposeServicePort[];

  /**
   * Add environment variables.
   * @default - no environment variables are provided
   */
  readonly environment?: Record<string, string>;
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
   * Other services that this service depends on.
   */
  public readonly dependsOn: IDockerComposeServiceName[];

  /**
   * Volumes mounted in the container.
   */
  public readonly volumes: IDockerComposeVolumeBinding[];

  /**
   * Published ports.
   */
  public readonly ports: DockerComposeServicePort[];

  /**
   * Environment variables.
   */
  public readonly environment: Record<string, string>;

  constructor(
    serviceName: string,
    serviceDescription: DockerComposeServiceDescription
  ) {
    if (
      (!serviceDescription.imageBuild && !serviceDescription.image) ||
      (serviceDescription.imageBuild && serviceDescription.image)
    ) {
      throw new Error(
        `A service ${serviceName} requires exactly one of a \`imageBuild\` or \`image\` key`
      );
    }

    this.serviceName = serviceName;
    this.command = serviceDescription.command;
    this.image = serviceDescription.image;
    this.imageBuild = serviceDescription.imageBuild;
    this.dependsOn = serviceDescription.dependsOn ?? [];
    this.volumes = serviceDescription.volumes ?? [];
    this.ports = serviceDescription.ports ?? [];
    this.environment = serviceDescription.environment ?? {};
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
    options?: DockerComposePortMappingOptions
  ) {
    this.ports?.push(
      DockerCompose.portMapping(publishedPort, targetPort, options)
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
}

/**
 * A service port mapping
 */
export interface DockerComposeServicePort {
  /**
   * Published port number
   */
  readonly published: number;

  /**
   * Target port number
   */
  readonly target: number;

  /**
   * Network protocol
   */
  readonly protocol: DockerComposeProtocol;

  /**
   * Port mapping mode.
   */
  readonly mode: string;
}

/**
 * Network protocol for port mapping
 */
export enum DockerComposeProtocol {
  /**
   * TCP protocol
   */
  TCP = "tcp",

  /**
   * UDP protocol
   */
  UDP = "udp",
}

/**
 * Build arguments for creating a docker image.
 */
export interface DockerComposeBuild {
  /**
   * Docker build context directory.
   */
  readonly context: string;

  /**
   * A dockerfile to build from.
   * @default "Dockerfile"
   */
  readonly dockerfile?: string;

  /**
   * Build args.
   * @default - none are provided
   */
  readonly args?: Record<string, string>;
}

/**
 * Volume configuration
 */
export interface DockerComposeVolumeConfig {
  /**
   * Driver to use for the volume
   * @default - value is not provided
   */
  readonly driver?: string;

  /**
   * Options to provide to the driver.
   */
  readonly driverOpts?: Record<string, string>;

  /**
   * Set to true to indicate that the volume is externally created.
   * @default - unset, indicating that docker-compose creates the volume
   */
  readonly external?: boolean;

  /**
   * Name of the volume for when the volume name isn't going to work in YAML.
   * @default - unset, indicating that docker-compose creates volumes as usual
   */
  readonly name?: string;
}

/**
 * Volume binding information.
 */
export interface IDockerComposeVolumeBinding {
  /**
   * Binds the requested volume to the docker-compose volume configuration and
   * provide mounting instructions for synthesis.
   * @param volumeConfig the volume configuration
   * @returns mounting instructions for the service.
   */
  bind(volumeConfig: IDockerComposeVolumeConfig): DockerComposeVolumeMount;
}

/**
 * Storage for volume configuration.
 */
export interface IDockerComposeVolumeConfig {
  /**
   * Add volume configuration to the repository.
   * @param volumeName
   * @param configuration
   */
  addVolumeConfiguration(
    volumeName: string,
    configuration: DockerComposeVolumeConfig
  ): void;
}

/**
 * Service volume mounting information.
 */
export interface DockerComposeVolumeMount {
  /**
   * Type of volume.
   */
  readonly type: string;

  /**
   * Volume source
   */
  readonly source: string;

  /**
   * Volume target
   */
  readonly target: string;
}

/**
 * Structure of a docker compose file before we decamelize.
 * @internal
 */
interface DockerComposeFileSchema {
  version: string;
  services: Record<string, DockerComposeFileServiceSchema>;
  volumes?: Record<string, DockerComposeVolumeConfig>;
}

/**
 * Structure of a docker compose file's service before we decamelize.
 * @internal
 */
interface DockerComposeFileServiceSchema {
  readonly dependsOn?: string[];
  readonly build?: DockerComposeBuild;
  readonly image?: string;
  readonly command?: string[];
  readonly volumes?: DockerComposeVolumeMount[];
  readonly ports?: DockerComposeServicePort[];
  readonly environment?: Record<string, string>;
}

function renderDockerComposeFile(
  serviceDescriptions: Record<string, DockerComposeService>,
  version: string
): object {
  // Record volume configuration
  const volumeConfig: Record<string, DockerComposeVolumeConfig> = {};
  const volumeInfo: IDockerComposeVolumeConfig = {
    addVolumeConfiguration(
      volumeName: string,
      configuration: DockerComposeVolumeConfig
    ) {
      if (!volumeConfig[volumeName]) {
        // First volume configuration takes precedence.
        volumeConfig[volumeName] = configuration;
      }
    },
  };

  // Render service configuration
  const services: Record<string, DockerComposeFileServiceSchema> = {};
  for (const [serviceName, serviceDescription] of Object.entries(
    serviceDescriptions ?? {}
  )) {
    // Resolve the names of each dependency and check that they exist.
    // Note: They may not exist if the user made a mistake when referencing a
    // service by name via `DockerCompose.serviceName()`.
    // @see DockerCompose.serviceName
    const dependsOn = Array<string>();
    for (const dependsOnServiceName of serviceDescription.dependsOn ?? []) {
      const resolvedServiceName = dependsOnServiceName.serviceName;
      if (resolvedServiceName === serviceName) {
        throw new Error(`Service ${serviceName} cannot depend on itself`);
      }
      if (!serviceDescriptions[resolvedServiceName]) {
        throw new Error(
          `Unable to resolve service named ${resolvedServiceName} for ${serviceName}`
        );
      }

      dependsOn.push(resolvedServiceName);
    }

    // Give each volume binding a chance to bind any necessary volume
    // configuration and provide volume mount information for the service.
    const volumes: DockerComposeVolumeMount[] = [];
    for (const volumeBinding of serviceDescription.volumes ?? []) {
      volumes.push(volumeBinding.bind(volumeInfo));
    }

    // Create and store the service configuration, taking care not to create
    // object members with undefined values.
    services[serviceName] = {
      ...getObjectWithKeyAndValueIfValueIsDefined(
        "image",
        serviceDescription.image
      ),
      ...getObjectWithKeyAndValueIfValueIsDefined(
        "build",
        serviceDescription.imageBuild
      ),
      ...getObjectWithKeyAndValueIfValueIsDefined(
        "command",
        serviceDescription.command
      ),
      ...(Object.keys(serviceDescription.environment).length > 0
        ? { environment: serviceDescription.environment }
        : {}),
      ...(serviceDescription.ports.length > 0
        ? { ports: serviceDescription.ports }
        : {}),
      ...(dependsOn.length > 0 ? { dependsOn } : {}),
      ...(volumes.length > 0 ? { volumes } : {}),
    };
  }

  // Explicit with the type here because the decamelize step after this wipes
  // out types.
  const input: DockerComposeFileSchema = {
    version,
    services,
    ...(Object.keys(volumeConfig).length > 0 ? { volumes: volumeConfig } : {}),
  };

  // Change most keys to snake case.
  return decamelizeKeysRecursively(input, {
    shouldDecamelize: shouldDecamelizeDockerComposeKey,
    separator: "_",
  });
}

/**
 * Returns `{ [key]: value }` if `value` is defined, otherwise returns `{}` so
 * that object spreading can be used to generate a peculiar interface.
 * @param key
 * @param value
 */
function getObjectWithKeyAndValueIfValueIsDefined<K extends string, T>(
  key: K,
  value: T
): { K: T } | {} {
  return value !== undefined ? { [key]: value } : {};
}

/**
 * Determines whether the key at the given path should be decamelized.
 * Largely, all keys should be snake cased. But, there are some
 * exceptions for user-provided names for services, volumes, and
 * environment variables.
 *
 * @param path
 */
function shouldDecamelizeDockerComposeKey(path: string[]) {
  const poundPath = path.join("#");

  // Does not decamelize user's names.
  // services.namehere:
  // volumes.namehere:
  if (/^(services|volumes)#[^#]+$/.test(poundPath)) {
    return false;
  }

  // Does not decamelize environment variables
  // services.namehere.environment.*
  if (/^services#[^#]+#environment#/.test(poundPath)) {
    return false;
  }

  // Does not decamelize build arguments
  // services.namehere.build.args.*
  if (/^services#[^#]+#build#args#/.test(poundPath)) {
    return false;
  }

  // Otherwise, let it all decamelize.
  return true;
}
