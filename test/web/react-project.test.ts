import { NodePackageManager } from "../../src/javascript";
import type { ReactProjectOptions } from "../../src/web";
import { ReactProject } from "../../src/web";
import { execProjenCLI, synthSnapshot } from "../util";

test("defaults", () => {
  const p = new TestReactProject();
  expect(synthSnapshot(p)).toMatchSnapshot();
});

test("rewire creates config-overrides.js", () => {
  const p = new TestReactProject({
    rewire: {
      "module.prop1": false,
      "module.prop2": 5,
      "module.prop3": [1, 2],
      "module.prop4": { one: 2 },
      "module.prop5": "one",
    },
  });
  const snapshot = synthSnapshot(p)[".projen/react-config-overrides.js"];
  expect(snapshot).toMatchSnapshot();
});

test("rewire replaces react-scripts", () => {
  const p = new TestReactProject({
    rewire: { "module.prop1": false },
  });

  function assertExec(taskName: string, script: string) {
    const task = p.tasks.tryFind(taskName);
    if (!task) {
      throw new Error(`Task not found: ${taskName}`);
    }
    expect(task.steps[task.steps.length - 1].execArgs).toEqual(
      script.split(" "),
    );
  }

  assertExec("compile", "react-app-rewired build");
  assertExec("test", "react-app-rewired test --watchAll=false");
  assertExec("dev", "react-app-rewired start");
});

test("rewire add a dependency on react-app-rewired", () => {
  const p = new TestReactProject({
    rewire: { "module.prop1": false },
  });

  expect(p.deps.getDependency("react-app-rewired")).toBeDefined();
});

test("sample code mounts the app with createRoot", () => {
  const p = new TestReactProject();
  const index = synthSnapshot(p)["src/index.jsx"];
  expect(index).toContain("import ReactDOM from 'react-dom/client';");
  expect(index).toContain(
    "const root = ReactDOM.createRoot(document.getElementById('root'));",
  );
  expect(index).not.toContain("ReactDOM.render(");
});

test("compiles", async () => {
  const p = new TestReactProject({
    packageManager: NodePackageManager.NPM,
  });
  p.synth();

  await execProjenCLI(p.outdir, ["compile"]);
});

class TestReactProject extends ReactProject {
  constructor(options: Partial<ReactProjectOptions> = {}) {
    super({
      ...options,
      clobber: false,
      name: "test-nextjs-project",
      defaultReleaseBranch: "main",
    });
  }
}
