import { TestProject } from "./util";
import { Version } from "../src/version";

describe("Version", () => {
  test("Changes to bump's env should not affect unbump and vice-versa", () => {
    // GIVEN
    const project = new TestProject();
    const version = new Version(project, {
      versionInputFile: "VERSION",
      artifactsDirectory: "artifacts",
    });

    // WHEN
    version.bumpTask.env("STEP_NAME", "bump");
    version.unbumpTask.env("STEP_NAME", "unbump");

    // THEN
    expect(version.bumpTask.envVars.STEP_NAME).toEqual("bump");
    expect(version.unbumpTask.envVars.STEP_NAME).toEqual("unbump");
  });
});
