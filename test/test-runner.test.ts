import { TestProject } from "./util";
import { TestRunner } from "../src/test-runner";

class MinimalTestRunner extends TestRunner {}

test("TestRunner.configFor() defaults to an empty dependency and step list", () => {
  const project = new TestProject();
  const runner = new MinimalTestRunner().attach(project);

  expect(runner.configFor()).toEqual({
    dependencies: [],
    steps: [{ execArgs: [] }],
  });
});
