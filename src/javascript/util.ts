import { existsSync, readFileSync } from "fs";
import { basename, dirname, extname, join, sep, resolve } from "path";
import * as semver from "semver";
import { findUp } from "../util";

/**
 * Basic interface for `package.json`.
 */
interface PackageManifest {
  [key: string]: any;

  /**
   * Package name.
   */
  name: string;
  /**
   * Package version.
   */
  version: string;
}

export function renderBundleName(entrypoint: string) {
  const parts = join(entrypoint).split(sep);
  if (parts[0] === "src") {
    parts.shift(); // just remove 'src' if its the first element for ergonomics
  }

  const p = parts.join(sep);
  const dir = dirname(p);
  const base = basename(p, extname(p));
  return join(dir, base);
}

/**
 * Regex for AWS CodeArtifact registry
 */
export const codeArtifactRegex =
  /^https:\/\/(?<registry>(?<domain>[^\.]+)-(?<accountId>\d{12})\.d\.codeartifact\.(?<region>[^\.]+).*\.amazonaws\.com\/.*\/(?<repository>[^\/.]+)\/)/;

/**
 * gets AWS details from the Code Artifact registry URL
 * throws exception if not matching expected pattern
 * @param registryUrl Code Artifact registry URL
 * @returns object containing the (domain, accountId, region, repository)
 */
export function extractCodeArtifactDetails(registryUrl: string) {
  const match = registryUrl.match(codeArtifactRegex);
  if (match?.groups) {
    const { domain, accountId, region, repository, registry } = match.groups;
    return { domain, accountId, region, repository, registry };
  }
  throw new Error("Could not get CodeArtifact details from npm Registry");
}

export function minVersion(version: string): string | undefined {
  if (semver.validRange(version)) {
    return semver.minVersion(version)?.version;
  } else {
    return version;
  }
}

/**
 * Attempt to resolve location of the given `moduleId`.
 * @param moduleId Module ID to lookup.
 * @param options Passed through to `require.resolve`.
 */
export function tryResolveModule(
  moduleId: string,
  options?: { paths: string[] }
): string | undefined {
  try {
    return require.resolve(moduleId, options);
  } catch {
    return undefined;
  }
}

/**
 * Attempt to resolve a module's manifest (package.json) path via `require.resolve` lookup.
 *
 * @remarks
 * If the target package has `exports` that differ from the default
 * (i.e, it defines the `exports` field in its manifest) and does not
 * explicitly include an entry for `package.json`, this strategy will fail.
 * See {@link tryResolveManifestPathFromDefaultExport} as an alternative.
 *
 * @param moduleId Module ID to lookup.
 * @param options Passed through to `require.resolve`.
 */
export function tryResolveModuleManifestPath(
  moduleId: string,
  options?: { paths: string[] }
): string | undefined {
  // cannot just `require('dependency/package.json')` here because
  // `options.paths` may not overlap with this node proc's resolution paths.
  const manifestId = `${moduleId}/package.json`;
  return tryResolveModule(manifestId, options);
}

/**
 * Attempt to resolve a module's manifest (package.json) path by looking for the nearest
 * `package.json` file that is an ancestor to the module's default export location.
 *
 * @param moduleId Module ID to lookup.
 * @param options Passed through to `require.resolve`.
 */
export function tryResolveManifestPathFromDefaultExport(
  moduleId: string,
  options?: { paths: string[] }
): string | undefined {
  const defaultExportPath = tryResolveModule(moduleId, options);
  if (!defaultExportPath) {
    return undefined;
  }
  const moduleDir = findUp("package.json", defaultExportPath);
  if (!moduleDir) {
    return undefined;
  }
  return join(moduleDir, "package.json");
}

/**
 * Attempt to resolve a module's manifest (package.json) path by checking for its existence under `node_modules` relative to `basePath`.
 *
 * @remarks
 * This strategy can be helpful in the scenario that a module defines
 * custom exports without `package.json` and no default export (i.e, some type definition packages).
 *
 * @param moduleId Module ID to lookup.
 * @param basePath Root path to search from.
 */
