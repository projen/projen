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
