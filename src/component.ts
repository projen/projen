import { Project } from "./project";

/**
 * Represents a project component.
 */
export class Component<T extends Project = Project> {
  constructor(public readonly project: T) {
    project._addComponent(this);
  }

  /**
   * Called before synthesis.
   */
  public preSynthesize() {}

  /**
   * Synthesizes files to the project output directory.
   */
  public synthesize() {}

  /**
   * Called after synthesis. Order is *not* guaranteed.
   */
  public postSynthesize() {}
}
