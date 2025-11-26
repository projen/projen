import { BlackConfiguration, toJson_BlackConfiguration } from "./black-config";
import { HatchConfiguration, toJson_HatchConfiguration } from "./hatch-config";
import { MypyConfiguration, toJson_MypyConfiguration } from "./mypy-config";
import { PackageManagerBase } from "./package-manager";
import { PdmConfiguration, toJson_PdmConfiguration } from "./pdm-config";
import { Poetry } from "./poetry";
import {
  PoetryConfiguration,
  toJson_PoetryConfiguration,
} from "./poetry-config";
import {
  Projenrc as ProjenrcPython,
  ProjenrcOptions as ProjenrcPythonOptions,
} from "./projenrc";
import { PyprojectTomlFile } from "./pyproject-toml-file";
import {
  PyrightConfiguration,
  toJson_PyrightConfiguration,
} from "./pyright-config";
import { Pytest, PytestOptions } from "./pytest";
import {
  PytestConfiguration,
  toJson_PytestConfiguration,
} from "./pytest-config";
import { PytestSample } from "./pytest-sample";
import { IPythonEnv } from "./python-env";
import {
  PythonFormatter,
  PythonLinter,
  PythonPackageManager,
  PythonTypeChecker,
} from "./python-lint";
import { PythonSample } from "./python-sample";
import { Setuptools } from "./setuptools";
import { Uv } from "./uv";
import { Venv, VenvOptions } from "./venv";
import { GitHubProject, GitHubProjectBaseOptions } from "../github";
import {
  Projenrc as ProjenrcJs,
  ProjenrcOptions as ProjenrcJsOptions,
} from "../javascript/projenrc";
import { ProjenrcTs, ProjenrcTsOptions } from "../typescript";
import { anySelected, formatAsPythonModule, multipleSelected } from "../util";
import { Hatch } from "./hatch";
import { Pdm } from "./pdm";
import {
  BuildSystem,
  ProjectAuthor,
  PyprojectTomlProject,
  PyprojectTomlTool,
} from "./pyproject-toml";
import { RuffConfiguration, toJson_RuffConfiguration } from "./ruff-config";
import {
  SetuptoolsConfiguration,
  toJson_SetuptoolsConfiguration,
} from "./setuptools-config";
import { toJson_TyConfiguration, TyConfiguration } from "./ty-config";
import { toJson_UvConfiguration, UvConfiguration } from "./uv-config";

/** Allowed characters in python project names */
const PYTHON_PROJECT_NAME_REGEX = /^[A-Za-z0-9-_\.]+$/;

export interface PythonProjectTool {
  /**
   * The uncompromising Python code formatter.
   */
  readonly black?: BlackConfiguration;

  /**
   * Build Python wheels for all platforms.
   *
   * @schema PyprojectTomlTool#cibuildwheel
   */
  readonly cibuildwheel?: any;

  /**
   * Optional static typing for Python.
   */
  readonly mypy?: MypyConfiguration;

  /**
   * An extremely fast Python linter and formatter, written in Rust.
   */
  readonly ruff?: RuffConfiguration;

  /**
   * An extremely fast Python type checker, written in Rust.
   */
  readonly ty?: TyConfiguration;

  /**
   * Modern, extensible Python project management.
   */
  readonly hatch?: HatchConfiguration;

  /**
   * Build and publish crates with pyo3, cffi and uniffi bindings as well as rust binaries as python packages
   *
   * @schema PyprojectTomlTool#maturin
   */
  readonly maturin?: any;

  /**
   * Improved build system generator for Python C/C++/Fortran extensions
   *
   * @schema PyprojectTomlTool#scikit-build
   */
  readonly scikitBuild?: any;

  /**
   * Easily download, build, install, upgrade, and uninstall Python packages.
   */
  readonly setuptools?: SetuptoolsConfiguration;

  /**
   * Manage Python package versions using SCM (e.g. Git).
   *
   * @schema PyprojectTomlTool#setuptools_scm
   */
  readonly setuptoolsScm?: any;

  /**
   * A task runner that works well with pyproject.toml files.
   *
   * @schema PyprojectTomlTool#poe
   */
  readonly poe?: any;

  /**
   * Python dependency management and packaging made easy.
   */
  readonly poetry?: PoetryConfiguration;

  /**
   * A modern Python package manager with PEP 621 support.
   */
  readonly pdm?: PdmConfiguration;

  /**
   * Static type checker for Python.
   */
  readonly pyright?: PyrightConfiguration;

  /**
   * Standardized automated testing of Python packages
   */
  readonly pytest?: PytestConfiguration;

  /**
   * Review a repository for best practices.
   *
   * @schema PyprojectTomlTool#repo-review
   */
  readonly repoReview?: any;

