import { Testing } from "../../src";
import {
  NextJsTypeScriptProject,
  NextJsTypeScriptProjectOptions,
} from "../../src/web";

test("defaults", () => {
  const p = new TestNextJsTypeScriptProject();
  expect(Testing.synth(p)).toMatchSnapshot();
});

test("tailwind enabled", () => {
  const p = new TestNextJsTypeScriptProject();
  const out = Testing.synth(p);
  expect(out["tailwind.config.json"]).toBeDefined();
  expect(out["postcss.config.json"]).toBeDefined();
});

test("CommonJS not ESnext", () => {
  const p = new TestNextJsTypeScriptProject();
  const out = Testing.synth(p);
  expect(out["tsconfig.json"]).toBeDefined();
  expect(out["tsconfig.json"].compilerOptions).toBeDefined();
  expect(out["tsconfig.json"].compilerOptions.module).toEqual("CommonJS");
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
