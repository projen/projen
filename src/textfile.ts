import { FileBase, FileBaseOptions, IResolver } from './file';
import { Project } from './project';

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
  constructor(project: Project, filePath: string, options: TextFileOptions = { }) {
    super(project, filePath, options);

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
    return this.lines.join('\n');
  }
}