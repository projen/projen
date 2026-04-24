import { existsSync, mkdirSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import * as YAML from "yaml";
import type { Project } from "./project";
import { ProjenrcFile } from "./projenrc";

export interface ProjenrcYamlOptions {
  /**
   * The name of the projenrc file.
   * @default ".projenrc.yaml"
   */
  readonly filename?: string;
}

/**
 * Sets up a project to use YAML for projenrc.
 */
export class ProjenrcYaml extends ProjenrcFile {
  public readonly filePath: string;

  constructor(project: Project, options: ProjenrcYamlOptions = {}) {
    super(project);

    this.filePath = options.filename ?? ".projenrc.yaml";

    // this is the task projen executes when running `projen`
    project.defaultTask?.env("FILENAME", this.filePath);
    project.defaultTask?.builtin("run-projenrc-yaml");

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

    const obj = {
      type: bootstrap.fqn,
      ...bootstrap.args,
    };

    mkdirSync(dirname(rcfile), { recursive: true });
    writeFileSync(rcfile, YAML.stringify(obj, { indent: 2 }));
    this.project.logger.info(
      `Project definition file was created at ${rcfile}`,
    );
  }
}
