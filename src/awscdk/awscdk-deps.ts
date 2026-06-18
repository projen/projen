import * as semver from "semver";
import { Component } from "../component";
import { DependencyType } from "../dependencies";
import type { Project } from "../project";

/**
 * Options for `AwsCdkDeps`
 */
export interface AwsCdkDepsCommonOptions {
  /**
   * Minimum version of the AWS CDK to depend on.
   *
   * @default "2.189.1"
   */
  readonly cdkVersion: string;

  /**
   * Version range of the AWS CDK CLI to depend on.
   *
   * Can be either a specific version, or an NPM version range.
   *
   * By default, the latest 2.x version will be installed; you can use this
   * option to restrict it to a specific version or version range.
   *
   * @default "^2"
   */
  readonly cdkCliVersion?: string;

  /**
   * Minimum version of the `constructs` library to depend on.
   *
   * @default - for CDK 1.x the default is "3.2.27", for CDK 2.x the default is
   * "10.5.1".
   */
  readonly constructsVersion?: string;

  /**
   * Use pinned version instead of caret version for CDK.
   *
   * You can use this to prevent mixed versions for your CDK dependencies and to prevent auto-updates.
   * If you use experimental features this will let you define the moment you include breaking changes.
   */
  readonly cdkVersionPinning?: boolean;
}

export interface AwsCdkDepsOptions extends AwsCdkDepsCommonOptions {
  /**
   * The type of dependency to use for runtime AWS CDK and `constructs` modules.
   *
   * For libraries, use peer dependencies and for apps use runtime dependencies.
   */
  readonly dependencyType: DependencyType;
}

/**
 * Language-specific AWS CDK package names.
 */
export interface AwsCdkPackageNames {
  /**
   * Fully qualified name of the core framework package for CDKv2
   */
  readonly coreV2: string;
  /**
   * Fully qualified name of the constructs library package
   */
  readonly constructs: string;
}

/**
 * Manages dependencies on the AWS CDK.
 */
export abstract class AwsCdkDeps extends Component {
  /**
   * The dependency requirement for AWS CDK (e.g. `^2.0.0`).
   */
  public readonly cdkVersion: string;

  /**
   * The dependency requirement for the CDK CLI (e.g. '^2.3.4').
   *
   * Will return `^2` if the version was unspecified by the user.
   */
  public readonly cdkCliVersion: string;

  /**
   * The minimum version of the AWS CDK (e.g. `2.0.0`).
   */
  public readonly cdkMinimumVersion: string;

  /**
   * The major version of the AWS CDK (e.g. 1, 2, ...)
   */
  public readonly cdkMajorVersion: number;

  private readonly dependencyType: DependencyType;

  private readonly _packageNames: AwsCdkPackageNames;

  constructor(project: Project, options: AwsCdkDepsOptions) {
    super(project);

    this.dependencyType = options.dependencyType;
    this._packageNames = this.packageNames();

    const framework = determineFrameworkVersion(options);

    this.cdkCliVersion = options.cdkCliVersion ?? "^2";
    this.cdkVersion = framework.range;
    this.cdkMajorVersion = framework.major;
    this.cdkMinimumVersion = framework.minimum;

    if (this.cdkMajorVersion !== 2) {
      throw new Error(
        `AWS CDK v${this.cdkMajorVersion} is not supported. Use "cdkVersion" 2.x (AWS CDK v1 has reached end-of-support).`,
      );
    }

    this.addFrameworkDependency();

    // constructs library
    this.addConstructsDependency(options.constructsVersion);
  }

  public preSynthesize(): void {
    // Log a warning if any AWS CDK v1-only deps are found in the dependencies.
    const depNames = Array.from(
      new Set(this.project.deps.all.map((dep) => dep.name)),
    );
    const v1Deps = depNames
      .filter((dep) =>
        [PACKAGE_AWS_CDK_VERSION.V1].includes(cdkVersionOfPackage(dep)),
      )
      .sort();
    if (this.cdkMajorVersion === 2 && v1Deps.length > 0) {
      this.project.logger.warn(
        `WARNING: Found CDK v1 deps in your project, even though your "cdkVersion" is 2.x: [${v1Deps.join(
          ", ",
        )}]. Check out https://docs.aws.amazon.com/cdk/v2/guide/migrating-v2.html for more information about using CDK v2 dependencies.`,
      );
    }
  }

