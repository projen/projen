import * as TOML from "@iarna/toml";
import { IPythonDeps } from "./python-deps";
import { IPythonEnv } from "./python-env";
import { IPythonPackaging, PythonPackagingOptions } from "./python-packaging";
import { Component } from "../component";
import { DependencyType } from "../dependencies";
import { Project } from "../project";
import { Task } from "../task";
import { TaskRuntime } from "../task-runtime";
import { TomlFile } from "../toml";
import { decamelizeKeysRecursively, exec, execOrUndefined } from "../util";

/**
 * Manage project dependencies, virtual environments, and packaging through the
 * poetry CLI tool.
 */
export class Poetry
  extends Component
  implements IPythonDeps, IPythonEnv, IPythonPackaging
{
  public readonly installTask: Task;
  public readonly publishTask: Task;

  /**
   * A task that uploads the package to the Test PyPI repository.
   */
  public readonly publishTestTask: Task;

  constructor(project: Project, options: PythonPackagingOptions) {
    super(project);

    this.installTask = project.addTask("install", {
      description: "Install and upgrade dependencies",
      exec: "poetry update",
    });

    this.project.tasks.addEnvironment("VIRTUAL_ENV", "$(poetry env info -p)");
    this.project.tasks.addEnvironment(
      "PATH",
      "$(echo $(poetry env info -p)/bin:$PATH)"
    );

    project.packageTask.exec("poetry build");

    this.publishTestTask = project.addTask("publish:test", {
      description: "Uploads the package against a test PyPI endpoint.",
      exec: "poetry publish -r testpypi",
    });

    this.publishTask = project.addTask("publish", {
      description: "Uploads the package to PyPI.",
      exec: "poetry publish",
    });

    new PoetryPyproject(project, {
      name: project.name,
      version: options.version,
      description: options.description ?? "",
      license: options.license,
      authors: [`${options.authorName} <${options.authorEmail}>`],
      homepage: options.homepage,
      classifiers: options.classifiers,
      ...options.poetryOptions,
      dependencies: () => this.synthDependencies(),
      devDependencies: () => this.synthDevDependencies(),
    });

    new TomlFile(project, "poetry.toml", {
      committed: false,
      obj: {
        repositories: {
          testpypi: {
            url: "https://test.pypi.org/legacy/",
          },
        },
      },
    });
  }

  private synthDependencies() {
    const dependencies: { [key: string]: any } = {};
    let pythonDefined: boolean = false;
    for (const pkg of this.project.deps.all) {
      if (pkg.name === "python") {
        pythonDefined = true;
      }
      if (pkg.type === DependencyType.RUNTIME) {
        dependencies[pkg.name] = pkg.version;
      }
    }
    if (!pythonDefined) {
      // Python version must be defined for poetry projects. Default to ^3.7.
      dependencies.python = "^3.7";
    }
    return this.permitDependenciesWithMetadata(dependencies);
  }

  private synthDevDependencies() {
    const dependencies: { [key: string]: any } = {};
    for (const pkg of this.project.deps.all) {
      if ([DependencyType.DEVENV].includes(pkg.type)) {
        dependencies[pkg.name] = pkg.version;
      }
    }
    return this.permitDependenciesWithMetadata(dependencies);
  }

  /**
   * Allow for poetry dependencies to specify metadata, eg `mypackage@{ version="1.2.3", extras = ["my-package-extra"] }`
   * @param dependencies poetry dependencies object
   * @private
   */
  private permitDependenciesWithMetadata(dependencies: { [key: string]: any }) {
    const parseVersionMetadata = (version: any) => {
      try {
        // Try parsing the version as toml to permit metadata
        return TOML.parse(`version = ${version}`).version;
      } catch (e) {
        // Invalid toml means it's not metadata, so should just be treated as the string
        return version;
      }
    };
    return Object.fromEntries(
      Object.entries(dependencies).map(([key, value]) => [
        key,
        parseVersionMetadata(value),
      ])
    );
  }

  /**
   * Adds a runtime dependency.
   *
   * @param spec Format `<module>@<semver>`
   */
  public addDependency(spec: string) {
    this.project.deps.addDependency(spec, DependencyType.RUNTIME);
  }

  /**
   * Adds a dev dependency.
   *
   * @param spec Format `<module>@<semver>`
   */
  public addDevDependency(spec: string) {
    this.project.deps.addDependency(spec, DependencyType.DEVENV);
  }

  /**
   * Initializes the virtual environment if it doesn't exist (called during post-synthesis).
   */
  public setupEnvironment() {
    const result = execOrUndefined("which poetry", {
      cwd: this.project.outdir,
    });
    if (!result) {
      this.project.logger.info(
        "Unable to setup an environment since poetry is not installed. Please install poetry (https://python-poetry.org/docs/) or use a different component for managing environments such as 'venv'."
      );
    }

    let envPath = execOrUndefined("poetry env info -p", {
      cwd: this.project.outdir,
    });
    if (!envPath) {
      this.project.logger.info("Setting up a virtual environment...");
      exec("poetry env use python", { cwd: this.project.outdir });
      envPath = execOrUndefined("poetry env info -p", {
        cwd: this.project.outdir,
      });
      this.project.logger.info(
        `Environment successfully created (located in ${envPath}}).`
      );
    }
  }

  /**
   * Installs dependencies (called during post-synthesis).
   */
  public installDependencies() {
    this.project.logger.info("Installing dependencies...");
    const runtime = new TaskRuntime(this.project.outdir);
    runtime.runTask(this.installTask.name);
  }
}

