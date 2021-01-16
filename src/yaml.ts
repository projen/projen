import * as YAML from 'yaml';
import { IResolver } from './file';
import { MarkableFileOptions, IMarkableFile } from './markable-file';
import { ObjectFile, ObjectFileOptions } from './object-file';
import { Project } from './project';

export interface YamlFileOptions extends ObjectFileOptions, MarkableFileOptions {}

export class YamlFile extends ObjectFile implements IMarkableFile {

  /**
   * Indicates if the projen marker YAML-comment will be added to the output.
   */
  public readonly marker: boolean;

  constructor(project: Project, filePath: string, options: YamlFileOptions) {
    super(project, filePath, options);

    this.marker = options.marker ?? false;
  }

  protected synthesizeContent(resolver: IResolver): string | undefined {
    const json = super.synthesizeContent(resolver);
    if (!json) {
      return undefined;
    }

    return [
      ... (this.marker ? [`# ${YamlFile.PROJEN_MARKER}`] : []),
      '',
      YAML.stringify(JSON.parse(json), { indent: 2 }),
    ].join('\n');
  }
}