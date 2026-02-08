import * as fs from "fs";
import { posix, win32 } from "path";
import { TestProject } from "./util";
import { JsonFile } from "../src/json";
import {
  decamelizeKeysRecursively,
  dedupArray,
  deepMerge,
  isTruthy,
  getFilePermissions,
  formatAsPythonModule,
  getGitVersion,
  isRoot,
  assertExecutablePermissions,
  normalizePersistedPath,
} from "../src/util";

describe("decamelizeRecursively", () => {
  test("decamel recurses an object structure", () => {
    // GIVEN
    const input = {
      dependsOn: ["a", "b", "c"],
      volumes: [
        {
          driver: "tmpfs",
          driverOpts: {
            type: "nfs",
            o: "addr=...",
            device: ":/docker/example",
          },
        },
      ],
    };

    // WHEN
    const output = decamelizeKeysRecursively(input);

    // THEN
    expect(output).toEqual({
      depends_on: ["a", "b", "c"],
      volumes: [
        {
          driver: "tmpfs",
          driver_opts: {
            type: "nfs",
            o: "addr=...",
            device: ":/docker/example",
          },
        },
      ],
    });
  });

  test("decamel quits when it recurses too deeply", () => {
    // GIVEN
    const circle: Record<string, any> = {};
    circle.circle = circle;

    // WHEN
    expect(() => decamelizeKeysRecursively(circle)).toThrow(
      /circular reference/,
    );
  });

  test("decamel can know when not to decamelize a key", () => {
    // GIVEN
    const input = {
      dependsOn: ["a", "b"],
      environment: {
        leaveThisAlone: true,
        LEAVE_CASE_ALONE: true,
      },
    };

    // WHEN
    const output = decamelizeKeysRecursively(input, {
      shouldDecamelize(path, _value) {
        return !/^environment\./.test(path.join("."));
      },
    });

    // THEN
    expect(output).toEqual({
      depends_on: ["a", "b"],
      environment: {
        leaveThisAlone: true,
        LEAVE_CASE_ALONE: true,
      },
    });
  });
});

test("isTruthy", () => {
  expect(isTruthy(undefined)).toEqual(false);
  expect(isTruthy("false")).toEqual(false);
  expect(isTruthy("0")).toEqual(false);
  expect(isTruthy("null")).toEqual(false);
  expect(isTruthy("")).toEqual(false);
  expect(isTruthy("true")).toEqual(true);
  expect(isTruthy("1")).toEqual(true);
  expect(isTruthy("enabled")).toEqual(true);
});

describe("deepMerge (defaults)", () => {
  test("merges objects", () => {
    // GIVEN
    const original = { a: { b: 3 } };

    // WHEN
    deepMerge([original, { a: { c: 4 } }]);

    // THEN
    expect(original).toEqual({ a: { b: 3, c: 4 } });
  });

  test("overwrites non-objects", () => {
    // GIVEN
    const original = { a: "foo" };

    // WHEN
    deepMerge([original, { a: { b: 3 } }]);

    // THEN
    expect(original).toEqual({ a: { b: 3 } });
  });

  test("overwrites arrays", () => {
    // GIVEN
    const original = { a: ["foo"] };

    // WHEN
    deepMerge([original, { a: ["bar"] }]);

    // THEN
    expect(original).toEqual({ a: ["bar"] });
  });

  test('does not overwrite if rightmost is "undefined"', () => {
    // GIVEN
    const original = { a: 1 };

    // WHEN
    deepMerge([original, { a: undefined }]);

    // THEN
    expect(original).toEqual({ a: 1 });
  });

  test("does not recurse on projects", () => {
    // GIVEN
    const proj1 = new TestProject();
    const proj2 = new TestProject();
    const objA = { a: proj1 };
    const objB = { a: proj2 };

    // WHEN
    deepMerge([objA, objB]);

    // THEN
    expect(objA).toEqual(objB);
  });

  test("does not recurse on components", () => {
    // GIVEN
    const proj = new TestProject();
    const comp1 = new JsonFile(proj, "foo", { obj: 3 });
    const comp2 = new JsonFile(proj, "bar", { obj: 5 });
    const objA = { a: comp1 };
    const objB = { a: comp2 };

    // WHEN
    deepMerge([objA, objB]);

    // THEN
    expect(objA).toEqual(objB);
  });
});

