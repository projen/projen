import * as semver from 'semver';
import { DependencyType } from '..';
import { Component } from '../component';
import { Project } from '../project';

/**
 * Options for `AwsCdkDeps`
 */
export interface AwsCdkDepsCommonOptions {
  /**
   * Version requirement for the the AWS CDK.
   *
   * @default "^2"
   */
  readonly cdkVersion: string;

  /**
    * Version requirement for the `constructs` library.
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
    * @deprecated Not supported any more: to pin your CDK version just set `cdkVersion` to a pinned version.
    */
  readonly cdkVersionPinning?: boolean;

  /**
    * Which AWS CDK modules (those that start with "@aws-cdk/") does this library
    * require when consumed?
    *
    * @deprecated - For CDK 2.x use 'peerDeps' instead
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
    * @deprecated - Not used for CDK 2.x
    */
  readonly cdkDependenciesAsDeps?: boolean;

  /**
    * Install the @aws-cdk/assert library?
    *
    * @deprecated - use cdkAssertions instead
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
    *
    *
    * @featured
    * @deprecated - For CDK 2.x use 'devDeps' instead
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
   * Whether CDK dependencies are added as normal dependencies (and peer dependencies).
   * @deprecated Not used for CDK 2.x
   */
  public readonly cdkDependenciesAsDeps: boolean;

  /**
   * The major version of the AWX CDK (e.g. 1, 2, ...)
   */
  public readonly majorVersion: number;

  private readonly dependencyType: DependencyType;

  constructor(project: Project, options: AwsCdkDepsOptions) {
    super(project);

    const cdkVersion = options.cdkVersion;
    const cdkMajorVersion = semver.minVersion(cdkVersion)?.major ?? 2;

    if (options.cdkVersionPinning) {
      throw new Error('"cdkVersionPinning" is deprecated, set "cdkVersion" to a pinned version');
    }

    this.dependencyType = options.dependencyType;
    this.majorVersion = cdkMajorVersion;
    this.cdkVersion = cdkVersion;
    this.cdkDependenciesAsDeps = options.cdkDependenciesAsDeps ?? true;

    const defaultConstructsVersion = cdkMajorVersion === 1 ? '^3.2.27' : '^10.0.5';
    const constructsVersion = options.constructsVersion ?? defaultConstructsVersion;
    const constructsMajorVersion = semver.minVersion(constructsVersion)?.major;
    if (!constructsMajorVersion) {
      throw new Error(`Cannot determine major version of constructs version '${constructsVersion}'`);
    }

    switch (cdkMajorVersion) {
      case 1:
        if (options.cdkAssert) {
          this.addDevDeps(this.formatModuleSpec('@aws-cdk/assert'));
        }
        if (options.cdkAssertions ?? true) {
          this.addDevDeps(this.formatModuleSpec('@aws-cdk/assertions'));
        }
        // CDK 1.x is built on constructs 3.x
        if (constructsMajorVersion !== undefined && constructsMajorVersion >= 10) {
          throw new Error('CDK 1.x requires constructs version < 10');
        }
        this.addCdkDependencies(...options.cdkDependencies ?? []);
        this.addCdkTestDependencies(...options.cdkTestDependencies ?? []);
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

        // CDK 2.x requires constructs ^10
        if (constructsMajorVersion !== 10) {
          throw new Error('CDK 2.x requires constructs 10.x');
        }

        this.addRuntimeDeps(`aws-cdk-lib@${this.cdkVersion}`);

        break;

      default:
        throw new Error(`Unsupported AWS CDK major version ${cdkMajorVersion}.x`);
    }

    this.addRuntimeDeps(`constructs@${constructsVersion}`);
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
   */
  public addCdkDependencies(...deps: string[]) {
    if (this.majorVersion !== 1) {
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
   */
  public addCdkTestDependencies(...deps: string[]) {
    if (this.majorVersion !== 1) {
      throw new Error('addCdkTestDependencies() is not supported for CDK 2.x and above, use addDevDeps() instead');
    }

    this.addDevDeps(...deps.map(m => this.formatModuleSpec(m)));
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