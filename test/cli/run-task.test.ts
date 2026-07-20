import childProcess, { spawnSync } from "child_process";
import fs, { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { basename, dirname, join } from "path";
import { TaskRuntime } from "../../src/cli/task-runtime";
import { TASKS_MANIFEST_VERSION } from "../../src/common";
import * as logging from "../../src/logging";
import type { Project } from "../../src/project";
import type { TasksManifest } from "../../src/task-model";
import { TaskShell } from "../../src/task-shell";
import { node } from "../../src/util/exec";
import { mkdtemp, TestProject } from "../util";

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
    /Task \"testme\" failed when executing \"false\"/,
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
    /Task \"testme\" failed when executing \"echo failing && false\"/,
  );
});

describe("environment variables", () => {
  test("are accessible from exec", () => {
    // GIVEN
    const p = new TestProject();

    // WHEN
    p.addTask("test:env", {
      exec: `node -e "console.log('%s!', process.env.VALUE)"`,
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
        {
          exec: `node -e "console.log(process.env.VALUE)"`,
          env: { VALUE: "foo" },
        },
        {
          exec: `node -e "console.log(process.env.VALUE)"`,
          env: { VALUE: "bar" },
        },
      ],
    });
    t.exec(`node -e "console.log(process.env.VALUE)"`, {
      env: { VALUE: "baz" },
    });

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
        {
          exec: `node -e "console.log(process.env.VALUE)"`,
          env: { VALUE: "$(echo foo)" },
        },
        {
          exec: `node -e "console.log(process.env.VALUE)"`,
          env: { VALUE: "$(echo bar)" },
        },
      ],
    });
    t.exec(`node -e "console.log(process.env.VALUE)"`, {
      env: { VALUE: "$(echo baz)" },
    });

    // THEN
    expect(executeTask(p, "test:env:stepwise")).toEqual(["foo", "bar", "baz"]);
  });

  test("are resolved dynamically (task vars)", () => {
    // GIVEN
    const p = new TestProject();

    // WHEN
    p.addTask("test:env", {
      exec: `node -e "console.log('%s!', process.env.VALUE)"`,
      env: {
        VALUE: `$(node -e "console.log('dynamic_value')")`,
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
    t.exec(
      `node -e "const fs = require('fs'); fs.writeFileSync('test.txt', 'testing');"`,
    );
    // VALUE wouldn't return anything if evaluated up front
    t.exec(`node -e "console.log(process.env.VALUE)"`, {
      env: {
        VALUE: `$(node -e "const fs = require('fs'); console.log(fs.readFileSync('test.txt', 'utf8'));")`,
      },
    });

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
        {
          exec: `node -e "console.log('%s!', process.env.VALUE)"`,
          env: { VALUE: 1 as unknown as string },
        },
      ],
    });

    // THEN
    expect(executeTask(p, "test:env")).toEqual(["1!"]);
    expect(warn).toHaveBeenCalledWith(
      "Received non-string value for environment variable VALUE. Value will be stringified.",
    );
    warn.mockRestore();
  });

  test("numerics are converted properly (task vars)", () => {
    // GIVEN
    const warn = jest.spyOn(logging, "warn");
    const p = new TestProject();

    // WHEN
    p.addTask("test:env", {
      exec: `node -e "console.log('%s!', process.env.VALUE)"`,
      env: {
        VALUE: 1 as unknown as string,
      },
    });

    // THEN
    expect(executeTask(p, "test:env")).toEqual(["1!"]);
    expect(warn).toHaveBeenCalledWith(
      "Received non-string value for environment variable VALUE. Value will be stringified.",
    );
    warn.mockRestore();
  });

  test("numerics are converted properly (global vars)", () => {
    // GIVEN
    const p = new TestProject();

    // WHEN
    p.addTask("test:env", {
      exec: `node -e "console.log('%s!', process.env.VALUE)"`,
    });
    p.tasks.addEnvironment("VALUE", 1 as unknown as string);

    // THEN
    expect(executeTask(p, "test:env")).toEqual(["1!"]);
  });

  test("warns and skips env var when $() command fails", async () => {
    // GIVEN
    const warn = jest.spyOn(logging, "warn");
    const p = new TestProject();

    // WHEN
    p.addTask("test:env:fail", {
      exec: "echo ok",
      env: { VALUE: "$(exit 1)" },
    });
    p.synth();

    const rt = new TaskRuntime(p.outdir);
    await rt.runTask("test:env:fail");

    // THEN
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("unable to evaluate"),
    );
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("command exited with code"),
    );
    warn.mockRestore();
  });

  test("warns with stdout when $() command writes error to stdout", async () => {
    // GIVEN
    const warn = jest.spyOn(logging, "warn");
    const p = new TestProject();

    // WHEN
    p.addTask("test:env:fail:stdout", {
      exec: "echo ok",
      env: {
        VALUE: `$(node -e "console.log('something went wrong'); process.exit(1)")`,
      },
    });
    p.synth();

    const rt = new TaskRuntime(p.outdir);
    await rt.runTask("test:env:fail:stdout");

    // THEN
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("unable to evaluate"),
    );
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("something went wrong"),
    );
    warn.mockRestore();
  });

  test("spawn env params are respected", () => {
    // GIVEN
    const p = new TestProject();

    // WHEN
    const spawnee = p.addTask("test:env:spawn", {
      exec: `node -e "console.log('%s', process.env.VALUE)"`,
      env: { VALUE: "bar" },
    });

    const spawner = p.addTask("test:env:spawner");
    spawner.spawn(spawnee, { env: { VALUE: "foo" } });

    // THEN
    expect(executeTask(p, "test:env:spawner")).toEqual(["foo"]);
  });
});

