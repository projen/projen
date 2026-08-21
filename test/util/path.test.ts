import { mkdtempSync, mkdirSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  ensurePathInsideProject,
  ensureRelativePathStartsWithDot,
} from "../../src/util/path";

describe("ensureRelativePathStartsWithDot", () => {
  test("dont touch dot notation", () => {
    expect(ensureRelativePathStartsWithDot("./foo")).toBe("./foo");
  });

  test("add dot to path beginning with folder", () => {
    expect(() => ensureRelativePathStartsWithDot("/foo")).toThrow(
      "Path /foo must be relative",
    );
  });

  test("add dot to path beginning with folder name", () => {
    expect(ensureRelativePathStartsWithDot("foo")).toBe("./foo");
  });
});

describe("ensurePathInsideProject", () => {
  const projectDir = mkdtempSync(join(tmpdir(), "path-test-"));

  test.each(["dist", "./dist", "dist/js", "foo/../dist"])(
    "allows %s",
    (path) => {
      expect(() =>
        ensurePathInsideProject(path, "artifactsDirectory", projectDir),
      ).not.toThrow();
    },
  );

  test.each(["/tmp/dist", "/"])("rejects absolute path %s", (path) => {
    expect(() =>
      ensurePathInsideProject(path, "artifactsDirectory", projectDir),
    ).toThrow(/must be a relative path within the project directory/);
  });

  test.each([
    "..",
    "../dist",
    "dist/../..",
    "foo/../../bar",
    ".",
    "./",
    "dist/..",
  ])("rejects %s", (path) => {
    expect(() =>
      ensurePathInsideProject(path, "artifactsDirectory", projectDir),
    ).toThrow(/must be inside the project directory/);
  });

  test("rejects a path escaping the project through a symlink", () => {
    // GIVEN a symlink inside the project pointing outside of it
    mkdirSync(join(projectDir, "project"));
    symlinkSync(tmpdir(), join(projectDir, "project", "escape"), "dir");

    // WHEN/THEN
    expect(() =>
      ensurePathInsideProject(
        "escape/dist",
        "artifactsDirectory",
        join(projectDir, "project"),
      ),
    ).toThrow(/points outside of it through a symlink/);
  });

  test("allows a symlink as the last path segment", () => {
    // deleting a symlink inside the project only removes the link itself
    expect(() =>
      ensurePathInsideProject(
        "escape",
        "artifactsDirectory",
        join(projectDir, "project"),
      ),
    ).not.toThrow();
  });
});
