import * as path from "path";
import { pascal } from "case";
import { AwsCdkDeps } from "./awscdk-deps";
import {
  convertToPosixPath,
  TYPESCRIPT_EDGE_LAMBDA_EXT,
  TYPESCRIPT_LAMBDA_EXT,
} from "./internal";
import { Component } from "../component";
import { Bundler, BundlingOptions, Eslint } from "../javascript";
import { Project } from "../project";
import { SourceCode } from "../source-code";
import { TypeScriptProject } from "../typescript";
import { normalizePersistedPath } from "../util";

/**
 * Common options for `LambdaFunction`. Applies to all functions in
 * auto-discovery.
 */
export interface LambdaFunctionCommonOptions {
  /**
   * The node.js version to target.
   *
   * @default Runtime.NODEJS_18_X
   */
  readonly runtime?: LambdaRuntime;

  /**
   * Bundling options for this AWS Lambda function.
   *
   * If not specified the default bundling options specified for the project
   * `Bundler` instance will be used.
   *
   * @default - defaults
   */
  readonly bundlingOptions?: BundlingOptions;

  /**
   * Whether to automatically reuse TCP connections when working with the AWS
   * SDK for JavaScript.
   *
   * This sets the `AWS_NODEJS_CONNECTION_REUSE_ENABLED` environment variable
   * to `1`.
   *
   * Not applicable when `edgeLambda` is set to `true` because environment
   * variables are not supported in Lambda@Edge.
   *
   * @see https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/node-reusing-connections.html
   *
   * @default true
   */
  readonly awsSdkConnectionReuse?: boolean;

  /**
   * Whether to create a `cloudfront.experimental.EdgeFunction` instead
   * of a `lambda.Function`.
   *
   * @default false
   */
  readonly edgeLambda?: boolean;
}

/**
 * Options for `Function`.
 */
export interface LambdaFunctionOptions extends LambdaFunctionCommonOptions {
  /**
   * A path from the project root directory to a TypeScript file which contains
   * the AWS Lambda handler entrypoint (exports a `handler` function).
   *
   * This is relative to the root directory of the project.
   *
   * @example "src/subdir/foo.lambda.ts"
   */
  readonly entrypoint: string;

  /**
   * The name of the generated TypeScript source file. This file should also be
   * under the source tree.
   *
   * @default - The name of the entrypoint file, with the `-function.ts` suffix
   * instead of `.lambda.ts`.
   */
  readonly constructFile?: string;

  /**
   * The name of the generated `lambda.Function` subclass.
   *
   * @default - A pascal cased version of the name of the entrypoint file, with
   * the extension `Function` (e.g. `ResizeImageFunction`).
   */
  readonly constructName?: string;

  /**
   * AWS CDK dependency manager.
   */
  readonly cdkDeps: AwsCdkDeps;
}

/**
 * Generates a pre-bundled AWS Lambda function construct from handler code.
 *
 * To use this, create an AWS Lambda handler file under your source tree with
 * the `.lambda.ts` extension and add a `LambdaFunction` component to your
 * typescript project pointing to this entrypoint.
 *
 * This will add a task to your "compile" step which will use `esbuild` to
 * bundle the handler code into the build directory. It will also generate a
 * file `src/foo-function.ts` with a custom AWS construct called `FooFunction`
 * which extends `@aws-cdk/aws-lambda.Function` which is bound to the bundled
 * handle through an asset.
 *
 * @example
 *
 * new LambdaFunction(myProject, {
 *   srcdir: myProject.srcdir,
 *   entrypoint: 'src/foo.lambda.ts',
 * });
 */
