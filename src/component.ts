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
   * @param _outdir The project directory*
   * @internal
   */
  public _synthesize(_outdir: string) {}

  /**
   * Called after synthesis. Order is *not* guaranteed.
   * @param _outdir The project directory
   */
  public postSynthesize(_outdir: string) {}
}