describe("command substitution", () => {
  test("$(...) is supported by the built-in shell", async () => {
    const p = new TestProject();
    p.addTask("subst", { exec: 'echo "dir is $(pwd)"' });
    p.synth();

    await expect(
      new TaskRuntime(p.outdir).runTask("subst"),
    ).resolves.toBeUndefined();
  });

  test("$(...) is supported by the system shell", async () => {
    const p = new TestProject();
    p.addTask("subst", {
      exec: 'echo "dir is $(pwd)"',
      shell: TaskShell.system(),
    });
    p.synth();

    await expect(
      new TaskRuntime(p.outdir).runTask("subst"),
    ).resolves.toBeUndefined();
  });

  test("surfaces an error for syntax the built-in shell cannot run", async () => {
    const p = new TestProject();
    // dax rejects async commands - the built-in shell should propagate the error.
    p.addTask("boom", { exec: "echo hi &" });
    p.synth();

    await expect(new TaskRuntime(p.outdir).runTask("boom")).rejects.toThrow();
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
    t.exec("echo step1", {
      condition: `node -e "console.log('no')" && node -e "process.exit(1)"`,
    });
    t.exec("echo step2");

    // THEN
    expect(executeTask(p, "foo")).toEqual(["step0", "no", "step2"]);
  });
});

describe("outputEnv", () => {
  // These run the runtime in-process so the capture/stream code paths in
  // `task-runtime.ts` are exercised directly (the `executeTask` helper spawns
  // the CLI as a subprocess, which coverage cannot instrument).

  test("captures a step's stdout into an env var for later steps", async () => {
    // GIVEN
    const p = new TestProject();
    const t = p.addTask("cap");
    t.exec("echo captured-value", { outputEnv: "MY_OUT" });
    t.exec(
      `node -e "require('fs').writeFileSync('result.txt', process.env.MY_OUT)"`,
    );
    p.synth();

    // WHEN
    await new TaskRuntime(p.outdir).runTask("cap");

    // THEN
    expect(readFileSync(join(p.outdir, "result.txt"), "utf8")).toBe(
      "captured-value",
    );
  });

  test("a skipped step leaves the var unset", async () => {
    // GIVEN
    const p = new TestProject();
    const t = p.addTask("cap");
    t.addSteps({
      exec: "echo should-not-run",
      outputEnv: "MY_OUT",
      condition: 'node -e "process.exit(1)"',
    });
    t.exec(
      `node -e "require('fs').writeFileSync('r.txt', process.env.MY_OUT ?? 'UNSET')"`,
    );
    p.synth();

    // WHEN
    await new TaskRuntime(p.outdir).runTask("cap");

    // THEN
    expect(readFileSync(join(p.outdir, "r.txt"), "utf8")).toBe("UNSET");
  });

  test("captures a spawned task's aggregate stdout", async () => {
    // GIVEN
    const p = new TestProject();
    const child = p.addTask("child");
    child.exec("echo line1");
    child.exec("echo line2");
    const parent = p.addTask("parent");
    parent.spawn(child, { outputEnv: "CHILD_OUT" });
    p.synth();

    // WHEN capturing the parent's output, the spawned task's steps are
    // aggregated in order.
    const out = await new TaskRuntime(p.outdir).runTask(
      "parent",
      [],
      [],
      {},
      { captureOutput: true },
    );

    // THEN
    expect(out).toBe("line1\nline2");
  });

  test("nested spawn capture is transitive", async () => {
    // GIVEN
    const p = new TestProject();
    const grandchild = p.addTask("grandchild", { exec: "echo gc-out" });
    const child = p.addTask("child");
    child.spawn(grandchild);
    const parent = p.addTask("parent");
    parent.spawn(child, { outputEnv: "GC" });
    p.synth();

    // WHEN / THEN
    await expect(
      new TaskRuntime(p.outdir).runTask(
        "parent",
        [],
        [],
        {},
        {
          captureOutput: true,
        },
      ),
    ).resolves.toBe("gc-out");
  });

  test("a captured var is propagated into a spawned subtask's env", async () => {
    // GIVEN
    const p = new TestProject();
    const child = p.addTask("child", {
      exec: `node -e "require('fs').writeFileSync('c.txt', process.env.CAP)"`,
    });
    const parent = p.addTask("parent");
    parent.exec("echo the-value", { outputEnv: "CAP" });
    parent.spawn(child);
    p.synth();

    // WHEN
    await new TaskRuntime(p.outdir).runTask("parent");

    // THEN
    expect(readFileSync(join(p.outdir, "c.txt"), "utf8")).toBe("the-value");
  });

  test("captures output when running through the system shell", async () => {
    // GIVEN
    const p = new TestProject();
    const t = p.addTask("cap-sys", { shell: TaskShell.system() });
    t.exec("echo sys-value", { outputEnv: "SV" });
    t.exec(`node -e "require('fs').writeFileSync('s.txt', process.env.SV)"`);
    p.synth();

    // WHEN
    await new TaskRuntime(p.outdir).runTask("cap-sys");

    // THEN
    expect(readFileSync(join(p.outdir, "s.txt"), "utf8")).toBe("sys-value");
  });
});

