import * as fs from "fs";
import * as path from "path";
import * as glob from "fast-glob";
import { findRepoRoot } from "../src/engine/artifacts";
import {
  Artifacts,
  NpmRegistry,
  Workspace,
  directorySnapshot,
  expectExit,
  nodePackageManagerCases,
  sanitizeProjenVersion,
  tryNpmTarball,
} from "../src/integ-test";
import { run } from "../src/engine/command";

/**
 * projenrc snapshot suite. Ports test/integ.test.ts.
 *
 * Discovers the `**\/*.projenrc.js` fixtures under the repo's test/integration
 * directory, synthesizes each against the INSTALLED (packaged) projen - not a
 * source symlink - sanitizes non-deterministic version numbers, and snapshots
 * the generated files.
 */

const SAMPLES = path.join(findRepoRoot(__dirname), "test", "integration");
const fixtures = fs.existsSync(SAMPLES)
  ? glob.sync("**/*.projenrc.js", { cwd: SAMPLES })
  : [];

const hasTarball = !!tryNpmTarball();
const suite = hasTarball && fixtures.length > 0 ? describe : describe.skip;

if (!hasTarball) {
  // eslint-disable-next-line no-console
  console.warn(
    "[projenrc-snapshot] skipped: no dist/js tarball. Run `npx projen package:js` first.",
  );
}

suite("projenrc snapshot", () => {
  let registry: NpmRegistry;
  let version: string;

  beforeAll(async () => {
    const artifacts = Artifacts.resolve();
    version = artifacts.version;
    registry = await NpmRegistry.start();
    await registry.publish(artifacts.npmTarball);
  }, 120_000);

  afterAll(async () => {
    await registry?.stop();
  });

  test.each(fixtures)("%s", (fixture) => {
    const npm = nodePackageManagerCases().find(([id]) => id === "npm")?.[1];
    if (!npm) {
      throw new Error("npm is not available");
    }

    const ws = Workspace.create();
    try {
      // Copy any sibling fixture files, then the projenrc itself as .projenrc.js.
      const base = path.join(SAMPLES, path.dirname(fixture));
      if (path.resolve(base) !== path.resolve(SAMPLES)) {
        copyDirSync(base, ws.dir);
      }
      fs.copyFileSync(
        path.join(SAMPLES, fixture),
        path.join(ws.dir, ".projenrc.js"),
      );

      // Install the packaged projen so `require("projen")` resolves to it.
      npm.configureRegistry(ws.dir, registry.url);
      npm.install(ws.dir, `projen@${version}`);

      // Synthesize by running the projenrc directly, post-synth disabled.
      const synth = run("node", [".projenrc.js"], {
        cwd: ws.dir,
        env: { PROJEN_DISABLE_POST: "1", NODE_ENV: undefined },
        timeout: 600_000,
      });
      expectExit(synth, 0);

      // Normalize the projen version so snapshots survive releases.
      sanitizeProjenVersion(ws.dir);

      expect(
        directorySnapshot(ws.dir, {
          excludeGlobs: [
            "node_modules/**",
            ".npmrc",
            ".yarnrc.yml",
            // Install lockfiles capture the ephemeral local-registry port and
            // are an artifact of the harness installing projen, not something
            // the projenrc fixture generates.
            "package-lock.json",
            "yarn.lock",
            "pnpm-lock.yaml",
            "bun.lockb",
          ],
          parseJson: false,
        }),
      ).toMatchSnapshot();
    } finally {
      ws.dispose();
    }
  });
});

function copyDirSync(from: string, to: string): void {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from)) {
    const src = path.join(from, entry);
    const dst = path.join(to, entry);
    if (fs.statSync(src).isDirectory()) {
      copyDirSync(src, dst);
    } else {
      fs.copyFileSync(src, dst);
    }
  }
}
