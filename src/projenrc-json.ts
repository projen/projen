import { existsSync, mkdirSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { Project } from "./project";
import { ProjenrcFile } from "./projenrc";

export interface ProjenrcJsonOptions {
  /**
   * The name of the projenrc file.
   * @default ".projenrc.json"
   */
  readonly filename?: string;
}

/**
 * Sets up a project to use JSON for projenrc.
 */
export class ProjenrcJson extends ProjenrcFile {
  public readonly filePath: string;

  constructor(project: Project, options: ProjenrcJsonOptions = {}) {
    super(project);

    this.filePath = options.filename ?? ".projenrc.json";

    // this is the task projen executes when running `projen`
    project.defaultTask?.env("FILENAME", this.filePath);
    project.defaultTask?.builtin("run-projenrc-json");

    this.generateProjenrc();
  }

  private generateProjenrc() {
    const rcfile = resolve(this.project.outdir, this.filePath);
    if (existsSync(rcfile)) {
      return; // already exists
    }

    const bootstrap = this.project.initProject;
    if (!bootstrap) {
      return;
    }

    const json = {
      type: bootstrap.fqn,
      ...bootstrap.args,
    };

    mkdirSync(dirname(rcfile), { recursive: true });
    writeFileSync(rcfile, JSON.stringify(json, null, 2));
    this.project.logger.info(
      `Project definition file was created at ${rcfile}`
    );
  }
}

/**
 * @deprecated use `ProjenrcJsonOptions`
 */
export interface ProjenrcOptions extends ProjenrcJsonOptions {}

/**
 * @deprecated use `ProjenrcJson`
 */
export class Projenrc extends ProjenrcJson {}
