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

  constructor(project: Project, filePath: string, options: JsonFileOptions) {
    super(project, filePath, options);

    this.newline = options.newline ?? true;
    this.supportsComments =
      options.allowComments ??
      (filePath.toLowerCase().endsWith("json5") ||
        filePath.toLowerCase().endsWith("jsonc"));

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
