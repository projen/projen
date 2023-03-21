import { existsSync, mkdirSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { Eslint } from "./eslint";
import { renderJavaScriptOptions } from "./render-options";
import { Project } from "../project";
import { ProjenrcFile } from "../projenrc";

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
export class Projenrc extends ProjenrcFile {
  public readonly filePath: string;

  constructor(project: Project, options: ProjenrcOptions = {}) {
    super(project);

    this.filePath = options.filename ?? ".projenrc.js";

    // this is the task projen executes when running `projen`
    project.defaultTask?.exec(`node ${this.filePath}`);

    this.generateProjenrc();
  }

  public preSynthesize(): void {
    const eslint = Eslint.of(this.project);
    eslint?.addLintPattern(this.filePath);
    eslint?.addIgnorePattern(`!${this.filePath}`);
    eslint?.addOverride({
      files: [this.filePath],
      rules: {
        "@typescript-eslint/no-require-imports": "off",
        "import/no-extraneous-dependencies": "off",
      },
    });
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

    mkdirSync(dirname(rcfile), { recursive: true });
    writeFileSync(rcfile, lines.join("\n"));
    this.project.logger.info(
      `Project definition file was created at ${rcfile}`
    );
  }
}
