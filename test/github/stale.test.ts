import { StaleBehavior } from "../../src/github";
import { renderBehavior } from "../../src/github/stale-util";
import { synthSnapshot, TestProject } from "../util";

const defaults = { stale: 10, close: 11, type: "issue" };

test("default project behavior", () => {
  const project = new TestProject();
  expect(
    synthSnapshot(project)[".github/workflows/stale.yml"]
  ).toMatchSnapshot();
});

test("stale disabled", () => {
  const project = new TestProject({
    stale: false,
  });

  expect(synthSnapshot(project)[".github/workflows/stale.yml"]).toBeUndefined();
});

test("customizations", () => {
  const project = new TestProject({
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
    synthSnapshot(project)[".github/workflows/stale.yml"]
  ).toMatchSnapshot();
});

test("with custom runner", () => {
  const project = new TestProject({
    staleOptions: {
      runsOn: ["self-hosted"],
    },
  });

  expect(synthSnapshot(project)[".github/workflows/stale.yml"]).toContain(
    "runs-on: self-hosted"
  );
});

describe("renderBehavior()", () => {
  test("defaults", () => {
    expect(
      renderBehavior(undefined, { stale: 10, close: 11, type: "issue" })
    ).toStrictEqual({
      closeMessage:
        "Closing this issue as it hasn't seen activity for a while. Please add a comment @mentioning a maintainer to reopen.",
      daysBeforeClose: 11,
      daysBeforeStale: 10,
      staleLabel: "stale",
      staleMessage:
        "This issue is now marked as stale because it hasn't seen activity for a while. Add a comment or it will be closed soon.",
    });

    expect(
      renderBehavior(undefined, { stale: 99, close: 65, type: "xomo" })
    ).toStrictEqual({
      closeMessage:
        "Closing this xomo as it hasn't seen activity for a while. Please add a comment @mentioning a maintainer to reopen.",
      daysBeforeClose: 65,
      daysBeforeStale: 99,
      staleLabel: "stale",
      staleMessage:
        "This xomo is now marked as stale because it hasn't seen activity for a while. Add a comment or it will be closed soon.",
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
    };

    expect(renderBehavior(behavior, defaults)).toStrictEqual({
      closeMessage: "I am the close message",
      daysBeforeClose: 1,
      daysBeforeStale: 2,
      staleLabel: "my-label",
      staleMessage: "I am stale",
    });
  });
});