describe("cwd", () => {
  test("default cwd is project root", () => {
    const p = new TestProject();
    p.addTask("testme", {
      exec: `node -e "console.log('cwd is %s', process.cwd())"`,
    });
    expect(
      executeTask(p, "testme")[0].includes(basename(p.outdir)),
    ).toBeTruthy();
  });

  test("if a step changes cwd, it will not affect next steps", () => {
    const p = new TestProject();
    const task = p.addTask("testme");
    task.exec(`cd ${tmpdir()}`);
    task.exec(`node -e "console.log('cwd is %s', process.cwd())"`);
    expect(
      executeTask(p, "testme")[0].includes(basename(p.outdir)),
    ).toBeTruthy();
  });

  test("cwd can be set at the task level", () => {
    const p = new TestProject();
    const cwd = join(p.outdir, "mypwd");
    mkdirSync(cwd, { recursive: true });
    const task = p.addTask("testme", {
      cwd,
    });
    task.exec(`node -e "console.log('step1=%s', process.cwd())"`);
    task.exec(`node -e "console.log('step2=%s', process.cwd())"`);
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
    task.exec(`node -e "console.log('step1=%s', process.cwd())"`);
    task.exec(`node -e "console.log('step2=%s', process.cwd())"`, {
      cwd: stepcwd,
    });

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
      /must be an existing directory/,
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
    exec: `node -e "console.log('child: [%s,%s,%s]', process.env.E1, process.env.E2, process.env.E3)"`,
  });
  parent.exec(
    `node -e "console.log('parent: [%s,%s,%s]', process.env.E1, process.env.E2, process.env.E3 ?? '')"`,
  );
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
    exec: `node -e "console.log('%s %s %s', process.env.ENV1, process.env.ENV2, process.env.ENV3)"`,
  });

  expect(() => executeTask(p, "my-task")).toThrow(
    /missing required environment variables: ENV1,ENV2,ENV3/,
  );
  expect(() => executeTask(p, "my-task", { ENV1: "env1" })).toThrow(
    /missing required environment variables: ENV2,ENV3/,
  );
  expect(
    executeTask(p, "my-task", { ENV1: "env1", ENV2: "env2", ENV3: "env3" }),
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
    executeTask(p, "test1", {}, ["world", "and", "other", "planets"]),
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
    exec: `node -e "console.log('child: [$@]')"`,
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
    exec: `node -e "console.log('child: [$@]')"`,
    receiveArgs: true,
  });
  parent.spawn(child, { args: ["one", "--two", "-3"] });

  expect(executeTask(p, "parent", {})).toStrictEqual(["child: [one --two -3]"]);
});

test("exec can receive fixed args", () => {
  const p = new TestProject();
  const t = p.addTask("test1");
  t.exec(`node -e "console.log('child: [$@]')"`, {
    args: ["one", "--two", "-3"],
  });

  expect(executeTask(p, "test1")).toStrictEqual(["child: [one --two -3]"]);
});

describe("manifest with merge conflicts", () => {
  test("can parse tasks from a manifest file with merge conflicts", () => {
    const manifestWithConflict =
      `{
  "tasks": {
    "foo": {
      "name": "foo",
      "steps": [
        {` +
      "\n<<<<<<< HEAD\n" +
      `          "exec": "echo \\"current\\""
=======
          "exec": "echo \\"incoming\\""
>>>>>>> other         
        }
      ]
    }
  }
}
`;

    const workdir = mkdtemp();
    const manifestPath = join(workdir, TaskRuntime.MANIFEST_FILE);

    mkdirSync(dirname(manifestPath));
    writeFileSync(manifestPath, manifestWithConflict);

    const rt = new TaskRuntime(workdir);
    expect(rt.tasks.find((t) => t.name === "foo")).toStrictEqual({
      name: "foo",
      steps: [{ exec: 'echo "incoming"' }],
    });
  });
});

describe("command", () => {
  test("with double-quoted arguments have spaces preserved", () => {
    // GIVEN
    const p = new TestProject();

    p.addTask("test1", {
      // 1️⃣ Node prints its argv (slice(1) skips "node")
      // 2️⃣ bare "--" ends Node’s own option parsing
      // 3️⃣ the fragment we really want to test
      exec: `node -e "console.log(JSON.stringify(process.argv.slice(1)))" -- --pack-command "pnpm pack"`,
    });

    // THEN
    expect(executeTask(p, "test1")).toStrictEqual([
      '["--pack-command","pnpm pack"]',
    ]);
  });
});

