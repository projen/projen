import * as path from 'path';
import { Component, IComponentScope } from './component';
import { IgnoreFile } from './ignore-file';

/**
 * A sub-directory in which to synthesize components.
 */
export class Subdir extends Component implements IComponentScope {
  public readonly gitignore: IgnoreFile;
  private readonly components: Component[];

  constructor(public readonly project: IComponentScope, public readonly subdirPath: string) {
    super(project);
    this.components = [];
    this.gitignore = new IgnoreFile(this, '.gitignore');
  }

  /**
   * @internal
   */
  _addComponent(component: Component): void {
    this.components.push(component);
  }

  addTip(message: string): void {
    this.project.addTip(message);
  }

  synthesize(outdir: string) {
    const subDir = path.join(outdir, this.subdirPath);

    for (const comp of this.components) {
      comp.synthesize(subDir);
    }

    for (const comp of this.components) {
      comp.postSynthesize(subDir);
    }
  }
}