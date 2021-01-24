import { Component } from '../component';
import { DependencyType } from '../deps';
import { Task, TaskCategory } from '../tasks';
import { IPythonDeps } from './python-deps';
import { PythonProject } from './python-project';
import { RequirementsFile } from './requirements-file';

export interface PipOptions {}

export class Pip extends Component implements IPythonDeps {
  public readonly installTask: Task;

  constructor(project: PythonProject, _options: PipOptions) {
    super(project);

    new RequirementsFile(project, 'requirements.txt', { _lazyPackages: () => this.synthDependencies() });
    new RequirementsFile(project, 'requirements-dev.txt', { _lazyPackages: () => this.synthDevDependencies() });

    this.installTask = project.addEnvTask('install', {
      description: 'Install and upgrade dependencies',
      category: TaskCategory.BUILD,
    });
    this.installTask.exec('pip install --upgrade pip');
    this.installTask.exec('pip install -r requirements.txt');
    this.installTask.exec('pip install -r requirements-dev.txt');
  }

  private synthDependencies() {
    const dependencies: string[] = [];
    for (const pkg of this.project.deps.all) {
      if (pkg.type === DependencyType.RUNTIME) {
        dependencies.push( `${pkg.name}@${pkg.version}`);
      }
    }
    return dependencies;
  }

  private synthDevDependencies() {
    const dependencies: string[] = [];
    for (const pkg of this.project.deps.all) {
      if ([DependencyType.TEST, DependencyType.DEVENV].includes(pkg.type)) {
        dependencies.push( `${pkg.name}@${pkg.version}`);
      }
    }
    return dependencies;
  }

  /**
   * Adds a runtime dependency.
   *
   * @param spec Format `<module>@<semver>`
   */
  public addDependency(spec: string) {
    this.project.deps.addDependency(spec, DependencyType.RUNTIME);
  }

  /**
   * Adds a test dependency.
   *
   * @param spec Format `<module>@<semver>`
   */
  public addTestDependency(spec: string) {
    this.project.deps.addDependency(spec, DependencyType.TEST);
  }

  /**
   * Adds a dev dependency.
   *
   * @param spec Format `<module>@<semver>`
   */
  public addDevDependency(spec: string) {
    this.project.deps.addDependency(spec, DependencyType.DEVENV);
  }
}