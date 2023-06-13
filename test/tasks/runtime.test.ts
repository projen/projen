import { spawnSync } from "child_process";
import { mkdirSync } from "fs";
import { EOL } from "os";
import { basename, join } from "path";
import { Project } from "../../src";
import * as logging from "../../src/logging";
import { TaskRuntime } from "../../src/task-runtime";
import { TestProject } from "../util";

test("minimal case (just a shell command)", () => {
  // GIVEN
  const p = new TestProject();

  // WHEN
  p.addTask("test1", {
    exec: "echo hello_tasks!",
  });

  // THEN
  expect(executeTask(p, "test1")).toEqual(["hello_tasks!"]);
});

test("fails if the step fails", () => {
  // GIVEN
  const p = new TestProject();

  // WHEN
  p.addTask("testme", {
    exec: "false",
  });

  // THEN
  expect(() => executeTask(p, "testme")).toThrow(
    /Task \"testme\" failed when executing \"false\"/
  );
});

test("multiple steps", () => {
  // GIVEN
  const p = new TestProject();
  const t = p.addTask("testme");

  // WHEN
  t.exec("echo step1");
  t.exec("echo step2");
  t.exec("echo step3");

  // THEN
  expect(executeTask(p, "testme")).toEqual(["step1", "step2", "step3"]);
});

test("execution stops if a step fails", () => {
  // GIVEN
  const p = new TestProject();
  const t = p.addTask("testme");

  // WHEN
  t.exec("echo step1");
  t.exec("echo step2");
  t.exec("echo step3");
  t.exec("echo failing && false");
  t.exec("echo step4");

  // THEN
  expect(() => executeTask(p, "testme")).toThrow(
    /Task \"testme\" failed when executing \"echo failing && false\"/
  );
});

describe("environment variables", () => {
  test("are accessible from exec", () => {
    // GIVEN
    const p = new TestProject();

    // WHEN
    p.addTask("test:env", {
      exec: "echo ${VALUE}!",
      env: {
        VALUE: "my_environment_var",
      },
    });

    // THEN
    expect(executeTask(p, "test:env")).toEqual(["my_environment_var!"]);
  });

  test("can be set on individual steps", () => {
    // GIVEN
    const p = new TestProject();

    // WHEN
    const t = p.addTask("test:env:stepwise", {
      env: { VALUE: "something" },
      steps: [
        { exec: "echo ${VALUE}", env: { VALUE: "foo" } },
        { exec: "echo ${VALUE}", env: { VALUE: "bar" } },
      ],
    });
    t.exec("echo ${VALUE}", { env: { VALUE: "baz" } });

    // THEN
    expect(executeTask(p, "test:env:stepwise")).toEqual(["foo", "bar", "baz"]);
  });

  test("are resolved dynamically (step vars)", () => {
    // GIVEN
    const p = new TestProject();

    // WHEN
    const t = p.addTask("test:env:stepwise", {
      env: { VALUE: "something" },
      steps: [
        { exec: "echo ${VALUE}", env: { VALUE: "$(echo foo)" } },
        { exec: "echo ${VALUE}", env: { VALUE: "$(echo bar)" } },
      ],
    });
    t.exec("echo ${VALUE}", { env: { VALUE: "$(echo baz)" } });

    // THEN
    expect(executeTask(p, "test:env:stepwise")).toEqual(["foo", "bar", "baz"]);
  });

  test("are resolved dynamically (task vars)", () => {
    // GIVEN
    const p = new TestProject();

    // WHEN
    p.addTask("test:env", {
      exec: "echo ${VALUE}!",
      env: {
        VALUE: '$(echo "dynamic_value")',
      },
    });

    // THEN
    expect(executeTask(p, "test:env")).toEqual(["dynamic_value!"]);
  });

  test("are resolved lazily (step vars)", () => {
    // GIVEN
    const p = new TestProject();

    // WHEN
    const t = p.addTask("test:env");
    t.exec("echo testing >> test.txt");
    // VALUE wouldn't return anything if evaluated up front
    t.exec("echo ${VALUE}", { env: { VALUE: "$(cat test.txt)" } });

    // THEN
    expect(executeTask(p, "test:env")).toEqual(["testing"]);
  });

  test("numerics are converted properly (step vars)", () => {
    // GIVEN
    const warn = jest.spyOn(logging, "warn");
    const p = new TestProject();

    // WHEN
    p.addTask("test:env", {
      steps: [
        { exec: "echo ${VALUE}!", env: { VALUE: 1 as unknown as string } },
      ],
    });

    // THEN
    expect(executeTask(p, "test:env")).toEqual(["1!"]);
    expect(warn).toBeCalledWith(
      "Received non-string value for environment variable VALUE. Value will be stringified."
    );
    warn.mockRestore();
  });

  test("numerics are converted properly (task vars)", () => {
    // GIVEN
    const warn = jest.spyOn(logging, "warn");
    const p = new TestProject();

    // WHEN
    p.addTask("test:env", {
      exec: "echo ${VALUE}!",
      env: {
        VALUE: 1 as unknown as string,
      },
    });

    // THEN
    expect(executeTask(p, "test:env")).toEqual(["1!"]);
    expect(warn).toBeCalledWith(
      "Received non-string value for environment variable VALUE. Value will be stringified."
    );
    warn.mockRestore();
  });

  test("numerics are converted properly (global vars)", () => {
    // GIVEN
    const p = new TestProject();

    // WHEN
    p.addTask("test:env", {
      exec: "echo ${VALUE}!",
    });
    p.tasks.addEnvironment("VALUE", 1 as unknown as string);

    // THEN
    expect(executeTask(p, "test:env")).toEqual(["1!"]);
  });
});

