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
  private readonly newline: boolean;
  private readonly isJson5: boolean;

  constructor(project: Project, filePath: string, options: JsonFileOptions) {
    super(project, filePath, options);

    this.newline = options.newline ?? true;
    this.isJson5 = filePath.toLowerCase().endsWith("json5");

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

    if (this.marker && !this.isJson5) {
      sanitized["//"] = this.marker;
    }

    let content = JSON.stringify(sanitized, undefined, 2);
    if (this.marker && this.isJson5) {
      content = content.slice(0, -1) + `// ${this.marker}\n}`;
    }

    if (this.newline) {
      content += "\n";
    }

    return content;
  }
}
