import { existsSync, writeFileSync } from "fs";
import { resolve } from "path";
import { TypescriptConfig } from "../javascript";
import { renderJavaScriptOptions } from "../javascript/render-options";
import type { Project } from "../project";
import { ProjenrcFile } from "../projenrc";
import { TypeScriptRunner } from "./typescript-runner";

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
   * The name of the tsconfig file that will be used by the runner
   * when compiling projen source files.
   *
   * @default "tsconfig.projen.json"
   * @deprecated Use `runner` to configure the tsconfigFileName directly.
   */
  readonly tsconfigFileName?: string;

  /**
   * The runner to use for executing TypeScript files.
   *
   * @default TypeScriptRunner.tsNode()
   */
  readonly runner?: TypeScriptRunner;
}

const DEFAULT_FILENAME = ".projenrc.ts";

/**
 * A projenrc file written in TypeScript
 *
 * This component can be instantiated in any type of project
 * and has no expectations around the project's main language.
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

    // Default runner uses the projen tsconfig
    const runner =
      options.runner ??
      TypeScriptRunner.tsNode({ tsconfig: this.tsconfig.fileName });

    // Build the run config
    const { dependencies, steps } = runner.bind(project, this.filePath);

    // If the runner has dependencies, wrap each exec step with
    // npx -y -p <deps> -c "<command>" to make them available without install.
    if (dependencies.length > 0) {
      const packages = dependencies
        .map((d) => (d.version ? `${d.name}@${d.version}` : d.name))
        .map((p) => `-p ${p}`)
        .join(" ");
      for (const step of steps) {
        if (step.exec) {
          project.defaultTask?.addSteps({
            ...step,
            exec: `npx -y ${packages} -c "${step.exec}"`,
          });
        } else {
          project.defaultTask?.addSteps(step);
        }
      }
    } else {
      for (const step of steps) {
        project.defaultTask?.addSteps(step);
      }
    }

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

    imports.add(moduleName, importName);

    const lines = new Array<string>();
    lines.push(...imports.asEsmImports());
    lines.push();
    lines.push(`const project = new ${className}(${renderedOptions});`);
    lines.push();
    lines.push("project.synth();");

    writeFileSync(rcfile, lines.join("\n"));
    this.project.logger.info(
      `Project definition file was created at ${rcfile}`,
    );
  }
}
