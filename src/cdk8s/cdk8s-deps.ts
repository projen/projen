import * as semver from "semver";
import { Component } from "../component";
import { DependencyType } from "../dependencies";
import { Project } from "../project";

/**
 * Options for `Cdk8sDeps`
 */
export interface Cdk8sDepsCommonOptions {
  /**
   * Minimum version of the cdk8s to depend on.
   *
   * @default "2.3.33"
   */
  readonly cdk8sVersion: string;

  /**
   * Minimum version of the cdk8s-cli to depend on.
   *
   * @default "2.0.28"
   */
  readonly cdk8sCliVersion?: string;

  /**
   * Minimum version of the `constructs` library to depend on.
   *
   * @default "10.1.42"
   */
  readonly constructsVersion?: string;

  /**
   * Use pinned version instead of caret version for cdk8s.
   *
   * You can use this to prevent yarn to mix versions for your CDK8s package and to prevent auto-updates.
   * If you use experimental features this will let you define the moment you include breaking changes.
   *
   * @default false
   */
  readonly cdk8sVersionPinning?: boolean;

  /**
   * Use pinned version instead of caret version for cdk8s-cli.
   *
   * You can use this to prevent yarn to mix versions for your CDK8s package and to prevent auto-updates.
   * If you use experimental features this will let you define the moment you include breaking changes.
   *
   * @default false
   */
  readonly cdk8sCliVersionPinning?: boolean;

  /**
   * Use pinned version instead of caret version for constructs.
   *
   * You can use this to prevent yarn to mix versions for your consructs package and to prevent auto-updates.
   * If you use experimental features this will let you define the moment you include breaking changes.
   *
   * @default false
   */
  readonly constructsVersionPinning?: boolean;

  /**
   * Include cdk8s-plus
   *
   * @default true
   */
  readonly cdk8sPlus?: boolean;

  /**
   * The cdk8s-plus library depends of Kubernetes minor version
   * For example, cdk8s-plus-22 targets kubernetes version 1.22.0
   * cdk8s-plus-21 targets kubernetes version 1.21.0
   *
   * @default 22
   */
  readonly k8sMinorVersion?: number;

  /**
   * Minimum version of the cdk8s-plus-XX to depend on.
   *
   * @default "2.0.0-rc.26"
   */
  readonly cdk8sPlusVersion?: string;

  /**
   * Use pinned version instead of caret version for cdk8s-plus-17.
   *
   * You can use this to prevent yarn to mix versions for your CDK8s package and to prevent auto-updates.
   * If you use experimental features this will let you define the moment you include breaking changes.
   *
   * @default false
   */
  readonly cdk8sPlusVersionPinning?: boolean;
}

export interface Cdk8sDepsOptions extends Cdk8sDepsCommonOptions {
  /**
   * The type of dependency to use for runtime CDK8s and `constructs` modules.
   *
   * For libraries, use peer dependencies and for apps use runtime dependencies.
   */
  readonly dependencyType: DependencyType;

  /**
   * Add cdk8s-cli only to Node projects
   *
   * @default false
   */
  readonly cdk8sCliDependency: boolean;
}

export interface Cdk8sPackageNames {
  /**
   * Fully qualified name of the core framework package
   */
  readonly cdk8s: string;
  /**
   * Fully qualified name of the client package.
   * Used only on Node projects
   */
  readonly cdk8sClient?: string;
  /**
   * Fully qualified name of the constructs library package
   */
  readonly constructs: string;
  /**
   * Fully qualified name of the cdk9s-plus-XX library package
   */
  readonly cdk8sPlus: string;
}

/**
 * Manages dependencies on the CDK8s.
 */
export abstract class Cdk8sDeps extends Component {
  /**
   * The dependency requirement for CDK8s.
   */
  public readonly cdk8sVersion: string;

  /**
   * The minimum version of the CDK8s (e.g. `2.0.0`)
   */
  public readonly cdk8sMinimumVersion: string;

  /**
   * The major version of the CDK8s (e.g. 1, 2, ...)
   */
  public readonly cdk8sMajorVersion: number;

  private readonly dependencyType: DependencyType;

  private readonly _packageNames: Cdk8sPackageNames;

  constructor(project: Project, options: Cdk8sDepsOptions) {
    super(project);

    this.dependencyType = options.dependencyType;
    this._packageNames = this.packageNames();

    const framework = determineFrameworkVersion(options);

    this.cdk8sVersion = framework.range;
    this.cdk8sMajorVersion = framework.major;
    this.cdk8sMinimumVersion = framework.minimum;

    // constructs library
    this.addConstructsDependency(
      options.constructsVersion,
      options.constructsVersionPinning,
    );

    this.addFrameworkDependency(
      options.cdk8sVersion,
      options.cdk8sVersionPinning,
    );

    if (options.cdk8sCliDependency) {
      this.addClientDependency(
        options.cdk8sCliVersion,
        options.cdk8sCliVersionPinning,
      );
    }

    if (options.cdk8sPlus ?? true) {
      const k8MinorVersion = options.k8sMinorVersion ?? 22;
      this.addCdk8sPlusDependency(
        k8MinorVersion,
        options.cdk8sPlusVersion,
        // (project instanceof Cdk8sPythonApp) ? true : false,
        options.cdk8sPlusVersionPinning,
      );
    }
  }

