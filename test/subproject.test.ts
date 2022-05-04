import * as path from "path";
import * as fs from "fs-extra";
import { Project, TextFile, ProjectOptions, Testing } from "../src";
import { PROJEN_MARKER } from "../src/common";

test("composing projects declaratively", () => {
  // GIVEN
  const comp = new Project({ name: "my-project" });

  // WHEN
  const child = new Project({
    name: "foo",
    parent: comp,
    outdir: path.join("packages", "foo"),
  });
  new TextFile(child, ".gitignore", { lines: ["/node_modules"] });

  // THEN
  const snapshot = Testing.synth(comp);
  expect(snapshot[path.join("packages", "foo", ".gitignore")]).toBeDefined();
});

test("composing multiple projects synthesizes to subdirs", () => {
  // GIVEN
  const comp = new Project({ name: "my-project" });

  // WHEN
  const child1 = new Project({
    name: "foo",
    parent: comp,
    outdir: path.join("packages", "foo"),
  });
  new TextFile(child1, ".gitignore", { lines: ["/node_modules"] });
  const child2 = new Project({
    name: "bar",
    parent: comp,
    outdir: path.join("packages", "bar"),
  });
  new TextFile(child2, ".gitignore", { lines: ["/node_modules"] });

  comp.synth();

  // THEN
  const snapshot = Testing.synth(comp);
  expect(snapshot[path.join("packages", "foo", ".gitignore")]).toBeDefined();
  expect(snapshot[path.join("packages", "bar", ".gitignore")]).toBeDefined();
});

test("errors when paths overlap", () => {
  // GIVEN
  const comp = new Project({ name: "my-project" });
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
  const root = new Project({ name: "my-project" });
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
  const root = new Project({ name: "my-project" });
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
  const root = new Project({ name: "my-project" });
  expect(
    () => new Project({ name: "foobar", parent: root, outdir: "/foo/bar" })
  ).toThrow(/"outdir" must be a relative path/);
});

test("subproject generated files do not get cleaned up by parent project", () => {
  const root = new Project({ name: "my-project" });
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
