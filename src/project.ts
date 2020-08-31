import { IgnoreFile } from './ignore-file';
import { Component } from './component';
import { cleanup } from './cleanup';

export class Project {
  public readonly gitignore: IgnoreFile;

  private readonly components = new Array<Component>();

  constructor() {
    this.gitignore = new IgnoreFile(this, '.gitignore');
  }

  /**
   * Prints a "tip" message during synthesis.
   * @param message The message
   */
  public printTip(message: string) {
    console.error(`💡 ${message}`);
  }

  /**
   * Synthesize all project files into `outdir`
   * @param outdir The project root directory (default is `.`).
   */
  public synth(outdir: string = '.'): void {

    this.preSynthesize(outdir);

    // delete all generated files before we start synthesizing new ones
    cleanup(outdir);

    for (const comp of this.components) {
      comp._synthesize(outdir);
    }

    for (const comp of this.components) {
      comp.postSynthesize(outdir);
    }

    // project-level hook
    this.postSynthesize(outdir);
  }

  public preSynthesize(_outdir: string) {}

  /**
   * Called after synthesis. Order is *not* guaranteed.
   * @param _outdir The project directory
   */
  public postSynthesize(_outdir: string) {}

  /**
   * Adds a component to the project.
   * @internal
   */
  public _addComponent(component: Component) {
    this.components.push(component);
  }
}
