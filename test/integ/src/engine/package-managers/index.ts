import { NODE_PACKAGE_MANAGERS } from "./node";
import type { PackageManager } from "./types";

export * from "./types";
export { NODE_PACKAGE_MANAGERS, runProjenCli } from "./node";

/**
 * Filters a list of package managers down to those available on the current
 * machine, formatted for use with Jest's `test.each` / `describe.each`.
 *
 * Returns tuples of `[id, packageManager]` so test titles read nicely, e.g.
 * `describe.each(eachAvailable(NODE_PACKAGE_MANAGERS))("%s", (_, pm) => ...)`.
 *
 * If none are available (unlikely - npm ships with Node), returns a single
 * sentinel row so the suite reports a skip instead of "no tests found".
 */
export function eachAvailable(
  managers: PackageManager[] = NODE_PACKAGE_MANAGERS,
): Array<[string, PackageManager]> {
  const available = managers.filter((m) => m.isAvailable());
  return available.map((m) => [m.id, m]);
}
