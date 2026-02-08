import { BuildWorkflow } from "../../src/build";
import { Project } from "../../src/project";
import { synthSnapshot, TestProject } from "../util";

describe("name", () => {
  test("defaults to build", () => {
    // GIVEN
    const p = new TestProject();
    new BuildWorkflow(p, {
      buildTask: p.buildTask,
      artifactsDirectory: "./foo",
    });

    // THEN
    const workflows = synthWorkflows(p);
    expect(workflows[".github/workflows/build.yml"]).toBeDefined();
    expect(workflows[".github/workflows/build.yml"]).toMatchSnapshot();
  });

  test("uses custom", () => {
    // GIVEN
    const p = new TestProject();
    new BuildWorkflow(p, {
      name: "custom-name",
      buildTask: p.buildTask,
      artifactsDirectory: "./foo",
    });

    // THEN
    const workflows = synthWorkflows(p);
    expect(workflows[".github/workflows/custom-name.yml"]).toBeDefined();
    expect(workflows[".github/workflows/custom-name.yml"]).toMatchSnapshot();
  });

  describe("with parent project", () => {
    test("defaults to build with project name suffix", () => {
      // GIVEN
      const parent = new TestProject();
      const p = new TestProject({ parent, outdir: "child" });
      new BuildWorkflow(p, {
        buildTask: p.buildTask,
        artifactsDirectory: "./foo",
      });

      // THEN
      const workflows = synthWorkflows(parent);
      console.log(workflows);
      expect(workflows[".github/workflows/build_my-project.yml"]).toBeDefined();
      expect(
        workflows[".github/workflows/build_my-project.yml"],
      ).toMatchSnapshot();
    });
  });
});

function synthWorkflows(p: Project): any {
  const snapshot = synthSnapshot(p);
  const filtered = Object.keys(snapshot)
    .filter((path) => path.startsWith(".github/workflows/"))
    .reduce((obj, key) => {
      return {
        ...obj,
        [key]: snapshot[key],
      };
    }, {});
  return filtered;
}
