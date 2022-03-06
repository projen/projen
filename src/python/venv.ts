import * as path from "path";
import * as fs from "fs-extra";
import { Component } from "../component";
import { Project } from "../project";
import { exec } from "../util";
import { IPythonEnv } from "./python-env";
import { PythonProject } from "./python-project";

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
}

/**
 * Manages a virtual environment through the Python venv module.
 */
export class Venv extends Component implements IPythonEnv {
  /**
   * Name of directory to store the environment in
   */
  private readonly envdir: string;

  constructor(project: PythonProject, options: VenvOptions = {}) {
    super(project, "Venv");

    this.envdir = options.envdir ?? ".env";

    Project.of(this).addGitIgnore(`/${this.envdir}`);
    Project.of(this).tasks.addEnvironment(
      "VIRTUAL_ENV",
      `$(echo $PWD/${this.envdir})`
    );
    Project.of(this).tasks.addEnvironment(
      "PATH",
      `$(echo $PWD/${this.envdir}/bin:$PATH)`
    );
  }

  /**
   * Initializes the virtual environment if it doesn't exist (called during post-synthesis).
   */
  public setupEnvironment() {
    const absoluteEnvdir = path.join(Project.of(this).outdir, this.envdir);
    if (!fs.pathExistsSync(absoluteEnvdir)) {
      Project.of(this).logger.info("Setting up a virtual environment...");
      exec(`python -m venv ${this.envdir}`, { cwd: Project.of(this).outdir });
      Project.of(this).logger.info(
        `Environment successfully created (located in ./${this.envdir}).`
      );
    }
  }
}
