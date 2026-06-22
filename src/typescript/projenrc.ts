import { existsSync, writeFileSync, mkdirSync } from "fs";
import { dirname, posix, resolve } from "path";
import type { InventoryProjectType } from "../inventory";
import { TypescriptConfig, TypescriptConfigExtends } from "../javascript";
import { renderJavaScriptOptions } from "../javascript/render-options";
import { ProjenrcFile } from "../projenrc";
import type { TypeScriptProject } from "../typescript";

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
  public readonly tsconfig: TypescriptConfig;

  private readonly _projenCodeDir: string;
  private readonly _tsProject: TypeScriptProject;
  private readonly _swc: boolean;

  constructor(project: TypeScriptProject, options: ProjenrcOptions = {}) {
    super(project);
    this._tsProject = project;

    this.filePath = options.filename ?? DEFAULT_FILENAME;
    this._projenCodeDir = options.projenCodeDir ?? "projenrc";
    this._swc = options.swc ?? false;

    // Give the projenrc source tree its own `tsconfig.json` so the eslint
    // project service (and editors) resolve it as the nearest config for those
    // files. This avoids listing the whole tree under `allowDefaultProject`,
    // which only permits a small number of loose files (and rejects `**`
    // globs). It extends the root config and is type-check only.
    const baseTsconfig = project.tsconfig ?? project.tsconfigDev;
    this.tsconfig = new TypescriptConfig(project, {
      fileName: `${this._projenCodeDir}/tsconfig.json`,
      include: ["**/*.ts"],
      extends: TypescriptConfigExtends.fromTypescriptConfigs([baseTsconfig]),
      compilerOptions: {
        noEmit: true,
        rootDir: posix.relative(this._projenCodeDir, ".") || ".",
      },
    });

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

    // ts-node compiles the entrypoint and its imports on demand using the dev
    // tsconfig's compiler options, so projen source files may reside anywhere
    // in the project tree regardless of the config's `include`.
    this._tsProject.defaultTask?.exec(
      `${tsNode} --project ${this._tsProject.tsconfigDev.fileName} ${this.filePath}`,
    );
  }

  public override preSynthesize(): void {
    super.preSynthesize();

    this._tsProject.addPackageIgnore(`/${this.filePath}`);
    this._tsProject.addPackageIgnore(`/${this._projenCodeDir}`);

    // The projenrc entrypoint lives at the repository root and is not covered
    // by any `tsconfig.json`. Register only this single file with the eslint
    // project service's default project (the projenrc source tree is covered
    // by its own tsconfig). `allowDefaultProject` does not permit `**` globs.
    this._tsProject.eslint?.allowDefaultProjectFiles(this.filePath);

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
      type: bootstrap.type as InventoryProjectType,
      comments: bootstrap.comments,
    });

    imports.add(moduleName, importName);

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
