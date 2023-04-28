import { readFileSync } from "fs";
import { basename, dirname, extname, join, sep } from "path";
import * as semver from "semver";

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
  /^https:\/\/(?<registry>(?<domain>[^\.]+)-(?<accountId>\d{12})\.d\.codeartifact\.(?<region>[^\.]+).*\.amazonaws\.com\/.*\/(?<repository>\w+)\/)/;

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
 * Attempt to resolve the installed version of a given dependency.
 * @param dependencyName Name of dependency.
 * @param options Optional options passed through to `require.resolve`.
 */
export function tryResolveDependencyVersion(
  dependencyName: string,
  options?: { paths: string[] }
): string | undefined {
  const manifestId = `${dependencyName}/package.json`;
  try {
    const manifestPath = require.resolve(manifestId, options);
    // cannot just `require('dependency/package.json')` here because
    // `options.paths` may not overlap with this node proc's resolution paths.
    const manifest = JSON.parse(
      readFileSync(manifestPath, "utf-8").toString()
    ) as {
      version: string;
    };
    return manifest.version;
  } catch (e) {
    return undefined;
  }
}