describe("deepMerge (destructive: true)", () => {
  test("merges objects", () => {
    // GIVEN
    const original = { a: { b: 3 } };

    // WHEN
    deepMerge([original, { a: { c: 4 } }], { destructive: true });

    // THEN
    expect(original).toEqual({ a: { b: 3, c: 4 } });
  });

  test("overwrites non-objects", () => {
    // GIVEN
    const original = { a: "foo" };

    // WHEN
    deepMerge([original, { a: { b: 3 } }], { destructive: true });

    // THEN
    expect(original).toEqual({ a: { b: 3 } });
  });

  test('does overwrite if rightmost is "undefined"', () => {
    // GIVEN
    const original = { a: 1 };

    // WHEN
    deepMerge([original, { a: undefined }], { destructive: true });

    // THEN
    expect(original).toEqual({}); // ! different from the non-destructive case
  });

  test("does not recurse on projects", () => {
    // GIVEN
    const proj1 = new TestProject();
    const proj2 = new TestProject();
    const objA = { a: proj1 };
    const objB = { a: proj2 };

    // WHEN
    deepMerge([objA, objB], { destructive: true });

    // THEN
    expect(objA).toEqual(objB);
  });

  test("does not recurse on components", () => {
    // GIVEN
    const proj = new TestProject();
    const comp1 = new JsonFile(proj, "foo", { obj: 3 });
    const comp2 = new JsonFile(proj, "bar", { obj: 5 });
    const objA = { a: comp1 };
    const objB = { a: comp2 };

    // WHEN
    deepMerge([objA, objB], { destructive: true });

    // THEN
    expect(objA).toEqual(objB);
  });
});

describe("deepMerge (mergeArray: true)", () => {
  test("merges arrays", () => {
    // GIVEN
    const original = { a: ["foo"] };

    // WHEN
    deepMerge([original, { a: ["bar"] }], { mergeArrays: true });

    // THEN
    expect(original).toEqual({ a: ["foo", "bar"] });
  });

  test("deduplicates when merging arrays", () => {
    // GIVEN
    const original = { a: ["foo"] };

    // WHEN
    deepMerge([original, { a: ["foo", "bar"] }], { mergeArrays: true });

    // THEN
    expect(original).toEqual({ a: ["foo", "bar"] });
  });
});

test("dedupArray", () => {
  expect(dedupArray(["a", "b", "c"])).toEqual(["a", "b", "c"]);
  expect(dedupArray(["a", "a", "b", "a"])).toEqual(["a", "b"]);
});

test("getFilePermissions", () => {
  expect(getFilePermissions({})).toEqual("644");
  expect(getFilePermissions({ readonly: true, executable: true })).toEqual(
    "544",
  );
  expect(getFilePermissions({ readonly: true, executable: false })).toEqual(
    "444",
  );
  expect(getFilePermissions({ readonly: false, executable: true })).toEqual(
    "755",
  );
  expect(getFilePermissions({ readonly: false, executable: false })).toEqual(
    "644",
  );
  expect(getFilePermissions({ readonly: false })).toEqual("644");
  expect(getFilePermissions({ executable: true })).toEqual("755");
});

test("getGitVersion", () => {
  expect(getGitVersion("git version 2.24.3 ")).toEqual("2.24.3");
  expect(getGitVersion("git version 2.30.1 (Apple Git-128)")).toEqual("2.30.1");
});

test("formatAsPythonModule", () => {
  expect(formatAsPythonModule("foo-bar-baz")).toEqual("foo_bar_baz");
  expect(formatAsPythonModule("foo.bar.baz")).toEqual("foo_bar_baz");
});

