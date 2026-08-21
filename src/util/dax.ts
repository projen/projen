/**
 * The only module allowed to import "dax" (enforced via eslint's
 * no-restricted-imports): it guarantees the Node compat shim is installed
 * before dax resolves any command.
 *
 * dax's bundled `which` loads `node:fs` through `process.getBuiltinModule()`,
 * which only exists since Node 22.3.0 / 20.16.0. Without the shim, every task
 * command fails with `dax: <cmd>: command not found` on older runtimes
 * (https://github.com/projen/projen/issues/4846). dax reads the API lazily on
 * first command resolution, so installing the shim at module load - even
 * though the import below makes dax itself load first - is early enough.
 */
import { polyfillGetBuiltinModule } from "./node-compat";
polyfillGetBuiltinModule();

// eslint-disable-next-line @typescript-eslint/no-restricted-imports,import/order
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
