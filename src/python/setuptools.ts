import { IPythonPackaging, PythonPackagingOptions } from "./python-packaging";
import { SetupPy } from "./setuppy";
import { Component } from "../component";
import { DependencyType } from "../dependencies";
import { Project } from "../project";
import { Task } from "../task";

/**
 * Manages packaging through setuptools with a setup.py script.
 */
export class Setuptools extends Component implements IPythonPackaging {
  public readonly publishTask: Task;

  /**
   * A task that uploads the package to the Test PyPI repository.
   */
  public readonly publishTestTask: Task;

  constructor(
    project: Project,
    //moduleName: string,
    options: PythonPackagingOptions
  ) {
    super(project);

    project.deps.addDependency("wheel@0.36.2", DependencyType.DEVENV);
    project.deps.addDependency("twine@3.3.0", DependencyType.DEVENV);

    project.packageTask.exec("python setup.py sdist bdist_wheel");

    this.publishTestTask = project.addTask("publish:test", {
      description: "Uploads the package against a test PyPI endpoint.",
      exec: "twine upload --repository-url https://test.pypi.org/legacy/ dist/*",
    });

    this.publishTask = project.addTask("publish", {
      description: "Uploads the package against a test PyPI endpoint.",
      exec: "twine upload dist/*",
    });

    const packages = options.packageName ? [options.packageName] : undefined;

    new SetupPy(project, {
      name: project.name,
      packages: packages,
      authorName: options.authorName,
      authorEmail: options.authorEmail,
      version: options.version,
      description: options.description,
      license: options.license,
      homepage: options.homepage,
      classifiers: options.classifiers,
      ...options.setupConfig,
    });
  }
}
