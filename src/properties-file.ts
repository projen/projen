import type { IConstruct } from "constructs";
import { PropertiesEditor } from "properties-file/editor";
import type { IResolver } from "./file";
import type { ObjectFileOptions } from "./object-file";
import { ObjectFile } from "./object-file";
import { flattenToDotNotation } from "./util";

/**
 * Options for `PropertiesFile`.
 */
export interface PropertiesFileOptions extends ObjectFileOptions {
  /**
   * A comment to include at the top of the file (after the projen marker,
   * if enabled). Each string in the array becomes a separate comment line.
   *
   * @default - no additional comment
   */
  readonly comment?: string[];
}

/**
 * Represents a Java `.properties` file.
 *
 * Properties files consist of key=value pairs, one per line,
 * with `#` used for comments. This file format is commonly
 * used by tools like SonarQube, Gradle, and other JVM-based
 * ecosystem tools.
 *
 * The object passed as `obj` can be a nested structure. Nested keys are
 * flattened into dot-separated property keys on synthesis. For example,
 * `{ sonar: { sources: "src" } }` produces `sonar.sources=src`.
 *
 * This means `addOverride` uses dot notation as a path separator,
 * consistent with ObjectFile/JsonPatch semantics.
 *
 * @example
 * new PropertiesFile(project, 'sonar-project.properties', {
 *   obj: {
 *     sonar: {
 *       projectKey: 'my-project',
 *       sources: 'src',
 *     },
 *   },
 * });
 *
 * // Produces:
 * // sonar.projectKey=my-project
 * // sonar.sources=src
 */
export class PropertiesFile extends ObjectFile {
  private readonly comment?: string[];

  constructor(
    scope: IConstruct,
    filePath: string,
    options: PropertiesFileOptions,
  ) {
    super(scope, filePath, options);
    this.comment = options.comment;
  }

  protected synthesizeContent(resolver: IResolver): string | undefined {
    const json = super.synthesizeContent(resolver);
    if (!json) {
      return undefined;
    }

    const obj = JSON.parse(json);

    // Build the initial content (marker and comments) as a seed string
    // so the editor doesn't produce a leading blank line.
    const header: string[] = [];

    if (this.marker) {
      header.push(`# ${this.marker}`);
      header.push("");
    }

    if (this.comment && this.comment.length > 0) {
      for (const line of this.comment) {
        header.push(`# ${line}`);
      }
      header.push("");
    }

    const editor = new PropertiesEditor(header.join("\n"));

    // Insert all flattened key-value pairs
    const flatEntries = flattenToDotNotation(obj);
    for (const [key, value] of flatEntries) {
      editor.insert(key, value);
    }

    return (
      editor.format({
        separatorChar: "=",
        separatorLeading: "",
        separatorTrailing: "",
      }) + "\n"
    );
  }
}
