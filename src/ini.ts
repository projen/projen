import { Construct } from "constructs";
import * as INI from "ini";
import { IResolver } from "./file";
import { ObjectFile, ObjectFileOptions } from "./object-file";

/**
 * Options for `IniFile`.
 */
export interface IniFileOptions extends ObjectFileOptions {}

/**
 * Represents an INI file.
 */
export class IniFile extends ObjectFile {
  constructor(scope: Construct, filePath: string, options: IniFileOptions) {
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
      INI.stringify(JSON.parse(json)),
    ].join("\n");
  }
}