describe("shell execution (dax on every platform)", () => {
  const originalPlatform = process.platform;

  afterEach(() => {
    // remove the spawnSync spy so it doesn't leak into other tests, and
    // restore the real platform
    jest.restoreAllMocks();
    Object.defineProperty(process, "platform", { value: originalPlatform });
  });

  test("runs commands through dax on windows", async () => {
    // GIVEN
    const p = new TestProject();
    p.addTask("hello", { exec: "echo hello" });
    p.synth();

    const spawnSpy = jest.spyOn(childProcess, "spawnSync");

    // WHEN
    Object.defineProperty(process, "platform", { value: "win32" });
    await new TaskRuntime(p.outdir).runTask("hello");

    // THEN: on windows the command is driven through dax's `$` (cross-platform
    // shell) directly - it must NOT fall through to the system shell
    // (`spawnSync` with `shell: true`, i.e. cmd.exe).
    expect(spawnSpy).not.toHaveBeenCalledWith(
      "echo hello",
      expect.objectContaining({ shell: true }),
    );
  });

  test("runs commands through dax on non-windows too", async () => {
    // GIVEN
    const p = new TestProject();
    p.addTask("hello", { exec: "echo hello" });
    p.synth();

    const spawnSpy = jest.spyOn(childProcess, "spawnSync");

    // WHEN
    Object.defineProperty(process, "platform", { value: "linux" });
    await new TaskRuntime(p.outdir).runTask("hello");

    // THEN: commands run through dax's `$` (cross-platform shell) on every
    // platform, so the system shell (`spawnSync` with `shell: true`) is never
    // used.
    expect(spawnSpy).not.toHaveBeenCalledWith(
      "echo hello",
      expect.objectContaining({ shell: true }),
    );
  });

  // Regression test for https://github.com/projen/projen/issues/4368
  // `projen package` ran `shx mkdir -p dist/js`, which failed on Windows
  // because cmd.exe could not find `shx`. Tasks now use bare POSIX commands
  // (e.g. `mkdir -p`) and are executed through dax on Windows, which ships a
  // cross-platform `mkdir` builtin - so no `shx` (or any external bin) is
  // required.
  test("POSIX `mkdir -p` works on windows through dax, without shx (#4368)", async () => {
    // GIVEN
    const p = new TestProject();
    p.addTask("make-dist", { exec: "mkdir -p dist/js" });
    p.synth();

    // WHEN running on (simulated) windows
    Object.defineProperty(process, "platform", { value: "win32" });
    await new TaskRuntime(p.outdir).runTask("make-dist");

    // THEN the nested directory is created (dax's builtin mkdir handled `-p`)
    expect(existsSync(join(p.outdir, "dist", "js"))).toBe(true);
  });

  // Regression test for https://github.com/projen/projen/issues/4686
  // A command stored in tasks.json is executed on whatever platform the project
  // is checked out on. Because Windows now runs through dax (a POSIX-style
  // shell) instead of cmd.exe, a single POSIX quoting scheme is parsed the same
  // on Windows as on POSIX - so an arbitrary value can be passed as a single
  // argument cross-platform.
  test("POSIX single-quoted args parse correctly through dax and the host shell (#4686)", async () => {
    // a value with spaces, quotes, and characters that are special to both
    // sh and cmd.exe
    const value = `a b "c" $HOME & (d)`;
    // POSIX single-quote escaping (also understood by dax)
    const quoted = `'${value.split("'").join("'\\''")}'`;

    const p = new TestProject();
    p.addTask("echo-arg", {
      exec: `node -e "require('fs').writeFileSync(process.env.OUT, process.argv[1])" -- ${quoted}`,
    });
    p.synth();

    const run = async (label: string): Promise<string> => {
      const out = join(p.outdir, `arg-${label}.txt`);
      await new TaskRuntime(p.outdir).runTask("echo-arg", [], [], { OUT: out });
      return readFileSync(out, "utf-8");
    };

    // dax (Windows) path - cross-platform, so this is exercised regardless of
    // the host OS. We deliberately never force the non-windows branch on a
    // Windows host, which would invoke cmd.exe and mangle POSIX quoting.
    Object.defineProperty(process, "platform", { value: "win32" });
    const viaDax = await run("dax");

    // the host's native shell: the system shell on POSIX hosts, dax again on
    // Windows hosts.
    Object.defineProperty(process, "platform", { value: originalPlatform });
    const viaHost = await run("host");

    // THEN both receive the value as a single, unmangled argument
    expect(viaDax).toBe(value);
    expect(viaHost).toBe(value);
  });
});

test("execArgs runs a step without a shell, passing each element verbatim", async () => {
  // GIVEN
  const p = new TestProject();
  p.addTask("write-args", {
    execArgs: [
      "node",
      "-e",
      "require('fs').writeFileSync('args.txt', process.argv.slice(1).join('|'))",
      "a b", // whitespace preserved (not word-split)
      "$HOME", // not expanded (no shell)
    ],
  });
  p.synth();

  // WHEN - run in-process so the runtime's array path is exercised
  await new TaskRuntime(p.outdir).runTask("write-args");

  // THEN
  expect(readFileSync(join(p.outdir, "args.txt"), "utf-8")).toBe("a b|$HOME");
});

test("execArgs splices received args at the $@ marker", async () => {
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
  await new TaskRuntime(p.outdir).runTask("write-args", [], ["mid"]);

  // THEN
  expect(readFileSync(join(p.outdir, "args.txt"), "utf-8")).toBe(
    "before|mid|after",
  );
});

test("execArgs surfaces a non-zero exit as a task failure", async () => {
  // GIVEN
  const p = new TestProject();
  p.addTask("boom", { execArgs: ["node", "-e", "process.exit(3)"] });
  p.synth();

  // THEN
  await expect(new TaskRuntime(p.outdir).runTask("boom")).rejects.toThrow(
    /Task "boom" failed when executing "node -e process\.exit\(3\)"/,
  );
});

function executeTask(
  p: Project,
  taskName: string,
  env: Record<string, string> = {},
  additionalArgs: string[] = [],
) {
  p.synth();

  let stdout: string;
  try {
    // Run the compiled CLI through the same shell-free `tool` helper the rest
    // of the codebase uses; `capture` returns its stdout.
    stdout = node.capture(
      [require.resolve("../../lib/cli"), taskName, ...additionalArgs],
      { cwd: p.outdir, env },
    );
  } catch (e: any) {
    // `capture` throws on a non-zero exit; surface the CLI's stderr the way
    // these tests assert on.
    if (typeof e?.status === "number") {
      throw new Error(
        `non-zero exit code: ${e.stderr?.toString("utf-8") ?? ""}`,
      );
    }
    throw e;
  }

  // Split by any line terminator: \n, \r\n, or \r depending on the OS and the
  // binary that produced the output.
  return stdout.split(/\r\n|\n|\r/);
}

