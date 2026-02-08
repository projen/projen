import { Component, Project } from "../../src";
import { JavaProject } from "../../src/java";

test("java subprojects do not add a Projenrc component", () => {
  // GIVEN
  const parent = new Project({ name: "root" });

  // WHEN
  const child = new JavaProject({
    parent,
    outdir: "sub",
    name: "test",
    projenrcJava: true,
    groupId: "org.acme",
    artifactId: "my-artifact",
    version: "1.0.0",
  });

  // THEN
  const rcFiles = child.components.filter((o: Component) =>
    o.constructor.name.toLowerCase().includes("projenrc"),
  );
  expect(rcFiles.length).toBe(0);
});
