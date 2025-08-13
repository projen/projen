import { Project, TaskRuntime } from "../../src";
import { TasksManifest, TaskStep } from "../../src/task-model";
import { TestProject, synthSnapshot } from "../util";

test("default tasks", () => {
  const p = new TestProject();
  expect(synthTasksManifest(p)).toMatchSnapshot();
});

test("empty task", () => {
  const p = new TestProject();

  // WHEN
  p.addTask("empty");

  // THEN
  expectManifest(p, {
    tasks: {
      empty: {
        name: "empty",
      },
    },
  });
});

test("remove task", () => {
  const p = new TestProject();

  // WHEN
  const task = p.addTask("task1");
  p.addTask("task2");
  const removeTask = p.removeTask("task1");

  // THEN
  expect(removeTask).toEqual(task);
  expectManifest(p, {
    tasks: {
      task2: {
        name: "task2",
      },
    },
  });
});

test("re-add removed task", () => {
  const p = new TestProject();

  // WHEN
  p.addTask("task1");
  p.addTask("task2");
  const removeTask = p.removeTask("task2");
  p.addTask("task2");

  // THEN
  expect(removeTask).toBeTruthy();
  expectManifest(p, {
    tasks: {
      task1: {
        name: "task1",
      },
      task2: {
        name: "task2",
      },
    },
  });
});

test("throw when removing a dependent task", () => {
  const p = new TestProject();

  // WHEN
  const primary = p.addTask("primary");
  const dependent = p.addTask("dependent");
  primary.spawn(dependent);

  // THEN
  expect(() => p.removeTask("dependent")).toThrowError(
    'Unable to remove task "dependent" because the following tasks depend on it: primary'
  );
});

test("remove already removed task", () => {
  const p = new TestProject();

  expect(p.removeTask("task1")).toBe(undefined);
});

test('multiple "exec" commands', () => {
  const p = new TestProject();

  // WHEN
  const task = p.addTask("hello", {
    description: "hello, world",
    exec: "echo hello", // initial command
    env: {
      FOO: "bar",
    },
  });

  task.exec("echo world");
  task.exec('echo "with quotes"');
  task.env("BAR", "baz");

  // THEN
  expectManifest(p, {
    tasks: {
      hello: {
        name: "hello",
        description: "hello, world",
        env: {
          FOO: "bar",
          BAR: "baz",
        },
        steps: [
          { exec: "echo hello" },
          { exec: "echo world" },
          { exec: 'echo "with quotes"' },
        ],
      },
    },
  });
});

test("subtasks", () => {
  // GIVEN
  const p = new TestProject();
  const hello = p.addTask("hello", { exec: "echo hello" });
  const world = p.addTask("world");

  // WHEN
  world.exec('echo "running hello"');
  world.spawn(hello);

  // THEN
  expectManifest(p, {
    tasks: {
      hello: {
        name: "hello",
        steps: [{ exec: "echo hello" }],
      },
      world: {
        name: "world",
        steps: [{ exec: 'echo "running hello"' }, { spawn: "hello" }],
      },
    },
  });
});

test("reset() can be used to reset task steps", () => {
  // GIVEN
  const p = new TestProject();
  const t0 = p.addTask("your-task");
  const t = p.addTask("my-task");
  t.exec("line1");
  t.spawn(t0);
  t.exec("line2");

  // WHEN
  t.reset("line3");
  t.exec("line4", { cwd: "foo" });

  // THEN
  expectManifest(p, {
    tasks: {
      "your-task": {
        name: "your-task",
      },
      "my-task": {
        name: "my-task",
        steps: [{ exec: "line3" }, { cwd: "foo", exec: "line4" }],
      },
    },
  });
});

test("prependXXX() can be used to add steps from the top", () => {
  // GIVEN
  const p = new TestProject();
  const sub = p.addTask("my-sub-task", { exec: "subexec" });

  const t = p.addTask("my-task");
  t.exec("line1");

  // WHEN
  t.prependExec("line2");
  t.prependSpawn(sub);
  t.prependSay("message");

  // THEN
  expectManifest(p, {
    tasks: {
      "my-sub-task": {
        name: "my-sub-task",
        steps: [{ exec: "subexec" }],
      },
      "my-task": {
        name: "my-task",
        steps: [
          { say: "message" },
          { spawn: "my-sub-task" },
          { exec: "line2" },
          { exec: "line1" },
        ],
      },
    },
  });
});

