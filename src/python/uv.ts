import { IConstruct } from "constructs";
import { IPythonDeps } from "./python-deps";
import { IPythonEnv } from "./python-env";
import { IPythonPackaging } from "./python-packaging";
import { Component } from "../component";
import { Dependency, DependencyType } from "../dependencies";
import { Project } from "../project";
import { Task } from "../task";
import { TaskRuntime } from "../task-runtime";
import { TomlFile } from "../toml";
import { exec, execOrUndefined } from "../util";

type AddBounds = "lower" | "major" | "minor" | "exact";
type ForkStrategy = "fewest" | "requires-python";
type IndexStrategy = "first-index" | "unsafe-first-match" | "unsafe-best-match";
type LinkMode = "clone" | "copy" | "hardlink" | "symlink";
type Prerelease =
  | "disallow"
  | "allow"
  | "if-necessary"
  | "explicit"
  | "if-necessary-or-explicit";
type PythonDownloads = "automatic" | "manual" | "never";
type PythonPreference = "only-managed" | "managed" | "system" | "only-system";
type Resolution = "highest" | "lowest" | "lowest-direct";
type AnnotationStyle = "line" | "split";
type DependencyGroup = string | { "include-group": string };

export interface UvIndex {
  readonly name: string;
  readonly url: string;
  readonly explicit?: boolean;
  readonly default?: boolean;
}

export interface UvSource {
  readonly branch?: string;
  readonly commit?: string;
  readonly editable?: boolean;
  readonly extra?: string;
  readonly git?: string;
  readonly index?: string;
  readonly marker?: string;
  readonly package?: boolean;
  readonly path?: string;
  readonly rev?: string;
  readonly subdirectory?: string;
  readonly tag?: string;
  readonly url?: string;
  readonly workspace?: boolean;
}

export interface UvBuildBackendData {
  readonly scripts?: string;
  readonly headers?: string;
  readonly data?: string;
}

export interface UvBuildBackend {
  readonly data?: UvBuildBackendData;
  readonly defaultExcludes?: boolean;
  readonly moduleName?: string | string[];
  readonly moduleRoot?: string;
  readonly namespace?: boolean;
  readonly sourceExclude?: string[];
  readonly sourceInclude?: string[];
  readonly wheelExclude?: string[];
}

export interface UvWorkspace {
  readonly exclude?: string[];
  readonly members?: string[];
}

export interface UvDependencyMetadata {
  readonly name: string;
  readonly version?: string;
  readonly requiresDist?: string[];
  readonly requiresPython?: string;
  readonly providesExtra?: string[];
}

export interface UvPipMetadata {
  readonly allExtras?: boolean;
  readonly allowEmptyRequirements?: boolean;
  readonly annotationStyle?: AnnotationStyle;
  readonly breakSystemPackages?: boolean;
  readonly compileBytecode?: boolean;
  readonly configSettings?: { [key: string]: any };
  readonly configSettingsPackage?: { [key: string]: any };
  readonly customCompileCommand?: string;
  readonly dependencyMetadata?: UvDependencyMetadata[];
  readonly emitBuildOptions?: boolean;
  readonly emitFindLinks?: boolean;
  readonly emitIndexAnnotation?: boolean;
  readonly emitIndexUrl?: boolean;
  readonly emitMarkerExpression?: boolean;
  readonly excludeNewer?: string;
  readonly excludeNewerPackage?: { [key: string]: string };
  readonly extra?: string[];
  readonly extraBuildDependencies?: { [key: string]: string[] };
  readonly extraBuildVariables?: { [key: string]: { [key: string]: string } };
  readonly extraIndexUrl?: string[];
  readonly findLinks?: string[];
  readonly forkStrategy?: ForkStrategy;
  readonly generateHashes?: boolean;
  readonly group?: string[];
  readonly indexStrategy?: IndexStrategy;
  readonly indexUrl?: string;
  readonly keyringProvider?: string;
  readonly linkMode?: LinkMode;
  readonly noAnnotate?: boolean;
  readonly noBinary?: boolean;
  readonly noBuild?: boolean;
  readonly noBuildIsolation?: boolean;
  readonly noBuildIsolationPackage?: string[];
  readonly noDeps?: boolean;
  readonly noEmitPackage?: string[];
  readonly noExtra?: string[];
  readonly noHeader?: boolean;
  readonly noIndex?: boolean;
  readonly noSources?: boolean;
  readonly noStripExtras?: boolean;
  readonly noStripMarkers?: boolean;
  readonly onlyBinary?: string[];
  readonly outputFile?: string;
  readonly prefix?: string;
  readonly prerelease?: Prerelease;
  readonly python?: string;
  readonly pythonPlatform?: string;
  readonly pythonVersion?: string;
  readonly reinstall?: boolean;
  readonly reinstallPackage?: string[];
  readonly requiresHashes?: boolean;
  readonly resolution?: Resolution;
  readonly strict?: boolean;
  readonly system?: boolean;
  readonly target?: string;
  readonly torchBackend?: string;
  readonly universal?: boolean;
  readonly upgrade?: boolean;
  readonly upgradePackage?: string[];
  readonly verifyHashes?: boolean;
}

