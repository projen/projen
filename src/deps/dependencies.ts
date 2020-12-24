import * as path from 'path';
import { PROJEN_DIR } from '../common';
import { Component } from '../component';
import { JsonFile } from '../json';
import * as logging from '../logging';
import { Project } from '../project';
import { Dependency, DependencyType, DepsManifest } from './model';

/**
 * The `Dependencies` component is responsible to track the list of dependencies
 * a project has, and then used by project types as the model for rendering
 * project-specific dependency manifests such as the dependencies section
 * `package.json` files.
 *
 * To add a dependency you can use a project-type specific API such as
 * `nodeProject.addDeps()` or use the generic API of `project.deps`:
 */
export class Dependencies extends Component {
  /**
   * The project-relative path of the deps manifest file.
   */
  public static readonly MANIFEST_FILE = path.join(PROJEN_DIR, 'deps.json');

  private readonly _deps = new Array<Dependency>();

  /**
   * Adds a dependencies component to the project.
   * @param project The parent project
   */
  constructor(project: Project) {
    super(project);

    // this is not really required at the moment, but actually quite useful as a
    // checked-in source of truth for dependencies and will potentially be
    // valuable in the future for CLI tools.
    new JsonFile(project, Dependencies.MANIFEST_FILE, {
      marker: true,
      omitEmpty: true,
      obj: () => this.toJson(),
    });
  }

  /**
   * A copy of all dependencies recorded for this project.
   */
  public get all(): Dependency[] {
    return [...this._deps];
  }

  /**
   * Adds a dependency to this project.
   * @param spec The dependency spec in the format `MODULE[@VERSION]` where
   * `MODULE` is the package-manager-specific module name and `VERSION` is an
   * optional semantic version requirement (e.g. `^3.4.0`).
   * @param type The type of the dependency.
   */
  public addDependency(spec: string, type: DependencyType): Dependency {
    logging.verbose(`${type}-dep ${spec}`);

    const scope = spec.startsWith('@');
    if (scope) {
      spec = spec.substr(1);
    }

    const [module, version] = spec.split('@');
    const name = scope ? `@${module}` : module;

    const dep: Dependency = version
      ? { name, version, type }
      : { name, type };

    this._deps.push(dep);
    return dep;
  }

  private toJson(): DepsManifest {
    return {
      projectType: this.project.projectType,
      dependencies: this._deps.sort((d1, d2) => specOf(d1).localeCompare(specOf(d2))),
    };
  }
}

function specOf(dep: Dependency) {
  let spec = dep.name;
  if (dep.version) {
    spec += '@' + dep.version;
  }
  return spec;
}