import { Component } from '../component';
import { Task, TaskCategory } from '../tasks';
import { IPythonEnv } from './python-env';
import { PythonProject } from './python-project';

export interface VenvOptions {
  /**
   * Absolute path to the user's python installation.
   */
  readonly pythonPath: string;

  /**
   * Name of directory to store the environment in
   *
   * @default ".env"
   */
  readonly envdir?: string;
}

export class Venv extends Component implements IPythonEnv {
  /**
   * Absolute path to the user's python installation.
   */
  private readonly pythonPath: string;

  /**
   * Name of directory to store the environment in
   */
  private readonly envdir: string;

  public readonly createEnvTask: Task;
  public readonly activateTask: Task;
  public readonly deactivateTask: Task;

  constructor(project: PythonProject, options: VenvOptions) {
    super(project);

    this.pythonPath = options.pythonPath;
    this.envdir = options.envdir ?? '.env';

    this.createEnvTask = project.addTask('env:create', {
      description: 'Setup the project\'s python environment',
      category: TaskCategory.MISC,
      exec: `${this.pythonPath} -m venv ${this.envdir}`,
    });

    this.activateTask = project.addTask('env:activate', {
      description: 'Activate the python environment',
      category: TaskCategory.MISC,
      exec: `source ${this.envdir}/bin/activate`,
    });

    this.deactivateTask = project.addTask('env:deactivate', {
      description: 'Deactivate the python environment',
      category: TaskCategory.MISC,
      exec: 'deactivate',
    });
  }
}