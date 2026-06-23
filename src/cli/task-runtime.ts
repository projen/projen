import type { SpawnOptions } from "child_process";
import { existsSync, readFileSync, statSync } from "fs";
import { dirname, join, resolve } from "path";
import * as path from "path";
import { format } from "util";
import { gray, underline } from "chalk";
import { $ } from "dax";
import { PROJEN_DIR, TASKS_MANIFEST_VERSION } from "../common";
import * as logging from "../logging";
import type { TasksManifest, TaskSpec, TaskStep } from "../task-model";
import { rawShell } from "../util/exec";

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
 * The result of executing a shell command.
 *
 * This is a normalized subset of node's `SpawnSyncReturns` so that the
 * synchronous (`spawnSync`) and asynchronous (`dax`) execution paths can return
 * a compatible shape.
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

    this.env = await this.resolveEnvironment(this.envParam, parents);

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
    if (!(await this.evalCondition(task))) {
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
      // evaluate step condition
      if (!(await this.evalCondition(step))) {
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

      const execs = step.exec ? [step.exec] : [];

      // Parse step-specific environment variables
      const env = await this.evalEnvironment(step.env ?? {});

      if (step.builtin) {
        execs.push(this.renderBuiltin(step.builtin));
      }

      for (const exec of execs) {
        let hasError = false;

        let command = exec;

        if (command.includes(QUOTED_ARGS_MARKER)) {
          // Poorly imitate bash quoted variable expansion. If "$@" is encountered in bash, elements of the arg array
          // that contain whitespace will be single quoted ('arg'). This preserves whitespace in things like filenames.
          // Imitate that behavior here by single quoting every element of the arg array when a quoted arg marker ("$@")
          // is encountered.
          command = command.replace(
            QUOTED_ARGS_MARKER,
            argsList.map((arg) => `'${arg}'`).join(" "),
          );
        } else if (command.includes(ARGS_MARKER)) {
          command = command.replace(ARGS_MARKER, argsList.join(" "));
        } else {
          command = [command, ...argsList].join(" ");
        }

        const cwd = step.cwd;
        try {
          const result = await this.shell({
            command,
            cwd,
            extraEnv: env,
          });
          hasError = result.status !== 0;
        } catch (e) {
          // a non-zero exit code is reported via `result.status` above; this
          // catch handles errors thrown while attempting to spawn the command.
          if ((e as any)?.message?.startsWith("non-zero exit code:")) {
            hasError = true;
          }
          throw e;
        }
        if (hasError) {
          throw new Error(
            `Task "${
              this.fullname
            }" failed when executing "${command}" (cwd: ${resolve(
              cwd ?? this.workdir,
            )})`,
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
  private async evalCondition(taskOrStep: TaskSpec | TaskStep) {
    // no condition, carry on
    if (!taskOrStep.condition) {
      return true;
    }

    this.log(gray(`${underline("condition")}: ${taskOrStep.condition}`));
    const result = await this.shell({
      command: taskOrStep.condition,
      logprefix: "condition: ",
      quiet: true,
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
  private async evalEnvironment(env: { [name: string]: string }) {
    const output: { [name: string]: string | undefined } = {};

    for (const [key, value] of Object.entries(env ?? {})) {
      if (String(value).startsWith("$(") && String(value).endsWith(")")) {
        const query = value.substring(2, value.length - 1);
        const result = await this.shellEval({ command: query });
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

    return this.evalEnvironment(env ?? {});
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

      if (options.logprefix) {
        log.push(options.logprefix);
      }

      log.push(options.command);

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

    const env = {
      ...process.env,
      ...this.env,
      ...options.extraEnv,
    };

    // stdout/stderr are only captured when a caller pipes them (e.g.
    // `shellEval`); otherwise inherit so output is streamed to the terminal.
    const capture = Array.isArray(options.spawnOptions?.stdio);

    // On Windows the default shell (cmd.exe) does not understand the POSIX-style
    // commands projen tasks are written in (`cat`, `cp`, `mkdir -p`, `rm -rf`,
    // `&&` chains, `$VAR`, ...). Run the command through dax's cross-platform
    // shell instead, which ships built-in implementations of the common
    // commands. Now that the task runtime is asynchronous we can drive dax's
    // `$` API directly instead of spawning a synchronous child node process.
    if (process.platform === "win32") {
      const result = await $.raw`${options.command}`
        .cwd(cwd)
        .env(env)
        .stdout(capture ? "piped" : "inherit")
        .stderr(capture ? "piped" : "inherit")
        .noThrow();

      return {
        status: result.code,
        stdout: capture ? Buffer.from(result.stdoutBytes) : null,
        stderr: capture ? Buffer.from(result.stderrBytes) : null,
      };
    }

    // On other platforms, run the command through the system shell via the
    // centralized `rawShell` helper.
    return rawShell.exec(options.command, { cwd, env, capture });
  }

  private async shellEval(options: ShellOptions): Promise<ShellResult> {
    return this.shell({
      quiet: true,
      ...options,
      spawnOptions: {
        stdio: ["inherit", "pipe", "pipe"],
      },
    });
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
  readonly command: string;
  /**
   * @default - project dir
   */
  readonly cwd?: string;
  readonly logprefix?: string;
  readonly spawnOptions?: SpawnOptions;
  /** @default false */
  readonly quiet?: boolean;
  readonly extraEnv?: { [name: string]: string | undefined };
}
