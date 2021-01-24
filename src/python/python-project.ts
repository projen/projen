import { Project, ProjectOptions, ProjectType } from '../project';
import { TaskOptions } from '../tasks';
import { Pip } from './pip';
import { Pytest, PytestOptions } from './pytest';
import { IPythonDeps } from './python-deps';
import { IPythonEnv } from './python-env';
import { IPythonPackaging } from './python-packaging';
import { PythonSample } from './python-sample';
import { Venv } from './venv';


/** Allowed characters in python project names */
const PYTHON_PROJECT_NAME_REGEX = /^[A-Za-z0-9-_\.]+$/;

/**
 * Options for `PythonProject`.
 */
export interface PythonProjectOptions extends ProjectOptions {
  /**
   * Absolute path to the user's python installation.
   *
   * @default $PYTHON_PATH
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
 * Every python project must have a component for managing dependencies, a
 * component for managing the Python virtual environment, and if it is a
 * library, a component for managing packaging the library. Some components
 * satisfy multiple requirements.
 *
 * - pip: dependency manager
 * - venv: environment manager
 * - pipenv: dependency and environment manager
 * - setuptools: packaging manager
 * - poetry: dependency, environment, and packaging manager
 *
 * @pjid python
 */
export class PythonProject extends Project {
  /**
   * Absolute path to the user's python installation.
   */
  readonly pythonPath: string;

  /**
   * Python module name (the project name, with any hyphens replaced with underscores).
   */
  readonly moduleName: string;

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

    if (!PYTHON_PROJECT_NAME_REGEX.test(options.name)) {
      throw new Error('Python projects must only consist of alphanumeric characters, hyphens, and underscores.');
    }

    this.moduleName = this.safeName(options.name);
    this.pythonPath = options.pythonPath;

    if (options.venv ?? true) {
      this.envManager = new Venv(this, {});
    }

    if (options.pip ?? true) {
      this.depsManager = new Pip(this, {});
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
      this.pytest = new Pytest(this, {});
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
   * Convert an arbitrary string to a valid module filename.
   *
   * Replaces hyphens with underscores.
   *
   * @param name project name
   */
  private safeName(name: string) {
    return name.replace('-', '_');
  }

  /**
   * Adds a single task that runs in the project's virtual environment.
   *
   * Additional steps can be added, but they will not be run in the environment.
   *
   * @param name The task name to add
   * @param props Task properties
   */
  public addEnvTask(name: string, props: TaskOptions) {
    return this.envManager.addEnvTask(name, props);
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
