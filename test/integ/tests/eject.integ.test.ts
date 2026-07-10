import * as fs from "fs";
import * as path from "path";
import {
  Artifacts,
  NpmRegistry,
  Workspace,
  expectExit,
  fileContains,
  fileExists,
  fileNotContains,
  nodePackageManagerCases,
  runProjenCli,
  tryNpmTarball,
} from "../src/integ-test";
import { run } from "../src/engine/command";

/**
 * Eject integration suite. Replaces scripts/integ-eject.sh and guards the
 * regressions behind issues #3679 and #4407.
 *
 * `projen eject` removes projen from a project and drops in a self-contained
 * bundled task runner (scripts/run-task.cjs). This verifies that after eject:
 *  - scripts/run-task.cjs is generated,
 *  - package.json no longer references projen and is rewired to the runner,
 *  - and tasks run through the bundled runner even with projen deleted from
 *    node_modules (proving the runner is genuinely self-contained).
 *
 * npm-only: eject is a projen feature, not package-manager specific.
 */

const hasTarball = !!tryNpmTarball();
const suite = hasTarball ? describe : describe.skip;

if (!hasTarball) {
  // eslint-disable-next-line no-console
  console.warn(
    "[eject] skipped: no dist/js tarball. Run `npx projen package:js` first.",
  );
}

suite("eject", () => {
  let registry: NpmRegistry;
  let version: string;

  beforeAll(async () => {
    const artifacts = Artifacts.resolve();
    version = artifacts.version;
    registry = await NpmRegistry.start();
    registry.publish(artifacts.npmTarball);
  }, 120_000);

  afterAll(async () => {
    await registry?.stop();
  });

  test("ejects to a self-contained bundled task runner (#3679, #4407)", () => {
    const npm = nodePackageManagerCases().find(([id]) => id === "npm")?.[1];
    if (!npm) {
      throw new Error("npm is not available");
    }

    const ws = Workspace.create();
    try {
      npm.configureRegistry(ws.dir, registry.url);
      npm.install(ws.dir, `projen@${version}`);

      expectExit(
        runProjenCli(
          ws.dir,
          [
            "new",
            "typescript",
            "--project-tree",
            "--package-manager=npm",
            "--typescript-version=5.x",
          ],
          { timeout: 300_000 },
        ),
        0,
      );

      // Eject projen from the project.
      expectExit(runProjenCli(ws.dir, ["eject"], { timeout: 300_000 }), 0);

      // The bundled task runner must exist and package.json must be rewired to
      // it and no longer reference projen.
      expect(fileExists(ws.dir, "scripts", "run-task.cjs")).toBe(true);
      const pkg = path.join(ws.dir, "package.json");
      expect(fileNotContains(pkg, '"projen"')).toBe(true);
      expect(fileContains(pkg, "scripts/run-task.cjs")).toBe(true);

      // Remove projen entirely so we know the runner is self-contained.
      fs.rmSync(path.join(ws.dir, "node_modules", "projen"), {
        recursive: true,
        force: true,
      });
      fs.rmSync(path.join(ws.dir, "node_modules", ".bin", "projen"), {
        force: true,
      });

      // Running a task must now work through scripts/run-task.cjs alone.
      const compile = run("npm", ["run", "compile"], {
        cwd: ws.dir,
        timeout: 300_000,
        env: { NODE_ENV: undefined },
      });
      expectExit(compile, 0);
      expect(fileExists(ws.dir, "lib", "index.js")).toBe(true);
    } finally {
      ws.dispose();
    }
  });
});
