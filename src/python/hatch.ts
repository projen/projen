import { IConstruct } from "constructs";
import { PackageManagerBase } from "./package-manager";
import { Task } from "../task";
import { execOrUndefined } from "../util";
import { BuildSystem } from "./pyproject-toml";
import { PythonBaseOptions } from "./python-project";

/**
 * Manage project dependencies, virtual environments, and packaging through hatch.
 */
export class Hatch extends PackageManagerBase {
  public readonly installTask: Task;
  public readonly installCiTask: Task;
  public readonly publishTask: Task;
  public readonly publishTestTask: Task;
  public readonly lintTask?: Task;
  public readonly formatTask?: Task;
  public readonly typeCheckTask?: Task;
  public readonly defaultBuildSystem: BuildSystem;

  constructor(scope: IConstruct, options: PythonBaseOptions) {
    super(scope, options);

    this.defaultBuildSystem = {
      requires: ["hatchling"],
      buildBackend: "hatchling.build",
    };

    this.installTask = this.project.addTask("install", {
      description: "Create environment",
      exec: "hatch env create",
    });
    this.installCiTask = this.project.addTask("install:ci", {
      exec: "hatch env create",
    });

    this.project.tasks.addEnvironment("VIRTUAL_ENV", ".venv");
    this.project.tasks.addEnvironment("PATH", "$(echo .venv/bin:$PATH)");

    this.project.packageTask.exec("hatch build");

    this.publishTestTask = this.project.addTask("publish:test", {
      description: "Uploads the package against a test PyPI endpoint.",
      exec: "hatch publish -r test",
    });

    this.publishTask = this.project.addTask("publish", {
      description: "Uploads the package to PyPI.",
      exec: "hatch publish",
    });
  }

  public getRunCommand(_options: PythonBaseOptions): string {
    return "hatch run";
  }

  public setupEnvironment(): void {
    const result = execOrUndefined("which hatch", {
      cwd: this.project.outdir,
    });
    if (!result) {
      this.project.logger.info(
        "Unable to setup an environment since hatch is not installed. Please install hatch (https://hatch.pypa.io/latest/install/) or use a different component for managing environments."
      );
      return;
    }

    // Create venv with the specific Python version
    // this will install the requested python version if needed
    this.installDependencies();
  }
}
