import * as path from 'path';
import { resolve } from './_resolve';
import { PROJEN_MARKER, PROJEN_RC } from './common';
import { Component } from './component';
import { Project } from './project';
import { writeFile } from './util';

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
}

export abstract class FileBase extends Component {
  /**
   * The marker to embed in files in order to identify them as projen files.
   * This marker is used to prune these files before synthesis.
   */
  public static readonly PROJEN_MARKER = `${PROJEN_MARKER}. To modify, edit ${PROJEN_RC} and run "npx projen".`;

  /**
   * The file path, relative to the project root.
   */
  public readonly path: string;

  /**
   * Indicates if the file should be read-only or read-write.
   */
  public readonly: boolean;

  /**
   * The absolute path of this file.
   */
  public readonly absolutePath: string;

  constructor(project: Project, filePath: string, options: FileBaseOptions = { }) {
    super(project);

    this.readonly = options.readonly ?? true;
    this.path = filePath;

    this.absolutePath = path.resolve(project.outdir, filePath);

    // verify file path is unique within project tree
    const existing = project.root.tryFindFile(this.absolutePath);
    if (existing && existing !== this) {
      throw new Error(`there is already a file under ${path.relative(project.root.outdir, this.absolutePath)}`);
    }

    const gitignore = options.editGitignore ?? true;
    if (gitignore) {
      const committed = options.committed ?? true;
      const pattern = `/${this.path}`;
      if (committed) {
        project.gitignore.include(pattern);
      } else {
        project.gitignore.exclude(pattern);
      }
    } else {
      if (options.committed != null) {
        throw new Error('"gitignore" is disabled, so it does not make sense to specify "committed"');
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
    const resolver: IResolver = { resolve: (obj, options) => resolve(obj, options) };
    const content = this.synthesizeContent(resolver);
    if (content === undefined) {
      return; // skip
    }
    writeFile(filePath, content, {
      readonly: this.readonly,
    });
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
