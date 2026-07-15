import * as fs from "fs";
import * as path from "path";
import {
  Artifacts,
  NpmRegistry,
  Workspace,
  expectExit,
  fileExists,
  nodePackageManagerCases,
  runProjenCli,
  tryNpmTarball,
} from "../src/integ-test";
import { run } from "../src/engine/command";

/**
 * Node/TypeScript integration suite. Replaces scripts/integ-node.sh.
 *
 * For every available Node package manager, this:
 *  1. installs the packaged projen from the local registry,
 *  2. creates a TypeScript project (`projen new typescript --project-tree`),
 *  3. builds it, and
 *  4. asserts the synthesized `.projen/tree.json` reports the built version.
 *
 * It also guards the downstream-consumer regression from issue #4746: a project
 * that merely depends on projen must produce a lockfile that `npm ci` accepts.
 *
 * The whole suite is skipped (not failed) when the npm tarball has not been
 * built yet, so the child project's test task stays green without a full
 * `package-all`.
 */

const hasTarball = !!tryNpmTarball();
const suite = hasTarball ? describe : describe.skip;

if (!hasTarball) {
  // eslint-disable-next-line no-console
  console.warn(
    "[node-typescript] skipped: no dist/js tarball. Run `npx projen package:js` first.",
  );
}

suite("node/typescript", () => {
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

  describe.each(nodePackageManagerCases())("%s", (_id, pm) => {
    test("creates and builds a TypeScript project", () => {
      const ws = Workspace.create();
      try {
        pm.configureRegistry(ws.dir, registry.url);
        pm.install(ws.dir, `projen@${version}`);

        const create = runProjenCli(
          ws.dir,
          [
            "new",
            "typescript",
            "--project-tree",
            `--package-manager=${pm.id}`,
            // Pin a supported TypeScript so the generated project's toolchain
            // (eslint/@typescript-eslint peer ranges) resolves deterministically
            // instead of pulling whatever is "latest" on npm.
            "--typescript-version=5.x",
          ],
          { timeout: 600_000 },
        );
        expectExit(create, 0);

        const build = runProjenCli(ws.dir, ["build"], { timeout: 600_000 });
        expectExit(build, 0);

        // tree.json records the projen version under a flat, literally-dotted
        // key ("projen.version"). Extract and compare the value.
        const tree = fs.readFileSync(
          path.join(ws.dir, ".projen", "tree.json"),
          "utf-8",
        );
        const recorded = /"projen\.version": "([^"]*)"/.exec(tree)?.[1];
        expect(recorded).toBe(version);
      } finally {
        ws.dispose();
      }
    });
  });

  // Regression test for https://github.com/projen/projen/issues/4746:
  // projen must ship an internally-consistent bundled dependency tree so that a
  // downstream consumer's `npm ci` succeeds. Only needs npm.
  test("downstream npm ci accepts projen's dependency tree (#4746)", () => {
    const ws = Workspace.create();
    try {
      const npm = nodePackageManagerCases().find(([id]) => id === "npm");
      if (!npm) {
        // npm ships with Node; this should never happen.
        throw new Error("npm is not available");
      }
      npm[1].configureRegistry(ws.dir, registry.url);

      ws.write(
        "package.json",
        JSON.stringify(
          {
            name: "projen-consumer",
            version: "0.0.0",
            private: true,
            devDependencies: { projen: version },
          },
          null,
          2,
        ),
      );

      const install = run("npm", ["install"], {
        cwd: ws.dir,
        timeout: 600_000,
      });
      expectExit(install, 0);
      expect(fileExists(ws.dir, "package-lock.json")).toBe(true);

      const ci = run("npm", ["ci"], { cwd: ws.dir, timeout: 600_000 });
      expectExit(ci, 0);
    } finally {
      ws.dispose();
    }
  });
});
