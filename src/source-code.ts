import { Component } from "./component";
import { Project } from "./project";
import { TextFile } from "./textfile";

/**
 * Options for `SourceCodeFile`.
 */
export interface SourceCodeOptions {
  /**
   * Indentation size.
   * @default 2
   */
  readonly indent?: number;

  /**
   * Adds the projen marker to the file.
   *
   * @default false
   */
  readonly marker?: boolean;

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
 * Represents a source file.
 */
export class SourceCode extends Component {
  private readonly file: TextFile;
  private indentLevel = 0;
  private readonly indent: number;

  constructor(
    project: Project,
    public readonly filePath: string,
    options: SourceCodeOptions = {}
  ) {
    super(project);
    this.indent = options.indent ?? 2;
    const fileOptions = {
      marker: options.marker ?? false,
      projenMarkerPrefix: options.projenMarkerPrefix,
      projenMarkerAtStart: options.projenMarkerAtStart ?? true,
    };
    this.file = new TextFile(project, filePath, fileOptions);
  }

  public get marker(): string | undefined {
    return this.file.marker;
  }

  /**
   * Emit a line of code.
   * @param code The contents, if not specified, just adds a newline
   */
  public line(code?: string) {
    const spaces: number = this.indent * this.indentLevel;
    const prefix = " ".repeat(spaces);
    this.file.addLine((prefix + (code ?? "")).trimEnd());
  }

  /**
   * Opens a code block and increases the indentation level.
   *
   * @param code The code before the block starts (e.g. `export class {`).
   */
  public open(code?: string) {
    if (code) {
      this.line(code);
    }

    this.indentLevel++;
  }

  /**
   * Decreases the indentation level and closes a code block.
   *
   * @param code The code after the block is closed (e.g. `}`).
   */
  public close(code?: string) {
    if (this.indentLevel === 0) {
      throw new Error("Cannot decrease indent level below zero");
    }
    this.indentLevel--;

    if (code) {
      this.line(code);
    }
  }
}
