import * as yaml from "yaml";
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

  const workflow = snapshot[".github/workflows/pull-request-lint.yml"];
  expect(workflow).toMatchSnapshot();
  expect(workflow).toContain("Validate PR title");
  expect(workflow).not.toContain("Require Contributor Statement");
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

describe("contributor statement", () => {
  test("validates pull requests", () => {
    // GIVEN
    const project = createProject();

    // WHEN
    new PullRequestLint(project.github!, {
      contributorStatement: "Lorem ipsum dolor sit amet",
    });

    // THEN
    const snapshot = synthSnapshot(project);
    expect(
      snapshot[".github/workflows/pull-request-lint.yml"]
    ).toMatchSnapshot();
  });

  test("creates pull request template", () => {
    // GIVEN
    const project = createProject({
      pullRequestTemplate: false,
    });
    const contributorStatement = "Lorem ipsum dolor sit amet";

    // WHEN
    new PullRequestLint(project.github!, {
      contributorStatement,
    });

    // THEN
    const snapshot = synthSnapshot(project);
    expect(snapshot[".github/pull_request_template.md"]).toMatchSnapshot();
    expect(snapshot[".github/pull_request_template.md"]).toContain(
      contributorStatement
    );
  });

  test("appends to an existing request template", () => {
    // GIVEN
    const project = createProject({
      pullRequestTemplate: true,
      pullRequestTemplateContents: ["Foobar #"],
    });
    const contributorStatement = "Lorem ipsum dolor sit amet";

    // WHEN
    new PullRequestLint(project.github!, {
      contributorStatement,
    });

    // THEN
    const snapshot = synthSnapshot(project);
    expect(snapshot[".github/pull_request_template.md"]).toMatchSnapshot();
    expect(snapshot[".github/pull_request_template.md"]).toContain("Foobar #");
    expect(snapshot[".github/pull_request_template.md"]).toContain(
      contributorStatement
    );
  });

  test("can exempt users and labels", () => {
    // GIVEN
    const project = createProject();
    const contributorStatement = "Lorem ipsum dolor sit amet";

    // WHEN
    new PullRequestLint(project.github!, {
      contributorStatement,
      contributorStatementOptions: {
        exemptLabels: ["automation"],
        exemptUsers: ["github-bot[bot]"],
      },
    });

    // THEN
    const snapshot = synthSnapshot(project);
    expect(
      snapshot[".github/workflows/pull-request-lint.yml"]
    ).toMatchSnapshot();
    expect(snapshot[".github/workflows/pull-request-lint.yml"]).toContain(
      "github.event.pull_request.user.login == 'github-bot[bot]'"
    );
    expect(snapshot[".github/workflows/pull-request-lint.yml"]).toContain(
      "contains(github.event.pull_request.labels.*.name, 'automation')"
    );
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

test("with custom runner group", () => {
  // GIVEN
  const project = createProject();

  // WHEN
  new PullRequestLint(project.github!, {
    runsOnGroup: {
      group: "Default",
      labels: ["self-hosted", "x64", "linux"],
    },
  });

  // THEN
  const snapshot = synthSnapshot(project);
  const build = yaml.parse(snapshot[".github/workflows/pull-request-lint.yml"]);

  expect(build).toHaveProperty("jobs.validate.runs-on.group", "Default");
  expect(build).toHaveProperty("jobs.validate.runs-on.labels", [
    "self-hosted",
    "x64",
    "linux",
  ]);
});

test("with github base url", () => {
  // GIVEN
  const project = createProject();

  // WHEN
  new PullRequestLint(project.github!, {});

  // THEN
  const snapshot = synthSnapshot(project);
  expect(snapshot[".github/workflows/pull-request-lint.yml"]).toContain(
    "githubBaseUrl: ${{ github.api_url }}"
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
