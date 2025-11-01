import { existsSync, writeFileSync } from "fs";
import { resolve } from "path";
import { TypescriptConfig } from "../javascript";
import { renderJavaScriptOptions } from "../javascript/render-options";
import { Project } from "../project";
import { ProjenrcFile } from "../projenrc";

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

  /**
   * The name of the tsconfig file that will be used by ts-node
   * when compiling projen source files.
   *
   * @default "tsconfig.projen.json"
   */
  readonly tsconfigFileName?: string;
}

const DEFAULT_FILENAME = ".projenrc.ts";

/**
 * A projenrc file written in TypeScript
 *
 * This component can be instantiated in any type of project
 * and has no expectations around the project's main language.
 *
 * Requires that `npx` is available.
 */
export class ProjenrcTs extends ProjenrcFile {
  /**
   * TypeScript configuration file used to compile projen source files
   */
  public readonly tsconfig: TypescriptConfig;
  public readonly filePath: string;
  private readonly _projenCodeDir: string;

  constructor(project: Project, options: ProjenrcTsOptions = {}) {
    super(project);

    this.filePath = options.filename ?? DEFAULT_FILENAME;
    this._projenCodeDir = options.projenCodeDir ?? "projenrc";

    project.addPackageIgnore(`/${this.filePath}`);

    // Create a dedicated tsconfig for projen source files
    this.tsconfig = new TypescriptConfig(project, {
      fileName: options.tsconfigFileName ?? "tsconfig.projen.json",
      compilerOptions: {},
    });

    // Use npx since project's deps manager is not guaranteed to be JS-based
    project.defaultTask?.exec(
      `npx -y ts-node --project ${this.tsconfig.fileName} ${this.filePath}`
    );

    this.generateProjenrc();
  }

  public override preSynthesize(): void {
    super.preSynthesize();

    this.tsconfig.addInclude(this.filePath);
    this.tsconfig.addInclude(`${this._projenCodeDir}/**/*.ts`);
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

    writeFileSync(rcfile, lines.join("\n"));
    this.project.logger.info(
      `Project definition file was created at ${rcfile}`
    );
  }
}