interface UvTomlStructure {
  project: {
    name?: string;
    version?: string;
    description?: string;
    readme?: string;
    authors: { name: string; email?: string }[];
    "requires-python"?: string;
    dependencies: string[];
    classifiers?: string[];
    keywords?: string[];
    urls?: { [key: string]: string };
    license?: string;
  };
  tool: {
    uv: {
      "build-constraint-dependencies"?: string[];
      conflicts?: { [key: string]: string }[][];
      "constraint-dependencies"?: string[];
      "default-groups"?: string | string[];
      environments?: string[];
      "exclude-dependencies"?: string[];
      managed?: boolean;
      "override-dependencies"?: string[];
      package?: boolean;
      "required-environments"?: string | string[];
      sources?: { [key: string]: UvSource };
      "build-backend"?: {
        data?: UvBuildBackendData;
        "default-excludes"?: boolean;
        "module-name"?: string | string[];
        "module-root"?: string;
        namespace?: boolean;
        "source-exclude"?: string[];
        "source-include"?: string[];
        "wheel-exclude"?: string[];
      };
      workspace?: UvWorkspace;
      "add-bounds"?: AddBounds;
      "allow-insecure-host"?: string[];
      "cache-dir"?: string;
      "cache-keys"?: { [key: string]: any };
      "check-url"?: string;
      "compile-bytecode"?: string;
      "concurrent-builds"?: number;
      "concurrent-downloads"?: number;
      "concurrent-installs"?: number;
      "config-settings"?: { [key: string]: any };
      "config-settings-package"?: { [key: string]: any };
      "dependency-metadata"?: {
        name: string;
        version?: string;
        "requires-dist"?: string[];
        "requires-python"?: string;
        "provides-extra"?: string[];
      }[];
      "exclude-newer"?: string;
      "exclude-newer-package"?: { [key: string]: string };
      "extra-build-dependencies"?: { [key: string]: string[] };
      "extra-build-variables"?: { [key: string]: { [key: string]: string } };
      "extra-index-url"?: string[];
      "find-links"?: string[];
      "fork-strategy"?: ForkStrategy;
      index?: UvIndex[];
      "index-strategy"?: IndexStrategy;
      "index-url"?: string;
      "keyring-provider"?: string;
      "link-mode"?: LinkMode;
      "native-tls"?: boolean;
      "no-binary"?: boolean;
      "no-binary-package"?: string[];
      "no-build"?: boolean;
      "no-build-isolation"?: boolean;
      "no-build-isolation-package"?: string[];
      "no-build-package"?: string[];
      "no-cache"?: boolean;
      "no-index"?: boolean;
      "no-sources"?: boolean;
      offline?: boolean;
      prerelease?: Prerelease;
      preview?: boolean;
      "publish-url"?: string;
      "pypy-install-mirror"?: string;
      "python-downloads"?: PythonDownloads;
      "python-downloads-json-url"?: string;
      "python-install-mirror"?: string;
      "python-preference"?: PythonPreference;
      reinstall?: boolean;
      "reinstall-package"?: string[];
      "required-version"?: string;
      resolution?: Resolution;
      "trusted-publishing"?: string;
      upgrade?: boolean;
      "upgrade-package"?: string[];
      pip?: {
        "all-extras"?: boolean;
        "allow-empty-requirements"?: boolean;
        "annotation-style"?: AnnotationStyle;
        "break-system-packages"?: boolean;
        "compile-bytecode"?: boolean;
        "config-settings"?: { [key: string]: any };
        "config-settings-package"?: { [key: string]: any };
        "custom-compile-command"?: string;
        "dependency-metadata"?: {
          name: string;
          version?: string;
          "requires-dist"?: string[];
          "requires-python"?: string;
          "provides-extra"?: string[];
        }[];
        "emit-build-options"?: boolean;
        "emit-find-links"?: boolean;
        "emit-index-annotation"?: boolean;
        "emit-index-url"?: boolean;
        "emit-marker-expression"?: boolean;
        "exclude-newer"?: string;
        "exclude-newer-package"?: { [key: string]: string };
        extra?: string[];
        "extra-build-dependencies"?: { [key: string]: string[] };
        "extra-build-variables"?: {
          [key: string]: { [key: string]: string };
        };
        "extra-index-url"?: string[];
        "find-links"?: string[];
        "fork-strategy"?: ForkStrategy;
        "generate-hashes"?: boolean;
        group?: string[];
        "index-strategy"?: IndexStrategy;
        "index-url"?: string;
        "keyring-provider"?: string;
        "link-mode"?: LinkMode;
        "no-annotate"?: boolean;
        "no-binary"?: boolean;
        "no-build"?: boolean;
        "no-build-isolation"?: boolean;
        "no-build-isolation-package"?: string[];
        "no-deps"?: boolean;
        "no-emit-package"?: string[];
        "no-extra"?: string[];
        "no-header"?: boolean;
        "no-index"?: boolean;
        "no-sources"?: boolean;
        "no-strip-extras"?: boolean;
        "no-strip-markers"?: boolean;
        "only-binary"?: string[];
        "output-file"?: string;
        prefix?: string;
        prerelease?: Prerelease;
        python?: string;
        "python-platform"?: string;
        "python-version"?: string;
        reinstall?: boolean;
        "reinstall-package"?: string[];
        "requires-hashes"?: boolean;
        resolution?: Resolution;
        strict?: boolean;
        system?: boolean;
        target?: string;
        "torch-backend"?: string;
        universal?: boolean;
        upgrade?: boolean;
        "upgrade-package"?: string[];
        "verify-hashes"?: boolean;
      };
    };
  };
  "dependency-groups"?: { [key: string]: DependencyGroup[] };
}

