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
   * Whether the generated file should be readonly.
   *
   * @default true
   */
  readonly readonly?: boolean;

  /**
   * Whether the generated file should be marked as executable.
   *
   * @default false
   */
  readonly executable?: boolean;
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
    options: SourceCodeOptions = {},
  ) {
    super(project);
    this.indent = options.indent ?? 2;
    this.file = new TextFile(project, filePath, {
      readonly: options.readonly ?? true,
      executable: options.executable,
    });
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
