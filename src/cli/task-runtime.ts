import { existsSync, readFileSync, statSync } from "fs";
import { dirname, join, resolve } from "path";
import * as path from "path";
import { format } from "util";
import { gray, underline } from "chalk";
import { $ } from "dax";
import { PROJEN_DIR, TASKS_MANIFEST_VERSION } from "../common";
import * as logging from "../logging";
import type { TasksManifest, TaskSpec, TaskStep } from "../task-model";
import { systemShell, tool } from "../util/exec";

// avoids a (false positive) esbuild warning about incorrect imports.
// `?.default ?? module` keeps this working both as a plain CommonJS require and
// when the dependency is interop-wrapped inside the bundled run-task.cjs (where
// `require(...)` may yield `{ default: fn }` instead of the function). See
// projen#4407 ("parseConflictJSON is not a function" after eject).
// eslint-disable-next-line @typescript-eslint/no-require-imports
const parseConflictJSONModule = require("parse-conflict-json");
const parseConflictJSON =
  parseConflictJSONModule?.default ?? parseConflictJSONModule;

const ENV_TRIM_LEN = 20;
const ARGS_MARKER = "$@";
const QUOTED_ARGS_MARKER = `"${ARGS_MARKER}"`;

/**
 * Double-quotes a single argument so it is passed through verbatim, escaping the
 * characters that stay special inside double quotes. (Double quotes, not single:
 * dax's shell lacks the POSIX `'\''` escape.)
 */