  private addConstructsDependency(requestedVersion: string | undefined) {
    if (requestedVersion && !semver.parse(requestedVersion)) {
      throw new Error(
        `"constructsVersion" cannot be parsed as a semver version: ${requestedVersion}`,
      );
    }

    const versionRequirement = `^${requestedVersion ?? "10.5.1"}`;

    const constructsMajorVersion = semver.minVersion(versionRequirement)?.major;
    if (!constructsMajorVersion) {
      throw new Error(
        `Cannot determine major version of constructs version '${versionRequirement}'`,
      );
    }

    if (constructsMajorVersion !== 10) {
      throw new Error("AWS CDK 2.x requires constructs 10.x");
    }

    // First remove the version added by projen
    this.project.deps.removeDependency("constructs", DependencyType.BUILD);

    // Add the version for CDK
    this.project.deps.addDependency(
      `${this._packageNames.constructs}@${versionRequirement}`,
      this.dependencyType,
    );

    return versionRequirement;
  }

  /**
   * Adds a dependency on the AWS CDK framework (`aws-cdk-lib` for V2).
   */
  private addFrameworkDependency() {
    this.project.deps.addDependency(
      `${this._packageNames.coreV2}@${this.cdkVersion}`,
      this.dependencyType,
    );
  }

  /**
   * Return a configuration object with information about package naming in various languages
   */
  protected abstract packageNames(): AwsCdkPackageNames;
}

/**
 * Which AWS CDK version a construct library package belongs to.
 */
enum PACKAGE_AWS_CDK_VERSION {
  V1 = "v1",
  V2 = "v2",
  EITHER = "either", // This package has been published both for v1 and v2.
  UNKNOWN = "unknown",
}

function cdkVersionOfPackage(packageName: string) {
  if (packageName === "aws-cdk-lib") {
    return PACKAGE_AWS_CDK_VERSION.V2;
  } else if (packageName.startsWith("@aws-cdk/")) {
    if (packageName.endsWith("-alpha")) {
      return PACKAGE_AWS_CDK_VERSION.V2;
    } else if (AWS_CDK_V1_V2_SCOPED_PACKAGES.includes(packageName)) {
      return PACKAGE_AWS_CDK_VERSION.EITHER;
    } else {
      return PACKAGE_AWS_CDK_VERSION.V1;
    }
  } else {
    return PACKAGE_AWS_CDK_VERSION.UNKNOWN;
  }
}

/**
 * A list of all known packages in the "@aws-cdk/" scope that are published
 * both for v1 and v2.
 */
const AWS_CDK_V1_V2_SCOPED_PACKAGES = [
  // aws/aws-cdk
  // @see https://github.com/aws/aws-cdk/tree/main/packages/%40aws-cdk
  "@aws-cdk/assert", // EOL package
  "@aws-cdk/cfn-property-mixins",
  "@aws-cdk/cfnspec", // EOL package
  "@aws-cdk/cx-api",
  "@aws-cdk/mixins-preview",
  "@aws-cdk/region-info",

  // aws/aws-cdk-cli
  // @see https://github.com/aws/aws-cdk-cli/tree/main/packages/%40aws-cdk
  "@aws-cdk/cdk-assets-lib",
  "@aws-cdk/cli-plugin-contract",
  "@aws-cdk/cloud-assembly-api",
  "@aws-cdk/cloud-assembly-schema",
  "@aws-cdk/cloudformation-diff",
  "@aws-cdk/integ-runner",
  "@aws-cdk/toolkit-lib",
];

function determineFrameworkVersion(options: AwsCdkDepsOptions) {
  const ver = semver.parse(options.cdkVersion);
  if (!ver) {
    throw new Error(
      `"cdkVersion" cannot be parsed as a semver version: ${options.cdkVersion}`,
    );
  }

  return {
    minimum: ver.format(),
    range: options.cdkVersionPinning
      ? options.cdkVersion
      : `^${options.cdkVersion}`,
    major: ver.major,
  };
}
