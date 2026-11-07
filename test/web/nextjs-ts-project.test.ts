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
