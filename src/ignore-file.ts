import { FileBase, IResolver } from './file';
import { Project } from './project';
import { dedupArray } from './util';

export class IgnoreFile extends FileBase {
  private readonly excludes = new Array<string>();
  private readonly includes = new Array<string>();

  constructor(project: Project, filePath: string) {
    super(project, filePath, { editGitignore: filePath !== '.gitignore' });
  }

  public exclude(...patterns: string[]) {
    this.excludes.push(...patterns);
  }

  public include(...patterns: string[]) {
    this.includes.push(...patterns);
  }

  protected synthesizeContent(resolver: IResolver): string {
    return resolver.resolve([
      `# ${FileBase.PROJEN_MARKER}`,
      ...dedupArray(this.excludes),

      // includes must follow excludes
      ...dedupArray(this.includes).map(x => `!${x}`),
    ]).join('\n');
  }
}