export class LambdaFunction extends Component {
  /**
   * Defines a pre-bundled AWS Lambda function construct from handler code.
   *
   * @param project The project to use
   * @param options Options
   */
  constructor(project: Project, options: LambdaFunctionOptions) {
    super(project);

    const cdkDeps = options.cdkDeps;
    const bundler = Bundler.of(project);
    if (!bundler) {
      throw new Error(
        "No bundler found. Please add a Bundler component to your project."
      );
    }

    const runtime = options.runtime ?? LambdaRuntime.NODEJS_18_X;

    const entrypoint = normalizePersistedPath(options.entrypoint);

    // allow Lambda handler code to import dev-deps since they are only needed
    // during bundling
    const eslint = Eslint.of(project);
    eslint?.allowDevDeps(entrypoint);

    if (
      !entrypoint.endsWith(TYPESCRIPT_LAMBDA_EXT) &&
      !entrypoint.endsWith(TYPESCRIPT_EDGE_LAMBDA_EXT)
    ) {
      throw new Error(
        `${entrypoint} must have a ${TYPESCRIPT_LAMBDA_EXT} or ${TYPESCRIPT_EDGE_LAMBDA_EXT} extension`
      );
    }

    const basePath = path.posix.join(
      path.dirname(entrypoint),
      path.basename(
        entrypoint,
        options.edgeLambda ? TYPESCRIPT_EDGE_LAMBDA_EXT : TYPESCRIPT_LAMBDA_EXT
      )
    );
    const constructFile = options.constructFile ?? `${basePath}-function.ts`;

    if (path.extname(constructFile) !== ".ts") {
      throw new Error(
        `Construct file name "${constructFile}" must have a .ts extension`
      );
    }

    // type names
    const constructName =
      options.constructName ?? pascal(path.basename(basePath)) + "Function";
    const propsType = `${constructName}Props`;

    const bundle = bundler.addBundle(entrypoint, {
      target: runtime.esbuildTarget,
      platform: runtime.esbuildPlatform,
      externals: runtime.defaultExternals,
      ...options.bundlingOptions,
      tsconfigPath: (project as TypeScriptProject)?.tsconfigDev?.fileName,
    });

    // calculate the relative path between the directory containing the
    // generated construct source file to the directory containing the bundle
    // index.js by resolving them as absolute paths first.
    // e.g:
    //  - outfileAbs => `/project-outdir/assets/foo/bar/baz/foo-function/index.js`
    //  - constructAbs => `/project-outdir/src/foo/bar/baz/foo-function.ts`
    const outfileAbs = path.join(project.outdir, bundle.outfile);
    const constructAbs = path.join(project.outdir, constructFile);
    const relativeOutfile = path.relative(
      path.dirname(constructAbs),
      path.dirname(outfileAbs)
    );

    const src = new SourceCode(project, constructFile);
    if (src.marker) {
      src.line(`// ${src.marker}`);
    }
    src.line("import * as path from 'path';");

    if (cdkDeps.cdkMajorVersion === 1) {
      if (options.edgeLambda) {
        src.line("import * as cloudfront from '@aws-cdk/aws-cloudfront';");
        cdkDeps.addV1Dependencies("@aws-cdk/aws-cloudfront");
      }
      src.line("import * as lambda from '@aws-cdk/aws-lambda';");
      src.line("import { Construct } from '@aws-cdk/core';");
      cdkDeps.addV1Dependencies("@aws-cdk/aws-lambda");
      cdkDeps.addV1Dependencies("@aws-cdk/core");
    } else {
      if (options.edgeLambda) {
        src.line("import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';");
      }
      src.line("import * as lambda from 'aws-cdk-lib/aws-lambda';");
      src.line("import { Construct } from 'constructs';");
    }

    src.line();
    src.line("/**");
    src.line(` * Props for ${constructName}`);
    src.line(" */");
    if (options.edgeLambda) {
      src.open(
        `export interface ${propsType} extends cloudfront.experimental.EdgeFunctionProps {`
      );
    } else {
      src.open(
        `export interface ${propsType} extends lambda.FunctionOptions {`
      );
    }
    src.close("}");
    src.line();
    src.line("/**");
    src.line(
      ` * An AWS Lambda function which executes ${convertToPosixPath(
        basePath
      )}.`
    );
    src.line(" */");
    if (options.edgeLambda) {
      src.open(
        `export class ${constructName} extends cloudfront.experimental.EdgeFunction {`
      );
    } else {
      src.open(`export class ${constructName} extends lambda.Function {`);
    }
    src.open(
      `constructor(scope: Construct, id: string, props?: ${propsType}) {`
    );
    src.open("super(scope, id, {");
    src.line(`description: '${convertToPosixPath(entrypoint)}',`);
    src.line("...props,");
    src.line(
      `runtime: new lambda.Runtime('${runtime.functionRuntime}', lambda.RuntimeFamily.NODEJS),`
    );
    src.line("handler: 'index.handler',");
    src.line(
      `code: lambda.Code.fromAsset(path.join(__dirname, '${convertToPosixPath(
        relativeOutfile
      )}')),`
    );
    src.close("});");
    if ((options.awsSdkConnectionReuse ?? true) && !options.edgeLambda) {
      src.line(
        "this.addEnvironment('AWS_NODEJS_CONNECTION_REUSE_ENABLED', '1', { removeInEdge: true });"
      );
    }
    src.close("}");
    src.close("}");

    this.project.logger.verbose(
      `${basePath}: construct "${constructName}" generated under "${constructFile}"`
    );
    this.project.logger.verbose(
      `${basePath}: bundle task "${bundle.bundleTask.name}"`
    );
    if (bundle.watchTask) {
      this.project.logger.verbose(
        `${basePath}: bundle watch task "${bundle.watchTask.name}"`
      );
    }
  }
}

