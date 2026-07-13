import { WorkflowActions } from "../../src/github/workflow-actions";

function createPullRequestWith(
  options: Partial<
    Parameters<typeof WorkflowActions.createPullRequest>[0]
  > = {},
) {
  const steps = WorkflowActions.createPullRequest({
    workflowName: "test-workflow",
    pullRequestTitle: "Test pull request",
    pullRequestDescription: "Test pull request description",
    ...options,
  });

  return steps[0].with;
}

describe("WorkflowActions.createPullRequest", () => {
  test("does not include add-paths or delete-branch by default", () => {
    const withOptions = createPullRequestWith();

    expect(withOptions?.["add-paths"]).toBeUndefined();
    expect(withOptions?.["delete-branch"]).toBeUndefined();
  });

  test("maps addPaths to newline-separated add-paths", () => {
    const withOptions = createPullRequestWith({
      addPaths: ["src/", "lib/"],
    });

    expect(withOptions?.["add-paths"]).toBe("src/\nlib/");
  });

  test("maps deleteBranch true to delete-branch", () => {
    const withOptions = createPullRequestWith({
      deleteBranch: true,
    });

    expect(withOptions?.["delete-branch"]).toBe(true);
  });

  test("preserves explicit deleteBranch false", () => {
    const withOptions = createPullRequestWith({
      deleteBranch: false,
    });

    expect(withOptions?.["delete-branch"]).toBe(false);
  });
});
