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
    configuration: DockerComposeVolumeConfig,
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
