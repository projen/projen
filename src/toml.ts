import { FileBase, FileBaseOptions, IResolver } from './file';
import { Project } from './project';
import * as TOML from '@iarna/toml';

export interface TomlFileOptions extends FileBaseOptions {
  readonly obj: any;
}

export class TomlFile extends FileBase {
  protected readonly obj: object;

  constructor(project: Project, filePath: string, options: TomlFileOptions) {
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
