import * as YAML from 'yaml';
import { GENERATION_DISCLAIMER } from './common';
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
    // sanitize object references by serializaing and deserializing to JSON
    const sanitized = JSON.parse(JSON.stringify(resolver.resolve(this.obj)));
    return [
      `# ${GENERATION_DISCLAIMER}`,
      '',
      YAML.stringify(sanitized, { indent: 2 }),
    ].join('\n');
  }
}