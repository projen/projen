import { IResolver, FileBase } from "./file";
import { Project } from "./project";

/**
 * Assign attributes to file names in a git repository.
 *
 * @see https://git-scm.com/docs/gitattributes
 */
export class GitAttributesFile extends FileBase {
  /**
   * Return the gitattributes file for the given repository
   */
  public static of(project: Project): GitAttributesFile | undefined {
    return project.root.gitattributes;
  }

  private readonly attributes = new Map<string, Set<string>>();

  public constructor(project: Project) {
    super(project, ".gitattributes", {
      editGitignore: false,
    });
  }

  /**
   * Maps a set of attributes to a set of files.
   * @param glob Glob pattern to match files in the repo
   * @param attributes Attributes to assign to these files.
   */
  public addAttributes(glob: string, ...attributes: string[]) {
    if (!this.attributes.has(glob)) {
      this.attributes.set(glob, new Set());
    }
    const set = this.attributes.get(glob)!;
    for (const attribute of attributes) {
      set.add(attribute);
    }
  }

  protected synthesizeContent(_: IResolver): string | undefined {
    // We can assume the file map is never empty.
    const entries = Array.from(this.attributes.entries()).sort(([l], [r]) =>
      l.localeCompare(r)
    );

    if (entries.length === 0) {
      return undefined;
    }

    return [
      ...(this.marker ? [`# ${this.marker}`] : []),
      "",
      ...entries.map(
        ([name, attributes]) => `${name} ${Array.from(attributes).join(" ")}`
      ),
    ].join("\n");
  }
}
