import { formatPathAsDotNotation } from "../../src/util/path";

describe("formatPathAsDotNotation", () => {
  test("dont touch dot notation", () => {
    expect(formatPathAsDotNotation("./foo")).toBe("./foo");
  });

  test("add dot to path beginning with folder", () => {
    expect(formatPathAsDotNotation("/foo")).toBe("./foo");
  });

  test("add dot to path beginning with folder name", () => {
    expect(formatPathAsDotNotation("foo")).toBe("./foo");
  });
});
