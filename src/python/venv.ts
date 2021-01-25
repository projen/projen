import * as path from 'path';
import * as fs from 'fs-extra';
import { Component } from '../component';
import { exec } from '../util';
import { IPythonEnv } from './python-env';
import { PythonProject } from './python-project';

export interface VenvOptions {
  /**
   * Name of directory to store the environment in
   *
   * @default ".env"
   */
  readonly envdir?: string;
}

export class Venv extends Component implements IPythonEnv {
  /**
   * Name of directory to store the environment in
   */
  private readonly envdir: string;
  private readonly pythonProject: PythonProject;

  constructor(project: PythonProject, options: VenvOptions) {
    super(project);

    this.envdir = options.envdir ?? '.env';
    this.pythonProject = project;

    this.project.gitignore.exclude(`/${this.envdir}`);

    this.project.tasks.addEnvironment('VIRTUAL_ENV', `$(echo $PWD/${this.envdir})`);
    this.project.tasks.addEnvironment('PYTHONHOME', '');
    this.project.tasks.addEnvironment('PATH', `$(echo $PWD/${this.envdir}/bin:$PATH)`);
  }

  /**
   * Initializes the virtual environment if it doesn't exist (called during post-synthesis).
   */
  public setupEnvironment() {
    const absoluteEnvdir = path.join(this.project.outdir, this.envdir);
    if (!fs.pathExistsSync(absoluteEnvdir)) {
      this.project.logger.info(`Setting up a virtual environment using the python installation that was found: ${this.pythonProject.pythonPath}.`);
      exec(`${this.pythonProject.pythonPath} -m venv ${this.envdir}`, { cwd: this.project.outdir });
      this.project.logger.info(`Environment successfully created (located in /${this.envdir}).`);
    }
  }
}