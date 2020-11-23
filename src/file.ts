import * as path from 'path';
import { resolve } from './_resolve';
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
  public readonly path: string;
  public readonly: boolean;

  constructor(project: Project, filePath: string, options: FileBaseOptions = { }) {
    super(project);

    this.readonly = options.readonly ?? true;
    this.path = filePath;

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
   */
  protected abstract synthesizeContent(resolver: IResolver): string;

  /**
   * Writes the file to the project's output directory
   */
  public synthesize() {
    const outdir = this.project.outdir;
    const filePath = path.join(outdir, this.path);
    const resolver: IResolver = { resolve: obj => resolve(obj, outdir) };
    writeFile(filePath, this.synthesizeContent(resolver), {
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
   */
  resolve(value: any): any;
}


