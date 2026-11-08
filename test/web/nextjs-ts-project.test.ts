import { mkdirSync, rmSync, symlinkSync, writeFileSync } from "fs";
import * as os from "os";
import { join } from "path";
import { NodePackageManager } from "../../src/javascript";
import type { NextJsTypeScriptProjectOptions } from "../../src/web";
import { NextJsTypeScriptProject } from "../../src/web";
import { execProjenCLI, synthSnapshot } from "../util";

test("defaults", () => {
  const p = new TestNextJsTypeScriptProject();
  expect(synthSnapshot(p)).toMatchSnapshot();
});

test("tailwind enabled", () => {
  const p = new TestNextJsTypeScriptProject();
  const out = synthSnapshot(p);
  expect(out["postcss.config.json"].plugins).toStrictEqual({
    "@tailwindcss/postcss": {},
  });
  // Tailwind v4 uses CSS-first configuration, so no tailwind.config.json is generated
  expect(out["tailwind.config.json"]).toBeUndefined();
});

test("CommonJS not ESnext", () => {
  const p = new TestNextJsTypeScriptProject();
  const out = synthSnapshot(p);
  expect(out["tsconfig.json"]).toBeDefined();
  expect(out["tsconfig.json"].compilerOptions).toBeDefined();
  expect(out["tsconfig.json"].compilerOptions.module).toEqual("esnext");
});

test("compiles", async () => {
  const p = new TestNextJsTypeScriptProject({
    packageManager: NodePackageManager.NPM,
  });
  p.synth();

  await execProjenCLI(p.outdir, ["compile"]);
});

test("builds", async () => {
  const p = new TestNextJsTypeScriptProject({
    packageManager: NodePackageManager.NPM,
  });
  p.synth();

  // `projen build` starts with the `default` task, which re-synthesizes the
  // project from the `.projenrc.js` that `projen new` creates. The in-process
  // project above does not write one, so add the equivalent bootstrap file and
  // make the local `projen` build resolvable, like the integration tests do.
  writeFileSync(
    join(p.outdir, ".projenrc.js"),
    [
      'const { web } = require("projen");',
      "const project = new web.NextJsTypeScriptProject({",
      '  name: "test-nextjs-project",',
      '  defaultReleaseBranch: "main",',
      '  packageManager: "npm",',
      "  clobber: false,",
      "});",
      "project.synth();",
      "",
    ].join("\n"),
  );
  mkdirSync(join(p.outdir, "node_modules"), { recursive: true });
  // Replace the projen installed from the registry with the local build, so the
  // re-synthesis runs against the code under test.
  rmSync(join(p.outdir, "node_modules", "projen"), {
    recursive: true,
    force: true,
  });
  symlinkSync(
    join(__dirname, "..", ".."),
    join(p.outdir, "node_modules", "projen"),
    os.platform() === "win32" ? "junction" : undefined,
  );

  await execProjenCLI(p.outdir, ["build"], {
    env: { PROJEN_DISABLE_POST: "1" },
  });
});

class TestNextJsTypeScriptProject extends NextJsTypeScriptProject {
  constructor(options: Partial<NextJsTypeScriptProjectOptions> = {}) {
    super({
      ...options,
      clobber: false,
      name: "test-nextjs-project",
      defaultReleaseBranch: "main",
    });
  }
}