describe("ejected run-task.cjs bundle", () => {
  // Build the standalone task runner the same way the "bundle:task-runner"
  // projen task does, then exercise it the way an *ejected* project would. The
  // bundle is what gets copied to `scripts/run-task.cjs` on "projen eject".
  let bundlePath: string;

  beforeAll(() => {
    // esbuild is a devDependency and is allowed in tests.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { buildSync } = require("esbuild");
    bundlePath = join(mkdtemp(), "run-task.cjs");
    buildSync({
      entryPoints: [
        join(__dirname, "..", "..", "src", "cli", "task-runtime.ts"),
      ],
      outfile: bundlePath,
      bundle: true,
      platform: "node",
      format: "cjs",
      // NOTE: package.json is intentionally NOT marked external so its contents
      // (the version) are inlined - see projen#3679.
      footer: { js: "TaskRuntime.main();" },
    });
  });

  // Regression test for:
  // - https://github.com/projen/projen/issues/3679 (no sibling package.json)
  // - https://github.com/projen/projen/issues/4407 (parseConflictJSON)
  test("runs tasks without a sibling package.json and parses conflicted manifests", () => {
    // GIVEN a project dir with NO package.json and a tasks.json that still has
    // git merge-conflict markers (as can happen after a rebase/merge)
    const workdir = mkdtemp();
    mkdirSync(join(workdir, ".projen"));
    const conflictedManifest = [
      "{",
      '  "tasks": {',
      '    "hello": {',
      '      "name": "hello",',
      '      "steps": [',
      "        {",
      "<<<<<<< HEAD",
      '          "exec": "echo CURRENT"',
      "=======",
      '          "exec": "echo INCOMING"',
      ">>>>>>> other",
      "        }",
      "      ]",
      "    }",
      "  }",
      "}",
    ].join("\n");
    writeFileSync(join(workdir, ".projen", "tasks.json"), conflictedManifest);
    expect(existsSync(join(workdir, "package.json"))).toBe(false);

    // WHEN running the bundled runner from that directory. (This inspects the
    // raw stdout/stderr/status on a success path, which the `tool` helpers
    // don't expose - they throw on non-zero and discard stderr on success - so
    // it uses spawnSync directly.)
    const result = spawnSync(process.execPath, [bundlePath, "hello"], {
      cwd: workdir,
      env: { ...process.env },
      timeout: 10_000,
    });

    // THEN it does not crash on load (missing package.json, #3679) nor when
    // parsing the manifest (parseConflictJSON, #4407), and it executes the
    // "theirs"/incoming side of the conflict.
    expect(result.stderr.toString("utf-8")).not.toMatch(
      /Cannot find module|parseConflictJSON is not a function/,
    );
    expect(result.status).toBe(0);
    expect(result.stdout.toString("utf-8")).toContain("INCOMING");
  });
});

