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
}

/**
 * Options for `Bundler`.
 */
export interface BundlerOptions extends BundlerCommonOptions {
  /**
   * A parent task that will spawn the "bundle" task (usually "compile").
   */
  readonly parentTask: Task;
}

/**
 * Adds support for bundling JavaScript applications and dependencies into a
 * single file.
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
  private readonly parentTask: Task;

  public readonly esbuildVersion: string | undefined;

  /**
   * Creates a `Bundler`.
   */
  constructor(project: Project, options: BundlerOptions) {
    super(project);

    this.esbuildVersion = options.esbuildVersion;
    this.parentTask = options.parentTask;
  }

  /**
   * Gets or creates the singleton "bundle" task of the project.
   */
  public get bundleTask(): Task {
    if (!this._task) {
      const dep = this.esbuildVersion ? `esbuild@${this.esbuildVersion}` : 'esbuild';
      this.project.deps.addDependency(dep, DependencyType.BUILD);

      this._task = this.project.addTask('bundle', {
        description: 'Bundle assets',
      });

      this.parentTask.spawn(this._task);
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
  public addBundle(name: string, options: BundleOptions): Task {
    const args = [
      'esbuild',
      '--bundle',
      options.entrypoint,
      `--target="${options.target}"`,
      `--platform="${options.platform}"`,
      `--outfile="${options.outfile}"`,
    ];

    for (const x of options.externals ?? []) {
      args.push(`--external:${x}`);
    }

    const bundle = this.project.addTask(`bundle:${name}`, {
      description: `Create a JavaScript bundle from ${options.entrypoint}`,
      exec: args.join(' '),
    });

    this.bundleTask.spawn(bundle);

    return bundle;
  }
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
   * This option sets the output file name for the build operation.
   */
  readonly outfile: string;

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
   */
  readonly externals?: string[];
}
