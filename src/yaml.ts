import * as YAML from 'yaml';
import { IResolver } from './file';
import { JsonFile, JsonFileOptions } from './json';
import { Project } from './project';

export interface YamlFileOptions extends JsonFileOptions {

}

export class YamlFile extends JsonFile {
  constructor(project: Project, filePath: string, options: YamlFileOptions) {
    super(project, filePath, options);
  }

  protected synthesizeContent(resolver: IResolver) {
    // sanitize object references by serializing and deserializing to JSON
    const sanitized = JSON.parse(super.synthesizeContent(resolver));
    return [
      `# ${YamlFile.PROJEN_MARKER}`,
      '',
      YAML.stringify(sanitized, { indent: 2 }),
    ].join('\n');
  }
}