import * as fs from "fs";
import * as path from "path";
import {
  directorySnapshot,
  expectExit,
  expectStdoutContains,
  fileAbsent,
  fileContains,
  fileExists,
  fileNotContains,
  jsonPathEquals,
  jsonPathGet,
  sanitizeProjenVersion,
} from "./assertions";
import type { CommandResult } from "./command";
import { Workspace } from "./workspace";

function result(over: Partial<CommandResult>): CommandResult {
  return { code: 0, stdout: "", stderr: "", command: "test", ...over };
}

describe("exit / stdout assertions", () => {
  test("expectExit passes on match, throws on mismatch", () => {
    expect(() => expectExit(result({ code: 0 }))).not.toThrow();
    expect(() => expectExit(result({ code: 2 }), 0)).toThrow(/exit with 0/);
  });

  test("expectStdoutContains checks stdout and stderr", () => {
    expect(() =>
      expectStdoutContains(result({ stdout: "projen 1.2.3" }), "1.2.3"),
    ).not.toThrow();
    expect(() =>
      expectStdoutContains(result({ stderr: "warn: x" }), "warn"),
    ).not.toThrow();
    expect(() =>
      expectStdoutContains(result({ stdout: "nope" }), "missing"),
    ).toThrow();
  });
});

describe("file assertions", () => {
  let ws: Workspace;
  beforeEach(() => (ws = Workspace.create()));
  afterEach(() => ws.dispose());

  test("fileExists / fileAbsent", () => {
    ws.write("a.txt", "hi");
    expect(fileExists(ws.dir, "a.txt")).toBe(true);
    expect(fileAbsent(ws.dir, "missing.txt")).toBe(true);
  });

  test("fileContains / fileNotContains", () => {
    const p = ws.write(
      "package.json",
      '{"devDependencies":{"projen":"1.0.0"}}',
    );
    expect(fileContains(p, '"projen"')).toBe(true);
    expect(fileNotContains(p, "scripts/run-task.cjs")).toBe(true);
  });

  test("jsonPathGet / jsonPathEquals for tree.json projen.version", () => {
    const p = ws.write(
      path.join(".projen", "tree.json"),
      JSON.stringify({ projen: { version: "9.9.9" } }),
    );
    expect(jsonPathGet(p, "projen.version")).toBe("9.9.9");
    expect(jsonPathEquals(p, "projen.version", "9.9.9")).toBe(true);
    expect(jsonPathEquals(p, "projen.version", "0.0.0")).toBe(false);
    expect(jsonPathGet(p, "missing.deep.path")).toBeUndefined();
  });
});

describe("snapshot + sanitize", () => {
  let ws: Workspace;
  beforeEach(() => (ws = Workspace.create()));
  afterEach(() => ws.dispose());

  test("directorySnapshot captures files and honors excludes", () => {
    ws.write("keep.txt", "content");
    ws.write(path.join("node_modules", "dep", "index.js"), "x");
    const snap = directorySnapshot(ws.dir, {
      excludeGlobs: ["node_modules/**"],
    });
    expect(snap["keep.txt"]).toBe("content");
    expect(Object.keys(snap)).not.toContain("node_modules/dep/index.js");
  });

  test("sanitizeProjenVersion replaces version in package.json and deps.json", () => {
    ws.write(
      "package.json",
      JSON.stringify({ devDependencies: { projen: "1.2.3" } }),
    );
    ws.write(
      path.join(".projen", "deps.json"),
      JSON.stringify({ dependencies: [{ name: "projen", version: "1.2.3" }] }),
    );
    sanitizeProjenVersion(ws.dir);
    expect(
      JSON.parse(fs.readFileSync(ws.path("package.json"), "utf-8"))
        .devDependencies.projen,
    ).toBe("*");
    expect(
      JSON.parse(fs.readFileSync(ws.path(".projen", "deps.json"), "utf-8"))
        .dependencies[0].version,
    ).toBe("*");
  });

  test("sanitizeProjenVersion is a no-op when there is no projen dep", () => {
    ws.write("package.json", JSON.stringify({ name: "x" }));
    expect(() => sanitizeProjenVersion(ws.dir)).not.toThrow();
  });
});
