import { existsSync, writeFileSync, mkdirSync } from "fs";
import { dirname, resolve } from "path";
import { renderJavaScriptOptions } from "../javascript/render-options";
import { ProjenrcFile } from "../projenrc";
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

  /**
   * Whether to use `SWC` for ts-node.
   *
   * @default false
   */
  readonly swc?: boolean;
}

const DEFAULT_FILENAME = ".projenrc.ts";

/**
 * Sets up a typescript project to use TypeScript for projenrc.
 */
export class Projenrc extends ProjenrcFile {
  public readonly filePath: string;
  private readonly _projenCodeDir: string;
  private readonly _tsProject: TypeScriptProject;
  private readonly _swc: boolean;

  constructor(project: TypeScriptProject, options: ProjenrcOptions = {}) {
    super(project);
    this._tsProject = project;

    this.filePath = options.filename ?? DEFAULT_FILENAME;
    this._projenCodeDir = options.projenCodeDir ?? "projenrc";
    this._swc = options.swc ?? false;

    this.addDefaultTask();

    this.generateProjenrc();
  }

  private addDefaultTask() {
    const deps = ["ts-node"];
    if (this._swc) {
      deps.push("@swc/core");
    }

    // this is the task projen executes when running `projen` without a
    // specific task (if this task is not defined, projen falls back to
    // running "node .projenrc.js").
    this._tsProject.addDevDeps(...deps);

    const tsNode = this._swc ? "ts-node --swc" : "ts-node";

    // we use "tsconfig.dev.json" here to allow projen source files to reside
    // anywhere in the project tree.
    this._tsProject.defaultTask?.exec(
      `${tsNode} --project ${this._tsProject.tsconfigDev.fileName} ${this.filePath}`,
    );
  }

  public override preSynthesize(): void {
    super.preSynthesize();

    this._tsProject.addPackageIgnore(`/${this.filePath}`);
    this._tsProject.addPackageIgnore(`/${this._projenCodeDir}`);

    this._tsProject.tsconfigDev.addInclude(this.filePath);
    this._tsProject.tsconfigDev.addInclude(`${this._projenCodeDir}/**/*.ts`);

    this._tsProject.eslint?.addLintPattern(this._projenCodeDir);
    this._tsProject.eslint?.addLintPattern(this.filePath);
    this._tsProject.eslint?.allowDevDeps(this.filePath);
    this._tsProject.eslint?.allowDevDeps(`${this._projenCodeDir}/**/*.ts`);
    this._tsProject.eslint?.addIgnorePattern(`!${this.filePath}`);
    this._tsProject.eslint?.addIgnorePattern(`!${this._projenCodeDir}/**/*.ts`);

    this._tsProject.eslint?.addOverride({
      files: [this.filePath],
      rules: {
        "@typescript-eslint/no-require-imports": "off",
        "import/no-extraneous-dependencies": "off",
      },
    });

    this._tsProject.biome?.addFilePattern(this.filePath);
    this._tsProject.biome?.addFilePattern(`${this._projenCodeDir}/**`);

    this._tsProject.jest?.discoverTestMatchPatternsForDirs(
      [this._projenCodeDir],
      {
        fileExtensionPattern: this._tsProject.tsconfig?.compilerOptions?.allowJs
          ? undefined
          : "ts?(x)",
      },
    );
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
      args: bootstrap.args,
      type: bootstrap.type,
      comments: bootstrap.comments,
    });

    imports.from(moduleName, importName);

    const lines = new Array<string>();
    lines.push(...imports.asEsmImports());
    lines.push();
    lines.push(`const project = new ${className}(${renderedOptions});`);
    lines.push();
    lines.push("project.synth();");

    mkdirSync(dirname(rcfile), { recursive: true });
    writeFileSync(rcfile, lines.join("\n"));
    this.project.logger.info(
      `Project definition file was created at ${rcfile}`,
    );
  }
}
