import { Component, Project } from "../../src";
import { TypeScriptProject } from "../../src/typescript";

test("typescript subprojects do not add a Projenrc component", () => {
  // GIVEN
  const parent = new Project({ name: "root" });

  // WHEN
  const child = new TypeScriptProject({
    parent,
    outdir: "sub",
    defaultReleaseBranch: "main",
    name: "test",
    projenrcTs: true,
  });

  // THEN
  const rcFiles = child.components.filter((o: Component) =>
    o.constructor.name.toLowerCase().includes("projenrc"),
  );
  expect(rcFiles.length).toBe(0);
});
