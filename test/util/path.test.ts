import { ensureRelativePathStartsWithDot } from "../../src/util/path";

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
