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

    this.marker = options.marker ?? false;
  }

  protected synthesizeContent(resolver: IResolver): string | undefined {
    const json = super.synthesizeContent(resolver);
    if (!json) {
      return undefined;
    }

    return [
      ... (this.marker ? [`# ${TomlFile.PROJEN_MARKER}`] : []),
      '',
      TOML.stringify(JSON.parse(json)),
    ].join('\n');
  }
}
