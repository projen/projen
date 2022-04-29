import { GitHubProject, GitHubProjectOptions } from "../github";
import {
  Projenrc as ProjenrcJs,
  ProjenrcOptions as ProjenrcJsOptions,
} from "../javascript/projenrc";
import { ProjectType } from "../project";
import { Pip } from "./pip";
import { Poetry } from "./poetry";
import {
  Projenrc as ProjenrcPython,
  ProjenrcOptions as ProjenrcPythonOptions,
} from "./projenrc";
import { Pytest, PytestOptions } from "./pytest";
import { PytestSample } from "./pytest-sample";
import { IPythonDeps } from "./python-deps";
import { IPythonEnv } from "./python-env";
import { IPythonPackaging, PythonPackagingOptions } from "./python-packaging";
import { PythonSample } from "./python-sample";
import { Setuptools } from "./setuptools";
import { Venv, VenvOptions } from "./venv";

/** Allowed characters in python project names */
const PYTHON_PROJECT_NAME_REGEX = /^[A-Za-z0-9-_\.]+$/;

/**
 * Options for `PythonProject`.
 */
export interface PythonProjectOptions
  extends GitHubProjectOptions,
    PythonPackagingOptions {
  // -- required options --

  /**
   * Name of the python package as used in imports and filenames.
   *
   * Must only consist of alphanumeric characters and underscores.
   *
   * @default $PYTHON_MODULE_NAME
   */
  readonly moduleName: string;

  // -- dependencies --

  /**
   * List of runtime dependencies for this project.
   *
   * Dependencies use the format: `<module>@<semver>`
   *
   * Additional dependencies can be added via `project.addDependency()`.
   *
   * @default []
   * @featured
   */
  readonly deps?: string[];

  /**
   * List of dev dependencies for this project.
   *
   * Dependencies use the format: `<module>@<semver>`
   *
   * Additional dependencies can be added via `project.addDevDependency()`.
   *
   * @default []
   * @featured
   */
  readonly devDeps?: string[];

  // -- core components --

  /**
   * Use pip with a requirements.txt file to track project dependencies.
   *
   * @default true
   * @featured
   */
  readonly pip?: boolean;

  /**
   * Use venv to manage a virtual environment for installing dependencies inside.
   *
   * @default true
   * @featured
   */
  readonly venv?: boolean;

  /**
   * Venv options
   * @default - defaults
   */
  readonly venvOptions?: VenvOptions;

  /**
   * Use setuptools with a setup.py script for packaging and publishing.
   *
   * @default - true if the project type is library
   * @featured
   */
  readonly setuptools?: boolean;

  /**
   * Use poetry to manage your project dependencies, virtual environment, and
   * (optional) packaging/publishing.
   *
   * @default false
   * @featured
   */
  readonly poetry?: boolean;

  // -- optional components --

  /**
   * Include pytest tests.
   * @default true
   * @featured
   */
  readonly pytest?: boolean;

  /**
   * pytest options
   * @default - defaults
   */
  readonly pytestOptions?: PytestOptions;

  /**
   * Include sample code and test if the relevant directories don't exist.
   * @default true
   */
  readonly sample?: boolean;

  /**
   * Use projenrc in Python.
   *
   * This will install `projen` as a Python dependency and add a `synth`
   * task which will run `.projenrc.py`.
   *
   * @default true
   */
  readonly projenrcPython?: boolean;

  /**
   * Options related to projenrc in python.
   * @default - default options
   */
  readonly projenrcPythonOptions?: ProjenrcPythonOptions;

  /**
   * Use projenrc in javascript.
   *
   * This will install `projen` as a JavaScript dependency and add a `synth`
   * task which will run `.projenrc.js`.
   *
   * @default false
   */
  readonly projenrcJs?: boolean;

  /**
   * Options related to projenrc in JavaScript.
   * @default - default options
   */
  readonly projenrcJsOptions?: ProjenrcJsOptions;
}

/**
 * Python project.
 *
 * @pjid python
 */
export class PythonProject extends GitHubProject {
  /**
   * Python module name (the project name, with any hyphens or periods replaced
   * with underscores).
   */
  public readonly moduleName: string;

  /**
   * Version of the package for distribution (should follow semver).
   */
  public readonly version: string;

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
  public readonly packagingManager?: IPythonPackaging;

  /**
   * Pytest component.
   */
  public pytest?: Pytest;

