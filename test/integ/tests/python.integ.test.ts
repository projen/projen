import * as path from "path";
import { run } from "../src/engine/command";
import { PythonIndex } from "../src/engine/registries/python-index";
import {
  Artifacts,
  Workspace,
  expectExit,
  fileContains,
  fileExists,
  toolAvailable,
  tryArtifacts,
} from "../src/integ-test";

/**
 * Python integration suite. Replaces scripts/integ-python.sh.
 *
 * Verifies that the packaged Python wheel imports and synthesizes:
 *  - creates a venv,
 *  - installs `projen==<version>` from the local wheel (deps from PyPI),
 *  - runs a `.projenrc.py` that instantiates a Project with the project tree
 *    enabled and synthesizes, and
 *  - asserts the synthesized tree.json records the built version.
 *
 * Skipped (not failed) when the wheel is missing or python3 is unavailable.
 */

function pythonWheel(): string | undefined {
  try {
    return tryArtifacts()?.pythonWheel;
  } catch {
    return undefined;
  }
}

/** Path to a binary inside a venv (cross-platform). */
function venvBin(venv: string, name: string): string {
  return process.platform === "win32"
    ? path.join(venv, "Scripts", `${name}.exe`)
    : path.join(venv, "bin", name);
}

const wheel = pythonWheel();
const enabled = !!wheel && toolAvailable("python3");
const suite = enabled ? describe : describe.skip;

if (!wheel) {
  // eslint-disable-next-line no-console
  console.warn(
    "[python] skipped: no dist/python wheel. Run `npx projen package:python` first.",
  );
} else if (!toolAvailable("python3")) {
  // eslint-disable-next-line no-console
  console.warn("[python] skipped: python3 not available.");
}

suite("python", () => {
  const artifacts = Artifacts.resolve();
  const version = artifacts.version;
  const index = new PythonIndex(artifacts.pythonWheel);

  test("imports and synthesizes from the packaged wheel", () => {
    const ws = Workspace.create();
    try {
      const venv = ws.path("venv");
      expectExit(run("python3", ["-m", "venv", venv], { timeout: 120_000 }), 0);

      const pip = venvBin(venv, "pip");
      expectExit(
        run(
          pip,
          [
            "install",
            "--find-links",
            index.findLinks,
            `projen==${version}`,
          ],
          { timeout: 300_000 },
        ),
        0,
      );

      ws.write(
        ".projenrc.py",
        [
          "from projen import Project",
          'project = Project(name="my-project", project_tree=True)',
          "project.synth()",
          "",
        ].join("\n"),
      );

      const python = venvBin(venv, "python");
      expectExit(
        run(python, [ws.path(".projenrc.py")], {
          cwd: ws.dir,
          env: { NODE_ENV: undefined },
          timeout: 120_000,
        }),
        0,
      );

      expect(fileExists(ws.dir, ".projen", "tree.json")).toBe(true);
      expect(
        fileContains(
          path.join(ws.dir, ".projen", "tree.json"),
          `"projen.version": "${version}"`,
        ),
      ).toBe(true);
    } finally {
      ws.dispose();
    }
  });
});
