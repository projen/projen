import * as path from "path";
import { Construct } from "constructs";
import * as fs from "fs-extra";
import { Component } from "../component";
import { Project } from "../project";
import { exec } from "../util";
import { IPythonEnv } from "./python-env";

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

  constructor(scope: Construct, options: VenvOptions = {}) {
    super(scope, "Venv");

    this.envdir = options.envdir ?? ".env";

    const project = Project.ofProject(this);

    project.addGitIgnore(`/${this.envdir}`);
    project.tasks.addEnvironment("VIRTUAL_ENV", `$(echo $PWD/${this.envdir})`);
    project.tasks.addEnvironment(
      "PATH",
      `$(echo $PWD/${this.envdir}/bin:$PATH)`
    );
  }

  /**
   * Initializes the virtual environment if it doesn't exist (called during post-synthesis).
   */
  public setupEnvironment() {
    const project = Project.ofProject(this);
    const absoluteEnvdir = path.join(project.outdir, this.envdir);
    if (!fs.pathExistsSync(absoluteEnvdir)) {
      project.logger.info("Setting up a virtual environment...");
      exec(`python -m venv ${this.envdir}`, {
        cwd: project.outdir,
      });
      project.logger.info(
        `Environment successfully created (located in ./${this.envdir}).`
      );
    }
  }
}
