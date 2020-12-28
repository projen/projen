export interface DepsManifest {
  /**
   * All dependencies of this module.
   */
  readonly dependencies: Dependency[];
}

export interface Dependency {
  /**
   * The package manager name of the dependency (e.g. `leftpad` for npm).
   *
   * NOTE: For package managers that use complex coordinates (like Maven), we
   * will codify it into a string somehow.
   */
  readonly name: string;

  /**
   * Which type of dependency this is (runtime, build-time, etc).
   */
  readonly type: DependencyType;

  /**
   * Semantic version version requirement.
   *
   * If the dependency is part of a mono-repo, use `monorepo`.
   *
   * @default - requirement is managed by the package manager (e.g. npm/yarn).
   */
  readonly version?: string;
}

export enum DependencyType {
  /**
   * The dependency is required for the program/library during runtime.
   */
  RUNTIME = 'runtime',

  /**
   * The dependency is required at runtime but expected to be installed by the
   * consumer.
   */
  PEER = 'peer',

  /**
   * The dependency is bundled and shipped with the module, so consumers are not
   * required to install it.
   */
  BUNDLED = 'bundled',

  /**
   * The dependency is required to run the `build` task.
   */
  BUILD = 'build',

  /**
   * The dependency is required to run the `test` task.
   */
  TEST = 'test',

  /**
   * The dependency is required for development (e.g. IDE plugins).
   */
  DEVENV = 'devenv',
}
