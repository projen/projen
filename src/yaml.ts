import * as path from "path";
import { Construct, IConstruct } from "constructs";
import * as YAML from "yaml";
import { IResolver } from "./file";
import { ObjectFile, ObjectFileOptions } from "./object-file";
import { Project } from "./project";

/**
 * Options for `JsonFile`.
 */
export interface YamlFileOptions extends ObjectFileOptions {
  /**
   * Maximum line width (set to 0 to disable folding).
   *
   * @default - 0
   */
  readonly lineWidth?: number;
}

/**
 * Represents a YAML file.
 */
export class YamlFile extends ObjectFile {
  /**
   * Finds an XML file by name in the given scope.
   * @param filePath The file path. If this path is relative, it will be resolved
   * from the root of the nearest project.
   */
  public static tryFindYamlFile(
    scope: IConstruct,
    filePath: string
  ): YamlFile | undefined {
    const isYamlFile = (c: IConstruct): c is YamlFile => c instanceof YamlFile;
    const absolutePath = path.isAbsolute(filePath)
      ? filePath
      : path.resolve(Project.ofProject(scope).outdir, filePath);
    return scope.node
      .findAll()
      .filter(isYamlFile)
      .find((file) => file.absolutePath === absolutePath);
  }

  /**
   * Maximum line width (set to 0 to disable folding).
   */
  public lineWidth: number;

  constructor(scope: Construct, filePath: string, options: YamlFileOptions) {
    super(scope, filePath, options);
    this.lineWidth = options.lineWidth ?? 0;
  }

  protected synthesizeContent(resolver: IResolver): string | undefined {
    const json = super.synthesizeContent(resolver);
    if (!json) {
      return undefined;
    }

    return [
      ...(this.marker ? [`# ${this.marker}`] : []),
      "",
      YAML.stringify(JSON.parse(json), {
        indent: 2,
        lineWidth: this.lineWidth,
      }),
    ].join("\n");
  }
}
