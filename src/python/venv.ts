import * as path from 'path';
import { Component } from '../component';
import { Task, TaskCategory, TaskOptions } from '../tasks';
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

  public readonly setupEnvTask: Task;

  constructor(project: PythonProject, options: VenvOptions) {
    super(project);

    this.envdir = options.envdir ?? '.env';

    this.project.gitignore.exclude(`/${this.envdir}`);

    this.setupEnvTask = project.addTask('setup-env', {
      description: 'Setup the project\'s python environment',
      category: TaskCategory.MISC,
      exec: `${project.pythonPath} -m venv ${this.envdir}`,
    });
    this.setupEnvTask.say('Environment successfully created.');
  }

  /**
   * Adds a task that runs in the project's virtual environment.
   *
   * @param name The task name to add
   * @param props Task properties
   */
  public addEnvTask(name: string, props: TaskOptions) {
    const absoluteEnvPath = path.join(this.project.outdir, this.envdir);

    return this.project.tasks.addTask(name, {
      ...props,

      // simulate the effect of 'source .env/bin/activate'
      // the original script "unsets" PYTHONHOME, but setting to empty string works too
      env: {
        VIRTUAL_ENV: absoluteEnvPath,
        PYTHONHOME: '',
        PATH: `$(echo ${absoluteEnvPath}/bin:$PATH)`,
        ...props.env,
      },
    });
  }
}