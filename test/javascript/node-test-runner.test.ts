import { NodeProject, NodeTestRunner } from "../../src/javascript";
import * as logging from "../../src/logging";
import { mkdtemp, synthSnapshot } from "../util";

logging.disable();

test("Node Project native test runner defaults configured", () => {
  const project = new NodeProject({
    outdir: mkdtemp(),
    name: "test-node-project",
    githubOptions: { mergify: false },
    projenDevDependency: false,
    defaultReleaseBranch: "master",
    jest: false,
    nodeTestRunner: true,
  });

  expect(project.nodeTestRunner).toBeInstanceOf(NodeTestRunner);
  expect(project.jest).toBeUndefined();

  const snapshot = synthSnapshot(project);
  const testTask = snapshot[".projen/tasks.json"].tasks.test;
  expect(testTask.steps[0].execArgs).toContain("--test");
  expect(testTask.steps[0].execArgs).toContain("--experimental-test-coverage");

  const watchArgs =
    snapshot[".projen/tasks.json"].tasks["test:watch"].steps[0].execArgs;
  expect(watchArgs.slice(0, 3)).toEqual(["node", "--watch", "--test"]);
  expect(
    snapshot[".projen/tasks.json"].tasks["test:update"].steps[0].execArgs,
  ).toContain("--test-update-snapshots");
});

test("Node Project native test runner with options", () => {
  const project = new NodeProject({
    outdir: mkdtemp(),
    name: "test-node-project",
    githubOptions: { mergify: false },
    projenDevDependency: false,
    defaultReleaseBranch: "master",
    jest: false,
    nodeTestRunner: true,
    nodeTestRunnerOptions: {
      coverage: false,
      testMatch: ["test/**/*.test.ts"],
      updateSnapshots: true,
    },
  });

  const snapshot = synthSnapshot(project);
  const testTask = snapshot[".projen/tasks.json"].tasks.test;
  expect(testTask.steps[0].execArgs).toContain("test/**/*.test.ts");
  expect(testTask.steps[0].execArgs).toContain("--test-update-snapshots");
  expect(testTask.steps[0].execArgs).not.toContain(
    "--experimental-test-coverage",
  );
  expect(snapshot[".projen/tasks.json"].tasks["test:update"]).toBeUndefined();
});

test("jest and nodeTestRunner are mutually exclusive", () => {
  expect(
    () =>
      new NodeProject({
        name: "test-node-project",
        githubOptions: { mergify: false },
        projenDevDependency: false,
        defaultReleaseBranch: "master",
        jest: true,
        nodeTestRunner: true,
      }),
  ).toThrow(/Only one of jest and nodeTestRunner can be enabled/);
});
