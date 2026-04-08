import * as TOML from "@iarna/toml";
import type { IConstruct } from "constructs";
import type { IResolver } from "./file";
import type { ObjectFileOptions } from "./object-file";
import { ObjectFile } from "./object-file";

/**
 * Options for `TomlFile`.
 */
export interface TomlFileOptions extends ObjectFileOptions {}

/**
 * Represents a TOML file.
 */
export class TomlFile extends ObjectFile {
  constructor(scope: IConstruct, filePath: string, options: TomlFileOptions) {
    super(scope, filePath, options);
  }

  protected synthesizeContent(resolver: IResolver): string | undefined {
    const json = super.synthesizeContent(resolver);
    if (!json) {
      return undefined;
    }

    return [
      ...(this.marker ? [`# ${this.marker}`] : []),
      "",
      TOML.stringify(JSON.parse(json)),
    ].join("\n");
  }
}
