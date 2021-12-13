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
    * @deprecated Not used for CDK 2.x
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

    const defaultConstructsVersion = this.cdkMajorVersion === 1 ? '^3.2.27' : '^10.0.5';
    this.constructsVersion = options.constructsVersion ?? defaultConstructsVersion;

    this.addCdkDependency(options);
    this.addRuntimeDeps(`constructs@${this.constructsVersion}`);
    this.addCdkDependencies(...options.cdkDependencies ?? []);
    this.addCdkTestDependencies(...options.cdkTestDependencies ?? []);
  }

  /**
   * Adds CDK modules as runtime dependencies.
   *
   * Modules are currently by default added with a caret CDK version both as "dependencies"
   * and "peerDependencies". This is because currently npm would not
   * automatically install peer dependencies that are not declared as concerete
   * dependencies by the consumer, so this is a little npm "hack" so that
   * consumers will not need to depend on them directly if they don't interact
   * with them.
   * See `cdkDependenciesAsDeps` for changing the default behavior.
   *
   * @param deps names of cdk modules (e.g. `@aws-cdk/aws-lambda`).
   * @deprecated not supported for CDK v2, use `deps` (for apps) or `peerDeps` (for libraries) instead
   */
  public addCdkDependencies(...deps: string[]) {
    if (deps.length > 0 && this.cdkMajorVersion !== 1) {
      throw new Error('addCdkDependencies() is not supported for CDK 2.x and above, use addDeps() or addPeerDeps() instead');
    }

    // this ugliness will go away in cdk v2.0
    this.addRuntimeDeps(...deps.map(m => this.formatModuleSpec(m)));

    if (this.cdkDependenciesAsDeps) {
      this.addDeps(...deps.map(m => this.formatModuleSpec(m)));
    } else {
      this.addDevDeps(...deps.map(m => this.formatModuleSpec(m)));
    }
  }

  /**
   * Adds CDK modules as test dependencies.
   *
   * @param deps names of cdk modules (e.g. `@aws-cdk/aws-lambda`).
   * @deprecated not supported for CDK v2, use `devDeps` instead
   */
  public addCdkTestDependencies(...deps: string[]) {
    if (deps.length > 0 && this.cdkMajorVersion !== 1) {
      throw new Error('addCdkTestDependencies() is not supported for CDK 2.x and above, use addDevDeps() instead');
    }

    this.addDevDeps(...deps.map(m => this.formatModuleSpec(m)));
  }

  private addCdkDependency(options: AwsCdkDepsOptions) {
    const constructsMajorVersion = semver.minVersion(this.constructsVersion)?.major;
    if (!constructsMajorVersion) {
      throw new Error(`Cannot determine major version of constructs version '${this.constructsVersion}'`);
    }

    switch (this.cdkMajorVersion) {
      case 1:
        if (options.cdkAssert) {
          this.addDevDeps(this.formatModuleSpec('@aws-cdk/assert'));
        }
        if (options.cdkAssertions ?? true) {
          this.addDevDeps(this.formatModuleSpec('@aws-cdk/assertions'));
        }
        if (constructsMajorVersion !== 3) {
          throw new Error('AWS CDK 1.x requires constructs 3.x');
        }

        this.addCdkDependencies('@aws-cdk/core');
        break;

      case 2:
        if (options.cdkAssert !== undefined) {
          throw new Error('cdkAssert is not used for CDK 2.x. Use the assertions library that is provided in aws-cdk-lib');
        }
        if (options.cdkDependencies !== undefined) {
          throw new Error('cdkDependencies is not used for CDK 2.x. Use "peerDeps" instead');
        }
        if (options.cdkDependenciesAsDeps !== undefined) {
          throw new Error('cdkDependenciesAsDeps is not used for CDK 2.x');
        }
        if (options.cdkTestDependencies !== undefined) {
          throw new Error('cdkTestDependencies is not used for CDK 2.x. Use "devDeps" instead');
        }
        if (constructsMajorVersion !== 10) {
          throw new Error('AWS CDK 2.x requires constructs 10.x');
        }

        this.addRuntimeDeps(`aws-cdk-lib@${this.cdkVersion}`);
        break;

      default:
        throw new Error(`Unsupported AWS CDK major version ${this.cdkMajorVersion}.x`);
    }
  }

  private formatModuleSpec(module: string): string {
    return `${module}@${this.cdkVersion}`;
  }

  private addDeps(...deps: string[]) {
    for (const dep of deps) {
      this.project.deps.addDependency(dep, DependencyType.RUNTIME);
    }
  }

  private addRuntimeDeps(...deps: string[]) {
    for (const dep of deps) {
      this.project.deps.addDependency(dep, this.dependencyType);
    }
  }

  private addDevDeps(...deps: string[]) {
    for (const dep of deps) {
      this.project.deps.addDependency(dep, DependencyType.BUILD);
    }
  }
}