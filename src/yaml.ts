import * as YAML from "yaml";
import { IResolver } from "./file";
import { ObjectFile, ObjectFileOptions } from "./object-file";
import { Project } from "./project";

/**
 * Options for `JsonFile`.
 */
export interface YamlFileOptions extends ObjectFileOptions {}

/**
 * Represents a YAML file.
 */
export class YamlFile extends ObjectFile {
  constructor(project: Project, filePath: string, options: YamlFileOptions) {
    super(project, filePath, options);
  }

  protected synthesizeContent(resolver: IResolver): string | undefined {
    const json = super.synthesizeContent(resolver);
    if (!json) {
      return undefined;
    }

    return [
      ...(this.marker ? [`# ${this.project.marker}`] : []),
      "",
      YAML.stringify(JSON.parse(json), { indent: 2 }),
    ].join("\n");
  }
}
