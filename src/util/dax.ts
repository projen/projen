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
 * though the re-export below makes dax itself load first - is early enough.
 */
import { polyfillGetBuiltinModule } from "./node-compat";

polyfillGetBuiltinModule();

// eslint-disable-next-line @typescript-eslint/no-restricted-imports
export { $ } from "dax";