test("env() can be used to add environment variables", () => {
  // GIVEN
  const p = new TestProject();
  const t = p.addTask("my-task", {
    env: {
      INITIAL: "123",
      ENV: "456",
    },
  });

  // WHEN
  t.env("FOO", "BAR");
  t.env("HELLO", "world");

  // THEN
  expectManifest(p, {
    tasks: {
      "my-task": {
        name: "my-task",
        env: {
          INITIAL: "123",
          ENV: "456",
          FOO: "BAR",
          HELLO: "world",
        },
      },
    },
  });
});

test(".envVars returns all environment variables in the task level", () => {
  // GIVEN
  const p = new TestProject();
  const t = p.addTask("my-task", {
    env: {
      INITIAL: "123",
      ENV: "456",
    },
  });

  // WHEN
  t.env("FOO", "BAR");
  t.env("HELLO", "world");

  expect(t.envVars).toStrictEqual({
    INITIAL: "123",
    ENV: "456",
    FOO: "BAR",
    HELLO: "world",
  });
});

test(".steps can be used to list all steps in the current task", () => {
  // GIVEN
  const p = new TestProject();
  const t0 = p.addTask("your");
  const t = p.addTask("my");
  t.exec("step1");
  t.exec("step2");
  t.exec("step3");
  t.spawn(t0);
  t.exec("step4");

  // WHEN
  const steps = t.steps;

  // THEN
  expect(steps).toStrictEqual([
    { exec: "step1" },
    { exec: "step2" },
    { exec: "step3" },
    { spawn: "your" },
    { exec: "step4" },
  ] as TaskStep[]);
});

test("updateStep() can be used to replace a specific step", () => {
  // GIVEN
  const p = new TestProject();
  const t0 = p.addTask("your");
  const t = p.addTask("my");
  t.exec("step1");
  t.exec("step2");
  t.exec("step3");
  t.spawn(t0);
  t.exec("step4");

  // WHEN
  t.updateStep(2, { exec: "edited" });

  // THEN
  expectManifest(p, {
    tasks: {
      your: {
        name: "your",
      },
      my: {
        name: "my",
        steps: [
          { exec: "step1" },
          { exec: "step2" },
          { exec: "edited" },
          { spawn: "your" },
          { exec: "step4" },
        ],
      },
    },
  });
});

test.each([[2], [-2]])(
  "insertStep(%p) can be used to insert a step at a specific location",
  (index) => {
    // GIVEN
    const p = new TestProject();
    const t = p.addTask("my");
    t.exec("step1");
    t.exec("step2");
    t.exec("step3");
    t.exec("step4");

    t.insertStep(index, { exec: "step2.5" });

    // THEN
    expectManifest(p, {
      tasks: {
        my: {
          name: "my",
          steps: [
            { exec: "step1" },
            { exec: "step2" },
            { exec: "step2.5" },
            { exec: "step3" },
            { exec: "step4" },
          ],
        },
      },
    });
  }
);

test("insertStep throws if the index is out of bounds", () => {
  // GIVEN
  const p = new TestProject();
  const t = p.addTask("my");
  t.exec("step1");
  t.exec("step2");
  t.exec("step3");
  t.exec("step4");

  expect(() => t.insertStep(-5, { exec: "asdf" })).toThrow(/out of bounds/);
  expect(() => t.insertStep(5, { exec: "asdf" })).toThrow(/out of bounds/);
});

test("removeStep() can be used to remove a specific step", () => {
  // GIVEN
  const p = new TestProject();
  const t0 = p.addTask("your");
  const t = p.addTask("my");
  t.exec("step1");
  t.exec("step2");
  t.exec("step3");
  t.spawn(t0);
  t.exec("step4");

  // WHEN
  t.removeStep(2);

  // THEN
  expectManifest(p, {
    tasks: {
      your: {
        name: "your",
      },
      my: {
        name: "my",
        steps: [
          { exec: "step1" },
          { exec: "step2" },
          { spawn: "your" },
          { exec: "step4" },
        ],
      },
    },
  });
});

test('"condition" can be used to define a command that will determine if a task should be skipped', () => {
  // GIVEN
  const p = new TestProject();
  p.addTask("foo", {
    condition: "false",
    exec: "foo bar",
  });

  // THEN
  expectManifest(p, {
    tasks: {
      foo: {
        name: "foo",
        condition: "false",
        steps: [{ exec: "foo bar" }],
      },
    },
  });
});

