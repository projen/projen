import { Testing } from "../../src";
import { ReactProject, ReactProjectOptions } from "../../src/web";

test("defaults", () => {
  const p = new TestReactProject();
  expect(Testing.synth(p)).toMatchSnapshot();
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
  const snapshot = Testing.synth(p)[".projen/react-config-overrides.js"];
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
    expect(task.steps[task.steps.length - 1].exec).toEqual(script);
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
