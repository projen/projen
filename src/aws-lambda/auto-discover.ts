import { join } from 'path';
import * as glob from 'glob';
import { Function, FunctionCommonOptions } from '.';
import { Project } from '..';
import { Component } from '../component';
import { TYPESCRIPT_LAMBDA_EXT } from './consts';

/**
 * Options for `AutoDiscover`.
 */
export interface AutoDiscoverOptions extends FunctionCommonOptions {
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
      new Function(this.project, {
        entrypoint: join(this.options.srcdir, entrypoint),
        ...this.options,
      });
    }
  }
}