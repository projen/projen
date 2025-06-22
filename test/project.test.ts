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

describe("project", () => {
  describe("fromEnv", () => {
    describe("when .env file is present", () => {
      let project: Project;
      beforeEach(() => {
        project = Project.fromEnv(path.join(__dirname, ".env"));
      });
      it("should return a project", () => {
        expect(project).toBeInstanceOf(Project);
      });
      it("should have the correct name", () => {
        expect(project.name).toBe("Awesome Dotenv Project");
      });
      it("should have the correct projen commands", () => {
        expect(project.projenCommand).toEqual("run me");
      });
      it("should have the class properties set correctly", () => {
        expect(project.fromEnvOptions).toEqual({
          name: "Awesome Dotenv Project",
          projenCommand: "run me",
        });
        expect(project.isFromEnv).toBeTruthy();
      });
    });
    describe("when PROJEN_ is used", () => {
      let project: Project;
      beforeEach(() => {
        process.env.PROJEN_NAME = "Awesome Projen Project";
        process.env.PROJEN_PROJEN_COMMAND = "run me";
        project = Project.fromEnv();
      });
      it("should return a project", () => {
        expect(project).toBeInstanceOf(Project);
      });
      it("should have the correct name", () => {
        expect(project.name).toBe("Awesome Projen Project");
      });
      it("should have the correct projen commands", () => {
        expect(project.projenCommand).toEqual("run me");
      });
    });
    describe("when both .env and PROJEN_ are used", () => {
      let project: Project;
      beforeEach(() => {
        process.env.PROJEN_NAME = "Env var named project";
        project = Project.fromEnv(path.join(__dirname, ".env"));
      });
      it("should return a project", () => {
        expect(project).toBeInstanceOf(Project);
      });
      it("should have the correct name", () => {
        expect(project.name).toBe("Env var named project");
      });
      it("should have the correct projen commands", () => {
        expect(project.projenCommand).toEqual("run me");
      });
    });
    describe("invalid configurations", () => {
      it("should throw an error if an invalid .env file is specified", () => {
        expect(() => {
          Project.fromEnv("invalid/path/to/.env");
        }).toThrow(".env file not found at invalid/path/to/.env");
      });
      it("should throw an error if no .env file or PROJEN_ env vars are specified", () => {
        process.env = {};
        expect(() => {
          Project.fromEnv();
        }).toThrow(
          "No PROJEN_ environment variables or empty .env file found at "
        );
      });
    });
  });
});
