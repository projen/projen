import * as semver from "semver";
import { AutoDiscover } from "./auto-discover";
import { AwsCdkDeps, AwsCdkDepsCommonOptions } from "./awscdk-deps";
import { AwsCdkDepsJs } from "./awscdk-deps-js";
import { LambdaFunctionCommonOptions } from "./lambda-function";
import { ConstructLibrary, ConstructLibraryOptions } from "../cdk";
import { DependencyType } from "../dependencies";

/**
 * Options for `AwsCdkConstructLibrary`.
 */
export interface AwsCdkConstructLibraryOptions
  extends ConstructLibraryOptions,
    AwsCdkDepsCommonOptions {
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
   * Automatically adds an `cloudfront.experimental.EdgeFunction` for each
   * `.edge-lambda.ts` handler in your source tree. If this is disabled, you can
   * manually add an `awscdk.AutoDiscover` component to your project.
   *
   * @default true
   */
  readonly edgeLambdaAutoDiscover?: boolean;

  /**
   * Automatically adds an `awscdk.LambdaExtension` for each `.lambda-extension.ts`
   * entrypoint in your source tree. If this is disabled, you can manually add an
   * `awscdk.AutoDiscover` component to your project
   *
   * @default true
   */
  readonly lambdaExtensionAutoDiscover?: boolean;

  /**
   * Automatically discovers and creates integration tests for each `.integ.ts`
   * file in under your test directory.
   *
   * @default true
   */
  readonly integrationTestAutoDiscover?: boolean;

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
    const cdkMajorVersion = semver.parse(options.cdkVersion)?.major;

    super({
      peerDependencyOptions:
        cdkMajorVersion === 1
          ? {
              pinnedDevDependency: false,
            }
          : undefined,
      workflowNodeVersion: options.minNodeVersion ?? "16.x",
      ...options,
    });

    this.cdkDeps = new AwsCdkDepsJs(this, {
      // since this we are a library, dependencies should be added a peers
      dependencyType: DependencyType.PEER,
      ...options,
    });

    new AutoDiscover(this, {
      srcdir: this.srcdir,
      testdir: this.testdir,
      lambdaOptions: options.lambdaOptions,
      tsconfigPath: this.tsconfigDev.fileName,
      cdkDeps: this.cdkDeps,
      lambdaAutoDiscover: options.lambdaAutoDiscover ?? true,
      edgeLambdaAutoDiscover: options.edgeLambdaAutoDiscover ?? true,
      lambdaExtensionAutoDiscover: options.lambdaExtensionAutoDiscover ?? true,
      integrationTestAutoDiscover: options.integrationTestAutoDiscover ?? true,
    });
  }

  /**
   * The target CDK version for this library.
   */
  public get cdkVersion() {
    return this.cdkDeps.cdkVersion;
  }

  /**
   * @deprecated use `cdkVersion`
   */
  public get version() {
    return this.cdkVersion;
  }

  /**
   * Adds dependencies to AWS CDK modules.
   *
   * Since this is a library project, dependencies will be added as peer dependencies.
   *
   * @param deps names of cdk modules (e.g. `@aws-cdk/aws-lambda`).
   * @deprecated Not supported in v2. For v1, use `project.cdkDeps.addV1Dependencies()`
   */
  public addCdkDependencies(...deps: string[]) {
    return this.cdkDeps.addV1Dependencies(...deps);
  }

  /**
   * Adds AWS CDK modules as dev dependencies.
   *
   * @param deps names of cdk modules (e.g. `@aws-cdk/aws-lambda`).
   * @deprecated Not supported in v2. For v1, use `project.cdkDeps.addV1DevDependencies()`
   */
  public addCdkTestDependencies(...deps: string[]) {
    return this.cdkDeps.addV1DevDependencies(...deps);
  }
}

/** @deprecated use `AwsCdkConstructLibraryOptions` */
export interface ConstructLibraryAwsOptions
  extends AwsCdkConstructLibraryOptions {}

/** @deprecated use `AwsCdkConstructLibrary` */
export class ConstructLibraryAws extends AwsCdkConstructLibrary {}