describe("in-process task execution", () => {
  const originalPlatform = process.platform;

  afterEach(() => {
    Object.defineProperty(process, "platform", { value: originalPlatform });
  });

  test("runs a task with env, condition, steps, spawn, builtin and args", async () => {
    const p = new TestProject();

    const child = p.addTask("child", {
      env: { CHILD_ENV: `$(node -e "console.log('dyn-child')")` },
      exec: `node -e "require('fs').appendFileSync('out.txt', 'child:' + process.env.CHILD_ENV + '\\n')"`,
    });

    const parent = p.addTask("parent", {
      condition: `node -e "process.exit(0)"`,
      env: { PARENT_ENV: `$(node -e "console.log('dyn-parent')")` },
      requiredEnv: ["PARENT_ENV"],
    });
    parent.exec(
      `node -e "require('fs').appendFileSync('out.txt', 'parent:' + process.env.PARENT_ENV + '\\n')"`,
    );
    parent.spawn(child);
    parent.builtin("builtin-example");
    parent.exec(
      `node -e "require('fs').appendFileSync('out.txt', 'args:' + process.argv.slice(1).join(',') + '\\n')"`,
      { receiveArgs: true },
    );
    p.synth();

    await new TaskRuntime(p.outdir).runTask("parent", [], ["a1", "a2"]);

    const contents = readFileSync(join(p.outdir, "out.txt"), "utf-8");
    expect(contents).toContain("parent:dyn-parent");
    expect(contents).toContain("child:dyn-child");
    expect(contents).toContain("args:a1,a2");
  });

  test("skips a task whose condition exits non-zero", async () => {
    const p = new TestProject();
    const t = p.addTask("foo", { condition: `node -e "process.exit(1)"` });
    t.exec(
      `node -e "require('fs').writeFileSync('should-not-exist.txt', 'x')"`,
    );
    p.synth();

    await new TaskRuntime(p.outdir).runTask("foo");

    expect(existsSync(join(p.outdir, "should-not-exist.txt"))).toBe(false);
  });

  test("throws when requiredEnv is missing", async () => {
    const p = new TestProject();
    p.addTask("foo", { requiredEnv: ["MISSING_XYZ"], exec: "echo hi" });
    p.synth();

    await expect(new TaskRuntime(p.outdir).runTask("foo")).rejects.toThrow(
      /missing required environment variables: MISSING_XYZ/,
    );
  });

  test("throws when a step exec fails", async () => {
    const p = new TestProject();
    p.addTask("foo", { exec: `node -e "process.exit(2)"` });
    p.synth();

    await expect(new TaskRuntime(p.outdir).runTask("foo")).rejects.toThrow(
      /failed when executing/,
    );
  });

  test("throws for an unknown task", async () => {
    const p = new TestProject();
    p.synth();

    await expect(
      new TaskRuntime(p.outdir).runTask("does-not-exist"),
    ).rejects.toThrow(/cannot find command does-not-exist/);
  });

  test("throws when a step cwd does not exist", async () => {
    const p = new TestProject();
    const t = p.addTask("foo");
    t.exec("echo hi", { cwd: join(p.outdir, "nope") });
    p.synth();

    await expect(new TaskRuntime(p.outdir).runTask("foo")).rejects.toThrow(
      /must be an existing directory/,
    );
  });

  test("TaskRuntime.main runs a task from the current working directory", async () => {
    const p = new TestProject();
    p.addTask("maintask", {
      exec: `node -e "require('fs').writeFileSync('main.txt', 'ok')"`,
    });
    p.synth();

    const cwd = process.cwd();
    try {
      process.chdir(p.outdir);
      await TaskRuntime.main("maintask");
    } finally {
      process.chdir(cwd);
    }

    expect(readFileSync(join(p.outdir, "main.txt"), "utf-8")).toBe("ok");
  });

  test("evaluates dynamic env through dax on windows (captured output)", async () => {
    const p = new TestProject();
    p.addTask("foo", {
      exec: `node -e "require('fs').writeFileSync('env.txt', process.env.DV || '')"`,
      env: { DV: "$(echo daxvalue)" },
    });
    p.synth();

    Object.defineProperty(process, "platform", { value: "win32" });
    await new TaskRuntime(p.outdir).runTask("foo");

    expect(readFileSync(join(p.outdir, "env.txt"), "utf-8").trim()).toBe(
      "daxvalue",
    );
  });

  test("single-quotes args at a quoted marker", async () => {
    const p = new TestProject();
    p.addTask("q", {
      exec: `node -e "require('fs').writeFileSync('q.txt', JSON.stringify(process.argv.slice(1)))" -- "$@"`,
      receiveArgs: true,
    });
    p.synth();

    await new TaskRuntime(p.outdir).runTask("q", [], ["a b", "c"]);

    expect(JSON.parse(readFileSync(join(p.outdir, "q.txt"), "utf-8"))).toEqual([
      "a b",
      "c",
    ]);
  });

  test("passes args with quotes and special characters verbatim through a quoted marker", async () => {
    const p = new TestProject();
    p.addTask("q", {
      exec: `node -e "require('fs').writeFileSync('q.txt', JSON.stringify(process.argv.slice(1)))" -- "$@"`,
      receiveArgs: true,
    });
    p.synth();

    // values with whitespace, a single quote, and characters that are
    // significant to a shell - each must arrive as one unmodified argument.
    const args = ["a b", "it's", "$HOME", "a;b && c", "(d)"];
    await new TaskRuntime(p.outdir).runTask("q", [], args);

    expect(JSON.parse(readFileSync(join(p.outdir, "q.txt"), "utf-8"))).toEqual(
      args,
    );
  });

  test("runs a task through a declared POSIX shell", async () => {
    const p = new TestProject();
    p.addTask("t", {
      shell: TaskShell.sh(),
      exec: `node -e "require('fs').writeFileSync('o.txt', 'ok')"`,
    });
    p.synth();

    await new TaskRuntime(p.outdir).runTask("t");

    expect(readFileSync(join(p.outdir, "o.txt"), "utf-8")).toBe("ok");
  });

  test("a declared shell is actually invoked (a missing shell fails the task)", async () => {
    const p = new TestProject();
    p.addTask("t", {
      shell: TaskShell.command(["projen-no-such-shell", "-c"]),
      exec: "echo hi",
    });
    p.synth();

    // a bare "echo hi" would succeed through the built-in projen shell; it only
    // fails because the declared shell is actually spawned and cannot be found.
    await expect(new TaskRuntime(p.outdir).runTask("t")).rejects.toThrow();
  });

  test("a step shell overrides the task shell", async () => {
    const p = new TestProject();
    const t = p.addTask("t", {
      shell: TaskShell.command(["projen-no-such-shell", "-c"]),
    });
    t.exec(`node -e "require('fs').writeFileSync('o.txt', 'ok')"`, {
      shell: TaskShell.sh(),
    });
    p.synth();

    await new TaskRuntime(p.outdir).runTask("t");

    expect(readFileSync(join(p.outdir, "o.txt"), "utf-8")).toBe("ok");
  });

  test("the project-level (manifest) shell applies when the task declares none", async () => {
    const p = new TestProject();
    // a project default shell that cannot be found
    p.tasks.shell = TaskShell.command(["projen-no-such-shell", "-c"]);
    p.addTask("t", { exec: "echo hi" });
    p.synth();

    // a bare "echo hi" would succeed through the built-in projen shell; it
    // only fails because the project-level shell is resolved and spawned.
    await expect(new TaskRuntime(p.outdir).runTask("t")).rejects.toThrow();
  });

  test("a step shell overrides the project-level shell", async () => {
    const p = new TestProject();
    p.tasks.shell = TaskShell.command(["projen-no-such-shell", "-c"]);
    const t = p.addTask("t");
    t.exec(`node -e "require('fs').writeFileSync('o.txt', 'ok')"`, {
      shell: TaskShell.sh(),
    });
    p.synth();

    await new TaskRuntime(p.outdir).runTask("t");

    expect(readFileSync(join(p.outdir, "o.txt"), "utf-8")).toBe("ok");
  });

  test("the system shell runs the command through the OS shell", async () => {
    const p = new TestProject();
    p.addTask("t", {
      shell: TaskShell.system(),
      exec: `node -e "require('fs').writeFileSync('o.txt', 'ok')"`,
    });
    p.synth();

    await new TaskRuntime(p.outdir).runTask("t");

    expect(readFileSync(join(p.outdir, "o.txt"), "utf-8")).toBe("ok");
  });

  test("execArgs under the system shell runs the real binary directly", async () => {
    const p = new TestProject();
    p.addTask("t", {
      shell: TaskShell.system(),
      execArgs: ["node", "-e", "require('fs').writeFileSync('o.txt', 'ok')"],
    });
    p.synth();

    await new TaskRuntime(p.outdir).runTask("t");

    expect(readFileSync(join(p.outdir, "o.txt"), "utf-8")).toBe("ok");
  });

  test("execArgs runs under a declared invocation shell (verbatim argv)", async () => {
    const p = new TestProject();
    p.addTask("t", {
      shell: TaskShell.sh(),
      execArgs: ["node", "-e", "require('fs').writeFileSync('o.txt', 'ok')"],
    });
    p.synth();

    await new TaskRuntime(p.outdir).runTask("t");

    expect(readFileSync(join(p.outdir, "o.txt"), "utf-8")).toBe("ok");
  });

  test("execArgs preserves argv elements verbatim under an invocation shell", async () => {
    const p = new TestProject();
    p.addTask("t", {
      shell: TaskShell.sh(),
      // The argv is rendered to a command line and appended to the invocation
      // (it does NOT rely on a `"$@"` trick, which only works for shells like
      // `sh -c`/`bash -c` and not e.g. `npx -c`). An element with a space and a
      // `$VAR` must still survive verbatim - the argv is what matters, not how
      // the invocation shell would re-split a plain string.
      execArgs: [
        "node",
        "-e",
        "require('fs').writeFileSync('o.txt', process.argv[1])",
        "hello $HOME world",
      ],
    });
    p.synth();

    await new TaskRuntime(p.outdir).runTask("t");

    expect(readFileSync(join(p.outdir, "o.txt"), "utf-8")).toBe(
      "hello $HOME world",
    );
  });

  test("execArgs under the system shell surfaces a non-zero exit", async () => {
    const p = new TestProject();
    p.addTask("t", {
      shell: TaskShell.system(),
      execArgs: ["node", "-e", "process.exit(7)"],
    });
    p.synth();

    await expect(new TaskRuntime(p.outdir).runTask("t")).rejects.toThrow();
  });

  test("execArgs under the system shell surfaces a spawn failure", async () => {
    const p = new TestProject();
    p.addTask("t", {
      shell: TaskShell.system(),
      execArgs: ["projen-no-such-binary-xyz"],
    });
    p.synth();

    await expect(new TaskRuntime(p.outdir).runTask("t")).rejects.toThrow();
  });

  test("an unknown built-in shell keyword in the manifest fails with a clear error", async () => {
    // A bad keyword can only reach the runtime via a hand-written or foreign
    // manifest, since TaskShell only ever produces valid values.
    const workdir = mkdtemp();
    mkdirSync(join(workdir, ".projen"), { recursive: true });
    writeFileSync(
      join(workdir, ".projen", "tasks.json"),
      JSON.stringify({
        tasks: {
          t: { name: "t", shell: "nope", steps: [{ exec: "echo hi" }] },
        },
      }),
    );

    await expect(new TaskRuntime(workdir).runTask("t")).rejects.toThrow(
      /unknown built-in shell/,
    );
  });
});

