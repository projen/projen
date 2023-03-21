import * as fs from "fs";
import * as path from "path";
import { DevEnvironmentDockerImage } from "../../src/dev-env";
import { Gitpod, GitpodOpenIn, GitpodOpenMode } from "../../src/gitpod";
import * as logging from "../../src/logging";
import { synthSnapshot, TestProject } from "../util";

// This is duplicated vs exported
const GITPOD_FILE = ".gitpod.yml";
const DEVCONTAINER_FILE = ".devcontainer.json";

logging.disable();

describe("dev environment constructor", () => {
  test("for gitpod", () => {
    // GIVEN
    const project = new TestProject({
      gitpod: false,
    });
    const task = project.addTask("dummy-task", { exec: "echo hello" });

    // WHEN
    new Gitpod(project, {
      dockerImage: DevEnvironmentDockerImage.fromImage("ubuntu:latest"),
      prebuilds: {
        pullRequests: true,
      },
      tasks: [task],
      ports: ["3000"],
      vscodeExtensions: [
        "dbaeumer.vscode-eslint@2.1.13:5sYlSD6wJi5s3xqD8hupUw==",
      ],
    });
    project.synth();

    // THEN
    const outdir = synthSnapshot(project);
    expect(outdir[GITPOD_FILE]).toMatchSnapshot();
  });
});

describe("dev environment enable/disable", () => {
  test("given gitpod and devContainer are false", () => {
    // GIVEN
    const project = new TestProject({
      gitpod: false,
      devContainer: false,
    });

    // WHEN
    project.synth();

    // THEN
    const gitpodFilePath = path.join(project.outdir, GITPOD_FILE);
    const devContainerFilePath = path.join(project.outdir, DEVCONTAINER_FILE);
    expect(fs.existsSync(gitpodFilePath)).toBeFalsy();
    expect(fs.existsSync(devContainerFilePath)).toBeFalsy();
  });

  test("no gitpod/devcontainer files if they are empty", () => {
    // WHEN
    const project = new TestProject({
      gitpod: true,
      devContainer: true,
    });

    // THEN
    project.synth();
    const gitpodFilePath = path.join(project.outdir, GITPOD_FILE);
    const devContainerFilePath = path.join(project.outdir, DEVCONTAINER_FILE);
    expect(fs.existsSync(gitpodFilePath)).toBeFalsy();
    expect(fs.existsSync(devContainerFilePath)).toBeFalsy();
  });

  test("given gitpod and devContainer are true", () => {
    // GIVEN
    const project = new TestProject({
      gitpod: true,
      devContainer: true,
    });

    // WHEN
    project.gitpod?.addDockerImage({ image: "foo" });
    project.devContainer?.addPorts("1234");

    // THEN
    project.synth();
    const gitpodFilePath = path.join(project.outdir, GITPOD_FILE);
    const devContainerFilePath = path.join(project.outdir, DEVCONTAINER_FILE);
    expect(fs.existsSync(gitpodFilePath)).toBeTruthy();
    expect(fs.existsSync(devContainerFilePath)).toBeTruthy();
  });
});

describe("dev environment docker options", () => {
  test("given an image", () => {
    // GIVEN
    const project = new TestProject({
      gitpod: true,
      devContainer: true,
    });

    // WHEN
    project.gitpod?.addDockerImage(
      DevEnvironmentDockerImage.fromImage("jsii/superchain:node14")
    );
    project.devContainer?.addDockerImage(
      DevEnvironmentDockerImage.fromImage("jsii/uberchain")
    );

    // THEN
    const outdir = synthSnapshot(project);
    const gitpodSnapshot = outdir[GITPOD_FILE];
    expect(gitpodSnapshot).toContain("image: jsii/superchain:node14");

    const devContainerSnapshot = outdir[DEVCONTAINER_FILE];
    expect(devContainerSnapshot).toStrictEqual({
      "//": expect.anything(),
      image: "jsii/uberchain",
    });
  });

  test("given a docker file dep", () => {
    // GIVEN
    const project = new TestProject({
      gitpod: true,
      devContainer: true,
    });

    // WHEN
    project.gitpod?.addDockerImage(
      DevEnvironmentDockerImage.fromFile(".gitpod.Dockerfile")
    );
    project.devContainer?.addDockerImage(
      DevEnvironmentDockerImage.fromFile("Dockerfile")
    );

    // THEN
    const outdir = synthSnapshot(project);
    const gitpodSnapshot = outdir[GITPOD_FILE];
    expect(gitpodSnapshot).toContain("image:");
    expect(gitpodSnapshot).toContain("file: .gitpod.Dockerfile");

    const devContainerSnapshot = outdir[DEVCONTAINER_FILE];
    expect(devContainerSnapshot).toStrictEqual({
      "//": expect.anything(),
      build: { dockerfile: "Dockerfile" },
    });
  });
});

