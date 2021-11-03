import { basename, dirname, extname, join, relative } from 'path';
import { pascal } from 'case';
import { Eslint, Project } from '..';
import { Component } from '../component';
import { FileBase } from '../file';
import { Bundler } from '../javascript/bundler';
import { SourceCode } from '../source-code';
import { Task } from '../tasks';
import { TYPESCRIPT_LAMBDA_EXT } from './internal';

/**
 * Common options for `LambdaFunction`. Applies to all functions in
 * auto-discovery.
 */
export interface LambdaFunctionCommonOptions {
  /**
   * The node.js version to target.
   *
   * @default Runtime.NODEJS_14_X
   */
  readonly runtime?: LambdaRuntime;

  /**
   * Names of modules which should not be included in the bundle.
   *
   * @default - by default, the "aws-sdk" module will be excluded from the
   * bundle. Note that if you use this option you will need to add "aws-sdk"
   * explicitly.
   */
  readonly externals?: string[];
}

/**
 * Options for `Function`.
 */
export interface LambdaFunctionOptions extends LambdaFunctionCommonOptions {
  /**
   * A path from the project root directory to a TypeScript file which contains
   * the AWS Lambda handler entrypoint (exports a `handler` function).
   */
  readonly entrypoint: string;

  /**
   * The name of the generated TypeScript source file.
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
   * Project source directory tree (where .ts files live).
   */
  readonly srcdir: string;

  /**
    * JavaScript output directory (where .js files go).
    */
  readonly libdir: string;
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
 *   entrypoint: 'src/foo.lambda.ts',
 *   srcdir: myProject.srcdir,
 *   libdir: myProject.libdir,
 * });
 */
export class LambdaFunction extends Component {
  /**
   * The bundle task for this function.
   */
  public readonly bundleTask: Task;

  /**
   * Defines a pre-bundled AWS Lambda function construct from handler code.
   *
   * @param project The project to use
   * @param options Options
   */
  constructor(project: Project, options: LambdaFunctionOptions) {
    super(project);

    const bundler = Bundler.of(project);
    if (!bundler) {
      throw new Error('No bundler found. Please add a Bundler component to your project.');
    }

    const runtime = options.runtime ?? LambdaRuntime.NODEJS_14_X;

    // make sure entrypoint is within the source directory
    if (!options.entrypoint.startsWith(options.srcdir)) {
      throw new Error(`${options.entrypoint} must be under ${options.srcdir}`);
    }

    // allow Lambda handler code to import dev-deps since they are only needed
    // during bundling
    const eslint = Eslint.of(project);
    eslint?.allowDevDeps(options.entrypoint);

    const entrypoint = relative(options.srcdir, options.entrypoint);

    if (!entrypoint.endsWith(TYPESCRIPT_LAMBDA_EXT)) {
      throw new Error(`${entrypoint} must have a ${TYPESCRIPT_LAMBDA_EXT} extension`);
    }

    const basePath = join(dirname(entrypoint), basename(entrypoint, TYPESCRIPT_LAMBDA_EXT));
    const constructFile = options.constructFile ?? `${basePath}-function.ts`;
    const constructFilePath = join(options.srcdir, constructFile);

    if (extname(constructFilePath) !== '.ts') {
      throw new Error(`Construct file name "${constructFile}" must have a .ts extension`);
    }

    const bundledirName = `${basePath}.lambda.bundle`;

    // type names
    const constructName = options.constructName ?? pascal(basename(basePath)) + 'Function';
    const propsType = `${constructName}Props`;

    const src = new SourceCode(project, constructFilePath);
    src.line(`// ${FileBase.PROJEN_MARKER}`);
    src.line('import * as path from \'path\';');
    src.line('import * as lambda from \'@aws-cdk/aws-lambda\';');
    src.line('import { Construct } from \'@aws-cdk/core\';');
    src.line();
    src.line('/**');
    src.line(` * Props for ${constructName}`);
    src.line(' */');
    src.open(`export interface ${propsType} extends lambda.FunctionOptions {`);
    src.close('}');
    src.line();
    src.line('/**');
    src.line(` * An AWS Lambda function which executes ${basePath}.`);
    src.line(' */');
    src.open(`export class ${constructName} extends lambda.Function {`);
    src.open(`constructor(scope: Construct, id: string, props?: ${propsType}) {`);
    src.open('super(scope, id, {');
    src.line(`description: '${entrypoint}',`);
    src.line('...props,');
    src.line(`runtime: lambda.Runtime.${runtime.functionRuntime},`);
    src.line('handler: \'index.handler\',');
    src.line(`code: lambda.Code.fromAsset(path.join(__dirname, '${basename(bundledirName)}')),`);
    src.close('});');
    src.close('}');
    src.close('}');

    const entry = join(options.srcdir, entrypoint);
    const outfile = join(options.libdir, bundledirName, 'index.js');

    this.bundleTask = bundler.addBundle(basePath, {
      entrypoint: entry,
      outfile: outfile,
      target: runtime.esbuildTarget,
      platform: runtime.esbuildPlatform,
      externals: options.externals ?? ['aws-sdk'],
    });

    this.project.logger.verbose(`${basePath}: construct "${constructName}" generated under "${constructFilePath}"`);
    this.project.logger.verbose(`${basePath}: bundle task "${this.bundleTask.name}"`);
  }
}

/**
 * The runtime for the AWS Lambda function.
 */
export class LambdaRuntime {
  /**
   * Node.js 10.x
   */
  public static readonly NODEJS_10_X = new LambdaRuntime('NODEJS_10_X', 'node10');

  /**
   * Node.js 12.x
   */
  public static readonly NODEJS_12_X = new LambdaRuntime('NODEJS_12_X', 'node12');

  /**
   * Node.js 14.x
   */
  public static readonly NODEJS_14_X = new LambdaRuntime('NODEJS_14_X', 'node14');

  public readonly esbuildPlatform = 'node';

  private constructor(
    /**
     * The aws-lambda.Runtime member name to use.
     */
    public readonly functionRuntime: string,

    /**
     * The esbuild setting to use.
     */
    public readonly esbuildTarget: string) {
  }
}
