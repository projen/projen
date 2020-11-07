import * as path from 'path';
import { Component, IComponentScope } from './component';
import { IgnoreFile } from './ignore-file';

/**
 * Options for `SubdirComponent`
 */
export interface SubdirComponentOptions {
  /**
   * Path relative to the project's synth directory to use as a subdirectory.
   */
  readonly subdirPath: string;
}

/**
 * A sub-directory in which to synthesize components.
 */
export class Subdir extends Component implements IComponentScope {
  readonly gitignore: IgnoreFile;
  readonly components: Component[];
  readonly subdirPath: string;

  constructor(public readonly project: IComponentScope, private readonly options: SubdirComponentOptions) {
    super(project);
    this.components = [];
    this.gitignore = new IgnoreFile(this, '.gitignore');
    this.subdirPath = options.subdirPath;
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
    const subDir = path.join(outdir, this.options.subdirPath);

    for (const comp of this.components) {
      comp.synthesize(subDir);
    }

    for (const comp of this.components) {
      comp.postSynthesize(subDir);
    }
  }
}