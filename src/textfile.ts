import { FileBase, FileBaseOptions, IResolver } from "./file";
import { Project } from "./project";

/**
 * Options for `TextFile`.
 * @prop {boolean} [marker=false] - Adds the projen marker to the beginning of the file, prepended with projenMarkerPrefix.
 */
export interface TextFileOptions extends FileBaseOptions {
  /**
   * The contents of the text file. You can use `addLine()` to append lines.
   *
   * @default [] empty file
   */
  readonly lines?: string[];

  /**
   * Prefix to attach to the PROJEN_MARKER string
   * Required if options.marker is true
   * A space will be left between prefix and marker
   *
   * @default undefined
   */
  readonly projenMarkerPrefix?: string;

  /**
   * Whether the projen marker should be added to the start of the file.
   * If false, appends to end instead.
   *
   * @default true
   */
  readonly projenMarkerAtStart?: boolean;
}

/**
 * A text file.
 */
export class TextFile extends FileBase {
  private readonly lines: string[];
  private readonly projenMarkerPrefix?: string;
  private readonly projenMarkerAtStart: boolean;

  /**
   * Defines a text file.
   *
   * @param project The project
   * @param filePath File path
   * @param options Options
   */
  constructor(
    project: Project,
    filePath: string,
    options: TextFileOptions = {}
  ) {
    // Override the default behaviour of marker for TestFile
    // as there is not a fixed comment syntax
    options = {
      marker: false,
      ...options,
    };
    super(project, filePath, options);

    this.lines = options.lines ?? [];

    this.projenMarkerPrefix = options.projenMarkerPrefix ?? undefined;
    if (this.marker && options.projenMarkerPrefix === undefined) {
      throw new Error(
        "options.projenMarkerPrefix must be set if options.marker is true"
      );
    }
    this.projenMarkerAtStart = options.projenMarkerAtStart ?? true;
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

  protected addProjenMarker(content: string): string {
    content = content === "\n" ? "" : content;
    if (this.projenMarkerAtStart) {
      return [`${this.projenMarkerPrefix} ${this.marker}`, content].join("\n");
    } else {
      return [content, `${this.projenMarkerPrefix} ${this.marker}`].join("\n");
    }
  }
}
