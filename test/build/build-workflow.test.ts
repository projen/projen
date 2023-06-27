import { BuildWorkflow } from "../../src/build";
import { Project } from "../../src/project";
import { synthSnapshot, TestProject } from "../util";

test("uses default name", () => {
  // GIVEN
  const p = new TestProject();
  new BuildWorkflow(p, {
    buildTask: p.buildTask,
    artifactsDirectory: "./foo",
  });

  // THEN
  const workflows = synthWorkflows(p);
  expect(workflows[".github/workflows/build.yml"]).toBeDefined();
  expect(workflows[".github/workflows/build.yml"]).toMatchSnapshot();
});

test("uses custom name", () => {
  // GIVEN
  const p = new TestProject();
  new BuildWorkflow(p, {
    name: "custom-name",
    buildTask: p.buildTask,
    artifactsDirectory: "./foo",
  });

  // THEN
  const workflows = synthWorkflows(p);
  expect(workflows[".github/workflows/custom-name.yml"]).toBeDefined();
  expect(workflows[".github/workflows/custom-name.yml"]).toMatchSnapshot();
});

function synthWorkflows(p: Project): any {
  const snapshot = synthSnapshot(p);
  const filtered = Object.keys(snapshot)
    .filter((path) => path.startsWith(".github/workflows/"))
    .reduce((obj, key) => {
      return {
        ...obj,
        [key]: snapshot[key],
      };
    }, {});
  return filtered;
}
