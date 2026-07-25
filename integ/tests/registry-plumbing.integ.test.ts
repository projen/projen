import * as fs from "fs";
import { run } from "../src/engine/command";
import { eachAvailable, runProjenCli } from "../src/engine/package-managers";
import { NpmRegistry } from "../src/engine/registries/npm-verdaccio";
import { Workspace } from "../src/engine/workspace";
import { expectExit, expectStdoutContains } from "../src/engine/assertions";

/**
 * Verifies the registry + package-manager plumbing end-to-end WITHOUT requiring
 * a full projen build: a synthetic package named `projen` (a bin that prints
 * its version) is published to a local Verdaccio and then installed + executed
 * through every available Node package manager. This proves the matrix
 * machinery (Verdaccio start/publish, per-PM registry config, install, CLI
 * invocation) that the real language suites rely on.
 *
 * Fully offline: Verdaccio has no uplinks and the synthetic package has no
 * dependencies.
 */

const VERSION = "9999.0.0";

/** Builds a synthetic `projen` npm tarball whose bin prints VERSION. */
function packSyntheticProjen(): { tarball: string; dispose: () => void } {
  const ws = Workspace.create("synth-projen-");
  ws.write(
    "package.json",
    JSON.stringify({
      name: "projen",
      version: VERSION,
      bin: { projen: "bin/projen" },
    }),
  );
  ws.write(
    "bin/projen",
    `#!/usr/bin/env node\nprocess.stdout.write("${VERSION}\\n");\n`,
  );
  fs.chmodSync(ws.path("bin", "projen"), 0o755);
  run("npm", ["pack", "--pack-destination", ws.dir], {
    cwd: ws.dir,
    throwOnError: true,
  });
  const tgz = fs.readdirSync(ws.dir).find((f) => f.endsWith(".tgz"));
  if (!tgz) {
    throw new Error("npm pack did not produce a tarball");
  }
  return { tarball: ws.path(tgz), dispose: () => ws.dispose() };
}

let registry: NpmRegistry;
let synthetic: { tarball: string; dispose: () => void };

beforeAll(async () => {
  synthetic = packSyntheticProjen();
  registry = await NpmRegistry.start();
  await registry.publish(synthetic.tarball);
}, 120_000);

afterAll(async () => {
  await registry?.stop();
  synthetic?.dispose();
});

describe.each(eachAvailable())("node package manager: %s", (_id, pm) => {
  test("installs projen from the local registry and runs the CLI", () => {
    const ws = Workspace.create();
    try {
      pm.configureRegistry(ws.dir, registry.url);
      pm.install(ws.dir, `projen@${VERSION}`);

      const result = runProjenCli(ws.dir, ["--version"]);
      expectExit(result, 0);
      expectStdoutContains(result, VERSION);
    } finally {
      ws.dispose();
    }
  });
});
