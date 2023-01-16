import * as path from "path";
import * as fs from "fs-extra";
import { synthSnapshot, TestProject } from "./util";
import { Project, TextFile, ProjectOptions, JsonFile } from "../src";
import { PROJEN_MARKER } from "../src/common";

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
  expect(fs.pathExistsSync(path.join(comp.outdir, "README.md")));
  expect(
    fs.pathExistsSync(path.join(comp.outdir, "packages", "foo", ".gitignore"))
  );
  expect(
    fs.pathExistsSync(path.join(comp.outdir, "packages", "bar", ".gitignore"))
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
    Object {
      "test": "data",
    }
  `);
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
