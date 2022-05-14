import { spawnSync } from "child_process";
import { EOL } from "os";
import { basename, join } from "path";
import { mkdirpSync } from "fs-extra";
import { Project, Tasks } from "../../src";
import { TaskRuntime } from "../../src/task-runtime";

test("minimal case (just a shell command)", () => {
  // GIVEN
  const p = new Project({ name: "my-project" });
  const t = new Tasks(p);

  // WHEN
  t.addTask("test1", {
    exec: "echo hello_tasks!",
  });

  // THEN
  expect(executeTask(p, "test1")).toEqual(["hello_tasks!"]);
});

test("fails if the step fails", () => {
  // GIVEN
  const p = new Project({ name: "my-project" });
  const t = new Tasks(p);

  // WHEN
  t.addTask("testme", {
    exec: "false",
  });

  // THEN
  expect(() => executeTask(p, "testme")).toThrow(
    /Task \"testme\" failed when executing \"false\"/
  );
});

test("multiple steps", () => {
  // GIVEN
  const p = new Project({ name: "my-project" });
  const t = new Tasks(p);
  const t1 = t.addTask("testme");

  // WHEN
  t1.exec("echo step1");
  t1.exec("echo step2");
  t1.exec("echo step3");

  // THEN
  expect(executeTask(p, "testme")).toEqual(["step1", "step2", "step3"]);
});

test("execution stops if a step fails", () => {
  // GIVEN
  const p = new Project({ name: "my-project" });
  const t = new Tasks(p);
  const t1 = t.addTask("testme");

  // WHEN
  t1.exec("echo step1");
  t1.exec("echo step2");
  t1.exec("echo step3");
  t1.exec("echo failing && false");
  t1.exec("echo step4");

  // THEN
  expect(() => executeTask(p, "testme")).toThrow(
    /Task \"testme\" failed when executing \"echo failing && false\"/
  );
});

describe("condition", () => {
  test("zero exit code means that steps should be executed", () => {
    // GIVEN
    const p = new Project({ name: "my-project" });
    const t = new Tasks(p);

    // WHEN
    const t1 = t.addTask("foo", {
      condition: "echo evaluating_condition",
    });

    t1.exec("echo step1");
    t1.exec("echo step2");

    // THEN
    expect(executeTask(p, "foo")).toEqual([
      "evaluating_condition",
      "step1",
      "step2",
    ]);
  });

  test("non-zero exit code means steps should not be executed", () => {
    // GIVEN
    const p = new Project({ name: "my-project" });
    const t = new Tasks(p);

    // WHEN
    const t1 = t.addTask("foo", {
      condition: "echo failing_condition && false",
    });

    t1.exec("echo step1");
    t1.exec("echo step2");

    // THEN
    expect(executeTask(p, "foo")).toEqual(["failing_condition"]);
  });
});

describe("cwd", () => {
  test("default cwd is project root", () => {
    const p = new Project({ name: "my-project" });
    const t = new Tasks(p);
    t.addTask("testme", { exec: "echo cwd is $PWD" });
    expect(
      executeTask(p, "testme")[0].includes(basename(p.outdir))
    ).toBeTruthy();
  });

  test("if a step changes cwd, it will not affect next steps", () => {
    const p = new Project({ name: "my-project" });
    const t = new Tasks(p);
    const task = t.addTask("testme");
    task.exec("cd /tmp");
    task.exec("echo $PWD");
    expect(
      executeTask(p, "testme")[0].includes(basename(p.outdir))
    ).toBeTruthy();
  });

  test("cwd can be set at the task level", () => {
    const p = new Project({ name: "my-project" });
    const t = new Tasks(p);
    const cwd = join(p.outdir, "mypwd");
    mkdirpSync(cwd);
    const task = t.addTask("testme", {
      cwd,
    });
    task.exec("echo step1=$PWD");
    task.exec("echo step2=$PWD");
    for (const line of executeTask(p, "testme")) {
      expect(line.includes("mypwd")).toBeTruthy();
    }
  });

  test("cwd can be set at step level", () => {
    const p = new Project({ name: "my-project" });
    const t = new Tasks(p);
    const taskcwd = join(p.outdir, "mypwd");
    const stepcwd = join(p.outdir, "yourpwd");
    mkdirpSync(taskcwd);
    mkdirpSync(stepcwd);
    const task = t.addTask("testme", { cwd: taskcwd });
    task.exec("echo step1=$PWD");
    task.exec("echo step2=$PWD", { cwd: stepcwd });

    const lines = executeTask(p, "testme");
    expect(lines[0].includes("mypwd")).toBeTruthy();
    expect(lines[1].includes("yourpwd")).toBeTruthy();
  });

  test("fails gracefully if cwd does not exist (task level)", () => {
    const p = new Project({ name: "my-project" });
    const t = new Tasks(p);
    t.addTask("testme", {
      cwd: join(p.outdir, "not-found"),
      exec: "echo hi",
    });
    expect(() => executeTask(p, "testme")).toThrow(/invalid workdir/);
  });

  test("fails gracefully if cwd does not exist (step level)", () => {
    const p = new Project({ name: "my-project" });
    const t = new Tasks(p);
    const task = t.addTask("testme");
    task.exec("echo step", { cwd: join(p.outdir, "mystep") });
    expect(() => executeTask(p, "testme")).toThrow(
      /must be an existing directory/
    );
  });
});

describe("say", () => {
  test('"say" can be used to print an info log during execution', () => {
    const p = new Project({ name: "my-project" });
    const t = new Tasks(p);
    const task = t.addTask("say");
    task.say("hello, world");

    p.synth();

    const rt = new TaskRuntime(p.outdir);
    expect(rt.tasks.find((tsk) => tsk.name === "say")).toStrictEqual({
      name: "say",
      steps: [{ say: "hello, world" }],
    });
  });
});

test("builtin tasks are scripts embedded inside projen", () => {
  const p = new Project({ name: "my-project" });
  const t = new Tasks(p);
  const task = t.addTask("boom");
  task.builtin("builtin-example");
  p.synth();

  const lines = executeTask(p, "boom");
  expect(lines).toStrictEqual(["hello, I am a builtin task", "second line"]);
});

test("env is inherited from parent tasks", () => {
  const p = new Project({ name: "my-project" });
  const t = new Tasks(p);
  const parent = t.addTask("parent", { env: { E1: "parent1", E2: "parent2" } });
  const child = t.addTask("child", {
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
  const p = new Project({ name: "my-project" });
  const t = new Tasks(p);
  t.addTask("my-task", {
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

function executeTask(
  p: Project,
  taskName: string,
  env: Record<string, string> = {}
) {
  p.synth();

  const args = [require.resolve("../../lib/cli"), taskName].map(
    (x) => `"${x}"`
  );

  const result = spawnSync(`"${process.execPath}"`, args, {
    cwd: p.outdir,
    shell: true,
    env: { ...process.env, ...env },
  });
  if (result.status !== 0) {
    throw new Error(`non-zero exit code: ${result.stderr.toString("utf-8")}`);
  }

  return result.stdout.toString("utf-8").trim().split(EOL);
}
