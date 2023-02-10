import { resolve } from "path";
import { existsSync, outputFileSync } from "fs-extra";
import { renderJavaScriptOptions } from "./render-options";
import { Component } from "../component";
import { Project } from "../project";
export interface ProjenrcOptions {
  /**
   * The name of the projenrc file.
   * @default ".projenrc.js"
   */
  readonly filename?: string;
}

/**
 * Sets up a javascript project to use TypeScript for projenrc.
 */
export class Projenrc extends Component {
  private readonly rcfile: string;

  constructor(project: Project, options: ProjenrcOptions = {}) {
    super(project);

    this.rcfile = options.filename ?? ".projenrc.js";

    // this is the task projen executes when running `projen`
    project.defaultTask?.exec(`node ${this.rcfile}`);

    this.generateProjenrc();
  }

  private generateProjenrc() {
    const rcfile = resolve(this.project.outdir, this.rcfile);
    if (existsSync(rcfile)) {
      return; // already exists
    }

    const bootstrap = this.project.initProject;
    if (!bootstrap) {
      return;
    }

    const parts = bootstrap.fqn.split(".");
    const moduleName = parts[0];
    const importName = parts[1];
    const className = parts.slice(1).join(".");

    const { renderedOptions, imports } = renderJavaScriptOptions({
      comments: bootstrap.comments,
      args: bootstrap.args,
      type: bootstrap.type,
    });

    imports.add(moduleName, importName);

    const lines = new Array<string>();
    lines.push(...imports.asCjsRequire());
    lines.push();
    lines.push(`const project = new ${className}(${renderedOptions});`);
    lines.push();
    lines.push("project.synth();");

    outputFileSync(rcfile, lines.join("\n"));
    this.project.logger.info(
      `Project definition file was created at ${rcfile}`
    );
  }
}
