import { synthSnapshot, TestProject } from "./util";
import { DependencyType } from "../src";

describe("renovatebot", () => {
  test("renovatebot: true creates renovatebot configuration", () => {
    // GIVEN
    const p = new TestProject({
      renovatebot: true,
      renovatebotOptions: {
        labels: ["renotate", "dependencies"],
      },
    });

    // WHEN
    const snapshot = synthSnapshot(p);

    // THEN
    expect(snapshot["renovate.json5"]).toMatchSnapshot();
  });

  test("renovatebot: will ignore deps added later", () => {
    // GIVEN
    const p = new TestProject({
      renovatebot: true,
      renovatebotOptions: {
        labels: ["renotate", "dependencies"],
      },
    });
    p.deps.addDependency("test@1.0.0", DependencyType.RUNTIME);

    // WHEN
    const snapshot = synthSnapshot(p);

    // THEN
    expect(snapshot["renovate.json5"]).toHaveProperty("ignoreDeps", [
      "test",
      "projen",
      "amannn/action-semantic-pull-request",
    ]);
  });

  test("renovatebot: will ignore workflow actions", () => {
    // GIVEN
    const p = new TestProject({
      renovatebot: true,
      renovatebotOptions: {
        labels: ["renotate", "dependencies"],
      },
      github: true,
      githubOptions: {
        workflows: true,
      },
    });

    // WHEN
    const snapshot = synthSnapshot(p);

    // THEN
    expect(snapshot["renovate.json5"]).toHaveProperty("ignoreDeps", [
      "projen",
      "amannn/action-semantic-pull-request",
    ]);
  });

  test("renovatebot: will ignore reusable workflow versions", () => {
    // GIVEN
    const p = new TestProject({
      renovatebot: true,
      renovatebotOptions: {
        labels: ["renotate", "dependencies"],
      },
      github: true,
      githubOptions: {
        workflows: true,
      },
    });

    const workflow = p.github?.addWorkflow("self-added");
    workflow?.addJob("actions", {
      permissions: {},
      uses: "own-org/reusable-workflows/.github/workflows/testing.yaml@v1",
    });

    // WHEN
    const snapshot = synthSnapshot(p);

    // THEN
    expect(snapshot["renovate.json5"]).toHaveProperty("ignoreDeps", [
      "projen",
      "amannn/action-semantic-pull-request",
      "own-org/reusable-workflows/.github/workflows/testing.yaml",
    ]);
  });

  test("renovatebot: will ignore workflow actions created manually", () => {
    // GIVEN
    const p = new TestProject({
      renovatebot: true,
      renovatebotOptions: {
        labels: ["renotate", "dependencies"],
      },
      github: true,
      githubOptions: {
        workflows: true,
      },
    });

    const workflow = p.github?.addWorkflow("self-added");
    workflow?.addJob("actions", {
      permissions: {},
      steps: [
        {
          name: "checkout",
          uses: "actions/checkout@v4",
        },
        {
          name: "cache",
          uses: "actions/cache@v4",
        },
      ],
    });
    // WHEN
    const snapshot = synthSnapshot(p);

    // THEN
    expect(snapshot["renovate.json5"]).toHaveProperty("ignoreDeps", [
      "projen",
      "amannn/action-semantic-pull-request",
      "actions/checkout",
      "actions/cache",
    ]);
  });

  test("renovatebot: override renovatebot configuration", () => {
    // GIVEN
    const overrideConfig = {
      prHourlyLimit: 10,
      schedule: [],
      packageRules: [],
      labels: [],
      ignoreDeps: [],
      extends: ["customExtend"],
    };
    const p = new TestProject({
      renovatebot: true,
      renovatebotOptions: {
        marker: false,
        labels: ["renotate", "dependencies"],
        overrideConfig: overrideConfig,
      },
    });

    // WHEN
    const snapshot = synthSnapshot(p)["renovate.json5"];

    // THEN
    expect(snapshot).toMatchSnapshot();
    expect(snapshot).toStrictEqual(overrideConfig);
  });

  test("renovatebot: can use file escape hatch", () => {
    // GIVEN
    const p = new TestProject({
      renovatebot: true,
      renovatebotOptions: {
        labels: ["renotate", "dependencies"],
      },
    });

    // THEN
    expect(p.tryFindObjectFile("renovate.json5")).toBeDefined();
  });
});
