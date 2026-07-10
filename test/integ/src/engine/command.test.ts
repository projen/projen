import { run } from "./command";

describe("run", () => {
  test("captures stdout and exit code 0", () => {
    const result = run("node", ["-e", "process.stdout.write('hello')"]);
    expect(result.code).toBe(0);
    expect(result.stdout).toBe("hello");
  });

  test("captures stderr and non-zero exit code", () => {
    const result = run("node", [
      "-e",
      "process.stderr.write('boom'); process.exit(3)",
    ]);
    expect(result.code).toBe(3);
    expect(result.stderr).toContain("boom");
  });

  test("overlays env and can remove variables", () => {
    const result = run("node", ["-e", "process.stdout.write(process.env.FOO ?? 'unset')"], {
      env: { FOO: "bar" },
    });
    expect(result.stdout).toBe("bar");
  });

  test("throwOnError throws on non-zero exit", () => {
    expect(() =>
      run("node", ["-e", "process.exit(1)"], { throwOnError: true }),
    ).toThrow(/exit 1/);
  });

  test("does not throw on non-zero exit by default", () => {
    expect(() => run("node", ["-e", "process.exit(1)"])).not.toThrow();
  });

  test("returns null code and does not throw when binary is missing", () => {
    const result = run("this-binary-does-not-exist-xyz", []);
    expect(result.code).toBeNull();
  });
});
