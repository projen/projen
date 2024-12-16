import { basename, dirname, join, relative } from "path";
import { pascal } from "case";
import { AwsCdkDeps } from "./awscdk-deps";
import {
  convertToPosixPath,
  TYPESCRIPT_LAMBDA_EXTENSION_EXT,
} from "./internal";
import { LambdaRuntime } from "./lambda-function";
import { Component } from "../component";
import { Bundler, BundlingOptions, Eslint } from "../javascript";
import { Project } from "../project";
import { SourceCode } from "../source-code";

/**
 * Common options for creating lambda extensions.
 */
export interface LambdaExtensionCommonOptions {
  /**
   * The extension's compatible runtimes.
   */
  readonly compatibleRuntimes?: LambdaRuntime[];

  /**
   * Bundling options for this AWS Lambda extension.
   *
   * If not specified the default bundling options specified for the project
   * `Bundler` instance will be used.
   *
   * @default - defaults
   */
  readonly bundlingOptions?: BundlingOptions;
}

/**
 * Options for creating lambda extensions.
 */
export interface LambdaExtensionOptions extends LambdaExtensionCommonOptions {
  /**
   * Name of the extension
   *
   * @default - Derived from the entrypoint filename.
   */
  readonly name?: string;

  /**
   * A path from the project root directory to a TypeScript file which contains
   * the AWS Lambda extension entrypoint (stand-alone script).
   *
   * This is relative to the root directory of the project.
   *
   * @example "src/subdir/foo.lambda-extension.ts"
   */
  readonly entrypoint: string;

  /**
   * AWS CDK dependency manager.
   */
  readonly cdkDeps: AwsCdkDeps;

  /**
   * The name of the generated TypeScript source file. This file should also be
   * under the source tree.
   *
   * @default - The name of the entrypoint file, with the `-layer-version.ts`
   * suffix instead of `.lambda-extension.ts`.
   */
  readonly constructFile?: string;

  /**
   * The name of the generated `lambda.LayerVersion` subclass.
   *
   * @default - A pascal cased version of the name of the entrypoint file, with
   * the extension `LayerVersion` (e.g. `AppConfigLayerVersion`).
   */
  readonly constructName?: string;
}

/**
 * Create a Lambda Extension
 */
export class LambdaExtension extends Component {
  constructor(project: Project, options: LambdaExtensionOptions) {
    super(project);

    const basePath = join(
      dirname(options.entrypoint),
      basename(options.entrypoint, TYPESCRIPT_LAMBDA_EXTENSION_EXT)
    );

    const name = options.name ?? basename(basePath);

    const bundler = Bundler.of(project);
    if (!bundler) {
      throw new Error(
        "No bundler found. Please add a Bundler component to your project."
      );
    }

    const compatibleRuntimes = options.compatibleRuntimes ?? [
      LambdaRuntime.NODEJS_22_X,
      LambdaRuntime.NODEJS_20_X,
      LambdaRuntime.NODEJS_18_X,
      LambdaRuntime.NODEJS_16_X,
      LambdaRuntime.NODEJS_14_X,
      LambdaRuntime.NODEJS_12_X,
    ];

    if (compatibleRuntimes.length === 0) {
      throw new Error("Compatible runtimes must include at least one runtime");
    }

    // Use the lowest runtime version to bundle
    const [bundlerRuntime] = compatibleRuntimes.sort((a, b) =>
      a.functionRuntime.localeCompare(b.functionRuntime)
    );

    // Allow extension code to import dev-deps since they are only needed
    // during bundling
    const eslint = Eslint.of(project);
    eslint?.allowDevDeps(options.entrypoint);

    const bundle = bundler.addBundle(options.entrypoint, {
      platform: bundlerRuntime.esbuildPlatform,
      target: bundlerRuntime.esbuildTarget,
      externals: bundlerRuntime.defaultExternals,
      outfile: `extensions/${name}`,
      // Make the output executable because Lambda expects to run
      // extensions as stand-alone programs alongside the main lambda
      // process.
      executable: true,
      ...options.bundlingOptions,
    });

    const constructFile =
      options.constructFile ?? `${basePath}-layer-version.ts`;

    new LambdaLayerConstruct(project, {
      constructFile: constructFile,
      constructName: options.constructName,
      assetDir: bundle.outdir,
      compatibleRuntimes: compatibleRuntimes,
      description: `Provides a Lambda Extension \`${name}\` from ${convertToPosixPath(
        options.entrypoint
      )}`,
      cdkDeps: options.cdkDeps,
    });
  }
}

interface LambdaLayerConstructOptions {
  readonly assetDir: string;
  readonly compatibleRuntimes: LambdaRuntime[];
  readonly description: string;
  readonly constructFile: string;
  readonly constructName?: string;
  readonly cdkDeps: AwsCdkDeps;
}

class LambdaLayerConstruct extends SourceCode {
  constructor(project: Project, options: LambdaLayerConstructOptions) {
    super(project, options.constructFile);

    const src = this;
    const cdkDeps = options.cdkDeps;

    const constructName =
      options.constructName ?? pascal(basename(options.constructFile, ".ts"));
    const propsType = `${constructName}Props`;

    const assetDir = relative(dirname(options.constructFile), options.assetDir);

    if (src.marker) {
      src.line(`// ${src.marker}`);
    }
    src.line("import * as path from 'path';");

    if (cdkDeps.cdkMajorVersion === 1) {
      src.line("import * as lambda from '@aws-cdk/aws-lambda';");
      src.line("import { Construct } from '@aws-cdk/core';");
      cdkDeps.addV1Dependencies("@aws-cdk/aws-lambda");
      cdkDeps.addV1Dependencies("@aws-cdk/core");
    } else {
      src.line("import * as lambda from 'aws-cdk-lib/aws-lambda';");
      src.line("import { Construct } from 'constructs';");
    }

    src.line();

    src.line("/**");
    src.line(` * Props for ${constructName}`);
    src.line(" */");
    src.open(
      `export interface ${propsType} extends lambda.LayerVersionOptions {`
    );
    src.close("}");
    src.line();

    src.line("/**");
    src.line(` * ${options.description}`);
    src.line(" */");
    src.open(`export class ${constructName} extends lambda.LayerVersion {`);
    src.open(
      `constructor(scope: Construct, id: string, props?: ${propsType}) {`
    );

    src.open("super(scope, id, {");
    src.line(`description: ${encodeCodeString(options.description)},`);
    src.line("...props,");

    src.open("compatibleRuntimes: [");
    for (const runtime of options.compatibleRuntimes) {
      src.line(
        `new lambda.Runtime('${runtime.functionRuntime}', lambda.RuntimeFamily.NODEJS),`
      );
    }
    src.close("],");

    src.open(`code: lambda.Code.fromAsset(path.join(__dirname,`);
    src.line(`${encodeCodeString(convertToPosixPath(assetDir))})),`);
    src.close();
    src.close("});");

    src.close("}");
    src.close("}");
  }
}

/**
 * Encodes a string for embedding in source code.
 */
function encodeCodeString(value: string) {
  const json = JSON.stringify(value);
  const escapedString = json.substring(1, json.length - 1).replace(/'/g, "\\'");
  return `'${escapedString}'`;
}
