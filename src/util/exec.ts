import * as child_process from "child_process";
import { $ } from "dax";
import * as logging from "../logging";

const MAX_BUFFER = 10 * 1024 * 1024;

//
// ---------------------------------------------------------------------------
// Shell-free execution (execFileSync, shell: false).
//
// The program and each argument are passed to the OS directly without going
// through a shell, so there is no quoting to get right and no differences
// between platform shells to account for when commands include values derived
// from files, git output, configuration, etc.
//
// Only per-tool helpers are exported (e.g. `git`); the generic primitives are
// kept private so call sites are explicit about which tool they invoke.
// ---------------------------------------------------------------------------
//

/**
 * Options for shell-free command execution.
 */
export interface ExecFileOptions {
  /**
   * Working directory for the command.
   */
  readonly cwd: string;

  /**
   * Additional environment variables, merged on top of `process.env`.
   */
  readonly env?: Record<string, string | undefined>;
}

/**
 * Options for {@link Tool.run}.
 */
export interface RunOptions extends ExecFileOptions {
  /**
   * Stream the child's stdout and stderr straight to the parent's stdout and
   * stderr (full inheritance), instead of redirecting stdout to stderr and
   * capturing stderr (the default).
   *
   * Use this when launching a child process whose stdout is meaningful and
   * whose output should stream live to the user (e.g. the projen CLI).
   *
   * @default false
   */
  readonly inheritStdio?: boolean;
}

function spawnOpts(options: ExecFileOptions) {
  return {
    maxBuffer: MAX_BUFFER,
    cwd: options.cwd,
    env: options.env ? { ...process.env, ...options.env } : undefined,
    // run the program directly, without going through a shell
    shell: false as const,
  };
}

/**
 * Runs a program with the given arguments, inheriting stdout. Throws if the
 * command exits with a non-zero status.
 */
function run(file: string, args: string[], options: RunOptions): void {
  logging.debug(`${file} ${args.join(" ")} (cwd: ${options.cwd})`);

  child_process.execFileSync(file, args, {
    ...spawnOpts(options),
    // By default the child's stdout is redirected to STDERR (to keep the
    // parent's STDOUT clean) and its STDERR is piped so it surfaces in
    // exceptions. `inheritStdio` instead streams both straight to the parent.
    stdio: options.inheritStdio ? "inherit" : ["inherit", 2, "pipe"],
  });
}

/**
 * Runs a program and returns its trimmed STDOUT. Throws if the command exits
 * with a non-zero status.
 */
function capture(
  file: string,
  args: string[],
  options: ExecFileOptions,
): string {
  logging.debug(`${file} ${args.join(" ")} (cwd: ${options.cwd})`);

  return child_process
    .execFileSync(file, args, {
      ...spawnOpts(options),
      stdio: ["inherit", "pipe", "pipe"], // "pipe" for STDERR means it appears in exceptions
    })
    .toString("utf-8")
    .trim();
}

/**
 * Runs a program and returns its trimmed STDOUT, or `undefined` if the command
 * failed or produced no output.
 */
function tryCapture(
  file: string,
  args: string[],
  options: ExecFileOptions,
): string | undefined {
  logging.debug(`${file} ${args.join(" ")} (cwd: ${options.cwd})`);

  try {
    const value = child_process
      .execFileSync(file, args, {
        ...spawnOpts(options),
        stdio: ["inherit", "pipe", "pipe"], // "pipe" for STDERR means it appears in exceptions
      })
      .toString("utf-8")
      .trim();

    // an empty string is the same as undefined
    return value || undefined;
  } catch {
    return undefined;
  }
}

/**
 * A shell-free handle for invoking a single program by name or path.
 *
 * Each argument is passed to the program verbatim (no shell parsing), so there
 * is no quoting to get right for values such as tags, versions, branch names
 * or file paths.
 *
 * Note: the program is executed directly, without a shell. On Windows this
 * means it must be a real executable - `.cmd`/`.bat` shims (such as
 * npm-installed CLIs like npm/npx/yarn/pnpm) cannot be invoked this way.
 */
export interface Tool {
  /**
   * Runs `<tool> <args>`, inheriting stdout. Throws on non-zero exit.
   */
  run(args: string[], options: RunOptions): void;

  /**
   * Runs `<tool> <args>` and returns its trimmed STDOUT. Throws on non-zero exit.
   */
  capture(args: string[], options: ExecFileOptions): string;

