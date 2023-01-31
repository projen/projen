/**
 * IPAM subnet configuration
 */
export interface DockerComposeNetworkIpamSubnetConfig {
  /**
   * Subnet in CIDR format that represents a network segment
   * @default - value is not provided
   */
  readonly subnet?: string;
}

/**
 * IPAM configuration
 */
export interface DockerComposeNetworkIpamConfig {
  /**
   * Driver to use for custom IPAM config.
   * @default - value is not provided
   */
  readonly driver?: string;

  /**
   * A list with zero or more config blocks specifying custom IPAM configuration.
   * @default - value is not provided
   */
  readonly config?: DockerComposeNetworkIpamSubnetConfig[];
}

/**
 * Network configuration
 */
export interface DockerComposeNetworkConfig {
  /**
   * Driver to use for the network
   * @default - value is not provided
   */
  readonly driver?: string;

  /**
   * Options for the configured driver. Those options are driver-dependent - consult the driver’s documentation for more information
   * @default - value is not provided
   */
  readonly driverOpts?: object;

  /**
   * Set to true to indicate that the network is a bridge network.
   * @default - unset
   */
  readonly bridge?: boolean;

  /**
   * Set to true to indicate that the network is an overlay network.
   * @default - unset
   */
  readonly overlay?: boolean;

  /**
   * Set to true to indicate that the network is externally created.
   * @default - unset, indicating that docker-compose creates the network
   */
  readonly external?: boolean;

  /**
   * Set to true to indicate that standalone containers can attach to this network, in addition to services.
   * @default - unset
   */
  readonly attachable?: boolean;

  /**
   * Specify custom IPAM config.
   * @default - unset
   */
  readonly ipam?: DockerComposeNetworkIpamConfig;

  /**
   * Set to true to indicate that you want to create an externally isolated overlay network
   * @default - unset
   */
  readonly internal?: boolean;

  /**
   * Attach labels to the network
   * @default - unset
   */
  readonly labels?: string[];

  /**
   * Name of the network for when the network name isn't going to work in YAML.
   * @default - unset, indicating that docker-compose creates networks as usual
   */
  readonly name?: string;
}

/**
 * Network binding information.
 */
export interface IDockerComposeNetworkBinding {
  /**
   * Binds the requested network to the docker-compose network configuration and
   * provide mounting instructions for synthesis.
   * @param networkConfig the network configuration
   * @returns the service name
   */
  bind(networkConfig: IDockerComposeNetworkConfig): string;
}

/**
 * Storage for network configuration.
 */
export interface IDockerComposeNetworkConfig {
  /**
   * Add network configuration to the repository.
   * @param networkName
   * @param configuration
   */
  addNetworkConfiguration(
    networkName: string,
    configuration: DockerComposeNetworkConfig
  ): void;
}
