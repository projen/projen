import { IgnoreFile } from './ignore-file';
import { Component } from './component';

export class Project {
  public readonly gitignore: IgnoreFile;

  private readonly components = new Array<Component>();

  constructor() {
    this.gitignore = new IgnoreFile(this, '.gitignore');
  }

  /**
   * Synthesize all project files into `outdir`
   * @param outdir The project root directory (default is `.`).
   */
  public synth(outdir: string = '.'): void {
    for (const comp of this.components) {
      comp._synthesize(outdir);
    }
  }

  /**
   * Adds a component to the project.
   * @internal
   */
  public _addComponent(component: Component) {
    this.components.push(component);
  }
}
