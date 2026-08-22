import {
  NodeProject,
  NodeTestRunner,
  UpdateSnapshot,
} from "../../src/javascript";
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

  const configFile = snapshot["node.test-coverage-config.json"];
  expect(configFile).toBeTruthy();
  expect(configFile.test.test).toEqual(true);
  expect(configFile.test["experimental-test-coverage"]).toEqual(true);
  expect(configFile.test["test-reporter"]).toEqual(["spec", "lcov", "junit"]);
  expect(configFile.test["test-reporter-destination"]).toEqual([
    "stdout",
    "coverage/lcov.info",
    "test-reports/junit.xml",
  ]);

  const testTask = snapshot[".projen/tasks.json"].tasks.test;
  expect(testTask.steps[0].exec).toEqual("mkdir -p coverage");
  expect(testTask.steps[1].execArgs).toContain(
    "--experimental-config-file=node.test-coverage-config.json",
  );
  expect(testTask.steps[1].execArgs).toContain("--test-update-snapshots");

  const watchArgs =
    snapshot[".projen/tasks.json"].tasks["test:watch"].steps[0].execArgs;
  expect(watchArgs).toContain("--watch");
  expect(snapshot[".projen/tasks.json"].tasks["test:update"]).toBeUndefined();
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
      collectCoverage: false,
      junitReporting: false,
      testMatch: ["test/**/*.test.ts"],
      updateSnapshot: UpdateSnapshot.NEVER,
      globalSetup: "./test.setup.js",
      moduleMocks: true,
      nodeOptions: {
        experimentalTransformTypes: true,
      },
    },
  });

  const snapshot = synthSnapshot(project);

  const configFile = snapshot["node.test-coverage-config.json"];
  expect(configFile.test["experimental-test-coverage"]).toBeUndefined();
  expect(configFile.test["test-global-setup"]).toEqual("./test.setup.js");
  expect(configFile.test["experimental-test-module-mocks"]).toEqual(true);
  expect(configFile.nodeOptions["experimental-transform-types"]).toEqual(true);

  const testTask = snapshot[".projen/tasks.json"].tasks.test;
  expect(testTask.steps[0].execArgs).toContain("test/**/*.test.ts");
  expect(testTask.steps[0].execArgs).not.toContain("--test-update-snapshots");

  const testUpdateTask = snapshot[".projen/tasks.json"].tasks["test:update"];
  expect(testUpdateTask.steps[0].execArgs).toContain("--test-update-snapshots");
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
