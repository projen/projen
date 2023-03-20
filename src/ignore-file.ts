import { FileBase, IResolver } from "./file";
import { Project } from "./project";

export interface IgnoreFileOptions {
  /**
   * Filter out comment lines?
   *
   * @default true
   */
  readonly filterCommentLines?: boolean;

  /**
   * Filter out blank/empty lines?
   *
   * @default true
   */
  readonly filterEmptyLines?: boolean;
}

export class IgnoreFile extends FileBase {
  private readonly _patterns = new Array<string>();
  public readonly filterCommentLines: boolean;
  public readonly filterEmptyLines: boolean;

  /**
   *
   * @param project The project to tie this file to.
   * @param filePath - the relative path in the project to put the file
   * @param minify - whether comments/blank lines should be filtered
   */
  constructor(project: Project, filePath: string, options?: IgnoreFileOptions) {
    super(project, filePath, { editGitignore: filePath !== ".gitignore" });
    this.filterCommentLines = options?.filterCommentLines ?? true;
    this.filterEmptyLines = options?.filterEmptyLines ?? true;
  }

  /**
   * Add ignore patterns. Files that match this pattern will be ignored. If the
   * pattern starts with a negation mark `!`, files that match will _not_ be
   * ignored.
   *
   * Comment lines (start with `#`) and blank lines ("") are filtered by default
   * but can be included using options specified when instantiating the component.
   *
   * @param patterns Ignore patterns.
   */
  public addPatterns(...patterns: string[]) {
    for (const pattern of patterns) {
      const isComment = pattern.startsWith("#");
      const isEmptyLine = Boolean(pattern.trim().length === 0);
      if (isComment && this.filterCommentLines) {
        continue;
      }
      if (isEmptyLine && this.filterEmptyLines) {
        continue;
      }
      if (!isComment && !isEmptyLine) {
        this.normalizePatterns(pattern);
      }
      this._patterns.push(pattern);
    }
  }

  private normalizePatterns(pattern: string) {
    const opposite = pattern.startsWith("!") ? pattern.slice(1) : "!" + pattern;
    remove(this._patterns, pattern); // prevent duplicates
    remove(this._patterns, opposite);

    if (pattern.endsWith("/")) {
      const prefix = opposite;
      for (const p of [...this._patterns]) {
        if (p.startsWith(prefix)) {
          remove(this._patterns, p);
        }
      }
    }
  }

  /**
   * Removes patterns previously added from the ignore file.
   *
   * If `addPattern()` is called after this, the pattern will be added again.
   *
   * @param patterns patters to remove.
   */
  public removePatterns(...patterns: string[]) {
    for (const p of patterns) {
      remove(this._patterns, p);
    }
  }

  /**
   * Ignore the files that match these patterns.
   * @param patterns The patterns to match.
   */
  public exclude(...patterns: string[]) {
    return this.addPatterns(...patterns);
  }

  /**
   * Always include the specified file patterns.
   * @param patterns Patterns to include in git commits.
   */
  public include(...patterns: string[]) {
    for (let pattern of patterns) {
      if (!pattern.startsWith("!")) {
        pattern = "!" + pattern;
      }

      this.addPatterns(pattern);
    }
  }

  protected synthesizeContent(resolver: IResolver): string | undefined {
    const lines = [
      ...(this.marker ? [`# ${this.marker}`] : []),
      ...this._patterns,
    ];

    return `${resolver.resolve(lines).join("\n")}\n`;
  }
}

// O(n) hooray!
function remove<T>(arr: T[], value: any) {
  const idx = arr.indexOf(value);
  if (idx >= 0) {
    arr.splice(idx, 1);
  }
}
