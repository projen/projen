import * as yaml from "yaml";
import { GithubCredentials, workflows } from "../../src/github";
import { NodeProject } from "../../src/javascript/node-project";
import { synthSnapshot } from "../../src/util/synth";

test("with a GitHub app for authentication with limited permissions", () => {
  const project = new NodeProject({
    defaultReleaseBranch: "main",
    name: "node-project",
    githubOptions: {
      projenCredentials: GithubCredentials.fromApp({
        owner: "projen",
        repositories: ["projen/one", "projen/two"],
        permissions: {
          pullRequests: workflows.AppPermission.WRITE,
          contents: workflows.AppPermission.WRITE,
        },
      }),
    },
  });

  const output = synthSnapshot(project);
  const buildWorkflow = yaml.parse(output[".github/workflows/build.yml"]);
  expect(buildWorkflow.jobs["self-mutation"].steps[0]).toMatchObject({
    name: "Generate token",
    with: {
      "app-id": `\${{ secrets.PROJEN_APP_ID }}`,
      "private-key": `\${{ secrets.PROJEN_APP_PRIVATE_KEY }}`,
      owner: "projen",
      repositories: "projen/one,projen/two",
      "permission-pull-requests": "write",
      "permission-contents": "write",
    },
  });
});
