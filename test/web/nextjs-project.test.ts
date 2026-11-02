import type { NextJsProjectOptions } from "../../src/web";
import { NextJsProject } from "../../src/web";
import { synthSnapshot } from "../util";

test("defaults", () => {
  const p = new TestNextJsProject();
  expect(synthSnapshot(p)).toMatchSnapshot();
});

test("tailwind enabled", () => {
  const p = new TestNextJsProject();
  const pkg = synthSnapshot(p);
  expect(pkg["postcss.config.json"].plugins).toStrictEqual({
    "@tailwindcss/postcss": {},
  });
  // Tailwind v4 uses CSS-first configuration, so no tailwind.config.json is generated
  expect(pkg["tailwind.config.json"]).toBeUndefined();
});

class TestNextJsProject extends NextJsProject {
  constructor(options: Partial<NextJsProjectOptions> = {}) {
    super({
      ...options,
      clobber: false,
      name: "test-nextjs-project",
      defaultReleaseBranch: "main",
    });
  }
}
