import * as path from "path";
import { Construct, IConstruct } from "constructs";
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
  /**
   * Finds an INI file by name in the given scope.
   * @param filePath The file path. If this path is relative, it will be resolved
   * from the root of the nearest project.
   */
  public static tryFindIniFile(
    scope: IConstruct,
    filePath: string
  ): IniFile | undefined {
    const isIniFile = (c: IConstruct): c is IniFile => c instanceof IniFile;
    const absolutePath = path.isAbsolute(filePath)
      ? filePath
      : path.resolve(Project.ofProject(scope).outdir, filePath);
    return scope.node
      .findAll()
      .filter(isIniFile)
      .find((file) => file.absolutePath === absolutePath);
  }

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
