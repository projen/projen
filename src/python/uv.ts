import { IConstruct } from "constructs";
import { IPythonDeps } from "./python-deps";
import { IPythonEnv } from "./python-env";
import { IPythonPackaging } from "./python-packaging";
import { Component } from "../component";
import { toJson_UvConfiguration, UvConfiguration } from "./uv-config";
import { Dependency, DependencyType } from "../dependencies";
import { Task } from "../task";
import { TaskRuntime } from "../task-runtime";
import { exec, execOrUndefined } from "../util";
import { BuildSystem, PyprojectTomlProject } from "./pyproject-toml";
import { PyprojectTomlFile } from "./pyproject-toml-file";
import { PythonExecutableOptions } from "./python-project";

/**
 * Options for UV project
 */
export interface UvOptions extends PythonExecutableOptions {
  /**
   * The project's basic metadata configuration.
   */
  readonly project?: PyprojectTomlProject;

  /**
   * Declares any Python level dependencies that must be installed in order to run the project’s build system successfully.
   *
   * @default - no build system
   */
  readonly buildSystem?: BuildSystem;

  /**
   * The configuration and metadata for uv.
   */
  readonly uv?: UvConfiguration;
}

/**
 * Manage project dependencies, virtual environments, and packaging through uv.
 */
export class Uv
  extends Component
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

  private readonly venvPython: string;

  constructor(scope: IConstruct, options: UvOptions) {
    super(scope);

    const requiresPython = options.project?.requiresPython ?? ">=3.12,<4.0";
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
      buildSystem: options.buildSystem,
      tool: {
        uv: toJson_UvConfiguration(options.uv),
      },
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

  private synthDependencyGroups(): { [key: string]: string[] } | undefined {
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

    // Create venv with the specific Python version
    // this will install the requested python version if needed
    exec(`uv venv --python "${this.venvPython}" .venv`, {
      cwd: this.project.outdir,
    });
    this.project.logger.info(
      `Environment successfully created in .venv directory with Python ${this.venvPython}.`
    );
  }

  public installDependencies(): void {
    this.project.logger.info("Installing dependencies...");
    const runtime = new TaskRuntime(this.project.outdir);
    if (this.file.changed) {
      runtime.runTask(this.installTask.name);
    } else {
      runtime.runTask(this.installCiTask.name);
    }
  }
}
