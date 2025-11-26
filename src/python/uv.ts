import { IConstruct } from "constructs";
import { Task } from "../task";
import { exec, execOrUndefined } from "../util";
import { PackageManagerBase } from "./package-manager";
import { BuildSystem } from "./pyproject-toml";
import { PythonBaseOptions } from "./python-project";

/**
 * Manage project dependencies, virtual environments, and packaging through uv.
 */
export class Uv extends PackageManagerBase {
  public readonly installTask: Task;
  public readonly installCiTask: Task;
  public readonly publishTask: Task;
  public readonly publishTestTask: Task;
  public readonly lintTask?: Task;
  public readonly formatTask?: Task;
  public readonly typeCheckTask?: Task;
  public readonly defaultBuildSystem: BuildSystem;

  private readonly venvPython: string;

  constructor(scope: IConstruct, options: PythonBaseOptions) {
    super(scope, options);

    this.defaultBuildSystem = {
      requires: ["uv_build"],
      buildBackend: "uv_build",
    };

    const requiresPython =
      this.project.projectOptions?.requiresPython ?? ">=3.12,<4.0";
    this.venvPython = options.pythonExec ?? requiresPython;

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
  }

  public getRunCommand(_options: PythonBaseOptions): string {
    return "uv run";
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

    // Create venv with the specific Python version
    // this will install the requested python version if needed
    exec(`uv venv --python ${this.venvPython} .venv --allow-existing`, {
      cwd: this.project.outdir,
    });
    this.project.logger.info(
      `Environment successfully created in .venv directory with Python ${this.venvPython}.`
    );
  }
}