  constructor(options: PythonProjectOptions) {
    super(options);

    if (!PYTHON_PROJECT_NAME_REGEX.test(options.name)) {
      throw new Error(
        "Python projects must only consist of alphanumeric characters, hyphens, and underscores."
      );
    }

    this.moduleName = options.moduleName;
    this.version = options.version;

    const { anySelected, multipleSelected } = analyzeChoices(
      options.projenrcPython,
      options.projenrcJs,
      options.projenrcJson
    );

    if (multipleSelected) {
      throw new Error(
        "Only one of projenrcPython, projenrcJs, and projenrcJson can be selected."
      );
    }

    // default to projenrc.py if no other projenrc type was elected
    if (options.projenrcPython ?? !anySelected) {
      new ProjenrcPython(this, options.projenrcPythonOptions);
    }

    if (options.projenrcJs ?? false) {
      new ProjenrcJs(this, options.projenrcJsOptions);
    }

    if (options.venv ?? true) {
      this.envManager = new Venv(this, options.venvOptions);
    }

    if (options.pip ?? true) {
      this.depsManager = new Pip(this);
    }

    if (options.setuptools ?? this.projectType === ProjectType.LIB) {
      this.packagingManager = new Setuptools(this, {
        version: options.version,
        description: options.description,
        authorName: options.authorName,
        authorEmail: options.authorEmail,
        license: options.license,
        homepage: options.homepage,
        classifiers: options.classifiers,
        setupConfig: options.setupConfig,
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
      const poetry = new Poetry(this, {
        version: options.version,
        description: options.description,
        authorName: options.authorName,
        authorEmail: options.authorEmail,
        license: options.license,
        homepage: options.homepage,
        classifiers: options.classifiers,
        poetryOptions: {
          readme: options.readme?.filename ?? "README.md",
          ...options.poetryOptions,
        },
      });
      this.depsManager = poetry;
      this.envManager = poetry;
      this.packagingManager = poetry;
    }

    if (!this.envManager) {
      throw new Error(
        "At least one tool must be chosen for managing the environment (venv, conda, pipenv, or poetry)."
      );
    }

    if (!this.depsManager) {
      throw new Error(
        "At least one tool must be chosen for managing dependencies (pip, conda, pipenv, or poetry)."
      );
    }

    if (!this.packagingManager && this.projectType === ProjectType.LIB) {
      throw new Error(
        "At least one tool must be chosen for managing packaging (setuptools or poetry)."
      );
    }

    if (Number(options.venv ?? true) + Number(options.poetry ?? false) > 1) {
      throw new Error(
        "More than one component has been chosen for managing the environment (venv, conda, pipenv, or poetry)"
      );
    }

    if (Number(options.pip ?? true) + Number(options.poetry ?? false) > 1) {
      throw new Error(
        "More than one component has been chosen for managing dependencies (pip, conda, pipenv, or poetry)"
      );
    }

    if (
      Number(options.setuptools ?? true) + Number(options.poetry ?? false) >
      1
    ) {
      throw new Error(
        "More than one component has been chosen for managing packaging (setuptools or poetry)"
      );
    }

    if (options.pytest ?? true) {
      this.pytest = new Pytest(this, options.pytestOptions);
      new PytestSample(this, this.pytest.testdir);
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
   * Adds default gitignore options for a Python project based on
   * https://github.com/github/gitignore/blob/master/Python.gitignore
   */
  private addDefaultGitIgnore() {
    this.gitignore.exclude(
      "# Byte-compiled / optimized / DLL files",
      "__pycache__/",
      "*.py[cod]",
      "*$py.class",
      "",
      "# C extensions",
      "*.so",
      "",
      "# Distribution / packaging",
      ".Python",
      "build/",
      "develop-eggs/",
      "dist/",
      "downloads/",
      "eggs/",
      ".eggs/",
      "lib/",
      "lib64/",
      "parts/",
      "sdist/",
      "var/",
      "wheels/",
      "share/python-wheels/",
      "*.egg-info/",
      ".installed.cfg",
      "*.egg",
      "MANIFEST",
      "",
      "# PyInstaller",
      "#  Usually these files are written by a python script from a template",
      "#  before PyInstaller builds the exe, so as to inject date/other infos into it.",
      "*.manifest",
      "*.spec",
      "",
      "# Installer logs",
      "pip-log.txt",
      "pip-delete-this-directory.txt",
      "",
      "# Unit test / coverage reports",
      "htmlcov/",
      ".tox/",
      ".nox/",
      ".coverage",
      ".coverage.*",
      ".cache",
      "nosetests.xml",
      "coverage.xml",
      "*.cover",
      "*.py,cover",
      ".hypothesis/",
      ".pytest_cache/",
      "cover/",
      "",
      "# Translations",
      "*.mo",
      "*.pot",
      "",
      "# Django stuff:",
      "*.log",
      "local_settings.py",
      "db.sqlite3",
      "db.sqlite3-journal",
      "",
      "# Flask stuff:",
      "instance/",
      ".webassets-cache",
      "",
      "# Scrapy stuff:",
      ".scrapy",
      "",
      "# Sphinx documentation",
      "docs/_build/",
      "",
      "# PyBuilder",
      ".pybuilder/",
      "target/",
      "",
      "# Jupyter Notebook",
      ".ipynb_checkpoints",
      "",
      "# IPython",
      "profile_default/",
      "ipython_config.py",
      "",
      "# PEP 582; used by e.g. github.com/David-OConnor/pyflow",
      "__pypackages__/",
      "",
      "# Celery stuff",
      "celerybeat-schedule",
      "celerybeat.pid",
      "",
      "# SageMath parsed files",
      "*.sage.py",
      "",
      "# Environments",
      ".env",
      ".venv",
      "env/",
      "venv/",
      "ENV/",
      "env.bak/",
      "venv.bak/",
      "",
      "# Spyder project settings",
      ".spyderproject",
      ".spyproject",
      "",
      "# Rope project settings",
      ".ropeproject",
      "",
      "# mkdocs documentation",
      "/site",
      "",
      "# mypy",
      ".mypy_cache/",
      ".dmypy.json",
      "dmypy.json",
      "",
      "# Pyre type checker",
      ".pyre/",
      "",
      "# pytype static type analyzer",
      ".pytype/",
      "",
      "# Cython debug symbols",
      "cython_debug/"
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

function analyzeChoices(...bools: (boolean | undefined)[]): {
  anySelected: any;
  multipleSelected: any;
} {
  let anySelected = false;
  let multipleSelected = false;
  for (const bool of bools) {
    if (anySelected && bool) {
      multipleSelected = true;
    }
    if (bool) {
      anySelected = true;
    }
  }
  return { anySelected, multipleSelected };
}