  /**
   * The complementary task runner for python.
   *
   * @schema PyprojectTomlTool#taskipy
   */
  readonly taskipy?: any;

  /**
   * Tombi is a toolkit for TOML; providing a formatter/linter and language server
   *
   * @schema PyprojectTomlTool#tombi
   */
  readonly tombi?: any;

  /**
   * Standardized automated testing of Python packages
   *
   * @schema PyprojectTomlTool#tox
   */
  readonly tox?: any;

  /**
   * An extremely fast Python package installer and resolver, written in Rust.
   */
  readonly uv?: UvConfiguration;
}

export interface PythonBaseOptions {
  /**
   * Path to the python executable to use.
   * @default "python"
   */
  readonly pythonExec?: string;

  /**
   * Declares any Python level dependencies that must be installed in order to run the project’s build system successfully.
   *
   * @default - no build system
   */
  readonly buildSystem?: BuildSystem;

  /**
   * The formatter to use for the project.
   */
  readonly formatter?: PythonFormatter;

  /**
   * The linter to use for the project.
   */
  readonly linter?: PythonLinter;

  /**
   * The type checker to use for the project.
   */
  readonly typeChecker?: PythonTypeChecker;
}

/**
 * Options for `PythonProject`.
 */
export interface PythonProjectOptions
  extends GitHubProjectBaseOptions,
    PyprojectTomlProject,
    PythonBaseOptions {
  /**
   * Every tool that is used by the project can have users specify configuration data as long as they use a sub-table within `[tool]`. Generally a project can use the subtable `tool.$NAME` if, and only if, they own the entry for `$NAME` in the Cheeseshop/PyPI.
   */
  readonly tool?: PythonProjectTool;

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

  /**
   * The package manager to use for the project.
   * @default PackageManager.UV
   */
  readonly packageManager?: PythonPackageManager;

  /**
   * Use venv to manage a virtual environment for installing dependencies inside.
   *
   * @default - true when using setuptools
   * @featured
   */
  readonly venv?: boolean;

  /**
   * Venv options
   * @default - defaults
   */
  readonly venvOptions?: VenvOptions;

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
   * Location of sample tests.
   * Typically the same directory where project tests will be located.
   * @default "tests"
   */
  readonly sampleTestdir?: string;

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

  /**
   * Use projenrc in TypeScript.
   *
   * This will create a tsconfig file (default: `tsconfig.projen.json`)
   * and use `ts-node` in the default task to parse the project source files.
   *
   * @default false
   */
  readonly projenrcTs?: boolean;

  /**
   * Options related to projenrc in TypeScript.
   * @default - default options
   */
  readonly projenrcTsOptions?: ProjenrcTsOptions;
}

/**
 * Python project.
 *
 * @pjid python
 */
export class PythonProject extends GitHubProject {
  /**
   * pyproject.toml file
   */
  public readonly file!: PyprojectTomlFile;

  /**
   * API for managing the Python runtime environment.
   */
  public readonly envManager!: IPythonEnv;

  /**
   * API for managing packaging the project as a library. Only applies when the `projectType` is LIB.
   */
  public readonly packagingManager!: PackageManagerBase;

  /**
   * Pytest component.
   */
  public pytest?: Pytest;

  /**
   * Directory where sample tests are located.
   * @default "tests"
   */
  public readonly sampleTestdir: string;

  private readonly poetryOptions?: PoetryConfiguration;

  public readonly projectOptions: PyprojectTomlProject;
  public readonly moduleName: string;

