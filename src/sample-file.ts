import * as fs from "fs";
import * as path from "path";
import * as glob from "glob";
import { Component } from "./component";
import { Project } from "./project";
import { getFilePermissions, writeFile } from "./util";

/**
 * Options for the SampleFile object.
 */
export interface SampleFileOptions {
  /**
   * The contents of the file to write.
   */
  readonly contents?: string;

  /**
   * Absolute path to a file to copy the contents from (does not need to be
   * a text file).
   *
   * If your project is Typescript-based and has configured `testdir` to be a
   * subdirectory of `src`, sample files should outside of the `src` directory,
   * otherwise they may not be copied. For example:
   * ```
   * new SampleFile(this, 'assets/icon.png', { sourcePath: path.join(__dirname, '..', 'sample-assets', 'icon.png') });
   * ```
   */
  readonly sourcePath?: string;
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

    if (options.contents && options.sourcePath) {
      throw new Error("Cannot specify both 'contents' and 'source' fields.");
    }
    if (!options.contents && !options.sourcePath) {
      throw new Error("Must specify at least one of 'contents' or 'source'.");
    }
    this.filePath = filePath;
    this.options = options;
  }

  public synthesize() {
    let contents;
    if (this.options.contents) {
      contents = this.options.contents;
    } else if (this.options.sourcePath) {
      contents = fs.readFileSync(this.options.sourcePath);
    }
    this.writeOnceFileContents(
      this.project.outdir,
      this.filePath,
      contents ?? ""
    );
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
   * The files to render into the directory. These files get added after
   * any files from `source` if that option is specified (replacing if names
   * overlap).
   */
  readonly files?: { [fileName: string]: string };

  /**
   * Absolute path to a directory to copy files from (does not need to be text
   * files).
   *
   * If your project is typescript-based and has configured `testdir` to be a
   * subdirectory of `src`, sample files should outside of the `src` directory
   * otherwise they may not be copied. For example:
   * ```
   * new SampleDir(this, 'public', { source: path.join(__dirname, '..', 'sample-assets') });
   * ```
   */
  readonly sourceDir?: string;
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
    if (!options.files && !options.sourceDir) {
      throw new Error("Must specify at least one of 'files' or 'source'.");
    }

    this.dir = dir;
    this.options = options;
  }

  public synthesize() {
    const fullOutdir = path.join(this.project.outdir, this.dir);
    if (fs.existsSync(fullOutdir)) {
      return;
    }

    // previously creating the directory to allow empty dirs to be created
    fs.mkdirSync(fullOutdir, { recursive: true });

    if (this.options.sourceDir) {
      const basedir = this.options.sourceDir;
      const files = glob.sync("**", {
        cwd: basedir,
        nodir: true,
        dot: true,
      }); // returns relative file paths with POSIX separators

      for (const file of files) {
        const sourcePath = path.join(basedir, file);
        const targetPath = path.join(fullOutdir, file);

        fs.mkdirSync(path.dirname(targetPath), { recursive: true });
        fs.copyFileSync(sourcePath, targetPath);
        fs.chmodSync(
          targetPath,
          getFilePermissions({ readonly: false, executable: false })
        );
      }
    }

    for (const filename in this.options.files) {
      writeFile(path.join(fullOutdir, filename), this.options.files[filename]);
    }
  }
}
