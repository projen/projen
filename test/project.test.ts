import * as path from "path";
import { synthSnapshot, TestProject } from "./util";
import { JsonFile, Project, Testing, TextFile } from "../src";

test("file paths are relative to the project outdir", () => {
  // GIVEN
  const p = new TestProject();

  // WHEN
  const f = new TextFile(p, "foo/bar.txt");

  // THEN
  expect(f.absolutePath).toBe(path.resolve(p.outdir, f.path));
  expect(path.isAbsolute(f.absolutePath)).toBeTruthy();
});

test("all files added to the project can be enumerated", () => {
  // GIVEN
  const p = new TestProject();
  new TextFile(p, "my.txt");
  new JsonFile(p, "your/file/me.json", { obj: {} });

  // WHEN
  const result = p.files;

  // THEN
  const exp = (e: string) =>
    expect(result.map((x) => x.path).includes(e)).toBeTruthy();
  exp("my.txt");
  exp("your/file/me.json");
});

test("generated files are committed if commitGenerated is undefined", () => {
  // GIVEN
  const p = new TestProject();
  new TextFile(p, "my.txt");

  // WHEN
  const gitIgnoreContents = synthSnapshot(p)[".gitignore"];

  // THEN
  expect(gitIgnoreContents).toMatchSnapshot();
});

test("generated files are committed if commitGenerated is true", () => {
  // GIVEN
  const p = new TestProject({ commitGenerated: true });
  new TextFile(p, "my.txt");

  // WHEN
  const gitIgnoreContents = synthSnapshot(p)[".gitignore"];

  // THEN
  expect(gitIgnoreContents).toMatchSnapshot();
});

test("generated files are ignored from git if commitGenerated is false", () => {
  // GIVEN
  const p = new TestProject({ commitGenerated: false });
  new TextFile(p, "my.txt");

  // WHEN
  const gitIgnoreContents = synthSnapshot(p)[".gitignore"];

  // THEN
  expect(gitIgnoreContents).toMatchSnapshot();
});

test("specified gitIgnore patterns are ignored (via gitIgnoreOptions)", () => {
  // GIVEN
  const p = new TestProject({
    gitIgnoreOptions: {
      ignorePatterns: [".jsii", "foo/"],
    },
  });

  // WHEN
  const gitIgnoreContents = synthSnapshot(p)[".gitignore"];

  // THEN
  expect(gitIgnoreContents).toMatchSnapshot();
  expect(gitIgnoreContents).toContain(".jsii");
  expect(gitIgnoreContents).toContain("foo/");
});

test("tryFindFile() can be used to find a file either absolute or relative path", () => {
  // GIVEN
  const p = new TestProject();
  const file = new JsonFile(p, "your/file/me.json", { obj: {} });

  // WHEN
  const result1 = p.tryFindFile("your/file/me.json");
  const result2 = p.tryFindFile(path.resolve(p.outdir, "your/file/me.json"));

  // THEN
  expect(result1 === file).toBeTruthy();
  expect(result2 === file).toBeTruthy();
});

test("tryFindFile() will also look up files in subprojects", () => {
  // GIVEN
  const p = new TestProject();
  const child = new Project({
    name: "foobar",
    parent: p,
    outdir: "subproject/foo/bar",
  });
  const fchild = new TextFile(child, "fchild.txt");

  // WHEN
  const result1 = p.tryFindFile("subproject/foo/bar/fchild.txt");
  const result2 = child.tryFindFile("fchild.txt");

  // THEN
  expect(result1 === fchild).toBeTruthy();
  expect(result2 === fchild).toBeTruthy();
});

test("tryRemoveFile() can be used to remove a file with a relative path", () => {
  // GIVEN
  const p = new TestProject();
  const file = new JsonFile(p, "your/file/me.json", { obj: {} });

  // WHEN
  const result1 = p.tryRemoveFile("your/file/me.json");
  const result2 = p.tryRemoveFile("your/file/me.json");

  // THEN
  const outdir = Testing.synth(p);
  expect(outdir["your/file/me.json"]).toBeUndefined();
  expect(result1 === file).toBeTruthy();
  expect(result2).toBeUndefined();
});

