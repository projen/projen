import { FileBase, IResolver } from './file';
import { Project } from './project';

enum IgnorePatternType {
  INCLUDE,
  EXCLUDE
}

export class IgnoreFile extends FileBase {

  private readonly patterns: { [index: string]: IgnorePatternType } = {};

  constructor(project: Project, filePath: string) {
    super(project, filePath, { editGitignore: filePath !== '.gitignore' });
  }

  /**
   * Do not commit the specified file patterns.
   * @param patterns Patterns to exclude from git commits.
   */
  public exclude(...patterns: string[]) {
    patterns.forEach(pattern => this.patterns[pattern.replace(/^\!/, '')] = IgnorePatternType.EXCLUDE);
  }

  /**
   * Always include the specified file patterns.
   * @param patterns Patterns to include in git commits.
   */
  public include(...patterns: string[]) {
    patterns.forEach(pattern => this.patterns[pattern.replace(/^\!/, '')] = IgnorePatternType.INCLUDE);
  }

  protected synthesizeContent(resolver: IResolver): string | undefined {
    return resolver.resolve([
      `# ${FileBase.PROJEN_MARKER}`,
      ...Object.entries(this.patterns).map(([pattern, type]) => type === IgnorePatternType.INCLUDE ? `!${pattern}`: pattern),
    ]).join('\n');
  }
}
