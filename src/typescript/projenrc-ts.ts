import { resolve } from "path";
import { existsSync, outputFileSync } from "fs-extra";
import { Component } from "../component";
import { TypescriptConfig } from "../javascript";
import { renderJavaScriptOptions } from "../javascript/render-options";
import { Project } from "../project";

export interface ProjenrcTsOptions {
  /**
   * The name of the projenrc file.
   * @default ".projenrc.ts"
   */
  readonly filename?: string;

  /**
   * A directory tree that may contain *.ts files that can be referenced from
   * your projenrc typescript file.
   *
   * @default "projenrc"
   */
  readonly projenCodeDir?: string;
}

/**
 * A projenrc file written in TypeScript
 *
 * This component can be instantiated in any type of project
 * and has no expectations around the project's main language.
 *
 * Requires that `npx` is available.
 */
export class ProjenrcTs extends Component {
  /**
   * TypeScript configuration file used to compile projen source files
   */
  public readonly tsconfig: TypescriptConfig;

  private readonly rcfile: string;
  private readonly _projenCodeDir: string;
  private readonly tsconfigFileName = "tsconfig.projen.json";

  constructor(project: Project, options: ProjenrcTsOptions = {}) {
    super(project);

    this.rcfile = options.filename ?? ".projenrc.ts";
    this._projenCodeDir = options.projenCodeDir ?? "projenrc";

    // Create a dedicated tsconfig for projen source files
    this.tsconfig = new TypescriptConfig(project, {
      fileName: this.tsconfigFileName,
      compilerOptions: {},
    });

    // Use npx since project's deps manager is not guaranteed to be JS-based
    project.defaultTask?.exec(
      `npx -y ts-node --project ${this.tsconfig.fileName} ${this.rcfile}`
    );

    this.generateProjenrc();
  }

  public preSynthesize(): void {
    this.tsconfig.addInclude(this.rcfile);
    this.tsconfig.addInclude(`${this._projenCodeDir}/**/*.ts`);
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
      args: bootstrap.args,
      type: bootstrap.type,
      comments: bootstrap.comments,
    });

    imports.add(moduleName, importName);

    const lines = new Array<string>();
    lines.push(...imports.asEsmImports());
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
