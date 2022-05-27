import { Testing } from "../../src";
import { PullRequestLint } from "../../src/github/pull-request-lint";
import { NodeProject, NodeProjectOptions } from "../../src/javascript";

test("default", () => {
  // GIVEN
  const project = createProject();

  // WHEN
  new PullRequestLint(project.github!);

  // THEN
  const snapshot = Testing.synth(project);
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
    const snapshot = Testing.synth(project);
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
    const snapshot = Testing.synth(project);
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
  const snapshot = Testing.synth(project);
  expect(snapshot[".github/workflows/pull-request-lint.yml"]).toContain(
    "runs-on: self-hosted"
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
