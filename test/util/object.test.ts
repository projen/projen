import { removeNullOrUndefinedProperties } from "../../src/util/object";

describe("removeNullOrUndefinedProperties", () => {
  test("removes null and undefined properties", () => {
    expect(
      removeNullOrUndefinedProperties({
        a: 1,
        b: undefined,
        c: null,
        d: 2,
      }),
    ).toStrictEqual({
      a: 1,
      d: 2,
    });
  });
});
