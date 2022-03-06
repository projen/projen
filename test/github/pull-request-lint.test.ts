import { GitHubProject, GitHubProjectOptions } from "../../src/github";
import { PullRequestLint } from "../../src/github/pull-request-lint";
import { synthSnapshot } from "../util";

test("default", () => {
  // GIVEN
  const project = createProject();

  // WHEN
  new PullRequestLint(project.github!);

  // THEN
  const snapshot = synthSnapshot(project);
  expect(snapshot[".github/workflows/pull-request-lint.yml"]).toBeDefined();
  expect(snapshot[".github/workflows/pull-request-lint.yml"]).toMatchSnapshot();
});

describe("semantic titles", () => {
  test("configure scopes", () => {
    // GIVEN
    const project = createProject();

    // WHEN
    new PullRequestLint(project.github!, {
      semanticTitle: true,
      semanticTitleOptions: {
        types: ["feat", "fix"],
      },
    });

    // THEN
    const snapshot = synthSnapshot(project);
    expect(
      snapshot[".github/workflows/pull-request-lint.yml"]
    ).toMatchSnapshot();
  });

  test("require scope", () => {
    // GIVEN
    const project = createProject();

    // WHEN
    new PullRequestLint(project.github!, {
      semanticTitle: true,
      semanticTitleOptions: {
        requireScope: true,
      },
    });

    // THEN
    const snapshot = synthSnapshot(project);
    expect(
      snapshot[".github/workflows/pull-request-lint.yml"]
    ).toMatchSnapshot();
  });
});

test("with custom runner", () => {
  // GIVEN
  const project = createProject();

  // WHEN
  new PullRequestLint(project.github!, {
    runsOn: ["self-hosted"],
  });

  // THEN
  const snapshot = synthSnapshot(project);
  expect(snapshot[".github/workflows/pull-request-lint.yml"]).toContain(
    "runs-on: self-hosted"
  );
});

type ProjectOptions = Omit<
  GitHubProjectOptions,
  "outdir" | "defaultReleaseBranch" | "name"
>;
function createProject(options: ProjectOptions = {}): GitHubProject {
  return new GitHubProject({
    name: "node-project",
    githubOptions: {
      pullRequestLint: false,
    },
    ...options,
  });
}
