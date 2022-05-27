import { mkdtempSync, realpathSync, renameSync } from "fs";
import { tmpdir } from "os";
import * as path from "path";
import * as glob from "glob";
import { cleanup, FILE_MANIFEST } from "./cleanup";
import { IS_TEST_RUN } from "./common";
import { Component } from "./component";
import { FileBase } from "./file";
import * as inventory from "./inventory";
import { resolveInitProject } from "./javascript/render-options";
import { JsonFile } from "./json";
import { Logger, LoggerOptions } from "./logger";
import { ObjectFile } from "./object-file";
import { InitProjectOptionHints } from "./option-hints";
import { isTruthy } from "./util";

/**
 * Options for `Project`.
 */
export interface ProjectOptions {
  /**
   * This is the name of your project.
   *
   * @default $BASEDIR
   * @featured
   */
  readonly name: string;

  /**
   * The parent project, if this project is part of a bigger project.
   */
  readonly parent?: Project;

  /**
   * The root directory of the project.
   *
   * Relative to this directory, all files are synthesized.
   *
   * If this project has a parent, this directory is relative to the parent
   * directory and it cannot be the same as the parent or any of it's other
   * sub-projects.
   *
   * @default "."
   */
  readonly outdir?: string;

  /**
   * Configure logging options such as verbosity.
   * @default {}
   */
  readonly logging?: LoggerOptions;
}

/**
 * Base project type. For a project with basic components (tasks, dependencies,
 * gitignore, etc.) pre-included, use `StandardProject` instead.
 */
export class Project {
  /**
   * Project name.
   */
  public readonly name: string;

  /**
   * A parent project. If undefined, this is the root project.
   */
  public readonly parent?: Project;

  /**
   * Absolute output directory of this project.
   */
  public readonly outdir: string;

  /**
   * The root project.
   **/
  public readonly root: Project;

  /**
   * Logging utilities.
   */
  public readonly logger: Logger;

  /**
   * The options used when this project is bootstrapped via `projen new`. It
   * includes the original set of options passed to the CLI and also the JSII
   * FQN of the project type.
   */
  public readonly initProject?: InitProject;

  private readonly _components = new Array<Component>();
  private readonly subprojects = new Array<Project>();
  private readonly tips = new Array<string>();
  private readonly excludeFromCleanup: string[];
  private readonly _ejected: boolean;

  constructor(options: ProjectOptions) {
    this.initProject = resolveInitProject(options);

    this.name = options.name;
    this.parent = options.parent;
    this.excludeFromCleanup = [];

    this._ejected = isTruthy(process.env.PROJEN_EJECTING);

    this.outdir = this.determineOutdir(options.outdir);
    this.root = this.parent ? this.parent.root : this;

    // must happen after this.outdir, this.parent and this.root are initialized
    this.parent?._addSubProject(this);

    this.logger = new Logger(this, {
      ...options.logging,
      prefix: `[${this.name} ]`,
    });

    if (!this.ejected) {
      new JsonFile(this, FILE_MANIFEST, {
        omitEmpty: true,
        editGitattributes: false,
        editGitignore: false,
        obj: () => ({
          // replace `\` with `/` to ensure paths match across platforms
          files: this.files
            .filter((f) => f.readonly)
            .map((f) => f.path.replace(/\\/g, "/")),
        }),
      });
    }
  }

  /**
   * Returns all the components within this project.
   */
  public get components() {
    return [...this._components];
  }

  /**
   * All files in this project.
   */
  public get files(): FileBase[] {
    const isFile = (c: Component): c is FileBase => c instanceof FileBase;
    return this._components
      .filter(isFile)
      .sort((f1, f2) => f1.path.localeCompare(f2.path));
  }

  /**
   * Finds a file at the specified relative path within this project and all
   * its subprojects.
   *
   * @param filePath The file path. If this path is relative, it will be resolved
   * from the root of _this_ project.
   * @returns a `FileBase` or undefined if there is no file in that path
   */
  public tryFindFile(filePath: string): FileBase | undefined {
    const absolute = path.isAbsolute(filePath)
      ? filePath
      : path.resolve(this.outdir, filePath);
    for (const file of this.files) {
      if (absolute === file.absolutePath) {
        return file;
      }
    }

    for (const child of this.subprojects) {
      const file = child.tryFindFile(absolute);
      if (file) {
        return file;
      }
    }

    return undefined;
  }

