import * as path from "path";
import { Construct, IConstruct } from "constructs";
import { IResolver } from "./file";
import { ObjectFile, ObjectFileOptions } from "./object-file";
import { Project } from "./project";

/**
 * Options for `JsonFile`.
 */
export interface JsonFileOptions extends ObjectFileOptions {
  /**
   * Adds a newline at the end of the file.
   * @default true
   */
  readonly newline?: boolean;
}

/**
 * Represents a JSON file.
 */
export class JsonFile extends ObjectFile {
  /**
   * Finds a JSON file by name in the given scope.
   * @param filePath The file path. If this path is relative, it will be resolved
   * from the root of the nearest project.
   */
  public static tryFindJsonFile(
    scope: IConstruct,
    filePath: string
  ): ObjectFile | undefined {
    const isObjectFile = (c: IConstruct): c is ObjectFile =>
      c instanceof ObjectFile;
    const absolutePath = path.isAbsolute(filePath)
      ? filePath
      : path.resolve(Project.ofProject(scope).outdir, filePath);
    return scope.node
      .findAll()
      .filter(isObjectFile)
      .find((file) => file.absolutePath === absolutePath);
  }

  private readonly newline: boolean;

  constructor(scope: Construct, filePath: string, options: JsonFileOptions) {
    super(scope, filePath, options);

    this.newline = options.newline ?? true;

    if (!options.obj) {
      throw new Error('"obj" cannot be undefined');
    }
  }

  protected synthesizeContent(resolver: IResolver): string | undefined {
    const json = super.synthesizeContent(resolver);
    if (!json) {
      return undefined;
    }

    const sanitized = JSON.parse(json);

    if (this.marker) {
      sanitized["//"] = this.marker;
    }

    let content = JSON.stringify(sanitized, undefined, 2);
    if (this.newline) {
      content += "\n";
    }

    return content;
  }
}
