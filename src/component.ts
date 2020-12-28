import { Project } from './project';

/**
 * Represents a project component.
 */
export class Component {
  constructor(public readonly project: Project) {
    project._addComponent(this);
  }

  public preSynthesize() { }

  /**
   * Synthesizes files to the project output directory.
   */
  public synthesize() {}

  /**
   * Called after synthesis. Order is *not* guaranteed.
   */
  public postSynthesize() {}
}