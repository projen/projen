import { Project } from './project';

/**
 * Represents a project component.
 */
export class Component {
  constructor(public readonly project: Project) {
    project._addComponent(this);
  }

  /**
   * Synthesizes files to the project output directory.
   * @internal
   */
  public _synthesize(_outdir: string) { }
}