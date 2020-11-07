import * as chalk from 'chalk';
import { cleanup } from './cleanup';
import { printStartMenu } from './cli/cmds/start-app';
import { Component, IComponentScope } from './component';
import { IgnoreFile } from './ignore-file';
import * as logging from './logging';
import { Start } from './start';

/**
 * Base project
 */
export class Project implements IComponentScope {
  public readonly gitignore: IgnoreFile;

  private readonly components = new Array<Component>();
  private readonly tips = new Array<string>();

  constructor() {
    this.gitignore = new IgnoreFile(this, '.gitignore');
  }

  /**
   * Prints a "tip" message during synthesis.
   * @param message The message
   */
  public addTip(message: string) {
    this.tips.push(message);
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
      comp.synthesize(outdir);
    }

    for (const comp of this.components) {
      comp.postSynthesize(outdir);
    }

    // project-level hook
    this.postSynthesize(outdir);


    logging.info('Synthesis complete');

    const start = this.components.find(c => c instanceof Start);
    if (start) {
      console.error();
      console.error('-'.repeat(100));
      printStartMenu();
    }

    if (this.tips.length) {
      console.error(chalk.cyanBright.underline('Tips:'));
      for (const tip of this.tips) {
        console.error(`💡 ${tip}`);
      }
    }
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
