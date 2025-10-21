import * as yaml from "yaml";
import { GithubCredentials, workflows } from "../../src/github";
import { NodeProject } from "../../src/javascript";
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

test("with environment for PAT credentials", () => {
  const project = new NodeProject({
    defaultReleaseBranch: "main",
    name: "node-project",
    githubOptions: {
      projenCredentials: GithubCredentials.fromPersonalAccessToken({
        secret: "MY_TOKEN",
        environment: "protected-env",
      }),
    },
  });

  const output = synthSnapshot(project);
  const buildWorkflow = yaml.parse(output[".github/workflows/build.yml"]);
  expect(buildWorkflow.jobs["self-mutation"].environment).toBe("protected-env");
});

test("with environment for GitHub App credentials", () => {
  const project = new NodeProject({
    defaultReleaseBranch: "main",
    name: "node-project",
    githubOptions: {
      projenCredentials: GithubCredentials.fromApp({
        environment: "app-env",
      }),
    },
  });

  const output = synthSnapshot(project);
  const buildWorkflow = yaml.parse(output[".github/workflows/build.yml"]);
  expect(buildWorkflow.jobs["self-mutation"].environment).toBe("app-env");
});

test("no environment by default", () => {
  const project = new NodeProject({
    defaultReleaseBranch: "main",
    name: "node-project",
  });

  const output = synthSnapshot(project);
  const buildWorkflow = yaml.parse(output[".github/workflows/build.yml"]);
  expect(buildWorkflow.jobs["self-mutation"].environment).toBeUndefined();
});
