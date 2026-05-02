import { synthSnapshot, TestProject } from "./util";
import { Project } from "../src";
import { GitHubProject } from "../src/github/github-project";
import { Repository } from "../src/repository";

describe("backward compatibility", () => {
  test("GitHubProject produces same output structure", () => {
    const project = new TestProject();
    const snapshot = synthSnapshot(project);

    // Core files that must be present
    expect(snapshot[".gitattributes"]).toBeDefined();
    expect(snapshot[".gitignore"]).toBeDefined();
    expect(snapshot[".projen/files.json"]).toBeDefined();
    expect(snapshot[".projen/tasks.json"]).toBeDefined();

    // Snapshot the full output for regression detection
    expect(Object.keys(snapshot).sort()).toMatchSnapshot();
    expect(snapshot[".gitattributes"]).toMatchSnapshot();
    expect(snapshot[".gitignore"]).toMatchSnapshot();
  });

  test("GitHubProject auto-creates a Repository", () => {
    const project = new TestProject();

    expect(Repository.isRepository(project.node.root)).toBe(true);
    expect(project.repo).toBeDefined();
    expect(Repository.of(project)).toBe(project.node.root);
  });

  test("GitHubProject.github is defined for root projects", () => {
    const project = new TestProject();
    expect(project.github).toBeDefined();
  });

  test("GitHubProject.github is undefined for subprojects", () => {
    const root = new TestProject();
    const sub = new GitHubProject({
      parent: root,
      outdir: "sub",
      name: "sub-project",
    });
    expect(sub.github).toBeUndefined();
  });

  test("subproject has its own .gitignore", () => {
    const root = new TestProject();
    new Project({
      parent: root,
      outdir: "sub",
      name: "sub-project",
    });

    const snapshot = synthSnapshot(root);
    expect(snapshot["sub/.gitignore"]).toBeDefined();
  });

  test("project.repo returns the Repository", () => {
    const project = new TestProject();
    const repo = project.repo;
    expect(repo).toBeDefined();
    expect(Repository.isRepository(repo)).toBe(true);
  });

  test("Repository.of works from subproject", () => {
    const root = new TestProject();
    const sub = new Project({
      parent: root,
      outdir: "sub",
      name: "sub-project",
    });

    const repo = Repository.of(sub);
    expect(repo).toBe(Repository.of(root));
  });

  test("project.gitignore works on root project", () => {
    const project = new TestProject();
    project.addGitIgnore("*.log");

    const snapshot = synthSnapshot(project);
    expect(snapshot[".gitignore"]).toContain("*.log");
  });

  test("project.gitattributes works on root project", () => {
    const project = new TestProject();
    project.annotateGenerated("/dist/**");

    const snapshot = synthSnapshot(project);
    expect(snapshot[".gitattributes"]).toContain("/dist/**");
  });

  test("github: false disables github integration", () => {
    const project = new TestProject({ github: false });
    expect(project.github).toBeUndefined();
  });

  test("gitignore patterns from options work", () => {
    const project = new TestProject({
      gitIgnoreOptions: {
        ignorePatterns: [".jsii", "foo/"],
      },
    });

    const snapshot = synthSnapshot(project);
    expect(snapshot[".gitignore"]).toContain(".jsii");
    expect(snapshot[".gitignore"]).toContain("foo/");
  });
});