/**
 * Base options for UV project configuration
 */
export interface UvBaseOptions {
  /**
   * Name of the package
   */
  readonly name?: string;

  /**
   * Version of the package
   */
  readonly version?: string;

  /**
   * Description of the package
   */
  readonly description?: string;

  /**
   * License of the package
   */
  readonly license?: string;

  /**
   * Name of the package author
   */
  readonly authorName?: string;

  /**
   * Email of the package author
   */
  readonly authorEmail?: string;

  /**
   * Homepage URL of the package
   */
  readonly homepage?: string;

  /**
   * Repository URL of the package
   */
  readonly repository?: string;

  /**
   * Documentation URL of the package
   */
  readonly documentation?: string;

  /**
   * Keywords for the package
   */
  readonly keywords?: string[];

  /**
   * Python package classifiers
   * @see https://pypi.org/classifiers/
   */
  readonly classifiers?: string[];

  /**
   * Additional URLs associated with the package
   */
  readonly urls?: { [key: string]: string };

  /**
   * Python version requirement string
   */
  readonly requiresPython?: string;

  /**
   * Path to the readme file
   */
  readonly readme?: string;

  /**
   * Constraints to apply when solving build dependencies.
   */
  readonly buildConstraintDependencies?: string[];

  /**
   * Declare collections of extras or dependency groups that are conflicting (i.e., mutually exclusive).
   */
  readonly conflicts?: { [key: string]: string }[][];

  /**
   * Constraints to apply when resolving the project's dependencies.
   */
  readonly constraintDependencies?: string[];

  /**
   * The list of dependency-groups to install by default.
   */
  readonly defaultGroups?: string | string[];

  /**
   * Supported environments against which to resolve dependencies.
   */
  readonly environments?: string[];

  /**
   * Dependencies to exclude when resolving the project's dependencies.
   */
  readonly excludeDependencies?: string[];

  /**
   * Whether the project is managed by uv. If false, uv will ignore the project when uv run is invoked.
   */
  readonly managed?: boolean;

  /**
   * Overrides to apply when resolving the project's dependencies.
   */
  readonly overrideDependencies?: string[];

