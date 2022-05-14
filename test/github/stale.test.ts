import * as YAML from "yaml";
import { Testing } from "../../src";
import { GitHubProject, StaleBehavior } from "../../src/github";
import { renderBehavior } from "../../src/github/stale-util";

const defaults = { stale: 10, close: 11, type: "issue" };

test("default project behavior", () => {
  const project = new GitHubProject({ name: "my-project" });
  expect(Testing.synth(project)[".github/workflows/stale.yml"]).toBeUndefined();
});

test("stale enabled", () => {
  const project = new GitHubProject({
    name: "my-project",
    stale: true,
  });

  expect(
    Testing.synth(project)[".github/workflows/stale.yml"]
  ).toMatchSnapshot();
});

test("customizations", () => {
  const project = new GitHubProject({
    name: "my-project",
    stale: true,
    staleOptions: {
      issues: { enabled: false },
      pullRequest: {
        closeMessage: "closing pull request",
        staleLabel: "I-AM-STALE",
        daysBeforeStale: 30,
      },
    },
  });

  expect(
    Testing.synth(project)[".github/workflows/stale.yml"]
  ).toMatchSnapshot();
});

test("with custom runner", () => {
  const project = new GitHubProject({
    name: "my-project",
    stale: true,
    staleOptions: {
      runsOn: ["self-hosted"],
    },
  });

  expect(Testing.synth(project)[".github/workflows/stale.yml"]).toContain(
    "runs-on: self-hosted"
  );
});

describe("renderBehavior()", () => {
  test("defaults", () => {
    expect(
      renderBehavior(undefined, { stale: 10, close: 11, type: "issue" })
    ).toStrictEqual({
      closeMessage:
        'Closing this issue as it hasn\'t seen activity for a while. Please add a comment @mentioning a maintainer to reopen. If you wish to exclude this issue from being marked as stale, add the "backlog" label.',
      daysBeforeClose: 11,
      daysBeforeStale: 10,
      staleLabel: "stale",
      exemptLabels: ["backlog"],
      staleMessage:
        'This issue is now marked as stale because it hasn\'t seen activity for a while. Add a comment or it will be closed soon. If you wish to exclude this issue from being marked as stale, add the "backlog" label.',
    });

    expect(
      renderBehavior(undefined, { stale: 99, close: 65, type: "xomo" })
    ).toStrictEqual({
      closeMessage:
        'Closing this xomo as it hasn\'t seen activity for a while. Please add a comment @mentioning a maintainer to reopen. If you wish to exclude this issue from being marked as stale, add the "backlog" label.',
      daysBeforeClose: 65,
      daysBeforeStale: 99,
      exemptLabels: ["backlog"],
      staleLabel: "stale",
      staleMessage:
        'This xomo is now marked as stale because it hasn\'t seen activity for a while. Add a comment or it will be closed soon. If you wish to exclude this issue from being marked as stale, add the "backlog" label.',
    });
  });

  test("disabled", () => {
    expect(renderBehavior({ enabled: false }, defaults)).toMatchObject({
      daysBeforeClose: -1,
      daysBeforeStale: -1,
    });
  });

  test("customize", () => {
    const behavior: StaleBehavior = {
      closeMessage: "I am the close message",
      daysBeforeClose: 1,
      daysBeforeStale: 2,
      staleLabel: "my-label",
      staleMessage: "I am stale",
      exemptLabels: ["foo", "bar"],
    };

    expect(renderBehavior(behavior, defaults)).toStrictEqual({
      closeMessage: "I am the close message",
      daysBeforeClose: 1,
      daysBeforeStale: 2,
      staleLabel: "my-label",
      staleMessage: "I am stale",
      exemptLabels: ["foo", "bar"],
    });
  });

  test("disable exempt label", () => {
    expect(renderBehavior({ exemptLabels: [] }, defaults)).toStrictEqual({
      closeMessage:
        "Closing this issue as it hasn't seen activity for a while. Please add a comment @mentioning a maintainer to reopen.",
      daysBeforeClose: 11,
      daysBeforeStale: 10,
      staleLabel: "stale",
      exemptLabels: [],
      staleMessage:
        "This issue is now marked as stale because it hasn't seen activity for a while. Add a comment or it will be closed soon.",
    });
  });
});

describe("exempt labels in workflow output", () => {
  const project = new GitHubProject({
    name: "my-project",
    stale: true,
    staleOptions: {
      issues: { exemptLabels: [] },
      pullRequest: { exemptLabels: ["foo", "bar"] },
    },
  });

  const workflow = YAML.parse(
    Testing.synth(project)[".github/workflows/stale.yml"]
  );

  expect(workflow.jobs.stale.steps[0]).toStrictEqual({
    uses: "actions/stale@v4",
    with: {
      "close-issue-message":
        "Closing this issue as it hasn't seen activity for a while. Please add a comment @mentioning a maintainer to reopen.",
      "close-pr-message":
        'Closing this pull request as it hasn\'t seen activity for a while. Please add a comment @mentioning a maintainer to reopen. If you wish to exclude this issue from being marked as stale, add the "foo" label.',
      "days-before-close": -1,
      "days-before-issue-close": 7,
      "days-before-issue-stale": 60,
      "days-before-pr-close": 2,
      "days-before-pr-stale": 14,
      "days-before-stale": -1,
      "exempt-pr-labels": "foo,bar",
      "stale-issue-label": "stale",
      "stale-issue-message":
        "This issue is now marked as stale because it hasn't seen activity for a while. Add a comment or it will be closed soon.",
      "stale-pr-label": "stale",
      "stale-pr-message":
        'This pull request is now marked as stale because it hasn\'t seen activity for a while. Add a comment or it will be closed soon. If you wish to exclude this issue from being marked as stale, add the "foo" label.',
    },
  });
});
