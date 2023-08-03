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
