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
  private readonly filePath: string;
  private options: SampleFileOptions;
  public created: boolean = false;

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
   * @protected
   */
  protected writeOnceFileContents(dir: string, filename: string, contents: string) {
    const fullFilename = path.join(dir, filename);
    if (fileExists(fullFilename)) {
      return false;
    }
    fs.mkdirpSync(dir);
    fs.writeFileSync(fullFilename, contents);
    return true;
  }
}