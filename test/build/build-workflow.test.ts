import { parse as parseYaml } from "yaml";
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

  test("build workflow strategy matrix controls work", () => {
    // GIVEN
    const p = new TestProject();
    const buildRunsOn = "${{ matrix.runsOn }}";
    new BuildWorkflow(p, {
      name: "strategy-test",
      buildTask: p.buildTask,
      artifactsDirectory: "./foo",
      strategy: {
        matrix: {
          domain: {
            runsOn: ["ubuntu-latest", "windows-latest"],
            node: [
              { version: "18.14.2" },
              { version: "18.18" },
              { version: "18.20" }, // some tools behave differently in 18.20 than 18.18
              { version: "20" },
            ],
          },
          include: [
            {
              node: { version: "18.14.2" },
              release: true,
            },
          ],
        },
      },
      uploadArtifactsVariable: "matrix.release",
      buildRunsOn: [buildRunsOn],
    });

    // THEN
    const workflows = synthWorkflows(p);
    const strategyTestWorkflowYaml =
      workflows[".github/workflows/strategy-test.yml"];
    expect(strategyTestWorkflowYaml).toBeDefined();

    const strategyTestWorkflow = parseYaml(strategyTestWorkflowYaml);

    const buildJob = strategyTestWorkflow?.jobs?.build;
    const buildStrategy = buildJob?.strategy;
    expect(buildStrategy).toBeDefined();
    expect(buildStrategy?.matrix).toBeDefined();
    expect(buildJob["runs-on"]).toBe(buildRunsOn);

    const selfMutationJob = strategyTestWorkflow?.jobs?.["self-mutation"];
    expect(selfMutationJob).toBeDefined();
    expect(selfMutationJob.strategy).toBeUndefined();
    expect(selfMutationJob["runs-on"]).toBe("ubuntu-latest");
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
        workflows[".github/workflows/build_my-project.yml"]
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
