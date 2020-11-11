import * as chalk from 'chalk';
import { Construct, ConstructNode } from 'constructs';

import { cleanup } from './cleanup';
import { printStartMenu } from './cli/cmds/start-app';
import { Component } from './component';
import { IgnoreFile } from './ignore-file';
import * as logging from './logging';
import { ProjectConstruct } from './project-construct';
import { SampleReadme } from './readme';
import { Start } from './start';

/**
 * Base project
 */
export class Project extends Construct {
  public readonly gitignore: IgnoreFile;
  public readonly name: string;

  private readonly components = new Array<Component>();
  private readonly tips = new Array<string>();

  constructor(name: string) {
    super(undefined as any, name);

    this.name = name;
    this.gitignore = new IgnoreFile(this, '.gitignore');

    new SampleReadme(this, '# my project');
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

    const constructs = ConstructNode.of(this).findAll().filter(x => x instanceof ProjectConstruct) as ProjectConstruct[];

    for (const comp of this.components) {
      comp.synthesize(outdir);
    }

    for (const child of constructs) {
      child.synthesize(outdir);
    }

    for (const comp of this.components) {
      comp.postSynthesize(outdir);
    }

    for (const child of constructs) {
      child.postSynthesize(outdir);
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

  /**
   * @internal
   */
  public get _components(): Component[] {
    return [...this._components];
  }
}
