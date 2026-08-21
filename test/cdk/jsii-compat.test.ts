import { JsiiProject } from "../../src/cdk";
import { synthSnapshot } from "../util";

// `release: false` keeps this focused on the compat task itself, without
// synthesizing the release workflow.
test("compat runs jsii-diff as a shell-free argv, carrying values verbatim", () => {
  const project = new JsiiProject({
    authorAddress: "hello@hello.com",
    repositoryUrl: "https://github.com/foo/bar.git",
    author: "My Name",
    // a scoped name and an ignore file with a space: both would need quoting if
    // the command were a shell string
    name: "@scope/my project",
    defaultReleaseBranch: "main",
    release: false,
    compat: true,
    compatIgnore: ".my compatignore",
  });

  const tasks = synthSnapshot(project)[".projen/tasks.json"].tasks;

  expect(tasks.compat.steps).toStrictEqual([
    {
      execArgs: [
        "jsii-diff",
        "npm:@scope/my project",
        "-k",
        "--ignore-file",
        ".my compatignore",
      ],
    },
  ]);
});
