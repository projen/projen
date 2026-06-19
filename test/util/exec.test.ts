import { git, node, npm, rawShell, tool } from "../../src/util/exec";

// Use the current Node.js executable as a deterministic, cross-platform test
// binary: it is always present, needs no network, and behaves identically on
// every OS. Commands run in the current working directory (none of these write
// files), so no temp dir is needed.
const cwd = process.cwd();

describe("tool (shell-free)", () => {
  test("capture returns trimmed stdout", () => {
    const out = node.capture(["-e", "process.stdout.write('  hello  ')"], {
      cwd,
    });
    expect(out).toBe("hello");
  });

  test("capture passes each argument verbatim (no shell parsing)", () => {
    // The value contains characters a shell would otherwise interpret; because
    // execution is shell-free it must arrive as a single, unmodified argument.
    const tricky = "a b $HOME && c;'\"";
    const out = node.capture(
      ["-e", "process.stdout.write(process.argv[1])", tricky],
      { cwd },
    );
    expect(out).toBe(tricky);
  });

  test("capture throws with status and stderr on a non-zero exit", () => {
    let error: any;
    try {
      node.capture(["-e", "process.stderr.write('boom'); process.exit(3)"], {
        cwd,
      });
    } catch (e) {
      error = e;
    }
    expect(error).toBeDefined();
    expect(error.status).toBe(3);
    expect(error.stderr.toString("utf-8")).toContain("boom");
  });

  test("tryCapture returns the trimmed value on success", () => {
    expect(node.tryCapture(["-e", "process.stdout.write('v1')"], { cwd })).toBe(
      "v1",
    );
  });

  test("tryCapture returns undefined on a non-zero exit", () => {
    expect(node.tryCapture(["-e", "process.exit(1)"], { cwd })).toBeUndefined();
  });

  test("tryCapture treats empty output as undefined", () => {
    expect(node.tryCapture(["-e", ""], { cwd })).toBeUndefined();
  });

  test("run throws on a non-zero exit", () => {
    expect(() => node.run(["-e", "process.exit(2)"], { cwd })).toThrow();
  });

  test("run does not throw on success", () => {
    expect(() => node.run(["-e", ""], { cwd })).not.toThrow();
  });

  test("run streams output directly when inheritStdio is set", () => {
    expect(() =>
      node.run(["-e", ""], { cwd, inheritStdio: true }),
    ).not.toThrow();
  });

  test("additional env is merged over process.env", () => {
    const out = node.capture(
      ["-e", "process.stdout.write(process.env.MY_VAR ?? '')"],
      { cwd, env: { MY_VAR: "xyz" } },
    );
    expect(out).toBe("xyz");
  });

  test("tool() builds a handle for an arbitrary binary", () => {
    expect(tool(process.execPath).capture(["--version"], { cwd })).toBe(
      process.version,
    );
  });

  test("git helper invokes git", () => {
    expect(git.capture(["--version"], { cwd })).toMatch(/git version/);
  });
});

describe("rawShell (system shell)", () => {
  test("capture runs a command string and returns trimmed stdout", async () => {
    const out = await rawShell.capture(
      `node -e "process.stdout.write('  shell-ok  ')"`,
      { cwd },
    );
    expect(out).toBe("shell-ok");
  });

  test("capture rejects with status on a non-zero exit", async () => {
    await expect(
      rawShell.capture(`node -e "process.exit(4)"`, { cwd }),
    ).rejects.toMatchObject({ status: 4 });
  });

  test("tryCapture returns the trimmed value on success", async () => {
    expect(
      await rawShell.tryCapture(`node -e "process.stdout.write('ok')"`, {
        cwd,
      }),
    ).toBe("ok");
  });

  test("tryCapture returns undefined on a non-zero exit", async () => {
    expect(
      await rawShell.tryCapture(`node -e "process.exit(1)"`, { cwd }),
    ).toBeUndefined();
  });

  test("exec reports the exit status without throwing", () => {
    const result = rawShell.exec(`node -e "process.exit(5)"`, {
      cwd,
      capture: true,
    });
    expect(result.status).toBe(5);
  });

  test("exec inherits streams when not capturing", () => {
    const result = rawShell.exec(`node -e ""`, { cwd });
    expect(result.status).toBe(0);
    expect(result.stdout).toBeNull();
  });

  test("additional env is merged over process.env", async () => {
    const out = await rawShell.capture(
      `node -e "process.stdout.write(process.env.RS_VAR ?? '')"`,
      { cwd, env: { RS_VAR: "yes" } },
    );
    expect(out).toBe("yes");
  });
});

describe("shimTool helpers (npm/npx)", () => {
  // npm is a `.cmd` shim on Windows; resolving and spawning it can be slow,
  // especially on Windows CI.
  jest.setTimeout(30_000);

  test("npm resolves cross-platform and captures output", async () => {
    expect(await npm.capture(["--version"], { cwd })).toMatch(/^\d+\.\d+\.\d+/);
  });
});
