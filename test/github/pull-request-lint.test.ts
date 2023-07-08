import { PullRequestLint } from "../../src/github/pull-request-lint";
import { NodeProject, NodeProjectOptions } from "../../src/javascript";
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

test("with github base url", () => {
  // GIVEN
  const project = createProject();

  // WHEN
  new PullRequestLint(project.github!, {
    githubBaseUrl: "https://github.myorg.com/api/v3",
  });

  // THEN
  const snapshot = synthSnapshot(project);
  expect(snapshot[".github/workflows/pull-request-lint.yml"]).toContain(
    "githubBaseUrl: https://github.myorg.com/api/v3"
  );
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
    ...options,
  });
}
