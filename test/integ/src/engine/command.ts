import { spawnSync } from "child_process";

/**
 * Result of running a command.
 */
export interface CommandResult {
  /** The process exit code (0 on success). `null` if the process was killed by a signal. */
  readonly code: number | null;
  /** Captured standard output. */
  readonly stdout: string;
  /** Captured standard error. */
  readonly stderr: string;
  /** The command that was run (for diagnostics). */
  readonly command: string;
}

/**
 * Options for running a command.
 */
export interface RunOptions {
  /** Working directory to run the command in. */
  readonly cwd?: string;
  /**
   * Environment variables to overlay on top of `process.env`.
   * Values set to `undefined` are removed from the environment.
   */
  readonly env?: Record<string, string | undefined>;
  /**
   * Throw an error if the command exits with a non-zero code.
   * @default false
   */
  readonly throwOnError?: boolean;
  /** Maximum time in milliseconds the command may run before being killed. */
  readonly timeout?: number;
}

/**
 * Runs a command cross-platform, without a shell, capturing stdout/stderr.
 *
 * Running shell-free (`shell: false`) is deliberate: it avoids shell-injection
 * and cross-platform quoting differences between bash (unix) and cmd/PowerShell
 * (Windows). Arguments are passed as an array and never interpolated into a
 * shell string.
 *
 * On Windows, executables installed by npm expose a `.cmd` shim. `spawnSync`
 * cannot resolve those shims without a shell, so we resolve the platform
 * appropriate binary name here.
 */
export function run(
  command: string,
  args: string[] = [],
  options: RunOptions = {},
): CommandResult {
  const env: Record<string, string> = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (value !== undefined) {
      env[key] = value;
    }
  }
  for (const [key, value] of Object.entries(options.env ?? {})) {
    if (value === undefined) {
      delete env[key];
    } else {
      env[key] = value;
    }
  }

  const resolved = resolveCommand(command);

  const result = spawnSync(resolved, args, {
    cwd: options.cwd,
    env,
    encoding: "utf-8",
    timeout: options.timeout,
    // Never use a shell - see the doc comment above.
    shell: false,
    // Windows needs `.cmd`/`.bat` shims to be run with cmd; setting
    // windowsVerbatimArguments false lets Node quote arguments correctly.
    windowsHide: true,
  });

  const displayCommand = [resolved, ...args].join(" ");

  if (result.error) {
    // e.g. ENOENT when the binary is not found.
    if (options.throwOnError) {
      throw new Error(
        `Command failed to start: ${displayCommand}\n${result.error.message}`,
      );
    }
    return {
      code: null,
      stdout: result.stdout ?? "",
      stderr: (result.stderr ?? "") + String(result.error.message),
      command: displayCommand,
    };
  }

  const res: CommandResult = {
    code: result.status,
    stdout: result.stdout ?? "",
    stderr: result.stderr ?? "",
    command: displayCommand,
  };

  if (options.throwOnError && res.code !== 0) {
    throw new Error(
      `Command failed (exit ${res.code}): ${displayCommand}\n` +
        `stdout:\n${res.stdout}\nstderr:\n${res.stderr}`,
    );
  }

  return res;
}

/**
 * On Windows, many CLIs are installed as `<name>.cmd` shims. Node's spawn
 * (without a shell) will not append the extension automatically, so we do it
 * here. Absolute/relative paths and `node` itself are used verbatim.
 */
function resolveCommand(command: string): string {
  if (process.platform !== "win32") {
    return command;
  }
  // Leave explicit paths and executables that already carry an extension alone.
  if (command.includes("/") || command.includes("\\") || command.includes(".")) {
    return command;
  }
  // `node` is a real .exe on Windows; everything else npm installs as `.cmd`.
  if (command === "node") {
    return command;
  }
  return `${command}.cmd`;
}
