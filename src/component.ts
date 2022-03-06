import { Construct } from "constructs";

/**
 * Represents a project component.
 */
export class Component extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);
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