  constructor(options: PythonProjectOptions) {
    const readme = options.readme ?? "README.md";
    super({ ...options, readme: { filename: readme } });

    const projectName = options.name ?? this.name;
    this.moduleName = formatAsPythonModule(projectName);

    if (!PYTHON_PROJECT_NAME_REGEX.test(options.name)) {
      throw new Error(
        "Python projects must only consist of alphanumeric characters, hyphens, and underscores."
      );
    }

    this.sampleTestdir = options.sampleTestdir ?? "tests";

    const rcFileTypeOptions = [
      options.projenrcPython,
      options.projenrcJs,
      options.projenrcJson,
      options.projenrcTs,
    ];

    if (multipleSelected(rcFileTypeOptions)) {
      throw new Error(
        "Only one of projenrcPython, projenrcJs, projenrcTs, and projenrcJson can be selected."
      );
    }

    const packageManagerName =
      options.packageManager ?? PythonPackageManager.UV;

    // Assume venv if using setuptools
    const supportsVenv = PythonPackageManager.SETUPTOOLS;
    const canUseVenv = packageManagerName === supportsVenv;
    const venv = options.venv ?? canUseVenv;

    if (venv && !canUseVenv) {
      throw new Error(`\`venv\` can only be used with ${supportsVenv}`);
    }

    if (!this.parent) {
      // default to projenrc.py if no other projenrc type was elected
      if (options.projenrcPython ?? !anySelected(rcFileTypeOptions)) {
        new ProjenrcPython(this, {
          pythonExec: options.pythonExec,
          ...options.projenrcPythonOptions,
        });
      }

      if (options.projenrcJs ?? false) {
        new ProjenrcJs(this, options.projenrcJsOptions);
      }

      if (options.projenrcTs ?? false) {
        new ProjenrcTs(this, options.projenrcTsOptions);
      }
    }

    this.projectOptions = {
      name: projectName,
      version: options.version,
      description: options.description,
      readme: readme,
      requiresPython: options.requiresPython ?? ">=3.12,<4.0",
      license: options.license,
      licenseFiles: options.licenseFiles,
      authors: options.authors,
      maintainers: options.maintainers,
      keywords: options.keywords,
      classifiers: options.classifiers,
      urls: options.urls,
      scripts: options.scripts,
      guiScripts: options.guiScripts,
      entryPoints: options.entryPoints,
      dependencies: options.dependencies,
      optionalDependencies: options.optionalDependencies,
      importNames: options.importNames,
      importNamespaces: options.importNamespaces,
      dynamic: options.dynamic,
    };
    const packageManagerOptions: PythonBaseOptions = {
      buildSystem: options.buildSystem,
      pythonExec: options.pythonExec,
      formatter: options.formatter,
      linter: options.linter,
      typeChecker: options.typeChecker,
    };

    if (packageManagerName === PythonPackageManager.SETUPTOOLS) {
      this.packagingManager = new Setuptools(this, packageManagerOptions);
    } else if (options.tool?.setuptools) {
      throw new Error(
        `\`tool.setuptools\` only applies when using ${PythonPackageManager.SETUPTOOLS}.`
      );
    }

    if (packageManagerName === PythonPackageManager.UV) {
      this.packagingManager = new Uv(this, packageManagerOptions);
    } else if (options.tool?.uv) {
      throw new Error(
        `\`tool.uv\` only applies when using ${PythonPackageManager.UV}.`
      );
    }

    if (packageManagerName === PythonPackageManager.POETRY) {
      // Pull out poetry options that are redundant with project options
      const {
        name: poetryName,
        version: poetryVersion,
        description: poetryDescription,
        keywords: poetryKeywords,
        license: poetryLicense,
        readme: poetryReadme,
        classifiers: poetryClassifiers,
        urls: poetryUrls,
        authors: poetryAuthors,
        maintainers: poetryMaintainers,
        ...poetryOptions
      } = options.tool?.poetry || {};

      this.poetryOptions = poetryOptions;

      const {
        name: projectOptionsName,
        version: projectOptionsVersion,
        description: projectOptionsDescription,
        keywords: projectOptionsKeywords,
        license: projectOptionsLicense,
        readme: projectOptionsReadmeo,
        classifiers: projectOptionsClassifiers,
        urls: projectOptionsUrls,
        authors: projectOptionsAuthors,
        maintainers: projectOptionsMaintainers,
        ...remainingProjectOptions
      } = this.projectOptions;

      this.projectOptions = {
        name: projectOptionsName ?? poetryName,
        version: projectOptionsVersion ?? poetryVersion,
        description: projectOptionsDescription ?? poetryDescription,
        keywords: projectOptionsKeywords ?? poetryKeywords,
        license: projectOptionsLicense ?? poetryLicense,
        readme: projectOptionsReadmeo ?? poetryReadme,
        classifiers: projectOptionsClassifiers ?? poetryClassifiers,
        urls: projectOptionsUrls ?? poetryUrls,
        authors: projectOptionsAuthors ?? this.toProjectAuthor(poetryAuthors),
        maintainers:
          projectOptionsMaintainers ?? this.toProjectAuthor(poetryMaintainers),
        ...remainingProjectOptions,
      };

      this.packagingManager = new Poetry(this, packageManagerOptions);
    } else if (options.tool?.poetry) {
      throw new Error(
        `\`tool.poetry\` only applies when using ${PythonPackageManager.POETRY}.`
      );
    } else {
      this.poetryOptions = undefined;
    }

    if (packageManagerName === PythonPackageManager.HATCH) {
      this.packagingManager = new Hatch(this, packageManagerOptions);
    } else if (options.tool?.hatch) {
      throw new Error(
        `\`tool.hatch\` only applies when using ${PythonPackageManager.HATCH}.`
      );
    }

    if (packageManagerName === PythonPackageManager.PDM) {
      this.packagingManager = new Pdm(this, packageManagerOptions);
    } else if (options.tool?.pdm) {
      throw new Error(
        `\`tool.pdm\` only applies when using ${PythonPackageManager.PDM}.`
      );
    }

    if (venv) {
      this.envManager = new Venv(this, {
        pythonExec: options.pythonExec,
        ...options.venvOptions,
      });
    } else {
      this.envManager = this.packagingManager;
    }

    this.file = new PyprojectTomlFile(this, {
      project: {
        ...this.projectOptions,
        dependencies: (() => this.packagingManager.synthDependencies()) as any,
      },
      dependencyGroups: (() =>
        this.packagingManager.synthDependencyGroups()) as any,
      buildSystem:
        packageManagerOptions.buildSystem ??
        this.packagingManager.defaultBuildSystem,
      tool: (() => this.synthTools(options)) as any,
    });

    if (options.pytest ?? true) {
      this.pytest = new Pytest(this, options.pytestOptions);
      if (options.sample ?? true) {
        new PytestSample(this, {
          moduleName: this.moduleName,
          testdir: this.sampleTestdir,
        });
      }
    }

    if (options.sample ?? true) {
      new PythonSample(this, {
        dir: this.moduleName,
      });
    }

    for (const dep of options.dependencies ?? []) {
      this.addDependency(dep);
    }

    for (const dep of options.devDeps ?? []) {
      this.addDevDependency(dep);
    }

    this.addDefaultGitIgnore();
  }