export function tryResolveManifestPathFromPath(
  moduleId: string,
  basePath: string
) {
  const base = basePath.includes("node_modules")
    ? basePath
    : join(basePath, "node_modules");
  const filePath = resolve(base, ...moduleId.split("/"), "package.json");
  if (existsSync(filePath)) {
    return filePath;
  }
  return undefined;
}

/**
 * Attempt to resolve a module's manifest (package.json) path by searching for it in the optionally provided paths array
 * as well as the current node processes' default resolution paths.
 * @param moduleId Module ID to search for.
 * @param options Search options.
 */
export function tryResolveManifestPathFromSearch(
  moduleId: string,
  options?: { paths: string[] }
): string | undefined {
  const searchPaths = [
    ...(options?.paths ?? []),
    ...(require.resolve.paths(moduleId) ?? []),
  ];
  for (const path of searchPaths) {
    const result = tryResolveManifestPathFromPath(moduleId, path);
    // early return on first result.
    if (result) {
      return result;
    }
  }
  return undefined;
}

/**
 * Attempt to resolve a module's manifest (package.json) using multiple strategies.
 * @param moduleId Module to resolve manifest path for.
 * @param options Resolution options.
 */
export function tryResolveModuleManifest(
  moduleId: string,
  options?: { paths: string[] }
): PackageManifest | undefined {
  const strategies = [
    tryResolveModuleManifestPath,
    tryResolveManifestPathFromDefaultExport,
    tryResolveManifestPathFromSearch,
  ];
  for (const strategy of strategies) {
    const result = strategy(moduleId, options);
    // early return on first result.
    if (result) {
      try {
        const manifest = JSON.parse(
          readFileSync(result, "utf8")
        ) as PackageManifest;
        // verify name matches target module.
        if (manifest.name === moduleId) {
          return manifest;
        }
      } catch {
        // continue to next strategy.
      }
    }
  }
  return undefined;
}

/**
 * Attempt to resolve the installed version of a given dependency.
 * @param dependencyName Name of dependency.
 * @param options Optional options passed through to `require.resolve`.
 */
export function tryResolveDependencyVersion(
  dependencyName: string,
  options?: { paths: string[] }
): string | undefined {
  const manifest = tryResolveModuleManifest(dependencyName, options);
  if (!manifest) {
    return undefined;
  }
  return manifest?.version;
}

/**
 * Whether the given requestedRange *probably* leads to the installation of a version that matches checkRange
 *
 * We assume that NPM always installs the most recent version of a package that
 * is allowed by the requestedRange.
 */
export function installedVersionProbablyMatches(
  requestedRange: string,
  checkRange: string
): boolean {
  const options = {
    includePrerelease: true,
    loose: true,
  };

  // No questions asked: always true
  if (semver.subset(requestedRange, checkRange, options)) {
    return true;
  }

  // Also no questions asked: always false
  if (!semver.intersects(requestedRange, checkRange, options)) {
    return false;
  }

  // Now we're in tricky territory. We intersect, but aren't a full subset.
  // We are in one of the following 2 situations, which we will tie-break by
  // assuming NPM will install the most recent matching version in 'requested'.
  //
  // requested  | check    | result
  // -----------|----------|-----------
  //   >= 2     |  >= 3    | probably true (chance of FP)
  //   <= 2     |  <= 1    | probably false (change of FN)
  //
  // `semver` doesn't make it easy to distinguish these cases (we can't request
  // the `maxVersion` that satisfies a range). Instead what we do is
  // get the `minVersion` of each range, and if they compare equal we assume
  // we're in the bottom case with `<=` checks, and return `false`.

  return !semver.eq(
    semver.minVersion(requestedRange, options) ?? "1.2.3",
    semver.minVersion(checkRange, options) ?? "1.2.3"
  );
}