  /**
   * Return a configuration object with information about package naming in various languages
   */
  protected abstract packageNames(): Cdk8sPackageNames;

  private getVersionRequirement(
    requestedVersion: string | undefined,
    v1Version: string,
    v2Version: string,
    pinning?: boolean,
  ) {
    const defaultVersion = this.cdk8sMajorVersion === 1 ? v1Version : v2Version;
    const version = `${requestedVersion ?? defaultVersion}`;
    const versionRequirement = pinning ? `${version}` : `^${version}`;
    return versionRequirement;
  }

  private addCdk8sPlusDependency(
    k8MinorVersion: number,
    requestedVersion: string | undefined,
    pinning?: boolean,
  ) {
    const versionRequirement = this.getVersionRequirement(
      requestedVersion,
      "1.0.0-beta.222",
      "2.0.0-rc.26",
      pinning,
    );

    const cdk8sPlusMajorVersion = semver.minVersion(versionRequirement)?.major;
    if (!cdk8sPlusMajorVersion) {
      throw new Error(
        `Cannot determine major version of cdk8s-plus version '${versionRequirement}'`,
      );
    }

    const cdk8sPlusLib = this._packageNames.cdk8sPlus.concat(
      "-",
      k8MinorVersion.toString(),
    );
    this.project.deps.addDependency(
      `${cdk8sPlusLib}@${versionRequirement}`,
      this.dependencyType,
    );

    return versionRequirement;
  }

  private addClientDependency(
    requestedVersion: string | undefined,
    pinning?: boolean,
  ) {
    const versionRequirement = this.getVersionRequirement(
      requestedVersion,
      "1.1.34",
      "2.0.28",
      pinning,
    );

    const cdk8sCliMajorVersion = semver.minVersion(versionRequirement)?.major;
    if (!cdk8sCliMajorVersion) {
      throw new Error(
        `Cannot determine major version of cdk8s version '${versionRequirement}'`,
      );
    }

    this.project.deps.addDependency(
      `${this._packageNames.cdk8sClient}@${versionRequirement}`,
      DependencyType.BUILD,
    );

    return versionRequirement;
  }

  private addFrameworkDependency(
    requestedVersion: string | undefined,
    pinning?: boolean,
  ) {
    const versionRequirement = this.getVersionRequirement(
      requestedVersion,
      "1.6.33",
      "2.3.33",
      pinning,
    );

    const cdk8sMajorVersion = semver.minVersion(versionRequirement)?.major;
    if (!cdk8sMajorVersion) {
      throw new Error(
        `Cannot determine major version of cdk8s version '${versionRequirement}'`,
      );
    }

    this.project.deps.addDependency(
      `${this._packageNames.cdk8s}@${versionRequirement}`,
      this.dependencyType,
    );

    return versionRequirement;
  }

  private addConstructsDependency(
    requestedVersion: string | undefined,
    pinning?: boolean,
  ) {
    if (requestedVersion && !semver.parse(requestedVersion)) {
      throw new Error(
        `"constructsVersion" cannot be parsed as a semver version: ${requestedVersion}`,
      );
    }

    const versionRequirement = this.getVersionRequirement(
      requestedVersion,
      "3.4.39",
      "10.1.42",
      pinning,
    );

    const constructsMajorVersion = semver.minVersion(versionRequirement)?.major;
    if (!constructsMajorVersion) {
      throw new Error(
        `Cannot determine major version of constructs version '${versionRequirement}'`,
      );
    }

    switch (this.cdk8sMajorVersion) {
      case 1:
        if (constructsMajorVersion !== 3) {
          throw new Error("AWS CDK 1.x requires constructs 3.x");
        }
        break;

      case 2:
        if (constructsMajorVersion !== 10) {
          throw new Error("AWS CDK 2.x requires constructs 10.x");
        }
        break;
    }

    this.project.deps.addDependency(
      `${this._packageNames.constructs}@${versionRequirement}`,
      this.dependencyType,
    );

    return versionRequirement;
  }
}

function determineFrameworkVersion(options: Cdk8sDepsOptions) {
  const ver = semver.parse(options.cdk8sVersion);
  if (!ver) {
    throw new Error(
      `"cdk8sVersion" cannot be parsed as a semver version: ${options.cdk8sVersion}`,
    );
  }

  return {
    minimum: ver.format(),
    range: options.cdk8sVersionPinning
      ? options.cdk8sVersion
      : `^${options.cdk8sVersion}`,
    major: ver.major,
  };
}