describe("isRoot", () => {
  describe("unix", () => {
    test("will detect root", () => {
      expect(isRoot("/", posix)).toBe(true);
    });

    test("will return false for path to dir", () => {
      expect(isRoot("/home/me/code", posix)).toBe(false);
    });
  });

  describe("windows", () => {
    test("will detect root", () => {
      expect(isRoot("C:\\", win32)).toBe(true);
    });

    test("will return false for path to dir", () => {
      expect(isRoot("C:\\Users\\me\\code", win32)).toBe(false);
    });
  });
});

describe("assertExecutablePermissions", () => {
  const filePath = "/path/to/file";
  const originalPlatform = process.platform;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Restore the original platform
    Object.defineProperty(process, "platform", { value: originalPlatform });
  });

  test("returns true when platform is win32, regardless of shouldBeExecutable", () => {
    // Mock the platform to be "win32"
    Object.defineProperty(process, "platform", { value: "win32" });

    expect(assertExecutablePermissions(filePath, true)).toBe(true);
    expect(assertExecutablePermissions(filePath, false)).toBe(true);
  });

  test("returns value of shouldBeExecutable when platform is not win32 and file permissions match", () => {
    // Mock the platform to be "linux"
    Object.defineProperty(process, "platform", { value: "linux" });

    // Mock the fs.accessSync function to not throw for executable permissions
    jest.spyOn(fs, "accessSync").mockImplementation((_path, mode) => {
      if (mode === fs.constants.X_OK) {
        return;
      } else {
        throw new Error();
      }
    });

    expect(assertExecutablePermissions(filePath, true)).toBe(true);
  });

  test("returns false when shouldBeExecutable is true but file is not executable", () => {
    // Mock the platform to be "linux"
    Object.defineProperty(process, "platform", { value: "linux" });

    // Mock the fs.accessSync function to return non-executable permissions
    jest.spyOn(fs, "accessSync").mockImplementation((_path, mode) => {
      if (mode === fs.constants.X_OK) {
        throw new Error();
      } else {
        return;
      }
    });

    expect(assertExecutablePermissions(filePath, true)).toBe(false);
  });

  test("returns false when shouldBeExecutable is false but file is executable", () => {
    // Mock the platform to be "linux"
    Object.defineProperty(process, "platform", { value: "linux" });

    // Mock the fs.accessSync function to return executable permissions
    jest.spyOn(fs, "accessSync").mockImplementation((_path, mode) => {
      if (mode === fs.constants.X_OK) {
        return;
      } else {
        throw new Error();
      }
    });

    expect(assertExecutablePermissions(filePath, false)).toBe(false);
  });
});

describe("normalizePersistedPath", () => {
  test("changes directory separators to forward slash on Windows", () => {
    // GIVEN
    const input = "C:\\path\\to\\file";

    // WHEN
    const output = normalizePersistedPath(input);

    // THEN
    expect(output).toEqual("C:/path/to/file");
  });

  test("handles mixed directory separators on Windows", () => {
    // GIVEN
    const input = "C:\\path/to\\file";

    // WHEN
    const output = normalizePersistedPath(input);

    // THEN
    expect(output).toEqual("C:/path/to/file");
  });

  test("handles path with no separators", () => {
    // GIVEN
    const input = "file";

    // WHEN
    const output = normalizePersistedPath(input);

    // THEN
    expect(output).toEqual("file");
  });

  test("handles gitignore pattern", () => {
    // GIVEN
    const input = "!/path\\to/file";

    // WHEN
    const output = normalizePersistedPath(input);

    // THEN
    expect(output).toEqual("!/path/to/file");
  });

  test("keeps directory separators as forward slash on Linux", () => {
    // GIVEN
    const input = "/path/to/file";

    // WHEN
    const output = normalizePersistedPath(input);

    // THEN
    expect(output).toEqual("/path/to/file");
  });
});
