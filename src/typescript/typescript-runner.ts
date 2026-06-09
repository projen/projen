import type { DependencyRequest } from "../dependencies";
import type { TypeScriptCompilerOptions } from "../javascript";
import { TypeScriptModuleResolution } from "../javascript";
import type { Project } from "../project";
import { type RunScriptConfig, ScriptRunner } from "../script-runner";
import type { TaskStep } from "../task-model";
import type { TypeScriptProject } from "./typescript";

/**
 * Options for the ts-node runner.
 */
export interface TsNodeRunnerOptions {
  /**
   * Whether to use SWC for transpilation.
   * @default false
   */
  readonly swc?: boolean;

  /**
   * Path to the tsconfig file to use.
   *
   * If not specified, the runner will use the project's `tsconfigDev`
   * when the project is a `TypeScriptProject`.
   *
   * @default - discovered from the project
   */
  readonly tsconfig?: string;
}

/**
 * Options for the tsx runner.
 *
 * tsx does not perform type checking on its own. By default, this runner
 * adds a separate `tsc --noEmit` step that typechecks only the entrypoint
 * file (and any files it imports) using CLI flags rather than a tsconfig.
 * This avoids typechecking the entire project while still catching errors
 * in your projenrc code.
 *
 * Sensible default compiler options are included (strict mode, ES2022 target,
 * nodenext module resolution, skipLibCheck). These can be overridden via
 * `compilerOptions`.
 */
export interface TsxRunnerOptions {
  /**
   * Whether to typecheck the entrypoint before executing.
   *
   * When enabled, runs `tsc --noEmit` with compiler options passed as CLI
   * flags against the entrypoint file. This typechecks only the entrypoint
   * and its transitive imports, not the entire project.
   *
   * @default true
   */
  readonly typeCheck?: boolean;

  /**
   * Compiler options passed as CLI flags to `tsc` when typechecking.
   * These are merged with (and override) the built-in defaults.
   *
   * Only used when `typeCheck` is true.
   *
   * @default - sensible defaults: strict, target ES2022, module nodenext, skipLibCheck
   */
  readonly compilerOptions?: TypeScriptCompilerOptions;

  /**
   * Path to the tsconfig file to use for tsx execution.
   *
   * If not specified, the runner will use the project's `tsconfigDev`
   * when the project is a `TypeScriptProject`.
   *
   * @default - discovered from the project
   */
  readonly tsconfig?: string;
}

/**
 * Options for the native Node.js TypeScript runner.
 */
export interface NodeRunnerOptions {
  /**
   * Whether to enable `--experimental-strip-types`.
   * @default true
   */
  readonly stripTypes?: boolean;

  /**
   * Whether to enable `--experimental-transform-types`.
   * @default true
   */
  readonly transformTypes?: boolean;
}

/**
 * The runner used to execute TypeScript files.
 */
export class TypeScriptRunner extends ScriptRunner {
  /**
   * Use ts-node to execute TypeScript files.
   */
  public static tsNode(options: TsNodeRunnerOptions = {}): TypeScriptRunner {
    const swc = options.swc ?? false;
    const tsconfig = options.tsconfig;
    const deps: DependencyRequest[] = [{ name: "ts-node" }];
    if (swc) {
      deps.push({ name: "@swc/core" });
    }
    const tsNode = swc ? "ts-node --swc" : "ts-node";
    return new TypeScriptRunner((project, entrypoint) => {
      const tc = tsconfig ?? resolveTsconfig(project);
      const projectFlag = tc ? ` --project ${tc}` : "";
      return {
        dependencies: deps,
        steps: [{ exec: `${tsNode}${projectFlag} ${entrypoint}` }],
      };
    });
  }

  /**
   * Use tsx to execute TypeScript files.
   *
   * tsx is a fast TypeScript runtime that does not perform type checking.
   * By default, a `tsc --noEmit` step is prepended to typecheck the
   * entrypoint file (and its transitive imports) before execution. The
   * typecheck uses CLI flags with sensible defaults rather than a tsconfig,
   * so it only checks the entrypoint's dependency graph — not the entire
   * project.
   */
  public static tsx(options: TsxRunnerOptions = {}): TypeScriptRunner {
    const typeCheck = options.typeCheck ?? true;
    const tsconfig = options.tsconfig;
    const compilerOptions: TypeScriptCompilerOptions = {
      strict: true,
      target: "ES2022",
      module: "nodenext",
      moduleResolution: TypeScriptModuleResolution.NODE_NEXT,
      esModuleInterop: true,
      skipLibCheck: true,
      ...options.compilerOptions,
      noEmit: undefined, // don't allow setting this
    };
    const compilerFlags = compilerOptionsToFlags(compilerOptions);
    return new TypeScriptRunner((project, entrypoint) => {
      const tc = tsconfig ?? resolveTsconfig(project);
      const steps: TaskStep[] = [];
      if (typeCheck) {
        const parts = ["tsc", "--noEmit", compilerFlags, entrypoint]
          .filter(Boolean)
          .join(" ");
        steps.push({ exec: parts, name: "typecheck" });
      }
      const tsconfigFlag = tc ? ` --tsconfig ${tc}` : "";
      steps.push({ exec: `tsx${tsconfigFlag} ${entrypoint}` });
      return { dependencies: [{ name: "tsx" }], steps };
    });
  }

  /**
   * Use the native Node.js TypeScript support.
   * Requires Node.js 22.6.0 or later.
   */
  public static node(options: NodeRunnerOptions = {}): TypeScriptRunner {
    const flags: string[] = [];
    if (options.stripTypes ?? true) {
      flags.push("--experimental-strip-types");
    }
    if (options.transformTypes ?? true) {
      flags.push("--experimental-transform-types");
    }
    return new TypeScriptRunner((_project, entrypoint) => ({
      dependencies: [],
      steps: [{ exec: `node ${[...flags, entrypoint].join(" ")}` }],
    }));
  }

  private readonly _bind: (
    project: Project,
    entrypoint: string,
  ) => RunScriptConfig;

  private constructor(
    bind: (project: Project, entrypoint: string) => RunScriptConfig,
  ) {
    super();
    this._bind = bind;
  }

  /**
   * Bind the runner to a project and entrypoint, producing a resolved config.
   */
  public bind(project: Project, entrypoint: string): RunScriptConfig {
    return this._bind(project, entrypoint);
  }
}

/**
 * Resolves the tsconfig file from the project.
 * Returns undefined if the project is not a TypeScriptProject.
 */
function resolveTsconfig(project: Project): string | undefined {
  // Lazy import to avoid circular module dependency at load time
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { TypeScriptProject: TSProject } = require("./typescript");
  if (project instanceof TSProject) {
    return (project as TypeScriptProject).tsconfigDev.fileName;
  }
  return undefined;
}

/**
 * Converts TypeScriptCompilerOptions to tsc CLI flags.
 */
function compilerOptionsToFlags(options: TypeScriptCompilerOptions): string {
  return Object.entries(options)
    .filter(([_, v]) => v !== undefined)
    .map(([k, v]) => {
      if (v === true) return `--${k}`;
      if (v === false) return `--${k} false`;
      if (Array.isArray(v)) {
        return `--${k} ${v.map((i) => JSON.stringify(i)).join(",")}`;
      }
      return `--${k} ${JSON.stringify(v)}`;
    })
    .join(" ");
}
