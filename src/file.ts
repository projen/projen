import { rmSync } from "fs";
import * as path from "path";
import { resolve } from "./_resolve";
import { PROJEN_MARKER, PROJEN_RC } from "./common";
import { Component } from "./component";
import { Project } from "./project";
import { ProjenrcFile } from "./projenrc";
import { isExecutable, isWritable, tryReadFileSync, writeFile } from "./util";

export interface FileBaseOptions {
  /**
   * Indicates whether this file should be committed to git or ignored. By
   * default, all generated files are committed and anti-tamper is used to
   * protect against manual modifications.
   *
   * @default true
   */
  readonly committed?: boolean;

  /**
   * Update the project's .gitignore file
   * @default true
   */
  readonly editGitignore?: boolean;

  /**
   * Whether the generated file should be readonly.
   *
   * @default true
   */
  readonly readonly?: boolean;

  /**
   * Whether the generated file should be marked as executable.
   *
   * @default false
   */
  readonly executable?: boolean;

  /**
   * Adds the projen marker to the file.
   *
   * @default - marker will be included as long as the project is not ejected
   */
  readonly marker?: boolean;
}

export abstract class FileBase extends Component {
  /**
   * The file path, relative to the project root.
   */
  public readonly path: string;

  /**
   * Indicates if the file should be read-only or read-write.
   */
  public readonly: boolean;

  /**
   * Indicates if the file should be marked as executable
   */
  public executable: boolean;

  /**
   * The absolute path of this file.
   */
  public readonly absolutePath: string;

  private _changed?: boolean;
  private shouldAddMarker: boolean;

  /**
   * The projen marker, used to identify files as projen-generated.
   *
   * Value is undefined if the project is being ejected.
   */
  public get marker(): string | undefined {
    if (this.project.ejected || !this.shouldAddMarker) {
      return undefined;
    }

    // `marker` is empty if project is being ejected or if explicitly disabled
    const projenrc = ProjenrcFile.of(this.project)?.filePath ?? PROJEN_RC;
    return `${PROJEN_MARKER}. To modify, edit ${projenrc} and run "${this.project.projenCommand}".`;
  }

  constructor(
    project: Project,
    filePath: string,
    options: FileBaseOptions = {}
  ) {
    super(project);

    this.readonly = !project.ejected && (options.readonly ?? true);
    this.executable = options.executable ?? false;
    this.path = filePath;
    this.shouldAddMarker = options.marker ?? true;

    const globPattern = `/${this.path}`;
    const committed = options.committed ?? project.commitGenerated ?? true;
    if (committed && filePath !== ".gitattributes") {
      project.annotateGenerated(`/${filePath}`);
    }

    this.absolutePath = path.resolve(project.outdir, filePath);

    // verify file path is unique within project tree
    const existing = project.root.tryFindFile(this.absolutePath);
    if (existing && existing !== this) {
      throw new Error(
        `there is already a file under ${path.relative(
          project.root.outdir,
          this.absolutePath
        )}`
      );
    }

    const editGitignore = options.editGitignore ?? true;
    if (editGitignore) {
      this.project.addGitIgnore(`${committed ? "!" : ""}${globPattern}`);
    } else {
      if (options.committed != null) {
        throw new Error(
          '"gitignore" is disabled, so it does not make sense to specify "committed"'
        );
      }
    }
  }

  /**
   * Implemented by derived classes and returns the contents of the file to
   * emit.
   * @param resolver Call `resolver.resolve(obj)` on any objects in order to
   * resolve token functions.
   * @returns the content to synthesize or undefined to skip the file
   */
  protected abstract synthesizeContent(resolver: IResolver): string | undefined;

  /**
   * Writes the file to the project's output directory
   */
  public synthesize() {
    const outdir = this.project.outdir;
    const filePath = path.join(outdir, this.path);
    const resolver: IResolver = {
      resolve: (obj, options) => resolve(obj, options),
    };
    const content = this.synthesizeContent(resolver);
    if (content === undefined) {
      // remove file (if exists) and skip rest of synthesis
      rmSync(filePath, { force: true, recursive: true });
      return;
    }

    // check if the file was changed.
    const prev = tryReadFileSync(filePath);
    const prevReadonly = !isWritable(filePath);
    const prevExecutable = isExecutable(filePath);
    if (
      prev !== undefined &&
      content === prev &&
      prevReadonly === this.readonly &&
      prevExecutable === this.executable
    ) {
      this.project.logger.debug(`no change in ${filePath}`);
      this._changed = false;
      return;
    }

    writeFile(filePath, content, {
      readonly: this.readonly,
      executable: this.executable,
    });

    this.checkForProjenMarker();

    this._changed = true;
  }

  /**
   * For debugging, check whether a file was incorrectly generated with
   * or without the projen marker. The projen marker does not *need* to be
   * included on projen-generated files, but it's recommended since it signals
   * that it probably should not be edited directly.
   */
  private checkForProjenMarker() {
    const filePath = path.join(this.project.outdir, this.path);
    const contents = tryReadFileSync(filePath);
    const containsMarker = contents?.includes(PROJEN_MARKER);
    if (this.marker && !containsMarker) {
      this.project.logger.debug(
        `note: expected ${this.path} to contain marker but found none.`
      );
    } else if (!this.marker && containsMarker) {
      this.project.logger.debug(
        `note: expected ${this.path} to not contain marker but found one anyway.`
      );
    }
  }

  /**
   * Indicates if the file has been changed during synthesis. This property is
   * only available in `postSynthesize()` hooks. If this is `undefined`, the
   * file has not been synthesized yet.
   */
  public get changed(): boolean | undefined {
    return this._changed;
  }
}

/**
 * API for resolving tokens when synthesizing file content.
 */
export interface IResolver {
  /**
   * Given a value (object/string/array/whatever, looks up any functions inside
   * the object and returns an object where all functions are called.
   * @param value The value to resolve
   * @package options Resolve options
   */
  resolve(value: any, options?: ResolveOptions): any;
}

/**
 * Resolve options.
 */
export interface ResolveOptions {
  /**
   * Omits empty arrays and objects.
   * @default false
   */
  readonly omitEmpty?: boolean;

  /**
   * Context arguments.
   * @default []
   */
  readonly args?: any[];
}

export interface IResolvable {
  /**
   * Resolves and returns content.
   */
  toJSON(): any;
}
