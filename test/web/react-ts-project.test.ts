import {
  ReactTypeScriptProject,
  ReactTypeScriptProjectOptions,
} from "../../src/web";
import { synthSnapshot } from "../util";

test("defaults", () => {
  const p = new TestReactTypeScriptProject();
  expect(synthSnapshot(p)).toMatchSnapshot();
});

// see https://github.com/projen/projen/issues/1342
test("deps can be overridden", () => {
  const p = new TestReactTypeScriptProject();

  p.deps.removeDependency("react");
  p.deps.removeDependency("react-dom");
  p.deps.removeDependency("react-scripts");
  p.deps.removeDependency("web-vitals");
  p.addDevDeps(
    "react@^2",
    "react-dom@^4",
    "react-scripts@1.2.3",
    "web-vitals@7.2",
  );

  const pkg = synthSnapshot(p)["package.json"];

  expect(pkg.dependencies).toBeUndefined();
  expect(pkg.devDependencies.react).toStrictEqual("^2");
  expect(pkg.devDependencies["react-dom"]).toStrictEqual("^4");
  expect(pkg.devDependencies["react-scripts"]).toStrictEqual("1.2.3");
  expect(pkg.devDependencies["web-vitals"]).toStrictEqual("7.2");
});

test("eslint configured to support test cases", () => {
  const p = new TestReactTypeScriptProject();

  const rules = synthSnapshot(p)[".eslintrc.json"].rules;
  expect(rules).toMatchObject({
    "import/no-extraneous-dependencies": [
      "error",
      expect.objectContaining({
        devDependencies: expect.arrayContaining([
          "**/src/**/*.test.tsx",
          "**/src/setupTests.ts",
        ]),
      }),
    ],
  });
});

test("CommonJS not ESnext", () => {
  const p = new TestReactTypeScriptProject();
  const out = synthSnapshot(p);
  expect(out["tsconfig.json"]).toBeDefined();
  expect(out["tsconfig.json"].compilerOptions).toBeDefined();
  expect(out["tsconfig.json"].compilerOptions.module).toEqual("commonjs");
});

class TestReactTypeScriptProject extends ReactTypeScriptProject {
  constructor(options: Partial<ReactTypeScriptProjectOptions> = {}) {
    super({
      ...options,
      clobber: false,
      name: "test-nextjs-project",
      defaultReleaseBranch: "main",
    });
  }
}
