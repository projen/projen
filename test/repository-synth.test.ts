import { synthSnapshot, TestProject } from "./util";
import { Project } from "../src";
import { Repository } from "../src/repository";

describe("Repository synthesis", () => {
  test("Repository.synth() produces output", () => {
    const project = new TestProject();
    const snapshot = synthSnapshot(project);

    // Should have standard files
    expect(snapshot[".gitattributes"]).toBeDefined();
    expect(snapshot[".gitignore"]).toBeDefined();
    expect(snapshot[".projen/files.json"]).toBeDefined();
    expect(snapshot[".projen/tasks.json"]).toBeDefined();
  });

  test("project.synth() produces correct output with repository", () => {
    const project = new TestProject();

    // Verify the repository exists in the tree
    const repo = Repository.of(project);
    expect(repo).toBeDefined();

    // synth via project — output is correct
    const snapshot = synthSnapshot(project);
    expect(snapshot[".gitattributes"]).toBeDefined();
    expect(snapshot[".gitignore"]).toBeDefined();
  });

  test("synthesis includes subproject files", () => {
    const root = new TestProject();
    new Project({
      parent: root,
      outdir: "sub",
      name: "sub-project",
    });

    const snapshot = synthSnapshot(root);
    expect(snapshot["sub/.gitignore"]).toBeDefined();
    expect(snapshot["sub/.gitattributes"]).toBeDefined();
    expect(snapshot["sub/.projen/tasks.json"]).toBeDefined();
  });

  test("Repository.synth() calls lifecycle hooks", () => {
    const project = new TestProject();
    const repo = Repository.of(project);

    const calls: string[] = [];
    const origPre = repo.preSynthesize.bind(repo);
    const origPost = repo.postSynthesize.bind(repo);

    repo.preSynthesize = () => {
      calls.push("pre");
      origPre();
    };
    repo.postSynthesize = () => {
      calls.push("post");
      origPost();
    };

    // Call repo.synth() directly
    repo.synth();

    expect(calls).toContain("pre");
    expect(calls).toContain("post");
    expect(calls.indexOf("pre")).toBeLessThan(calls.indexOf("post"));
  });
});
