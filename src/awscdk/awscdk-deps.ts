import * as semver from 'semver';
import { DependencyType } from '..';
import { Component } from '../component';
import { Project } from '../project';

/**
 * Options for `AwsCdkDeps`
 */
export interface AwsCdkDepsCommonOptions {
  /**
   * Semantic version requirement for the the AWS CDK libraries.
   *
   * @default "^2"
   */
  readonly cdkVersion: string;

  /**
   * Semantic version requirement for the `constructs` library.
   *
   * @default - for CDK 1.x the default is "^3.2.27", for CDK 2.x the default
   * is "^10.0.5".
   */
  readonly constructsVersion?: string;

  /**
   * Use pinned version instead of caret version for CDK.
   *
   * You can use this to prevent yarn to mix versions for your CDK dependencies and to prevent auto-updates.
   * If you use experimental features this will let you define the moment you include breaking changes.
   *
   * @deprecated Not supported: to pin your CDK version just set `cdkVersion` to a pinned version.
   */
  readonly cdkVersionPinning?: boolean;

  /**
    * Which AWS CDK modules (those that start with "@aws-cdk/") does this library
    * require when consumed?
    *
    * @deprecated For CDK 2.x use 'peerDeps' instead
    */
  readonly cdkDependencies?: string[];

  /**
   * If this is enabled (default), all modules declared in `cdkDependencies` will be also added as
   * normal `dependencies` (as well as `peerDependencies`).
   *
   * This is to ensure that downstream consumers actually have your CDK dependencies installed
   * when using npm < 7 or yarn, where peer dependencies are not automatically installed.
   * If this is disabled, `cdkDependencies` will be added to `devDependencies` to ensure
   * they are present during development.
   *
   * @default true
   * @deprecated Not supported in CDK v2.
   */
  readonly cdkDependenciesAsDeps?: boolean;

  /**
   * Install the @aws-cdk/assert library?
   *
   * @deprecated Use `cdkAssertions` instead
   * @default false
   */
  readonly cdkAssert?: boolean;

  /**
   * Install the @aws-cdk/assertions library?
   *
   * Only needed for CDK 1.x. If using CDK 2.x then
   * assertions is already included in 'aws-cdk-lib'
   *
   * @default true
   */
  readonly cdkAssertions?: boolean;

  /**
   * AWS CDK modules required for testing.
   *
   * @deprecated For CDK 2.x use 'devDeps' instead
   */
  readonly cdkTestDependencies?: string[];
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
 * Manages dependencies on the AWS CDK.
 */
export class AwsCdkDeps extends Component {
  /**
   * The dependency requirement for AWS CDK (e.g. `^2.0.0`).
   */
  public readonly cdkVersion: string;

  /**
   * The semantic version requirement of `constructs`.
   */
  public readonly constructsVersion: string;

  /**
   * Whether CDK dependencies are added as normal dependencies (and peer dependencies).
   * @deprecated Not used for CDK 2.x
   */
  public readonly cdkDependenciesAsDeps: boolean;

  /**
   * The major version of the AWX CDK (e.g. 1, 2, ...)
   */
  public readonly cdkMajorVersion: number;

  private readonly dependencyType: DependencyType;

  constructor(project: Project, options: AwsCdkDepsOptions) {
    super(project);

    if (options.cdkVersionPinning) {
      throw new Error('"cdkVersionPinning" is deprecated, set "cdkVersion" to a pinned version');
    }

    if (semver.valid(options.cdkVersion)) {
      this.project.logger.warn(`NOTICE: "cdkVersion" is now a version range and is currently pinned to ${options.cdkVersion}. We recommend setting it to "^${options.cdkVersion}".`);
    }

    if (semver.valid(options.constructsVersion)) {
      this.project.logger.warn(`NOTICE: "constructsVersion" is now a version range and is currently pinned to ${options.constructsVersion}. We recommend setting it to "^${options.constructsVersion}".`);
    }

    this.cdkDependenciesAsDeps = options.cdkDependenciesAsDeps ?? true;
    this.cdkVersion = options.cdkVersion;
    this.dependencyType = options.dependencyType;

    const mv = semver.minVersion(this.cdkVersion)?.major;
    if (!mv) {
      throw new Error(`Unable to determine CDK major version for ${mv}`);
    }
    this.cdkMajorVersion = mv;

    this.addFrameworkDependency(options);
    this.addV1AssertionLibraryDependency(options);

    // add a dependency on `constructs`
    this.constructsVersion = this.addConstructsDependency(options.constructsVersion);

    this.addV1Dependencies(...options.cdkDependencies ?? []);
    this.addV1DevDependencies(...options.cdkTestDependencies ?? []);
  }