  /**
   * Whether the project should be considered a Python package, or a non-package ("virtual") project.
   */
  readonly package?: boolean;

  /**
   * A list of required platforms, for packages that lack source distributions.
   */
  readonly requiredEnvironments?: string | string[];

  /**
   * The sources to use when resolving dependencies.
   */
  readonly sources?: { [key: string]: UvSource };

  /**
   * Settings for the uv build backend (uv_build).
   */
  readonly buildBackend?: UvBuildBackend;

  /**
   * Packages to include or exclude as workspace members.
   */
  readonly workspace?: UvWorkspace;

  /**
   * The default version specifier when adding a dependency.
   */
  readonly addBounds?: AddBounds;

  /**
   * Allow insecure connections to host.
   */
  readonly allowInsecureHost?: string[];

  /**
   * Path to the cache directory.
   */
  readonly cacheDir?: string;

  /**
   * The keys to consider when caching builds for the project.
   */
  readonly cacheKeys?: { [key: string]: any };

  /**
   * Check an index URL for existing files to skip duplicate uploads.
   */
  readonly checkUrl?: string;

  /**
   * Compile Python files to bytecode after installation.
   */
  readonly compileBytecode?: string;

  /**
   * The maximum number of source distributions that uv will build concurrently at any given time.
   */
  readonly concurrentBuilds?: number;

  /**
   * The maximum number of in-flight concurrent downloads that uv will perform at any given time.
   */
  readonly concurrentDownloads?: number;

  /**
   * The number of threads used when installing and unzipping packages.
   */
  readonly concurrentInstalls?: number;

  /**
   * Settings to pass to the PEP 517 build backend.
   */
  readonly configSettings?: { [key: string]: any };

  /**
   * Settings to pass to the PEP 517 build backend for specific packages
   */
  readonly configSettingsPackage?: { [key: string]: any };

  /**
   * Pre-defined static metadata for dependencies of the project (direct or transitive). When provided, enables the resolver to use the specified metadata instead of querying the registry or building the relevant package from source.
   */
  readonly dependencyMetadata?: UvDependencyMetadata[];

  /**
   * Limit candidate packages to those that were uploaded prior to a given point in time.
   */
  readonly excludeNewer?: string;

  /**
   * Limit candidate packages for specific packages to those that were uploaded prior to the given date.
   */
  readonly excludeNewerPackage?: { [key: string]: string };

  /**
   * Additional build dependencies for packages.
   */
  readonly extraBuildDependencies?: { [key: string]: string[] };

  /**
   * Extra environment variables to set when building certain packages.
   */
  readonly extraBuildVariables?: { [key: string]: { [key: string]: string } };

  /**
   * Extra URLs of package indexes to use, in addition to --index-url.
   */
  readonly extraIndexUrl?: string[];

  /**
   * Locations to search for candidate distributions, in addition to those found in the registry indexes.
   */
  readonly findLinks?: string[];

  /**
   * The strategy to use when selecting multiple versions of a given package across Python versions and platforms.
   */
  readonly forkStrategy?: ForkStrategy;

  /**
   * The indexes to use when resolving dependencies.
   */
  readonly index?: UvIndex[];

  /**
   * The strategy to use when resolving against multiple index URLs.
   */
  readonly indexStrategy?: IndexStrategy;

  /**
   * The URL of the Python package index (by default: https://pypi.org/simple).
   */
  readonly indexUrl?: string;

  /**
   * Attempt to use keyring for authentication for index URLs.
   */
  readonly keyringProvider?: string;

  /**
   * The method to use when installing packages from the global cache.
   */
  readonly linkMode?: LinkMode;

  /**
   * Whether to load TLS certificates from the platform's native certificate store.
   */
  readonly nativeTls?: boolean;

  /**
   * Don't install pre-built wheels.
   */
  readonly noBinary?: boolean;

  /**
   * Don't install pre-built wheels for a specific package.
   */
  readonly noBinaryPackage?: string[];

  /**
   * Don't build source distributions.
   */
  readonly noBuild?: boolean;

  /**
   * Disable isolation when building source distributions.
   */
  readonly noBuildIsolation?: boolean;

  /**
   * Disable isolation when building source distributions for a specific package.
   */
  readonly noBuildIsolationPackage?: string[];

  /**
   * Don't build source distributions for a specific package.
   */
  readonly noBuildPackage?: string[];

