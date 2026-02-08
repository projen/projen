import { Component, Project } from "../../src";
import { PythonProject } from "../../src/python";

test("python subprojects do not add a Projenrc component", () => {
  // GIVEN
  const parent = new Project({ name: "root" });

  // WHEN
  const child = new PythonProject({
    parent,
    outdir: "sub",
    projenrcPython: true,
    name: "test-python-project",
    moduleName: "test_python_project",
    authorName: "First Last",
    authorEmail: "email@example.com",
    version: "0.1.0",
  });

  // THEN
  const rcFiles = child.components.filter((o: Component) =>
    o.constructor.name.toLowerCase().includes("projenrc"),
  );
  expect(rcFiles.length).toBe(0);
});
