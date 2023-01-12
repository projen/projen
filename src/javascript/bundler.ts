import * as path from "path";
import { renderBundleName } from "./util";
import { Component } from "../component";
import { DependencyType } from "../dependencies";
import { Project } from "../project";
import { Task } from "../task";

/**
 * Options for `Bundler`.
 */
export interface BundlerOptions {
  /**
   * The semantic version requirement for `esbuild`.
   *
   * @default - no specific version (implies latest)
   */
  readonly esbuildVersion?: string;

  /**
   * Output directory for all bundles.
   * @default "assets"
   */
  readonly assetsDir?: string;

  /**
   * Install the `bundle` command as a pre-compile phase.
   *
   * @default true
   */
  readonly addToPreCompile?: boolean;

  /**
   * Map of file extensions (without dot) and loaders to use for this file type.
   * Loaders are appended to the esbuild command by `--loader:.extension=loader`
   */
  readonly loaders?: { [key: string]: string };
}

/**
 * Adds support for bundling JavaScript applications and dependencies into a
 * single file. In the future, this will also supports bundling websites.
 */
export class Bundler extends Component {
  /**
   * Returns the `Bundler` instance associated with a project or `undefined` if
   * there is no Bundler.
   * @param project The project
   * @returns A bundler
   */
  public static of(project: Project): Bundler | undefined {
    const isBundler = (o: Component): o is Bundler => o instanceof Bundler;
    return project.components.find(isBundler);
  }

  /**
   * The semantic version requirement for `esbuild` (if defined).
   */
  public readonly esbuildVersion: string | undefined;

  /**
   * Root bundle directory.
   */
  public readonly bundledir: string;

  private _task: Task | undefined;
  private readonly addToPreCompile: boolean;
  private readonly loaders?: { [key: string]: string };

  /**
   * Creates a `Bundler`.
   */
  constructor(project: Project, options: BundlerOptions = {}) {
    super(project);

    this.esbuildVersion = options.esbuildVersion;
    this.bundledir = options.assetsDir ?? "assets";
    this.addToPreCompile = options.addToPreCompile ?? true;
    this.loaders = options.loaders;
  }

  /**
   * Gets or creates the singleton "bundle" task of the project.
   *
   * If the project doesn't have a "bundle" task, it will be created and spawned
   * during the pre-compile phase.
   */
  public get bundleTask(): Task {
    if (!this._task) {
      this.addBundlingSupport();
      this._task = this.project.tasks.addTask("bundle", {
        description: "Prepare assets",
      });

      // install the bundle task into the pre-compile phase.
      if (this.addToPreCompile) {
        this.project.preCompileTask.spawn(this._task);
      }
    }

    return this._task;
  }

  /**
   * Adds a task to the project which bundles a specific entrypoint and all of
   * its dependencies into a single javascript output file.
   *
   * @param entrypoint The relative path of the artifact within the project
   * @param options Bundling options
   */
  public addBundle(entrypoint: string, options: AddBundleOptions): Bundle {
    const name = renderBundleName(entrypoint);

    const outdir = path.posix.join(this.bundledir, name);
    const outfile = path.posix.join(outdir, options.outfile ?? "index.js");
    const args = [
      "esbuild",
      "--bundle",
      entrypoint,
      `--target="${options.target}"`,
      `--platform="${options.platform}"`,
      `--outfile="${outfile}"`,
    ];

    const tsconfig = options.tsconfigPath ?? false;
    if (tsconfig) {
      args.push(`--tsconfig="${tsconfig}"`);
    }

    for (const x of options.externals ?? []) {
      args.push(`--external:${x}`);
    }

    const sourcemap = options.sourcemap ?? false;
    if (sourcemap) {
      args.push("--sourcemap");
    }

    const loaders =
      options.loaders ?? false ? options.loaders : this.loaders ?? false;
    if (loaders) {
      for (let [extension, loader] of Object.entries(loaders)) {
        args.push(`--loader:.${extension}=${loader}`);
      }
    }

    const bundleTask = this.project.addTask(`bundle:${name}`, {
      description: `Create a JavaScript bundle from ${entrypoint}`,
      exec: args.join(" "),
    });

    this.bundleTask.spawn(bundleTask);

    if (options.executable ?? false) {
      bundleTask.exec(`chmod +x ${outfile}`);
    }

    let watchTask;
    const watch = options.watchTask ?? true;
    if (watch) {
      watchTask = this.project.addTask(`bundle:${name}:watch`, {
        description: `Continuously update the JavaScript bundle from ${entrypoint}`,
        exec: `${args.join(" ")} --watch`,
      });
    }

    return {
      bundleTask: bundleTask,
      watchTask: watchTask,
      outdir: outdir,
      outfile: outfile,
    };
  }