describe("manifest versioning", () => {
  /** Stamps the current schema version onto a manifest. */
  function versionedManifest(manifest: TasksManifest): TasksManifest {
    return {
      manifestVersion: TASKS_MANIFEST_VERSION,
      ...manifest,
    };
  }

  /** Writes a manifest object to `.projen/tasks.json` under a fresh workdir. */
  function writeManifest(contents: unknown): string {
    const workdir = mkdtemp();
    const manifestPath = join(workdir, TaskRuntime.MANIFEST_FILE);
    mkdirSync(dirname(manifestPath), { recursive: true });
    writeFileSync(manifestPath, JSON.stringify(contents, undefined, 2));
    return workdir;
  }

  test("synthesized manifest carries the schema version", () => {
    const p = new TestProject();
    p.synth();

    const manifest: TasksManifest = JSON.parse(
      readFileSync(join(p.outdir, TaskRuntime.MANIFEST_FILE), "utf-8"),
    );

    expect(manifest.manifestVersion).toBe(TASKS_MANIFEST_VERSION);
    // constructing a runtime over it must not throw
    expect(() => new TaskRuntime(p.outdir)).not.toThrow();
  });

  test("a running task picks up manifest changes made by an earlier task", async () => {
    // GIVEN a project whose "parent" task first runs "regen" (which rewrites
    // .projen/tasks.json) and then runs "target".
    const p = new TestProject();
    const target = p.addTask("target", {
      exec: `node -e "require('fs').writeFileSync('out.txt', 'v1')"`,
    });
    const regen = p.addTask("regen", {
      // projen marks generated files read-only, so make the manifest writable
      // before overwriting it (mimicking what a real re-synth does).
      exec: `node -e "const fs=require('fs');fs.chmodSync('.projen/tasks.json',0o644);fs.copyFileSync('tasks-v2.json','.projen/tasks.json')"`,
    });
    const parent = p.addTask("parent");
    parent.spawn(regen);
    parent.spawn(target);
    p.synth();

    // a regenerated, valid manifest where "target" now writes "v2"
    const v2 = versionedManifest({
      tasks: {
        target: {
          name: "target",
          steps: [
            { exec: `node -e "require('fs').writeFileSync('out.txt', 'v2')"` },
          ],
        },
      },
    });
    writeFileSync(
      join(p.outdir, "tasks-v2.json"),
      JSON.stringify(v2, undefined, 2),
    );

    // WHEN
    await new TaskRuntime(p.outdir).runTask("parent");

    // THEN the *reloaded* definition of "target" ran (writes "v2"), not the
    // stale in-memory one (which would have written "v1").
    expect(readFileSync(join(p.outdir, "out.txt"), "utf-8")).toBe("v2");
  });

  test("warns (does not throw) for a manifest from a newer projen version", () => {
    const warn = jest.spyOn(logging, "warn");

    const workdir = writeManifest({
      manifestVersion: TASKS_MANIFEST_VERSION + 1,
      tasks: { foo: { name: "foo", steps: [{ exec: "echo hi" }] } },
    });

    let rt!: TaskRuntime;
    expect(() => (rt = new TaskRuntime(workdir))).not.toThrow();
    expect(rt.tryFindTask("foo")).toBeDefined();
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("newer version of projen"),
    );

    warn.mockRestore();
  });

  test("accepts a legacy manifest without a version", () => {
    // legacy manifests (pre-versioning) carry no manifestVersion
    const workdir = writeManifest({
      tasks: { foo: { name: "foo", steps: [{ exec: "echo hi" }] } },
    });

    let rt!: TaskRuntime;
    expect(() => (rt = new TaskRuntime(workdir))).not.toThrow();
    expect(rt.tryFindTask("foo")).toStrictEqual({
      name: "foo",
      steps: [{ exec: "echo hi" }],
    });
  });

  test("parses a versioned manifest that still has git conflict markers", () => {
    // A versioned manifest that ended up with a git merge conflict. The runtime
    // must still parse it (via parseConflictJSON) without throwing.
    const conflicted = [
      "{",
      '  "manifestVersion": 1,',
      '  "tasks": {',
      '    "foo": {',
      '      "name": "foo",',
      '      "steps": [',
      "        {",
      "<<<<<<< HEAD",
      '          "exec": "echo current"',
      "=======",
      '          "exec": "echo incoming"',
      ">>>>>>> other",
      "        }",
      "      ]",
      "    }",
      "  }",
      "}",
    ].join("\n");

    const workdir = mkdtemp();
    const manifestPath = join(workdir, TaskRuntime.MANIFEST_FILE);
    mkdirSync(dirname(manifestPath), { recursive: true });
    writeFileSync(manifestPath, conflicted);

    let rt!: TaskRuntime;
    expect(() => (rt = new TaskRuntime(workdir))).not.toThrow();
    // "theirs"/incoming side wins
    expect(rt.tryFindTask("foo")).toStrictEqual({
      name: "foo",
      steps: [{ exec: "echo incoming" }],
    });
  });

  test("emits a debug log when a task reloads a changed manifest", async () => {
    const debug = jest.spyOn(logging, "debug");

    const p = new TestProject();
    const target = p.addTask("target", {
      exec: `node -e "require('fs').writeFileSync('out.txt', 'v1')"`,
    });
    const regen = p.addTask("regen", {
      exec: `node -e "const fs=require('fs');fs.chmodSync('.projen/tasks.json',0o644);fs.copyFileSync('tasks-v2.json','.projen/tasks.json')"`,
    });
    const parent = p.addTask("parent");
    parent.spawn(regen);
    parent.spawn(target);
    p.synth();

    const v2 = versionedManifest({
      tasks: {
        target: {
          name: "target",
          steps: [
            { exec: `node -e "require('fs').writeFileSync('out.txt', 'v2')"` },
          ],
        },
      },
    });
    writeFileSync(
      join(p.outdir, "tasks-v2.json"),
      JSON.stringify(v2, undefined, 2),
    );

    await new TaskRuntime(p.outdir).runTask("parent");

    expect(debug).toHaveBeenCalledWith(
      expect.stringContaining("successfully loaded the new tasks manifest"),
    );
    debug.mockRestore();
  });

  test("treats a project without a manifest on disk as empty", async () => {
    // a workdir with no .projen/tasks.json at all
    const workdir = mkdtemp();

    const rt = new TaskRuntime(workdir);
    expect(rt.tasks).toEqual([]);
    expect(rt.tryFindTask("anything")).toBeUndefined();
    await expect(rt.runTask("anything")).rejects.toThrow(/cannot find command/);
  });

  test("tryFindTask returns undefined when the manifest has no tasks", () => {
    // a (legacy) manifest object that omits the "tasks" key entirely
    const workdir = writeManifest({});

    const rt = new TaskRuntime(workdir);
    expect(rt.tryFindTask("foo")).toBeUndefined();
  });
});

