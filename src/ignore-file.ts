import { FileBase, IResolver } from "./file";
import { Project } from "./project";

export class IgnoreFile extends FileBase {
  private readonly _excludes = new Set<string>();
  private readonly _includes = new Set<string>();

  constructor(project: Project, filePath: string) {
    super(project, filePath, { editGitignore: filePath !== ".gitignore" });
  }

  /**
   * Add ignore patterns. Files that match this pattern will be ignored. If the
   * pattern starts with a negation mark `!`, files that match will _not_ be
   * ignored.
   *
   * Comment lines (start with `#`) are ignored.
   *
   * @param patterns Ignore patterns.
   */
  public addPatterns(...patterns: string[]) {
    for (const pattern of patterns) {
      // skip comments
      if (pattern.startsWith("#")) {
        continue;
      }

      if (pattern.startsWith("!")) {
        this._includes.add(pattern);
      } else {
        this._excludes.add(pattern);
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
      this._excludes.delete(p);
      this._includes.delete(p);
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
    const lines = [`# ${FileBase.PROJEN_MARKER}`];

    for (const line of Array.from(this._excludes).sort()) {
      // if this line exists in the inclusion list, then skip it
      if (this._includes.has(`!${line}`)) {
        continue;
      }

      lines.push(line);
    }

    for (const line of Array.from(this._includes).sort()) {
      lines.push(line);
    }

    return `${resolver.resolve(lines).join("\n")}\n`;
  }
}