test('"addCondition" can be added after task initialized', () => {
  // GIVEN
  const p = new TestProject();
  const t = p.addTask("foo", {
    condition: undefined,
    exec: "foo bar",
  });
  t.addCondition("false");

  // THEN
  expectManifest(p, {
    tasks: {
      foo: {
        name: "foo",
        condition: "false",
        steps: [{ exec: "foo bar" }],
      },
    },
  });
});

test('"addCondition" can append additional condition', () => {
  // GIVEN
  const p = new TestProject();
  const t = p.addTask("foo", {
    condition: "a",
    exec: "foo bar",
  });
  t.addCondition("b");

  // THEN
  expectManifest(p, {
    tasks: {
      foo: {
        name: "foo",
        condition: "a && b",
        steps: [{ exec: "foo bar" }],
      },
    },
  });
});

test('"builtin" can be used to execute builtin commands', () => {
  const p = new TestProject();
  const task = p.addTask("foo", {
    condition: "false",
  });

  task.builtin("my/builtin");
  task.builtin("your/builtin");

  // THEN
  expectManifest(p, {
    tasks: {
      foo: {
        name: "foo",
        condition: "false",
        steps: [{ builtin: "my/builtin" }, { builtin: "your/builtin" }],
      },
    },
  });
});

test('"requiredEnv" can be used to specify required environment variables', () => {
  const p = new TestProject();
  p.addTask("foo", {
    requiredEnv: ["MISSING1", "MISSING2", "NOT_MISSING"],
  });

  // THEN
  expectManifest(p, {
    tasks: {
      foo: {
        name: "foo",
        requiredEnv: ["MISSING1", "MISSING2", "NOT_MISSING"],
      },
    },
  });
});

test("lock() can be used to disallow modifications", () => {
  const p = new TestProject();
  const t = p.addTask("t1");
  const t2 = p.addTask("t2");
  t.exec("echo hello");
  t.exec("echo world");

  t.lock();

  const error = 'Task "t1" is locked for changes';

  expect(() => t.reset()).toThrow(error);
  expect(() => t.exec("boom")).toThrow(error);
  expect(() => t.prependExec("pre")).toThrow(error);
  expect(() => t.spawn(t2)).toThrow(error);
  expect(() => t.prependSpawn(t2)).toThrow(error);
  expect(() => t.builtin("damn")).toThrow(error);
  expect(() => t.env("Foo", "bar")).toThrow(error);
  expect(() => t.say("hoho")).toThrow(error);
  expect(() => t.prependSay("hoho")).toThrow(error);
});

test("it is possible to edit the description", () => {
  const p = new TestProject();
  const t1 = p.addTask("t1");
  const t2 = p.addTask("t2", { description: "my description" });

  // WHEN
  t1.description = "hello";
  t2.description = "world";

  // THEN
  const files = synthSnapshot(p);
  expect(files[".projen/tasks.json"].tasks.t1.description).toBe("hello");
  expect(files[".projen/tasks.json"].tasks.t2.description).toBe("world");
});

test("steps can receive args", () => {
  const p = new TestProject();

  // WHEN
  const hello = p.addTask("hello");
  const world = p.addTask("world", {
    exec: "echo $@ world",
    receiveArgs: true,
  });

  hello.exec("echo hello", { receiveArgs: true });
  hello.spawn(world, { receiveArgs: true });

  // THEN
  expectManifest(p, {
    tasks: {
      hello: {
        name: "hello",
        steps: [
          { exec: "echo hello", receiveArgs: true },
          { spawn: "world", receiveArgs: true },
        ],
      },
      world: {
        name: "world",
        steps: [{ exec: "echo $@ world", receiveArgs: true }],
      },
    },
  });
});

test("allows setting the cwd for the task", () => {
  const p = new TestProject();
  const t = p.addTask("t", {
    cwd: "foo",
  });

  // WHEN
  t.cwd = "bar";

  // THEN
  expectManifest(p, {
    tasks: {
      t: {
        name: "t",
        cwd: "bar",
      },
    },
  });
});

function expectManifest(p: Project, toStrictEqual: TasksManifest) {
  const manifest = synthTasksManifest(p);
  delete manifest["//"];

  // delete all standard tasks
  delete manifest.tasks.build;
  delete manifest.tasks["pre-compile"];
  delete manifest.tasks.compile;
  delete manifest.tasks["post-compile"];
  delete manifest.tasks.test;
  delete manifest.tasks.default;
  delete manifest.tasks.package;
  delete manifest.tasks.eject;

  expect(manifest).toStrictEqual(toStrictEqual);
}

function synthTasksManifest(p: Project) {
  return synthSnapshot(p)[TaskRuntime.MANIFEST_FILE];
}
