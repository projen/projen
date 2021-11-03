import { join } from 'path';
import { Component } from '../component';
import { DependencyType } from '../deps';
import { Project } from '../project';
import { Task } from '../tasks';

/**
 * Common options for `Bundler`.
 */
export interface BundlerCommonOptions {
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
  readonly bundledir?: string;
}

/**
 * Options for `Bundler`.
 */
export interface BundlerOptions extends BundlerCommonOptions {
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

  private _task: Task | undefined;

  /**
   * The semantic version requirement for `esbuild` (if defined).
   */
  public readonly esbuildVersion: string | undefined;

  /**
   * Root bundle directory.
   */
  public readonly bundledir: string;

  /**
   * Creates a `Bundler`.
   */
  constructor(project: Project, options: BundlerOptions = {}) {
    super(project);

    this.esbuildVersion = options.esbuildVersion;
    this.bundledir = options.bundledir ?? 'assets';

    const ignoreEntry = `/${this.bundledir}/`;
    project.addGitIgnore(ignoreEntry);
    project.addPackageIgnore(`!${ignoreEntry}`); // include in tarball
  }

  /**
   * The singleton "bundle" task of the project.
   */
  public get bundleTask(): Task {
    if (!this._task) {
      const dep = this.esbuildVersion ? `esbuild@${this.esbuildVersion}` : 'esbuild';
      this.project.deps.addDependency(dep, DependencyType.BUILD);

      const task = this.project.tasks.tryFind('bundle');
      if (!task) {
        throw new Error('Could not find "bundle" task in project');
      }

      this._task = task;
    }

    return this._task;
  }

  /**
   * Adds a task to the project which bundles a specific entrypoint and all of
   * its dependencies into a single javascript output file.
   *
   * @param name The name of the artifact (the task will be named
   * `bundle:$name`).
   * @param options Bundling options
   */
  public addBundle(name: string, options: BundleOptions): Bundle {
    const outfile = join(this.bundledir, name, 'index.js');

    const args = [
      'esbuild',
      '--bundle',
      options.entrypoint,
      `--target="${options.target}"`,
      `--platform="${options.platform}"`,
      `--outfile="${outfile}"`,
    ];

    for (const x of options.externals ?? []) {
      args.push(`--external:${x}`);
    }

    const sourcemap = options.sourcemap ?? true;
    if (sourcemap) {
      args.push('--sourcemap');
    }

    const bundleTask = this.project.addTask(`bundle:${name}`, {
      description: `Create a JavaScript bundle from ${options.entrypoint}`,
      exec: args.join(' '),
    });

    this.bundleTask.spawn(bundleTask);

    let watchTask;
    const watch = options.watchTask ?? true;
    if (watch) {
      watchTask = this.project.addTask(`bundle:${name}:watch`, {
        description: `Continuously update the JavaScript bundle from ${options.entrypoint}`,
        exec: `${args.join(' ')} --watch`,
      });
    }

    return {
      bundleTask: bundleTask,
      watchTask: watchTask,
      outfile: outfile,
    };
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
}

/**
 * Options for bundling.
 */
export interface BundleOptions {
  /**
   * The entrypoint of the code you wish to bundle.
   */
  readonly entrypoint: string;

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
   * @default true
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
