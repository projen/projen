import { mkdtempSync, realpathSync, renameSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import * as path from "path";
import { Construct, IConstruct } from "constructs";
import * as glob from "glob";
import { cleanup, FILE_MANIFEST } from "./cleanup";
import { IS_TEST_RUN, PROJEN_DIR, PROJEN_VERSION } from "./common";
import { Component } from "./component";
import { Dependencies } from "./dependencies";
import { FileBase } from "./file";
import { GitAttributesFile } from "./gitattributes";
import { IgnoreFile } from "./ignore-file";
import * as inventory from "./inventory";
import { resolveInitProject } from "./javascript/render-options";
import { JsonFile } from "./json";
import { Logger, LoggerOptions } from "./logger";
import { InitProjectOptionHints } from "./option-hints";
import { ProjectBuild as ProjectBuild } from "./project-build";
import { Projenrc, ProjenrcOptions } from "./projenrc-json";
import { Task, TaskOptions } from "./task";
import { Tasks } from "./tasks";
import { isTruthy } from "./util";

const PROJECT_SYMBOL = Symbol.for("projen.Project");

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

  /**
   * Generate (once) .projenrc.json (in JSON). Set to `false` in order to disable
   * .projenrc.json generation.
   *
   * @default false
   */
  readonly projenrcJson?: boolean;

  /**
   * Options for .projenrc.json
   * @default - default options
   */
  readonly projenrcJsonOptions?: ProjenrcOptions;

  /**
   * The shell command to use in order to run the projen CLI.
   *
   * Can be used to customize in special environments.
   *
   * @default "npx projen"
   */
  readonly projenCommand?: string;
}

/**
 * Base project
 */
export class Project extends Construct {
  /**
   * The name of the default task (the task executed when `projen` is run without arguments). Normally
   * this task should synthesize the project files.
   */
  public static readonly DEFAULT_TASK = "default";

  /**
   * Return whether the given object is a Project.
   */
  public static isProject(x: any): x is Project {
    return x !== null && typeof x === "object" && PROJECT_SYMBOL in x;
  }

  /**
   * Returns the immediate Project a construct belongs to.
   * @param construct the construct
   */
  public static ofProject(construct: IConstruct): Project {
    // TODO: cache this - see https://github.com/aws/aws-cdk/blob/cefdfd384eeac1752567f672452296def68b1206/packages/%40aws-cdk/core/lib/stack.ts#L171
    if (Project.isProject(construct)) {
      return construct;
    }

    const parent = construct.node.scope as Construct;
    if (!parent) {
      throw new Error("cannot find a parent project (directly or indirectly)");
    }

    return Project.ofProject(parent);
  }

  /**
   * Project name.
   */
  public readonly name: string;

  /**
   * .gitignore
   */
  public readonly gitignore: IgnoreFile;

  /**
   * The .gitattributes file for this repository.
   */
  public readonly gitattributes: GitAttributesFile;

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
   * Project tasks.
   */
  public readonly tasks: Tasks;

  /**
   * Project dependencies.
   */
  public readonly deps: Dependencies;

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

  /**
   * The command to use in order to run the projen CLI.
   */
  public readonly projenCommand: string;

  /**
   * This is the "default" task, the one that executes "projen". Undefined if
   * the project is being ejected.
   */
  public readonly defaultTask?: Task;

  /**
   * This task ejects the project from projen. This is undefined if the project
   * it self is being ejected.
   *
   * See docs for more information.
   */
  private readonly ejectTask?: Task;

  /**
   * Manages the build process of the project.
   */
  public readonly projectBuild: ProjectBuild;

  private readonly subprojects = new Array<Project>();
  private readonly tips = new Array<string>();
  private readonly excludeFromCleanup: string[];
  private readonly _ejected: boolean;

