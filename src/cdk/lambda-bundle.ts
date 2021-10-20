import { basename, dirname, extname, join, relative } from 'path';
import { pascal } from 'case';
import { Component } from '../component';
import { FileBase } from '../file';
import { SourceCode } from '../source-code';
import { Task } from '../tasks';
import { TypeScriptProject } from '../typescript';

const EXT = '.lambda.ts';

/**
 * Options for `LambdaBundle`.
 */
export interface BundledLambdaFunctionOptions {
  /**
   * A path from the project root directory to a TypeScript file which contains
   * the AWS Lambda handler entrypoint (exports a `handler` function).
   */
  readonly entrypoint: string;

  /**
   * The name of the generated TypeScript source file.
   *
   * @default - The name of the entrypoint file, without the `.lambda` extension.
   */
  readonly constructFile?: string;

  /**
   * The name of the generated `lambda.Function` subclass.
   *
   * @default - A pascal cased version of the name of the entrypoint file, with the extension removed.
   */
  readonly constructName?: string;
}

/**
 * Generates a pre-bundled AWS Lambda function construct from handler code.
 *
 * @example
 *
 * To use this, create an AWS Lambda handler file under your source tree with
 * the `.lambda.ts` extension and add a `BundledLambdaFunction` component to
 * your typescript project pointing to this entrypoint.
 *
 * ```ts
 * new BundledLambdaFunction(myProject, {
 *   entrypoint: 'src/foo.lambda.ts'
 * });
 * ```
 *
 * This will add a task to your "compile" step which will use `esbuild` to bundle
 * the handler code into the build directory. It will also generate a file `src/foo.ts`
 * with a custom AWS construct called `Foo` which extends `@aws-cdk/aws-lambda.Function`
 * which is bound to the bundled handle through an asset.
 */
export class BundledLambdaFunction extends Component {
  private readonly typescriptProject: TypeScriptProject;

  public readonly bundleTask: Task;

  /**
   * Defines a pre-bundled AWS Lambda function construct from handler code.
   *
   * @param project The project to use
   * @param options Options
   */
  constructor(project: TypeScriptProject, options: BundledLambdaFunctionOptions) {
    super(project);

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
    const constructFile = options.constructFile ?? `${basePath}.ts`;
    const constructFilePath = join(project.srcdir, constructFile);

    if (extname(constructFilePath) !== '.ts') {
      throw new Error(`Construct file name "${constructFile}" must have a .ts extension`);
    }

    const bundledirName = `${basePath}.bundle`;

    // type names
    const constructName = options.constructName ?? pascal(basename(basePath));
    const propsType = `${constructName}Props`;

    const src = new SourceCode(project, constructFilePath);
    src.line(`// ${FileBase.PROJEN_MARKER}`);
    src.line('import * as path from \'path\';');
    src.line('import * as lambda from \'@aws-cdk/aws-lambda\';');
    src.line('import { Construct } from \'@aws-cdk/core\';');
    src.line();
    src.open(`export interface ${propsType} extends lambda.FunctionOptions {`);
    src.close('}');
    src.line();
    src.open(`export class ${constructName} extends lambda.Function {`);
    src.open(`constructor(scope: Construct, id: string, props?: ${propsType}) {`);
    src.open('super(scope, id, {');
    src.line(`description: '${entrypoint}',`);
    src.line('...props,');
    src.line('runtime: lambda.Runtime.NODEJS_14_X,');
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
        '--target="node14"',
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