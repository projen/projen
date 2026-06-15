import { synthSnapshot, TestProject } from "./util";
import { Project } from "../src";
import { GitRepository } from "../src/git-repository";
import { Repository } from "../src/repository";

describe("GitRepository", () => {
  test("creates .gitignore and .gitattributes on root project", () => {
    const project = new TestProject();
    const repo = Repository.of(project);

    // The repo should be a GitRepository (actually GitHubRepository)
    expect(repo).toBeInstanceOf(GitRepository);

    const gitRepo = repo as GitRepository;
    expect(gitRepo.gitignore).toBeDefined();
    expect(gitRepo.gitattributes).toBeDefined();
  });

  test("root .gitignore is accessible via project.gitignore", () => {
    const project = new TestProject();
    const repo = Repository.of(project) as GitRepository;

    // The project's gitignore should be the same as the repo's
    expect(project.gitignore).toBe(repo.gitignore);
  });

  test("root .gitattributes is accessible via project.gitattributes", () => {
    const project = new TestProject();
    const repo = Repository.of(project) as GitRepository;

    expect(project.gitattributes).toBe(repo.gitattributes);
  });

  test("subprojects have their own .gitignore", () => {
    const root = new TestProject();
    const sub = new Project({
      parent: root,
      outdir: "sub",
      name: "sub-project",
    });

    // Subproject has its own gitignore, different from root
    expect(sub.gitignore).toBeDefined();
    expect(sub.gitignore).not.toBe(root.gitignore);
  });

  test("annotateGenerated adds linguist-generated attribute", () => {
    const project = new TestProject();
    const repo = Repository.of(project) as GitRepository;

    repo.annotateGenerated("/dist/**");

    const snapshot = synthSnapshot(project);
    expect(snapshot[".gitattributes"]).toContain("/dist/**");
    expect(snapshot[".gitattributes"]).toContain("linguist-generated");
  });

  test("gitignore patterns from options are applied", () => {
    const project = new TestProject({
      gitIgnoreOptions: {
        ignorePatterns: ["build/", "coverage/"],
      },
    });

    const snapshot = synthSnapshot(project);
    expect(snapshot[".gitignore"]).toContain("build/");
    expect(snapshot[".gitignore"]).toContain("coverage/");
  });

  test("LFS patterns are applied to .gitattributes", () => {
    const project = new TestProject({
      gitOptions: {
        lfsPatterns: ["*.bin", "*.zip"],
      },
    });

    const snapshot = synthSnapshot(project);
    expect(snapshot[".gitattributes"]).toContain("*.bin");
    expect(snapshot[".gitattributes"]).toContain("filter=lfs");
  });
});
