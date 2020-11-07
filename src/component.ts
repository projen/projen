import { IgnoreFile } from './ignore-file';

/**
 * A scope for components. i.e., a project or a subdirectory.
 */
export interface IComponentScope {
  readonly gitignore: IgnoreFile;

  /**
   * @internal
   */
  _addComponent(component: Component): void;

  /**
   * Prints a "tip" message during synthesis.
   * @param message The message
   */
  addTip(message: string): void;
}

/**
 * Represents a project component.
 */
export class Component {
  constructor(public readonly project: IComponentScope) {
    project._addComponent(this);
  }

  /**
   * Synthesizes files to the project output directory.
   * @param _outdir The project directory*
   */
  public synthesize(_outdir: string) {}

  /**
   * Called after synthesis. Order is *not* guaranteed.
   * @param _outdir The project directory
   */
  public postSynthesize(_outdir: string) {}
}