import { IConstruct } from "constructs";
import { PackageManagerBase } from "./package-manager";
import { Task } from "../task";
import { execOrUndefined } from "../util";
import { BuildSystem } from "./pyproject-toml";
import { PythonBaseOptions } from "./python-project";

/**
 * Manage project dependencies, virtual environments, and packaging through pdm.
 */
export class Pdm extends PackageManagerBase {
  public readonly installTask: Task;
  public readonly installCiTask: Task;
  public readonly publishTask: Task;
  public readonly lintTask?: Task;
  public readonly formatTask?: Task;
  public readonly typeCheckTask?: Task;
  public readonly defaultBuildSystem: BuildSystem;

  constructor(scope: IConstruct, options: PythonBaseOptions) {
    super(scope, options);

    this.defaultBuildSystem = {
      requires: ["pdm-backend"],
      buildBackend: "pdm.backend",
    };

    this.installTask = this.project.addTask("install", {
      description: "Install dependencies and update lockfile",
      exec: "pdm install",
    });
    this.installCiTask = this.project.addTask("install:ci", {
      description: "Install dependencies with frozen lockfile",
      exec: "pdm install --frozen-lockfile",
    });

    this.project.tasks.addEnvironment("VIRTUAL_ENV", ".venv");
    this.project.tasks.addEnvironment("PATH", "$(echo .venv/bin:$PATH)");

    this.project.packageTask.exec("pdm build");

    this.publishTask = this.project.addTask("publish", {
      description: "Uploads the package to PyPI.",
      exec: "pdm publish",
    });
  }

  public getRunCommand(_options: PythonBaseOptions): string {
    return "pdm run";
  }

  public setupEnvironment(): void {
    const result = execOrUndefined("which pdm", {
      cwd: this.project.outdir,
    });
    if (!result) {
      this.project.logger.info(
        "Unable to setup an environment since pdm is not installed. Please install pdm (https://pdm-project.org/latest/#installation) or use a different component for managing environments."
      );
      return;
    }

    // Create venv with the specific Python version
    // this will install the requested python version if needed
    this.installDependencies();
  }
}
