import * as TOML from "@iarna/toml";
import { IConstruct } from "constructs";
import { IPythonDeps } from "./python-deps";
import { IPythonEnv } from "./python-env";
import { IPythonPackaging } from "./python-packaging";
import { PythonExecutableOptions } from "./python-project";
import { Component } from "../component";
import { DependencyType } from "../dependencies";
import { Task } from "../task";
import { TaskRuntime } from "../task-runtime";
import { TomlFile } from "../toml";
import { exec, execOrUndefined } from "../util";
import {
  PoetryConfiguration,
  toJson_PoetryConfiguration,
} from "./poetry-config";
import { PyprojectTomlProject } from "./pyproject-toml";
import { PyprojectTomlFile } from "./pyproject-toml-file";

export interface PoetryOptions extends PythonExecutableOptions {
  /**
   * The project's basic metadata configuration.
   */
  readonly project?: PyprojectTomlProject;

  /**
   * The configuration and metadata for poetry.
   */
  readonly poetry?: PoetryConfiguration;
}

/**
 * Manage project dependencies, virtual environments, and packaging through the
 * poetry CLI tool.
 */
export class Poetry
  extends Component
  implements IPythonDeps, IPythonEnv, IPythonPackaging
{
  public readonly file: PyprojectTomlFile;
  /**
   * Task for updating the lockfile and installing project dependencies.
   */
  public readonly installTask: Task;

  /**
   * Task for installing dependencies according to the existing lockfile.
   */
  public readonly installCiTask: Task;

  /**
   * Task for publishing the package to a package repository.
   */
  public readonly publishTask: Task;

  /**
   * Task for publishing the package to the Test PyPI repository for testing purposes.
   */
  public readonly publishTestTask: Task;

  /**
   * Path to the Python executable to use.
   */
  private readonly pythonExec: string;

  constructor(scope: IConstruct, options: PoetryOptions) {
    super(scope);
    this.pythonExec = options.pythonExec ?? "python";

    this.installTask = this.project.addTask("install", {
      description: "Install dependencies and update lockfile",
      exec: "poetry update",
    });

    this.installCiTask = this.project.addTask("install:ci", {
      description: "Install dependencies with frozen lockfile",
      exec: "poetry check --lock && poetry install",
    });

    this.project.tasks.addEnvironment(
      "VIRTUAL_ENV",
      // Create .venv on the first run if it doesn't already exist
      "$(poetry env info -p || poetry run poetry env info -p)"
    );
    this.project.tasks.addEnvironment(
      "PATH",
      "$(echo $(poetry env info -p)/bin:$PATH)"
    );

    this.project.packageTask.exec("poetry build");

    this.publishTestTask = this.project.addTask("publish:test", {
      description: "Uploads the package against a test PyPI endpoint.",
      exec: "poetry publish -r testpypi",
    });

    this.publishTask = this.project.addTask("publish", {
      description: "Uploads the package to PyPI.",
      exec: "poetry publish",
    });

    // Pull out poetry options that are redundant with project options
    const {
      name,
      version,
      description,
      keywords,
      license,
      authors,
      maintainers,
      readme,
      classifiers,
      urls,
      ...poetryOptions
    } = options.poetry || {};

    this.file = new PyprojectTomlFile(scope, {
      project: {
        name: name ?? this.project.name,
        version: version,
        description: description,
        keywords: keywords,
        license: license,
        authors: authors,
        maintainers: maintainers,
        readme: readme,
        classifiers: classifiers,
        urls: urls,
        ...options.project,
        dependencies: this.synthDependencies(),
        devDependencies: this.synthDevDependencies(),
      },
      tool: { poetry: toJson_PoetryConfiguration(poetryOptions) },
      buildSystem: {
        requires: ["poetry-core"],
        buildBackend: "poetry.core.masonry.api",
      },
    });

    new TomlFile(this.project, "poetry.toml", {
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
        dependencies[pkg.name] = pkg.version ?? "*";
      }
    }
    if (!pythonDefined) {
      // Python version must be defined for poetry projects. Default to ^3.8.
      dependencies.python = "^3.8";
    }
    return this.permitDepsWithTomlInlineTables(dependencies);
  }

  private synthDevDependencies() {
    const dependencies: { [key: string]: any } = {};
    for (const pkg of this.project.deps.all) {
      if ([DependencyType.DEVENV, DependencyType.TEST].includes(pkg.type)) {
        dependencies[pkg.name] = pkg.version ?? "*";
      }
    }
    return this.permitDepsWithTomlInlineTables(dependencies);
  }

  /**
   * Parses dependency values that may include TOML inline tables, converting them into JavaScript objects.
   * If a dependency value cannot be parsed as a TOML inline table (indicating it is a plain SemVer string),
   * it is left unchanged. This allows to support the full range of Poetry's dependency specification.
   * @see https://python-poetry.org/docs/dependency-specification/
   * @see https://toml.io/en/v1.0.0#inline-table
   *
   * @example
   * // Given a `dependencies` object like this:
   * const dependencies = {
   *   "mypackage": "{ version = '1.2.3', extras = ['extra1', 'extra2'] }",
   *   "anotherpackage": "^2.3.4"
   * };
   * // After parsing, the resulting object would be:
   * {
   *   "mypackage": {
   *     version: "1.2.3",
   *     extras: ["extra1", "extra2"]
   *   },
   *   "anotherpackage": "^2.3.4"
   * }
   * // Note: The value of `anotherpackage` remains unchanged as it is a plain SemVer string.
   *
   * @param dependencies An object where each key is a dependency name and each value is a string that might be
   * either a SemVer string or a TOML inline table string.
   * @returns A new object where each key is a dependency name and each value is either the original SemVer string
   * or the parsed JavaScript object representation of the TOML inline table.
   */
  private permitDepsWithTomlInlineTables(dependencies: {
    [key: string]: string;
  }) {
    const parseTomlInlineTable = (dependencyValue: string) => {
      try {
        // Attempt parsing the `dependencyValue` as a TOML inline table
        return TOML.parse(`dependencyKey = ${dependencyValue}`).dependencyKey;
      } catch {
        // If parsing fails, treat the `dependencyValue` as a plain SemVer string
        return dependencyValue;
      }
    };

    return Object.fromEntries(
      Object.entries(dependencies).map(([dependencyKey, dependencyValue]) => {
        return [dependencyKey, parseTomlInlineTable(dependencyValue)];
      })
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
      exec(`poetry env use ${this.pythonExec}`, { cwd: this.project.outdir });
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
    // If the pyproject.toml file has changed, update the lockfile prior to installation
    if (this.file.changed) {
      runtime.runTask(this.installTask.name);
    } else {
      runtime.runTask(this.installCiTask.name);
    }
  }
}