  /**
   * Avoid reading from or writing to the cache, instead using a temporary directory for the duration of the operation.
   */
  readonly noCache?: boolean;

  /**
   * Ignore all registry indexes (e.g., PyPI), instead relying on direct URL dependencies and those provided via --find-links.
   */
  readonly noIndex?: boolean;

  /**
   * Ignore the tool.uv.sources table when resolving dependencies. Used to lock against the standards-compliant, publishable package metadata, as opposed to using any local or Git sources.
   */
  readonly noSources?: boolean;

  /**
   * Disable network access, relying only on locally cached data and locally available files.
   */
  readonly offline?: boolean;

  /**
   * The strategy to use when considering pre-release versions.
   */
  readonly prerelease?: Prerelease;

  /**
   * Whether to enable experimental, preview features.
   */
  readonly preview?: boolean;

  /**
   * The URL for publishing packages to the Python package index (by default: https://upload.pypi.org/legacy/).
   */
  readonly publishUrl?: string;

  /**
   * Mirror URL to use for downloading managed PyPy installations.
   */
  readonly pypyInstallMirror?: string;

  /**
   * Whether to allow Python downloads.
   */
  readonly pythonDownloads?: PythonDownloads;

  /**
   * URL pointing to JSON of custom Python installations.
   */
  readonly pythonDownloadsJsonUrl?: string;

  /**
   * Mirror URL for downloading managed Python installations.
   */
  readonly pythonInstallMirror?: string;

  /**
   * Whether to prefer using Python installations that are already present on the system, or those that are downloaded and installed by uv.
   */
  readonly pythonPreference?: PythonPreference;

  /**
   * Reinstall all packages, regardless of whether they're already installed. Implies refresh.
   */
  readonly reinstall?: boolean;

  /**
   * Reinstall a specific package, regardless of whether it's already installed. Implies refresh-package.
   */
  readonly reinstallPackage?: string[];

  /**
   * Enforce a requirement on the version of uv.
   */
  readonly requiredVersion?: string;

  /**
   * The strategy to use when selecting between the different compatible versions for a given package requirement.
   */
  readonly resolution?: Resolution;

  /**
   * Configure trusted publishing.
   */
  readonly trustedPublishing?: string;

  /**
   * Allow package upgrades, ignoring pinned versions in any existing output file.
   */
  readonly upgrade?: boolean;

  /**
   * Allow upgrades for a specific package, ignoring pinned versions in any existing output file.
   */
  readonly upgradePackage?: string[];

  /**
   * Settings that are specific to the uv pip command-line interface.
   */
  readonly pip?: UvPipMetadata;
}

/**
 * Options for UV project
 */
export interface UvOptions {
  /**
   * Python version to use for the project.
   * @default "3.12"
   */
  readonly pythonVersion?: string;

  /**
   * List of runtime dependencies for this project.
   * Dependencies use the format: `<module>@<semver>`
   * @default []
   */
  readonly deps?: string[];

  /**
   * List of dev dependencies for this project.
   * Dependencies use the format: `<module>@<semver>`
   * @default []
   */
  readonly devDeps?: string[];

  /**
   * Package metadata
   */
  readonly metadata?: UvBaseOptions;
}

/**
 * Options for UV pyproject.toml configuration
 * @see https://docs.astral.sh/uv/reference/settings/
 */
export interface UvPyprojectOptions extends UvBaseOptions {
  /**
   * Python version to use
   */
  readonly pythonVersion?: string;

  /**
   * A list of dependencies for the project.
   * Each entry should be in the format: `<module>@<semver>`
   */
  readonly dependencies?: any; // lazy string[]

  /**
   * A list of development dependencies for the project.
   * Each entry should be in the format: `<module>@<semver>`
   */
  readonly dependencyGroups?: { [key: string]: any }; // lazy { [key: string]: DependencyGroup[] }
}

/**
 * Manage project dependencies, virtual environments, and packaging through uv.
 */