  /**
   * Runs `<tool> <args>` and returns its trimmed STDOUT, or `undefined` if the
   * command failed or produced no output.
   */
  tryCapture(args: string[], options: ExecFileOptions): string | undefined;
}

/**
 * Creates a shell-free {@link Tool} for the given program.
 *
 * @example const git = tool("git"); git.run(["tag", "--delete", tag], { cwd });
 */
export function tool(file: string): Tool {
  return {
    run: (args, options) => run(file, args, options),
    capture: (args, options) => capture(file, args, options),
    tryCapture: (args, options) => tryCapture(file, args, options),
  };
}

/**
 * Shell-free helper for invoking `git`.
 *
 * @example git.run(["tag", "--delete", tag], { cwd });
 */
export const git = tool("git");

/**
 * Shell-free helper for invoking `uv` (ships as a native binary on all
 * platforms).
 */
export const uv = tool("uv");

/**
 * Shell-free helper for invoking `poetry`.
 */
export const poetry = tool("poetry");

/**
 * Shell-free helper for invoking the current Node.js executable
 * (`process.execPath`).
 */
export const node = tool(process.execPath);

//
// ---------------------------------------------------------------------------
// Cross-platform execution via dax (for binaries that may be `.cmd` shims).
//
// `tool` above uses `execFileSync` with `shell: false`, which cannot launch
// Windows `.cmd`/`.bat` shims such as `npx` or `npm`. `shimTool` runs through
// dax, which resolves those shims cross-platform. Arguments are interpolated
// through dax's escaping (NOT `$.raw`), so each value is passed as a single
// literal argument with no quoting to get right. dax is asynchronous, so
// these helpers are only usable from async call sites.
// ---------------------------------------------------------------------------
//

/**
 * Async, dax-backed equivalent of {@link Tool} for programs that may be a
 * Windows `.cmd`/`.bat` shim (e.g. `npx`, `npm`).
 */
export interface AsyncTool {
  /**
   * Runs `<tool> <args>`, inheriting stdout. Rejects on non-zero exit.
   */
  run(args: string[], options: ExecFileOptions): Promise<void>;

  /**
   * Runs `<tool> <args>` and resolves its trimmed STDOUT. Rejects on non-zero
   * exit.
   */
  capture(args: string[], options: ExecFileOptions): Promise<string>;
}

/**
 * Creates an {@link AsyncTool} that invokes `file` via dax, resolving Windows
 * `.cmd`/`.bat` shims and escaping every argument (so each value is passed as
 * a single literal argument).
 *
 * @example await npx.run(["commit-and-tag-version@^12"], { cwd });
 */
function shimTool(file: string): AsyncTool {
  const build = (args: string[], options: ExecFileOptions) => {
    const cmd = $`${file} ${args}`.cwd(options.cwd).stderr("piped").noThrow();
    return options.env ? cmd.env(options.env) : cmd;
  };
  const ensureOk = (
    args: string[],
    result: { code: number; stderr: string },
  ) => {
    if (result.code !== 0) {
      // Mimic the `child_process` error shape (`status`, `stderr`) so callers
      // can inspect stderr (e.g. to detect ENOENT/E404 from npm).
      const error: any = new Error(
        `Command failed (exit code ${result.code}): ${file} ${args.join(" ")}`,
      );
      error.status = result.code;
      error.stderr = Buffer.from(result.stderr);
      throw error;
    }
  };
  return {
    run: async (args, options) => {
      logging.debug(`${file} ${args.join(" ")} (cwd: ${options.cwd})`);
      ensureOk(args, await build(args, options));
    },
    capture: async (args, options) => {
      logging.debug(`${file} ${args.join(" ")} (cwd: ${options.cwd})`);
      const result = await build(args, options).stdout("piped");
      ensureOk(args, result);
      return result.stdout.trim();
    },
  };
}

/**
 * Cross-platform helper for `npm` (a Windows `.cmd` shim).
 */
export const npm = shimTool("npm");

/**
 * Cross-platform helper for `npx` (a Windows `.cmd` shim).
 */
export const npx = shimTool("npx");

