import { AutoMerge } from "../../src/github";
import { NodeProject, NodeProjectOptions } from "../../src/javascript";
import { synthSnapshot } from "../util";

describe("auto-merge", () => {
  test("default", () => {
    const project = createProject();

    new AutoMerge(project.github!);

    const snapshot = synthSnapshot(project);

    expect(snapshot[".mergify.yml"]).toBeDefined();
    expect(snapshot[".mergify.yml"]).toMatchSnapshot();
  });

  test("configure options", () => {
    const project = createProject();

    new AutoMerge(project.github!, {
      approvedReviews: 2,
      blockingLabels: ["draft"],
    });

    const snapshot = synthSnapshot(project);

    expect(snapshot[".mergify.yml"]).toBeDefined();
    expect(snapshot[".mergify.yml"]).toMatchSnapshot();
  });

  test("provides access to mergify", () => {
    const project = createProject();

    const autoMerge = new AutoMerge(project.github!, {
      approvedReviews: 2,
      blockingLabels: ["draft"],
    });
    autoMerge.mergify.addRule({
      name: "automatic merge for main when CI passes and 2 reviews",
      conditions: [
        "#approved-reviews-by>=2",
        "check-success=Travis CI - Pull Request",
        "base=main",
      ],
      actions: { merge: { method: "merge " } },
    });

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
    autoMerge: false,
    ...options,
  });
}
