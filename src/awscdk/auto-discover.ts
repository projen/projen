import { join } from 'path';
import * as glob from 'glob';
import { Component } from '../component';
import { Project } from '../project';
import { TYPESCRIPT_LAMBDA_EXT } from './internal';
import { LambdaFunction, LambdaFunctionCommonOptions } from './lambda-function';

/**
 * Options for `AutoDiscover`.
 */
export interface AutoDiscoverOptions {
  /**
   * Options for auto-discovery of AWS Lambda functions.
   */
  readonly lambdaOptions?: LambdaFunctionCommonOptions;

  /**
   * Project source tree (relative to project output directory).
   */
  readonly srcdir: string;

  /**
    * Output directory (where .js files go).
    */
  readonly libdir: string;
}

/**
 * Automatically creates a `LambdaFunction` for all `.lambda.ts` files under
 * the source directory of the project.
 */
export class AutoDiscover extends Component {
  private readonly options: AutoDiscoverOptions;

  constructor(project: Project, options: AutoDiscoverOptions) {
    super(project);

    this.options = options;
  }

  public preSynthesize() {
    const entrypoints = glob.sync(`**/*${TYPESCRIPT_LAMBDA_EXT}`, {
      cwd: join(this.project.outdir, this.options.srcdir),
    });

    for (const entrypoint of entrypoints) {
      new LambdaFunction(this.project, {
        libdir: this.options.libdir,
        srcdir: this.options.srcdir,
        entrypoint: join(this.options.srcdir, entrypoint),
        ...this.options.lambdaOptions,
      });
    }
  }
}