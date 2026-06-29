import childProcess from "child_process";
import { readFileSync } from "fs";
import { join } from "path";
import {
  Task,
  TaskShell,
  type Project,
  type TasksManifest,
  type TaskStep,
} from "../../src";
import * as logging from "../../src/logging";
import { ProjenTaskRunner } from "../../src/task-runner";
import { TestProject, synthSnapshot } from "../util";

test("default tasks", () => {
  const p = new TestProject();
  expect(synthTasksManifest(p)).toMatchSnapshot();
});

describe("runTask", () => {
  test("executes the task and forwards arguments", () => {
    // GIVEN
    const p = new TestProject();
    p.addTask("write-args", {
      exec: `node -e "require('fs').writeFileSync('args.txt', process.argv.slice(1).join(','))"`,
      receiveArgs: true,
    });
    p.synth();

    // WHEN
    p.tasks.runTask("write-args", ["hello", 42]);

    // THEN
    expect(readFileSync(join(p.outdir, "args.txt"), "utf-8")).toBe("hello,42");
  });

  test("execArgs passes each element as a single, unescaped argument", () => {
    // GIVEN
    const p = new TestProject();
    p.addTask("write-args", {
      // With `node -e <script> <args...>`, the trailing args become
      // process.argv[1..]; the script itself is not in argv.
      execArgs: [
        "node",
        "-e",
        "require('fs').writeFileSync('args.txt', process.argv.slice(1).join('|'))",
        "a b", // whitespace must be preserved (not word-split)
        "$HOME", // must NOT be expanded by the shell
        "semi;colon", // shell metacharacter must NOT be interpreted
        "quote'd", // embedded single quote must be handled
        'also"d', // embedded double quote must be handled
      ],
    });
    p.synth();

    // WHEN
    p.tasks.runTask("write-args");

    // THEN
    expect(readFileSync(join(p.outdir, "args.txt"), "utf-8")).toBe(
      "a b|$HOME|semi;colon|quote'd|also\"d",
    );
  });

  test("execArgs escapes received args", () => {
    // GIVEN
    const p = new TestProject();
    p.addTask("write-args", {
      execArgs: [
        "node",
        "-e",
        "require('fs').writeFileSync('args.txt', process.argv.slice(1).join('|'))",
      ],
      receiveArgs: true,
    });
    p.synth();

    // WHEN - args with whitespace and metacharacters are appended safely
    p.tasks.runTask("write-args", ["x y", "a;b", "quote'd", 'also"d"']);

    // THEN
    expect(readFileSync(join(p.outdir, "args.txt"), "utf-8")).toBe(
      'x y|a;b|quote\'d|also"d"',
    );
  });

  test("execArgs inserts received args at the $@ marker element", () => {
    // GIVEN
    const p = new TestProject();
    p.addTask("write-args", {
      execArgs: [
        "node",
        "-e",
        "require('fs').writeFileSync('args.txt', process.argv.slice(1).join('|'))",
        "before",
        "$@",
        "after",
      ],
      receiveArgs: true,
    });
    p.synth();

    // WHEN
    p.tasks.runTask("write-args", ["mid"]);

    // THEN - the args are spliced in place of the marker, not appended
    expect(readFileSync(join(p.outdir, "args.txt"), "utf-8")).toBe(
      "before|mid|after",
    );
  });

  test("throws when the task does not exist", () => {
    const p = new TestProject();
    p.synth();

    expect(() => p.tasks.runTask("does-not-exist")).toThrow(
      /cannot find command/,
    );
  });

  test("throws when the task exits with a non-zero code", () => {
    const p = new TestProject();
    p.addTask("boom", { exec: `node -e "process.exit(3)"` });
    p.synth();

    // The CLI translates any task failure into exit code 1, which the runner
    // surfaces as a failed task.
    expect(() => p.tasks.runTask("boom")).toThrow(
      /Task "boom" failed \(exit code 1\)/,
    );
  });

  test("surfaces errors raised while spawning the task runner", () => {
    const p = new TestProject();
    p.addTask("noop", { exec: "echo hi" });
    p.synth();

    const spy = jest
      .spyOn(childProcess, "execFileSync")
      .mockImplementation(() => {
        throw new Error("spawn boom");
      });

    try {
      expect(() => p.tasks.runTask("noop")).toThrow("spawn boom");
    } finally {
      spy.mockRestore();
    }
  });
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
  expect(() => p.removeTask("dependent")).toThrow(
    'Unable to remove task "dependent" because the following tasks depend on it: primary',
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
  },
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

describe("addSteps", () => {
  test("adds an exec step", () => {
    const p = new TestProject();
    const task = p.addTask("my-task");

    task.addSteps({ exec: "echo hello" });

    expectManifest(p, {
      tasks: {
        "my-task": {
          name: "my-task",
          steps: [{ exec: "echo hello" }],
        },
      },
    });
  });

  test("adds a spawn step", () => {
    const p = new TestProject();
    p.addTask("other");
    const task = p.addTask("my-task");

    task.addSteps({ spawn: "other" });

    expectManifest(p, {
      tasks: {
        other: { name: "other" },
        "my-task": {
          name: "my-task",
          steps: [{ spawn: "other" }],
        },
      },
    });
  });

  test("adds a step with options", () => {
    const p = new TestProject();
    const task = p.addTask("my-task");

    task.addSteps({
      exec: "echo hello",
      name: "greet",
      cwd: "/tmp",
      condition: "test -f foo",
    });

    expectManifest(p, {
      tasks: {
        "my-task": {
          name: "my-task",
          steps: [
            {
              exec: "echo hello",
              name: "greet",
              cwd: "/tmp",
              condition: "test -f foo",
            },
          ],
        },
      },
    });
  });

  test("adds multiple steps in order", () => {
    const p = new TestProject();
    const task = p.addTask("my-task");

    task.addSteps({ exec: "step1" });
    task.addSteps({ say: "hello" });
    task.addSteps({ exec: "step2" });

    expectManifest(p, {
      tasks: {
        "my-task": {
          name: "my-task",
          steps: [{ exec: "step1" }, { say: "hello" }, { exec: "step2" }],
        },
      },
    });
  });

  test("prependSteps adds a step at the beginning", () => {
    const p = new TestProject();
    const task = p.addTask("my-task");

    task.addSteps({ exec: "second" });
    task.prependSteps({ exec: "first" });

    expectManifest(p, {
      tasks: {
        "my-task": {
          name: "my-task",
          steps: [{ exec: "first" }, { exec: "second" }],
        },
      },
    });
  });

  test("prependSteps adds multiple steps preserving order", () => {
    const p = new TestProject();
    const task = p.addTask("my-task");

    task.addSteps({ exec: "third" });
    task.prependSteps({ exec: "first" }, { exec: "second" });

    expectManifest(p, {
      tasks: {
        "my-task": {
          name: "my-task",
          steps: [{ exec: "first" }, { exec: "second" }, { exec: "third" }],
        },
      },
    });
  });

  test("addSteps adds multiple steps in one call", () => {
    const p = new TestProject();
    const task = p.addTask("my-task");

    task.addSteps({ exec: "first" }, { say: "hello" }, { exec: "second" });

    expectManifest(p, {
      tasks: {
        "my-task": {
          name: "my-task",
          steps: [{ exec: "first" }, { say: "hello" }, { exec: "second" }],
        },
      },
    });
  });

  test("addSteps warns when steps is a lazy value", () => {
    const p = new TestProject();
    const task = p.addTask("my-task");
    (task as any)._steps = "not-an-array"; // fake lazy

    const spy = jest.spyOn(logging, "warn");
    task.addSteps({ exec: "hello" });

    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('Cannot addSteps to task "my-task"'),
    );
    spy.mockRestore();
  });

  test("prependSteps warns when steps is a lazy value", () => {
    const p = new TestProject();
    const task = p.addTask("my-task");
    (task as any)._steps = "not-an-array"; // fake lazy

    const spy = jest.spyOn(logging, "warn");
    task.prependSteps({ exec: "hello" });

    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('Cannot prependSteps to task "my-task"'),
    );
    spy.mockRestore();
  });
});