/**
 * Poetry-specific options.
 * @see https://python-poetry.org/docs/pyproject/
 */
export interface PoetryPyprojectOptionsWithoutDeps {
  /**
   * Name of the package (required).
   */
  readonly name?: string;

  /**
   * Version of the package (required).
   */
  readonly version?: string;

  /**
   * A short description of the package (required).
   */
  readonly description?: string;

  /**
   * License of this package as an SPDX identifier.
   *
   * If the project is proprietary and does not use a specific license, you
   * can set this value as "Proprietary".
   */
  readonly license?: string;

  /**
   * The authors of the package. Must be in the form "name <email>"
   */
  readonly authors?: string[];

  /**
   * the maintainers of the package. Must be in the form "name <email>"
   */
  readonly maintainers?: string[];

  /**
   * The name of the readme file of the package.
   */
  readonly readme?: string;

  /**
   * A URL to the website of the project.
   */
  readonly homepage?: string;

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
   * A list of PyPI trove classifiers that describe the project.
   *
   * @see https://pypi.org/classifiers/
   */
  readonly classifiers?: string[];

  /**
   * A list of packages and modules to include in the final distribution.
   */
  readonly packages?: any[];

  /**
   * A list of patterns that will be included in the final package.
   */
  readonly include?: string[];

  /**
   * A list of patterns that will be excluded in the final package.
   *
   * If a VCS is being used for a package, the exclude field will be seeded with
   * the VCS’ ignore settings (.gitignore for git for example).
   */
  readonly exclude?: string[];

  /**
   * The scripts or executables that will be installed when installing the package.
   */
  readonly scripts?: { [key: string]: any };

  /**
   * Source registries from which packages are retrieved.
   */
  readonly source?: any[];

  /**
   * Package extras
   */
  readonly extras?: { [key: string]: string[] };

  /**
   * Plugins. Must be specified as a table.
   * @see https://toml.io/en/v1.0.0#table
   */
  readonly plugins?: any;

  /**
   * Project custom URLs, in addition to homepage, repository and documentation.
   * E.g. "Bug Tracker"
   */
  readonly urls?: { [key: string]: string };
}

/**
 * Poetry-specific options.
 * @see https://python-poetry.org/docs/pyproject/
 */
export interface PoetryPyprojectOptions
  extends PoetryPyprojectOptionsWithoutDeps {
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
}

/**
 * Represents configuration of a pyproject.toml file for a Poetry project.
 *
 * @see https://python-poetry.org/docs/pyproject/
 */
export class PoetryPyproject extends Component {
  public readonly file: TomlFile;

  constructor(project: Project, options: PoetryPyprojectOptions) {
    super(project);

    const decamelisedOptions = decamelizeKeysRecursively(options, {
      separator: "-",
    });

    this.file = new TomlFile(project, "pyproject.toml", {
      omitEmpty: false,
      obj: {
        "build-system": {
          requires: ["poetry_core>=1.0.0"],
          "build-backend": "poetry.core.masonry.api",
        },
        tool: {
          poetry: {
            ...decamelisedOptions,
          },
        },
      },
    });
  }
}
