import { Component } from '../component';
import { Task, TaskCategory } from '../tasks';
import { PythonPackagingOptions } from './python-packaging';
import { PythonProject } from './python-project';
import { SetupPy } from './setuppy';

/**
 * Manages packaging through setuptools with a setup.py script.
 */
export class Setuptools extends Component {
  public readonly packageTask: Task;
  public readonly uploadTask: Task;

  /**
   * A task that uploads the package to the Test PyPI repository.
   */
  public readonly uploadTestTask: Task;

  constructor(project: PythonProject, options: PythonPackagingOptions) {
    super(project);

    project.addDevDependency('wheel@0.36.2');
    project.addDevDependency('twine@3.3.0');

    this.packageTask = project.addTask('package', {
      description: 'Creates source archive and wheel for distribution.',
      category: TaskCategory.RELEASE,
      exec: 'python setup.py sdist bdist_wheel',
    });

    this.uploadTestTask = project.addTask('upload:test', {
      description: 'Uploads the package against a test PyPI endpoint.',
      category: TaskCategory.RELEASE,
      exec: 'twine upload --repository-url https://test.pypi.org/legacy/ dist/*',
    });

    this.uploadTask = project.addTask('upload', {
      description: 'Uploads the package against a test PyPI endpoint.',
      category: TaskCategory.RELEASE,
      exec: 'twine upload dist/*',
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