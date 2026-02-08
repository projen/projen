import { NodeProject, NodeProjectOptions } from "../../src/javascript";
import { synthSnapshot } from "../util";

describe("mergify", () => {
  test("default", () => {
    // GIVEN
    const project = createProject();

    // WHEN
    // THEN
    const snapshot = synthSnapshot(project);
    expect(snapshot[".mergify.yml"]).toBeDefined();
    expect(snapshot[".mergify.yml"]).toMatchSnapshot();
  });

  test("with automerge options", () => {
    // GIVEN
    const project = createProject({
      autoMerge: true,
      autoMergeOptions: {
        approvedReviews: 3,
        blockingLabels: ["do-not-merge", "missing-tests"],
      },
    });

    // THEN
    const snapshot = synthSnapshot(project);
    expect(snapshot[".mergify.yml"]).toBeDefined();
    expect(snapshot[".mergify.yml"]).toContain(
      "- -label~=(do-not-merge|missing-tests)",
    );
    expect(snapshot[".mergify.yml"]).toContain('- "#approved-reviews-by>=3"');
    expect(snapshot[".mergify.yml"]).toMatchSnapshot();
  });

  test("without automerge", () => {
    // GIVEN
    const project = createProject({
      autoMerge: false,
    });

    // THEN
    const snapshot = synthSnapshot(project);
    expect(snapshot[".mergify.yml"]).toBeUndefined();
  });

  test("without automerge, with custom rules", () => {
    // GIVEN
    const project = createProject({
      autoMerge: false,
      mergifyOptions: {
        rules: [
          {
            actions: ["action"],
            conditions: ["condition"],
            name: "rule-name",
          },
        ],
      },
    });

    // THEN
    const snapshot = synthSnapshot(project);
    expect(snapshot[".mergify.yml"]).toBeDefined();
    expect(snapshot[".mergify.yml"]).toMatchSnapshot();
  });
});

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
