import * as TOML from '@iarna/toml';
import { IResolver } from './file';
import { MarkableFileOptions, IMarkableFile } from './markable-file';
import { ObjectFile, ObjectFileOptions } from './object-file';
import { Project } from './project';

export interface TomlFileOptions extends ObjectFileOptions, MarkableFileOptions {}

/**
 * TOML file
 */
export class TomlFile extends ObjectFile implements IMarkableFile {

  /**
   * Indicates if the projen marker TOML-comment will be added to the output.
   */
  public readonly marker: boolean;


  constructor(project: Project, filePath: string, options: TomlFileOptions) {
    super(project, filePath, options);

    if (!options.obj) {
      throw new Error('"obj" cannot be undefined');
    }

    this.marker = options.marker ?? false;
  }

  protected synthesizeContent(resolver: IResolver): string | undefined {
    return [
      ... (this.marker ? [`# ${TomlFile.PROJEN_MARKER}`] : []),
      '',
      TOML.stringify(resolver.resolve(this.obj)),
    ].join('\n');
  }
}
