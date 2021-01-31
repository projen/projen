import { Project, ProjectOptions, ProjectType } from '../project';
import { Pip } from './pip';
import { Poetry } from './poetry';
import { Pytest, PytestOptions } from './pytest';
import { IPythonDeps } from './python-deps';
import { IPythonEnv } from './python-env';
import { IPythonPackaging } from './python-packaging';
import { PythonSample } from './python-sample';
import { Setuptools, SetuptoolsOptions } from './setuptools';
import { Venv } from './venv';


/** Allowed characters in python project names */
const PYTHON_PROJECT_NAME_REGEX = /^[A-Za-z0-9-_\.]+$/;

/**
 * Options for `PythonProject`.
 */
export interface PythonProjectOptions extends ProjectOptions {
  // -- required options --

  /**
   * Absolute path to the user's python installation.
   *
   * @default $PYTHON_PATH
   */
  readonly pythonPath: string;

  // -- general information --

  /**
   * Author's name
   */
  readonly authorName?: string;

  /**
   * Author's e-mail
   */
  readonly authorEmail?: string;

  /**
   * Manually specify package version
   */
  readonly version?: string;

  /**
   * A short project description
   */
  readonly description?: string;

  /**
   * The project license
   */
  readonly license?: string;

  /**
   * The project's homepage / website
   */
  readonly homepage?: string;

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

  /**
   * Use setuptools with a setup.py script for packaging and distribution.
   *
   * @default - true if the project type is library
   */
  readonly setuptools?: boolean;

  /**
   * Use poetry to manage your project dependencies, virtual environment, and
   * (optional) packaging.
   *
   * @default false
   */
  readonly poetry?: boolean;

  /**
   * Setuptools options
   * @default - defaults
   */
  readonly setuptoolsOptions?: SetuptoolsOptions;

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
   * Absolute path to the user's python installation. This will be used for
   * setting up the virtual environment.
   */
  readonly pythonPath: string;

  /**
   * Python module name (the project name, with any hyphens or periods replaced
   * with underscores).
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

    if (options.setuptools ?? (this.projectType === ProjectType.LIB)) {
      this.packagingManager = new Setuptools(this, {
        ...options.setuptoolsOptions,
        setupConfig: {
          authorName: options.authorName,
          authorEmail: options.authorEmail,
          version: options.version,
          description: options.description,
          license: options.license,
          homepage: options.homepage,
          ...options.setuptoolsOptions?.setupConfig,
        },
      });
    }

    // if (options.conda ?? false) {
    //   this.depsManager = new Conda(this, options);
    //   this.envManager = this.depsManager;
    // }

    // if (options.pipenv ?? false) {
    //   this.depsManager = new Pipenv(this, options);
    //   this.envManager = this.depsManager;
    // }

    if (options.poetry ?? false) {
      const poetry = new Poetry(this, options);
      this.depsManager = poetry;
      this.envManager = poetry;
      this.packagingManager = poetry;
    }

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

    for (const dep of options.devDeps ?? []) {
      this.addDevDependency(dep);
    }

    this.addDefaultGitIgnore();
  }

  /**
   * Convert an arbitrary string to a valid module filename.
   *
   * Replaces hyphens with underscores.
   *
   * @param name project name
   */
  private safeName(name: string) {
    return name.replace('-', '_').replace('.', '_');
  }

  /**
   * Adds default gitignore options for a Python project based on
   * https://github.com/github/gitignore/blob/master/Python.gitignore
   */
  private addDefaultGitIgnore() {
    this.gitignore.exclude(
      '# Byte-compiled / optimized / DLL files',
      '__pycache__/',
      '*.py[cod]',
      '*$py.class',
      '',
      '# C extensions',
      '*.so',
      '',
      '# Distribution / packaging',
      '.Python',
      'build/',
      'develop-eggs/',
      'dist/',
      'downloads/',
      'eggs/',
      '.eggs/',
      'lib/',
      'lib64/',
      'parts/',
      'sdist/',
      'var/',
      'wheels/',
      'share/python-wheels/',
      '*.egg-info/',
      '.installed.cfg',
      '*.egg',
      'MANIFEST',
      '',
      '# PyInstaller',
      '#  Usually these files are written by a python script from a template',
      '#  before PyInstaller builds the exe, so as to inject date/other infos into it.',
      '*.manifest',
      '*.spec',
      '',
      '# Installer logs',
      'pip-log.txt',
      'pip-delete-this-directory.txt',
      '',
      '# Unit test / coverage reports',
      'htmlcov/',
      '.tox/',
      '.nox/',
      '.coverage',
      '.coverage.*',
      '.cache',
      'nosetests.xml',
      'coverage.xml',
      '*.cover',
      '*.py,cover',
      '.hypothesis/',
      '.pytest_cache/',
      'cover/',
      '',
      '# Translations',
      '*.mo',
      '*.pot',
      '',
      '# Django stuff:',
      '*.log',
      'local_settings.py',
      'db.sqlite3',
      'db.sqlite3-journal',
      '',
      '# Flask stuff:',
      'instance/',
      '.webassets-cache',
      '',
      '# Scrapy stuff:',
      '.scrapy',
      '',
      '# Sphinx documentation',
      'docs/_build/',
      '',
      '# PyBuilder',
      '.pybuilder/',
      'target/',
      '',
      '# Jupyter Notebook',
      '.ipynb_checkpoints',
      '',
      '# IPython',
      'profile_default/',
      'ipython_config.py',
      '',
      '# PEP 582; used by e.g. github.com/David-OConnor/pyflow',
      '__pypackages__/',
      '',
      '# Celery stuff',
      'celerybeat-schedule',
      'celerybeat.pid',
      '',
      '# SageMath parsed files',
      '*.sage.py',
      '',
      '# Environments',
      '.env',
      '.venv',
      'env/',
      'venv/',
      'ENV/',
      'env.bak/',
      'venv.bak/',
      '',
      '# Spyder project settings',
      '.spyderproject',
      '.spyproject',
      '',
      '# Rope project settings',
      '.ropeproject',
      '',
      '# mkdocs documentation',
      '/site',
      '',
      '# mypy',
      '.mypy_cache/',
      '.dmypy.json',
      'dmypy.json',
      '',
      '# Pyre type checker',
      '.pyre/',
      '',
      '# pytype static type analyzer',
      '.pytype/',
      '',
      '# Cython debug symbols',
      'cython_debug/',
    );
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
   * Adds a dev dependency.
   *
   * @param spec Format `<module>@<semver>`
   */
  public addDevDependency(spec: string) {
    return this.depsManager.addDevDependency(spec);
  }

  public postSynthesize() {
    super.postSynthesize();

    this.envManager.setupEnvironment();
    this.depsManager.installDependencies();
  }
}
