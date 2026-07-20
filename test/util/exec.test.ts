import { git, node, npm, tool } from "../../src/util/exec";

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

  test("captureStderr interleaves STDOUT and STDERR in write order", () => {
    const out = node.capture(
      ["-e", "console.log('one'); console.error('two'); console.log('three');"],
      { cwd, captureStderr: true },
    );
    expect(out).toBe("one\ntwo\nthree");
  });

  test("captureStderr attaches the combined output to the error on failure", () => {
    let error: any;
    try {
      node.capture(
        ["-e", "console.log('before'); console.error('fail'); process.exit(1)"],
        { cwd, captureStderr: true },
      );
    } catch (e) {
      error = e;
    }
    expect(error).toBeDefined();
    expect(error.stdout.toString("utf-8")).toBe("before\nfail\n");
  });

  test("tryCapture supports captureStderr", () => {
    const out = node.tryCapture(
      ["-e", "console.log('a'); console.error('b');"],
      { cwd, captureStderr: true },
    );
    expect(out).toBe("a\nb");
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
