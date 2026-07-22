// eslint-disable-next-line @typescript-eslint/no-require-imports
import spawn = require("cross-spawn");

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
 * Uses `cross-spawn`, which resolves Windows `.cmd`/`.bat` shims (npm, yarn,
 * mvn, ...) and `PATHEXT` executables (`go.exe`) correctly without a shell.
 * Running shell-free is deliberate: it avoids shell-injection and the quoting
 * differences between bash and cmd/PowerShell. Arguments are passed as an array
 * and never interpolated into a shell string.
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

  const result = spawn.sync(command, args, {
    cwd: options.cwd,
    env,
    encoding: "utf-8",
    timeout: options.timeout,
    windowsHide: true,
  });

  const displayCommand = [command, ...args].join(" ");

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
