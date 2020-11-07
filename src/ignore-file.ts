import { GENERATION_DISCLAIMER } from './common';
import { IComponentScope } from './component';
import { FileBase, IResolver } from './file';

export class IgnoreFile extends FileBase {
  private readonly excludes = new Array<string>();
  private readonly includes = new Array<string>();

  constructor(project: IComponentScope, filePath: string) {
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
      `# ${GENERATION_DISCLAIMER}`,
      ...this.excludes,

      // includes must follow includes
      ...this.includes.map(x => `!${x}`),
    ]).join('\n');
  }
}


