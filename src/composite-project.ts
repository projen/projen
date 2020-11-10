import * as path from 'path';
import { Component } from './component';
import { Project } from './project';

/**
 * Options for `CompositeProject`.
 */
export interface CompositeProjectOptions {
  /**
   * Declaratively define sub-projects by their sub paths.
   * @example ```ts
   * [
   *   {
   *     path: path.join('packages', 'foo'),
   *     project: new NodeProject({ name: 'foo' }),
   *   },
   *   ...
   * ]
   * ```
   */
  projects?: CompositeProjectChild[];
}

/**
 * Declares a sub-project of the composite project.
 */
export interface CompositeProjectChild {
  /**
   * Project subpath.
   */
  readonly path: string;

  /**
   * Projen project to synthesize in `path`.
   */
  readonly project: Project;
}

/**
 * Creates a composite project.
 */
export class CompositeProject extends Project {
  // Tracks which sub paths have already been added.
  private readonly projects: Record<string, ProjectComponent>;

  constructor(options?: CompositeProjectOptions) {
    super();

    this.projects = {};

    // Add declaratively defined subprojects.
    for (const subProject of options?.projects ?? []) {
      this.addProject(subProject.path, subProject.project);
    }
  }

  /**
   * Adds a project as a sub-project at a sub path.
   * @param subPath
   * @param project
   */
  addProject(subPath: string, project: Project) {
    if (this.projects[subPath]) {
      throw new Error(`Cannot add project as the sub path ${subPath} is already in use`);
    }

    this.projects[subPath] = new ProjectComponent(this, {
      path: subPath,
      project: project,
    });
  }
}

/**
 * Options for `ProjectComponent`
 * @experimental
 */
export interface ProjectComponentOptions {
  /**
   * Path of the subdirectory to synth the project into.
   */
  readonly path: string;

  /**
   * The project.
   */
  readonly project: Project;
}

/**
 * Represent a project as a component in another project.
 * @experimental
 */
export class ProjectComponent extends Component {
  constructor(project: Project, private readonly options: ProjectComponentOptions) {
    super(project);
  }

  synthesize(outdir: string) {
    // Synths the project into a subdir given by `path`
    this.options.project.synth(path.join(outdir, this.options.path));
  }
}