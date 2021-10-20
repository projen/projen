import { basename, dirname, extname, join, relative } from 'path';
import { pascal } from 'case';
import { Component } from '../component';
import { FileBase } from '../file';
import { SourceCode } from '../source-code';
import { Task } from '../tasks';
import { TypeScriptProject } from '../typescript';

const EXT = '.lambda.ts';

/**
 * Options for `LambdaFunction`.
 */
export interface LambdaFunctionOptions {
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
   * The node.js version to target.
   *
   * @default LambdaFunctionRuntime.NODEJS_14_X
   */
  readonly runtime?: LambdaFunctionRuntime;
}

/**
 * Generates a pre-bundled AWS Lambda function construct from handler code.
 *
 * To use this, create an AWS Lambda handler file under your source tree with
 * the `.lambda.ts` extension and add a `BundledLambdaFunction` component to
 * your typescript project pointing to this entrypoint.
 *
 * This will add a task to your "compile" step which will use `esbuild` to bundle
 * the handler code into the build directory. It will also generate a file `src/foo.ts`
 * with a custom AWS construct called `Foo` which extends `@aws-cdk/aws-lambda.Function`
 * which is bound to the bundled handle through an asset.
 *
 * @example
 *
 * new BundledLambdaFunction(myProject, {
 *   entrypoint: 'src/foo.lambda.ts'
 * });
 */
export class LambdaFunction extends Component {
  private readonly typescriptProject: TypeScriptProject;

  public readonly bundleTask: Task;

  /**
   * Defines a pre-bundled AWS Lambda function construct from handler code.
   *
   * @param project The project to use
   * @param options Options
   */
  constructor(project: TypeScriptProject, options: LambdaFunctionOptions) {
    super(project);

    const runtime = options.runtime ?? LambdaFunctionRuntime.NODEJS_14_X;

    this.typescriptProject = project;

    // make sure entrypoint is within the source directory
    if (!options.entrypoint.startsWith(project.srcdir)) {
      throw new Error(`${options.entrypoint} must be under ${project.srcdir}`);
    }

    const entrypoint = relative(project.srcdir, options.entrypoint);

    if (!entrypoint.endsWith(EXT)) {
      throw new Error(`${entrypoint} must have a ${EXT} extension`);
    }

    const basePath = join(dirname(entrypoint), basename(entrypoint, EXT));
    const constructFile = options.constructFile ?? `${basePath}-function.ts`;
    const constructFilePath = join(project.srcdir, constructFile);

    if (extname(constructFilePath) !== '.ts') {
      throw new Error(`Construct file name "${constructFile}" must have a .ts extension`);
    }

    const bundledirName = `${basePath}.bundle`;

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
    src.line(`code: lambda.Code.fromAsset(path.join(__dirname, '${bundledirName}')),`);
    src.close('});');
    src.close('}');
    src.close('}');

    const entry = join(project.srcdir, entrypoint);
    const outfile = join(project.libdir, bundledirName, 'index.js');
    const bundle = project.addTask(`bundle:${basePath}`, {
      description: `Create an AWS Lambda bundle from ${entry}`,
      exec: [
        'esbuild',
        '--bundle',
        entry,
        `--target="${runtime.esbuildTarget}"`,
        '--platform="node"',
        `--outfile="${outfile}"`,
        '--external:aws-sdk',
      ].join(' '),
    });

    this.project.logger.info(`${basePath}: construct "${constructName}" generated under "${constructFilePath}"`);
    this.project.logger.info(`${basePath}: bundle task "${bundle.name}"`);

    // add this function to the bundle task
    this.projectBundleTask.spawn(bundle);
    this.bundleTask = bundle;;
  }

  /**
   * Returns the project-level "bundle" task.
   */
  private get projectBundleTask(): Task {
    let bundleTask = this.project.tasks.tryFind('bundle');
    if (!bundleTask) {
      bundleTask = this.project.addTask('bundle', { description: 'Bundle assets' });
      this.typescriptProject.compileTask.spawn(bundleTask);
    }

    return bundleTask;
  }
}

/**
 * The runtime for the AWS Lambda function.
 */
export class LambdaFunctionRuntime {
  /**
   * Node.js 10.x
   */
  public static readonly NODEJS_10_X = new LambdaFunctionRuntime('NODEJS_10_X', 'node10');

  /**
   * Node.js 12.x
   */
  public static readonly NODEJS_12_X = new LambdaFunctionRuntime('NODEJS_12_X', 'node12');

  /**
   * Node.js 14.x
   */
  public static readonly NODEJS_14_X = new LambdaFunctionRuntime('NODEJS_14_X', 'node14');

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
