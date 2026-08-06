import * as YAML from "yaml";
import { GithubCredentials } from "../../src/github";
import { AppPermission } from "../../src/github/workflows-model";
import { Release } from "../../src/release";
import { synthSnapshot, TestProject } from "../util";

describe("publishToGo with githubCredentials", () => {
  test("uses a GitHub App token instead of a secret-based token", () => {
    // GIVEN
    const project = new TestProject();
    const release = new Release(project, {
      tasks: [project.buildTask],
      versionFile: "version.json",
      branch: "main",
      artifactsDirectory: "dist",
    });

    // WHEN
    release.publisher.publishToGo({
      githubCredentials: GithubCredentials.fromApp({
        owner: "${{ github.repository_owner }}",
        repositories: ["my-go-repo"],
        permissions: { contents: AppPermission.WRITE },
      }),
    });

    // THEN
    const outdir = synthSnapshot(project);
    const workflow = YAML.parse(outdir[".github/workflows/release.yml"]);
    const job = workflow.jobs.release_golang;
    const releaseStep = job.steps.find((s: any) => s.name === "Release");
    const tokenStep = job.steps.find((s: any) => s.name === "Generate token");

    expect(tokenStep).toBeDefined();
    expect(tokenStep.uses).toContain("actions/create-github-app-token");
    expect(tokenStep.with["app-id"]).toBe("${{ secrets.PROJEN_APP_ID }}");
    expect(tokenStep.with["private-key"]).toBe(
      "${{ secrets.PROJEN_APP_PRIVATE_KEY }}",
    );
    expect(tokenStep.with.owner).toBe("${{ github.repository_owner }}");
    expect(tokenStep.with.repositories).toBe("my-go-repo");
    expect(tokenStep.with["permission-contents"]).toBe("write");

    expect(releaseStep.env.GITHUB_TOKEN).toBe(
      "${{ steps.generate_token.outputs.token }}",
    );
    // should not fall back to the secret-based token or SSH deploy key
    expect(releaseStep.env.GITHUB_TOKEN).not.toBe(
      "${{ secrets.GO_GITHUB_TOKEN }}",
    );
    expect(
      job.steps.some((s: any) => s.name === "Setup GitHub deploy key"),
    ).toBe(false);
  });

  test("uses the credentials' environment when githubEnvironment is not set", () => {
    // GIVEN
    const project = new TestProject();
    const release = new Release(project, {
      tasks: [project.buildTask],
      versionFile: "version.json",
      branch: "main",
      artifactsDirectory: "dist",
    });

    // WHEN
    release.publisher.publishToGo({
      githubCredentials: GithubCredentials.fromApp({
        environment: "go-app-env",
      }),
    });

    // THEN
    const outdir = synthSnapshot(project);
    const workflow = YAML.parse(outdir[".github/workflows/release.yml"]);
    expect(workflow.jobs.release_golang.environment).toBe("go-app-env");
  });

  test("githubEnvironment takes precedence over the credentials' environment", () => {
    // GIVEN
    const project = new TestProject();
    const release = new Release(project, {
      tasks: [project.buildTask],
      versionFile: "version.json",
      branch: "main",
      artifactsDirectory: "dist",
    });

    // WHEN
    release.publisher.publishToGo({
      githubEnvironment: "explicit-env",
      githubCredentials: GithubCredentials.fromApp({
        environment: "go-app-env",
      }),
    });

    // THEN
    const outdir = synthSnapshot(project);
    const workflow = YAML.parse(outdir[".github/workflows/release.yml"]);
    expect(workflow.jobs.release_golang.environment).toBe("explicit-env");
  });

  test("throws when combined with githubUseSsh", () => {
    // GIVEN
    const project = new TestProject();
    const release = new Release(project, {
      tasks: [project.buildTask],
      versionFile: "version.json",
      branch: "main",
      artifactsDirectory: "dist",
    });

    // THEN
    expect(() =>
      release.publisher.publishToGo({
        githubUseSsh: true,
        githubCredentials: GithubCredentials.fromApp(),
      }),
    ).toThrow(/Only one of 'githubCredentials' or/);
  });
});

describe("publishToGo with conflicting githubCredentials options", () => {
  test.each([
    ["githubUseSsh", { githubUseSsh: true }],
    ["githubTokenSecret", { githubTokenSecret: "MY_TOKEN" }],
    ["githubDeployKeySecret", { githubDeployKeySecret: "MY_DEPLOY_KEY" }],
  ])("throws when combined with %s", (_name, conflictingOption) => {
    // GIVEN
    const project = new TestProject();
    const release = new Release(project, {
      tasks: [project.buildTask],
      versionFile: "version.json",
      branch: "main",
      artifactsDirectory: "dist",
    });

    // THEN
    expect(() =>
      release.publisher.publishToGo({
        ...conflictingOption,
        githubCredentials: GithubCredentials.fromApp(),
      }),
    ).toThrow(
      /Only one of 'githubCredentials' or 'githubUseSsh'\/'githubTokenSecret'\/'githubDeployKeySecret' may be specified/,
    );
  });
});

describe("publishToGo with githubUseSsh and githubTokenSecret", () => {
  test("throws because the two are incompatible auth methods", () => {
    // GIVEN
    const project = new TestProject();
    const release = new Release(project, {
      tasks: [project.buildTask],
      versionFile: "version.json",
      branch: "main",
      artifactsDirectory: "dist",
    });

    // THEN
    expect(() =>
      release.publisher.publishToGo({
        githubUseSsh: true,
        githubTokenSecret: "MY_TOKEN",
      }),
    ).toThrow(
      /'githubTokenSecret' cannot be used together with 'githubUseSsh'/,
    );
  });
});
