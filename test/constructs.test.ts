import { Component, Project } from "../src";

test("project.components uses the construct tree", () => {
  const project = new Project({
    name: "root",
  });

  const a = new Component(project, "A");
  const b = new Component(project, "B");

  project.node.tryRemoveChild("A");

  // A should not be part of the project's components anymore
  expect(project.components.find(match(a))).toBeUndefined();

  // B should still be part of the project's components
  expect(project.components.find(match(b))).toBeDefined();
});

test("project.components includes scoped components", () => {
  const project = new Project({
    name: "root",
  });

  const foo = new Component(project, "Foo");
  const bar = new Component(foo, "Bar");

  expect(bar.node.scope?.node.path).toBe(foo.node.path);
  expect(project.components.find(match(foo))).toBeDefined();
  expect(project.components.find(match(bar))).toBeDefined();
});

test("project.components does not include subproject components", () => {
  const root = new Project({
    name: "root",
  });
  const subproject = new Project({
    name: "subproject",
    parent: root,
    outdir: "packages/sub",
  });

  const foo = new Component(root, "Foo");
  const bar = new Component(subproject, "Bar");

  expect(root.components.find(match(foo))).toBeDefined();
  expect(subproject.components.find(match(foo))).toBeUndefined();

  expect(root.components.find(match(bar))).toBeUndefined();
  expect(subproject.components.find(match(bar))).toBeDefined();
});

function match(component: Component) {
  return (other: Component) => {
    return component.node.path === other.node.path;
  };
}
