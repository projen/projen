import * as semver from "semver";
import { Component } from "../component";
import { DependencyType } from "../dependencies";
import type { Project } from "../project";

/**
 * Options for `CdktnDeps`
 */
export interface CdktnDepsCommonOptions {
  /**
   * Minimum version of the CDKTN to depend on.
   *
   * @default "^0.24.0"
   */
  readonly cdktnVersion: string;

  /**
   * Version range of the CDKTN CLI to depend on.
   *
   * Can be either a specific version, or an NPM version range.
   *
   * By default, the latest version will be installed; you can use this
   * option to restrict it to a specific version or version range.
   *
   * @default - no specific version
   */
  readonly cdktnCliVersion?: string;

  /**
   * Minimum version of the `constructs` library to depend on.
   *
   * @default "^10.7.2"
   */
  readonly constructsVersion?: string;

  /**
   * Use pinned version instead of caret version for CDKTN.
   *
   * You can use this to prevent mixed versions for your CDKTN dependencies and to prevent auto-updates.
   * If you use experimental features this will let you define the moment you include breaking changes.
   */
  readonly cdktnVersionPinning?: boolean;
}

export interface CdktnDepsOptions extends CdktnDepsCommonOptions {
  /**
   * The type of dependency to use for the runtime `cdktn` module.
   *
   * For libraries, use peer dependencies and for apps use runtime dependencies.
   */
  readonly dependencyType: DependencyType;
}

/**
 * Manages dependencies on CDK Terrain (CDKTN).
 */
export class CdktnDeps extends Component {
  /**
   * The dependency requirement for CDKTN (e.g. `^0.24.0`).
   */
  public readonly cdktnVersion: string;

  /**
   * The dependency requirement for the CDKTN CLI.
   */
  public readonly cdktnCliVersion: string;

  /**
   * The minimum version of CDKTN (e.g. `0.24.0`).
   */
  public readonly cdktnMinimumVersion: string;

  private readonly dependencyType: DependencyType;

  constructor(project: Project, options: CdktnDepsOptions) {
    super(project);

    if (!options.cdktnVersion) {
      throw new Error("Required field cdktnVersion is not specified.");
    }

    this.dependencyType = options.dependencyType;

    // used to derive defaults (e.g. the default constructs version); coercion
    // tolerates partial versions like "0.99" that `semver.parse` rejects.
    const coercedVer = semver.coerce(options.cdktnVersion);
    if (!coercedVer) {
      throw new Error(
        `"cdktnVersion" cannot be parsed as a semver version: ${options.cdktnVersion}`,
      );
    }

    this.cdktnMinimumVersion = coercedVer.format();

    // when pinning, use the user-provided version requirement verbatim (e.g.
    // "0.99" is kept as-is instead of being normalized to "^0.99.0") to
    // preserve the exact `peerDependencies` value that was written before
    // caret ranges became the default.
    this.cdktnVersion = options.cdktnVersionPinning
      ? options.cdktnVersion
      : `^${this.cdktnMinimumVersion}`;
    this.cdktnCliVersion = options.cdktnCliVersion ?? this.cdktnVersion;

    this.addFrameworkDependency();
    this.addConstructsDependency(options.constructsVersion);

    // Add the CLI as a dev dependency
    this.project.deps.requestDependency({
      name: "cdktn-cli",
      version: this.cdktnCliVersion,
      type: DependencyType.BUILD,
    });
  }

  /**
   * Adds a dependency on the CDKTN framework package (e.g. `cdktn`).
   */
  private addFrameworkDependency() {
    this.project.deps.requestDependency({
      name: "cdktn",
      version: this.cdktnVersion,
      type: this.dependencyType,
    });
  }

  private addConstructsDependency(requestedVersion: string | undefined) {
    if (requestedVersion && !semver.parse(requestedVersion)) {
      throw new Error(
        `"constructsVersion" cannot be parsed as a semver version: ${requestedVersion}`,
      );
    }

    const semverCdktnVersion = semver.coerce(this.cdktnMinimumVersion);
    const defaultConstructsVersion =
      semverCdktnVersion && semver.lte(semverCdktnVersion, "0.24.0")
        ? "10.7.2"
        : "10";

    const versionRequirement = `^${
      requestedVersion ?? defaultConstructsVersion
    }`;

    // First remove the version added by projen
    this.project.deps.removeDependency("constructs", DependencyType.BUILD);

    this.project.deps.addDependency(
      `constructs@${versionRequirement}`,
      this.dependencyType,
    );
  }
}
