import { GitlabConfiguration } from "../../src/gitlab";
import { TestProject } from "../util";

test("throws when adding an adding a job to a non-existent nested template", () => {
  // GIVEN
  const p = new TestProject({
    stale: true,
  });
  const c = new GitlabConfiguration(p);
  c.createNestedTemplates({ foo: {} });
  // THEN
  expect(() => c.nestedTemplates.bar.addStages("baz")).toThrowError;
});

test("does not throw when adding an services with an existing nested template", () => {
  // GIVEN
  const p = new TestProject({
    stale: true,
  });
  const c = new GitlabConfiguration(p);
  c.createNestedTemplates({ foo: {} });
  // THEN
  expect(() => c.nestedTemplates.foo.addStages("baz")).not.toThrowError;
});

test("main configuration inherits child configuration stages", () => {
  // GIVEN
  const p = new TestProject({
    stale: true,
  });
  const c = new GitlabConfiguration(p);
  c.createNestedTemplates({ foo: { jobs: { bar: { stage: "baz" } } } });
  // THEN
  expect(c.stages).toContain("baz");
});

test("main configuration inherits child configuration services", () => {
  // GIVEN
  const p = new TestProject({
    stale: true,
  });

  const c = new GitlabConfiguration(p, { path: "foo" });

  // THEN
  expect(c.path).toBe("foo");
});
