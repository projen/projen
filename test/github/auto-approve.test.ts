import * as YAML from "yaml";
import { AutoApprove } from "../../src/github/auto-approve";
import { NodeProject, NodeProjectOptions } from "../../src/javascript";
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