  /**
   * Finds a json file by name.
   * @param filePath The file path.
   * @deprecated use `tryFindObjectFile`
   */
  public tryFindJsonFile(filePath: string): JsonFile | undefined {
    const file = this.tryFindObjectFile(filePath);
    if (!file) {
      return undefined;
    }

    if (!(file instanceof JsonFile)) {
      throw new Error(
        `found file ${filePath} but it is not a JsonFile. got: ${file.constructor.name}`
      );
    }

    return file;
  }

  /**
   * Finds an object file (like JsonFile, YamlFile, etc.) by name.
   * @param filePath The file path.
   */
  public tryFindObjectFile(filePath: string): ObjectFile | undefined {
    const file = this.tryFindFile(filePath);
    if (!file) {
      return undefined;
    }

    if (!(file instanceof ObjectFile)) {
      throw new Error(
        `found file ${filePath} but it is not a ObjectFile. got: ${file.constructor.name}`
      );
    }

    return file;
  }

  /**
   * Finds a file at the specified relative path within this project and removes
   * it.
   *
   * @param filePath The file path. If this path is relative, it will be
   * resolved from the root of _this_ project.
   * @returns a `FileBase` if the file was found and removed, or undefined if
   * the file was not found.
   */
  public tryRemoveFile(filePath: string): FileBase | undefined {
    const absolute = path.isAbsolute(filePath)
      ? filePath
      : path.resolve(this.outdir, filePath);
    const isFile = (c: Component): c is FileBase => c instanceof FileBase;
    const index = this._components.findIndex(
      (c) => isFile(c) && c.absolutePath === absolute
    );

    if (index !== -1) {
      return this._components.splice(index, 1)[0] as FileBase;
    }

    for (const child of this.subprojects) {
      const file = child.tryRemoveFile(absolute);
      if (file) {
        return file;
      }
    }

    return undefined;
  }

  /**
   * Prints a "tip" message during synthesis.
   * @param message The message
   * @deprecated - use `project.logger.info(message)` to show messages during synthesis
   */
  public addTip(message: string) {
    this.tips.push(message);
  }

  /**
   * Exclude the matching files from pre-synth cleanup. Can be used when, for example, some
   * source files include the projen marker and we don't want them to be erased during synth.
   *
   * @param globs The glob patterns to match
   */
  public addExcludeFromCleanup(...globs: string[]) {
    this.excludeFromCleanup.push(...globs);
  }

  /**
   * Exclude these files from the bundled package. Implemented by project types based on the
   * packaging mechanism. For example, `NodeProject` delegates this to `.npmignore`.
   *
   * @param _pattern The glob pattern to exclude
   */
  public addPackageIgnore(_pattern: string) {
    // nothing to do at the abstract level
  }

  /**
   * Adds a .gitignore pattern.
   * @param _pattern The glob pattern to ignore.
   */
  public addGitIgnore(_pattern: string) {
    // nothing to do at the abstract level
  }

  /**
   * Consider a set of files as "generated". This method is implemented by
   * derived classes and used for example, to add git attributes to tell GitHub
   * that certain files are generated.
   *
   * @param _glob the glob pattern to match (could be a file path).
   */
  public annotateGenerated(_glob: string): void {
    // nothing to do at the abstract level
  }