/**
 * Options for the AWS Lambda function runtime
 */
export interface LambdaRuntimeOptions {
  /**
   * Packages that are considered externals by default when bundling
   *
   * @default ['@aws-sdk/*']
   */
  readonly defaultExternals?: string[];
}

/**
 * The runtime for the AWS Lambda function.
 */
export class LambdaRuntime {
  /**
   * Node.js 10.x
   * @deprecated Node.js 10 runtime has been deprecated on Jul 30, 2021
   */
  public static readonly NODEJS_10_X = new LambdaRuntime(
    "nodejs10.x",
    "node10",
    { defaultExternals: ["aws-sdk"] }
  );

  /**
   * Node.js 12.x
   * @deprecated Node.js 12 runtime has been deprecated on Mar 31, 2023
   */
  public static readonly NODEJS_12_X = new LambdaRuntime(
    "nodejs12.x",
    "node12",
    { defaultExternals: ["aws-sdk"] }
  );

  /**
   * Node.js 14.x
   * @deprecated Node.js 14 runtime has been deprecated on Dec 4, 2023
   */
  public static readonly NODEJS_14_X = new LambdaRuntime(
    "nodejs14.x",
    "node14",
    { defaultExternals: ["aws-sdk"] }
  );

  /**
   * Node.js 16.x
   * @deprecated Node.js 16 runtime has been deprecated on Jun 12, 2024
   */
  public static readonly NODEJS_16_X = new LambdaRuntime(
    "nodejs16.x",
    "node16",
    { defaultExternals: ["aws-sdk"] }
  );

  /**
   * Node.js 18.x
   *
   * Advanced notice: Node.js 18 runtime will be deprecated on Jul 31, 2025
   */
  public static readonly NODEJS_18_X = new LambdaRuntime(
    "nodejs18.x",
    "node18"
  );

  /**
   * Node.js 20.x
   */
  public static readonly NODEJS_20_X = new LambdaRuntime(
    "nodejs20.x",
    "node20"
  );

  /**
   * Node.js 22.x
   */
  public static readonly NODEJS_22_X = new LambdaRuntime(
    "nodejs22.x",
    "node22"
  );  

  public readonly esbuildPlatform = "node";

  public readonly defaultExternals: string[];

  public constructor(
    /**
     * The Node.js runtime to use
     */
    public readonly functionRuntime: string,

    /**
     * The esbuild setting to use.
     */
    public readonly esbuildTarget: string,

    /**
     * Options for this runtime.
     */
    options?: LambdaRuntimeOptions
  ) {
    this.defaultExternals = options?.defaultExternals ?? ["@aws-sdk/*"];
  }
}
