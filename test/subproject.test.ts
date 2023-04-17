import * as fs from "fs";
import * as path from "path";
import { synthSnapshot, TestProject } from "./util";
import { Project, TextFile, ProjectOptions, JsonFile, Component } from "../src";
import { PROJEN_MARKER } from "../src/common";
import { GitHubProject } from "../src/github";

test("composing projects declaratively", () => {
  const comp = new TestProject();
  new Project({
    name: "foo",
    parent: comp,
    outdir: path.join("packages", "foo"),
  });
  comp.synth();

  // THEN
  expect(
    fs.existsSync(path.join(comp.outdir, "packages", "foo", ".gitignore"))
  ).toBeTruthy();
});

test("composing projects synthesizes to subdirs", () => {
  // GIVEN
  const comp = new TestProject();

  // WHEN
  new Project({
    name: "foo",
    parent: comp,
    outdir: path.join("packages", "foo"),
  });
  new Project({
    name: "bar",
    parent: comp,
    outdir: path.join("packages", "bar"),
  });

  comp.synth();

  // THEN
  expect(fs.existsSync(path.join(comp.outdir, "README.md")));
  expect(
    fs.existsSync(path.join(comp.outdir, "packages", "foo", ".gitignore"))
  );
  expect(
    fs.existsSync(path.join(comp.outdir, "packages", "bar", ".gitignore"))
  );
});

test("errors when paths overlap", () => {
  // GIVEN
  const comp = new TestProject();
  new Project({
    name: "foo",
    parent: comp,
    outdir: path.join("packages", "foo"),
  });

  // WHEN/THEN
  expect(
    () =>
      new Project({
        name: "foo",
        parent: comp,
        outdir: path.join("packages", "foo"),
      })
  ).toThrowError(/there is already a sub-project with/i);
});

test("multiple levels", () => {
  const root = new TestProject();
  const child1 = new Project({
    name: "child1",
    parent: root,
    outdir: "child1",
  });
  const child2 = new Project({
    name: "child2",
    parent: child1,
    outdir: "child2",
  });

  expect(child1.outdir).toEqual(path.join(root.outdir, "child1"));
  expect(child2.outdir).toEqual(path.join(root.outdir, "child1", "child2"));
});

test("subprojects cannot introduce files that override each other", () => {
  const root = new TestProject();
  const child = new Project({
    name: "sub-project",
    parent: root,
    outdir: "sub-project",
  });

  new TextFile(root, "sub-project/file.txt");
  expect(() => new TextFile(child, "file.txt")).toThrow(
    /there is already a file under sub-project(\\|\/)file\.txt/
  );
});

test('"outdir" for subprojects must be relative', () => {
  const root = new TestProject();
  expect(
    () => new Project({ name: "foobar", parent: root, outdir: "/foo/bar" })
  ).toThrow(/"outdir" must be a relative path/);
});

test("subproject generated files do not get cleaned up by parent project", () => {
  const root = new TestProject();
  const child = new PreSynthProject({ parent: root, outdir: "sub-project" });

  // no files have been generated yet
  expect(fs.existsSync(child.file.absolutePath)).toEqual(false);

  // generate all project files at least once
  root.synth();
  expect(child.fileExistedDuringPresynth).toEqual(false);
  expect(fs.existsSync(child.file.absolutePath)).toEqual(true);

  // resynthesize projects with all generated files already existing
  root.synth();
  expect(child.fileExistedDuringPresynth).toEqual(true);
  expect(fs.existsSync(child.file.absolutePath)).toEqual(true);
});

test("subproject generated json files can be synthed", () => {
  const root = new TestProject();
  const child = new PreSynthProject({ parent: root, outdir: "sub-project" });
  new JsonFile(child, "test.jsonc", {
    marker: true,
    allowComments: true,
    obj: {
      test: "data",
    },
  });

  const out = synthSnapshot(root);
  expect(out["sub-project/test.jsonc"]).toMatchInlineSnapshot(`
    {
      "test": "data",
    }
  `);
});

test("subprojects do not add a Projenrc component", () => {
  // GIVEN
  const parent = new TestProject();

  const child = new TestProject({
    parent,
    outdir: "sub",
    projenrcJson: true,
  });

  // THEN
  const rcFiles = child.components.filter((o: Component) =>
    o.constructor.name.toLowerCase().includes("projenrc")
  );
  expect(rcFiles.length).toBe(0);
});

test("subprojects use root level default task", () => {
  // GIVEN
  const root = new TestProject();

  const childOne = new TestProject({
    parent: root,
    outdir: "one",
  });

  new TestProject({
    parent: childOne,
    outdir: "two",
  });

  // THEN
  const out = synthSnapshot(root);
  expect(out["one/.projen/tasks.json"]).toMatchSnapshot();
  expect(out["one/.projen/tasks.json"].tasks.default.steps).toEqual([
    {
      cwd: "..",
      exec: "npx projen default",
    },
  ]);
  expect(out["one/two/.projen/tasks.json"]).toMatchSnapshot();
  expect(out["one/two/.projen/tasks.json"].tasks.default.steps).toEqual([
    {
      cwd: "../..",
      exec: "npx projen default",
    },
  ]);
});

test("files are annotated as generated on subproject", () => {
  // GIVEN

  // Currently `Project` has an empty implementation of `annotateGenerated`,
  // so we use `GitHubProject` to observe the resulting `.gitattributes`
  const parent = new GitHubProject({ name: "parent" });
  const child = new GitHubProject({
    parent,
    name: "child",
    outdir: path.join("packages", "child"),
  });

  // WHEN
  new TextFile(child, "file.txt", { lines: ["Content"] });

  // THEN
  const out = synthSnapshot(parent);
  expect(out[".gitattributes"].includes("file.txt")).toBe(false);
  expect(out["packages/child/.gitattributes"].includes("file.txt")).toBe(true);
});

// a project that depends on generated files during preSynthesize()
class PreSynthProject extends Project {
  public file: TextFile;
  public fileExistedDuringPresynth: boolean;
  constructor(options: Omit<ProjectOptions, "name"> = {}) {
    super({ name: "presynth-project", ...options });

    this.file = new TextFile(this, "presynth.txt", { lines: [PROJEN_MARKER] });
    this.fileExistedDuringPresynth = false;
  }

  preSynthesize() {
    this.fileExistedDuringPresynth = fs.existsSync(this.file.absolutePath);
  }
}