//
// ---------------------------------------------------------------------------
// rawShell: arbitrary shell command strings (via the system shell).
//
// This runs an opaque command *string* through the operating system's default
// shell (`/bin/sh` on POSIX, `cmd.exe` on Windows) - the same mechanism the
// codebase used previously. It is meant for command lines that cannot be
// expressed as a fixed binary plus a list of arguments, e.g. a release's
// `nextVersionCommand` or `ReleasableCommits.exec()` (and projen's own
// generated `ReleasableCommits` queries), as well as task steps on non-Windows
// platforms. For everything else prefer the structured `tool`/`git` helpers
// (or `shimTool` for `.cmd` shims), which take an explicit list of arguments.
// ---------------------------------------------------------------------------
//

/**
 * Normalized result of running a command through the system shell. This is a
 * subset of node's `SpawnSyncReturns` shape.
 */
export interface RawShellResult {
  /**
   * The exit code, or `null` if the process was terminated by a signal or
   * never spawned.
   */
  readonly status: number | null;

  /**
   * Captured stdout, or `null` when stdout was inherited (not captured).
   */
  readonly stdout: Buffer | null;

  /**
   * Captured stderr, or `null` when stderr was inherited (not captured).
   */
  readonly stderr: Buffer | null;

  /**
   * An error raised while attempting to spawn the command (not a non-zero
   * exit, which is reported via `status`).
   */
  readonly error?: Error;
}

/**
 * Options for {@link rawShell.exec}.
 */
export interface RawShellExecOptions {
  /**
   * Working directory for the command.
   */
  readonly cwd: string;

  /**
   * The full environment for the command. Passed through to the shell as-is
   * (it is *not* merged with `process.env`), so callers that want to inherit
   * the parent environment must include it themselves.
   */
  readonly env?: NodeJS.ProcessEnv;

  /**
   * Capture stdout/stderr (so the caller can read them from the result)
   * instead of inheriting the parent's streams.
   *
   * @default false
   */
  readonly capture?: boolean;
}

/**
 * Options for {@link rawShell.capture} / {@link rawShell.tryCapture}.
 */
export interface RawShellCaptureOptions {
  /**
   * Working directory for the command.
   */
  readonly cwd: string;

  /**
   * Additional environment variables, merged on top of `process.env`.
   */
  readonly env?: Record<string, string>;
}

export const rawShell = {
  /**
   * Runs a command line through the system shell and returns a normalized
   * result. Never throws for a non-zero exit (that is reported via `status`);
   * a spawn failure is reported via `error`.
   *
   * The caller is responsible for supplying the full `env`.
   */
  exec(command: string, options: RawShellExecOptions): RawShellResult {
    logging.debug(`${command} (cwd: ${options.cwd})`);

    const result = child_process.spawnSync(command, {
      cwd: options.cwd,
      shell: true,
      maxBuffer: MAX_BUFFER,
      env: options.env,
      // "pipe" for STDERR (when capturing) means it appears in exceptions.
      stdio: options.capture ? ["inherit", "pipe", "pipe"] : "inherit",
    });

    return {
      status: result.status,
      stdout: result.stdout ?? null,
      stderr: result.stderr ?? null,
      error: result.error,
    };
  },

  /**
   * Runs a user-supplied shell command line and resolves its trimmed STDOUT.
   * Rejects if the command exits non-zero.
   */
  capture: async (
    command: string,
    options: RawShellCaptureOptions,
  ): Promise<string> => {
    const result = rawShell.exec(command, {
      cwd: options.cwd,
      env: { ...process.env, ...options.env },
      capture: true,
    });
    if (result.error) {
      throw result.error;
    }
    if (result.status !== 0) {
      const error: any = new Error(
        `Command failed (exit code ${result.status}): ${command}`,
      );
      error.status = result.status;
      error.stderr = result.stderr;
      throw error;
    }
    return (result.stdout?.toString("utf-8") ?? "").trim();
  },

  /**
   * Runs a user-supplied shell command line and resolves its trimmed STDOUT,
   * or `undefined` if the command failed or produced no output.
   */
  tryCapture: async (
    command: string,
    options: RawShellCaptureOptions,
  ): Promise<string | undefined> => {
    const result = rawShell.exec(command, {
      cwd: options.cwd,
      env: { ...process.env, ...options.env },
      capture: true,
    });
    if (result.error || result.status !== 0) {
      return undefined;
    }
    const out = (result.stdout?.toString("utf-8") ?? "").trim();
    return out || undefined;
  },
};
