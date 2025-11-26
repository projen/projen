import { Component } from "../component";
import { Dependency, DependencyType } from "../dependencies";
import { Task } from "../task";
import { TaskRuntime } from "../task-runtime";
import { PyprojectTomlFile } from "./pyproject-toml-file";

export abstract class PackageBase extends Component {
  public abstract file: PyprojectTomlFile;
  public abstract installTask: Task;
  public abstract installCiTask: Task;
  public abstract publishTask: Task;
  public abstract publishTestTask: Task;

  /** Formats dependencies according to [PEP440](https://peps.python.org/pep-0440/#version-specifiers). */
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

  public synthDependencies(): string[] {
    return this.getDependencies([DependencyType.RUNTIME]);
  }

  public synthDependencyGroups(): { [key: string]: string[] } | undefined {
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
