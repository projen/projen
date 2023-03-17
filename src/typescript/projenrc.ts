import { resolve } from "path";
import { existsSync, outputFileSync } from "fs-extra";
import { Component } from "../component";
import { Eslint, TypescriptConfig } from "../javascript";
import { renderJavaScriptOptions } from "../javascript/render-options";
import { Project } from "../project";
import { TypeScriptProject } from "../typescript";

export interface ProjenrcOptions {
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
 * Sets up a project to use TypeScript for projenrc.
 *
 * If the project is TypeScript-based, entries will
 * be added to the tsconfig and eslint configurations.
 *
 * If the project is not TypeScript-based, npx will
 * be used to invoke `ts-node` and a `tsconfig.projen.json`
 * will be generated dynamically to support compiling of
 * projen configuration files.
 */
export class Projenrc extends Component {
  /**
   * TypeScript configuration file
   * used to compile projen configuration
   * (`tsconfig.projen.json`)
   *
   * NOTE: Only exists if the component was
   * instantiated in a non-TypeScript project.
   */
  public readonly tsconfig?: TypescriptConfig;

  private readonly rcfile: string;
  private readonly _projenCodeDir: string;
  private readonly _tsconfig: TypescriptConfig;
  private readonly _eslint?: Eslint;

  constructor(project: Project, options: ProjenrcOptions = {}) {
    super(project);

    this.rcfile = options.filename ?? ".projenrc.ts";
    this._projenCodeDir = options.projenCodeDir ?? "projenrc";

    if (project instanceof TypeScriptProject) {
      this._tsconfig = project.tsconfigDev;
      this._eslint = project.eslint;

      // this is the task projen executes when running `projen` without a
      // specific task (if this task is not defined, projen falls back to
      // running "node .projenrc.js").
      project.addDevDeps("ts-node");

      // we use "tsconfig.dev.json" here to allow projen source files to reside
      // anywhere in the project tree.
      project.defaultTask?.exec(
        `ts-node --project ${project.tsconfigDev.fileName} ${this.rcfile}`
      );
    } else {
      if (this.project.initProject) {
        this.project.logger.debug(
          `User requested ${this.rcfile} in a non-Typescript project. Creating tsconfig file...`
        );
      }
      // Create a dedicated tsconfig for projen files
      this._tsconfig = new TypescriptConfig(project, {
        fileName: "tsconfig.projen.json",
        compilerOptions: {},
      });
      this.tsconfig = this._tsconfig;
      // Use npx since project deps manager is not JS-based
      project.defaultTask?.exec(
        `npx -y ts-node --project ${this._tsconfig.fileName} ${this.rcfile}`
      );
    }

    this.generateProjenrc();
  }

  public preSynthesize(): void {
    this._tsconfig.addInclude(this.rcfile);
    this._tsconfig.addInclude(`${this._projenCodeDir}/**/*.ts`);

    this._eslint?.addLintPattern(this._projenCodeDir);
    this._eslint?.addLintPattern(this.rcfile);
    this._eslint?.allowDevDeps(this.rcfile);
    this._eslint?.allowDevDeps(`${this._projenCodeDir}/**/*.ts`);
    this._eslint?.addIgnorePattern(`!${this.rcfile}`);
    this._eslint?.addIgnorePattern(`!${this._projenCodeDir}/**/*.ts`);

    this._eslint?.addOverride({
      files: [this.rcfile],
      rules: {
        "@typescript-eslint/no-require-imports": "off",
        "import/no-extraneous-dependencies": "off",
      },
    });
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
