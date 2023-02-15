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
    }
  );
});
