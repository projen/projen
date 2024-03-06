import * as json2toml from "json2toml";
import { IResolver } from "./file";
import { ObjectFile, ObjectFileOptions } from "./object-file";
import { Project } from "./project";

/**
 * Options for `TomlFile`.
 */
export interface TomlFileOptions extends ObjectFileOptions {}

/**
 * Represents a TOML file.
 */
export class TomlFile extends ObjectFile {
  constructor(project: Project, filePath: string, options: TomlFileOptions) {
    super(project, filePath, options);
  }

  protected synthesizeContent(resolver: IResolver): string | undefined {
    const json = super.synthesizeContent(resolver);
    if (!json) {
      return undefined;
    }

    // Convert JSON content to TOML string
    let tomlString = json2toml(JSON.parse(json), {
      indent: 0,
      newlineAfterSection: true,
    });

    // Include the marker
    return [...(this.marker ? [`# ${this.marker}`] : []), "", tomlString].join(
      "\n"
    );
  }
}
