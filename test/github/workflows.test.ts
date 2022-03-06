import { GithubWorkflow } from "../../src/github";
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
  new GithubWorkflow(p, "my-workflow");

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
  expect(() => new GithubWorkflow(p, "stale")).toThrow(
    /there is already a file under/
  );
});

test("throws when adding workflow with adding a job with no runners specified", () => {
  // GIVEN
  const p = new TestProject({
    stale: true,
  });
  // WHEN
  const workflow = new GithubWorkflow(p, "my-workflow");

  // THEN
  expect(() =>
    workflow?.addJobs({
      job1: {
        permissions: {},
        steps: [],
        runsOn: [],
      },
    })
  ).toThrow(/at least one runner selector labels must be provided/);
});

test("tryFind valid workflow", () => {
  // GIVEN
  const p = new TestProject();

  // WHEN
  new GithubWorkflow(p, "workflow1");
  new GithubWorkflow(p, "workflow2");
  const workflow1 = GithubWorkflow.tryFind(p, "workflow1");

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
  new GithubWorkflow(p, "workflow1");
  new GithubWorkflow(p, "workflow2");
  const workflow3 = GithubWorkflow.tryFind(p, "workflow3");

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