export class Uv
  extends Component
  implements IPythonDeps, IPythonEnv, IPythonPackaging
{
  public readonly installTask: Task;
  public readonly installCiTask: Task;
  public readonly publishTask: Task;
  public readonly publishTestTask: Task;
  private readonly pyProject: UvPyproject;
  private readonly pythonVersion: string;

  constructor(scope: IConstruct, options: UvOptions) {
    super(scope);
    this.pythonVersion = options.pythonVersion ?? "3.12";

    this.installTask = this.project.addTask("install", {
      description: "Install dependencies and update lockfile",
      exec: "uv sync && uv lock",
    });

    this.installCiTask = this.project.addTask("install:ci", {
      description: "Install dependencies with frozen lockfile",
      exec: "uv sync",
    });

    this.project.tasks.addEnvironment("VIRTUAL_ENV", ".venv");
    this.project.tasks.addEnvironment("PATH", "$(echo .venv/bin:$PATH)");

    this.project.packageTask.exec("uv build");

    this.publishTestTask = this.project.addTask("publish:test", {
      description: "Uploads the package against a test PyPI endpoint.",
      exec: "uv publish --index testpypi",
    });

    this.publishTask = this.project.addTask("publish", {
      description: "Uploads the package to PyPI.",
      exec: "uv publish",
    });

    // Add dependencies first
    if (options.deps) {
      for (const dep of options.deps) {
        this.addDependency(dep);
      }
    }

    if (options.devDeps) {
      for (const dep of options.devDeps) {
        this.addDevDependency(dep);
      }
    }

    this.pyProject = new UvPyproject(this.project, {
      name: this.project.name,
      dependencies: () => this.synthDependencies(),
      dependencyGroups: () => this.synthDependencyGroups(),
      pythonVersion: this.pythonVersion,
      ...options.metadata,
    });
  }

  /** Formats dependencies in UV style. */
  private formatDependency(dep: Dependency): string {
    const name = dep.name;
    const version = dep.version;

    if (!version || version === "*") {
      return name;
    }

    // Translate caret (^) to Python compatible constraints
    if (version.startsWith("^")) {
      const cleanVersion = version.slice(1);
      const [major] = cleanVersion.split(".");
      const nextMajor = Number(major) + 1;
      return `${name}>=${cleanVersion},<${nextMajor}.0.0`;
    }

    // Translate tilde (~) to compatible release clause per PEP 440
    if (version.startsWith("~")) {
      const cleanVersion = version.slice(1);

      // Only keep major.minor for tilde if possible
      const [major, minor = "0", patch = "0"] = cleanVersion.split(".");
      const nextMinor = Number(minor) + 1;
      return `${name}>=${major}.${minor}.${patch},<${major}.${nextMinor}.0`;
    }

    // Otherwise treat as an exact version
    return `${name}==${version}`;
  }

  private getDependencies(dependencyTypes: DependencyType[]): string[] {
    return (
      this.project.deps.all
        .filter(
          (pkg) => dependencyTypes.includes(pkg.type) && pkg.name !== "python"
        )
        // remove duplicate versions of the same dependency
        .filter(
          (dep, index, self) =>
            index === self.findIndex((d) => d.name === dep.name)
        )
        .map((pkg) => this.formatDependency(pkg))
    );
  }

  private synthDependencies(): string[] {
    return this.getDependencies([DependencyType.RUNTIME]);
  }

  private synthDependencyGroups():
    | { [key: string]: DependencyGroup[] }
    | undefined {
    const devDeps = this.getDependencies([
      DependencyType.DEVENV,
      DependencyType.TEST,
    ]);

    if (devDeps) {
      return { dev: devDeps };
    } else {
      return undefined;
    }
  }

  public addDependency(spec: string): void {
    this.project.deps.addDependency(spec, DependencyType.RUNTIME);
  }

  public addDevDependency(spec: string): void {
    this.project.deps.addDependency(spec, DependencyType.DEVENV);
  }

  public setupEnvironment(): void {
    const result = execOrUndefined("which uv", {
      cwd: this.project.outdir,
    });
    if (!result) {
      this.project.logger.info(
        "Unable to setup an environment since uv is not installed. Please install uv (https://github.com/astral-sh/uv) or use a different component for managing environments."
      );
      return;
    }

    // Install Python version if needed
    exec(`uv python install ${this.pythonVersion}`, {
      cwd: this.project.outdir,
    });

    // Create venv with the specific Python version
    exec(`uv venv --python ${this.pythonVersion} .venv`, {
      cwd: this.project.outdir,
    });
    this.project.logger.info(
      `Environment successfully created in .venv directory with Python ${this.pythonVersion}.`
    );
  }

  public installDependencies(): void {
    this.project.logger.info("Installing dependencies...");
    const runtime = new TaskRuntime(this.project.outdir);
    if (this.pyProject.file.changed) {
      runtime.runTask(this.installTask.name);
    } else {
      runtime.runTask(this.installCiTask.name);
    }
  }
}

