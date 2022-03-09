import * as path from "path";
import * as TOML from "@iarna/toml";
import { Construct, IConstruct } from "constructs";
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
  /**
   * Finds a TOML file by name in the given scope.
   * @param filePath The file path. If this path is relative, it will be resolved
   * from the root of the nearest project.
   */
  public static tryFindTomlFile(
    scope: IConstruct,
    filePath: string
  ): TomlFile | undefined {
    const isTomlFile = (c: IConstruct): c is TomlFile => c instanceof TomlFile;
    const absolutePath = path.isAbsolute(filePath)
      ? filePath
      : path.resolve(Project.ofProject(scope).outdir, filePath);
    return scope.node
      .findAll()
      .filter(isTomlFile)
      .find((file) => file.absolutePath === absolutePath);
  }
  constructor(scope: Construct, filePath: string, options: TomlFileOptions) {
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