describe("task condition", () => {
  test("zero exit code means that steps should be executed", () => {
    // GIVEN
    const p = new TestProject();

    // WHEN
    const t = p.addTask("foo", {
      condition: "echo evaluating_condition",
    });

    t.exec("echo step1");
    t.exec("echo step2");

    // THEN
    expect(executeTask(p, "foo")).toEqual([
      "evaluating_condition",
      "step1",
      "step2",
    ]);
  });

  test("non-zero exit code means steps should not be executed", () => {
    // GIVEN
    const p = new TestProject();

    // WHEN
    const t = p.addTask("foo", {
      condition: "echo failing_condition && false",
    });

    t.exec("echo step1");
    t.exec("echo step2");

    // THEN
    expect(executeTask(p, "foo")).toEqual(["failing_condition"]);
  });
});

describe("step condition", () => {
  test("zero exit code means that step should be executed", () => {
    // GIVEN
    const p = new TestProject();

    // WHEN
    const t = p.addTask("foo");

    t.exec("echo step0");
    t.exec("echo step1", { condition: "echo yes" });

    // THEN
    expect(executeTask(p, "foo")).toEqual(["step0", "yes", "step1"]);
  });

  test("non-zero exit code means step should not be executed", () => {
    // GIVEN
    const p = new TestProject();

    // WHEN
    const t = p.addTask("foo");

    t.exec("echo step0");
    t.exec("echo step1", { condition: "echo no && false" });
    t.exec("echo step2");

    // THEN
    expect(executeTask(p, "foo")).toEqual(["step0", "no", "step2"]);
  });
});

describe("cwd", () => {
  test("default cwd is project root", () => {
    const p = new TestProject();
    p.addTask("testme", { exec: "echo cwd is $PWD" });
    expect(
      executeTask(p, "testme")[0].includes(basename(p.outdir))
    ).toBeTruthy();
  });

  test("if a step changes cwd, it will not affect next steps", () => {
    const p = new TestProject();
    const task = p.addTask("testme");
    task.exec("cd /tmp");
    task.exec("echo $PWD");
    expect(
      executeTask(p, "testme")[0].includes(basename(p.outdir))
    ).toBeTruthy();
  });

  test("cwd can be set at the task level", () => {
    const p = new TestProject();
    const cwd = join(p.outdir, "mypwd");
    mkdirSync(cwd, { recursive: true });
    const task = p.addTask("testme", {
      cwd,
    });
    task.exec("echo step1=$PWD");
    task.exec("echo step2=$PWD");
    for (const line of executeTask(p, "testme")) {
      expect(line.includes("mypwd")).toBeTruthy();
    }
  });

  test("cwd can be set at step level", () => {
    const p = new TestProject();
    const taskcwd = join(p.outdir, "mypwd");
    const stepcwd = join(p.outdir, "yourpwd");
    mkdirSync(taskcwd, { recursive: true });
    mkdirSync(stepcwd, { recursive: true });
    const task = p.addTask("testme", { cwd: taskcwd });
    task.exec("echo step1=$PWD");
    task.exec("echo step2=$PWD", { cwd: stepcwd });

    const lines = executeTask(p, "testme");
    expect(lines[0].includes("mypwd")).toBeTruthy();
    expect(lines[1].includes("yourpwd")).toBeTruthy();
  });

  test("fails gracefully if cwd does not exist (task level)", () => {
    const p = new TestProject();
    p.addTask("testme", {
      cwd: join(p.outdir, "not-found"),
      exec: "echo hi",
    });
    expect(() => executeTask(p, "testme")).toThrow(/invalid workdir/);
  });

  test("fails gracefully if cwd does not exist (step level)", () => {
    const p = new TestProject();
    const task = p.addTask("testme");
    task.exec("echo step", { cwd: join(p.outdir, "mystep") });
    expect(() => executeTask(p, "testme")).toThrow(
      /must be an existing directory/
    );
  });
});

