import { Construct } from "constructs";
import { Component } from "../component";
import { Task } from "../task";
import { IPythonPackaging, PythonPackagingOptions } from "./python-packaging";
import { PythonProject } from "./python-project";
import { SetupPy } from "./setuppy";

/**
 * Manages packaging through setuptools with a setup.py script.
 */
export class Setuptools extends Component implements IPythonPackaging {
  public readonly publishTask: Task;

  /**
   * A task that uploads the package to the Test PyPI repository.
   */
  public readonly publishTestTask: Task;

  constructor(scope: Construct, options: PythonPackagingOptions) {
    super(scope, "Setuptools");

    const project = PythonProject.ofPythonProject(this);

    project.addDevDependency("wheel@0.36.2");
    project.addDevDependency("twine@3.3.0");

    project.packageTask.exec("python setup.py sdist bdist_wheel");

    this.publishTestTask = project.addTask("publish:test", {
      description: "Uploads the package against a test PyPI endpoint.",
      exec: "twine upload --repository-url https://test.pypi.org/legacy/ dist/*",
    });

    this.publishTask = project.addTask("publish", {
      description: "Uploads the package against a test PyPI endpoint.",
      exec: "twine upload dist/*",
    });

    new SetupPy(project, {
      name: project.name,
      packages: [project.moduleName],
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
