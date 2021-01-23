import { Project, ProjectOptions, ProjectType } from '../project';
import { TaskOptions } from '../tasks';
import { Pip } from './pip';
import { Pytest, PytestOptions } from './pytest';
import { IPythonDeps } from './python-deps';
import { IPythonEnv } from './python-env';
import { IPythonPackaging } from './python-packaging';
import { PythonSample } from './python-sample';
import { Venv } from './venv';

/**
 * Options for `PythonProject`.
 */
export interface PythonProjectOptions extends ProjectOptions {
  /**
   * Absolute path to the user's python installation.
   *
   * @default "/usr/bin/python"
   */
  readonly pythonPath: string;

  // -- dependencies --

  /**
   * List of runtime dependencies for this project.
   *
   * Dependencies use the format: `<module>@<semver>`
   *
   * Additional dependencies can be added via `project.addDependency()`.
   *
   * @default []
   */
  readonly deps?: string[];

  /**
   * List of test dependencies for this project.
   *
   * Dependencies use the format: `<module>@<semver>`
   *
   * Additional dependencies can be added via `project.addTestDependency()`.
   *
   * @default []
   */
  readonly testDeps?: string[];

  /**
   * List of dev dependencies for this project.
   *
   * Dependencies use the format: `<module>@<semver>`
   *
   * Additional dependencies can be added via `project.addDevDependency()`.
   *
   * @default []
   */
  readonly devDeps?: string[];

  // -- core components --

  /**
   * Use pip with a requirements.txt file to track project dependencies.
   *
   * @default true
   */
  readonly pip?: boolean;

  /**
   * Use venv to manage a virtual environment for installing dependencies inside.
   *
   * @default true
   */
  readonly venv?: boolean;

  // -- optional components --

  /**
   * Include pytest tests.
   * @default true
   */
  readonly pytest?: boolean;

  /**
   * pytest options
   * @default - defaults
   */
  readonly pytestOptions?: PytestOptions;

  /**
   * Include sample code and test if the relevant directories don't exist.
   */
  readonly sample?: boolean;
}

/**
 * Python project.
 *
 * @pjid python
 */
export class PythonProject extends Project {
  /**
   * API for managing dependencies.
   */
  public readonly depsManager!: IPythonDeps;

  /**
   * API for mangaging the Python runtime environment.
   */
  public readonly envManager!: IPythonEnv;

  /**
   * API for managing packaging the project as a library. Only applies when the `projectType` is LIB.
   */
  public readonly packagingManager!: IPythonPackaging;

  /**
   * Pytest component.
   */
  public readonly pytest?: Pytest;

  constructor(options: PythonProjectOptions) {
    super(options);

    if (options.pip ?? true) {
      this.depsManager = new Pip(this, {});
    }

    if (options.venv ?? true) {
      this.envManager = new Venv(this, {
        pythonPath: options.pythonPath,
      });
    }

    // if (options.setuptools ?? true) {
    //   this.packagingManager = new SetupTools(this, options);
    // }

    // if (options.conda ?? false) {
    //   this.depsManager = new Conda(this, options);
    //   this.envManager = this.depsManager;
    // }

    // if (options.pipenv ?? false) {
    //   this.depsManager = new Pipenv(this, options);
    //   this.envManager = this.depsManager;
    // }

    // if (options.poetry ?? false) {
    //   this.depsManager = new Poetry(this, options);
    //   this.envManager = this.depsManager;
    //   this.packagingManager = this.packagingManager;
    // }

    if (!this.depsManager) {
      throw new Error('At least one tool must be chosen for managing dependencies (pip, conda, pipenv, or poetry).');
    }

    if (!this.envManager) {
      throw new Error('At least one tool must be chosen for managing the environment (venv, conda, pipenv, or poetry).');
    }

    if (!this.packagingManager) {
      if (this.projectType === ProjectType.LIB) {
        throw new Error('At least one tool must be chosen for managing packaging (setuptools or poetry).');
      } else {
        this.packagingManager = {}; // no-op packaging manager
      }
    }

    if (options.pytest ?? true) {
      this.pytest = new Pytest(this, {
        ...options.pytestOptions,
      });
    }

    if (options.sample ?? true) {
      new PythonSample(this, {});
    }

    for (const dep of options.deps ?? []) {
      this.addDependency(dep);
    }

    for (const dep of options.testDeps ?? []) {
      this.addTestDependency(dep);
    }

    for (const dep of options.devDeps ?? []) {
      this.addDevDependency(dep);
    }
  }

  /**
   * Adds a task that runs in the project's virtual environment.
   *
   * @param name The task name to add
   * @param props Task properties
   */
  public addEnvTask(name: string, props: TaskOptions = { }) {
    const task = this.tasks.addTask(name, props);
    task.prependSpawn(this.envManager.activateTask);
    task.spawn(this.envManager.deactivateTask);
    return task;
  }

  /**
   * Adds a runtime dependency.
   *
   * @param spec Format `<module>@<semver>`
   */
  public addDependency(spec: string) {
    return this.depsManager.addDependency(spec);
  }

  /**
   * Adds a test dependency.
   *
   * @param spec Format `<module>@<semver>`
   */
  public addTestDependency(spec: string) {
    return this.depsManager.addTestDependency(spec);
  }

  /**
   * Adds a dev dependency.
   *
   * @param spec Format `<module>@<semver>`
   */
  public addDevDependency(spec: string) {
    return this.depsManager.addDevDependency(spec);
  }
}
