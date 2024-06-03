import { IConstruct } from "constructs";
import { ObjectFile, ObjectFileOptions } from "./object-file";

/**
 * Options for `JsonFile`.
 */
export interface JsonFileOptions extends ObjectFileOptions {
  /**
   * Adds a newline at the end of the file.
   * @default true
   */
  readonly newline?: boolean;

  /**
   * Allow the use of comments in this file.
   * @default - false for .json files, true for .json5 and .jsonc files
   */
  readonly allowComments?: boolean;

  /**
   * The number of spaces to use when indenting code.
   *
   * @default 2
   */
  readonly indent?: number;
}

/**
 * Represents a JSON file.
 */
export class JsonFile extends ObjectFile {
  private readonly newline: boolean;

  /**
   * The number of spaces to use when indenting code.
   */
  public readonly indent: number;

  readonly supportsComments: boolean;

  constructor(scope: IConstruct, filePath: string, options: JsonFileOptions) {
    super(scope, filePath, options);

    this.newline = options.newline ?? true;
    this.indent = options.indent ?? 2;
    this.supportsComments =
      options.allowComments ??
      (filePath.toLowerCase().endsWith("json5") ||
        filePath.toLowerCase().endsWith("jsonc"));

    if (!options.obj) {
      throw new Error('"obj" cannot be undefined');
    }
  }

  protected stringifyContent(obj: any): string {
    if (this.marker && !this.supportsComments) {
      obj["//"] = this.marker;
    }

    let content = JSON.stringify(obj, undefined, this.indent);
    if (this.marker && this.supportsComments) {
      content = `// ${this.marker}\n${content}`;
    }

    if (this.newline) {
      content += "\n";
    }

    return content;
  }
}
