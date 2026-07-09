import type { NodeProjectOptions } from "../../src/javascript";
import { NodeProject } from "../../src/javascript";
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
      githubOptions: {
        mergifyOptions: {
          rules: [
            {
              actions: ["action"],
              conditions: ["condition"],
              name: "rule-name",
            },
          ],
        },
      },
    });

    // THEN
    const snapshot = synthSnapshot(project);
    expect(snapshot[".mergify.yml"]).toBeDefined();
    expect(snapshot[".mergify.yml"]).toMatchSnapshot();
  });

  test("queue accepts neither commit message config option (uses GitHub defaults)", () => {
    const project = createProject({
      autoMerge: false,
      githubOptions: {
        mergifyOptions: {
          queues: [{ name: "default" }],
        },
      },
    });

    const snapshot = synthSnapshot(project);
    expect(snapshot[".mergify.yml"]).toBeDefined();
    expect(snapshot[".mergify.yml"]).not.toContain("commit_message_format");
    expect(snapshot[".mergify.yml"]).not.toContain("commit_message_template");
  });

  test("queue fails when both commit message config options are set", () => {
    expect(() =>
      createProject({
        autoMerge: false,
        githubOptions: {
          mergifyOptions: {
            queues: [
              {
                name: "default",
                commitMessageFormat: {
                  title: "pr-title",
                  body: "pr-body",
                },
                commitMessageTemplate: "{{ title }}",
              },
            ],
          },
        },
      }),
    ).toThrow(
      "Only one of 'commitMessageFormat' or 'commitMessageTemplate' may be specified, not both. Remove the deprecated 'commitMessageTemplate'.",
    );
  });

  test("queue accepts commit message template only", () => {
    const project = createProject({
      autoMerge: false,
      githubOptions: {
        mergifyOptions: {
          queues: [
            {
              name: "default",
              commitMessageTemplate: "{{ title }}\\n\\n{{ body }}",
            },
          ],
        },
      },
    });

    const snapshot = synthSnapshot(project);
    expect(snapshot[".mergify.yml"]).toBeDefined();
    expect(snapshot[".mergify.yml"]).toContain("commit_message_template");
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
