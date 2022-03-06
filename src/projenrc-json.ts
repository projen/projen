import { existsSync, writeFileSync } from "fs";
import { resolve } from "path";
import { Construct } from "constructs";
import { Component } from "./component";
import { Project } from "./project";

export interface ProjenrcOptions {
  /**
   * The name of the projenrc file.
   * @default ".projenrc.json"
   */
  readonly filename?: string;
}

/**
 * Sets up a project to use JSON for projenrc.
 */
export class Projenrc extends Component {
  private readonly rcfile: string;

  constructor(scope: Construct, options: ProjenrcOptions = {}) {
    super(scope, "Projenrc");

    this.rcfile = options.filename ?? ".projenrc.json";

    // this is the task projen executes when running `projen`
    Project.of(this).defaultTask?.env("FILENAME", this.rcfile);
    Project.of(this).defaultTask?.builtin("run-projenrc-json");

    this.generateProjenrc();
  }

  private generateProjenrc() {
    const rcfile = resolve(Project.of(this).outdir, this.rcfile);
    if (existsSync(rcfile)) {
      return; // already exists
    }

    const bootstrap = Project.of(this).initProject;
    if (!bootstrap) {
      return;
    }

    const json = {
      type: bootstrap.fqn,
      ...bootstrap.args,
    };

    writeFileSync(rcfile, JSON.stringify(json, null, 2));
    Project.of(this).logger.info(
      `Project definition file was created at ${rcfile}`
    );
  }
}
