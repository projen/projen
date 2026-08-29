import {
  JavaScriptTestRunner,
  NodeProject,
  NodeNativeTest,
  UpdateSnapshot,
  Jest,
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
    testRunner: JavaScriptTestRunner.nodejs(),
  });

  expect(NodeNativeTest.of(project)).toBeDefined();
  expect(Jest.of(project)).toBeUndefined();

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
  const project = new NodeProject({
    outdir: mkdtemp(),
    name: "test-node-project",
    githubOptions: { mergify: false },
    projenDevDependency: false,
    defaultReleaseBranch: "master",
    testRunner: JavaScriptTestRunner.nodejs(),
  });

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

test("Node Project native test runner with options", () => {
  const project = new NodeProject({
    outdir: mkdtemp(),
    name: "test-node-project",
    githubOptions: { mergify: false },
    projenDevDependency: false,
    defaultReleaseBranch: "master",
    testRunner: JavaScriptTestRunner.nodejs({
      collectCoverage: false,
      testMatch: ["test/**/*.test.ts"],
      updateSnapshot: UpdateSnapshot.NEVER,
      globalSetup: "./test.setup.js",
      moduleMocks: true,
      nodeOptions: {
        enableSourceMaps: true,
      },
    }),
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
  const project = new NodeProject({
    outdir: mkdtemp(),
    name: "test-node-project",
    githubOptions: { mergify: false },
    projenDevDependency: false,
    defaultReleaseBranch: "master",
    testRunner: JavaScriptTestRunner.nodejs({
      updateSnapshot: UpdateSnapshot.NEVER,
      testMatch: ["foo/**/*.test.ts"],
    }),
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
  const project = new NodeProject({
    outdir: mkdtemp(),
    name: "test-node-project",
    githubOptions: { mergify: false },
    projenDevDependency: false,
    defaultReleaseBranch: "master",
    testRunner: JavaScriptTestRunner.nodejs({
      collectCoverage: false,
      reporters: [{ name: "junit", destination: "some-destination/junit.xml" }],
    }),
  });

  const snapshot = synthSnapshot(project);
  const testTask = snapshot[".projen/tasks.json"].tasks.test;
  const mkdirSteps = testTask.steps
    .filter((step: any) => step.exec?.startsWith("mkdir -p"))
    .map((step: any) => step.exec);
  expect(mkdirSteps).toEqual(["mkdir -p some-destination"]);
});

test("does not create a directory for a reporter destination with no directory component", () => {
  const project = new NodeProject({
    outdir: mkdtemp(),
    name: "test-node-project",
    githubOptions: { mergify: false },
    projenDevDependency: false,
    defaultReleaseBranch: "master",
    testRunner: JavaScriptTestRunner.nodejs({
      collectCoverage: false,
      reporters: [{ name: "junit", destination: "junit.xml" }],
    }),
  });

  const snapshot = synthSnapshot(project);
  const testTask = snapshot[".projen/tasks.json"].tasks.test;
  const mkdirSteps = testTask.steps.filter((step: any) =>
    step.exec?.startsWith("mkdir -p"),
  );
  expect(mkdirSteps).toEqual([]);
});

test("NodeReporters.remove() removes a configured reporter", () => {
  const project = new NodeProject({
    outdir: mkdtemp(),
    name: "test-node-project",
    githubOptions: { mergify: false },
    projenDevDependency: false,
    defaultReleaseBranch: "master",
    testRunner: JavaScriptTestRunner.nodejs(),
  });
  const nodeNativeTest = NodeNativeTest.of(project) as NodeNativeTest;

  expect(nodeNativeTest.reporters.list().map((r) => r.name)).toContain("junit");

  nodeNativeTest.reporters.remove("junit");

  expect(nodeNativeTest.reporters.list().map((r) => r.name)).not.toContain(
    "junit",
  );
});

test("no reporters are configured when coverage, junit and text reporting are all disabled", () => {
  const project = new NodeProject({
    outdir: mkdtemp(),
    name: "test-node-project",
    githubOptions: { mergify: false },
    projenDevDependency: false,
    defaultReleaseBranch: "master",
    testRunner: JavaScriptTestRunner.nodejs({
      collectCoverage: false,
    }),
  });

  const snapshot = synthSnapshot(project);
  const configFile = snapshot["node.config.json"];
  expect(configFile.test["test-reporter"]).toBeUndefined();
  expect(configFile.test["test-reporter-destination"]).toBeUndefined();
});

test("an explicit testConfig.testReporter/testReporterDestination overrides the derived reporters", () => {
  const project = new NodeProject({
    outdir: mkdtemp(),
    name: "test-node-project",
    githubOptions: { mergify: false },
    projenDevDependency: false,
    defaultReleaseBranch: "master",
    testRunner: JavaScriptTestRunner.nodejs({
      testConfig: {
        testReporter: ["tap"],
        testReporterDestination: ["stdout"],
      },
    }),
  });

  const snapshot = synthSnapshot(project);
  const configFile = snapshot["node.config.json"];
  expect(configFile.test["test-reporter"]).toEqual(["tap"]);
  expect(configFile.test["test-reporter-destination"]).toEqual(["stdout"]);
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
        testRunner: JavaScriptTestRunner.nodejs(),
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
    testRunner: JavaScriptTestRunner.nodejs(),
  });

  expect(NodeNativeTest.of(nodeNativeTestProject)).toBeDefined();
});

test("addTestMatch() can be used to add patterns after construction, reflected in the test command", () => {
  const project = new NodeProject({
    outdir: mkdtemp(),
    name: "test-node-project",
    githubOptions: { mergify: false },
    projenDevDependency: false,
    defaultReleaseBranch: "master",
    testRunner: JavaScriptTestRunner.nodejs({
      testMatch: ["foo/**/*.test.ts"],
    }),
  });

  const nodeNativeTest = NodeNativeTest.of(project);
  nodeNativeTest?.testMatch.add("bar/**/*.test.ts");

  // configuring the "test" task is deferred to synthesis (preSynthesize),
  // so patterns added after construction are still picked up.
  const snapshot = synthSnapshot(project);
  const testTask = snapshot[".projen/tasks.json"].tasks.test;
  const testExecStep = testTask.steps.find((step: any) => step.execArgs);
  expect(testExecStep.execArgs).toContain("foo/**/*.test.ts");
  expect(testExecStep.execArgs).toContain("bar/**/*.test.ts");
});

test("removeTestMatch() removes a previously added pattern, and is a no-op if not found", () => {
  const project = new NodeProject({
    outdir: mkdtemp(),
    name: "test-node-project",
    githubOptions: { mergify: false },
    projenDevDependency: false,
    defaultReleaseBranch: "master",
    testRunner: JavaScriptTestRunner.nodejs({
      testMatch: ["foo/**/*.test.ts"],
    }),
  });
  const nodeNativeTest = NodeNativeTest.of(project);

  nodeNativeTest?.testMatch.remove("does-not-exist/**/*.test.ts");
  expect(nodeNativeTest?.testMatch.deferred()).toEqual(["foo/**/*.test.ts"]);

  nodeNativeTest?.testMatch.remove("foo/**/*.test.ts");
  expect(nodeNativeTest?.testMatch.deferred()).not.toContain(
    "foo/**/*.test.ts",
  );

  // configuring the "test" task is deferred to synthesis (preSynthesize),
  // so the removal is reflected in the final CLI args too.
  const snapshot = synthSnapshot(project);
  const testTask = snapshot[".projen/tasks.json"].tasks.test;
  const testExecStep = testTask.steps.find((step: any) => step.execArgs);
  expect(testExecStep.execArgs).not.toContain("foo/**/*.test.ts");
});
