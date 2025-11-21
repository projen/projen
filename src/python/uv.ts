import { IConstruct } from "constructs";
import { IPythonDeps } from "./python-deps";
import { IPythonEnv } from "./python-env";
import { IPythonPackaging } from "./python-packaging";
import { Component } from "../component";
import { toJson_UvConfiguration, UvConfiguration } from "./uv-config";
import { Dependency, DependencyType } from "../dependencies";
import { Project } from "../project";
import { Task } from "../task";
import { TaskRuntime } from "../task-runtime";
import { TomlFile } from "../toml";
import { exec, execOrUndefined } from "../util";
import {
  PyProjectTomlProjectDynamic,
  BuildSystem,
  ProjectAuthor,
  PyProjectToml,
  toJson_PyProjectToml,
} from "./pyproject-toml";

type DependencyGroup = string | { "include-group": string };

/**
 * Options for UV project excluding options passed by PythonPackagingOptions.
 */
export interface UvBaseOptions {
  /**
   * Python version to use for the project.
   * @default "3.12"
   */
  readonly pythonVersion?: string;

  /**
   * Relative paths or globs to paths of license files. Can be an empty list.
   */
  readonly licenseFiles?: string[];

  /**
   * the maintainers of the package. Must be in the form "name <email>"
   */
  readonly maintainers?: ProjectAuthor[];

  /**
   * Table consisting one or multiple `label: URL` pairs. Common indexes like PyPI uses [well-known Project URLs](https://packaging.python.org/en/latest/specifications/well-known-project-urls/#well-known-labels) when presenting project pages.
   */
  readonly urls?: { [key: string]: string };

  /**
   * A URL to the repository of the project.
   */
  readonly repository?: string;

  /**
   * A URL to the documentation of the project.
   */
  readonly documentation?: string;

  /**
   * A list of keywords (max: 5) that the package is related to.
   */
  readonly keywords?: string[];

  /**
   * The name of the readme file of the package.
   */
  readonly readme?: string;

  /**
   * The scripts or executables that will be installed when installing the package.
   */
  readonly scripts?: { [key: string]: string };

  /**
   * Table of [entry points](https://packaging.python.org/en/latest/specifications/entry-points/) that allows package installers to create a GUI wrapper for. Each key is the name of the script to be created, and each value is the function or object to all, in form of either `importable.module` or `importable.module:object.attr`. Windows platform treats `gui_scripts` specially in that they are wrapped in a GUI executable, so they can be started without a console, but cannot use standard streams unless application code redirects them.
   */
  readonly guiScripts?: { [key: string]: string };

  /**
   * Extra [entry point groups](https://packaging.python.org/en/latest/specifications/entry-points/) that allow applications to load plugins. For example, Pygments (a syntax highlighting tool) can use additional styles from separately installed packages through `[project.entry-points."pygments.styles"]`. Each key is the name of the entry-point group, and each value is a table of entry points.
   */
  readonly entryPoints?: any;

  /**
   * An array of strings specifying the import names that the project exclusively provides when installed.
   */
  readonly importNames?: string[];

  /**
   * An array of strings specifying the import names that the project provides when installed, but not exclusively.
   */
  readonly importNamespaces?: string[];

  /**
   * Specifies which keys are intentionally unspecified under `[project]` table so build backend can/will provide such metadata dynamically. Each key must be listed only once. It is an error to both list a key in `dynamic` and use the key directly in `[project]`.
   * One of the most common usage is `version`, which allows build backend to retrieve project version from source code or version control system instead of hardcoding it in `pyproject.toml`.
   */
  readonly dynamic?: PyProjectTomlProjectDynamic[];

  readonly buildSystem?: BuildSystem;

  /**
   * Package metadata
   */
  readonly metadata?: UvConfiguration;
}

/**
 * Options for UV project
 */
export interface UvOptions extends UvBaseOptions {
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
   * Name of the package.
   */
  readonly name: string;

  /**
   * Version of the package.
   */
  readonly version: string;

  /**
   * A short description of the package.
   */
  readonly description?: string;

  /**
   * License of this package as an SPDX license expression.
   */
  readonly license?: any;

  /**
   * The authors of the package. Must be in the form "name <email>"
   */
  readonly authors?: ProjectAuthor[];

  /**
   * A list of PyPI trove classifiers that describe the project.
   *
   * @see https://pypi.org/classifiers/
   */
  readonly classifiers?: string[];

  /**
   * A URL to the website of the project.
   */
  readonly homepage?: string;
}

/**
 * Options for UV pyproject.toml configuration
 * @see https://docs.astral.sh/uv/reference/settings/
 */
export interface UvPyprojectOptions extends UvOptions {
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
      dependencies: () => this.synthDependencies(),
      dependencyGroups: () => this.synthDependencyGroups(),
      pythonVersion: this.pythonVersion,
      ...options,
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

  constructor(project: Project, options: UvPyprojectOptions) {
    super(project);
    const pythonVersion = options.pythonVersion ?? "3.12";

    const pyprojectToml: PyProjectToml = {
      buildSystem: options.buildSystem,
      project: {
        name: options.name,
        version: options.version,
        description: options.description || "",
        readme: options.readme || "README.md",
        requiresPython: `>=${pythonVersion},<${
          Number(pythonVersion.split(".")[0]) + 1
        }.0`,
        license: options.license,
        licenseFiles: options.licenseFiles,
        authors: options.authors,
        maintainers: options.maintainers,
        keywords: options.keywords,
        classifiers: options.classifiers,
        urls: {
          ...options.urls,
          ...(options.homepage && { Homepage: options.homepage }),
          ...(options.documentation && {
            Documentation: options.documentation,
          }),
          ...(options.repository && { Repository: options.repository }),
        },
        scripts: options.scripts,
        guiScripts: options.guiScripts,
        entryPoints: options.entryPoints,
        importNames: options.importNames,
        importNamespaces: options.importNamespaces,
        dynamic: options.dynamic,
      },
      tool: { uv: toJson_UvConfiguration(options.metadata) },
    };

    // Merge dependencies and dependencyGroups separately so that they can be lazy evaluated.
    const jsonPyProjectToml = toJson_PyProjectToml(pyprojectToml) ?? {};

    const tomlStructure = {
      ...jsonPyProjectToml,
      "dependency-groups": options.dependencyGroups,
      project: {
        ...jsonPyProjectToml.project,
        dependencies: options.dependencies,
      },
    };

    this.file = new TomlFile(project, "pyproject.toml", {
      obj: tomlStructure,
    });
  }
}
