import { Testing } from "../../src";
import {
  ReactTypeScriptProject,
  ReactTypeScriptProjectOptions,
} from "../../src/web";

test("defaults", () => {
  const p = new TestReactTypeScriptProject();
  expect(Testing.synth(p)).toMatchSnapshot();
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
    "web-vitals@7.2"
  );

  const pkg = Testing.synth(p)["package.json"];

  expect(pkg.dependencies).toBeUndefined();
  expect(pkg.devDependencies.react).toStrictEqual("^2");
  expect(pkg.devDependencies["react-dom"]).toStrictEqual("^4");
  expect(pkg.devDependencies["react-scripts"]).toStrictEqual("1.2.3");
  expect(pkg.devDependencies["web-vitals"]).toStrictEqual("7.2");
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
