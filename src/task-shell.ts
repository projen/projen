/**
 * The shell used to run a task's commands - including its `condition` and any
 * `$(...)` environment-variable evaluation.
 *
 * Choose one of the built-in shells, or provide an explicit shell invocation:
 *
 * - {@link TaskShell.projen} (the default) - the built-in cross-platform shell.
 * - {@link TaskShell.system} - the operating system's native shell.
 * - {@link TaskShell.bash} / {@link TaskShell.sh} - common POSIX shells.
 * - {@link TaskShell.command} - an arbitrary shell invocation given as an
 *   explicit argument list, e.g. `TaskShell.command(["npx", "-c"])`.
 *
 * A `shell` can be set at the project (tasks), task and step level, and the
 * nearest declared level wins (it is a scalar override, not merged).
 */
export class TaskShell {
  /**
   * The built-in cross-platform shell (the default). It interprets POSIX-style
   * task syntax (`mkdir -p`, `&&`, `$VAR`, ...) identically on every platform,
   * including Windows.
   */
  public static projen(): TaskShell {
    return new TaskShell("projen");
  }

  /**
   * The operating system's native shell (`/bin/sh` on POSIX, `cmd.exe` on
   * Windows).
   *
   * Use this to opt out of the cross-platform shell and run commands through
   * whatever shell the host provides.
   */
  public static system(): TaskShell {
    return new TaskShell("system");
  }

  /**
   * Runs commands through `bash -c`.
   */
  public static bash(): TaskShell {
    return new TaskShell(["bash", "-c"]);
  }

  /**
   * Runs commands through `sh -c`.
   */
  public static sh(): TaskShell {
    return new TaskShell(["sh", "-c"]);
  }

  /**
   * An arbitrary shell invocation, given as an explicit argument list. The task
   * command is appended as the final argument, so the invocation must accept
   * the command as its last argument (e.g. `bash -c`, `sh -c`, `npx -c`,
   * `yarn exec`).
   *
   *
   * @example TaskShell.command(["bash", "-c"]);
   * @example TaskShell.command(["npx", "-c"]);
   *
   * @param command The shell program followed by its arguments. Must not be
   * empty.
   */
  public static command(command: string[]): TaskShell {
    if (command.length === 0) {
      throw new Error(
        "TaskShell.command() requires at least the shell program",
      );
    }
    return new TaskShell([...command]);
  }

  private constructor(private readonly value: string | string[]) {}

  /**
   * Renders the shell to its `tasks.json` representation: a built-in keyword
   * string (`"projen"` or `"system"`) for the built-ins, or an explicit
   * argument list for a custom shell invocation.
   *
   * @internal
   */
  public _render(): string | string[] {
    return Array.isArray(this.value) ? [...this.value] : this.value;
  }
}
