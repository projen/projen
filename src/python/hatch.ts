import { IConstruct } from "constructs";
import { HatchConfiguration, toJson_HatchConfiguration } from "./hatch-config";
import { PackageBase } from "./package";
import { PyprojectTomlProject } from "./pyproject-toml";
import { IPythonDeps } from "./python-deps";
import { IPythonEnv } from "./python-env";
import { IPythonPackaging } from "./python-packaging";
import { PythonExecutableOptions } from "./python-project";
import { Task } from "../task";
import { PyprojectTomlFile } from "./pyproject-toml-file";
import { execOrUndefined } from "../util";

/**
 * Options for Hatch project
 */
export interface HatchOptions extends PythonExecutableOptions {
  /**
   * The project's basic metadata configuration.
   */
  readonly project?: PyprojectTomlProject;

  /**
   * The configuration and metadata for hatch.
   */
  readonly hatch?: HatchConfiguration;
}

/**
 * Manage project dependencies, virtual environments, and packaging through hatch.
 */
export class Hatch
  extends PackageBase
  implements IPythonDeps, IPythonEnv, IPythonPackaging
{
  /**
   * The `pyproject.toml` file
   */
  public readonly file: PyprojectTomlFile;
  public readonly installTask: Task;
  public readonly installCiTask: Task;
  public readonly publishTask: Task;
  public readonly publishTestTask: Task;

  constructor(scope: IConstruct, options: HatchOptions) {
    super(scope);

    const requiresPython = options.project?.requiresPython ?? ">=3.12,<4.0";

    this.installTask = this.project.addTask("install", {
      description: "Create environment",
      exec: "hatch env create",
    });
    this.installCiTask = this.project.addTask("install", {
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

    this.file = new PyprojectTomlFile(this.project, {
      project: {
        name: options.project?.name ?? this.project.name,
        requiresPython,
        ...options.project,
        dependencies: (() => [
          ...(options?.project?.dependencies ?? []),
          ...this.synthDependencies(),
        ]) as any,
      },
      dependencyGroups: (() => this.synthDependencyGroups()) as any,
      buildSystem: {
        requires: ["hatching"],
        buildBackend: "hatchling.build",
      },
      tool: {
        hatch: toJson_HatchConfiguration(options.hatch),
      },
    });
  }

  public setupEnvironment(): void {
    const result = execOrUndefined("which hatch", {
      cwd: this.project.outdir,
    });
    if (!result) {
      this.project.logger.info(
        "Unable to setup an environment since hatch is not installed. Please install uv (https://hatch.pypa.io/latest/install/) or use a different component for managing environments."
      );
      return;
    }

    // Create venv with the specific Python version
    // this will install the requested python version if needed
    this.installDependencies();
  }
}
