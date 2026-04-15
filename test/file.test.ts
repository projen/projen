import { JsonFile } from "../src";
import { mkdtemp, TestProject } from "./util";

describe("FileBase.diff()", () => {
  test("returns undefined when file has not changed", () => {
    const outdir = mkdtemp({ cleanup: false });

    const project1 = new TestProject({ outdir });
    new JsonFile(project1, "file.json", {
      obj: { hello: "world" },
      marker: false,
    });
    project1.synth();

    const project2 = new TestProject({ outdir });
    const file = new JsonFile(project2, "file.json", {
      obj: { hello: "world" },
      marker: false,
    });
    project2.synth();

    expect(file.changed).toBe(false);
    expect(file.diff()).toBeUndefined();
  });

  test("returns undefined before synthesis", () => {
    const project = new TestProject();
    const file = new JsonFile(project, "file.json", {
      obj: { hello: "world" },
      marker: false,
    });

    expect(file.diff()).toBeUndefined();
  });

  test("returns undefined when content is identical but permissions changed", () => {
    const outdir = mkdtemp({ cleanup: false });

    const project1 = new TestProject({ outdir });
    new JsonFile(project1, "file.json", {
      obj: { hello: "world" },
      marker: false,
      readonly: true,
    });
    project1.synth();

    const project2 = new TestProject({ outdir });
    const file = new JsonFile(project2, "file.json", {
      obj: { hello: "world" },
      marker: false,
      readonly: false,
    });
    project2.synth();

    expect(file.changed).toBe(true);
    expect(file.diff()).toBeUndefined();
  });

  test("delegates to unifiedDiff for changed files", () => {
    const project = new TestProject();
    const file = new JsonFile(project, "file.json", {
      obj: { hello: "world" },
      marker: false,
    });

    project.synth();

    expect(file.changed).toBe(true);
    const diff = file.diff();
    expect(diff).toBeDefined();
    expect(diff).toEqual(
      expect.arrayContaining([expect.stringContaining("+")]),
    );
  });
});
