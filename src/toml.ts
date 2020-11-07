import * as TOML from '@iarna/toml';
import { IComponentScope } from './component';
import { FileBase, FileBaseOptions, IResolver } from './file';

export interface TomlFileOptions extends FileBaseOptions {
  /**
   * Object to render in the TOML file.
   */
  readonly obj: any;
}

/**
 * TOML file
 */
export class TomlFile extends FileBase {
  protected readonly obj: object;

  constructor(project: IComponentScope, filePath: string, options: TomlFileOptions) {
    super(project, filePath, options);

    if (!options.obj) {
      throw new Error('"obj" cannot be undefined');
    }

    this.obj = options.obj;
  }

  protected synthesizeContent(resolver: IResolver) {
    return TOML.stringify(resolver.resolve(this.obj));
  }
}
