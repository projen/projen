import { TestProject } from "./util";
import { TestMatch, TestRunner } from "../src/test-runner";

class MinimalTestRunner extends TestRunner {}

test("TestRunner.configFor() defaults to an empty dependency and step list", () => {
  const project = new TestProject();
  const runner = new MinimalTestRunner().attach(project);

  expect(runner.configFor()).toEqual({
    dependencies: [],
    steps: [{ execArgs: [] }],
  });
});

test("TestMatch.deferred() returns the default value when no patterns were added", () => {
  const testMatch = new TestMatch({ defaultValue: ["**/*.test.ts"] });

  expect(testMatch.deferred()).toEqual(["**/*.test.ts"]);
});

test("TestMatch.add() overrides the default value with the added patterns", () => {
  const testMatch = new TestMatch({ defaultValue: ["**/*.test.ts"] });

  testMatch.add("**/*.spec.ts");
  testMatch.add("**/*.integ.ts");

  expect(testMatch.deferred()).toEqual(
    expect.arrayContaining(["**/*.spec.ts", "**/*.integ.ts"]),
  );
  expect(testMatch.deferred()).not.toContain("**/*.test.ts");
});

test("TestMatch.remove() falls back to the default value once all added patterns are removed", () => {
  const testMatch = new TestMatch({ defaultValue: ["**/*.test.ts"] });

  testMatch.add("**/*.spec.ts");
  testMatch.remove("**/*.spec.ts");

  expect(testMatch.deferred()).toEqual(["**/*.test.ts"]);
});
