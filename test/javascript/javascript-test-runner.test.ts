import {
  JavaScriptTestRunner,
  UpdateSnapshot,
} from "../../src/javascript/javascript-test-runner";
import type { IJavaScriptTestRunner } from "../../src/javascript/javascript-test-runner";
import type { RunTestConfig } from "../../src/test-runner";
import { TestMatch } from "../../src/test-runner";
import { synthSnapshot, TestProject } from "../util";

class StubTestRunner implements IJavaScriptTestRunner {
  public readonly testMatch = new TestMatch({ defaultValue: ["**/*.test.js"] });
  public readonly updateSnapshot: UpdateSnapshot;
  public readonly coverageDirectory?: string;

  constructor(
    private readonly config: RunTestConfig,
    options: {
      updateSnapshot?: UpdateSnapshot;
      coverageDirectory?: string;
    } = {},
  ) {
    this.updateSnapshot = options.updateSnapshot ?? UpdateSnapshot.ALWAYS;
    this.coverageDirectory = options.coverageDirectory;
  }

  public configFor(): RunTestConfig {
    return this.config;
  }
}

test("applyTo() adds the test task from the runner's config", () => {
  const project = new TestProject();
  const runner = new StubTestRunner({
    dependencies: [{ name: "some-test-framework" }],
    steps: [{ name: "test", execArgs: ["some-test-framework"] }],
  });

  project.with(new JavaScriptTestRunner(runner));

  expect(project.testTask.steps).toContainEqual(
    expect.objectContaining({ execArgs: ["some-test-framework"] }),
  );
  expect(project.deps.tryGetDependency("some-test-framework")).toBeDefined();
});

test("applyTo() creates a test:update task when the runner has an update step", () => {
  const project = new TestProject();
  const runner = new StubTestRunner(
    {
      dependencies: [],
      steps: [
        { name: "test", execArgs: ["run-tests"] },
        { name: "update", execArgs: ["run-tests", "--update"] },
      ],
    },
    { updateSnapshot: UpdateSnapshot.NEVER },
  );

  project.with(new JavaScriptTestRunner(runner));

  const updateTask = project.tasks.tryFind("test:update");
  expect(updateTask).toBeDefined();
  expect(updateTask!.steps).toContainEqual(
    expect.objectContaining({ execArgs: ["run-tests", "--update"] }),
  );
});

test("applyTo() creates a test:watch task when the runner has a watch step", () => {
  const project = new TestProject();
  const runner = new StubTestRunner({
    dependencies: [],
    steps: [
      { name: "test", execArgs: ["run-tests"] },
      { name: "watch", execArgs: ["run-tests", "--watch"] },
    ],
  });

  project.with(new JavaScriptTestRunner(runner));

  const watchTask = project.tasks.tryFind("test:watch");
  expect(watchTask).toBeDefined();
  expect(watchTask!.steps).toContainEqual(
    expect.objectContaining({ execArgs: ["run-tests", "--watch"] }),
  );
});

test("applyTo() registers the coverage directory as ignored", () => {
  const project = new TestProject();
  const runner = new StubTestRunner(
    { dependencies: [], steps: [] },
    { coverageDirectory: "coverage" },
  );

  project.with(new JavaScriptTestRunner(runner));

  const gitignore = synthSnapshot(project)[".gitignore"];
  expect(gitignore).toContain("/coverage/");
});

test("supports() only matches Project constructs", () => {
  const runner = new StubTestRunner({ dependencies: [], steps: [] });
  const mixin = new JavaScriptTestRunner(runner);

  expect(mixin.supports(new TestProject())).toBe(true);
  expect(mixin.supports({} as any)).toBe(false);
});

test("applyTo() is a no-op for constructs it doesn't support", () => {
  const runner = new StubTestRunner({
    dependencies: [{ name: "some-test-framework" }],
    steps: [{ name: "test", execArgs: ["some-test-framework"] }],
  });
  const mixin = new JavaScriptTestRunner(runner);

  expect(() => mixin.applyTo({} as any)).not.toThrow();
});
