import { Construct } from "constructs";
import { NodeProject } from "../../src/javascript";
import { Project } from "../../src/project";
import { closestProjectMustBe } from "../../src/util/constructs";

describe("closestProjectMustBeA", () => {
  test("finds the closest NodeProject", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "main",
    });
    const child = new Construct(project, "child");

    // WHEN
    const found = closestProjectMustBe(child, NodeProject, "TestComponent");

    // THEN
    expect(found).toBe(project);
  });

  test("throws if the closest project is not a NodeProject", () => {
    // GIVEN
    const project = new Project({
      name: "test",
    });
    const child = new Construct(project, "child");

    // WHEN/THEN
    expect(() =>
      closestProjectMustBe(child, NodeProject, "TestComponent")
    ).toThrow(/must be created within a NodeProject, but found: Project/);
  });

  test("throws if there is no Project at all", () => {
    // GIVEN
    const root = new Construct(undefined as any, "root");
    const child = new Construct(root, "child");

    // WHEN/THEN
    expect(() =>
      closestProjectMustBe(child, NodeProject, "TestComponent")
    ).toThrow(/must be created within a NodeProject, but no Project was found/);
  });
});