describe("execArgs", () => {
  test("renders an execArgs step via the task method", () => {
    const p = new TestProject();
    const t = p.addTask("t");

    // WHEN
    t.execArgs(["echo", "hello world"]);

    // THEN
    expectManifest(p, {
      tasks: {
        t: {
          name: "t",
          steps: [{ execArgs: ["echo", "hello world"] }],
        },
      },
    });
  });

  test("renders an execArgs step via task options", () => {
    const p = new TestProject();

    // WHEN
    p.addTask("t", { execArgs: ["echo", "hello world"], receiveArgs: true });

    // THEN
    expectManifest(p, {
      tasks: {
        t: {
          name: "t",
          steps: [{ execArgs: ["echo", "hello world"], receiveArgs: true }],
        },
      },
    });
  });

  test("throws when specifying both exec and execArgs", () => {
    const p = new TestProject();
    expect(() =>
      p.addTask("t", { exec: "echo hi", execArgs: ["echo", "hi"] }),
    ).toThrow(/cannot specify both exec and execArgs/);
  });

  test("throws when specifying both execArgs and steps", () => {
    const p = new TestProject();
    expect(() =>
      p.addTask("t", {
        execArgs: ["echo", "hi"],
        steps: [{ exec: "echo hi" }],
      }),
    ).toThrow(/cannot specify both execArgs and steps/);
  });
});

