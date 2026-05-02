import type { GitAttributesFile } from "./gitattributes";
import type { IgnoreFile, IgnoreFileOptions } from "./ignore-file";
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
 * The actual file objects are created on the root project (since FileBase
 * requires a Project scope), but ownership and configuration lives here.
 * Individual projects may still have their own `.gitignore` for
 * folder-level settings.
 */
export class GitRepository extends Repository {
  /**
   * The .gitignore file for this repository.
   *
   * Available after the first root project is added.
   */
  public readonly gitignore!: IgnoreFile;

  /**
   * The .gitattributes file for this repository.
   *
   * Available after the first root project is added.
   */
  public readonly gitattributes!: GitAttributesFile;

  /** @internal */
  public readonly _gitOptions?: GitOptions;
  /** @internal */
  public readonly _gitIgnoreOptions?: IgnoreFileOptions;
  /** @internal */
  public _pendingAnnotations?: string[];

  constructor(options: GitRepositoryOptions) {
    super(options);
    this._gitOptions = options.gitOptions;
    this._gitIgnoreOptions = options.gitIgnoreOptions;
  }

  /**
   * Initialize git files on a project scope.
   *
   * Called internally when the first root project is added.
   * FileBase/Component require a Project ancestor, so the actual
   * file objects are created on the root project but conceptually
   * owned by the repository.
   *
   * @internal
   */
  public _initGitFiles(project: any): void {
    if (this.gitattributes) {
      return; // already initialized
    }

    // Lazy imports to avoid circular dependencies
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { GitAttributesFile } = require("./gitattributes");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { IgnoreFile } = require("./ignore-file");

    const gitattributes = new GitAttributesFile(project, {
      endOfLine: this._gitOptions?.endOfLine,
    });
    Object.defineProperty(this, "gitattributes", { value: gitattributes });

    // Flush any annotations that were queued before gitattributes was ready
    if (this._pendingAnnotations) {
      for (const g of this._pendingAnnotations) {
        this.annotateGenerated(g);
      }
      this._pendingAnnotations = undefined;
    }

    // Mark projen-managed directories and the gitattributes file itself as generated
    this.annotateGenerated("/.projen/**");
    this.annotateGenerated(`/${gitattributes.path}`);

    if (this._gitOptions?.lfsPatterns) {
      for (const pattern of this._gitOptions.lfsPatterns) {
        gitattributes.addAttributes(
          pattern,
          "filter=lfs",
          "diff=lfs",
          "merge=lfs",
          "-text",
        );
      }
    }

    const gitignore = new IgnoreFile(
      project,
      ".gitignore",
      this._gitIgnoreOptions,
    );
    Object.defineProperty(this, "gitignore", { value: gitignore });

    gitignore.exclude("node_modules/");
    gitignore.include(`/${gitattributes.path}`);
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
    if (!this.gitattributes) {
      // Store for later — will be applied when _initGitFiles is called
      if (!this._pendingAnnotations) {
        this._pendingAnnotations = [];
      }
      this._pendingAnnotations.push(glob);
      return;
    }
    this.gitattributes.addAttributes(
      normalizePersistedPath(glob),
      "linguist-generated",
    );
  }
}
