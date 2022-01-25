import * as INI from "ini";
import { IResolver } from "./file";
import { ObjectFile, ObjectFileOptions } from "./object-file";
import { Project } from "./project";

/**
 * Options for `IniFile`.
 */
export interface IniFileOptions extends ObjectFileOptions {}

/**
 * Represents an INI file.
 */
export class IniFile extends ObjectFile {
  constructor(project: Project, filePath: string, options: IniFileOptions) {
    super(project, filePath, options);
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
