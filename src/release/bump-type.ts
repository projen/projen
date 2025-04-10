import { inc, parse, ReleaseType } from "semver";

export type BumpType =
  | RelativeBumpType
  | { bump: "absolute"; absolute: string };

export type RelativeBumpType =
  | { bump: "none" }
  | { bump: "relative"; relative: ReleaseType };

/**
 * Reverse engineer the bump type from two version
 *
 * We have to do this because `commit-and-tag-version` will not just tell
 * us the type of bump it performed, it only prints the new version.
 */
export function relativeBumpType(v0: string, v1: string): RelativeBumpType {
  const s0 = parse(v0);
  if (!s0) {
    throw new Error(`Not a parseable version: ${v0}`);
  }
  const s1 = parse(v1);
  if (!s1) {
    throw new Error(`Not a parseable version: ${v1}`);
  }

  // Discards the build qualifier (`+12345`)
  if (s0.version === s1.version) {
    return { bump: "none" };
  }

  if (s0.major !== s1.major) {
    return { bump: "relative", relative: "minor" };
  }
  if (s0.minor !== s1.minor) {
    return { bump: "relative", relative: "minor" };
  }
  if (s0.patch !== s1.patch) {
    return { bump: "relative", relative: "patch" };
  }
  return { bump: "relative", relative: "prerelease" };
}

export function renderBumpType(bumpType: BumpType) {
  switch (bumpType.bump) {
    case "none":
      return "none";
    case "relative":
      return bumpType.relative;
    case "absolute":
      return bumpType.absolute;
  }
}

export function performBump(baseVersion: string, bumpType: BumpType): string {
  switch (bumpType.bump) {
    case "none":
      return baseVersion;
    case "absolute":
      return bumpType.absolute;
    case "relative":
      const inced = inc(baseVersion, bumpType.relative);
      if (!inced) {
        throw new Error(
          `Could not bump version: ${baseVersion}, type ${bumpType.relative}`
        );
      }
      return inced.toString();
  }
}

export function parseBumpType(x: string): BumpType {
  if (x === "none") {
    return { bump: "none" };
  }
  if (isReleaseType(x)) {
    return { bump: "relative", relative: x };
  }
  if (isFullVersionString(x)) {
    return { bump: "absolute", absolute: x };
  }
  throw new Error(`Invalid version: ${x}`);
}

export function isReleaseType(v: string): v is ReleaseType {
  // We are not recognizing all of them yet. That's fine for now.
  return !!v.match(/^(major|minor|patch|prerelease)$/);
}

function isFullVersionString(nextVersion: string) {
  return nextVersion.match(/^\d+\.\d+\.\d+(-[^\s]+)?$/);
}