describe("say", () => {
  test('"say" can be used to print an info log during execution', () => {
    const p = new TestProject();
    const task = p.addTask("say");
    task.say("hello, world");

    p.synth();

    const rt = new TaskRuntime(p.outdir);
    expect(rt.tasks.find((t) => t.name === "say")).toStrictEqual({
      name: "say",
      steps: [{ say: "hello, world" }],
    });
  });
});

test("builtin tasks are scripts embedded inside projen", () => {
  const p = new TestProject();
  const task = p.addTask("boom");
  task.builtin("builtin-example");
  p.synth();

  const lines = executeTask(p, "boom");
  expect(lines).toStrictEqual(["hello, I am a builtin task", "second line"]);
});

test("env is inherited from parent tasks", () => {
  const p = new TestProject();
  const parent = p.addTask("parent", { env: { E1: "parent1", E2: "parent2" } });
  const child = p.addTask("child", {
    env: { E2: "child1", E3: "child2" },
    exec: 'echo "child: [$E1,$E2,$E3]"',
  });
  parent.exec('echo "parent: [$E1,$E2,$E3]"');
  parent.spawn(child);

  const lines = executeTask(p, "parent");
  expect(lines).toStrictEqual([
    "parent: [parent1,parent2,]",
    "child: [parent1,child1,child2]",
  ]);
});

test("requiredEnv can be used to specify required environment variables", () => {
  const p = new TestProject();
  p.addTask("my-task", {
    requiredEnv: ["ENV1", "ENV2", "ENV3"],
    exec: 'echo "$ENV1 $ENV2 $ENV3"',
  });

  expect(() => executeTask(p, "my-task")).toThrow(
    /missing required environment variables: ENV1,ENV2,ENV3/
  );
  expect(() => executeTask(p, "my-task", { ENV1: "env1" })).toThrow(
    /missing required environment variables: ENV2,ENV3/
  );
  expect(
    executeTask(p, "my-task", { ENV1: "env1", ENV2: "env2", ENV3: "env3" })
  ).toStrictEqual(["env1 env2 env3"]);
});

test("exec can receive args", () => {
  // GIVEN
  const p = new TestProject();

  // WHEN
  p.addTask("test1", {
    exec: "echo hello",
    receiveArgs: true,
  });

  // THEN
  expect(
    executeTask(p, "test1", {}, ["world", "and", "other", "planets"])
  ).toEqual(["hello world and other planets"]);
});

test("exec can receive args at marker", () => {
  // GIVEN
  const p = new TestProject();

  // WHEN
  p.addTask("test1", {
    exec: "echo hello $@ world",
    receiveArgs: true,
  });

  // THEN
  expect(executeTask(p, "test1", {}, ["beautiful", "and", "round"])).toEqual([
    "hello beautiful and round world",
  ]);
});

test("spawn can receive args", () => {
  const p = new TestProject();
  const parent = p.addTask("parent");
  const child = p.addTask("child", {
    exec: 'echo "child: [$@]"',
    receiveArgs: true,
  });
  parent.spawn(child, { receiveArgs: true });

  expect(executeTask(p, "parent", {}, ["one", "--two", "-3"])).toStrictEqual([
    "child: [one --two -3]",
  ]);
});

test("spawn can receive fixed args", () => {
  const p = new TestProject();
  const parent = p.addTask("parent");
  const child = p.addTask("child", {
    exec: 'echo "child: [$@]"',
    receiveArgs: true,
  });
  parent.spawn(child, { args: ["one", "--two", "-3"] });

  expect(executeTask(p, "parent", {})).toStrictEqual(["child: [one --two -3]"]);
});

test("exec can receive fixed args", () => {
  const p = new TestProject();
  const t = p.addTask("test1");
  t.exec('echo "child: [$@]"', {
    args: ["one", "--two", "-3"],
  });

  expect(executeTask(p, "test1")).toStrictEqual(["child: [one --two -3]"]);
});

function executeTask(
  p: Project,
  taskName: string,
  env: Record<string, string> = {},
  additionalArgs: string[] = []
) {
  p.synth();

  const args = [require.resolve("../../lib/cli"), taskName].map(
    (x) => `"${x}"`
  );

  const result = spawnSync(
    `"${process.execPath}"`,
    [...args, ...additionalArgs],
    {
      cwd: p.outdir,
      shell: true,
      env: { ...process.env, ...env },
      timeout: 10_000, // let's try to catch hanging processes sooner than later
    }
  );
  if (result.status !== 0) {
    throw new Error(`non-zero exit code: ${result.stderr.toString("utf-8")}`);
  }

  return result.stdout.toString("utf-8").trim().split(EOL);
}
