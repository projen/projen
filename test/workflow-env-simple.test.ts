import * as YAML from "yaml";
import { synthSnapshot, TestProject } from "./util";
import { BuildWorkflow } from "../src/build";
import { NodeProject } from "../src/javascript";

describe("Workflow Environment Variables", () => {
  test("BuildWorkflow includes custom environment variables", () => {
    const project = new TestProject({ github: true });
    new BuildWorkflow(project, {
      buildTask: project.buildTask,
      artifactsDirectory: "./dist",
      env: {
        NPM_TOKEN: "${{ secrets.NPM_TOKEN }}",
        CUSTOM_VAR: "custom-value",
      },
    });

    const snapshot = synthSnapshot(project);
    const workflow = snapshot[".github/workflows/build.yml"];
    const parsedWorkflow = YAML.parse(workflow);

    expect(parsedWorkflow.jobs.build.env).toEqual({
      CI: "true",
      NPM_TOKEN: "${{ secrets.NPM_TOKEN }}",
      CUSTOM_VAR: "custom-value",
    });
  });

  test("BuildWorkflow with no custom env only has CI", () => {
    const project = new TestProject({ github: true });
    new BuildWorkflow(project, {
      buildTask: project.buildTask,
      artifactsDirectory: "./dist",
    });

    const snapshot = synthSnapshot(project);
    const workflow = snapshot[".github/workflows/build.yml"];
    const parsedWorkflow = YAML.parse(workflow);

    expect(parsedWorkflow.jobs.build.env).toEqual({
      CI: "true",
    });
  });

  test("BuildWorkflow merges env variables correctly", () => {
    const project = new TestProject({ github: true });
    new BuildWorkflow(project, {
      buildTask: project.buildTask,
      artifactsDirectory: "./dist",
      env: {
        CI: "false", // User can override CI if they want
        NPM_TOKEN: "${{ secrets.NPM_TOKEN }}",
        ANOTHER_VAR: "value",
      },
    });

    const snapshot = synthSnapshot(project);
    const workflow = snapshot[".github/workflows/build.yml"];
    const parsedWorkflow = YAML.parse(workflow);

    // The user's env variables are merged with defaults
    expect(parsedWorkflow.jobs.build.env.CI).toEqual("false");
    expect(parsedWorkflow.jobs.build.env.NPM_TOKEN).toEqual(
      "${{ secrets.NPM_TOKEN }}"
    );
    expect(parsedWorkflow.jobs.build.env.ANOTHER_VAR).toEqual("value");
  });

  test("Release workflow includes custom environment variables", () => {
    const project = new NodeProject({
      name: "test-project",
      defaultReleaseBranch: "main",
      github: true,
      release: true,
      releaseWorkflowEnv: {
        NPM_TOKEN: "${{ secrets.NPM_TOKEN }}",
        RELEASE_VAR: "release-value",
        CUSTOM_REGISTRY: "https://npm.pkg.github.com",
      },
    });

    const snapshot = synthSnapshot(project);
    const workflow = snapshot[".github/workflows/release.yml"];
    const parsedWorkflow = YAML.parse(workflow);

    expect(parsedWorkflow.jobs.release.env).toEqual({
      CI: "true",
      NPM_TOKEN: "${{ secrets.NPM_TOKEN }}",
      RELEASE_VAR: "release-value",
      CUSTOM_REGISTRY: "https://npm.pkg.github.com",
    });
  });

  test("Release workflow with no custom env only has CI", () => {
    const project = new NodeProject({
      name: "test-project",
      defaultReleaseBranch: "main",
      github: true,
      release: true,
    });

    const snapshot = synthSnapshot(project);
    const workflow = snapshot[".github/workflows/release.yml"];
    const parsedWorkflow = YAML.parse(workflow);

    expect(parsedWorkflow.jobs.release.env).toEqual({
      CI: "true",
    });
  });

  test("UpgradeDependencies workflow includes custom environment variables", () => {
    const project = new NodeProject({
      name: "test-project",
      defaultReleaseBranch: "main",
      github: true,
      depsUpgradeOptions: {
        workflow: true,
        workflowOptions: {
          env: {
            NPM_TOKEN: "${{ secrets.NPM_TOKEN }}",
            UPGRADE_VAR: "upgrade-value",
            NODE_AUTH_TOKEN: "${{ secrets.NODE_AUTH_TOKEN }}",
          },
        },
      },
    });

    const snapshot = synthSnapshot(project);
    const workflow = snapshot[".github/workflows/upgrade-main.yml"];
    const parsedWorkflow = YAML.parse(workflow);

    expect(parsedWorkflow.jobs.upgrade.env).toEqual({
      NPM_TOKEN: "${{ secrets.NPM_TOKEN }}",
      UPGRADE_VAR: "upgrade-value",
      NODE_AUTH_TOKEN: "${{ secrets.NODE_AUTH_TOKEN }}",
    });
  });

  test("UpgradeDependencies workflow with no custom env has no env section", () => {
    const project = new NodeProject({
      name: "test-project",
      defaultReleaseBranch: "main",
      github: true,
      depsUpgradeOptions: {
        workflow: true,
      },
    });

    const snapshot = synthSnapshot(project);
    const workflow = snapshot[".github/workflows/upgrade-main.yml"];
    const parsedWorkflow = YAML.parse(workflow);

    // When no env is specified, the env property should be undefined
    expect(parsedWorkflow.jobs.upgrade.env).toBeUndefined();
  });

  test("Release and Upgrade workflows work together with private registry authentication", () => {
    const project = new NodeProject({
      name: "private-package",
      defaultReleaseBranch: "main",
      github: true,
      release: true,
      releaseWorkflowEnv: {
        NPM_TOKEN: "${{ secrets.NPM_TOKEN }}",
        NPM_CONFIG_REGISTRY: "https://npm.pkg.github.com",
      },
      depsUpgradeOptions: {
        workflow: true,
        workflowOptions: {
          env: {
            NPM_TOKEN: "${{ secrets.NPM_TOKEN }}",
            NPM_CONFIG_REGISTRY: "https://npm.pkg.github.com",
          },
        },
      },
    });

    const snapshot = synthSnapshot(project);

    // Check release workflow
    const releaseWorkflow = YAML.parse(
      snapshot[".github/workflows/release.yml"]
    );
    expect(releaseWorkflow.jobs.release.env.NPM_TOKEN).toBe(
      "${{ secrets.NPM_TOKEN }}"
    );
    expect(releaseWorkflow.jobs.release.env.NPM_CONFIG_REGISTRY).toBe(
      "https://npm.pkg.github.com"
    );

    // Check upgrade workflow
    const upgradeWorkflow = YAML.parse(
      snapshot[".github/workflows/upgrade-main.yml"]
    );
    expect(upgradeWorkflow.jobs.upgrade.env.NPM_TOKEN).toBe(
      "${{ secrets.NPM_TOKEN }}"
    );
    expect(upgradeWorkflow.jobs.upgrade.env.NPM_CONFIG_REGISTRY).toBe(
      "https://npm.pkg.github.com"
    );
  });
});
