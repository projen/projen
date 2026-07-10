import { existsSync, mkdirSync, writeFileSync } from "fs";
import { dirname, posix, resolve } from "path";
import type { InventoryProjectType } from "../inventory";
import { TypescriptConfig, TypescriptConfigExtends } from "../javascript";
import type { TypeScriptProject } from "./typescript";
import { TypeScriptRunner } from "./typescript-runner";
import { renderJavaScriptOptions } from "../javascript/render-options";
import type { InitProject } from "../project";
import { ProjenrcFile } from "../projenrc";

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
   * @deprecated Use `runner: TypeScriptRunner.tsNode({ swc: true })` instead.
   */
  readonly swc?: boolean;

  /**
   * The runner to use for executing TypeScript files.
   *
   * @default - the project's runner
   */
  readonly runner?: TypeScriptRunner;
}

const DEFAULT_FILENAME = ".projenrc.ts";

/**
 * A projenrc file written in TypeScript
 *
 * This component is used within TypeScriptProject.
 */
export class Projenrc extends ProjenrcFile {
  public readonly filePath: string;
  public readonly tsconfig: TypescriptConfig;

  private readonly _projenCodeDir: string;
  private readonly _tsProject: TypeScriptProject;
  private readonly _runner: TypeScriptRunner;

  constructor(project: TypeScriptProject, options: ProjenrcOptions = {}) {
    super(project);
    this._tsProject = project;

    this.filePath = options.filename ?? DEFAULT_FILENAME;
    this._projenCodeDir = options.projenCodeDir ?? "projenrc";

    // Give the projenrc source tree its own `tsconfig.json` so the eslint
    // project service (and editors) resolve it as the nearest config for those
    // files. This avoids listing the whole tree under `allowDefaultProject`,
    // which only permits a small number of loose files (and rejects `**`
    // globs). It extends the root config and is type-check only.
    const baseTsconfig = project.tsconfig ?? project.tsconfigDev;
    this.tsconfig = new TypescriptConfig(project, {
      fileName: `${this._projenCodeDir}/tsconfig.json`,
      include: ["**/*.ts", posix.relative(this._projenCodeDir, this.filePath)],
      extends: TypescriptConfigExtends.fromTypescriptConfigs([baseTsconfig]),
      compilerOptions: {
        noEmit: true,
        rootDir: posix.relative(this._projenCodeDir, ".") || ".",
      },
    });

    // A runner is a future component, make sure it is attached
    this._runner = this.getRunner(options).tryAttach(this._tsProject);

    this.addDefaultTask();
  }

  public projectCreation(initProject: InitProject) {
    this.generateProjenrc(initProject);
  }

  private addDefaultTask() {
    // Render the run config for the entrypoint
    const { dependencies, steps } = this._runner.configFor(this.filePath);

    // Request runner dependencies
    for (const dep of dependencies) {
      this._tsProject.deps.requestDependency(dep);
    }

    // Add runner steps
    this._tsProject.defaultTask?.addSteps(...steps);
  }

  private getRunner(options: ProjenrcOptions): TypeScriptRunner {
    // use a provide runner as is
    if (options.runner) {
      return options.runner;
    }

    // swc implies ts-node runner for backwards compatibility
    if (options.swc) {
      return TypeScriptRunner.tsNode({
        swc: true,
        typeCheck: true,
        tsconfig: this.tsconfig.fileName,
      }).tryAttach(this._tsProject);
    }

    // we use the project's default runner with the correct tsconfig and type-checking enabled
    return this._tsProject.runner.copy({
      tsconfig: this.tsconfig.fileName,
      typeCheck: true,
    });
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

  private generateProjenrc(bootstrap: InitProject) {
    const rcfile = resolve(this.project.outdir, this.filePath);
    if (existsSync(rcfile)) {
      return; // already exists
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