  constructor(options: ProjectOptions) {
    super(undefined as any, options.name);
    this.initProject = resolveInitProject(options);

    Object.defineProperty(this, PROJECT_SYMBOL, { value: true });

    this.name = options.name;
    this.parent = options.parent;
    this.excludeFromCleanup = [];

    this._ejected = isTruthy(process.env.PROJEN_EJECTING);

    if (this.ejected) {
      this.projenCommand = "scripts/run-task";
    } else {
      this.projenCommand = options.projenCommand ?? "npx projen";
    }

    this.outdir = this.determineOutdir(options.outdir);
    this.root = this.parent ? this.parent.root : this;

    // must happen after this.outdir, this.parent and this.root are initialized
    this.parent?._addSubProject(this);

    // ------------------------------------------------------------------------

    this.gitattributes = new GitAttributesFile(this);
    this.annotateGenerated("/.projen/**"); // contents  of the .projen/ directory are generated by projen
    this.annotateGenerated(`/${this.gitattributes.path}`); // the .gitattributes file itself is generated

    this.gitignore = new IgnoreFile(this, ".gitignore");
    this.gitignore.exclude("node_modules/"); // created by running `npx projen`
    this.gitignore.include(`/${this.gitattributes.path}`);

    // oh no: tasks depends on gitignore so it has to be initialized after
    // smells like dep injectionn but god forbid.
    this.tasks = new Tasks(this);

    if (!this.ejected) {
      this.defaultTask = this.tasks.addTask(Project.DEFAULT_TASK, {
        description: "Synthesize project files",
      });

      this.ejectTask = this.tasks.addTask("eject", {
        description: "Remove projen from the project",
        env: {
          PROJEN_EJECTING: "true",
        },
      });
      this.ejectTask.spawn(this.defaultTask);
    }

    this.projectBuild = new ProjectBuild(this);

    this.deps = new Dependencies(this);

    this.logger = new Logger(this, options.logging);

    const projenrcJson = options.projenrcJson ?? false;
    if (projenrcJson) {
      new Projenrc(this, options.projenrcJsonOptions);
    }

    if (!this.ejected) {
      new JsonFile(this, FILE_MANIFEST, {
        omitEmpty: true,
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
    const isComponent = (c: IConstruct): c is Component =>
      c instanceof Component;
    return this.node.findAll().filter(isComponent);
  }

  /**
   * All files in this project.
   */
  public get files(): FileBase[] {
    const isFile = (c: Component): c is FileBase => c instanceof FileBase;
    return this.components
      .filter(isFile)
      .sort((f1, f2) => f1.path.localeCompare(f2.path));
  }

  /**
   * Adds a new task to this project. This will fail if the project already has
   * a task with this name.
   *
   * @param name The task name to add
   * @param props Task properties
   */
  public addTask(name: string, props: TaskOptions = {}) {
    return this.tasks.addTask(name, props);
  }

  /**
   * Removes a task from a project.
   *
   * @param name The name of the task to remove.
   *
   * @returns The `Task` that was removed, otherwise `undefined`.
   */
  public removeTask(name: string) {
    return this.tasks.removeTask(name);
  }

  public get buildTask() {
    return this.projectBuild.buildTask;
  }
  public get compileTask() {
    return this.projectBuild.compileTask;
  }
  public get testTask() {
    return this.projectBuild.testTask;
  }
  public get preCompileTask() {
    return this.projectBuild.preCompileTask;
  }
  public get postCompileTask() {
    return this.projectBuild.postCompileTask;
  }
  public get packageTask() {
    return this.projectBuild.packageTask;
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
   * Returns the shell command to execute in order to run a task.
   *
   * By default, this is `npx projen@<version> <task>`
   *
   * @param task The task for which the command is required
   */
  public runTaskCommand(task: Task) {
    return `npx projen@${PROJEN_VERSION} ${task.name}`;
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
   * @param pattern The glob pattern to ignore.
   */
  public addGitIgnore(pattern: string) {
    this.gitignore.addPatterns(pattern);
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

    for (const comp of this.components) {
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

    for (const comp of this.components) {
      comp.synthesize();
    }

    if (!isTruthy(process.env.PROJEN_DISABLE_POST)) {
      for (const comp of this.components) {
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

    this.generateTreeMetadata();

    this.logger.debug("Synthesis complete");
  }

  // copied from https://github.com/aws/aws-cdk/blob/v2-main/packages/@aws-cdk/core/lib/private/tree-metadata.ts
  private generateTreeMetadata() {
    const FILE_PATH = "tree.json";

    const lookup: { [path: string]: Node } = {};

    const visit = (construct: IConstruct): Node => {
      const children = construct.node.children.map((c) => {
        try {
          return visit(c);
        } catch (e) {
          console.error(
            `Failed to render tree metadata for node [${c.node.id}]. Reason: ${e}`
          );
          return undefined;
        }
      });
      const childrenMap = children
        .filter((child) => child !== undefined)
        .reduce((map, child) => Object.assign(map, { [child!.id]: child }), {});

      const node: Node = {
        id: construct.node.id || "App",
        path: construct.node.path,
        children:
          Object.keys(childrenMap).length === 0 ? undefined : childrenMap,
        constructInfo: constructInfoFromConstruct(construct),
      };

      lookup[node.path] = node;

      return node;
    };

    const tree = {
      version: "tree-0.1",
      tree: visit(this.node.root),
    };

    writeFileSync(
      path.join(this.outdir, PROJEN_DIR, FILE_PATH),
      JSON.stringify(tree, undefined, 2),
      { encoding: "utf-8" }
    );
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

/**
 * Symbol for accessing jsii runtime information
 *
 * Introduced in jsii 1.19.0, cdk 1.90.0.
 */
const JSII_RUNTIME_SYMBOL = Symbol.for("jsii.rtti");

/**
 * Source information on a construct (class fqn and version)
 */
export interface ConstructInfo {
  readonly fqn: string;
  readonly version: string;
}

export function constructInfoFromConstruct(
  construct: IConstruct
): ConstructInfo | undefined {
  const jsiiRuntimeInfo =
    Object.getPrototypeOf(construct).constructor[JSII_RUNTIME_SYMBOL];
  if (
    typeof jsiiRuntimeInfo === "object" &&
    jsiiRuntimeInfo !== null &&
    typeof jsiiRuntimeInfo.fqn === "string" &&
    typeof jsiiRuntimeInfo.version === "string"
  ) {
    return { fqn: jsiiRuntimeInfo.fqn, version: jsiiRuntimeInfo.version };
  } else if (jsiiRuntimeInfo) {
    // There is something defined, but doesn't match our expectations. Fail fast and hard.
    throw new Error(
      `malformed jsii runtime info for construct: '${construct.node.path}'`
    );
  }
  return undefined;
}

interface Node {
  readonly id: string;
  readonly path: string;
  readonly children?: { [key: string]: Node };
  readonly attributes?: { [key: string]: any };

  /**
   * Information on the construct class that led to this node, if available
   */
  readonly constructInfo?: ConstructInfo;
}
