import { Project } from "../../src";
import { GitHub } from "../../src/github/github";
import { GitHubRepository } from "../../src/github/github-repository";
import { Repository } from "../../src/repository";
import { TestProject } from "../util";

describe("GitHubRepository", () => {
  test("auto-created repository is a GitHubRepository", () => {
    const project = new TestProject();
    const repo = Repository.of(project);

    expect(repo).toBeInstanceOf(GitHubRepository);
  });

  test("creates a GitHub component", () => {
    const project = new TestProject();
    expect(project.github).toBeDefined();
    expect(project.github).toBeInstanceOf(GitHub);
  });

  test("workflows can be added via repo.github", () => {
    const project = new TestProject();
    const repo = Repository.of(project) as GitHubRepository;

    expect(repo.github).toBeDefined();
    const workflow = repo.github!.addWorkflow("test-workflow");
    workflow.on({ push: { branches: ["main"] } });

    expect(repo.github!.tryFindWorkflow("test-workflow")).toBeDefined();
  });

  test("subproject can access Repository and add workflows", () => {
    const root = new TestProject();
    const sub = new Project({
      parent: root,
      outdir: "sub",
      name: "sub-project",
    });

    // Subproject finds the same repo as root
    const repo = Repository.of(sub);
    expect(repo).toBeInstanceOf(GitHubRepository);
    expect(repo).toBe(Repository.of(root));

    // Can add workflows from subproject context
    const ghRepo = repo as GitHubRepository;
    const workflow = ghRepo.github!.addWorkflow("deploy-sub");
    expect(workflow).toBeDefined();
    expect(ghRepo.github!.tryFindWorkflow("deploy-sub")).toBeDefined();
  });

  test("github: false disables GitHub component", () => {
    const project = new TestProject({ github: false });
    const repo = Repository.of(project) as GitHubRepository;

    expect(repo.github).toBeUndefined();
    expect(project.github).toBeUndefined();
  });

  test("auto-creation sets correct name", () => {
    const project = new TestProject();
    const repo = Repository.of(project);

    expect(repo.name).toBe("my-project");
  });

  test("Repository.projects includes all projects", () => {
    const root = new TestProject();
    const sub = new Project({
      parent: root,
      outdir: "sub",
      name: "sub-project",
    });
    const repo = Repository.of(root) as GitHubRepository;

    expect(repo.projects).toContain(root);
    expect(repo.projects).toContain(sub);
    expect(repo.projects.length).toBe(2);
  });
});
