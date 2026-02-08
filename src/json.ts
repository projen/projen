import { IConstruct } from "constructs";
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

  /**
   * Allow the use of comments in this file.
   * @default - false for .json files, true for .json5 and .jsonc files
   */
  readonly allowComments?: boolean;
}

/**
 * Represents a JSON file.
 */
export class JsonFile extends ObjectFile {
  private readonly newline: boolean;
  readonly supportsComments: boolean;

  constructor(scope: IConstruct, filePath: string, options: JsonFileOptions) {
    super(scope, filePath, options);

    this.newline = options.newline ?? true;
    this.supportsComments =
      options.allowComments ??
      (filePath.toLowerCase().endsWith("json5") ||
        filePath.toLowerCase().endsWith("jsonc"));

    // Add linguist-language=JSON-with-Comments attribute for files that support comments
    // This helps GitHub render them correctly with syntax highlighting
    if (this.supportsComments) {
      const committed =
        options.committed ?? this.project.commitGenerated ?? true;
      if (committed) {
        this.project.gitattributes.addAttributes(
          `/${this.path}`,
          "linguist-language=JSON-with-Comments",
        );
      }
    }

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

    if (this.marker && !this.supportsComments) {
      sanitized["//"] = this.marker;
    }

    let content = JSON.stringify(sanitized, undefined, 2);
    if (this.marker && this.supportsComments) {
      content = `// ${this.marker}\n${content}`;
    }

    if (this.newline) {
      content += "\n";
    }

    return content;
  }
}
