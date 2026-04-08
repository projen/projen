import * as INI from "ini";
import type { IResolver } from "./file";
import type { ObjectFileOptions } from "./object-file";
import { ObjectFile } from "./object-file";
import type { Project } from "./project";

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
