import {FileBaseOptions} from './file';
import {Project} from './project';
import {SampleFile} from "./typescript";

export interface ReadmeOptions extends FileBaseOptions {
  /**
   * The initial content of the README file.
   *
   * @default "# replace this"
   */
  readonly text?: string;
}


/**
 * Represents a README.md file. Unlike most other files this will only be created if the file doesn't already exist.
 * You are expected to manage this file after creation.
 */
export class Readme extends SampleFile {
  private readonly text: string;

  constructor(project: Project, text?: string) {
    super(project);
    this.text = text ?? '# replace this';
  }

  synthesize(outdir: string) {
    this.writeOnceFileContents(outdir, 'README.md', this.text);
  }
}