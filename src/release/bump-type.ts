/**
 * Symbolic representations of version bumps
 *
 * There are 3 types of bumps: no bump, a relative bump (increasing one component) or an absolute bump (a specific new version)
 */
import { inc, parse } from "semver";

export type BumpType =
  | RelativeBumpType
  | { bump: "absolute"; absolute: string };

export type RelativeBumpType =
  | { bump: "none" }
  | { bump: "relative"; relative: MajorMinorPatch };

// The only relative types that CATV supports
export type MajorMinorPatch = "major" | "minor" | "patch";

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
    return { bump: "relative", relative: "major" };
  }
  if (s0.minor !== s1.minor) {
    return { bump: "relative", relative: "minor" };
  }
  return { bump: "relative", relative: "patch" };
}

/**
 * Bump type to string
 */
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

/**
 * String to bump type
 */
export function parseBumpType(x: string): BumpType {
  if (x === "none") {
    return { bump: "none" };
  }
  if (isMajorMinorPatch(x)) {
    return { bump: "relative", relative: x };
  }
  if (isFullVersionString(x)) {
    return { bump: "absolute", absolute: x };
  }
  throw new Error(`Invalid version: ${x}`);
}

/**
 * Perform the given bump on the given version, returning the new version
 */
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

export function isMajorMinorPatch(v: string): v is MajorMinorPatch {
  return !!v.match(/^(major|minor|patch)$/);
}

function isFullVersionString(nextVersion: string) {
  return nextVersion.match(/^\d+\.\d+\.\d+(-[^\s]+)?$/);
}
