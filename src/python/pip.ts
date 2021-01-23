import { Component } from '../component';
import { DependencyType } from '../deps';
import { Project } from '../project';
import { IPythonDeps } from './python-deps';
import { RequirementsFile } from './requirements-file';

export interface PipOptions {}

export class Pip extends Component implements IPythonDeps {
  constructor(project: Project, _options: PipOptions) {
    super(project);

    new RequirementsFile(project, 'requirements.txt', { lazyPackages: () => this.synthDependencies() });
    new RequirementsFile(project, 'requirements-dev.txt', { lazyPackages: () => this.synthDevDependencies() });
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