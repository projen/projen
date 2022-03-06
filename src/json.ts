import { Construct } from "constructs";
import { IResolver } from "./file";
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
}

/**
 * Represents a JSON file.
 */
export class JsonFile extends ObjectFile {
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
