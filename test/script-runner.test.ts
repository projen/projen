import { TestProject } from "./util";
import { ScriptRunner } from "../src/script-runner";

test("ScriptRunner executes the entrypoint directly", () => {
  const runner = new ScriptRunner();
  const real = runner.tryAttach(new TestProject()) as ScriptRunner;

  expect(real.configFor("foo.js")).toEqual({
    dependencies: [],
    steps: [{ execArgs: ["foo.js"] }],
  });
});