  /**
   * Add bundling support to a project. This is called implicitly when
   * `bundleTask` is referenced first. It adds the dependency on `esbuild`,
   * gitignore/npmignore, etc.
   */
  private addBundlingSupport() {
    const ignoreEntry = `/${this.bundledir}/`;
    this.project.addGitIgnore(ignoreEntry);
    this.project.addPackageIgnore(`!${ignoreEntry}`); // include in tarball
    const dep = this.esbuildVersion
      ? `esbuild@${this.esbuildVersion}`
      : "esbuild";
    this.project.deps.addDependency(dep, DependencyType.BUILD);
  }
}

export interface Bundle {
  /**
   * The task that produces this bundle.
   */
  readonly bundleTask: Task;

  /**
   * The "watch" task for this bundle.
   */
  readonly watchTask?: Task;

  /**
   * Location of the output file (relative to project root).
   */
  readonly outfile: string;

  /**
   * Base directory containing the output file (relative to project root).
   */
  readonly outdir: string;
}

/**
 * Options for bundling.
 */
export interface BundlingOptions {
  /**
   * You can mark a file or a package as external to exclude it from your build.
   * Instead of being bundled, the import will be preserved (using require for
   * the iife and cjs formats and using import for the esm format) and will be
   * evaluated at run time instead.
   *
   * This has several uses. First of all, it can be used to trim unnecessary
   * code from your bundle for a code path that you know will never be executed.
   * For example, a package may contain code that only runs in node but you will
   * only be using that package in the browser. It can also be used to import
   * code in node at run time from a package that cannot be bundled. For
   * example, the fsevents package contains a native extension, which esbuild
   * doesn't support.
   *
   * @default []
   */
  readonly externals?: string[];

  /**
   * Include a source map in the bundle.
   *
   * @default false
   */
  readonly sourcemap?: boolean;

  /**
   * In addition to the `bundle:xyz` task, creates `bundle:xyz:watch` task which will
   * invoke the same esbuild command with the `--watch` flag. This can be used
   * to continusouly watch for changes.
   *
   * @default true
   */
  readonly watchTask?: boolean;
}

/**
 * Options for `addBundle()`.
 */
export interface AddBundleOptions extends BundlingOptions {
  /**
   * esbuild target.
   *
   * @example "node12"
   */
  readonly target: string;

  /**
   * esbuild platform.
   *
   * @example "node"
   */
  readonly platform: string;

  /**
   * Bundler output path relative to the asset's output directory.
   * @default "index.js"
   */
  readonly outfile?: string;

  /**
   * Mark the output file as executable.
   * @default false
   */
  readonly executable?: boolean;

  /**
   * The path of the tsconfig.json file to use for bundling
   * @default "tsconfig.json"
   */
  readonly tsconfigPath?: string;

  /**
   * Map of file extensions (without dot) and loaders to use for this file type.
   * Loaders are appended to the esbuild command by `--loader:.extension=loader`
   */
  readonly loaders?: { [key: string]: string };
}
