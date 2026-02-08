import { GitHubActionsProvider } from "../../src/github/actions-provider";

const action = "action/name";
const replacement = "replacement-action@explicit";
const any = undefined;

function actionFor(version: string | undefined): string {
  if (typeof version !== "string") {
    return action;
  }

  return `${action}@${version}`;
}

describe("override github action", () => {
  describe.each([
    [
      actionFor(any),
      [any, "v1", "v1.2", "v1.2.3", "main"].map(actionFor),
      [].map(actionFor),
    ],
    [
      actionFor("v1"),
      ["v1"].map(actionFor),
      [any, "v1.2", "v1.2.3", "main"].map(actionFor),
    ],
    [
      actionFor("v1.2"),
      ["v1.2"].map(actionFor),
      [any, "v1", "v1.2.3", "main"].map(actionFor),
    ],
    [
      actionFor("v1.2.3"),
      ["v1.2.3"].map(actionFor),
      [any, "v1", "v1.2", "main"].map(actionFor),
    ],
    [
      actionFor("main"),
      ["main"].map(actionFor),
      [any, "v1", "v1.2", "v1.2.3"].map(actionFor),
    ],
  ])(
    `%s with ${replacement}`,
    (specifiedOverride, shouldReplace, shouldBeUnchanged) => {
      const actions = new GitHubActionsProvider();
      actions.set(specifiedOverride, replacement);

      describe("should be replaced for", () => {
        test.each(shouldReplace)("uses=%s", (uses) => {
          expect(actions.get(uses)).toBe(replacement);
        });
      });

      if (shouldBeUnchanged.length) {
        describe("should be unchanged for", () => {
          test.each(shouldBeUnchanged)("uses=%s", (uses) => {
            expect(actions.get(uses)).toBe(uses);
          });
        });
      }
    },
  );
});

describe("version-specific override is preferred over general override", () => {
  const actions = new GitHubActionsProvider();
  const v1 = `${action}@v1`;
  const v1WithHash = `${action}@ffffff`;
  actions.set(v1, v1WithHash);
  actions.set(action, replacement);

  test(`uses=${v1} is replaced with uses=${v1WithHash}`, () => {
    expect(actions.get(v1)).toBe(v1WithHash);
  });

  describe("should be unchanged for", () => {
    test.each([any, "v1.1", "v2", "main"].map(actionFor))("uses=%s", (uses) => {
      expect(actions.get(uses)).toBe(replacement);
    });
  });
});
