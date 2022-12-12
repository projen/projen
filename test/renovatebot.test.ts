import { synthSnapshot, TestProject } from "./util";

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
});