  /**
   * Synthesize all project files into `outdir`.
   *
   * 1. Call "this.preSynthesize()"
   * 2. Delete all generated files
   * 3. Synthesize all sub-projects
   * 4. Synthesize all components of this project
   * 5. Call "postSynthesize()" for all components of this project
   * 6. Call "this.postSynthesize()"
   */
  public synth(): void {
    const outdir = this.outdir;
    this.logger.debug("Synthesizing project...");

    this.preSynthesize();

    for (const comp of this._components) {
      comp.preSynthesize();
    }

    // we exclude all subproject directories to ensure that when subproject.synth()
    // gets called below after cleanup(), subproject generated files are left intact
    for (const subproject of this.subprojects) {
      this.addExcludeFromCleanup(subproject.outdir + "/**");
    }

    // delete orphaned files before we start synthesizing new ones
    cleanup(
      outdir,
      this.files.map((f) => f.path.replace(/\\/g, "/")),
      this.excludeFromCleanup
    );

    for (const subproject of this.subprojects) {
      subproject.synth();
    }

    for (const comp of this._components) {
      comp.synthesize();
    }

    if (!isTruthy(process.env.PROJEN_DISABLE_POST)) {
      for (const comp of this._components) {
        comp.postSynthesize();
      }

      // project-level hook
      this.postSynthesize();
    }

    if (this.ejected) {
      this.logger.debug("Ejecting project...");

      // Backup projenrc files
      const files = glob.sync(".projenrc.*", {
        cwd: this.outdir,
        dot: true,
        nodir: true,
        absolute: true,
      });

      for (const file of files) {
        renameSync(file, `${file}.bak`);
      }
    }

    this.logger.debug("Synthesis complete");
  }

  /**
   * Whether or not the project is being ejected.
   */
  public get ejected(): boolean {
    return this._ejected;
  }

  /**
   * Called before all components are synthesized.
   */
  public preSynthesize() {}

  /**
   * Called after all components are synthesized. Order is *not* guaranteed.
   */
  public postSynthesize() {}

  /**
   * Adds a component to the project.
   * @internal
   */
  public _addComponent(component: Component) {
    this._components.push(component);
  }

  /**
   * Adds a sub-project to this project.
   *
   * This is automatically called when a new project is created with `parent`
   * pointing to this project, so there is no real need to call this manually.
   *
   * @param sub-project The child project to add.
   * @internal
   */
  _addSubProject(subproject: Project) {
    if (subproject.parent !== this) {
      throw new Error('"parent" of child project must be this project');
    }

    // check that `outdir` is exclusive
    for (const p of this.subprojects) {
      if (path.resolve(p.outdir) === path.resolve(subproject.outdir)) {
        throw new Error(
          `there is already a sub-project with "outdir": ${subproject.outdir}`
        );
      }
    }

    this.subprojects.push(subproject);
  }

  /**
   * Resolves the project's output directory.
   */
  private determineOutdir(outdirOption?: string) {
    if (this.parent && outdirOption && path.isAbsolute(outdirOption)) {
      throw new Error('"outdir" must be a relative path');
    }

    // if this is a subproject, it is relative to the parent
    if (this.parent) {
      if (!outdirOption) {
        throw new Error('"outdir" must be specified for subprojects');
      }

      return path.resolve(this.parent.outdir, outdirOption);
    }

    // if this is running inside a test and outdir is not explicitly set
    // use a temp directory (unless cwd is aleady under tmp)
    if (IS_TEST_RUN && !outdirOption) {
      const realCwd = realpathSync(process.cwd());
      const realTmp = realpathSync(tmpdir());

      if (realCwd.startsWith(realTmp)) {
        return path.resolve(realCwd, outdirOption ?? ".");
      }

      return mkdtempSync(path.join(tmpdir(), "projen."));
    }

    return path.resolve(outdirOption ?? ".");
  }
}

/**
 * Which type of project this is.
 *
 * @deprecated no longer supported at the base project level
 */
export enum ProjectType {
  /**
   * This module may be a either a library or an app.
   */
  UNKNOWN = "unknown",

  /**
   * This is a library, intended to be published to a package manager and
   * consumed by other projects.
   */
  LIB = "lib",

  /**
   * This is an app (service, tool, website, etc). Its artifacts are intended to
   * be deployed or published for end-user consumption.
   */
  APP = "app",
}

/**
 * Information passed from `projen new` to the project object when the project
 * is first created. It is used to generate projenrc files in various languages.
 */
export interface InitProject {
  /**
   * The JSII FQN of the project type.
   */
  readonly fqn: string;

  /**
   * Initial arguments passed to `projen new`.
   */
  readonly args: Record<string, any>;

  /**
   * Project metadata.
   */
  readonly type: inventory.ProjectType;

  /**
   * Include commented out options. Does not apply to projenrc.json files.
   * @default InitProjectOptionHints.FEATURED
   */
  readonly comments: InitProjectOptionHints;
}
