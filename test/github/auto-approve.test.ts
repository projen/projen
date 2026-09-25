import * as YAML from "yaml";
import { AutoApprove } from "../../src/github/auto-approve";
import { GithubCredentials } from "../../src/github/github-credentials";
import { PullRequestSource } from "../../src/github/pull-request-source";
import type { NodeProjectOptions } from "../../src/javascript";
import { NodeProject } from "../../src/javascript";
import { synthSnapshot } from "../util";

describe("auto-approve", () => {
  test("default", () => {
    const project = createProject();

    new AutoApprove(project.github!);

    const snapshot = synthSnapshot(project);

    expect(snapshot[".github/workflows/auto-approve.yml"]).toBeDefined();
    expect(snapshot[".github/workflows/auto-approve.yml"]).toMatchSnapshot();
  });

  test("configure options", () => {
    const project = createProject();

    new AutoApprove(project.github!, {
      secret: "MY_SECRET",
      label: "my-approve",
      allowedUsernames: ["bot-1", "bot-2"],
    });

    const snapshot = synthSnapshot(project);

    expect(snapshot[".github/workflows/auto-approve.yml"]).toMatchSnapshot();
  });

  test("all users", () => {
    const project = createProject();

    new AutoApprove(project.github!, {
      secret: "MY_SECRET",
      allowedUsernames: [],
    });

    const snapshot = synthSnapshot(project);

    expect(snapshot[".github/workflows/auto-approve.yml"]).toMatchSnapshot();
  });

  test("with PAT credentials in an environment", () => {
    const project = createProject();

    new AutoApprove(project.github!, {
      credentials: GithubCredentials.fromPersonalAccessToken({
        secret: "APPROVER_TOKEN",
        environment: "approver",
      }),
    });

    const workflow = YAML.parse(
      synthSnapshot(project)[".github/workflows/auto-approve.yml"],
    );

    expect(workflow).toHaveProperty("jobs.approve.environment", "approver");
    expect(workflow.jobs.approve.steps).toHaveLength(1);
    expect(workflow.jobs.approve.steps[0].env.GH_TOKEN).toBe(
      "${{ secrets.APPROVER_TOKEN }}",
    );
  });

  test("with GitHub App credentials", () => {
    const project = createProject();

    new AutoApprove(project.github!, {
      credentials: GithubCredentials.fromApp({ environment: "approver" }),
    });

    const workflow = YAML.parse(
      synthSnapshot(project)[".github/workflows/auto-approve.yml"],
    );
    const steps = workflow.jobs.approve.steps;

    expect(workflow).toHaveProperty("jobs.approve.environment", "approver");
    expect(steps[0].id).toBe("generate_token");
    expect(steps[1].env.GH_TOKEN).toBe(
      "${{ steps.generate_token.outputs.token }}",
    );
  });

  test("throws when both credentials and secret are set", () => {
    const project = createProject();

    expect(
      () =>
        new AutoApprove(project.github!, {
          credentials: GithubCredentials.fromPersonalAccessToken(),
          secret: "MY_SECRET",
        }),
    ).toThrow(
      "Only one of 'credentials' or 'secret' may be specified, not both. Remove the deprecated 'secret'.",
    );
  });

  test("sources: branch source renders all conditions", () => {
    const project = createProject();

    new AutoApprove(project.github!, {
      sources: [
        PullRequestSource.fromBranch({
          branch: "github-actions/upgrade-main",
          targetBranches: ["main"],
          authors: ["projen-bot"],
        }),
      ],
    });

    expect(approveCondition(project)).toBe(
      "contains(github.event.pull_request.labels.*.name, 'auto-approve') && (" +
        "github.event.pull_request.head.repo.full_name == github.repository && " +
        "github.event.pull_request.head.ref == 'github-actions/upgrade-main' && " +
        "(github.event.pull_request.base.ref == 'main') && " +
        "(github.event.pull_request.user.login == 'projen-bot'))",
    );
  });

  test("sources: branch prefix without optional filters", () => {
    const project = createProject();

    new AutoApprove(project.github!, {
      sources: [PullRequestSource.fromBranch({ branchPrefix: "renovate/" })],
    });

    expect(approveCondition(project)).toBe(
      "contains(github.event.pull_request.labels.*.name, 'auto-approve') && (" +
        "github.event.pull_request.head.repo.full_name == github.repository && " +
        "startsWith(github.event.pull_request.head.ref, 'renovate/'))",
    );
  });

  test("sources: multiple sources and addSource() are combined", () => {
    const project = createProject();

    const autoApprove = new AutoApprove(project.github!, {
      sources: [PullRequestSource.fromUsers({ logins: ["alice"] })],
    });
    autoApprove.addSource(
      PullRequestSource.fromBranch({
        branchPrefix: "dependabot/",
        authors: ["dependabot[bot]"],
      }),
    );

    expect(approveCondition(project)).toBe(
      "contains(github.event.pull_request.labels.*.name, 'auto-approve') && (" +
        "(github.event.pull_request.user.login == 'alice') || " +
        "(github.event.pull_request.head.repo.full_name == github.repository && " +
        "startsWith(github.event.pull_request.head.ref, 'dependabot/') && " +
        "(github.event.pull_request.user.login == 'dependabot[bot]')))",
    );
  });

  test("sources: addSource() replaces the default source", () => {
    const project = createProject();

    const autoApprove = new AutoApprove(project.github!);
    autoApprove.addSource(PullRequestSource.fromUsers({ logins: ["alice"] }));

    expect(approveCondition(project)).toBe(
      "contains(github.event.pull_request.labels.*.name, 'auto-approve') && " +
        "(github.event.pull_request.user.login == 'alice')",
    );
  });

  test("sources: default is the same as the previous default", () => {
    const withDefault = createProject();
    new AutoApprove(withDefault.github!);

    const withSource = createProject();
    new AutoApprove(withSource.github!, {
      sources: [
        PullRequestSource.fromUsers({ logins: ["github-actions[bot]"] }),
      ],
    });

    expect(approveCondition(withSource)).toBe(approveCondition(withDefault));
  });

  test("sources: quotes in values are escaped", () => {
    const project = createProject();

    new AutoApprove(project.github!, {
      label: "it's-fine",
      sources: [PullRequestSource.fromBranch({ branch: "a'b" })],
    });

    const condition = approveCondition(project);
    expect(condition).toContain("'it''s-fine'");
    expect(condition).toContain("== 'a''b'");
  });

  test("sources: empty sources throws at synth", () => {
    const project = createProject();

    new AutoApprove(project.github!, { sources: [] });

    expect(() => synthSnapshot(project)).toThrow(
      "AutoApprove has no sources, so no pull request would ever be approved.",
    );
  });

  test("sources: throws when combined with allowedUsernames", () => {
    const project = createProject();

    expect(
      () =>
        new AutoApprove(project.github!, {
          sources: [PullRequestSource.fromUsers({ logins: ["alice"] })],
          allowedUsernames: ["bob"],
        }),
    ).toThrow(
      "Only one of 'sources' or 'allowedUsernames' may be specified, not both. Remove the deprecated 'allowedUsernames'.",
    );
  });

  test("sources: addSource() throws with allowedUsernames", () => {
    const project = createProject();

    const autoApprove = new AutoApprove(project.github!, {
      allowedUsernames: ["bob"],
    });

    expect(() =>
      autoApprove.addSource(PullRequestSource.fromUsers({ logins: ["alice"] })),
    ).toThrow(
      "Cannot add sources while the deprecated 'allowedUsernames' is used.",
    );
  });

  test.each([
    [
      { branch: "a", branchPrefix: "b/" },
      "Only one of 'branch' or 'branchPrefix' may be specified, not both.",
    ],
    [{}, "requires either 'branch' or 'branchPrefix'"],
    [
      { branch: "a", targetBranches: [] },
      "'targetBranches' must not be empty. Omit 'targetBranches' to allow any target branch.",
    ],
    [
      { branch: "a", authors: [] },
      "'authors' must not be empty. Omit 'authors' to allow any author.",
    ],
  ])("fromBranch() validates options %j", (options, message) => {
    expect(() => PullRequestSource.fromBranch(options)).toThrow(message);
  });

  test("fromUsers() requires logins", () => {
    expect(() => PullRequestSource.fromUsers({ logins: [] })).toThrow(
      "PullRequestSource.fromUsers() requires at least one GitHub username in 'logins'.",
    );
  });

  test("with custom runner", () => {
    const project = createProject();

    new AutoApprove(project.github!, {
      secret: "MY_SECRET",
      runsOn: ["self-hosted"],
    });

    const snapshot = synthSnapshot(project);

    expect(snapshot[".github/workflows/auto-approve.yml"]).toContain(
      "runs-on: self-hosted",
    );
  });

  test("with custom runner group", () => {
    const project = createProject();

    new AutoApprove(project.github!, {
      secret: "MY_SECRET",
      runsOnGroup: {
        group: "Default",
        labels: ["self-hosted", "x64", "linux"],
      },
    });

    const snapshot = synthSnapshot(project);
    const build = YAML.parse(snapshot[".github/workflows/auto-approve.yml"]);

    expect(build).toHaveProperty("jobs.approve.runs-on.group", "Default");
    expect(build).toHaveProperty("jobs.approve.runs-on.labels", [
      "self-hosted",
      "x64",
      "linux",
    ]);
  });
});

function approveCondition(project: NodeProject): string {
  const workflow = YAML.parse(
    synthSnapshot(project)[".github/workflows/auto-approve.yml"],
  );
  return workflow.jobs.approve.if;
}

type ProjectOptions = Omit<
  NodeProjectOptions,
  "outdir" | "defaultReleaseBranch" | "name"
>;
function createProject(options: ProjectOptions = {}): NodeProject {
  return new NodeProject({
    defaultReleaseBranch: "main",
    name: "node-project",
    ...options,
  });
}
