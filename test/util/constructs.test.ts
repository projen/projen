import { Construct } from "constructs";
import { NodeProject } from "../../src/javascript";
import { Project } from "../../src/project";
import { findClosestProjectOfType } from "../../src/util/constructs";

describe("findClosestProjectOfType", () => {
  test("finds the closest NodeProject", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "main",
    });
    const child = new Construct(project, "child");

    // WHEN
    const found = findClosestProjectOfType(child, NodeProject, "TestComponent");

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
      findClosestProjectOfType(child, NodeProject, "TestComponent")
    ).toThrow(/must be created within a NodeProject, but found: Project/);
  });

  test("throws if there is no Project at all", () => {
    // GIVEN
    const root = new Construct(undefined as any, "root");
    const child = new Construct(root, "child");

    // WHEN/THEN
    expect(() =>
      findClosestProjectOfType(child, NodeProject, "TestComponent")
    ).toThrow(
      /must be created in the scope of a Project, but no Project was found/
    );
  });
});

describe("Project.of()", () => {
  test("finds the closest Project", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "main",
    });
    const child = new Construct(project, "child");

    // WHEN
    const found = Project.of(child);

    // THEN
    expect(found).toBe(project);
  });

  test("cannot find any project", () => {
    // GIVEN
    const root = new Construct(undefined as any, "root");
    const child = new Construct(root, "child");

    // WHEN/THEN
    expect(() => Project.of(child)).toThrow(
      /has not been created in the scope of a Project/
    );
  });
});

describe("NodeProject.of()", () => {
  test("finds the closest NodeProject", () => {
    // GIVEN
    const root = new NodeProject({
      name: "test",
      defaultReleaseBranch: "main",
    });
    const other = new (class extends Project {})({
      parent: root,
      outdir: "other",
      name: "other",
    });
    const child = new Construct(other, "child");

    // WHEN
    const found = NodeProject.of(child);

    // THEN
    expect(found).toBe(root);
  });

  test("cannot find any project", () => {
    // GIVEN
    const root = new Construct(undefined as any, "root");
    const child = new Construct(root, "child");

    // WHEN/THEN
    expect(() => NodeProject.of(child)).toThrow(
      /has not been created in the scope of a NodeProject/
    );
  });

  test("cannot find a NodeProject", () => {
    // GIVEN
    const root = new (class extends Project {})({
      name: "test",
    });
    const child = new Construct(root, "child");

    // WHEN/THEN
    expect(() => NodeProject.of(child)).toThrow(
      /has not been created in the scope of a NodeProject/
    );
  });
});
