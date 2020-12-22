import * as path from 'path';
import { PROJEN_DIR } from '../common';
import { Component } from '../component';
import { JsonFile } from '../json';
import * as logging from '../logging';
import { Project } from '../project';
import { Dependency, DependencyType, DepsManifest } from './model';

export class Dependencies extends Component {
  /**
   * The project-relative path of the deps manifest file.
   */
  public static readonly MANIFEST_FILE = path.join(PROJEN_DIR, 'deps.json');

  private readonly _deps = new Array<Dependency>();

  constructor(project: Project) {
    super(project);

    new JsonFile(project, Dependencies.MANIFEST_FILE, {
      marker: true,
      omitEmpty: true,
      obj: () => this.toJson(),
    });
  }

  /**
   * A copy of all dependencies.
   */
  public get all(): Dependency[] {
    return [...this._deps];
  }

  public addDependency(spec: string, type: DependencyType): Dependency {
    logging.verbose(`${type}-dep ${spec}`);

    const scope = spec.startsWith('@');
    if (scope) {
      spec = spec.substr(1);
    }

    const [module, version] = spec.split('@');
    const name = scope ? `@${module}` : module;
    const dep: Dependency = { name, version, type, spec };
    this._deps.push(dep);
    return dep;
  }

  private toJson(): DepsManifest {
    return {
      projectType: this.project.projectType,
      dependencies: this._deps,
    };
  }
}