import { mkdirSync, mkdtempSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { dirContainsFile } from "../../src/util/fs";

describe("dirContainsFile", () => {
  function tempDir(): string {
    return mkdtempSync(join(tmpdir(), "projen-fs-test-"));
  }

  test("returns false for a non-existent directory", () => {
    expect(dirContainsFile(join(tempDir(), "does-not-exist"))).toBe(false);
  });

  test("returns false for an empty directory", () => {
    expect(dirContainsFile(tempDir())).toBe(false);
  });

  test("returns false when only empty (nested) subdirectories exist", () => {
    const dir = tempDir();
    mkdirSync(join(dir, "a", "b"), { recursive: true });
    expect(dirContainsFile(dir)).toBe(false);
  });

  test("returns true when a file exists at the top level", () => {
    const dir = tempDir();
    writeFileSync(join(dir, "file.txt"), "x");
    expect(dirContainsFile(dir)).toBe(true);
  });

  test("returns true when a file exists in a nested subdirectory", () => {
    const dir = tempDir();
    mkdirSync(join(dir, "a", "b"), { recursive: true });
    writeFileSync(join(dir, "a", "b", "file.txt"), "x");
    expect(dirContainsFile(dir)).toBe(true);
  });

  describe("with an extension filter", () => {
    test("returns true when a matching file exists (recursively)", () => {
      const dir = tempDir();
      mkdirSync(join(dir, "nested"), { recursive: true });
      writeFileSync(join(dir, "nested", "main.ts"), "x");
      expect(dirContainsFile(dir, ".ts")).toBe(true);
    });

    test("returns false when only non-matching files exist", () => {
      const dir = tempDir();
      writeFileSync(join(dir, "README.md"), "x");
      writeFileSync(join(dir, "data.json"), "{}");
      expect(dirContainsFile(dir, ".ts")).toBe(false);
    });
  });
});
