import { Task } from "../task";

export enum PythonPackageManager {
  /**
   * Use hatch to manage your project dependencies, virtual environment, and
   * (optional) packaging/publishing.
   *
   * This feature is incompatible with venv.
   */
  HATCH = "hatch",

  /**
   * Use pdm to manage your project dependencies, virtual environment, and
   * (optional) packaging/publishing.
   *
   * This feature is incompatible with venv.
   */
  PDM = "pdm",

  /**
   * Use setuptools to manage your project dependencies, virtual environment, and
   * (optional) packaging/publishing.
   */
  SETUPTOOLS = "setuptools",

  /**
   * Use poetry to manage your project dependencies, virtual environment, and
   * (optional) packaging/publishing.
   *
   * This feature is incompatible with venv.
   */
  POETRY = "poetry",

  /**
   * Use uv to manage your project dependencies, virtual environment, and
   * (optional) packaging/publishing.
   *
   * This feature is incompatible with venv.
   */
  UV = "uv",
}

export enum PythonFormatter {
  /**
   * The uncompromising Python code formatter.
   */
  BLACK = "black",

  /**
   * An extremely fast Python formatter, written in Rust.
   */
  RUFF = "ruff",
}

export enum PythonLinter {
  /**
   * An extremely fast Python linter, written in Rust.
   */
  RUFF = "ruff",
}

export enum PythonTypeChecker {
  /**
   * Optional static typing for Python.
   */
  MYPY = "mypy",

  /**
   * An extremely fast Python type checker, written in Rust.
   */
  TY = "ty",

  /**
   * Static type checker for Python.
   */
  PYRIGHT = "pyright",
}

export interface IPythonLinting {
  /**
   * A task that runs formatting
   */
  readonly formatTask?: Task;

  /**
   * A task that runs linting
   */
  readonly lintTask?: Task;

  /**
   * A task that runs static type checking
   */
  readonly typeCheckTask?: Task;
}
