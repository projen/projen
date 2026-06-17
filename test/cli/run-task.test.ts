import childProcess, { spawnSync } from "child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { basename, dirname, join } from "path";
import { TaskRuntime } from "../../src/cli/task-runtime";
import * as logging from "../../src/logging";
import type { Project } from "../../src/project";
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

describe("shell selection per platform", () => {
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

  test("runs commands through the system shell on non-windows", async () => {
    // GIVEN
    const p = new TestProject();
    p.addTask("hello", { exec: "echo hello" });
    p.synth();

    const spawnSpy = jest
      .spyOn(childProcess, "spawnSync")
      .mockReturnValue({ status: 0 } as any);

    // WHEN
    Object.defineProperty(process, "platform", { value: "linux" });
    await new TaskRuntime(p.outdir).runTask("hello");

    // THEN
    expect(spawnSpy).toHaveBeenCalledWith(
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

function executeTask(
  p: Project,
  taskName: string,
  env: Record<string, string> = {},
  additionalArgs: string[] = [],
) {
  p.synth();

  const args = [require.resolve("../../lib/cli"), taskName].map(
    (x) => `"${x}"`,
  );

  const result = spawnSync(
    `"${process.execPath}"`,
    [...args, ...additionalArgs],
    {
      cwd: p.outdir,
      shell: true,
      env: { ...process.env, ...env },
      timeout: 10_000, // let's try to catch hanging processes sooner than later
    },
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

    // WHEN running the bundled runner from that directory
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
});
