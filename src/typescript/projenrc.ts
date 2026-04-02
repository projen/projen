import { existsSync, mkdirSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { renderJavaScriptOptions } from "../javascript/render-options";
import { ProjenrcFile } from "../projenrc";
import type { TypeScriptProject } from "./typescript";
import { TypeScriptRunner } from "./typescript-runner";

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
  private readonly _projenCodeDir: string;
  private readonly _tsProject: TypeScriptProject;

  constructor(project: TypeScriptProject, options: ProjenrcOptions = {}) {
    super(project);
    this._tsProject = project;

    this.filePath = options.filename ?? DEFAULT_FILENAME;
    this._projenCodeDir = options.projenCodeDir ?? "projenrc";

    this.addDefaultTask(options);

    this.generateProjenrc();
  }

  private addDefaultTask(options: ProjenrcOptions) {
    // swc implies ts-node runner for backwards compatibility
    const runner =
      options.runner ??
      (options.swc
        ? TypeScriptRunner.tsNode({ swc: true })
        : this._tsProject.runner);

    // Bind runner to project and entrypoint
    const { dependencies, steps } = runner.bind(this._tsProject, this.filePath);

    // Request runner dependencies
    for (const dep of dependencies) {
      this._tsProject.deps.requestDependency(dep);
    }

    // Add runner steps
    this._tsProject.defaultTask?.addSteps(...steps);
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
