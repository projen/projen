import * as YAML from 'yaml';
import { GENERATION_DISCLAIMER } from './common';
import { IComponentScope } from './component';
import { IResolver } from './file';
import { JsonFile, JsonFileOptions } from './json';

export interface YamlFileOptions extends JsonFileOptions {

}

export class YamlFile extends JsonFile {
  constructor(project: IComponentScope, filePath: string, options: YamlFileOptions) {
    super(project, filePath, options);
  }

  protected synthesizeContent(resolver: IResolver) {
    // sanitize object references by serializing and deserializing to JSON
    const sanitized = JSON.parse(JSON.stringify(resolver.resolve(this.obj)));
    return [
      `# ${GENERATION_DISCLAIMER}`,
      '',
      YAML.stringify(sanitized, { indent: 2 }),
    ].join('\n');
  }
}