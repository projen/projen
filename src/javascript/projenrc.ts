import { existsSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { Component } from '../component';
import { ProjectOptionsVerbosity, renderJavaScriptOptions } from '../javascript/render-options';
import { Project } from '../project';
import { TypeScriptProject } from '../typescript';

export interface ProjenrcOptions {
  /**
   * The name of the projenrc file.
   * @default ".projenrc.js"
   */
  readonly filename?: string;

  /**
   * Include commented out properties.
   * @default ProjectOptionsVerbosity.FEATURED
   */
  readonly comments?: ProjectOptionsVerbosity;
}

/**
 * Sets up a typescript project to use TypeScript for projenrc.
 */
export class Projenrc extends Component {
  private readonly rcfile: string;
  private readonly comments?: ProjectOptionsVerbosity;

  constructor(project: Project, options: ProjenrcOptions = {}) {
    super(project);

    this.rcfile = options.filename ?? '.projenrc.js';
    this.comments = options.comments ?? ProjectOptionsVerbosity.FEATURED;

    // this is the task projen executes when running `projen`
    project.addTask(TypeScriptProject.DEFAULT_TASK, { exec: `node ${this.rcfile}` });

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
      comments: this.comments,
      args: bootstrap.args,
      type: bootstrap.type,
    });

    const lines = new Array<string>();
    lines.push(`const { ${importName} } = require('${moduleName}');`);
    lines.push();
    lines.push(`const project = new ${className}(${js});`);
    lines.push();
    lines.push('project.synth();');

    writeFileSync(rcfile, lines.join('\n'));
    this.project.logger.info(`Project definition file was created at ${rcfile}`);
  }
}