function quoteArg(arg: string): string {
  return '"' + arg.replace(/(["$`\\])/g, "\\$1") + '"';
}

/**
 * dax's built-in cross-platform shell only implements a subset of POSIX shell
 * syntax and throws a terse `Not implemented: ...` for the rest. Rewrite those
 * into a short, actionable error that points at the system-shell escape hatch;
 * pass every other error through unchanged.
 */
function enrichBuiltinShellError(
  error: unknown,
  command: string | string[],
): unknown {
  const message = error instanceof Error ? error.message : String(error);
  if (!/Not implemented:/.test(message)) {
    /* v8 ignore next */
    return error;
  }

  const commandLine = Array.isArray(command) ? command.join(" ") : command;
  return new Error(
    "projen's built-in shell can't run this command:\n" +
      `  ${commandLine}\n` +
      "To use your system's shell instead, set this task to TaskShell.system().",
  );
}

/**
 * Normalized result of `shell()` (a subset of node's `SpawnSyncReturns`).
 */
interface ShellResult {
  /**
   * The exit code of the command, or `null` if the process was terminated by a
   * signal or never spawned.
   */
  readonly status: number | null;

  /**
   * Captured stdout. Only populated when stdout is piped (e.g. when evaluating
   * environment variables); `null`/`undefined` when stdio is inherited.
   */
  readonly stdout?: Buffer | null;

  /**
   * Captured stderr. See `stdout`.
   */
  readonly stderr?: Buffer | null;

  /**
   * An error raised while attempting to spawn the command (not a non-zero exit
   * code, which is reported via `status`).
   */
  readonly error?: Error;
}

/**
 * The runtime component of the tasks engine.
 */
export class TaskRuntime {
  /**
   * The project-relative path of the tasks manifest file.
   */
  public static readonly MANIFEST_FILE = path.posix.join(
    PROJEN_DIR,
    "tasks.json",
  );

  /**
   * One-shot entrypoint for the standalone task runner.
   *
   * Creates a runtime rooted at the current working directory, runs the named
   * task, and converts any failure into a non-zero process exit code. This is
   * the single line invoked by the bundled `scripts/run-task.cjs` that
   * "projen eject" emits, which keeps the generated bundle footer trivial.
   *
   * @param name The name of the task to run. Defaults to `process.argv[2]`.
   */
  public static async main(name: string = process.argv[2]): Promise<void> {
    try {
      await new TaskRuntime(".").runTask(name);
    } catch (e: any) {
      console.error(e?.stack ?? String(e));
      process.exit(1);
    }
  }

  /**
   * The contents of tasks.json
   */
  private _manifest: TasksManifest = { tasks: {} };

  /**
   * The raw contents of the currently loaded manifest, used to detect changes
   * on disk so the runtime can reload a regenerated manifest mid-run.
   */
  private _identity?: string;

  /**
   * The root directory of the project and the cwd for executing tasks.
   */
  public readonly workdir: string;

  constructor(workdir: string) {
    this.workdir = resolve(workdir);
    // Perform the initial load. This also verifies the manifest's schema
    // version.
    this.reloadManifestIfChanged();
  }

  /**
   * The contents of tasks.json
   */
  public get manifest(): TasksManifest {
    return this._manifest;
  }

  /**
   * The absolute path of the tasks manifest file.
   */
  private get manifestPath(): string {
    return join(this.workdir, TaskRuntime.MANIFEST_FILE);
  }

  /**
   * The tasks in this project.
   */
  public get tasks(): TaskSpec[] {
    return Object.values(this.manifest.tasks ?? {});
  }

  /**
   * Find a task by name, or `undefined` if not found.
   */
  public tryFindTask(name: string): TaskSpec | undefined {
    if (!this.manifest.tasks) {
      return undefined;
    }
    return this.manifest.tasks[name];
  }

  /**
   * Runs the task.
   * @param name The task name.
   */
  public async runTask(
    name: string,
    parents: string[] = [],
    args: Array<string | number> = [],
    env: { [name: string]: string } = {},
  ): Promise<void> {
    // A previously executed task (most importantly the "default"/synth task,
    // which `build` spawns first) may have regenerated `.projen/tasks.json`.
    // Pick up any such changes before resolving and running this task so we
    // never execute a stale, in-memory definition.
    this.reloadManifestIfChanged();

    const task = this.tryFindTask(name);
    if (!task) {
      throw new Error(`cannot find command ${name}`);
    }

    await new RunTask(this, task, parents, args, env).run();
  }

  /**
   * Re-reads the tasks manifest from disk if its contents changed since it was
   * last loaded, verifying its schema version along the way.
   *
   * Change detection compares the raw file contents, so an unchanged manifest
   * is not re-verified or re-adopted.
   */
  private reloadManifestIfChanged(): void {
    if (!existsSync(this.manifestPath)) {
      // No manifest on disk: treat as an empty project (legacy behavior).
      this._manifest = { tasks: {} };
      this._identity = undefined;
      return;
    }

    const raw = readFileSync(this.manifestPath, "utf-8");
    if (raw === this._identity) {
      return; // unchanged since the last load
    }

    const manifest: TasksManifest = parseConflictJSON(raw, undefined, "theirs");

    // A previously loaded manifest means this is a *reload* (e.g. the
    // "default"/synth task regenerated the file mid-run), as opposed to the
    // initial load performed by the constructor.
    const isReload = this._identity !== undefined;

    this.verifyManifest(manifest);
    this._manifest = manifest;
    this._identity = raw;

    if (isReload) {
      logging.debug(
        `${TaskRuntime.MANIFEST_FILE} changed on disk; successfully loaded the new tasks manifest.`,
      );
    }
  }

  /**
   * Validates a freshly read manifest:
   *
   * - Legacy manifests (no `manifestVersion`) are accepted as-is for backwards
   *   compatibility.
   * - Manifests from a newer projen (a higher `manifestVersion`) are accepted
   *   with a warning, since this runtime may not understand the schema.
   */
  private verifyManifest(manifest: TasksManifest): void {
    // Backwards compatibility: manifests generated before versioning carry no
    // version.
    if (manifest.manifestVersion === undefined) {
      return;
    }

    if (manifest.manifestVersion > TASKS_MANIFEST_VERSION) {
      logging.warn(
        `${TaskRuntime.MANIFEST_FILE} was generated by a newer version of projen ` +
          `(manifest version ${manifest.manifestVersion}, this projen supports up to ${TASKS_MANIFEST_VERSION}). ` +
          `Some tasks may not behave as expected; consider upgrading projen.`,
      );
    }
  }
}

class RunTask {
  private env: { [name: string]: string | undefined } = {};
  private readonly parents: string[];

  private readonly workdir: string;

  constructor(
    private readonly runtime: TaskRuntime,
    private readonly task: TaskSpec,
    parents: string[] = [],
    private readonly args: Array<string | number> = [],
    private readonly envParam: { [name: string]: string } = {},
  ) {
    this.workdir = task.cwd ?? this.runtime.workdir;
    this.parents = parents;
  }

  /**
   * Executes the task. This was previously done in the constructor, but is now
   * an async method since shell execution is asynchronous (e.g. dax on
   * Windows).
   */
  public async run(): Promise<void> {
    const { task, args, parents } = this;

    if (!task.steps || task.steps.length === 0) {
      this.logDebug(gray("No actions have been specified for this task."));
      return;
    }

    this.env = await this.resolveEnvironment(
      this.envParam,
      parents,
      this.resolveShell(),
    );

    const envlogs = [];
    for (const [k, v] of Object.entries(this.env)) {
      const vv = v ?? "";
      const trimmed =
        vv.length > ENV_TRIM_LEN ? vv.substring(0, ENV_TRIM_LEN) + "..." : vv;
      envlogs.push(`${k}=${trimmed}`);
    }

    if (envlogs.length) {
      this.logDebug(gray(`${underline("env")}: ${envlogs.join(" ")}`));
    }

    // evaluate condition
    if (!(await this.evalCondition(task, this.resolveShell()))) {
      this.log("condition exited with non-zero - skipping");
      return;
    }

    // verify we required environment variables are defined
    const merged = { ...process.env, ...this.env };
    const missing = new Array<string>();
    for (const name of task.requiredEnv ?? []) {
      if (!(name in merged)) {
        missing.push(name);
      }
    }

    if (missing.length > 0) {
      throw new Error(
        `missing required environment variables: ${missing.join(",")}`,
      );
    }

    for (const step of task.steps) {
      const stepShell = this.resolveShell(step);

      // evaluate step condition
      if (!(await this.evalCondition(step, stepShell))) {
        this.log("condition exited with non-zero - skipping");
        continue;
      }

      const argsList: string[] = [
        ...(step.args || []),
        ...(step.receiveArgs ? args : []),
      ].map((a) => a.toString());

      if (step.say) {
        logging.info(this.fmtLog(step.say));
      }

      if (step.spawn) {
        await this.runtime.runTask(
          step.spawn,
          [...this.parents, this.task.name],
          argsList,
          step.env,
        );
      }

      const execs: Array<string | string[]> = step.exec ? [step.exec] : [];

      // Parse step-specific environment variables
      const env = await this.evalEnvironment(step.env ?? {}, stepShell);

      if (step.builtin) {
        execs.push(this.renderBuiltin(step.builtin));
      }

      // `execArgs` is an explicit argv (the program followed by its arguments).
      // It is handed to `shell()` as an array rather than a rendered string, so
      // it runs without a shell and every element is passed through verbatim -
      // which is what lets callers avoid thinking about quoting. Fixed/received
      // args are spliced in wherever a `$@` marker element appears (mirroring
      // the string `exec` behavior), or appended at the end if there is none.
      if (step.execArgs) {
        const argv: string[] = [];
        let placed = false;
        for (const element of step.execArgs) {
          if (element === ARGS_MARKER) {
            argv.push(...argsList);
            placed = true;
          } else {
            argv.push(element);
          }
        }
        if (!placed) {
          argv.push(...argsList);
        }
        execs.push(argv);
      }

      for (const exec of execs) {
        let command = exec;

        // A string command is a shell line: splice task args in per the `$@`
        // marker rules. An `execArgs` argv already carries its args, untouched.
        if (typeof command === "string") {
          if (command.includes(QUOTED_ARGS_MARKER)) {
            // `"$@"`: splice each arg in as a separate verbatim word (like
            // bash's quoted `"$@"`), so whitespace and metacharacters survive.
            command = command.replace(
              QUOTED_ARGS_MARKER,
              argsList.map(quoteArg).join(" "),
            );
          } else if (command.includes(ARGS_MARKER)) {
            command = command.replace(ARGS_MARKER, argsList.join(" "));
          } else {
            command = [command, ...argsList].join(" ");
          }
        }

        const cwd = step.cwd;
        // A thrown error (e.g. spawn failure) propagates; a non-zero exit is
        // reported via `result.status`.
        const result = await this.shell({
          command,
          cwd,
          extraEnv: env,
          shell: stepShell,
        });
        if (result.status !== 0) {
          throw new Error(
            `Task "${this.fullname}" failed when executing "${
              Array.isArray(command) ? command.join(" ") : command
            }" (cwd: ${resolve(cwd ?? this.workdir)})`,
          );
        }
      }
    }
  }

  /**
   * Determines if a task should be executed based on "condition".
   *
   * @returns true if the task should be executed or false if the condition
   * evaluates to false (exits with non-zero), indicating that the task should
   * be skipped.
   */
  private async evalCondition(
    taskOrStep: TaskSpec | TaskStep,
    shell: string | string[],
  ) {
    // no condition, carry on
    if (!taskOrStep.condition) {
      return true;
    }

    this.log(gray(`${underline("condition")}: ${taskOrStep.condition}`));
    const result = await this.shell({
      command: taskOrStep.condition,
      quiet: true,
      shell,
    });
    if (result.status === 0) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Evaluates environment variables from shell commands (e.g. `$(xx)`)
   */
  private async evalEnvironment(
    env: { [name: string]: string },
    shell: string | string[],
  ) {
    const output: { [name: string]: string | undefined } = {};

    for (const [key, value] of Object.entries(env ?? {})) {
      if (String(value).startsWith("$(") && String(value).endsWith(")")) {
        const query = value.substring(2, value.length - 1);
        const result = await this.shell({
          command: query,
          quiet: true,
          captureOutput: true,
          shell,
        });
        if (result.status !== 0) {
          const error = result.error
            ? result.error.stack
            : result.stderr?.toString().trim() ||
              result.stdout?.toString().trim() ||
              `command exited with code ${result.status}`;

          logging.warn(
            this.fmtLog(
              `${underline(key)}: unable to evaluate "${query}". Environment variable will be skipped. Check that the command exists and runs successfully.`,
            ),
          );
          logging.warn(this.fmtLog(`${underline(key)}: ${error}`));
        } else {
          output[key] = result.stdout?.toString("utf-8").trim() ?? "";
        }
      } else {
        output[key] = value;
      }
    }
    return output;
  }

  /**
   * Renders the runtime environment for a task. Namely, it supports this syntax
   * `$(xx)` for allowing environment to be evaluated by executing a shell
   * command and obtaining its result.
   */
  private async resolveEnvironment(
    envParam: { [name: string]: string },
    parents: string[],
    shell: string | string[],
  ) {
    let env = this.runtime.manifest.env ?? {};

    // add env from all parent tasks one by one
    for (const parent of parents) {
      env = {
        ...env,
        ...(this.runtime.tryFindTask(parent)?.env ?? {}),
      };
    }

    // apply task environment, then the specific env last
    env = {
      ...env,
      ...(this.task.env ?? {}),
      ...envParam,
    };

    return this.evalEnvironment(env, shell);
  }

  /**
   * Resolves the shell for a step's command (or the task's, when no step is
   * given): step, then task, then project default, then "projen".
   */
  private resolveShell(step?: TaskStep): string | string[] {
    return (
      step?.shell ?? this.task.shell ?? this.runtime.manifest.shell ?? "projen"
    );
  }

  /**
   * Returns the "full name" of the task which includes all it's parent task names concatenated by chevrons.
   */
  private get fullname() {
    return [...this.parents, this.task.name].join(" » ");
  }

  private log(...args: any[]) {
    logging.verbose(this.fmtLog(...args));
  }

  private logDebug(...args: any[]) {
    logging.debug(this.fmtLog(...args));
  }

  private fmtLog(...args: any[]) {
    return format(`${underline(this.fullname)} |`, ...args);
  }

  private async shell(options: ShellOptions): Promise<ShellResult> {
    const quiet = options.quiet ?? false;
    if (!quiet) {
      const log = new Array<string>();

      log.push(
        Array.isArray(options.command)
          ? options.command.join(" ")
          : options.command,
      );

      if (options.cwd) {
        log.push(`(cwd: ${options.cwd})`);
      }

      this.log(log.join(" "));
    }

    const cwd = options.cwd ?? this.workdir;
    if (!existsSync(cwd) || !statSync(cwd).isDirectory()) {
      throw new Error(
        `invalid workdir (cwd): ${cwd} must be an existing directory`,
      );
    }

    // The resolved shell is one of:
    // - "projen" (default): dax's in-process cross-platform shell, so POSIX-style
    //   task syntax (`mkdir -p`, `&&`, `$VAR`, ...) works the same everywhere.
    // - "system": the host's native shell (`/bin/sh`, or `cmd.exe` on Windows).
    // - an argv, e.g. ["bash","-c"]: a shell invocation with the command appended
    //   as its final argument.
    const shell = options.shell ?? "projen";
    if (typeof shell === "string" && shell !== "projen" && shell !== "system") {
      throw new Error(
        `unknown built-in shell ${JSON.stringify(
          shell,
        )}; use the built-in "projen" or "system" shells, or a TaskShell.command([...]) invocation`,
      );
    }

    // stdout/stderr are captured only when asked (e.g. `$(...)` env eval);
    // otherwise they are inherited so output streams through.
    const capture = options.captureOutput ?? false;

    const command = options.command;
    const env = {
      ...process.env,
      ...this.env,
      ...options.extraEnv,
    };

    // "system": the host-native engine. A string command runs through the OS
    // shell; an `execArgs` argv is spawned directly (shell-free), so the real
    // binary runs with no dax built-ins. (Only `$(...)`/condition eval captures,
    // and those always pass a string, so an array command never needs capture.)
    if (shell === "system") {
      if (Array.isArray(command)) {
        const [program, ...args] = command;
        try {
          tool(program).run(args, { cwd, env, inheritStdio: true });
          return { status: 0 };
        } catch (e: any) {
          if (typeof e?.status === "number") {
            return { status: e.status };
          }
          throw e;
        }
      }
      return systemShell(command, { cwd, env, capture });
    }

    // Otherwise run through dax: the "projen" shell or an explicit invocation.
    const builder = this.buildDaxCommand(command, shell);

    let result;
    try {
      result = await builder
        .cwd(cwd)
        .env(env)
        .stdout(capture ? "piped" : "inherit")
        .stderr(capture ? "piped" : "inherit")
        .noThrow();
    } catch (e) {
      // dax's in-process shell throws a terse `Not implemented: ...` for shell
      // syntax it does not support (e.g. `$(...)` command substitution); turn
      // that into an actionable error that points at the system-shell escape
      // hatch. Other errors pass through unchanged.
      throw enrichBuiltinShellError(e, command);
    }

    return {
      status: result.code,
      stdout: capture ? Buffer.from(result.stdoutBytes) : null,
      stderr: capture ? Buffer.from(result.stderrBytes) : null,
    };
  }

  /**
   * Builds the dax command for the "projen" shell or an explicit invocation.
   * (The "system" shell is handled host-side, not here.) `command` is a shell
   * line (string) or an `execArgs` argv (string[]); `shell` is `"projen"` or an
   * invocation argv such as `["bash", "-c"]`.
   */
  private buildDaxCommand(
    command: string | string[],
    shell: string | string[],
  ) {
    // An invocation (e.g. ["bash","-c"], ["npx","--no","-c"]): append the
    // command as its final argument. A string is appended as-is; an `execArgs`
    // argv is rendered to a quoted command line so the shell re-parses the same
    // argv.
    if (Array.isArray(shell)) {
      const [program, ...flags] = shell;
      const commandLine = Array.isArray(command)
        ? command.map(quoteArg).join(" ")
        : command;
      return $`${program} ${[...flags, commandLine]}`;
    }

    // The built-in "projen" shell (dax).
    return Array.isArray(command)
      ? // execArgs: shell-free argv (each element escaped; `.cmd` shims resolved).
        $`${command[0]} ${command.slice(1)}`
      : // string command, parsed in-process by dax's cross-platform shell.
        $.raw`${command}`;
  }

  private renderBuiltin(builtin: string) {
    // Locate projen's package root by walking up from this module's directory
    // until we find a package.json. This works whether the code runs from the
    // compiled file (lib/cli/task-runtime.js) or from the bundled run-task.cjs
    // (lib/run-task.cjs), which live at different depths - so a hard-coded
    // relative path to package.json would be wrong in one of the two cases.
    let moduleRoot = __dirname;
    while (!existsSync(join(moduleRoot, "package.json"))) {
      const parent = dirname(moduleRoot);
      if (parent === moduleRoot) {
        throw new Error("unable to locate the projen package root");
      }
      moduleRoot = parent;
    }
    const program = require.resolve(
      join(moduleRoot, "lib", `${builtin}.task.js`),
    );
    return `"${process.execPath}" "${program}"`;
  }
}

interface ShellOptions {
  /**
   * The command to run. A string is executed as a shell command line; a
   * string array is an explicit argv (program + arguments) executed without a
   * shell.
   */
  readonly command: string | string[];
  /**
   * @default - project dir
   */
  readonly cwd?: string;
  /**
   * Capture stdout/stderr (so the caller can read them from the result)
   * instead of inheriting the parent's streams.
   *
   * @default false
   */
  readonly captureOutput?: boolean;
  /** @default false */
  readonly quiet?: boolean;
  readonly extraEnv?: { [name: string]: string | undefined };
  /**
   * The resolved shell to interpret the command (e.g. "projen", "bash -c").
   * @default "projen"
   */
  readonly shell?: string | string[];
}
