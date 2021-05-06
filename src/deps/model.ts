export interface DepsManifest {
  /**
   * All dependencies of this module.
   */
  readonly dependencies: Dependency[];
}

/**
 * Coordinates of the dependency (name and version).
 */
export interface DependencyCoordinates {
  /**
   * The package manager name of the dependency (e.g. `leftpad` for npm).
   *
   * NOTE: For package managers that use complex coordinates (like Maven), we
   * will codify it into a string somehow.
   */
  readonly name: string;

  /**
   * Semantic version version requirement.
   *
   * @default - requirement is managed by the package manager (e.g. npm/yarn).
   */
  readonly version?: string;
}

/**
 * Represents a project dependency.
 */
export interface Dependency extends DependencyCoordinates {
  /**
   * Which type of dependency this is (runtime, build-time, etc).
   */
  readonly type: DependencyType;

  /**
   * Additional JSON metadata associated with the dependency (package manager
   * specific).
   * @default {}
   */
  readonly metadata?: { [key: string]: any };
}

/**
 * Type of dependency.
 */
export enum DependencyType {
  /**
   * The dependency is required for the program/library during runtime.
   */
  RUNTIME = "runtime",

  /**
   * The dependency is required at runtime but expected to be installed by the
   * consumer.
   */
  PEER = "peer",

  /**
   * The dependency is bundled and shipped with the module, so consumers are not
   * required to install it.
   */
  BUNDLED = "bundled",

  /**
   * The dependency is required to run the `build` task.
   */
  BUILD = "build",

  /**
   * The dependency is required to run the `test` task.
   */
  TEST = "test",

  /**
   * The dependency is required for development (e.g. IDE plugins).
   */
  DEVENV = "devenv",
}
