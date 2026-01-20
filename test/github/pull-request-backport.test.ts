// import * as yaml from "yaml";
import { GithubCredentials, PullRequestBackport } from "../../src/github";
import { NodeProject, NodeProjectOptions } from "../../src/javascript";
import { synthSnapshot } from "../util";

test("default", () => {
  // GIVEN
  const project = createProject();

  // WHEN
  new PullRequestBackport(project);

  // THEN
  const snapshot = synthSnapshot(project);

  const workflow = snapshot[".github/workflows/backport.yml"];
  expect(workflow).toBeDefined();
  expect(workflow).toMatchSnapshot("workflow");
  expect(workflow).toContain("Backport PR");
  expect(workflow).toContain("auto_backport_label_prefix: backport-to-");

  const settings = snapshot[".backportrc.json"];
  expect(settings).toMatchSnapshot("settings");
  expect(settings.backportBranchName).toMatch("backport/");
  expect(settings.commitConflicts).toBe(true);
  expect(settings.targetPRLabels).toEqual(["backport", "auto-approve"]);
  expect(settings.targetBranchChoices).toEqual(["main"]);
});

test("non-default settings", () => {
  // GIVEN
  const project = createProject();

  // WHEN
  new PullRequestBackport(project, {
    workflowName: "other-backport",
    createWithConflicts: false,
    backportPRLabels: ["magic"],
    backportBranchNamePrefix: "auto-backport/",
    autoApproveBackport: false,
    branches: ["one", "two"],
    labelPrefix: "copy-to-",
  });

  // THEN
  const snapshot = synthSnapshot(project);

  const workflow = snapshot[".github/workflows/other-backport.yml"];
  expect(workflow).toBeDefined();
  expect(workflow).toMatchSnapshot("workflow");
  expect(workflow).toContain("auto_backport_label_prefix: copy-to-");

  const settings = snapshot[".backportrc.json"];
  expect(settings).toMatchSnapshot("settings");
  expect(settings.commitConflicts).toBe(false);
  expect(settings.backportBranchName).toMatch("auto-backport/");
  expect(settings.targetPRLabels).toEqual(["magic"]);
  expect(settings.targetBranchChoices).toEqual(["one", "two"]);
});

test("all release branches are automatically added", () => {
  // GIVEN
  const project = createProject({
    majorVersion: 3,
    releaseBranches: {
      v1: {
        majorVersion: 1,
      },
      v2: {
        majorVersion: 2,
      },
    },
  });

  // WHEN
  new PullRequestBackport(project);

  // THEN
  const snapshot = synthSnapshot(project);
  const settings = snapshot[".backportrc.json"];
  expect(settings.targetBranchChoices).toEqual(["main", "v1", "v2"]);
});

describe("no labels on backport PRs", () => {
  it("uses the backport branch name to detect backport PRs", () => {
    // GIVEN
    const project = createProject();

    // WHEN
    new PullRequestBackport(project, {
      backportPRLabels: [],
    });

    // THEN
    const snapshot = synthSnapshot(project);
    const workflow = snapshot[".github/workflows/backport.yml"];
    expect(workflow).toBeDefined();
    expect(workflow).toMatchSnapshot("workflow");
    expect(workflow).toContain("!startsWith(github.head_ref, 'backport/')");
  });
});

test("can be added via githubOptions", () => {
  // GIVEN
  const project = createProject({
    githubOptions: {
      pullRequestBackport: true,
      pullRequestBackportOptions: {
        backportPRLabels: ["magic"],
      },
    },
  });
  // THEN
  const snapshot = synthSnapshot(project);

  const workflow = snapshot[".github/workflows/backport.yml"];
  expect(workflow).toBeDefined();
  expect(workflow).toContain("Backport PR");

  const settings = snapshot[".backportrc.json"];
  expect(settings.targetPRLabels).toEqual(["magic"]);
});

test("uses environment from projenCredentials", () => {
  // GIVEN
  const project = createProject({
    githubOptions: {
      projenCredentials: GithubCredentials.fromPersonalAccessToken({
        environment: "backport-env",
      }),
      pullRequestBackport: true,
    },
  });

  // THEN
  const snapshot = synthSnapshot(project);
  const workflow = snapshot[".github/workflows/backport.yml"];
  expect(workflow).toContain("environment: backport-env");
});

type ProjectOptions = Omit<
  NodeProjectOptions,
  "outdir" | "defaultReleaseBranch" | "name"
>;
function createProject(options: ProjectOptions = {}): NodeProject {
  return new NodeProject({
    defaultReleaseBranch: "main",
    name: "node-project",
    githubOptions: {
      pullRequestLintOptions: {
        semanticTitle: false,
      },
    },
    autoApproveOptions: {},
    ...options,
  });
}
