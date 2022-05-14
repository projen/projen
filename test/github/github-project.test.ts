import { Testing } from "../../src";
import { GitHubProject } from "../../src/github";

test("autoApprove is configured", () => {
  // WHEN
  const p = new GitHubProject({
    name: "my-project",
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
  const p = new GitHubProject({
    name: "my-project",
    github: false,
  });

  // THEN
  expect(p.github).toBeUndefined();
});

describe("dev environment enable/disable", () => {
  const GITPOD_FILE = ".gitpod.yml";
  const DEVCONTAINER_FILE = ".devcontainer.json";

  test("no gitpod/devcontainer files if gitpod and devContainer are false", () => {
    // GIVEN
    const project = new GitHubProject({
      name: "my-project",
      gitpod: false,
      devContainer: false,
    });

    // THEN
    const outdir = Testing.synth(project);
    expect(outdir[GITPOD_FILE]).toBeUndefined();
    expect(outdir[DEVCONTAINER_FILE]).toBeUndefined();
  });

  test("no gitpod/devcontainer files if they are empty", () => {
    // WHEN
    const project = new GitHubProject({
      name: "my-project",
      gitpod: true,
      devContainer: true,
    });

    // THEN
    const outdir = Testing.synth(project);
    expect(outdir[GITPOD_FILE]).toBeUndefined();
    expect(outdir[DEVCONTAINER_FILE]).toBeUndefined();
  });

  test("gitpod/devocontainer files are generated if options are added", () => {
    // GIVEN
    const project = new GitHubProject({
      name: "my-project",
      gitpod: true,
      devContainer: true,
    });

    // WHEN
    project.gitpod?.addDockerImage({ image: "foo" });
    project.devContainer?.addPorts("1234");

    // THEN
    const outdir = Testing.synth(project);
    expect(outdir[GITPOD_FILE]).toBeDefined();
    expect(outdir[DEVCONTAINER_FILE]).toBeDefined();
  });
});
