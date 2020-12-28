import { existsSync } from 'fs';
import * as path from 'path';
import { cleanup } from './cleanup';
import { Clobber } from './clobber';
import { PROJEN_RC } from './common';
import { Component } from './component';
import { Dependencies } from './deps';
import { FileBase } from './file';
import { GitHub } from './github';
import { Gitpod } from './gitpod';
import { IgnoreFile } from './ignore-file';
import { JsonFile } from './json';
import * as logging from './logging';
import { SampleReadme } from './readme';
import { TaskOptions } from './tasks';
import { Tasks } from './tasks/tasks';
import { isTruthy } from './util';
import { VsCode } from './vscode';

export interface ProjectOptions {
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
   * Adds a gitpod configuration
   *
   * @default false
   */
  readonly gitpod?: boolean;

  /**
   * Add a `clobber` task which resets the repo to origin.
   * @default true
   */
  readonly clobber?: boolean;

  /*
   * The name of the README.md file
   *
   * @default "README.md"
   * @example "readme.md"
   */
  readonly readme?: string;

  /**
   * Which type of project this is (library/app).
   * @default ProjectType.UNKNOWN
   */
  readonly projectType?: ProjectType;
}

/**
 * Base project
 */
export class Project {
  /**
   * .gitignore
   */
  public readonly gitignore: IgnoreFile;

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
   * Access all github components.
   *
   * This will be `undefined` for subprojects.
   */
  public readonly github: GitHub | undefined;

  /**
   * Access all VSCode components.
   *
   * This will be `undefined` for subprojects.
   */
  public readonly vscode: VsCode | undefined;

  public readonly tasks: Tasks;

  /**
   * Access for Gitpod
   *
   * This will be `undefined` if gitpod boolean is false
   */
  public readonly gitpod: Gitpod | undefined;

  /**
   * Which project type this is.
   */
  public readonly projectType: ProjectType;

  /**
   * Project dependencies.
   */
  public readonly deps: Dependencies;

  private readonly _components = new Array<Component>();
  private readonly subprojects = new Array<Project>();
  private readonly tips = new Array<string>();
  private readonly excludeFromCleanup: string[];

  constructor(options: ProjectOptions = { }) {
    this.parent = options.parent;
    this.excludeFromCleanup = [];
    this.projectType = options.projectType ?? ProjectType.UNKNOWN;

    if (this.parent && options.outdir && path.isAbsolute(options.outdir)) {
      throw new Error('"outdir" must be a relative path');
    }

    let outdir;
    if (options.parent) {
      if (!options.outdir) {
        throw new Error('"outdir" must be specified for subprojects');
      }

      outdir = path.join(options.parent.outdir, options.outdir);
    } else {
      outdir = options.outdir ?? '.';
    }

    if (outdir === '.') {
      if (!existsSync(path.join(outdir, PROJEN_RC))) {
        throw new Error('cannot use outdir="." because projenrc.js does not exist in the current directory');
      }
    }

    this.outdir = path.resolve(outdir);

    this.root = this.parent ? this.parent.root : this;

    // must happen after this.outdir, this.parent and this.root are initialized
    this.parent?._addSubProject(this);

    // ------------------------------------------------------------------------

    this.gitignore = new IgnoreFile(this, '.gitignore');
    this.gitignore.exclude('node_modules/'); // created by running `npx projen`

    // oh no: tasks depends on gitignore so it has to be initialized after
    // smells like dep injectionn but god forbid.
    this.tasks = new Tasks(this);
    this.deps = new Dependencies(this);

    // we only allow these global services to be used in root projects
    this.github = !this.parent ? new GitHub(this) : undefined;
    this.vscode = !this.parent ? new VsCode(this) : undefined;

    this.gitpod = options.gitpod ? new Gitpod(this) : undefined;

    if (options.clobber ?? true) {
      new Clobber(this);
    }

    new SampleReadme(this, '# my project', {
      filename: options.readme,
    });
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
    return this._components.filter(isFile).sort((f1, f2) => f1.path.localeCompare(f2.path));
  }

  /**
   * Adds a new task to this project. This will fail if the project already has
   * a task with this name.
   *
   * @param name The task name to add
   * @param props Task properties
   */
  public addTask(name: string, props: TaskOptions = { }) {
    return this.tasks.addTask(name, props);
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
    const absolute = path.isAbsolute(filePath) ? filePath : path.resolve(this.outdir, filePath);
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
   */
  public tryFindJsonFile(filePath: string): JsonFile | undefined {
    const file = this.tryFindFile(filePath);
    if (!file) {
      return undefined;
    }

    if (!(file instanceof JsonFile)) {
      throw new Error(`found file ${filePath} but it is not a JsonFile. got: ${file.constructor.name}`);
    }

    return file;
  }

  /**
   * Prints a "tip" message during synthesis.
   * @param message The message
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
    this.preSynthesize();

    for (const comp of this._components) {
      comp.preSynthesize();
    }

    // delete all generated files before we start synthesizing new ones
    cleanup(outdir, this.excludeFromCleanup);

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

    logging.info('Synthesis complete');
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
        throw new Error(`there is already a sub-project with "outdir": ${subproject.outdir}`);
      }
    }

    this.subprojects.push(subproject);
  }
}


/**
 * Which type of project this is.
 */
export enum ProjectType {
  /**
   * This module may be a either a library or an app.
   */
  UNKNOWN = 'unknown',

  /**
   * This is a library, intended to be published to a package manager and
   * consumed by other projects.
   */
  LIB = 'lib',

  /**
   * This is an app (service, tool, website, etc). Its artifacts are intended to
   * be deployed or published for end-user consumption.
   */
  APP = 'app'
}
