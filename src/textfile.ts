import type { IConstruct } from "constructs";
import type { FileBaseOptions, IResolver } from "./file";
import { FileBase } from "./file";

/**
 * Options for `TextFile`.
 */
export interface TextFileOptions extends FileBaseOptions {
  /**
   * Makes the projen marker available via `TextFile.marker`.
   *
   * `TextFile` does not write the marker automatically. To include it, add it
   * using the comment syntax of the file format. The marker is unavailable
   * when the project is ejected.
   *
   * @default false
   */
  readonly marker?: boolean;

  /**
   * The contents of the text file. You can use `addLine()` to append lines.
   *
   * @default [] empty file
   */
  readonly lines?: string[];
}

/**
 * A text file.
 */
export class TextFile extends FileBase {
  private readonly lines: string[];

  /**
   * Defines a text file.
   *
   * @param project The project
   * @param filePath File path
   * @param options Options
   */
  constructor(
    scope: IConstruct,
    filePath: string,
    options: TextFileOptions = {},
  ) {
    super(scope, filePath, { ...options, marker: options.marker ?? false });

    this.lines = options.lines ?? [];
  }

  /**
   * Adds a line to the text file.
   * @param line the line to add (can use tokens)
   */
  public addLine(line: string) {
    this.lines.push(line);
  }

  protected synthesizeContent(_: IResolver): string | undefined {
    return this.lines.join("\n");
  }
}
