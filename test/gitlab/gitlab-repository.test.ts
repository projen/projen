import { GitLabRepository } from "../../src/gitlab/gitlab-repository";
import { Repository } from "../../src/repository";
import { TestProject } from "../util";

describe("GitLabRepository", () => {
  test("can be created explicitly", () => {
    const repo = new GitLabRepository({
      name: "my-gitlab-repo",
    });

    expect(repo).toBeInstanceOf(GitLabRepository);
    expect(Repository.isRepository(repo)).toBe(true);
  });

  test("gitlab is undefined before project init", () => {
    const repo = new GitLabRepository({
      name: "my-gitlab-repo",
    });

    expect(repo.gitlab).toBeUndefined();
  });

  test("initializes GitlabConfiguration via _initGitLab", () => {
    const repo = new GitLabRepository({
      name: "my-gitlab-repo",
    });

    // Create a project for the init call (needs a real project for Component)
    const project = new TestProject();
    repo._initGitLab(project);

    expect(repo.gitlab).toBeDefined();
  });
});
