import { JsonFile, JsonFileOptions } from './json';
import * as YAML from 'yaml';
import { Project } from './project';
import { GENERATION_DISCLAIMER } from './common';

export interface YamlFileOptions extends JsonFileOptions {

}

export class YamlFile extends JsonFile {
  constructor(project: Project, filePath: string, options: YamlFileOptions) {
    super(project, filePath, options);
  }

  protected get data() {
    // sanitize object references by serializaing and deserializing to JSON
    const sanitized = JSON.parse(JSON.stringify(this.obj));
    return [
      `# ${GENERATION_DISCLAIMER}`,
      '',
      YAML.stringify(sanitized, { indent: 2 }),
    ].join('\n')
  }
}