describe("task-runtime line coverage", () => {
  test("running a task with no steps is a no-op", async () => {
    const p = new TestProject();
    p.addTask("empty");
    p.synth();

    await new TaskRuntime(p.outdir).runTask("empty");
  });

  test("a step whose condition fails is skipped", async () => {
    const p = new TestProject();
    const t = p.addTask("t");
    t.exec(`node -e "require('fs').writeFileSync('o.txt', 'ran')"`, {
      condition: `node -e "process.exit(1)"`,
    });
    p.synth();

    await new TaskRuntime(p.outdir).runTask("t");

    expect(existsSync(join(p.outdir, "o.txt"))).toBe(false);
  });

  test("a say step emits a log line", async () => {
    const p = new TestProject();
    const t = p.addTask("t");
    t.say("hello from a say step");
    p.synth();

    await new TaskRuntime(p.outdir).runTask("t");
  });

  test("received args are appended when the command has no $@ marker", async () => {
    const p = new TestProject();
    const t = p.addTask("t");
    t.exec(
      `node -e "require('fs').writeFileSync('o.txt', process.argv.slice(1).join('|'))"`,
      { receiveArgs: true },
    );
    p.synth();

    await new TaskRuntime(p.outdir).runTask("t", [], ["A", "B"]);

    expect(readFileSync(join(p.outdir, "o.txt"), "utf-8")).toBe("A|B");
  });

  test("received args are spliced at a bare $@ marker in a string command", async () => {
    const p = new TestProject();
    const t = p.addTask("t");
    t.exec(
      `node -e "require('fs').writeFileSync('o.txt', process.argv.slice(1).join('|'))" $@`,
      { receiveArgs: true },
    );
    p.synth();

    await new TaskRuntime(p.outdir).runTask("t", [], ["A", "B"]);

    expect(readFileSync(join(p.outdir, "o.txt"), "utf-8")).toBe("A|B");
  });

  test("main() prints the error and exits non-zero when the task fails", async () => {
    const exitSpy = jest
      .spyOn(process, "exit")
      .mockImplementation((() => undefined) as never);
    const errSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    await TaskRuntime.main("a-task-that-does-not-exist-xyz");

    expect(exitSpy).toHaveBeenCalledWith(1);

    exitSpy.mockRestore();
    errSpy.mockRestore();
  });

  test("a builtin step fails clearly when the package root cannot be located", async () => {
    const p = new TestProject();
    const t = p.addTask("t");
    t.builtin("test");
    p.synth();

    // force the package.json lookup in renderBuiltin to walk to the FS root
    // without finding one.
    const realExistsSync = fs.existsSync;
    const spy = jest
      .spyOn(fs, "existsSync")
      .mockImplementation((pth: any) =>
        String(pth).endsWith("package.json") ? false : realExistsSync(pth),
      );

    await expect(new TaskRuntime(p.outdir).runTask("t")).rejects.toThrow(
      /unable to locate the projen package root/,
    );

    spy.mockRestore();
  });
});
