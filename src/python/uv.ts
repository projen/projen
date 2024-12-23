import { IPythonDeps } from "./python-deps";
import { IPythonEnv } from "./python-env";
import { IPythonPackaging, PythonPackagingOptions } from "./python-packaging";
import { PythonExecutableOptions } from "./python-project";
import { Component } from "../component";
import { DependencyType } from "../dependencies";
import { Project } from "../project";
import { Task } from "../task";
import { TaskRuntime } from "../task-runtime";
import { TomlFile } from "../toml";
import { exec, execOrUndefined } from "../util";

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
  };
  "dependency-groups"?: {
    [key: string]: string[];
  };
  tool: {
    uv: {
      "default-groups": string[];
      index: {
        name: string;
        "publish-url": string;
        url: string;
      }[];
    };
  };
}

/**
 * uv-specific options.
 * @see https://github.com/astral-sh/uv
 */
export interface UvPyprojectOptionsWithoutDeps {
  readonly name?: string;
  readonly version?: string;
  readonly description?: string;
  readonly license?: string;
  readonly maintainers?: string[];
  readonly readme?: string;
  readonly homepage?: string;
  readonly repository?: string;
  readonly documentation?: string;
  readonly keywords?: string[];
  readonly classifiers?: string[];
  readonly packages?: string[];
  readonly include?: string[];
  readonly exclude?: string[];
  readonly scripts?: { [key: string]: string };
  readonly extras?: { [key: string]: string[] };
  readonly urls?: { [key: string]: string };
  readonly requiresPython?: string;
  readonly authorName: string;
  readonly authorEmail: string;
}

export interface UvOptions
  extends PythonPackagingOptions,
    PythonExecutableOptions {
  /**
   * Python version to use for the project.
   * @default "3.8"
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

  constructor(project: Project, options: UvOptions) {
    super(project);
    this.pythonVersion = options.pythonVersion ?? "3.8";

    this.installTask = project.addTask("install", {
      description: "Install dependencies and update lockfile",
      exec: "uv lock",
    });

    this.installCiTask = project.addTask("install:ci", {
      description: "Install dependencies with frozen lockfile",
      exec: "uv sync",
    });

    this.project.tasks.addEnvironment("VIRTUAL_ENV", ".venv");
    this.project.tasks.addEnvironment("PATH", "$(echo .venv/bin:$PATH)");

    project.packageTask.exec("uv build");

    this.publishTestTask = project.addTask("publish:test", {
      description: "Uploads the package against a test PyPI endpoint.",
      exec: "uv publish --index testpypi",
    });

    this.publishTask = project.addTask("publish", {
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

    this.pyProject = new UvPyproject(project, {
      name: project.name,
      version: options.version,
      description: options.description ?? "",
      license: options.license,
      authorName: options.authorName,
      authorEmail: options.authorEmail,
      homepage: options.homepage,
      classifiers: options.classifiers,
      dependencies: this.synthDependencies(),
      devDependencies: this.synthDevDependencies(),
      pythonVersion: this.pythonVersion,
    });
  }

  private synthDependencies(): { [key: string]: string } {
    const dependencies: { [key: string]: string } = {};
    for (const pkg of this.project.deps.all) {
      if (pkg.type === DependencyType.RUNTIME && pkg.name !== "python") {
        dependencies[pkg.name] = pkg.version ?? "*";
      }
    }
    return dependencies;
  }

  private synthDevDependencies(): { [key: string]: string } {
    const dependencies: { [key: string]: string } = {};
    for (const pkg of this.project.deps.all) {
      if (
        [DependencyType.DEVENV, DependencyType.TEST].includes(pkg.type) &&
        pkg.name !== "python"
      ) {
        dependencies[pkg.name] = pkg.version ?? "*";
      }
    }
    return dependencies;
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

export interface UvPyprojectOptions extends UvPyprojectOptionsWithoutDeps {
  /**
   * A list of dependencies for the project.
   *
   * The python version for which your package is compatible is also required.
   *
   * @example { requests: "^2.13.0" }
   */
  readonly dependencies?: { [key: string]: any };

  /**
   * A list of development dependencies for the project.
   *
   * @example { requests: "^2.13.0" }
   */
  readonly devDependencies?: { [key: string]: any };

  readonly pythonVersion?: string;
}

/**
 * Represents configuration of a pyproject.toml file for a uv project.
 */
export class UvPyproject extends Component {
  public readonly file: TomlFile;
  private readonly pythonVersion: string;

  constructor(project: Project, options: UvPyprojectOptions) {
    super(project);
    this.pythonVersion = options.pythonVersion ?? "3.12";

    const { dependencies, devDependencies, ...otherOptions } = options;

    // If no authors provided, add a default one from project options
    const authors: { name: string; email?: string }[] = [
      { name: otherOptions.authorName, email: otherOptions.authorEmail },
    ];

    // Format dependencies in UV style
    const formattedDependencies = dependencies
      ? Object.entries(dependencies).map(([name, version]) => {
          // Handle exact version case (no prefix)
          if (!version.startsWith("^") && !version.startsWith("~")) {
            if (version === "*") {
              return name; // Just the package name means any version
            }
            return `${name}==${version}`;
          }
          // Handle ^x.y.z or ~x.y.z case
          const cleanVersion = version.replace(/[\^~]/, "");
          const majorVersion = Number.parseInt(cleanVersion.split(".")[0]);
          return `${name}>=${cleanVersion}, <${majorVersion + 1}.0.0`;
        })
      : [];

    // Format dev dependencies in UV style
    const formattedDevDependencies = devDependencies
      ? Object.entries(devDependencies).map(([name, version]) => {
          // Handle exact version case (no prefix)
          if (!version.startsWith("^") && !version.startsWith("~")) {
            if (version === "*") {
              return name; // Just the package name means any version
            }
            return `${name}==${version}`;
          }
          // Handle ^x.y.z or ~x.y.z case
          const cleanVersion = version.replace(/[\^~]/, "");
          const majorVersion = Number.parseInt(cleanVersion.split(".")[0]);
          return `${name}>=${cleanVersion}, <${majorVersion + 1}.0.0`;
        })
      : [];

    const tomlStructure: UvTomlStructure = {
      project: {
        name: otherOptions.name,
        version: otherOptions.version,
        description: otherOptions.description || "",
        readme: otherOptions.readme || "README.md",
        authors: authors,
        "requires-python":
          otherOptions.requiresPython ||
          `>=${this.pythonVersion},<${
            Number(this.pythonVersion.split(".")[0]) + 1
          }.0`,
        dependencies: formattedDependencies,
        classifiers: otherOptions.classifiers,
        keywords: otherOptions.keywords,
        urls: otherOptions.urls,
      },
      "dependency-groups":
        formattedDevDependencies.length > 0
          ? {
              dev: formattedDevDependencies,
            }
          : undefined,
      tool: {
        uv: {
          "default-groups": [],
          index: [
            {
              name: "testpypi",
              "publish-url": "https://test.pypi.org/legacy/",
              url: "https://test.pypi.org/simple",
            },
          ],
        },
      },
    };

    this.file = new TomlFile(project, "pyproject.toml", {
      omitEmpty: false,
      obj: tomlStructure,
    });
  }
}
