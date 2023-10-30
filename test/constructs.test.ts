import { Component, Project } from "../src";

test("project.components() uses the construct tree", () => {
  const project = new Project({
    name: "test",
  });

  const a = new Component(project, "A");
  const b = new Component(project, "B");

  project.node.tryRemoveChild("A");

  // A should not be part of the project's components anymore
  expect(
    project.components.find((c) => c.node.path === a.node.path)
  ).toBeUndefined();

  // B should still be part of the project's components
  expect(
    project.components.find((c) => c.node.path === b.node.path)?.node.path
  ).toBe(b.node.path);
});
