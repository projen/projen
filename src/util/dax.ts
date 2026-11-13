import { $ } from "dax";
export { $ };

/**
 * Renders an argv into a single escaped command line.
 *
 * Safe for a task `exec` command: every element arrives as exactly one
 * argument, so whitespace and metacharacters are never interpreted. Works in
 * any POSIX shell and dax's built-in one, but not in `cmd.exe`.
 *
 * @example escapeCommand(["echo", "some text with spaces"]); // echo 'some text with spaces'
 */
export function escapeCommand(argv: string[]): string {
  return argv.map((arg) => $.escapeArg(arg)).join(" ");
}
