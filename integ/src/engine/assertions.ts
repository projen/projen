import * as fs from "fs";
import * as path from "path";
import * as glob from "fast-glob";
import type { CommandResult } from "./command";

/**
 * Assertion and snapshot helpers for the integration suites.
 *
 * Scope is intentionally limited to what the existing bash/Jest integration
 * tests actually assert:
 *  - process exit codes            (all scripts: `set -e`, explicit exits)
 *  - stdout/stderr contains         (version checks)
 *  - file exists / absent           (eject: scripts/run-task.cjs, lib/index.js)
 *  - JSON path lookup               (.projen/tree.json -> projen.version)
 *  - file contains / not-contains   (eject: package.json projen reference)
 *  - directory snapshot + sanitize  (projenrc snapshot suite)
 */

/** Throws unless `result` exited with `code` (default 0). */
export function expectExit(result: CommandResult, code = 0): void {
  if (result.code !== code) {
    throw new Error(
      `Expected "${result.command}" to exit with ${code}, got ${result.code}.\n` +
        `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`,
    );
  }
}

/** Throws unless `needle` appears in the combined stdout+stderr of `result`. */
export function expectStdoutContains(
  result: CommandResult,
  needle: string,
): void {
  const haystack = `${result.stdout}\n${result.stderr}`;
  if (!haystack.includes(needle)) {
    throw new Error(
      `Expected output of "${result.command}" to contain ${JSON.stringify(
        needle,
      )}.\n${haystack}`,
    );
  }
}

/** True if the joined path exists. */
export function fileExists(...segments: string[]): boolean {
  return fs.existsSync(path.join(...segments));
}

/** True if the joined path does NOT exist. */
export function fileAbsent(...segments: string[]): boolean {
  return !fileExists(...segments);
}

/** Reads and parses a JSON file. */
export function readJson<T = any>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
}

/**
 * Reads a dot-separated path out of a JSON file, e.g.
 * `jsonPathGet(".projen/tree.json", "projen.version")`.
 */
export function jsonPathGet(filePath: string, dotPath: string): unknown {
  let value: any = readJson(filePath);
  for (const key of dotPath.split(".")) {
    if (value == null) {
      return undefined;
    }
    value = value[key];
  }
  return value;
}

/** True if the JSON value at `dotPath` strictly equals `expected`. */
export function jsonPathEquals(
  filePath: string,
  dotPath: string,
  expected: unknown,
): boolean {
  return jsonPathGet(filePath, dotPath) === expected;
}

/** True if the file's text content contains `needle`. */
export function fileContains(filePath: string, needle: string): boolean {
  return fs.readFileSync(filePath, "utf-8").includes(needle);
}

/** True if the file's text content does NOT contain `needle`. */
export function fileNotContains(filePath: string, needle: string): boolean {
  return !fileContains(filePath, needle);
}

/**
 * A snapshot of a directory's text files, keyed by POSIX-relative path.
 */
export interface DirectorySnapshot {
  [relativePath: string]: string | Record<string, unknown>;
}

export interface DirectorySnapshotOptions {
  /** Globs to exclude (in addition to `.git/**`). */
  readonly excludeGlobs?: string[];
  /** Parse `.json` files into objects instead of keeping raw text. @default false */
  readonly parseJson?: boolean;
}

/**
 * Produces a deterministic snapshot of all text files under `root`.
 *
 * Ported (dependency-light) from `src/util/synth.ts`'s `directorySnapshot`;
 * the projenrc snapshot suite historically used `parseJson: false`.
 */
export function directorySnapshot(
  root: string,
  options: DirectorySnapshotOptions = {},
): DirectorySnapshot {
  const output: DirectorySnapshot = {};
  const files = glob.sync("**", {
    ignore: [".git/**", ...(options.excludeGlobs ?? [])],
    cwd: root,
    onlyFiles: true,
    followSymbolicLinks: false,
    dot: true,
  });

  const parseJson = options.parseJson ?? false;
  for (const file of files) {
    const content = fs.readFileSync(path.join(root, file), "utf-8");
    output[file] =
      parseJson && file.toLowerCase().endsWith(".json")
        ? JSON.parse(content)
        : content;
  }
  return output;
}

/**
 * Removes non-deterministic projen version numbers from a synthesized project
 * so snapshots are stable across releases. Ported from `test/util.ts`'s
 * `sanitizeOutput`: replaces the projen version with `*` in `package.json`
 * (devDependencies) and `.projen/deps.json`.
 *
 * Unlike the original, both edits are best-effort (a project may not have a
 * `projen` devDependency, e.g. non-node languages), so missing entries are
 * skipped rather than throwing.
 */
export function sanitizeProjenVersion(dir: string): void {
  const pkgPath = path.join(dir, "package.json");
  if (fs.existsSync(pkgPath)) {
    const pkg = readJson(pkgPath);
    if (pkg.devDependencies?.projen) {
      pkg.devDependencies.projen = "*";
      fs.writeFileSync(pkgPath, JSON.stringify(pkg));
    }
  }

  const depsPath = path.join(dir, ".projen", "deps.json");
  if (fs.existsSync(depsPath)) {
    const deps = readJson(depsPath);
    for (const dep of deps.dependencies ?? []) {
      if (dep.name === "projen" && dep.version) {
        dep.version = "*";
      }
    }
    fs.chmodSync(depsPath, "777");
    fs.writeFileSync(depsPath, JSON.stringify(deps));
  }
}