  /**
   * Adds dependencies to AWS CDK modules.
   *
   * The type of dependency is determined by the `dependencyType` option.
   *
   * This method is not supported in CDK v2. Use `project.addPeerDeps()` or
   * `project.addDeps()` as appropriate.
   *
   * @param deps names of cdk modules (e.g. `@aws-cdk/aws-lambda`).
   */
  public addV1Dependencies(...deps: string[]) {
    if (deps.length > 0 && this.cdkMajorVersion !== 1) {
      throw new Error('addV1Dependencies() is not supported for CDK 2.x and above, use addDeps() or addPeerDeps() instead');
    }

    // this will add dependencies based on the type requested by the user
    // for libraries, this will be "peer" and for apps it will be "runtime"
    this.addV1DependenciesByType(this.dependencyType, ...deps);

    // add deps as runtime deps if `cdkDepsAsDeps` is true
    if (this.cdkDependenciesAsDeps) {
      this.addV1DependenciesByType(DependencyType.RUNTIME, ...deps);
    }
  }

  /**
   * Adds AWS CDK modules as dev dependencies.
   *
   * This method is not supported in CDK v2. Use `project.addPeerDeps()` or
   * `project.addDeps()` as appropriate.
   *
   * @param deps names of cdk modules (e.g. `@aws-cdk/aws-lambda`).
   */
  public addV1DevDependencies(...deps: string[]) {
    if (deps.length > 0 && this.cdkMajorVersion !== 1) {
      throw new Error('addV1DevDependencies() is not supported for CDK 2.x and above, use addDevDeps() instead');
    }

    this.addV1DependenciesByType(DependencyType.BUILD, ...deps);
  }

  private addConstructsDependency(requestedVersion: string | undefined) {
    const defaultConstructsVersion = this.cdkMajorVersion === 1 ? '^3.2.27' : '^10.0.5';
    const constructsVersion = requestedVersion ?? defaultConstructsVersion;

    const constructsMajorVersion = semver.minVersion(constructsVersion)?.major;
    if (!constructsMajorVersion) {
      throw new Error(`Cannot determine major version of constructs version '${constructsVersion}'`);
    }

    switch (this.cdkMajorVersion) {
      case 1:
        if (constructsMajorVersion !== 3) {
          throw new Error('AWS CDK 1.x requires constructs 3.x');
        }
        break;

      case 2:
        if (constructsMajorVersion !== 10) {
          throw new Error('AWS CDK 2.x requires constructs 10.x');
        }
        break;
    }

    this.project.deps.addDependency(`constructs@${constructsVersion}`, this.dependencyType);

    return constructsVersion;
  }

  /**
   * Addsa depdenencies on the AWS CDK framework (e.g. `@aws-cdk/core` for V1 or `aws-cdk-lib` for V1).
   */
  private addFrameworkDependency(options: AwsCdkDepsOptions) {
    switch (this.cdkMajorVersion) {
      case 1:
        this.addV1Dependencies('@aws-cdk/core');
        break;

      case 2:
        if (options.cdkDependencies !== undefined) {
          throw new Error('cdkDependencies is not used for CDK 2.x. Use "peerDeps" instead');
        }
        if (options.cdkDependenciesAsDeps !== undefined) {
          throw new Error('cdkDependenciesAsDeps is not used for CDK 2.x');
        }
        if (options.cdkTestDependencies !== undefined) {
          throw new Error('cdkTestDependencies is not used for CDK 2.x. Use "devDeps" instead');
        }

        this.project.deps.addDependency(`aws-cdk-lib@${this.cdkVersion}`, this.dependencyType);
        break;

      default:
        throw new Error(`Unsupported AWS CDK major version ${this.cdkMajorVersion}.x`);
    }
  }

  private addV1AssertionLibraryDependency(options: AwsCdkDepsOptions) {
    if (this.cdkMajorVersion !== 1) {
      if (options.cdkAssert !== undefined) {
        throw new Error('cdkAssert is not used for CDK 2.x. Use the assertions library that is provided in aws-cdk-lib');
      }
      if (options.cdkAssertions !== undefined) {
        throw new Error('cdkAssertion is not used for CDK 2.x. Use the assertions library that is provided in aws-cdk-lib');
      }

      return;
    }

    const testDeps = new Array<string>();
    if (options.cdkAssert) {
      testDeps.push('@aws-cdk/assert');
    }

    if (options.cdkAssertions ?? true) {
      testDeps.push('@aws-cdk/assertions');
    }

    this.addV1DependenciesByType(DependencyType.TEST, ...testDeps);
  }

  /**
   * Adds a set of dependencies with the user-specified dependency type.
   * @param deps The set of dependency specifications
   */
  private addV1DependenciesByType(type: DependencyType, ...modules: string[]) {
    for (const module of modules) {
      this.project.deps.addDependency(`${module}@${this.cdkVersion}`, type);
    }
  }
}