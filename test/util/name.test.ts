import { workflowNameForProject } from "../../src/util/name";
import { TestProject } from "../util";

describe("workflowNameForProject", () => {
  test("returns base", () => {
    expect(workflowNameForProject("base", new TestProject())).toEqual("base");
  });

  describe("with parent project", () => {
    const parent = new TestProject();
    expect(
      workflowNameForProject(
        "base",
        new TestProject({ parent, outdir: "child" }),
      ),
    ).toEqual("base_my-project");
  });
});
