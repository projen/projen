/**
 * Compatibility shims for older Node.js runtimes.
 *
 * dax's bundled `which` resolves executables by loading `node:fs` through
 * `process.getBuiltinModule()`, an API that only exists since Node 22.3.0 /
 * 20.16.0 (and in no 18.x or older release). On older runtimes every stat
 * call inside `which` throws, the error is treated as "file does not exist",
 * and every task command fails with `dax: <cmd>: command not found`
 * regardless of PATH (https://github.com/projen/projen/issues/4846).
 *
 * projen declares `engines: node >= 16`, so polyfill the API with `require()`
 * on runtimes that lack it. dax reads it lazily on first command resolution,
 * so installing the polyfill at module load (before any task runs) is enough.
 */

import { builtinModules } from "module";

/**
 * Installs a `process.getBuiltinModule()` polyfill on the given process
 * object if it does not already provide one.
 *
 * Mirrors the real API: returns the builtin module for both `"fs"` and
 * `"node:fs"` style ids, and `undefined` for anything that is not a builtin
 * (the real API never resolves userland modules).
 */
export function polyfillGetBuiltinModule(proc: NodeJS.Process = process): void {
  if (typeof (proc as any).getBuiltinModule === "function") {
    return;
  }
  (proc as any).getBuiltinModule = (id: string) => {
    const bare = id.startsWith("node:") ? id.slice("node:".length) : id;
    if (!builtinModules.includes(bare)) {
      return undefined;
    }
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require(`node:${bare}`);
  };
}

polyfillGetBuiltinModule();
