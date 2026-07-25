import { Artifacts } from "./engine/artifacts";
import { run } from "./engine/command";
import { eachAvailable } from "./engine/package-managers";
import type { PackageManager } from "./engine/package-managers";

export { Artifacts } from "./engine/artifacts";
export { NpmRegistry } from "./engine/registries/npm-verdaccio";
export { Workspace, withWorkspace } from "./engine/workspace";
export * from "./engine/assertions";
export {
  NODE_PACKAGE_MANAGERS,
  eachAvailable,
  runProjenCli,
} from "./engine/package-managers";

/**
 * Resolves the prebuilt artifacts, or returns `undefined` if the build output
 * is missing. Lets suites skip cleanly (rather than error) when run without a
 * prior `package-all`.
 */
export function tryArtifacts(): Artifacts | undefined {
  try {
    return Artifacts.resolve();
  } catch {
    return undefined;
  }
}

/** Returns the npm tarball path if it exists, otherwise `undefined`. */
export function tryNpmTarball(): string | undefined {
  try {
    return tryArtifacts()?.npmTarball;
  } catch {
    return undefined;
  }
}

/**
 * The available Node package managers as `[id, pm]` rows for `describe.each`.
 * Skips gracefully to a sentinel row if somehow none are available.
 */
export function nodePackageManagerCases(): Array<[string, PackageManager]> {
  return eachAvailable();
}

/** Whether a language toolchain binary is present (e.g. `python3`, `go`, `mvn`). */
export function toolAvailable(bin: string, versionArg = "--version"): boolean {
  return run(bin, [versionArg]).code === 0;
}
