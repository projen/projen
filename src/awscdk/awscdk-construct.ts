import * as semver from 'semver';
import { ConstructLibrary, ConstructLibraryOptions } from '../cdk';
import { AutoDiscover } from './auto-discover';
import { LambdaFunctionCommonOptions } from './lambda-function';

/**
 * Options for the construct-lib-aws project.
 */
export interface AwsCdkConstructLibraryOptions extends ConstructLibraryOptions {
  /**
   * Minimum target version this library is tested against.
   *
   * @default "2.0.0"
   * @featured
   */
  readonly cdkVersion: string;

  /**
   * Minimum target version of constructs being tested against. If not provided,
   * the default value depends on the configured `cdkVersion`:
   *
   * - For CDK 1.x, the default is "3.2.27"
   * - For CDK 2.x, the default is "10.0.5"
   * - Otherwise, the default is "*"
   *
   * @default - When the default behavior is used, the dependency on `constructs` will
   * be added as both a `peerDependency` and a `devDependency`.
   */
  readonly constructsVersion?: string;

  /**
   * Use pinned version instead of caret version for CDK.
   *
   * You can use this to prevent yarn to mix versions for your CDK dependencies and to prevent auto-updates.
   * If you use experimental features this will let you define the moment you include breaking changes.
   *
   * @default false
   */
  readonly cdkVersionPinning?: boolean;

  /**
   * Which AWS CDK modules (those that start with "@aws-cdk/") does this library
   * require when consumed?
   *
   * For CDK 2.x use 'peerDeps' instead
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
   * Not used for CDK 2.x
   *
   * @default true
   */
  readonly cdkDependenciesAsDeps?: boolean;

  /**
   * Install the @aws-cdk/assert library?
   *
   * @depricated - use cdkAssertions instead
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
   * @featured
   */
  readonly cdkTestDependencies?: string[];

  /**
   * Automatically adds an `aws_lambda.Function` for each `.lambda.ts` handler
   * in your source tree. If this is disabled, you either need to explicitly
   * call `aws_lambda.Function.autoDiscover()` or define a `new
   * aws_lambda.Function()` for each handler.
   *
   * @default true
   */
  readonly lambdaAutoDiscover?: boolean;

  /**
    * Common options for all AWS Lambda functions.
    *
    * @default - default options
    */
  readonly lambdaOptions?: LambdaFunctionCommonOptions;
}

/**
 * AWS CDK construct library project
 *
 * A multi-language (jsii) construct library which vends constructs designed to
 * use within the AWS CDK with a friendly workflow and automatic publishing to
 * the construct catalog.
 *
 * @pjid awscdk-construct
 */
export class AwsCdkConstructLibrary extends ConstructLibrary {
  /**
   * The target CDK version for this library.
   */
  public readonly cdkVersion: string;

  /**
   * Whether CDK dependencies are added as normal dependencies (and peer dependencies).
   */
  public readonly cdkDependenciesAsDeps: boolean;

  constructor(options: AwsCdkConstructLibraryOptions) {
    const cdkVersion = options.cdkVersionPinning ? options.cdkVersion : `^${options.cdkVersion}`;
    const cdkMajorVersion = semver.minVersion(cdkVersion)?.major ?? 2;
    super({
      ...options,
      peerDependencyOptions: cdkMajorVersion === 1 ? {
        pinnedDevDependency: false,
      } : undefined,
    });

    if (!options.cdkVersion) {
      throw new Error('Required field cdkVersion is not specified.');
    }
    this.cdkVersion = cdkVersion;

    this.cdkDependenciesAsDeps = options.cdkDependenciesAsDeps ?? true;

    if (options.constructsVersion) {
      const constructsMajorVersion = semver.minVersion(options.constructsVersion)?.major;
      if (constructsMajorVersion !== undefined &&
        constructsMajorVersion < 10 && cdkMajorVersion === 2) {
        throw new Error('CDK 2.x requires constructs version >= 10');
      }
      this.addPeerDeps(`constructs@^${options.constructsVersion}`);
    } else if (cdkMajorVersion === 1) {
      if (options.cdkAssert) {
        this.addDevDeps(this.formatModuleSpec('@aws-cdk/assert'));
      }
      if (options.cdkAssertions ?? true) {
        this.addDevDeps(this.formatModuleSpec('@aws-cdk/assertions'));
      }
      // CDK 1.x is built on constructs 3.x
      this.addPeerDeps('constructs@^3.2.27');
      this.addCdkDependencies(...options.cdkDependencies ?? []);
    } else if (cdkMajorVersion === 2) {
      // CDK 2.x is built on constructs 10.x
      this.addPeerDeps('constructs@^10.0.5');
      this.addPeerDeps(`aws-cdk-lib@${this.cdkVersion}`);

      options.cdkDependencies?.forEach(dep => {
        if (!dep.endsWith('-alpha')) {
          throw new Error('cdkDependencies for CDK 2.x should only include alpha packages');
        }
      });
    } else {
      // Otherwise, let the user manage which version they use
      this.addPeerDeps('constructs');
    }

    this.addCdkTestDependencies(...options.cdkTestDependencies ?? []);

    const lambdaAutoDiscover = options.lambdaAutoDiscover ?? true;
    if (lambdaAutoDiscover) {
      new AutoDiscover(this, {
        srcdir: this.srcdir,
        testdir: this.testdir,
        lambdaOptions: options.lambdaOptions,
      });
    }
  }

  /**
   * @deprecated use `cdkVersion`
   */
  public get version() {
    return this.cdkVersion;
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
    // this ugliness will go away in cdk v2.0
    this.addPeerDeps(...deps.map(m => this.formatModuleSpec(m)));

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
    this.addDevDeps(...deps.map(m => this.formatModuleSpec(m)));
  }

  private formatModuleSpec(module: string): string {
    return `${module}@${this.cdkVersion}`;
  }
}

/** @deprecated use `AwsCdkConstructLibraryOptions` */
export interface ConstructLibraryAwsOptions extends AwsCdkConstructLibraryOptions { }

/** @deprecated use `AwsCdkConstructLibrary` */
export class ConstructLibraryAws extends AwsCdkConstructLibrary { }
