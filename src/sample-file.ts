import * as path from 'path';
import * as fs from 'fs-extra';
import { Component } from './component';
import { Project } from './project';
import { fileExists } from './util';

/**
 * Options for the SampleFile object.
 *
 * @field contents - The contents of the file.
 */
export interface SampleFileOptions {
  /**
   * The contents of the file to write.
   */
  readonly contents: string;
}

/**
 * Produces a file with the given contents but only once, if the file doesn't already exist.
 * Use this for creating example code files or other resources.
 */
export class SampleFile extends Component {
  public created: boolean = false;
  private readonly filePath: string;
  private readonly options: SampleFileOptions;

  /**
   * Creates a new SampleFile object
   * @param project - the project to tie this file to.
   * @param filePath - the relative path in the project o put the file
   * @param options - the options for the file.
   */
  constructor(project: Project, filePath: string, options: SampleFileOptions) {
    super(project);
    this.filePath = filePath;
    this.options = options;
  }

  synthesize(outdir: string) {
    const contents = this.options.contents;
    this.created = this.writeOnceFileContents(outdir, this.filePath, contents ?? '');
  }

  /**
   * A helper function that will write the file once and return if it was written or not.
   * @param dir - the directory for the new file
   * @param filename - the filename for the new file
   * @param contents - the contents of the file to write
   * @return boolean - whether a new file was written or not.
   * @private
   */
  private writeOnceFileContents(dir: string, filename: string, contents: string) {
    const fullFilename = path.join(dir, filename);
    if (fileExists(fullFilename)) {
      return false;
    }
    fs.mkdirpSync(dir);
    fs.writeFileSync(fullFilename, contents);
    return true;
  }
}

/**
 * Represents files and their string contents
 */
export interface SampleFiles {
  /**
   * The key should be the filename and the value is the contents of the file.
   */
  readonly [key: string]: string;
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

  /**
   * Create sample files in the given directory if the given directory does not exist
   * @param project Parent project to add files to.
   * @param dir directory to add files to. If directory already exists, nothing is added.
   * @param options options for which files to create.
   */
  constructor(project: Project, dir: string, options: SampleDirOptions) {
    super(project);

    if (fs.pathExistsSync(dir)) {
      return;
    }

    fs.mkdirpSync(dir);
    for (const filename in options.files) {
      fs.writeFileSync(path.join(__dirname, dir, filename), options.files[filename]);
    }
  }
}
