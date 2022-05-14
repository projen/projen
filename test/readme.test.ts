import { Testing } from "../src";
import { GitHubProject } from "../src/github";

describe("SampleReadProps", () => {
  test("default SampleReadme", () => {
    // GIVEN
    const project = new GitHubProject({ name: "my-project" });

    // WHEN
    const output = Testing.synth(project);

    // THEN
    const upper = output["README.md"];
    const lower = output["readme.md"];
    expect(upper).toBeTruthy();
    expect(lower).toBeFalsy();
  });

  test("customized w/ default SampleReadme", () => {
    // GIVEN
    const project = new GitHubProject({
      name: "my-project",
      readme: {
        filename: "README.md",
      },
    });

    // WHEN
    const output = Testing.synth(project);

    // THEN
    const upper = output["README.md"];
    const lower = output["readme.md"];
    expect(upper).toBeTruthy();
    expect(lower).toBeFalsy();
  });

  test("customized SampleReadme", () => {
    // GIVEN
    const project = new GitHubProject({
      name: "my-project",
      readme: {
        filename: "readme.md",
      },
    });

    // WHEN
    const output = Testing.synth(project);

    // THEN
    const upper = output["README.md"];
    const lower = output["readme.md"];
    expect(upper).toBeFalsy();
    expect(lower).toBeTruthy();
  });

  test("SampleReadme customized contents in constructor", () => {
    // GIVEN
    const project = new GitHubProject({
      name: "my-project",
      readme: {
        contents: "my stuff",
      },
    });

    // WHEN
    const output = Testing.synth(project);

    // THEN
    const readme = output["README.md"];
    expect(readme).toBeTruthy();
    expect(readme).toStrictEqual("my stuff");
  });
});
