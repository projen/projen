import * as path from "path";
import { JsonFile, Project, Testing, TextFile } from "../src";

test("file paths are relative to the project outdir", () => {
  // GIVEN
  const p = new Project({ name: "my-project" });

  // WHEN
  const f = new TextFile(p, "foo/bar.txt");

  // THEN
  expect(f.absolutePath).toBe(path.resolve(p.outdir, f.path));
  expect(path.isAbsolute(f.absolutePath)).toBeTruthy();
});

test("all files added to the project can be enumerated", () => {
  // GIVEN
  const p = new Project({ name: "my-project" });
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

test("tryFindFile() can be used to find a file either absolute or relative path", () => {
  // GIVEN
  const p = new Project({ name: "my-project" });
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
  const p = new Project({ name: "my-project" });
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
  const p = new Project({ name: "my-project" });
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
  const p = new Project({ name: "my-project" });
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
  const p = new Project({ name: "my-project" });
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
  const p = new Project({ name: "my-project" });
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
