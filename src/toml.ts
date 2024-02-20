import * as TOML from "@iarna/toml";
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

    // Convert the JSON content to a TOML string
    let tomlString = TOML.stringify(JSON.parse(json));

    // Trim leading spaces for each line
    const fixedTomlString = tomlString
      .split("\n")
      .map((line) => line.trim())
      .join("\n");

    // Include the marker
    return [
      ...(this.marker ? [`# ${this.marker}`] : []),
      "",
      fixedTomlString,
    ].join("\n");
  }
}
