import { existsSync, writeFileSync, mkdirSync } from "fs";
import { dirname, resolve } from "path";
import {
  NodePackageType,
  TypescriptConfig,
  TypescriptConfigExtends,
} from "../javascript";
import { renderJavaScriptOptions } from "../javascript/render-options";
import { ProjenrcFile } from "../projenrc";
import { TypeScriptProject } from "../typescript";

export enum ProjenRcRunner {
  /**
   * Use the default ts-node runner.
   */
  TS_NODE = "ts-node",

  /**
   * Use the ts-node runner with SWC.
   */
  TS_NODE_SWC = "ts-node-swc",

  /**
   * Use the tsx runner with esbuild.
   */
  TSX = "tsx",
}

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
   * @deprecated use `runner: ProjenRcRunner.TS_NODE_SWC` instead
   */
  readonly swc?: boolean;

  /**
   * The runner to use for the projenrc file.
   *
   * **Warning**: `ts-node` will fail with `ERR_UNKNOWN_FILE_EXTENSION` if the
   * package is set to ESM and the current node version is 18.19.x or newer.
   *
   * For this reason, `tsx` is forced if the package is set to ESM and node
   * version is 18.19.x or newer, or you won't be able to run `projen` commands.
   *
   * @see https://github.com/TypeStrong/ts-node/issues/2094
   *
   * @default ProjenRcRunner.TS_NODE
   */
  readonly runner?: ProjenRcRunner;
}

const DEFAULT_FILENAME = ".projenrc.ts";

/**
 * Sets up a typescript project to use TypeScript for projenrc.
 */
export class Projenrc extends ProjenrcFile {
  public readonly filePath: string;
  /**
   * The tsconfig file JUST for the projenrc file. Inherits all settings except `includes` from `tsconfig.dev.json`
   */
  public readonly projenTsconfig?: TypescriptConfig;
  private readonly _projenCodeDir: string;
  private readonly _tsProject: TypeScriptProject;
  private readonly _runner: ProjenRcRunner;
  // private readonly _swc: boolean;

  constructor(project: TypeScriptProject, options: ProjenrcOptions = {}) {
    super(project);
    this._tsProject = project;

    this.filePath = options.filename ?? DEFAULT_FILENAME;
    this._projenCodeDir = options.projenCodeDir ?? "projenrc";
    this._runner =
      options.runner ?? options.swc
        ? ProjenRcRunner.TS_NODE_SWC
        : ProjenRcRunner.TS_NODE;

    const nodeVersionSplit = process.versions.node
      .split(".")
      .map((v) => parseInt(v, 10));
    const node18_19_or_newer =
      nodeVersionSplit[0] > 18 ||
      (nodeVersionSplit[0] === 18 && nodeVersionSplit[1] >= 19);

    if (
      node18_19_or_newer &&
      this._runner === ProjenRcRunner.TS_NODE &&
      this._tsProject.package.type === NodePackageType.ESM
    ) {
      this.project.logger.warn(
        "⚠️ Using ts-node with ESM in node 18.19.x or newer is broken. Using tsx instead. ⚠️"
      );
      this._runner = ProjenRcRunner.TSX;
    }

    if (this._runner === ProjenRcRunner.TSX) {
      // construct a "tsconfig.projenrc.json" that's based on tsconfigDev, but only includes the projenrc file and
      // files under "projenrc" directory, so we can call tsc and tsx on JUST the projenrc file
      const PROJEN_TSCONFIG_FILENAME = "tsconfig.projenrc.json";
      this.projenTsconfig = new TypescriptConfig(this._tsProject, {
        fileName: PROJEN_TSCONFIG_FILENAME,
        include: [
          this.filePath,
          "projenrc/**/*.ts", // gives a place for projenrc included files
        ],
        extends: TypescriptConfigExtends.fromTypescriptConfigs([
          this._tsProject.tsconfigDev,
        ]),
        compilerOptions: {
          noEmit: true,
          emitDeclarationOnly: false,
        },
      });

      this.addDefaultTsxTask();
    } else {
      this.addDefaultTsNodeTask();
    }

    this.generateProjenrc();
  }

  private addDefaultTsxTask() {
    const deps = ["tsx"];

    if (!this.projenTsconfig) {
      throw new Error("projenTsconfig is not defined");
    }

    // this is the task projen executes when running `projen` without a
    // specific task (if this task is not defined, projen falls back to
    // running "node .projenrc.js").
    this._tsProject.addDevDeps(...deps);

    // anywhere in the project tree.
    this._tsProject.defaultTask?.exec(
      `tsc --project ${this.projenTsconfig.fileName}`
    );
    this._tsProject.defaultTask?.exec(
      `tsx --tsconfig ${this.projenTsconfig.fileName} ${this.filePath}`
    );
  }

  private addDefaultTsNodeTask() {
    const deps = ["ts-node"];
    const swc = this._runner === ProjenRcRunner.TS_NODE_SWC;
    if (swc) {
      deps.push("@swc/core");
    }

    // this is the task projen executes when running `projen` without a
    // specific task (if this task is not defined, projen falls back to
    // running "node .projenrc.js").
    this._tsProject.addDevDeps(...deps);

    const tsNode = swc ? "ts-node --swc" : "ts-node";

    // we use "tsconfig.dev.json" here to allow projen source files to reside
    // anywhere in the project tree.
    this._tsProject.defaultTask?.exec(
      `${tsNode} --project ${this._tsProject.tsconfigDev.fileName} ${this.filePath}`
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

    this._tsProject.jest?.discoverTestMatchPatternsForDirs(
      [this._projenCodeDir],
      {
        fileExtensionPattern: this._tsProject.tsconfig?.compilerOptions?.allowJs
          ? undefined
          : "ts?(x)",
      }
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
      `Project definition file was created at ${rcfile}`
    );
  }
}