  /**
   * Converts string email format to ProjectAuthor.
   */
  private toProjectAuthor(
    authors: string[] | undefined
  ): ProjectAuthor[] | undefined {
    if (authors) {
      return authors.flatMap((author) => {
        const match = author.match(/^(.+?)\s*<(.+?)>$/);
        if (!match) {
          throw new Error(
            `Expected author to match format \`Name <email>\` but got ${author}`
          );
        }

        const [, rawName, rawEmail] = match;

        return { name: rawName.trim(), email: rawEmail.trim() };
      });
    }

    return undefined;
  }

  /**
   * Adds default gitignore options for a Python project based on
   * https://github.com/github/gitignore/blob/master/Python.gitignore
   */
  private addDefaultGitIgnore() {
    this.gitignore.exclude(
      "# Byte-compiled / optimized / DLL files",
      "__pycache__/",
      "*.py[codz]",
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
      "# pdm",
      ".pdm-python",
      ".pdm-build/",
      "",
      "# pixi",
      ".pixi",
      "",
      "# PEP 582; used by e.g. github.com/David-OConnor/pyflow",
      "__pypackages__/",
      "",
      "# Celery stuff",
      "celerybeat-schedule",
      "celerybeat.pid",
      "",
      "# Redis",
      "*.rdb",
      "*.aof",
      "*.pid",
      "",
      "# RabbitMQ",
      "mnesia/",
      "rabbitmq/",
      "rabbitmq-data/",
      "",
      "# ActiveMQ",
      "activemq-data/",
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
      "cython_debug/",
      "",
      "# Abstra",
      ".abstra/",
      "",
      "# Ruff stuff:",
      ".ruff_cache/",
      "",
      "# Pypi configuration file",
      ".pypirc",
      "",
      "# Marimo",
      "marimo/_static/",
      "marimo/_lsp/",
      "__marimo__/",
      "",
      "# Streamlit",
      ".streamlit/secrets.toml"
    );
  }

  private synthTools(options: PythonProjectOptions): PyprojectTomlTool {
    return {
      black: toJson_BlackConfiguration(options.tool?.black),
      mypy: toJson_MypyConfiguration(options.tool?.mypy),
      ruff: toJson_RuffConfiguration(options.tool?.ruff),
      ty: toJson_TyConfiguration(options.tool?.ty),
      hatch: toJson_HatchConfiguration(options.tool?.hatch),
      setuptools: toJson_SetuptoolsConfiguration(options.tool?.setuptools),
      poetry: toJson_PoetryConfiguration(this.poetryOptions ?? undefined),
      pdm: toJson_PdmConfiguration(options.tool?.pdm),
      pyright: toJson_PyrightConfiguration(options.tool?.pyright),
      pytest: toJson_PytestConfiguration(options.tool?.pytest),
      uv: toJson_UvConfiguration(options.tool?.uv),
    };
  }

  /**
   * Adds a runtime dependency.
   *
   * @param spec Format `<module>@<semver>`
   */
  public addDependency(spec: string) {
    return this.packagingManager.addDependency(spec);
  }

  /**
   * Adds a dev dependency.
   *
   * @param spec Format `<module>@<semver>`
   */
  public addDevDependency(spec: string) {
    return this.packagingManager.addDevDependency(spec);
  }

  public postSynthesize() {
    super.postSynthesize();

    this.envManager.setupEnvironment();
    this.packagingManager.installDependencies();
  }
}
