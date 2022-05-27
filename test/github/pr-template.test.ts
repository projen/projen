import { Testing } from "../../src";
import { GitHub, GitHubProject } from "../../src/github";

const PULL_REQUEST_TEMPLATE_FILE = ".github/pull_request_template.md";

test("default", () => {
  // GIVEN
  const project = new GitHubProject({
    name: "my-project",
    github: false,
  });
  const github = new GitHub(project);

  // WHEN
  github.addPullRequestTemplate();

  // THEN
  expect(Testing.synth(project)[PULL_REQUEST_TEMPLATE_FILE]).toStrictEqual(
    "Fixes #"
  );
});

test("custom content", () => {
  // GIVEN
  const project = new GitHubProject({
    name: "my-project",
    github: false,
  });
  const github = new GitHub(project);

  // WHEN
  github.addPullRequestTemplate("hello", "world", "", "foobar");

  // THEN
  expect(Testing.synth(project)[PULL_REQUEST_TEMPLATE_FILE]).toStrictEqual(
    ["hello", "world", "", "foobar"].join("\n")
  );
});