/**
 * Represents configuration of a pyproject.toml file for a uv project.
 *
 * @see https://docs.astral.sh/uv/concepts/projects/config/
 */
export class UvPyproject extends Component {
  public readonly file: TomlFile;
  private readonly pythonVersion: string;

  constructor(project: Project, options: UvPyprojectOptions) {
    super(project);
    this.pythonVersion = options.pythonVersion ?? "3.12";

    // If no authors provided, use empty array
    const authors: { name: string; email?: string }[] = options.authorName
      ? [{ name: options.authorName, email: options.authorEmail }]
      : [];

    const tomlStructure: UvTomlStructure = {
      "dependency-groups": options.dependencyGroups,
      project: {
        name: options.name,
        version: options.version,
        description: options.description || "",
        readme: options.readme || "README.md",
        authors,
        "requires-python":
          options.requiresPython ||
          `>=${this.pythonVersion},<${
            Number(this.pythonVersion.split(".")[0]) + 1
          }.0`,
        dependencies: options.dependencies,
        classifiers: options.classifiers,
        keywords: options.keywords,
        urls: {
          ...options.urls,
          ...(options.homepage && { Homepage: options.homepage }),
          ...(options.documentation && {
            Documentation: options.documentation,
          }),
          ...(options.repository && { Repository: options.repository }),
        },
        license: options.license,
      },
      tool: {
        uv: {
          "build-constraint-dependencies": options.buildConstraintDependencies,
          conflicts: options.conflicts,
          "constraint-dependencies": options.constraintDependencies,
          "default-groups": options.defaultGroups,
          environments: options.environments,
          "exclude-dependencies": options.excludeDependencies,
          managed: options.managed,
          "override-dependencies": options.overrideDependencies,
          package: options.package,
          "required-environments": options.requiredEnvironments,
          sources: options.sources,
          "build-backend": options.buildBackend
            ? {
                data: options.buildBackend.data,
                "default-excludes": options.buildBackend.defaultExcludes,
                "module-name": options.buildBackend.moduleName,
                "module-root": options.buildBackend.moduleRoot,
                namespace: options.buildBackend.namespace,
                "source-exclude": options.buildBackend.sourceExclude,
                "source-include": options.buildBackend.sourceInclude,
                "wheel-exclude": options.buildBackend.wheelExclude,
              }
            : undefined,
          workspace: options.workspace,
          "add-bounds": options.addBounds,
          "allow-insecure-host": options.allowInsecureHost,
          "cache-dir": options.cacheDir,
          "cache-keys": options.cacheKeys,
          "check-url": options.checkUrl,
          "compile-bytecode": options.compileBytecode,
          "concurrent-builds": options.concurrentBuilds,
          "concurrent-downloads": options.concurrentDownloads,
          "concurrent-installs": options.concurrentInstalls,
          "config-settings": options.configSettings,
          "config-settings-package": options.configSettingsPackage,
          "dependency-metadata": options.dependencyMetadata
            ? options.dependencyMetadata.map((item) => ({
                name: item.name,
                version: item.version,
                "requires-dist": item.requiresDist,
                "requires-python": item.requiresPython,
                "provides-extra": item.providesExtra,
              }))
            : undefined,
          "exclude-newer": options.excludeNewer,
          "exclude-newer-package": options.excludeNewerPackage,
          "extra-build-dependencies": options.extraBuildDependencies,
          "extra-build-variables": options.extraBuildVariables,
          "extra-index-url": options.extraIndexUrl,
          "find-links": options.findLinks,
          "fork-strategy": options.forkStrategy,
          index: options.index,
          "index-strategy": options.indexStrategy,
          "index-url": options.indexUrl,
          "keyring-provider": options.keyringProvider,
          "link-mode": options.linkMode,
          "native-tls": options.nativeTls,
          "no-binary": options.noBinary,
          "no-binary-package": options.noBinaryPackage,
          "no-build": options.noBuild,
          "no-build-isolation": options.noBuildIsolation,
          "no-build-isolation-package": options.noBuildIsolationPackage,
          "no-build-package": options.noBuildPackage,
          "no-cache": options.noCache,
          "no-index": options.noIndex,
          "no-sources": options.noSources,
          offline: options.offline,
          prerelease: options.prerelease,
          preview: options.preview,
          "publish-url": options.publishUrl,
          "pypy-install-mirror": options.pypyInstallMirror,
          "python-downloads": options.pythonDownloads,
          "python-downloads-json-url": options.pythonDownloadsJsonUrl,
          "python-install-mirror": options.pythonInstallMirror,
          "python-preference": options.pythonPreference,
          reinstall: options.reinstall,
          "reinstall-package": options.reinstallPackage,
          "required-version": options.requiredVersion,
          resolution: options.resolution,
          "trusted-publishing": options.trustedPublishing,
          upgrade: options.upgrade,
          "upgrade-package": options.upgradePackage,
          pip: options.pip
            ? {
                "all-extras": options.pip.allExtras,
                "allow-empty-requirements": options.pip.allowEmptyRequirements,
                "annotation-style": options.pip.annotationStyle,
                "break-system-packages": options.pip.breakSystemPackages,
                "compile-bytecode": options.pip.compileBytecode,
                "config-settings": options.pip.configSettings,
                "config-settings-package": options.pip.configSettingsPackage,
                "custom-compile-command": options.pip.customCompileCommand,
                "dependency-metadata": options.pip.dependencyMetadata
                  ? options.pip.dependencyMetadata.map((item) => ({
                      name: item.name,
                      version: item.version,
                      "requires-dist": item.requiresDist,
                      "requires-python": item.requiresPython,
                      "provides-extra": item.providesExtra,
                    }))
                  : undefined,
                "emit-build-options": options.pip.emitBuildOptions,
                "emit-find-links": options.pip.emitFindLinks,
                "emit-index-annotation": options.pip.emitIndexAnnotation,
                "emit-index-url": options.pip.emitIndexUrl,
                "emit-marker-expression": options.pip.emitMarkerExpression,
                "exclude-newer": options.pip.excludeNewer,
                "exclude-newer-package": options.pip.excludeNewerPackage,
                extra: options.pip.extra,
                "extra-build-dependencies": options.pip.extraBuildDependencies,
                "extra-build-variables": options.pip.extraBuildVariables,
                "extra-index-url": options.pip.extraIndexUrl,
                "find-links": options.pip.findLinks,
                "fork-strategy": options.pip.forkStrategy,
                "generate-hashes": options.pip.generateHashes,
                group: options.pip.group,
                "index-strategy": options.pip.indexStrategy,
                "index-url": options.pip.indexUrl,
                "keyring-provider": options.pip.keyringProvider,
                "link-mode": options.pip.linkMode,
                "no-annotate": options.pip.noAnnotate,
                "no-binary": options.pip.noBinary,
                "no-build": options.pip.noBuild,
                "no-build-isolation": options.pip.noBuildIsolation,
                "no-build-isolation-package":
                  options.pip.noBuildIsolationPackage,
                "no-deps": options.pip.noDeps,
                "no-emit-package": options.pip.noEmitPackage,
                "no-extra": options.pip.noExtra,
                "no-header": options.pip.noHeader,
                "no-index": options.pip.noIndex,
                "no-sources": options.pip.noSources,
                "no-strip-extras": options.pip.noStripExtras,
                "no-strip-markers": options.pip.noStripMarkers,
                "only-binary": options.pip.onlyBinary,
                "output-file": options.pip.outputFile,
                prefix: options.pip.prefix,
                prerelease: options.pip.prerelease,
                python: options.pip.python,
                "python-platform": options.pip.pythonPlatform,
                "python-version": options.pip.pythonVersion,
                reinstall: options.pip.reinstall,
                "reinstall-package": options.pip.reinstallPackage,
                "requires-hashes": options.pip.requiresHashes,
                resolution: options.pip.resolution,
                strict: options.pip.strict,
                system: options.pip.system,
                target: options.pip.target,
                "torch-backend": options.pip.torchBackend,
                universal: options.pip.universal,
                upgrade: options.pip.upgrade,
                "upgrade-package": options.pip.upgradePackage,
                "verify-hashes": options.pip.verifyHashes,
              }
            : undefined,
        },
      },
    };

    this.file = new TomlFile(project, "pyproject.toml", {
      obj: tomlStructure,
    });
  }
}
