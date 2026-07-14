import type { DependencyRequest } from "../dependencies";
import { type RunScriptConfig, ScriptRunner } from "../script-runner";
import type { TaskStep } from "../task-model";
import { recreate } from "../util/recreate";

/**
 * Options for the ts-node runner.
 */
export interface TsNodeRunnerOptions {
  /**
   * Whether to type-check the script during executing.
   *
   * @see https://github.com/TypeStrong/ts-node#typecheck
   *
   * @default true
   */
  readonly typeCheck?: boolean;

  /**
   * Path to the tsconfig file to use.
   *
   * @default - ts-node default discovery
   */
  readonly tsconfig?: string;

  /**
   * Whether to use SWC for transpilation.
   *
   * This will disable type-checking.
   *
   * @see https://github.com/TypeStrong/ts-node#swc
   *
   * @default false
   */
  readonly swc?: boolean;
}

/**
 * Options for the tsx runner.
 */
export interface TsxRunnerOptions {
  /**
   * Whether to type-check the entrypoint before executing.
   *
   * Because tsx does not type check code, you may want to enable this for additional type safety.
   * When enabled, runs `tsc --noEmit`, using the provided tsconfig.
   *
   * @default false
   */
  readonly typeCheck?: boolean;

  /**
   * Path to the tsconfig file to use.
   * When specified, will use this tsconfig for running tsx and type-checking (if enabled).
   *
   * @default - tsx/typescript default discovery
   */
  readonly tsconfig?: string;
}

/**
 * Options for the native Node.js TypeScript runner.
 */
export interface NodeRunnerOptions {
  /**
   * Whether to type-check the entrypoint before executing.
   *
   * Because the native Node.js TypeScript does not type check code,
   * you may want to enable this for additional type safety.
   * When enabled, runs `tsc --noEmit`, using the provided tsconfig.
   *
   * @default false
   */
  readonly typeCheck?: boolean;

  /**
   * Path to the tsconfig file for type-checking.
   * When specified, will use this tsconfig for type-checking (if enabled).
   *
   * @default - typescript default discovery
   */
  readonly tsconfig?: string;

  /**
   * Whether to also enable `--experimental-transform-types`.
   * @default false
   */
  readonly experimentalTransformTypes?: boolean;
}

/**
 * The options that can be adjusted on any {@link TypeScriptRunner}, regardless
 * of its runtime.
 *
 * This is the override type for {@link TypeScriptRunner.copy}. Runtime-specific
 * creation options (such as `swc` for ts-node) are set via the static factories
 * and are preserved - but cannot be changed - by `copy`, so a copy can never
 * change the runtime of a runner.
 */
export interface TypeScriptRunnerOptions {
  /**
   * Whether to type-check the entrypoint.
   */
  readonly typeCheck?: boolean;

  /**
   * Path to the tsconfig file to use.
   */
  readonly tsconfig?: string;
}

type RunnerKind = "ts-node" | "tsx" | "node";

/**
 * The full, internal option set for a runner: the common options plus the
 * runtime-specific creation options. Never exposed publicly.
 */
interface RunnerState extends TypeScriptRunnerOptions {
  readonly swc?: boolean;
  readonly experimentalTransformTypes?: boolean;
}

/**
 * The runner used to execute TypeScript files.
 *
 * A runner is a {@link FutureComponent}: create it standalone (e.g. via one of
 * the static factories) and it is attached to a project by the component that
 * consumes it. Use {@link TypeScriptRunner.copy} to derive a new runner with
 * adjusted options.
 */
export class TypeScriptRunner extends ScriptRunner {
  /**
   * Use ts-node to execute TypeScript files.
   */
  public static tsNode(options: TsNodeRunnerOptions = {}): TypeScriptRunner {
    return new TypeScriptRunner("ts-node", options);
  }

  /**
   * Use tsx to execute TypeScript files.
   *
   * tsx is a fast TypeScript runtime that does not perform type-checking.
   * You may opt-in to an explicit type-checking step before the script is run.
   */
  public static tsx(options: TsxRunnerOptions = {}): TypeScriptRunner {
    return new TypeScriptRunner("tsx", options);
  }

  /**
   * Use the native Node.js TypeScript support.
   *
   * Requires Node.js 22.18.0 or later.
   * The script must use ESM style imports (no directories, include file endings, etc.).
   *
   * Named `nodejs` (not `node`) because a runner is a construct, and `node` is
   * reserved by `constructs.Construct` for the construct's tree node.
   */
  public static nodejs(options: NodeRunnerOptions = {}): TypeScriptRunner {
    return new TypeScriptRunner("node", options);
  }

  private readonly _kind: RunnerKind;
  private readonly _options: RunnerState;

  private constructor(kind: RunnerKind, options: RunnerState) {
    super();
    this._kind = kind;
    this._options = options;
  }

  /**
   * Returns a new (detached) runner of the same kind, with `overrides` merged
   * over the current options.
   *
   * Safe to call while detached.
   */
  public copy(overrides: TypeScriptRunnerOptions = {}): TypeScriptRunner {
    return recreate(this, this._kind, { ...this._options, ...overrides });
  }

  /**
   * Produce the {@link RunScriptConfig} to run the given entrypoint with this
   * runner.
   */
  public configFor(entrypoint: string): RunScriptConfig {
    switch (this._kind) {
      case "ts-node":
        return this.renderTsNode(entrypoint);
      case "tsx":
        return this.renderTsx(entrypoint);
      case "node":
        return this.renderNode(entrypoint);
    }
  }

  private renderTsNode(entrypoint: string): RunScriptConfig {
    const typeCheck = this._options.typeCheck ?? true;
    const swc = this._options.swc ?? false;

    const command: string[] = ["ts-node"];
    const dependencies: DependencyRequest[] = [{ name: "ts-node" }];

    if (swc) {
      dependencies.push({ name: "@swc/core" });
      command.push("--swc");
    }

    if (!typeCheck) {
      command.push("--transpileOnly");
    }

    if (this._options.tsconfig) {
      command.push("--project", this._options.tsconfig);
    }

    // command.push("--prefer-ts-exts");

    return {
      dependencies,
      steps: [{ execArgs: [...command, entrypoint] }],
    };
  }

  private renderTsx(entrypoint: string): RunScriptConfig {
    const typeCheck = this._options.typeCheck ?? false;

    const command: string[] = ["tsx"];
    const steps: TaskStep[] = [];
    const dependencies: DependencyRequest[] = [{ name: "tsx" }];

    if (this._options.tsconfig) {
      command.push("--tsconfig", this._options.tsconfig);
    }

    if (typeCheck) {
      steps.push(typeCheckStep(this._options.tsconfig));
    }

    steps.push({ execArgs: [...command, entrypoint] });

    return { dependencies, steps };
  }

  private renderNode(entrypoint: string): RunScriptConfig {
    const typeCheck = this._options.typeCheck ?? false;

    const command: string[] = ["node"];
    const steps: TaskStep[] = [];
    const dependencies: DependencyRequest[] = [];

    if (this._options.experimentalTransformTypes ?? false) {
      command.push("--experimental-transform-types");
      command.push("--disable-warning=ExperimentalWarning");
    }

    if (typeCheck) {
      steps.push(typeCheckStep(this._options.tsconfig));
      dependencies.push({ name: "typescript" });
    }

    steps.push({ execArgs: [...command, entrypoint] });

    return { dependencies, steps };
  }
}

function typeCheckStep(tsconfig?: string): TaskStep {
  const args = ["tsc", "--noEmit"];
  if (tsconfig) {
    args.push("-p", tsconfig);
  }
  return { execArgs: args, name: "typecheck" };
}