describe("dev environment tasks", () => {
  test("given custom task", () => {
    // GIVEN
    const project = new TestProject({
      gitpod: true,
      devContainer: true,
    });

    // WHEN
    const task = project.addTask("gitpod-test", { exec: "text" });
    project.gitpod?.addTasks(task);
    project.devContainer?.addTasks(task);

    // THEN
    const outdir = synthSnapshot(project);
    const gitpodSnapshot = outdir[GITPOD_FILE];
    expect(gitpodSnapshot).toContain("command");
    expect(gitpodSnapshot).toContain("gitpod-test");

    const devContainerSnapshot = outdir[DEVCONTAINER_FILE];
    expect(devContainerSnapshot.postCreateCommand).toContain("gitpod-test");
  });

  test("given gitpod task options", () => {
    // GIVEN
    const project = new TestProject({
      gitpod: true,
      devContainer: true,
    });

    // WHEN
    const task = project.addTask("gitpod-test", { exec: "text" });
    project.gitpod?.addCustomTask({
      init: "echo Initializing",
      openIn: GitpodOpenIn.LEFT,
      openMode: GitpodOpenMode.SPLIT_BOTTOM,
      command: `npx projen ${task.name}`,
    });

    // THEN
    const snapshot = synthSnapshot(project)[GITPOD_FILE];
    expect(snapshot).toContain("init: echo Initializing");
    expect(snapshot).toContain("openIn: left");
    expect(snapshot).toContain("openMode: split-bottom");
    expect(snapshot).toContain("command: npx projen gitpod-test");
  });
});

test("dev environment ports", () => {
  // GIVEN
  const project = new TestProject({
    gitpod: true,
    devContainer: true,
  });

  // WHEN
  project.gitpod?.addPorts("8080", "3000-3999");
  project.devContainer?.addPorts("8080", "3000");

  // THEN
  const outdir = synthSnapshot(project);
  const gitpodSnapshot = outdir[GITPOD_FILE];
  expect(gitpodSnapshot).toContain('port: "8080"');
  expect(gitpodSnapshot).toContain("port: 3000-3999");

  const devContainerSnapshot = outdir[DEVCONTAINER_FILE];
  expect(devContainerSnapshot).toStrictEqual({
    "//": expect.anything(),
    forwardPorts: ["8080", "3000"],
  });
});

test("gitpod prebuilds config", () => {
  // GIVEN
  const project = new TestProject({
    gitpod: true,
    devContainer: false,
  });

  // WHEN
  project.gitpod?.addPrebuilds({
    master: true,
    branches: true,
    pullRequestsFromForks: true,
    addBadge: false,
  });

  // THEN
  const gitpodSnapshot = synthSnapshot(project)[GITPOD_FILE];
  expect(gitpodSnapshot).toContain("github");
  expect(gitpodSnapshot).toContain("prebuilds");
  expect(gitpodSnapshot).toContain("master");
  expect(gitpodSnapshot).toContain("branches");
  expect(gitpodSnapshot).toContain("pullRequestsFromForks");
  expect(gitpodSnapshot).toContain("addBadge");
});

test("dev environment vscode extensions", () => {
  // GIVEN
  const project = new TestProject({
    gitpod: true,
    devContainer: true,
  });

  // WHEN
  project.gitpod?.addVscodeExtensions(
    "dbaeumer.vscode-eslint@2.1.13:5sYlSD6wJi5s3xqD8hupUw=="
  );
  project.devContainer?.addVscodeExtensions("dbaeumer.vscode-eslint");

  // THEN
  const outdir = synthSnapshot(project);
  const gitpodSnapshot = outdir[GITPOD_FILE];
  expect(gitpodSnapshot).toContain("extensions:");
  expect(gitpodSnapshot).toContain(
    "dbaeumer.vscode-eslint@2.1.13:5sYlSD6wJi5s3xqD8hupUw=="
  );

  const devContainerSnapshot = outdir[DEVCONTAINER_FILE];
  expect(devContainerSnapshot).toStrictEqual({
    "//": expect.anything(),
    extensions: ["dbaeumer.vscode-eslint"],
  });
});
