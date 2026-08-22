import {
  JavaScriptTestRunner,
  NodeProject,
  NodeNativeTest,
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
    testRunner: JavaScriptTestRunner.useNode(),
  });

  expect(project.testRunner?.nodeNativeTest).toBeInstanceOf(NodeNativeTest);
  expect(project.jest).toBeUndefined();

  const snapshot = synthSnapshot(project);

  const configFile = snapshot["node.config.json"];
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
  const mkdirSteps = testTask.steps
    .filter((step: any) => step.exec?.startsWith("mkdir -p"))
    .map((step: any) => step.exec);
  expect(mkdirSteps).toEqual(
    expect.arrayContaining(["mkdir -p coverage", "mkdir -p test-reports"]),
  );

  const testExecStep = testTask.steps.find((step: any) => step.execArgs);
  expect(testExecStep.execArgs).toContain(
    "--experimental-config-file=node.config.json",
  );
  expect(testExecStep.execArgs).toContain("--test-update-snapshots");

  const watchArgs =
    snapshot[".projen/tasks.json"].tasks["test:watch"].steps[0].execArgs;
  expect(watchArgs).toContain("--watch");
  expect(snapshot[".projen/tasks.json"].tasks["test:update"]).toBeUndefined();

  const gitattributes = snapshot[".gitattributes"];
  expect(gitattributes).toContain("*.snap linguist-generated");
});

test("Node Project native test runner with options", () => {
  const project = new NodeProject({
    outdir: mkdtemp(),
    name: "test-node-project",
    githubOptions: { mergify: false },
    projenDevDependency: false,
    defaultReleaseBranch: "master",
    testRunner: JavaScriptTestRunner.useNode({
      collectCoverage: false,
      junitReporting: false,
      testMatch: ["test/**/*.test.ts"],
      updateSnapshot: UpdateSnapshot.NEVER,
      globalSetup: "./test.setup.js",
      moduleMocks: true,
      nodeOptions: {
        experimentalTransformTypes: true,
      },
    }),
  });

  const snapshot = synthSnapshot(project);

  const configFile = snapshot["node.config.json"];
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

test("creates the test-reports directory when junit reporting is enabled without coverage", () => {
  const project = new NodeProject({
    outdir: mkdtemp(),
    name: "test-node-project",
    githubOptions: { mergify: false },
    projenDevDependency: false,
    defaultReleaseBranch: "master",
    testRunner: JavaScriptTestRunner.useNode({
      collectCoverage: false,
      junitReporting: true,
    }),
  });

  const snapshot = synthSnapshot(project);
  const testTask = snapshot[".projen/tasks.json"].tasks.test;
  const mkdirSteps = testTask.steps
    .filter((step: any) => step.exec?.startsWith("mkdir -p"))
    .map((step: any) => step.exec);
  expect(mkdirSteps).toEqual(["mkdir -p test-reports"]);
});

test("no reporters are configured when coverage, junit and text reporting are all disabled", () => {
  const project = new NodeProject({
    outdir: mkdtemp(),
    name: "test-node-project",
    githubOptions: { mergify: false },
    projenDevDependency: false,
    defaultReleaseBranch: "master",
    testRunner: JavaScriptTestRunner.useNode({
      collectCoverage: false,
      junitReporting: false,
      coverageText: false,
    }),
  });

  const snapshot = synthSnapshot(project);
  const configFile = snapshot["node.config.json"];
  expect(configFile.test["test-reporter"]).toBeUndefined();
  expect(configFile.test["test-reporter-destination"]).toBeUndefined();
});

test("testRunner and jest are mutually exclusive", () => {
  expect(
    () =>
      new NodeProject({
        name: "test-node-project",
        githubOptions: { mergify: false },
        projenDevDependency: false,
        defaultReleaseBranch: "master",
        jest: true,
        testRunner: JavaScriptTestRunner.useNode(),
      }),
  ).toThrow(/Cannot use `testRunner` together with the deprecated `jest`/);
});

test("NodeNativeTest.of() returns the singleton instance or undefined", () => {
  const project = new NodeProject({
    outdir: mkdtemp(),
    name: "test-node-project",
    githubOptions: { mergify: false },
    projenDevDependency: false,
    defaultReleaseBranch: "master",
    jest: true,
  });

  expect(NodeNativeTest.of(project)).toBeUndefined();

  const nodeNativeTestProject = new NodeProject({
    outdir: mkdtemp(),
    name: "test-node-project",
    githubOptions: { mergify: false },
    projenDevDependency: false,
    defaultReleaseBranch: "master",
    testRunner: JavaScriptTestRunner.useNode(),
  });

  expect(NodeNativeTest.of(nodeNativeTestProject)).toBe(
    nodeNativeTestProject.testRunner?.nodeNativeTest,
  );
});

test("addTestMatch() can be used to add patterns before the test command is configured", () => {
  const project = new NodeProject({
    outdir: mkdtemp(),
    name: "test-node-project",
    githubOptions: { mergify: false },
    projenDevDependency: false,
    defaultReleaseBranch: "master",
    testRunner: JavaScriptTestRunner.useNode({
      testMatch: ["foo/**/*.test.ts"],
    }),
  });

  project.testRunner!.nodeNativeTest!.addTestMatch("bar/**/*.test.ts");

  const snapshot = synthSnapshot(project);
  const testTask = snapshot[".projen/tasks.json"].tasks.test;
  const testExecStep = testTask.steps.find((step: any) => step.execArgs);
  expect(testExecStep.execArgs).toContain("foo/**/*.test.ts");
  // added after construction: the test command was already built, so it
  // is not reflected in the "test" task, but the method itself must not
  // throw and should still record the pattern.
  expect((project.testRunner!.nodeNativeTest as any).testMatch).toContain(
    "bar/**/*.test.ts",
  );
});
