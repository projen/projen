import * as fs from "fs";
import * as path from "path";
import { AutoDiscover } from "./auto-discover";
import type { AwsCdkDeps, AwsCdkDepsCommonOptions } from "./awscdk-deps";
import { AwsCdkDepsJs } from "./awscdk-deps-js";
import { IntegRunner } from "./integ-runner";
import type { LambdaFunctionCommonOptions } from "./lambda-function";
import type { ConstructLibraryOptions } from "../cdk";
import { ConstructLibrary } from "../cdk";
import { Component } from "../component";
import { DependencyType } from "../dependencies";
import { dirContainsFile } from "../util/fs";

/**
 * Options for `AwsCdkConstructLibrary`.
 */
export interface AwsCdkConstructLibraryOptions
  extends ConstructLibraryOptions, AwsCdkDepsCommonOptions {
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
   * Automatically adds an `awscdk.SingletonFunction` for each
   * `.singleton-lambda.ts` handler in your source tree. If this is disabled, you can
   * manually add an `awscdk.AutoDiscover` component to your project.
   *
   * @default true
   */
  readonly singletonLambdaAutoDiscover?: boolean;

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
   * file under your test directory.
   *
   * @default true
   */
  readonly integrationTestAutoDiscover?: boolean;

  /**
   * Enable experimental support for the AWS CDK integ-runner.
   *
   * @default false
   * @experimental
   */
  readonly experimentalIntegRunner?: boolean;

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
    super({
      workflowNodeVersion: options.minNodeVersion ?? "lts/*",
      ...options,
      sampleCode: false,
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
      singletonLambdaAutoDiscover: options.singletonLambdaAutoDiscover ?? true,
      lambdaExtensionAutoDiscover: options.lambdaExtensionAutoDiscover ?? true,
      integrationTestAutoDiscover: options.integrationTestAutoDiscover ?? true,
    });

    if (options.experimentalIntegRunner) {
      new IntegRunner(this);
    }

    if (options.sampleCode ?? true) {
      new SampleCode(this);
    }
  }

  /**
   * The target CDK version for this library.
   */
  public get cdkVersion() {
    return this.cdkDeps.cdkVersion;
  }
}

class SampleCode extends Component {
  private readonly library: AwsCdkConstructLibrary;

  constructor(project: AwsCdkConstructLibrary) {
    super(project);
    this.library = project;
  }

  public synthesize() {
    const outdir = this.project.outdir;
    const srcdir = path.join(outdir, this.library.srcdir);

    // Don't pollute a source directory the user has already worked on.
    if (dirContainsFile(srcdir, ".ts")) {
      return;
    }

    const srcCode = `import { Construct } from 'constructs';

export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // define resources here...
  }
}`;

    fs.mkdirSync(srcdir, { recursive: true });
    fs.writeFileSync(path.join(srcdir, "index.ts"), srcCode);

    const testdir = path.join(outdir, this.library.testdir);
    if (!this.library.jest || dirContainsFile(testdir, ".ts")) {
      return;
    }

    const testCode = `import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { MyConstruct } from '../${this.library.srcdir}';

test('Snapshot', () => {
  const app = new App();
  const stack = new Stack(app, 'test');
  new MyConstruct(stack, 'MyConstruct');

  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
});`;

    fs.mkdirSync(testdir, { recursive: true });
    fs.writeFileSync(path.join(testdir, "my-construct.test.ts"), testCode);
  }
}
