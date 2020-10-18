import { FileBase, FileBaseOptions, IResolver } from './file';
import { Project } from './project';

export interface ReadmeOptions extends FileBaseOptions {
  /**
   * The content of the README file.
   *
   * @default "# jsii construct"
   */
  readonly text?: string;
}


/**
 * Represents a README.md file
 */
export class Readme extends FileBase {
  private readonly text: string;

  constructor(project: Project, options: ReadmeOptions = {}) {
    super(project, 'README.md', options);
    this.text = options.text ?? '# jsii construct';
  }

  protected synthesizeContent(resolver: IResolver): string {
    return resolver.resolve(this.text);
  }
}