import { FileBase } from './file';
import { GENERATION_DISCLAIMER } from './common';
import { Project } from './project';

export class IgnoreFile extends FileBase {
  private readonly excludes = new Array<string>();
  private readonly includes = new Array<string>();

  private comments = new Array<string>();

  constructor(project: Project, filePath: string) {
    super(project, filePath, { editGitignore: filePath !== '.gitignore' });
  }

  /**
   * appends a comment that will be included before the next exclude/include line
   * @param comment 
   */
  public comment(comment: string) {
    this.comments.push();
    this.comments.push(`# ${comment}`);
  }

  public exclude(...patterns: string[]) {
    this.flushComments(this.excludes);
    this.excludes.push(...patterns);
  }

  public include(...patterns: string[]) {
    this.flushComments(this.includes);
    this.includes.push(...patterns);
  }

  protected get data(): string {
    return [
      `# ${GENERATION_DISCLAIMER}`,
      ...this.excludes,

      // includes must follow includes
      ...this.includes.map(x => `!${x}`),
    ].join('\n');
  }

  private flushComments(into: string[]) {
    into.push(...this.comments);
    this.comments = [];
  }
}


