import { synthSnapshot, TestProject } from "./util";
import * as logging from "../src/logging";

logging.disable();

describe("SampleReadProps", () => {
  test("default SampleReadme", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    const output = synthSnapshot(project);

    // THEN
    const upper = output["README.md"];
    const lower = output["readme.md"];
    expect(upper).toBeTruthy();
    expect(lower).toBeFalsy();
  });

  test("customized w/ default SampleReadme", () => {
    // GIVEN
    const project = new TestProject({
      readme: {
        filename: "README.md",
      },
    });

    // WHEN
    const output = synthSnapshot(project);

    // THEN
    const upper = output["README.md"];
    const lower = output["readme.md"];
    expect(upper).toBeTruthy();
    expect(lower).toBeFalsy();
  });

  test("customized SampleReadme", () => {
    // GIVEN
    const project = new TestProject({
      readme: {
        filename: "readme.md",
      },
    });

    // WHEN
    const output = synthSnapshot(project);

    // THEN
    const upper = output["README.md"];
    const lower = output["readme.md"];
    expect(upper).toBeFalsy();
    expect(lower).toBeTruthy();
  });

  test("SampleReadme customized contents in constructor", () => {
    // GIVEN
    const project = new TestProject({
      readme: {
        contents: "my stuff",
      },
    });

    // WHEN
    const output = synthSnapshot(project);

    // THEN
    const readme = output["README.md"];
    expect(readme).toBeTruthy();
    expect(readme).toStrictEqual("my stuff");
  });
});
