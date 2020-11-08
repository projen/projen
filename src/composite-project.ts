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
   * {
   *   'packages/foo': new NodeProject({ name: 'foo' }),
   *   'packages/bar': new NextjsProject({ name: 'bar' }),
   * }
   * ```
   */
  projects?: Record<string, Project>;
}

/**
 * Creates a composite project.
 */
export class CompositeProject extends Project {
  // Tracks which sub paths have already been added.
  private readonly projects: Record<string, SubProjectComponent>;

  constructor(options?: CompositeProjectOptions) {
    super();

    this.projects = {};

    // Add declaratively defined subprojects.
    for (const [subPath, project] of Object.entries(options?.projects ?? {})) {
      this.addProject(subPath, project);
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

    this.projects[subPath] = new SubProjectComponent(this, {
      path: subPath,
      project: project,
    });
  }
}

/**
 * Options for `SubProjectComponent`
 * @internal
 */
export interface SubProjectComponentOptions {
  /**
   * Subpath of the sub-project.
   */
  readonly path: string;

  /**
   * The sub-project.
   */
  readonly project: Project;
}

/**
 * Component representation of a sub-project.
 * @internal
 */
export class SubProjectComponent extends Component {
  constructor(project: Project, private readonly options: SubProjectComponentOptions) {
    super(project);
  }

  synthesize(outdir: string) {
    this.options.project.synth(path.join(outdir, this.options.path));
  }
}