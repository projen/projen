// Builtin task (step 1 of `bump`): resolves the latest tag/version, seeds the
// version file, and prints the latest tag so it is captured into `LATEST_TAG`
// for the later steps. On a first release the tag is printed as empty, which is
// how the later phases detect "first release".
//
// Inputs (env): OUTFILE, RELEASE_TAG_PREFIX, MAJOR, MINOR, MIN_MAJOR,
// PRERELEASE.

import { resolveLatestTag } from "./bump-version";
import { intEnv, requireEnv, runBuiltin } from "../util/task-env";

runBuiltin(async () => {
  const context = await resolveLatestTag(process.cwd(), {
    versionFile: requireEnv("OUTFILE"),
    tagPrefix: process.env.RELEASE_TAG_PREFIX,
    majorVersion: intEnv("MAJOR"),
    minorVersion: intEnv("MINOR"),
    minMajorVersion: intEnv("MIN_MAJOR"),
    prerelease: process.env.PRERELEASE || undefined,
  });
  process.stdout.write(context.isFirstRelease ? "" : context.latestTag);
});