function expectManifest(p: Project, toStrictEqual: TasksManifest) {
  const manifest = synthTasksManifest(p);
  delete manifest["//"];
  delete manifest.manifestVersion;

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

describe("shell", () => {
  test("can be set at the task and step level", () => {
    const p = new TestProject();
    const t = p.addTask("t", { shell: TaskShell.bash() });
    t.exec("echo hi", { shell: TaskShell.sh() });

    const spec = t._renderSpec();
    expect(spec.shell).toEqual(["bash", "-c"]);
    expect(spec.steps?.[0]?.shell).toEqual(["sh", "-c"]);
  });

  test("a built-in shell renders to a keyword string", () => {
    const p = new TestProject();
    const t = p.addTask("t", { shell: TaskShell.system() });

    expect(t._renderSpec().shell).toBe("system");
  });

  test("project default shell is rendered into the manifest", () => {
    const p = new TestProject();
    p.tasks.shell = TaskShell.command(["bash", "-c"]);

    expect(synthTasksManifest(p).shell).toEqual(["bash", "-c"]);
  });
});

function synthTasksManifest(p: Project) {
  return synthSnapshot(p)[ProjenTaskRunner.MANIFEST_FILE];
}

describe("TaskShell", () => {
  test("projen() and system() render the built-in keywords", () => {
    expect(TaskShell.projen()._render()).toBe("projen");
    expect(TaskShell.system()._render()).toBe("system");
  });

  test("bash() and sh() render the shell invocation", () => {
    expect(TaskShell.bash()._render()).toEqual(["bash", "-c"]);
    expect(TaskShell.sh()._render()).toEqual(["sh", "-c"]);
  });

  test("command() renders the explicit invocation and defensively copies it", () => {
    const argv = ["npx", "-c"];
    const rendered = TaskShell.command(argv)._render();
    expect(rendered).toEqual(["npx", "-c"]);
    expect(rendered).not.toBe(argv);
  });

  test("command() rejects an empty invocation", () => {
    expect(() => TaskShell.command([])).toThrow(
      /requires at least the shell program/,
    );
  });

  test("the task and project shell properties round-trip", () => {
    const p = new TestProject();

    p.tasks.shell = TaskShell.system();
    expect(p.tasks.shell?._render()).toBe("system");

    const t = p.addTask("t");
    t.shell = TaskShell.bash();
    expect(t.shell?._render()).toEqual(["bash", "-c"]);
  });

  test("a task cannot specify both execArgs and steps", () => {
    const p = new TestProject();
    expect(() =>
      p.addTask("t", {
        execArgs: ["echo", "hi"],
        steps: [{ exec: "echo bye" }],
      }),
    ).toThrow(/cannot specify both execArgs and steps/);
  });
});

describe("Task line coverage", () => {
  test("cannot specify both exec and steps", () => {
    expect(
      () => new Task("t", { exec: "echo hi", steps: [{ exec: "x" }] }),
    ).toThrow(/cannot specify both exec and steps/);
  });

  test("the cwd property round-trips", () => {
    const t = new Task("t");
    t.cwd = "/work/dir";
    expect(t.cwd).toBe("/work/dir");
  });

  test("updateStep throws for an out-of-range index", () => {
    const t = new Task("t", { steps: [{ exec: "a" }] });
    expect(() => t.updateStep(5, { exec: "b" })).toThrow(
      /Cannot update step at index 5/,
    );
  });

  test("removeStep throws for an out-of-range index", () => {
    const t = new Task("t", { steps: [{ exec: "a" }] });
    expect(() => t.removeStep(5)).toThrow(/Cannot remove step at index 5/);
  });

  describe("with lazily-resolved (non-array) steps", () => {
    // steps may be a Lazy token that only resolves at synthesis; until then
    // `_steps` is not an array, so the mutators warn and no-op rather than
    // operate on an unresolved value.
    const lazySteps = "${token}" as unknown as TaskStep[];

    test("the steps getter returns an empty array", () => {
      expect(new Task("t", { steps: lazySteps }).steps).toEqual([]);
    });

    test("mutators warn and no-op instead of throwing", () => {
      const warnSpy = jest.spyOn(logging, "warn").mockImplementation(() => {});

      const t = new Task("t", { steps: lazySteps });
      t.reset();
      t.insertStep(0, { exec: "x" });
      t.updateStep(0, { exec: "x" });
      t.removeStep(0);
      t.exec("echo hi");
      t.prependExec("echo bye");

      expect(warnSpy).toHaveBeenCalled();
      warnSpy.mockRestore();
    });
  });
});

describe("Tasks line coverage", () => {
  test("addTask throws when a task with the same name already exists", () => {
    const p = new TestProject();
    p.addTask("dup");
    expect(() => p.addTask("dup")).toThrow(
      /A task with the name dup already exists/,
    );
  });
});
