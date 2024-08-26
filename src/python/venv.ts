import * as fs from "fs";
import * as path from "path";
import { IPythonEnv } from "./python-env";
import { Component } from "../component";
import { Project } from "../project";
import { exec } from "../util";

/**
 * Options for venv.
 */
export interface VenvOptions {
  /**
   * Name of directory to store the environment in
   *
   * @default ".env"
   */
  readonly envdir?: string;

  /**
   * Path to the python executable to use.
   * @default "python"
   */
  readonly pythonExec?: string;
}

/**
 * Manages a virtual environment through the Python venv module.
 */
export class Venv extends Component implements IPythonEnv {
  /**
   * Name of directory to store the environment in
   */
  private readonly envdir: string;

  /**
   * Path to the python executable to use.
   */
  private readonly pythonExec: string;

  constructor(project: Project, options: VenvOptions = {}) {
    super(project);

    this.envdir = options.envdir ?? ".env";
    this.pythonExec = options.pythonExec ?? "python";

    this.project.addGitIgnore(`/${this.envdir}`);

    const isWindows = process.platform === "win32";
    const pythonDir = isWindows ? "Scripts" : "bin";

    // In Windows CMD the PATH double quote needs to be escaped with another double quotes.
    const pathQuote = isWindows ? '""' : '\\"';

    // For example: /my/path/.env
    const envdirPathExpression = `{os.getcwd()}/${this.envdir}`;

    // For example: /my/path/.env/bin
    const pythonDirExpression = `${envdirPathExpression}/${pythonDir}`;

    // For example: /my/path/.env/bin:{os.environ["PATH"]}
    const pathExpression = `${pythonDirExpression}${path.delimiter}{os.environ[${pathQuote}PATH${pathQuote}]}`;

    // VIRTUAL_ENV is set to the path of the virtual environment, which is what venv does when a virtual environment is activated.
    this.project.tasks.addEnvironment(
      "VIRTUAL_ENV",
      `$(python -c "import os; print(f'${envdirPathExpression}')")`
    );

    // The python executable needs to be first in the PATH environment variable to make calls to the local scoped python instead of the system python.
    this.project.tasks.addEnvironment(
      "PATH",
      `$(python -c "import os; print(f'${pathExpression}')")`
    );
  }

  /**
   * Initializes the virtual environment if it doesn't exist (called during post-synthesis).
   */
  public setupEnvironment() {
    const absoluteEnvdir = path.join(this.project.outdir, this.envdir);
    if (!fs.existsSync(absoluteEnvdir)) {
      this.project.logger.info("Setting up a virtual environment...");
      exec(`${this.pythonExec} -m venv ${this.envdir}`, {
        cwd: this.project.outdir,
      });
      this.project.logger.info(
        `Environment successfully created (located in ./${this.envdir}).`
      );
    }
  }
}
