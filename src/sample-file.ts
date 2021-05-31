import * as path from 'path';
import * as fs from 'fs-extra';
import { Component } from './component';
import { Project } from './project';
import { writeFile } from './util';

/**
 * Options for the SampleFile object.
 */
export interface SampleFileOptions {
  /**
   * The contents of the file to write.
   */
  readonly contents?: string;

  /**
   * A path to a file to copy the contents from (does not need to be a text file),
   * starting with the name of the module which contains the file.
   *
   * @example 'my-lib/assets/logo.svg'
   */
  readonly source?: string;
}

/**
 * Produces a file with the given contents but only once, if the file doesn't already exist.
 * Use this for creating example code files or other resources.
 */
export class SampleFile extends Component {
  private readonly filePath: string;
  private readonly options: SampleFileOptions;

  /**
   * Creates a new SampleFile object
   * @param project - the project to tie this file to.
   * @param filePath - the relative path in the project to put the file
   * @param options - the options for the file.
   */
  constructor(project: Project, filePath: string, options: SampleFileOptions) {
    super(project);

    if (options.contents && options.source) {
      throw new Error('Cannot specify both \'contents\' and \'source\' fields.');
    }
    if (!options.contents && !options.source) {
      throw new Error('Must specify at least one of \'contents\' or \'source\'.');
    }
    this.filePath = filePath;
    this.options = options;
  }

  public synthesize() {
    let contents;
    if (this.options.contents) {
      contents = this.options.contents;
    } else if (this.options.source) {
      const source = this.resolveSourcePath(this.options.source);
      if (fs.existsSync(source)) {
        contents = fs.readFileSync(source);
      }
    }
    this.writeOnceFileContents(this.project.outdir, this.filePath, contents ?? '');
  }

  /**
   * A helper function that resolves the path to a raw file based on
   * projen's current runtime environment.
   *
   * @param relativeSource - a relative path to a file in a module, starting with the module name
   * @returns an absolute path
   */
  private resolveSourcePath(relativeSource: string) {
    // at runtime, __dirname usually looks like /path/to/third-party-lib/node_modules/projen/lib
    // unless you are testing/developing projen, where it might look like /path/to/projen/lib
    const parts = __dirname.split('/');

    if (parts.indexOf('node_modules') === -1) { // projen development
      return path.join(__dirname, '..', '..', relativeSource);
    } else { // using projen as a dependency
      const base = parts.slice(0, parts.lastIndexOf('node_modules') + 1).join('/'); // /path/to/third-party-lib/node_modules
      const hostModule = parts[parts.lastIndexOf('node_modules') - 1]; // the module that the current project type belongs to (e.g. projen-vue-bootstrap)
      const sourceModule = relativeSource.split('/')[0]; // the module that we are expecting to find the raw file in (e.g. projen-vue)

      if (sourceModule !== hostModule) {
        return path.join(base, relativeSource);
      } else {
        // when the host and source modules are the same, we want to avoid looking
        // for the raw file at /path/to/third-party-lib/node_modules/third-party-lib/path/to/asset.png
        return path.join(base, '..', '..', relativeSource);
      }
    }
  }

  /**
   * A helper function that will write the file once and return if it was written or not.
   * @param dir - the directory for the new file
   * @param filename - the filename for the new file
   * @param contents - the contents of the file to write
   * @return boolean - whether a new file was written or not.
   * @private
   */
  private writeOnceFileContents(dir: string, filename: string, contents: any) {
    const fullFilename = path.join(dir, filename);
    if (fs.existsSync(fullFilename)) {
      return;
    }
    writeFile(fullFilename, contents, { readonly: false });
  }
}

/**
 * SampleDir options
 */
export interface SampleDirOptions {
  /**
   * The files to render into the directory
   */
  readonly files: { [fileName: string]: string };
}

/**
 * Renders the given files into the directory if the directory does not exist. Use this to create sample code files
 */
export class SampleDir extends Component {
  private readonly dir: string;
  private readonly options: SampleDirOptions;

  /**
   * Create sample files in the given directory if the given directory does not exist
   * @param project Parent project to add files to.
   * @param dir directory to add files to. If directory already exists, nothing is added.
   * @param options options for which files to create.
   */
  constructor(project: Project, dir: string, options: SampleDirOptions) {
    super(project);
    this.dir = dir;
    this.options = options;
  }

  public synthesize() {
    const fullOutdir = path.join(this.project.outdir, this.dir);
    if (fs.pathExistsSync(fullOutdir)) {
      return;
    }

    for (const filename in this.options.files) {
      writeFile(path.join(fullOutdir, filename), this.options.files[filename]);
    }
  }
}
