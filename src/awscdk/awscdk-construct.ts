import * as semver from 'semver';
import { ConstructLibrary, ConstructLibraryOptions } from '../cdk';
import { DependencyType } from '../dependencies';
import { AutoDiscover } from './auto-discover';
import { AwsCdkDeps, AwsCdkDepsCommonOptions } from './awscdk-deps';
import { LambdaFunctionCommonOptions } from './lambda-function';

/**
 * Options for `AwsCdkConstructLibrary`.
 */
export interface AwsCdkConstructLibraryOptions extends ConstructLibraryOptions, AwsCdkDepsCommonOptions {
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
  public readonly cdkDeps: AwsCdkDeps;

  constructor(options: AwsCdkConstructLibraryOptions) {
    const cdkVersion = options.cdkVersion;
    const cdkMajorVersion = semver.minVersion(cdkVersion)?.major ?? 2;
    super({
      peerDependencyOptions: cdkMajorVersion === 1 ? {
        pinnedDevDependency: false,
      } : undefined,
      ...options,
    });

    this.cdkDeps = new AwsCdkDeps(this, {
      // since this we are a library, dependencies should be added a peers
      dependencyType: DependencyType.PEER,
      ...options,
    });

    const lambdaAutoDiscover = options.lambdaAutoDiscover ?? true;
    if (lambdaAutoDiscover) {
      new AutoDiscover(this, {
        srcdir: this.srcdir,
        testdir: this.testdir,
        lambdaOptions: options.lambdaOptions,
        tsconfigPath: this.tsconfigDev.fileName,
        cdkDeps: this.cdkDeps,
      });
    }
  }

  /**
   * The target CDK version for this library.
   */
  public get cdkVersion() {
    return this.cdkDeps.cdkVersion;
  }

  /**
   * Whether CDK dependencies are added as normal dependencies (and peer dependencies).
   * @deprecated Not used in v2
   */
  public get cdkDependenciesAsDeps() {
    return this.cdkDeps.cdkDependenciesAsDeps;
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
   * @deprecated Not used in v2
   */
  public addCdkDependencies(...deps: string[]) {
    return this.cdkDeps.addCdkDependencies(...deps);
  }

  /**
   * Adds CDK modules as test dependencies.
   *
   * @param deps names of cdk modules (e.g. `@aws-cdk/aws-lambda`).
   * @deprecated Not used in v2
   */
  public addCdkTestDependencies(...deps: string[]) {
    return this.cdkDeps.addCdkTestDependencies(...deps);
  }
}

/** @deprecated use `AwsCdkConstructLibraryOptions` */
export interface ConstructLibraryAwsOptions extends AwsCdkConstructLibraryOptions { }

/** @deprecated use `AwsCdkConstructLibrary` */
export class ConstructLibraryAws extends AwsCdkConstructLibrary { }
