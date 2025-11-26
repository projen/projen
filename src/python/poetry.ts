import * as TOML from "@iarna/toml";
import { IConstruct } from "constructs";
import { DependencyType } from "../dependencies";
import { Task } from "../task";
import { TomlFile } from "../toml";
import { exec, execOrUndefined, isObject } from "../util";
import {
  formatDependency,
  formatVersion,
  getVersionSpecs,
  PackageManagerBase,
} from "./package-manager";
import { BuildSystem } from "./pyproject-toml";
import { PythonBaseOptions } from "./python-project";

/**
 * Manage project dependencies, virtual environments, and packaging through the
 * poetry CLI tool.
 */
export class Poetry extends PackageManagerBase {
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

  public readonly lintTask?: Task;
  public readonly formatTask?: Task;
  public readonly typeCheckTask?: Task;
  public readonly defaultBuildSystem: BuildSystem;

  /**
   * Path to the Python executable to use.
   */
  private readonly pythonExec: string;

  constructor(scope: IConstruct, options: PythonBaseOptions) {
    super(scope, options);
    this.pythonExec = options.pythonExec ?? "python";

    this.defaultBuildSystem = {
      requires: ["poetry-core"],
      buildBackend: "poetry.core.masonry.api",
    };

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

  public synthDependencies() {
    const dependencies: { [key: string]: any } = {};
    for (const pkg of this.project.deps.all) {
      if (pkg.type === DependencyType.RUNTIME) {
        dependencies[pkg.name] = pkg.version ?? "*";
      }
    }
    return this.convertPoetryToProjectDeps(dependencies);
  }

  public synthDevDependencies() {
    const dependencies: { [key: string]: any } = {};
    for (const pkg of this.project.deps.all) {
      if ([DependencyType.DEVENV, DependencyType.TEST].includes(pkg.type)) {
        dependencies[pkg.name] = pkg.version ?? "*";
      }
    }
    return this.convertPoetryToProjectDeps(dependencies);
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
  }): { [key: string]: any } {
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
   * Converts poetry dependency specifications to pyproject.toml dependency equivalent.
   *
   * @example
   * // Given a `dependencies` object like this:
   * const dependencies = {
   *   "mypackage": {
   *     version: "1.2.3",
   *     extras: ["extra1", "extra2"],
   *   },
   *   "anotherpackage": "^2.3.4",
   * };
   * // After conversion, the resulting object would be:
   * [
   *   "mypackage[extra1, extra2] (===1.2.3)",
   *   "anotherpackage (>=2.3.4,<3.0.0)",
   * ]
   *
   */
  private convertPoetryToProjectDep(name: string, spec: any): string {
    if (typeof spec === "string" || typeof spec === "undefined") {
      return formatDependency({ name: name, version: spec });
    } else if (isObject(spec)) {
      let result = name;

      const extras = spec.extras;

      if (extras) {
        result += `[${extras.join(",")}]`;
      }

      const version = spec.version;
      const git = spec.git;
      const path = spec.path;
      const url = spec.url;

      if (version) {
        result += ` (${formatVersion(version)})`;
      }

      if (git) {
        let gitUrl: string;

        const prefix = "git+";
        if (git.startsWith(prefix)) {
          gitUrl = git;
        } else if (git.startsWith("git@")) {
          gitUrl = `@git+ssh//${git}`;
        } else {
          gitUrl = `${prefix}${git}`;
        }

        result += ` @ ${gitUrl}`;

        const ref = spec.ref ?? spec.branch ?? spec.tag;
        if (ref) {
          result += `@${ref}`;
        }

        const subdirectory = spec.subdirectory;
        if (subdirectory) {
          result += `#subdirectory=${subdirectory}`;
        }
      } else if (path) {
        result += ` @ file://${path}`;
      } else if (url) {
        result += ` @ ${url}`;
      }

      const python = spec.python;

      if (python) {
        const pythonVersionSpecs = getVersionSpecs(python);
        const pythonVersions = pythonVersionSpecs.map(
          (x) => `${x.comparator} '${x.version}'`
        );
        const pythonVersionSpec = pythonVersions
          .map((x) => `python_version ${x}`)
          .join(" and ");
        result += ` ; ${pythonVersionSpec}`;
      }

      const markers = spec.markers;

      if (markers) {
        result += ` ; ${markers}`;
      }

      return result;
    } else {
      throw new Error(
        "Dependency specification expected to be a version string or an object."
      );
    }
  }

  private convertPoetryToProjectDeps(dependencies: {
    [key: string]: any;
  }): string[] {
    const jsonDeps = this.permitDepsWithTomlInlineTables(dependencies);
    const result: string[] = [];

    for (const [key, value] of Object.entries(jsonDeps)) {
      if (Array.isArray(value)) {
        for (const v of value) {
          result.push(this.convertPoetryToProjectDep(key, v));
        }
      } else {
        result.push(this.convertPoetryToProjectDep(key, value));
      }
    }
    return result;
  }

  public getRunCommand(_options: PythonBaseOptions): string {
    return "poetry run";
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
}
