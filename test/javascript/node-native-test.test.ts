import {
  NodeProject,
  NodeNativeTest,
  NodeTestUpdateSnapshot,
} from "../../src/javascript";
import * as logging from "../../src/logging";
import { mkdtemp, synthSnapshot } from "../util";

logging.disable();

function newProject() {
  return new NodeProject({
    outdir: mkdtemp(),
    name: "test-node-project",
    githubOptions: { mergify: false },
    projenDevDependency: false,
    defaultReleaseBranch: "master",
    jest: false,
  });
}

test("defaults configured", () => {
  const project = newProject();
  new NodeNativeTest(project);

  expect(NodeNativeTest.of(project)).toBeDefined();

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

test("defaults combine Node.js' own test file discovery with Jest conventions, without extglobs", () => {
  const project = newProject();
  new NodeNativeTest(project);

  const snapshot = synthSnapshot(project);
  const testExecStep = snapshot[".projen/tasks.json"].tasks.test.steps.find(
    (step: any) => step.execArgs,
  );
  const extensions = "cjs,mjs,js,jsx,cts,mts,ts,tsx";

  // Node.js' own default test file discovery
  expect(testExecStep.execArgs).toContain(`**/test/**/*.{${extensions}}`);
  expect(testExecStep.execArgs).toContain(`**/test.{${extensions}}`);
  expect(testExecStep.execArgs).toContain(`**/test-*.{${extensions}}`);
  expect(testExecStep.execArgs).toContain(`**/*.test.{${extensions}}`);
  expect(testExecStep.execArgs).toContain(`**/*-test.{${extensions}}`);
  expect(testExecStep.execArgs).toContain(`**/*_test.{${extensions}}`);
  // Jest conventions
  expect(testExecStep.execArgs).toContain(`**/__tests__/**/*.{${extensions}}`);
  expect(testExecStep.execArgs).toContain(`**/spec.{${extensions}}`);
  expect(testExecStep.execArgs).toContain(`**/*.spec.{${extensions}}`);

  // no extglobs anywhere, since Node's glob matching does not support them
  for (const arg of testExecStep.execArgs) {
    expect(arg).not.toMatch(/[@?+*!]\(/);
  }
});

test("with options", () => {
  const project = newProject();
  new NodeNativeTest(project, {
    collectCoverage: false,
    testMatch: ["test/**/*.test.ts"],
    updateSnapshot: NodeTestUpdateSnapshot.NEVER,
    globalSetup: "./test.setup.js",
    moduleMocks: true,
    nodeOptions: {
      enableSourceMaps: true,
    },
  });

  const snapshot = synthSnapshot(project);

  const configFile = snapshot["node.config.json"];
  expect(configFile.test["experimental-test-coverage"]).toBeUndefined();
  expect(configFile.test["test-global-setup"]).toEqual("./test.setup.js");
  expect(configFile.test["experimental-test-module-mocks"]).toEqual(true);
  expect(configFile.nodeOptions["enable-source-maps"]).toEqual(true);

  const testTask = snapshot[".projen/tasks.json"].tasks.test;
  expect(testTask.steps[0].execArgs).toContain("test/**/*.test.ts");
  expect(testTask.steps[0].execArgs).not.toContain("--test-update-snapshots");

  const testUpdateTask = snapshot[".projen/tasks.json"].tasks["test:update"];
  expect(testUpdateTask.steps[0].execArgs).toContain("--test-update-snapshots");
});

test("test match patterns (positional args) come after every flag, in every task", () => {
  const project = newProject();
  new NodeNativeTest(project, {
    updateSnapshot: NodeTestUpdateSnapshot.NEVER,
    testMatch: ["foo/**/*.test.ts"],
  });

  const snapshot = synthSnapshot(project);
  const tasks = snapshot[".projen/tasks.json"].tasks;

  for (const taskName of ["test", "test:update", "test:watch"]) {
    const execArgs: string[] = tasks[taskName].steps.find(
      (step: any) => step.execArgs,
    ).execArgs;
    const patternIndex = execArgs.indexOf("foo/**/*.test.ts");
    expect(patternIndex).toBeGreaterThan(-1);

    const flagsAfterPattern = execArgs
      .slice(patternIndex)
      .filter((arg) => arg.startsWith("-"));
    expect(flagsAfterPattern).toEqual([]);
  }
});

test("creates the test-reports directory when junit reporting is enabled without coverage", () => {
  const project = newProject();
  new NodeNativeTest(project, {
    collectCoverage: false,
    reporters: [{ name: "junit", destination: "some-destination/junit.xml" }],
  });

  const snapshot = synthSnapshot(project);
  const testTask = snapshot[".projen/tasks.json"].tasks.test;
  const mkdirSteps = testTask.steps
    .filter((step: any) => step.exec?.startsWith("mkdir -p"))
    .map((step: any) => step.exec);
  expect(mkdirSteps).toEqual(["mkdir -p some-destination"]);
});

test("does not create a directory for a reporter destination with no directory component", () => {
  const project = newProject();
  new NodeNativeTest(project, {
    collectCoverage: false,
    reporters: [{ name: "junit", destination: "junit.xml" }],
  });

  const snapshot = synthSnapshot(project);
  const testTask = snapshot[".projen/tasks.json"].tasks.test;
  const mkdirSteps = testTask.steps.filter((step: any) =>
    step.exec?.startsWith("mkdir -p"),
  );
  expect(mkdirSteps).toEqual([]);
});

test("NodeReporters.remove() removes a configured reporter", () => {
  const project = newProject();
  const nodeNativeTest = new NodeNativeTest(project);

  expect(nodeNativeTest.reporters.list().map((r) => r.name)).toContain("junit");

  nodeNativeTest.reporters.remove("junit");

  expect(nodeNativeTest.reporters.list().map((r) => r.name)).not.toContain(
    "junit",
  );
});

test("no reporters are configured when coverage, junit and text reporting are all disabled", () => {
  const project = newProject();
  new NodeNativeTest(project, {
    collectCoverage: false,
  });

  const snapshot = synthSnapshot(project);
  const configFile = snapshot["node.config.json"];
  expect(configFile.test["test-reporter"]).toBeUndefined();
  expect(configFile.test["test-reporter-destination"]).toBeUndefined();
});

test("an explicit testConfig.testReporter/testReporterDestination overrides the derived reporters", () => {
  const project = newProject();
  new NodeNativeTest(project, {
    testConfig: {
      testReporter: ["tap"],
      testReporterDestination: ["stdout"],
    },
  });

  const snapshot = synthSnapshot(project);
  const configFile = snapshot["node.config.json"];
  expect(configFile.test["test-reporter"]).toEqual(["tap"]);
  expect(configFile.test["test-reporter-destination"]).toEqual(["stdout"]);
});

test("NodeNativeTest.of() returns the singleton instance or undefined", () => {
  const project = newProject();
  expect(NodeNativeTest.of(project)).toBeUndefined();

  new NodeNativeTest(project);
  expect(NodeNativeTest.of(project)).toBeDefined();
});

test("addTestMatch() can be used to add patterns after construction, reflected in the test command", () => {
  const project = newProject();
  const nodeNativeTest = new NodeNativeTest(project, {
    testMatch: ["foo/**/*.test.ts"],
  });

  nodeNativeTest.addTestMatch("bar/**/*.test.ts");

  // configuring the "test" task is deferred to synthesis, so patterns added
  // after construction are still picked up.
  const snapshot = synthSnapshot(project);
  const testTask = snapshot[".projen/tasks.json"].tasks.test;
  const testExecStep = testTask.steps.find((step: any) => step.execArgs);
  expect(testExecStep.execArgs).toContain("foo/**/*.test.ts");
  expect(testExecStep.execArgs).toContain("bar/**/*.test.ts");
});

test("removeTestMatch() removes a previously added pattern, and is a no-op if not found", () => {
  const project = newProject();
  const nodeNativeTest = new NodeNativeTest(project, {
    testMatch: ["foo/**/*.test.ts"],
  });

  nodeNativeTest.removeTestMatch("does-not-exist/**/*.test.ts");
  nodeNativeTest.removeTestMatch("foo/**/*.test.ts");

  // configuring the "test" task is deferred to synthesis, so the removal is
  // reflected in the final CLI args too.
  const snapshot = synthSnapshot(project);
  const testTask = snapshot[".projen/tasks.json"].tasks.test;
  const testExecStep = testTask.steps.find((step: any) => step.execArgs);
  expect(testExecStep.execArgs).not.toContain("foo/**/*.test.ts");
});

test("transformTypes adds the amaro dependency and configures nodeOptions", () => {
  const project = newProject();
  new NodeNativeTest(project, {
    transformTypes: true,
  });

  const snapshot = synthSnapshot(project);
  const configFile = snapshot["node.config.json"];
  expect(configFile.nodeOptions["enable-source-maps"]).toEqual(true);
  expect(configFile.nodeOptions.import).toContain("amaro/transform");
  expect(snapshot["package.json"].devDependencies.amaro).toBeDefined();
});
