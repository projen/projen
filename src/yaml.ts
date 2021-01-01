import * as YAML from 'yaml';
import { IResolver } from './file';
import { ObjectFile, ObjectFileOptions } from './object-file';
import { Project } from './project';

export interface YamlFileOptions extends ObjectFileOptions {
  /**
   * Adds the projen marker as a "YAML-comment" at the top of the file.
   *
   * @default false
   */
  readonly marker?: boolean;
}

export class YamlFile extends ObjectFile {

  /**
   * Indicates if the projen marker YAML-comment will be added to the output.
   */
  public readonly marker: boolean;

  constructor(project: Project, filePath: string, options: YamlFileOptions) {
    super(project, filePath, options);

    this.marker = options.marker ?? false;
  }

  protected synthesizeContent(resolver: IResolver) {
    // sanitize object references by serializing and deserializing to JSON
    const sanitized = JSON.parse(super.synthesizeContent(resolver));
    return [
      ... (this.marker ? [`# ${YamlFile.PROJEN_MARKER}`] : []),
      '',
      YAML.stringify(sanitized, { indent: 2 }),
    ].join('\n');
  }
}