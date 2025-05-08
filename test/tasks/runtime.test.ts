import { spawnSync } from "child_process";
import { mkdirSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { basename, dirname, join } from "path";
import { Project } from "../../src";
import * as logging from "../../src/logging";
import { TaskRuntime } from "../../src/task-runtime";
import { makeCrossPlatform } from "../../src/util/tasks";
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
      `node -e "const fs = require('fs'); fs.writeFileSync('test.txt', 'testing');"`
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
      exec: `node -e "console.log('%s!', process.env.VALUE)"`,
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
      exec: `node -e "console.log('%s!', process.env.VALUE)"`,
    });
    p.tasks.addEnvironment("VALUE", 1 as unknown as string);

    // THEN
    expect(executeTask(p, "test:env")).toEqual(["1!"]);
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

describe("cwd", () => {
  test("default cwd is project root", () => {
    const p = new TestProject();
    p.addTask("testme", {
      exec: `node -e "console.log('cwd is %s', process.cwd())"`,
    });
    expect(
      executeTask(p, "testme")[0].includes(basename(p.outdir))
    ).toBeTruthy();
  });

  test("if a step changes cwd, it will not affect next steps", () => {
    const p = new TestProject();
    const task = p.addTask("testme");
    task.exec(`cd ${tmpdir()}`);
    task.exec(`node -e "console.log('cwd is %s', process.cwd())"`);
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
    exec: `node -e "console.log('child: [%s,%s,%s]', process.env.E1, process.env.E2, process.env.E3)"`,
  });
  parent.exec(
    `node -e "console.log('parent: [%s,%s,%s]', process.env.E1, process.env.E2, process.env.E3 ?? '')"`
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

describe("makeCrossPlatform", () => {
  const originalPlatform = process.platform;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Restore the original platform
    Object.defineProperty(process, "platform", { value: originalPlatform });
  });

  test("does not modify the command on linux", () => {
    // Mock the platform to be "linux"
    Object.defineProperty(process, "platform", { value: "linux" });

    expect(makeCrossPlatform("ls -l")).toBe("ls -l");
  });

  test("does not modify a command not supported by shx on windows", () => {
    // Mock the platform to be "win32"
    Object.defineProperty(process, "platform", { value: "win32" });

    expect(makeCrossPlatform('echo "Hello World"')).toBe('echo "Hello World"');
  });

  test("prefixes supported commands with shx on windows", () => {
    // Mock the platform to be "win32"
    Object.defineProperty(process, "platform", { value: "win32" });

    expect(makeCrossPlatform("cat file.txt")).toBe("shx cat file.txt");
  });

  test("processes multiple commands correctly on windows", () => {
    // Mock the platform to be "win32"
    Object.defineProperty(process, "platform", { value: "win32" });

    expect(makeCrossPlatform("mkdir newdir && rm olddir")).toBe(
      "shx mkdir newdir && shx rm olddir"
    );
  });

  test("trims commands with leading and trailing spaces", () => {
    // Mock the platform to be "win32"
    Object.defineProperty(process, "platform", { value: "win32" });

    expect(makeCrossPlatform("  cp file1.txt file2.txt  ")).toBe(
      "shx cp file1.txt file2.txt"
    );
  });

  test("Empty command returns an empty string", () => {
    expect(makeCrossPlatform("")).toBe("");
  });
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

    const t = p.addTask("test1");
    t.exec(
      // 1️⃣ Node prints its argv (slice(1) skips "node")
      // 2️⃣ bare "--" ends Node’s own option parsing
      // 3️⃣ the fragment we really want to test
      `node -e "console.log(JSON.stringify(process.argv.slice(1)))" -- --pack-command "pnpm pack"`
    );

    // THEN
    expect(executeTask(p, "test1")).toStrictEqual([
      '["--pack-command","pnpm pack"]',
    ]);
  });
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

  // Split by any line terminator. The line terminator would depend on the OS, the shell where the command is running and the binary which runs the command called. It could be any of \n, \r\n, or \r.
  return result.stdout
    .toString("utf-8")
    .trim()
    .split(/\r\n|\n|\r/);
}
