// Builtin task (step 3 of `bump`): decides the commit-derived bump type from
// the `releasable-commits` output and prints it, capturing it into
// `SUGGESTED_BUMP`.
//
// Inputs (env): OUTFILE, CHANGELOG, LATEST_TAG, RELEASE_TAG_PREFIX, PRERELEASE,
// BUMP_PACKAGE, VERSIONRCOPTIONS, RELEASABLE_COMMITS.

import { renderBumpType } from "./bump-type";
import { suggestVersionBump } from "./bump-version";
import { requireEnv, runBuiltin } from "../util/task-env";

runBuiltin(async () => {
  const bumpType = await suggestVersionBump(process.cwd(), {
    versionFile: requireEnv("OUTFILE"),
    changelog: requireEnv("CHANGELOG"),
    latestTag: process.env.LATEST_TAG,
    tagPrefix: process.env.RELEASE_TAG_PREFIX,
    prerelease: process.env.PRERELEASE || undefined,
    bumpPackage: process.env.BUMP_PACKAGE,
    versionrcOptions: JSON.parse(process.env.VERSIONRCOPTIONS ?? "{}"),
    releasableCommits: process.env.RELEASABLE_COMMITS,
  });
  process.stdout.write(renderBumpType(bumpType));
});
