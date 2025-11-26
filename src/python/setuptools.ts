import { IConstruct } from "constructs";
import { IPythonPackaging } from "./python-packaging";
import { DependencyType } from "../dependencies";
import { Task } from "../task";
import { PackageManagerBase } from "./package-manager";
import { BuildSystem } from "./pyproject-toml";
import { IPythonEnv } from "./python-env";
import { PythonBaseOptions } from "./python-project";

/**
 * Manages packaging through setuptools with a setup.py script.
 */
export class Setuptools
  extends PackageManagerBase
  implements IPythonPackaging, IPythonEnv, IPythonPackaging
{
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
      requires: ["setuptools"],
      buildBackend: "setuptools.build_meta",
    };

    this.project.deps.addDependency("wheel", DependencyType.DEVENV);
    this.project.deps.addDependency("twine", DependencyType.DEVENV);

    this.installTask = this.project.addTask("install", {
      description: "Install dependencies",
      exec: "pip install .",
    });

    this.installCiTask = this.project.addTask("install:ci", {
      description: "Install dependencies",
      exec: "pip install .",
    });

    this.project.packageTask.exec(`${this.runCommand} build`);

    this.publishTestTask = this.project.addTask("publish:test", {
      description: "Uploads the package against a test PyPI endpoint.",
      exec: "twine upload --repository-url https://test.pypi.org/legacy/ dist/*",
    });

    this.publishTask = this.project.addTask("publish", {
      description: "Uploads the package against a test PyPI endpoint.",
      exec: "twine upload dist/*",
    });
  }

  public getRunCommand(_options: PythonBaseOptions): string {
    const pythonExec = _options.pythonExec ?? "python";
    return `${pythonExec} -m`;
  }

  public setupEnvironment(): void {
    this.installDependencies();
  }
}
