import { Project, TaskRuntime, Tasks, Testing } from "../../src";
import { TasksManifest, TaskStep } from "../../src/task-model";

test("empty task", () => {
  const p = new Project({ name: "my-project" });
  const t = new Tasks(p);

  // WHEN
  t.addTask("empty");

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
  const p = new Project({ name: "my-project" });
  const t = new Tasks(p);

  // WHEN
  const task = t.addTask("task1");
  t.addTask("task2");
  const removeTask = t.removeTask("task1");

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
  const p = new Project({ name: "my-project" });
  const t = new Tasks(p);

  // WHEN
  t.addTask("task1");
  t.addTask("task2");
  const removeTask = t.removeTask("task2");
  t.addTask("task2");

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
  const p = new Project({ name: "my-project" });
  const t = new Tasks(p);

  // WHEN
  const primary = t.addTask("primary");
  const dependent = t.addTask("dependent");
  primary.spawn(dependent);

  // THEN
  expect(() => t.removeTask("dependent")).toThrowError(
    'Unable to remove task "dependent" because the following tasks depend on it: primary'
  );
});

test("remove already removed task", () => {
  const p = new Project({ name: "my-project" });
  const t = new Tasks(p);

  expect(t.removeTask("task1")).toBe(undefined);
});

test('multiple "exec" commands', () => {
  const p = new Project({ name: "my-project" });
  const t = new Tasks(p);

  // WHEN
  const task = t.addTask("hello", {
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
  const p = new Project({ name: "my-project" });
  const t = new Tasks(p);
  const hello = t.addTask("hello", { exec: "echo hello" });
  const world = t.addTask("world");

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
  const p = new Project({ name: "my-project" });
  const t = new Tasks(p);
  const t1 = t.addTask("your-task");
  const t2 = t.addTask("my-task");
  t2.exec("line1");
  t2.spawn(t1);
  t2.exec("line2");

  // WHEN
  t2.reset("line3");
  t2.exec("line4", { cwd: "foo" });

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
  const p = new Project({ name: "my-project" });
  const t = new Tasks(p);
  const sub = t.addTask("my-sub-task", { exec: "subexec" });

  const t1 = t.addTask("my-task");
  t1.exec("line1");

  // WHEN
  t1.prependExec("line2");
  t1.prependSpawn(sub);
  t1.prependSay("message");

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
  const p = new Project({ name: "my-project" });
  const t = new Tasks(p);
  const t1 = t.addTask("my-task", {
    env: {
      INITIAL: "123",
      ENV: "456",
    },
  });

  // WHEN
  t1.env("FOO", "BAR");
  t1.env("HELLO", "world");

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

test(".steps can be used to list all steps in the current task", () => {
  // GIVEN
  const p = new Project({ name: "my-project" });
  const t = new Tasks(p);
  const t0 = t.addTask("your");
  const t1 = t.addTask("my");
  t1.exec("step1");
  t1.exec("step2");
  t1.exec("step3");
  t1.spawn(t0);
  t1.exec("step4");

  // WHEN
  const steps = t1.steps;

  // THEN
  expect(steps).toStrictEqual([
    { exec: "step1" },
    { exec: "step2" },
    { exec: "step3" },
    { spawn: "your" },
    { exec: "step4" },
  ] as TaskStep[]);
});

test('"condition" can be used to define a command that will determine if a task should be skipped', () => {
  // GIVEN
  const p = new Project({ name: "my-project" });
  const t = new Tasks(p);
  t.addTask("foo", {
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

test('"builtin" can be used to execute builtin commands', () => {
  const p = new Project({ name: "my-project" });
  const t = new Tasks(p);
  const task = t.addTask("foo", {
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
  const p = new Project({ name: "my-project" });
  const t = new Tasks(p);
  t.addTask("foo", {
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
  const p = new Project({ name: "my-project" });
  const t = new Tasks(p);
  const t1 = t.addTask("t1");
  const t2 = t.addTask("t2");
  t1.exec("echo hello");
  t1.exec("echo world");

  t1.lock();

  const error = 'Task "t1" is locked for changes';

  expect(() => t1.reset()).toThrow(error);
  expect(() => t1.exec("boom")).toThrow(error);
  expect(() => t1.prependExec("pre")).toThrow(error);
  expect(() => t1.spawn(t2)).toThrow(error);
  expect(() => t1.prependSpawn(t2)).toThrow(error);
  expect(() => t1.builtin("damn")).toThrow(error);
  expect(() => t1.env("Foo", "bar")).toThrow(error);
  expect(() => t1.say("hoho")).toThrow(error);
  expect(() => t1.prependSay("hoho")).toThrow(error);
});

test("it is possible to edit the description", () => {
  const p = new Project({ name: "my-project" });
  const t = new Tasks(p);
  const t1 = t.addTask("t1");
  const t2 = t.addTask("t2", { description: "my description" });

  // WHEN
  t1.description = "hello";
  t2.description = "world";

  // THEN
  const files = Testing.synth(p);
  expect(files[".projen/tasks.json"].tasks.t1.description).toBe("hello");
  expect(files[".projen/tasks.json"].tasks.t2.description).toBe("world");
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
  return Testing.synth(p)[TaskRuntime.MANIFEST_FILE];
}
