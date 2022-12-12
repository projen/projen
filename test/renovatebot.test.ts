import { synthSnapshot, TestProject } from "./util";

describe("renovatebot", () => {
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
    const generatedJson = JSON.parse(snapshot);
    console.log(generatedJson);

    // THEN
    expect(snapshot).toMatchSnapshot();
    expect(generatedJson).toStrictEqual(overrideConfig);
  });
});
