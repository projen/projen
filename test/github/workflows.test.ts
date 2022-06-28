import { Project } from "../../src/project";
import { synthSnapshot, TestProject } from "../util";

test("no workflow", () => {
  // GIVEN
  const p = new TestProject({
    githubOptions: {
      workflows: false,
    },
  });

  // THEN
  const workflows = synthWorkflows(p);
  expect(Object.keys(workflows).length).toEqual(0);
});

test("adding empty workflow", () => {
  // GIVEN
  const p = new TestProject();

  // WHEN
  p.github?.addWorkflow("my-workflow");

  // THEN
  const workflows = synthWorkflows(p);
  expect(workflows[".github/workflows/my-workflow.yml"]).toMatchSnapshot();
});

test("throws when adding workflow with existing name", () => {
  // GIVEN
  const p = new TestProject({
    stale: true,
  });

  // THEN
  expect(() => p.github?.addWorkflow("stale")).toThrow(
    /there is already a file under/
  );
});

test("tryFind valid workflow", () => {
  // GIVEN
  const p = new TestProject();

  // WHEN
  p.github?.addWorkflow("workflow1");
  p.github?.addWorkflow("workflow2");
  const workflow1 = p.github?.tryFindWorkflow("workflow1");

  // THEN
  const workflows = synthWorkflows(p);
  expect(workflows[".github/workflows/workflow1.yml"]).toBeDefined();
  expect(workflows[".github/workflows/workflow2.yml"]).toBeDefined();
  expect(workflow1).toBeDefined();
  expect(workflow1?.name).toEqual("workflow1");
});

test("tryFind unknown workflow", () => {
  // GIVEN
  const p = new TestProject();

  // WHEN
  p.github?.addWorkflow("workflow1");
  p.github?.addWorkflow("workflow2");
  const workflow3 = p.github?.tryFindWorkflow("workflow3");

  // THEN
  const workflows = synthWorkflows(p);
  expect(workflows[".github/workflows/workflow1.yml"]).toBeDefined();
  expect(workflows[".github/workflows/workflow2.yml"]).toBeDefined();
  expect(workflow3).toBeUndefined();
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
