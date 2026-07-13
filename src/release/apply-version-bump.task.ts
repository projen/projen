// Builtin task (final step of `bump`): applies the chosen bump. Uses the
// `next-version` output (`BUMP_TYPE`) when present, otherwise the commit-derived
// `SUGGESTED_BUMP`, then invokes CATV and records the resulting version/tag.
//
// Inputs (env): OUTFILE, CHANGELOG, BUMPFILE, RELEASETAG, LATEST_TAG,
// RELEASE_TAG_PREFIX, PRERELEASE, BUMP_PACKAGE, VERSIONRCOPTIONS, MAJOR, MINOR,
// MIN_MAJOR, BUMP_TYPE, SUGGESTED_BUMP.

import type { BumpType } from "./bump-type";
import { parseBumpType } from "./bump-type";
import { applyVersionBump } from "./bump-version";
import { intEnv, requireEnv, runBuiltin } from "../util/task-env";

runBuiltin(async () => {
  // `next-version` (BUMP_TYPE) overrides the commit-derived bump (SUGGESTED_BUMP).
  const override = process.env.BUMP_TYPE?.trim();
  const suggested = process.env.SUGGESTED_BUMP?.trim();

  let bumpType: BumpType;
  if (override) {
    try {
      bumpType = parseBumpType(override);
    } catch (e) {
      throw new Error(`nextVersionCommand returned invalid output: ${e}`);
    }
  } else if (suggested) {
    bumpType = parseBumpType(suggested);
  } else {
    throw new Error("neither BUMP_TYPE nor SUGGESTED_BUMP is set");
  }

  await applyVersionBump(process.cwd(), {
    versionFile: requireEnv("OUTFILE"),
    changelog: requireEnv("CHANGELOG"),
    bumpFile: requireEnv("BUMPFILE"),
    releaseTagFile: requireEnv("RELEASETAG"),
    bumpType,
    latestTag: process.env.LATEST_TAG,
    tagPrefix: process.env.RELEASE_TAG_PREFIX,
    prerelease: process.env.PRERELEASE || undefined,
    bumpPackage: process.env.BUMP_PACKAGE,
    versionrcOptions: JSON.parse(process.env.VERSIONRCOPTIONS ?? "{}"),
    majorVersion: intEnv("MAJOR"),
    minorVersion: intEnv("MINOR"),
    minMajorVersion: intEnv("MIN_MAJOR"),
  });
});
