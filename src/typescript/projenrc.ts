import { existsSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { Component } from '../component';
import { renderJavaScriptOptions } from '../javascript/render-options';
import { NewProjectOptionHints } from '../option-hints';
import { TypeScriptProject } from '../typescript';

export interface ProjenrcOptions {
  /**
   * The name of the projenrc file.
   * @default ".projenrc.ts"
   */
  readonly filename?: string;

  /**
   * Include commented out properties.
   * @default NewProjectOptionHints.FEATURED
   */
  readonly comments?: NewProjectOptionHints;
}

/**
 * Sets up a typescript project to use TypeScript for projenrc.
 */
export class Projenrc extends Component {
  private readonly rcfile: string;
  private readonly comments: NewProjectOptionHints;

  constructor(project: TypeScriptProject, options: ProjenrcOptions = {}) {
    super(project);

    this.rcfile = options.filename ?? '.projenrc.ts';
    this.comments = options.comments ?? NewProjectOptionHints.FEATURED;

    // tell eslint to take .projenrc.ts into account as a dev-dependency
    project.eslint?.allowDevDeps(this.rcfile);
    project.eslint?.addIgnorePattern(`!${this.rcfile}`);
    project.tsconfigEslint?.addInclude(this.rcfile);

    // this is the task projen executes when running `projen` without a
    // specific task (if this task is not defined, projen falls back to
    // running "node .projenrc.js").
    project.addDevDeps('ts-node');
    project.addTask(TypeScriptProject.DEFAULT_TASK, { exec: `ts-node ${this.rcfile}` });

    this.generateProjenrc();
  }

  private generateProjenrc() {
    const rcfile = resolve(this.project.outdir, this.rcfile);
    if (existsSync(rcfile)) {
      return; // already exists
    }

    const bootstrap = this.project.newProject;
    if (!bootstrap) {
      return;
    }

    const parts = bootstrap.fqn.split('.');
    const moduleName = parts[0];
    const importName = parts[1];
    const className = parts.slice(1).join('.');

    const js = renderJavaScriptOptions({
      args: bootstrap.args,
      type: bootstrap.type,
      comments: this.comments,
    });

    const lines = new Array<string>();
    lines.push(`import { ${importName} } from '${moduleName}';`);
    lines.push();
    lines.push(`const project = new ${className}(${js});`);
    lines.push();
    lines.push('project.synth();');

    writeFileSync(rcfile, lines.join('\n'));
    this.project.logger.info(`Project definition file was created at ${rcfile}`);
  }
}