import type { IConstruct } from "constructs";
import type { FileBaseOptions, IResolver } from "./file";
import { FileBase } from "./file";

/**
 * Options for `TextFile`.
 */
export interface TextFileOptions extends FileBaseOptions {
  /**
   * The contents of the text file. You can use `addLine()` to append lines.
   *
   * @default [] empty file
   */
  readonly lines?: string[];

  /**
   * Single-line comment prefix to use when prepending the projen marker.
   *
   * Supply a prefix appropriate for the target file format, such as `#`.
   * Omitting the prefix leaves the file contents unchanged. Setting
   * `marker: true` alone does not add a marker or infer a comment prefix.
   *
   * The marker is omitted when `marker` is `false` or the project is ejected,
   * even if a prefix is supplied.
   *
   * @example "#"
   * @default - no marker line is written
   */
  readonly markerCommentPrefix?: string;
}

/**
 * A text file.
 */
export class TextFile extends FileBase {
  private readonly lines: string[];
  private readonly markerCommentPrefix?: string;

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
    super(scope, filePath, options);

    this.lines = options.lines ?? [];
    this.markerCommentPrefix = options.markerCommentPrefix;
  }

  /**
   * Adds a line to the text file.
   * @param line the line to add (can use tokens)
   */
  public addLine(line: string) {
    this.lines.push(line);
  }

  protected synthesizeContent(_: IResolver): string | undefined {
    const marker = this.marker;
    if (this.markerCommentPrefix !== undefined && marker) {
      return [`${this.markerCommentPrefix} ${marker}`, ...this.lines].join(
        "\n",
      );
    }
    return this.lines.join("\n");
  }
}
