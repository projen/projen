import { GitAttributesFile } from "./gitattributes";
import type { IgnoreFileOptions } from "./ignore-file";
import { IgnoreFile } from "./ignore-file";
import type { GitOptions } from "./project";
import type { RepositoryOptions } from "./repository";
import { Repository } from "./repository";
import { normalizePersistedPath } from "./util";

/**
 * Options for `GitRepository`.
 */
export interface GitRepositoryOptions extends RepositoryOptions {
  /**
   * Configuration options for git.
   */
  readonly gitOptions?: GitOptions;

  /**
   * Configuration options for .gitignore file.
   */
  readonly gitIgnoreOptions?: IgnoreFileOptions;
}

/**
 * A repository backed by git.
 *
 * Manages repository-level `.gitignore` and `.gitattributes` files.
 * Individual projects may still have their own `.gitignore` for
 * folder-level settings.
 */
export class GitRepository extends Repository {
  /**
   * The .gitignore file for this repository.
   */
  public readonly gitignore: IgnoreFile;

  /**
   * The .gitattributes file for this repository.
   */
  public readonly gitattributes: GitAttributesFile;

  constructor(options: GitRepositoryOptions) {
    super(options);

    this.gitattributes = new GitAttributesFile(this, {
      endOfLine: options.gitOptions?.endOfLine,
    });
    this.annotateGenerated("/.projen/**");
    this.annotateGenerated(`/${this.gitattributes.path}`);

    if (options.gitOptions?.lfsPatterns) {
      for (const pattern of options.gitOptions.lfsPatterns) {
        this.gitattributes.addAttributes(
          pattern,
          "filter=lfs",
          "diff=lfs",
          "merge=lfs",
          "-text",
        );
      }
    }

    this.gitignore = new IgnoreFile(
      this,
      ".gitignore",
      options.gitIgnoreOptions,
    );
    this.gitignore.exclude("node_modules/");
    this.gitignore.include(`/${this.gitattributes.path}`);
  }

  /**
   * Marks the provided file(s) as being generated. This is achieved using the
   * github-linguist attributes. Generated files do not count against the
   * repository statistics and language breakdown.
   *
   * @param glob the glob pattern to match (could be a file path).
   * @see https://github.com/github/linguist/blob/master/docs/overrides.md
   */
  public annotateGenerated(glob: string): void {
    this.gitattributes.addAttributes(
      normalizePersistedPath(glob),
      "linguist-generated",
    );
  }
}
