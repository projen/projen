import { Project } from "../../src";
import { GitlabConfiguration } from "../../src/gitlab";

test("throws when adding an adding a job to a non-existant nested template", () => {
  // GIVEN
  const p = new Project({ name: "my-project" });
  const c = new GitlabConfiguration(p);
  c.createNestedTemplates({ foo: {} });
  // THEN
  expect(() => c.nestedTemplates.bar.addStages("baz")).toThrowError;
});

test("does not throw when adding an services with an existing nested template", () => {
  // GIVEN
  const p = new Project({ name: "my-project" });
  const c = new GitlabConfiguration(p);
  c.createNestedTemplates({ foo: {} });
  // THEN
  expect(() => c.nestedTemplates.foo.addStages("baz")).not.toThrowError;
});

test("main configuration inherits child configuration stages", () => {
  // GIVEN
  const p = new Project({ name: "my-project" });
  const c = new GitlabConfiguration(p);
  c.createNestedTemplates({ foo: { jobs: { bar: { stage: "baz" } } } });
  // THEN
  expect(c.stages).toContain("baz");
});
