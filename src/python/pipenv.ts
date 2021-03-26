import { Component } from '../component';
import { DependencyType } from '../deps';
import { Task, TaskCategory } from '../tasks';
import { TomlFile } from '../toml';
import { exec, execOrUndefined } from '../util';
import { IPythonDeps } from './python-deps';
import { IPythonEnv } from './python-env';
import { PythonProject } from './python-project';


export interface PipenvOptions {
  /**
   * Options to pass through to the Pipfile
   */
  readonly pipfileOptions?: PipenvPipfileOptionsWithoutDeps;
}
/**
 * Manage project dependencies and virtual environments through the
 * Pipenv CLI tool.
 */
export class Pipenv extends Component implements IPythonDeps, IPythonEnv {
  public readonly installTask: Task;


  constructor(project: PythonProject, options: PipenvOptions) {
    super(project);

    this.installTask = project.addTask('install', {
      description: 'Install and upgrade dependencies',
      category: TaskCategory.BUILD,
      exec: 'pipenv update',
    });

    this.project.tasks.addEnvironment('VIRTUAL_ENV', '$(pipenv --venv)');
    this.project.tasks.addEnvironment('PATH', '$(echo $(pipenv --venv)/bin:$PATH)');

    new PipenvPipfile(project, {
      ...options.pipfileOptions,
      dependencies: () => this.synthDependencies(),
      devDependencies: () => this.synthDevDependencies(),
    });
  }

  private synthDependencies() {
    const dependencies: { [key: string]: any } = {};
    for (const pkg of this.project.deps.all) {
      if (pkg.type === DependencyType.RUNTIME) {
        dependencies[pkg.name] = pkg.version;
      }
    }
    return dependencies;
  }

  private synthDevDependencies() {
    const dependencies: { [key: string]: any } = {};
    for (const pkg of this.project.deps.all) {
      if ([DependencyType.DEVENV].includes(pkg.type)) {
        dependencies[pkg.name] = pkg.version;
      }
    }
    return dependencies;
  }

  /**
   * Adds a runtime dependency.
   *
   * @param spec Format `<module>@<semver>`
   */
  public addDependency(spec: string): void {
    this.project.deps.addDependency(spec, DependencyType.RUNTIME);
  }

  /**
   * Adds a dev dependency.
   *
   * @param spec Format `<module>@<semver>`
   */
  public addDevDependency(spec: string): void {
    this.project.deps.addDependency(spec, DependencyType.DEVENV);
  }

  /**
   * Initializes the virtual environment if it doesn't exist (called during post-synthesis).
   */
  public setupEnvironment(): void {
    const result = execOrUndefined('which pipenv', { cwd: this.project.outdir });
    if (!result) {
      this.project.logger.info('Unable to setup an environment since pipenv is not installed. Please install pipenv (https://pipenv.pypa.io/en/latest/install/) or use a different component for managing environments such as \'venv\'.');
    }

    let envPath = execOrUndefined('pipenv --venv', { cwd: this.project.outdir });
    if (!envPath) {
      this.project.logger.info('Setting up a virtual environment...');
      exec('pipenv --three', { cwd: this.project.outdir });
      envPath = execOrUndefined('pipenv --venv', { cwd: this.project.outdir });
      this.project.logger.info(`Environment successfully created (located in ${envPath}}).`);
    }
  }

  /**
   * Installs dependencies (called during post-synthesis).
   */
  public installDependencies() {
    this.project.logger.info('Installing dependencies...');
    exec(this.installTask.toShellCommand(), { cwd: this.project.outdir });
  }
}

export interface PipenvPipfileOptionsWithoutDeps {
  /**
   * Version of python for Pipenv to use
   *
   * @default "3"
   */
  readonly pythonVersion?: string;
}

export interface PipenvPipfileOptions extends PipenvPipfileOptionsWithoutDeps {
  /**
   * A list of dependencies for the project.
   *
   * @example { requests: "^2.13.0" }
   */
  readonly dependencies?: { [key: string]: any };

  /**
   * A list of development dependencies for the project.
   *
   * @example { requests: "^2.13.0" }
   */
  readonly devDependencies?: { [key: string]: any };
}

/**
 * Represents configuration of a Pipfile file for a Pipenv project.
 *
 * @see https://github.com/pypa/pipfile
 */
export class PipenvPipfile extends Component {
  public readonly file: TomlFile;

  constructor(project: PythonProject, options: PipenvPipfileOptions) {
    super(project);

    this.file = new TomlFile(project, 'Pipfile', {
      marker: true,
      omitEmpty: false,
      obj: {
        'source': [{
          name: 'pypi',
          url: 'https://pypi.python.org/simple',
          verify_ssl: true,
        }],
        'packages': options.dependencies,
        'dev-packages': options.devDependencies,
        'requires': {
          python_version: options.pythonVersion ?? '3',
        },
      },
    });
  }
}