test("tryRemoveFile() can be used to remove a file with an absolute path", () => {
  // GIVEN
  const p = new TestProject();
  const file = new JsonFile(p, "your/file/me.json", { obj: {} });

  // WHEN
  const result1 = p.tryRemoveFile(path.resolve(p.outdir, "your/file/me.json"));
  const result2 = p.tryRemoveFile(path.resolve(p.outdir, "your/file/me.json"));

  // THEN
  const outdir = Testing.synth(p);
  expect(outdir["your/file/me.json"]).toBeUndefined();
  expect(result1 === file).toBeTruthy();
  expect(result2).toBeUndefined();
});

test("tryRemoveFile() will also remove a file in a subproject", () => {
  // GIVEN
  const p = new TestProject();
  const child = new Project({
    name: "foobar",
    parent: p,
    outdir: "subproject/foo/bar",
  });
  const fchild = new TextFile(child, "fchild.txt");

  // WHEN
  const result1 = p.tryRemoveFile("subproject/foo/bar/fchild.txt");
  const result2 = p.tryRemoveFile("subproject/foo/bar/fchild.txt");

  // THEN
  const outdir = Testing.synth(p);
  expect(outdir["subproject/foo/bar/fchild.txt"]).toBeUndefined();
  expect(result1 === fchild).toBeTruthy();
  expect(result2).toBeUndefined();
});

test("tryRemoveFile() can be used to override an existing file", () => {
  // GIVEN
  const p = new TestProject();
  new TextFile(p, "your/file/me.txt", { lines: ["original"] });

  // WHEN
  p.tryRemoveFile("your/file/me.txt");
  const newFile = new TextFile(p, "your/file/me.txt", { lines: ["better"] });
  const result = p.tryFindFile("your/file/me.txt");

  // THEN
  const outdir = Testing.synth(p);
  expect(outdir["your/file/me.txt"]).toContain("better");
  expect(result === newFile).toBeTruthy();
});

test("autoApprove is configured", () => {
  // WHEN
  const p = new TestProject({
    autoApproveOptions: {
      secret: "MY_SECRET",
    },
  });

  // THEN
  expect(p.autoApprove).toBeDefined();
  expect(p.autoApprove?.label).toEqual("auto-approve");
});

test("github: false disables github integration", () => {
  // WHEN
  const p = new TestProject({
    github: false,
  });

  // THEN
  expect(p.github).toBeUndefined();
});

test("projectTree: false (default) does not generate tree.json", () => {
  // GIVEN
  const p = new TestProject();

  // WHEN
  const snapshot = synthSnapshot(p);

  // THEN
  expect(snapshot[".projen/tree.json"]).toBeUndefined();
});

test("projectTree: true generates tree.json with project hierarchy", () => {
  // GIVEN
  const p = new TestProject({ projectTree: true });

  // WHEN
  const snapshot = synthSnapshot(p);

  // THEN
  expect(snapshot[".projen/tree.json"]).toBeDefined();
  const tree = snapshot[".projen/tree.json"];
  expect(tree["//"]).toBe(
    "Experimental. Expect frequent changes to the structure of this file.",
  );
  // The root key should be the auto-generated construct ID
  const rootKey = Object.keys(tree).find((k) => k !== "//");
  expect(rootKey).toBeDefined();
  const rootNode = tree[rootKey!];
  expect(rootNode.metadata).toBeDefined();
  expect(rootNode.metadata.type).toBe("project");
});

test("projectTree includes subprojects in hierarchy", () => {
  // GIVEN
  const p = new TestProject({ projectTree: true });
  new Project({
    name: "child-project",
    parent: p,
    outdir: "packages/child",
  });

  // WHEN
  const snapshot = synthSnapshot(p);

  // THEN
  const tree = snapshot[".projen/tree.json"];
  const rootKey = Object.keys(tree).find((k) => k !== "//");
  const rootNode = tree[rootKey!];
  expect(rootNode.nodes).toBeDefined();
  // Find the child project node
  const childKey = Object.keys(rootNode.nodes!).find((k) =>
    k.includes("child-project"),
  );
  expect(childKey).toBeDefined();
});
