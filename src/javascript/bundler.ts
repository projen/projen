import * as path from "path";
import { join as pathJoin } from "path";
import { renderBundleName } from "./util";
import { Component } from "../component";
import { DependencyType } from "../dependencies";
import { Project } from "../project";
import { Task } from "../task";

// Parts of this file inspired by @aws-cdk-lib/aws-lambda-nodejs
//   https://github.com/aws/aws-cdk/blob/c3c771c6f6f6790f2298a85a549bded640d2e35b/packages/aws-cdk-lib/aws-lambda-nodejs/lib/bundling.ts#L195

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
   * @deprecated Use `runBundleTask` instead.
   */
  readonly addToPreCompile?: boolean;

  /**
   * Choose which phase (if any) to add the `bundle` command to.
   *
   * Note: If using `addBundle()` with the `bundleCompiledResults`, this option
   * must be set to `RunBundleTask.POST_COMPILE` or `RunBundleTask.MANUAL`.
   *
   * @see AddBundleOptions.bundleCompiledResults
   *
   * @default RunBundleTask.PRE_COMPILE
   */
  readonly runBundleTask?: RunBundleTask;

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
  private readonly runBundleTask?: RunBundleTask;
  private readonly loaders?: { [key: string]: string };

  /**
   * Creates a `Bundler`.
   */
  constructor(project: Project, options: BundlerOptions = {}) {
    super(project);

    this.esbuildVersion = options.esbuildVersion;
    this.bundledir = options.assetsDir ?? "assets";
    this.loaders = options.loaders;

    this.runBundleTask =
      options.runBundleTask ??
      (options.addToPreCompile === false
        ? RunBundleTask.MANUAL
        : RunBundleTask.PRE_COMPILE);
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
      if (this.runBundleTask === RunBundleTask.PRE_COMPILE) {
        this.project.preCompileTask.spawn(this._task);
      } else if (this.runBundleTask === RunBundleTask.POST_COMPILE) {
        this.project.postCompileTask.spawn(this._task);
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

    if (options.tsconfigPath) {
      args.push(`--tsconfig="${options.tsconfigPath}"`);
    }

    for (const x of options.externals ?? []) {
      args.push(`--external:${x}`);
    }

    if (options.sourcemap || options.sourceMapMode) {
      const sourceMapMode = options.sourceMapMode ?? SourceMapMode.DEFAULT;
      const sourceMapValue =
        sourceMapMode === SourceMapMode.DEFAULT
          ? ""
          : `=${options.sourceMapMode}`;
      args.push(`--sourcemap${sourceMapValue}`);

      if (options.sourcesContent === true) {
        args.push(`--sources-content=${options.sourcesContent}`);
      }
    }

    const format = options.format;
    if (format) {
      args.push(`--format=${format}`);
    }

    const loaders =
      options.loaders ?? false ? options.loaders : this.loaders ?? false;
    if (loaders) {
      for (let [extension, loader] of Object.entries(loaders)) {
        args.push(`--loader:.${extension}=${loader}`);
      }
    }

    const defines = Object.entries(options.define ?? {});
    for (const [key, value] of defines) {
      args.push(`--define:${key}=${JSON.stringify(value)}`);
    }

    if (options.minify) {
      args.push("--minify");
    }

    if (options.logLevel) {
      args.push(`--log-level=${options.logLevel}`);
    }
    if (options.keepNames) {
      args.push("--keep-names");
    }
    if (options.metafile) {
      args.push(`--metafile=${pathJoin(outdir, "index.meta.json")}`);
    }
    if (options.banner) {
      args.push(`--banner:js=${JSON.stringify(options.banner)}`);
    }
    if (options.footer) {
      args.push(`--footer:js=${JSON.stringify(options.footer)}`);
    }
    if (options.mainFields) {
      args.push(`--main-fields=${options.mainFields.join(",")}`);
    }
    if (options.inject) {
      args.push(...options.inject.map((i) => `--inject:${i}`));
    }
    if (options.esbuildArgs) {
      const subArgs = new Array<string>();

      for (const [key, value] of Object.entries(options.esbuildArgs)) {
        if (value === true || value === "") {
          subArgs.push(key);
        } else if (value) {
          subArgs.push(`${key}="${value}"`);
        }
      }

      args.push(subArgs.join(" "));
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

  /**
   * Output format for the generated JavaScript files. There are currently three possible values that can be configured: `"iife"`, `"cjs"`, and `"esm"`.
   *
   * If not set (`undefined`), esbuild picks an output format for you based on `platform`:
   * - `"cjs"` if `platform` is `"node"`
   * - `"iife"` if `platform` is `"browser"`
   * - `"esm"` if `platform` is `"neutral"`
   *
   * Note: If making a bundle to run under node with ESM, set `format` to `"esm"` instead of setting `platform` to `"neutral"`.
   *
   * @default undefined
   *
   * @see https://esbuild.github.io/api/#format
   */

  readonly format?: string;

  /**
   * Whether to minify files when bundling.
   *
   * @default false
   */
  readonly minify?: boolean;

  /**
   * Source map mode to be used when bundling.
   * @see https://esbuild.github.io/api/#sourcemap
   *
   * @default SourceMapMode.DEFAULT
   */
  readonly sourceMapMode?: SourceMapMode;

  /**
   * Whether to include original source code in source maps when bundling.
   *
   * @see https://esbuild.github.io/api/#sources-content
   *
   * @default true
   */
  readonly sourcesContent?: boolean;

  /**
   * Log level for esbuild. This is also propagated to the package manager and
   * applies to its specific install command.
   *
   * @default LogLevel.WARNING
   */
  readonly logLevel?: BundleLogLevel;

  /**
   * Whether to preserve the original `name` values even in minified code.
   *
   * In JavaScript the `name` property on functions and classes defaults to a
   * nearby identifier in the source code.
   *
   * However, minification renames symbols to reduce code size and bundling
   * sometimes need to rename symbols to avoid collisions. That changes value of
   * the `name` property for many of these cases. This is usually fine because
   * the `name` property is normally only used for debugging. However, some
   * frameworks rely on the `name` property for registration and binding purposes.
   * If this is the case, you can enable this option to preserve the original
   * `name` values even in minified code.
   *
   * @default false
   */
  readonly keepNames?: boolean;

  /**
   * This option tells esbuild to write out a JSON file relative to output directory with metadata about the build.
   *
   * The metadata in this JSON file follows this schema (specified using TypeScript syntax):
   *
   * ```text
   * {
   *   outputs: {
   *     [path: string]: {
   *       bytes: number
   *       inputs: {
   *         [path: string]: { bytesInOutput: number }
   *       }
   *       imports: { path: string }[]
   *       exports: string[]
   *     }
   *   }
   * }
   * ```
   * This data can then be analyzed by other tools. For example,
   * bundle buddy can consume esbuild's metadata format and generates a treemap visualization
   * of the modules in your bundle and how much space each one takes up.
   * @see https://esbuild.github.io/api/#metafile
   * @default false
   */
  readonly metafile?: boolean;

  /**
   * Use this to insert an arbitrary string at the beginning of generated JavaScript files.
   *
   * This is similar to footer which inserts at the end instead of the beginning.
   *
   * This is commonly used to insert comments:
   *
   * @default - no comments are passed
   */
  readonly banner?: string;

  /**
   * Use this to insert an arbitrary string at the end of generated JavaScript files.
   *
   * This is similar to banner which inserts at the beginning instead of the end.
   *
   * This is commonly used to insert comments
   *
   * @default - no comments are passed
   */
  readonly footer?: string;

  /**
   * The charset to use for esbuild's output.
   *
   * By default esbuild's output is ASCII-only. Any non-ASCII characters are escaped
   * using backslash escape sequences. Using escape sequences makes the generated output
   * slightly bigger, and also makes it harder to read. If you would like for esbuild to print
   * the original characters without using escape sequences, use `Charset.UTF8`.
   *
   * @see https://esbuild.github.io/api/#charset
   * @default Charset.ASCII
   */
  readonly charset?: Charset;

  /**
   * Replace global identifiers with constant expressions.
   *
   * For example, `{ 'process.env.DEBUG': 'true' }`.
   *
   * Another example, `{ 'process.env.API_KEY': JSON.stringify('xxx-xxxx-xxx') }`.
   *
   * @default - no replacements are made
   */
  readonly define?: { [key: string]: string };

  /**
   * Build arguments to pass into esbuild.
   *
   * For example, to add the [--log-limit](https://esbuild.github.io/api/#log-limit) flag:
   *
   * ```text
   * project.bundler.addBundle("./src/hello.ts", {
   *   platform: "node",
   *   target: "node22",
   *   sourcemap: true,
   *   format: "esm",
   *   esbuildArgs: {
   *     "--log-limit": "0",
   *   },
   * });
   * ```
   *
   * @default - no additional esbuild arguments are passed
   */
  readonly esbuildArgs?: { [key: string]: string | boolean };

  /**
   * How to determine the entry point for modules.
   * Try ['module', 'main'] to default to ES module versions.
   *
   * @default []
   */
  readonly mainFields?: string[];

  /**
   * This option allows you to automatically replace a global variable with an
   * import from another file.
   *
   * @see https://esbuild.github.io/api/#inject
   * @default - no code is injected
   */
  readonly inject?: string[];
}

/**
 * Options for BundlerOptions.runBundleTask
 */
export enum RunBundleTask {
  /**
   * Don't bundle automatically as part of the build.
   */
  MANUAL = "manual",
  /**
   * Bundle automatically before compilation.
   */
  PRE_COMPILE = "pre_compile",
  /**
   * Bundle automatically after compilation. This is useful if you want to
   * bundle the compiled results.
   *
   * Thus will run compilation tasks (using tsc, etc.) before running file
   * through bundling step.
   *
   * This is only required unless you are using new experimental features that
   * are not supported by `esbuild` but are supported by typescript's `tsc`
   * compiler. One example of such feature is `emitDecoratorMetadata`.
   *
   * ```typescript
   * // In a TypeScript project with output configured
   * // to go to the "lib" directory:
   * const project = new TypeScriptProject({
   *   name: "test",
   *   defaultReleaseBranch: "main",
   *   tsconfig: {
   *     compilerOptions: {
   *       outDir: "lib",
   *     },
   *   },
   *   bundlerOptions: {
   *     // ensure we compile with `tsc` before bundling
   *     runBundleTask: RunBundleTask.POST_COMPILE,
   *   },
   * });
   *
   * // Tell the bundler to bundle the compiled results (from the "lib" directory)
   * project.bundler.addBundle("./lib/index.js", {
   *   platform: "node",
   *   target: "node22",
   *   sourcemap: false,
   *   format: "esm",
   * });
   * ```
   **/
  POST_COMPILE = "post_compile",
}

/**
 * SourceMap mode for esbuild
 * @see https://esbuild.github.io/api/#sourcemap
 */
export enum SourceMapMode {
  /**
   * Default sourceMap mode - will generate a .js.map file alongside any generated .js file and add a special //# sourceMappingURL=
   * comment to the bottom of the .js file pointing to the .js.map file
   */
  DEFAULT = "default",
  /**
   *  External sourceMap mode - If you want to omit the special //# sourceMappingURL= comment from the generated .js file but you still
   *  want to generate the .js.map files
   */
  EXTERNAL = "external",
  /**
   * Inline sourceMap mode - If you want to insert the entire source map into the .js file instead of generating a separate .js.map file
   */
  INLINE = "inline",
  /**
   * Both sourceMap mode - If you want to have the effect of both inline and external simultaneously
   */
  BOTH = "both",
}

/**
 * Charset for esbuild's output
 */
export enum Charset {
  /**
   * ASCII
   *
   * Any non-ASCII characters are escaped using backslash escape sequences
   */
  ASCII = "ascii",

  /**
   * UTF-8
   *
   * Keep original characters without using escape sequences
   */
  UTF8 = "utf8",
}

/**
 * Log levels for esbuild and package managers' install commands.
 */
export enum BundleLogLevel {
  /** Show everything */
  VERBOSE = "verbose",
  /** Show everything from info and some additional messages for debugging */
  DEBUG = "debug",
  /** Show warnings, errors, and an output file summary */
  INFO = "info",
  /** Show warnings and errors */
  WARNING = "warning",
  /** Show errors only */
  ERROR = "error",
  /** Show nothing */
  SILENT = "silent",
}
