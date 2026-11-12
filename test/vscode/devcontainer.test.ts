import { synthSnapshot, TestProject } from "../util";

const DEVCONTAINER_FILE = ".devcontainer.json";

test("no devcontainer configured", () => {
  // GIVEN
  const project = new TestProject();

  // THEN
  expect(project.devContainer).toBe(undefined);
  expect(synthSnapshot(project)).not.toHaveProperty(DEVCONTAINER_FILE);
});

test("add docker image", () => {
  // GIVEN
  const project = new TestProject({
    devContainer: true,
  });

  // WHEN
  project.devContainer?.addDockerImage({
    image: "testImage",
    dockerFile: "testDockerFile",
  });

  // THEN
  const devcontainer = synthSnapshot(project)[DEVCONTAINER_FILE];

  expect(devcontainer).toStrictEqual({
    "//": expect.anything(),
    image: "testImage",
    build: { dockerfile: "testDockerFile" },
  });
});

test("add port", () => {
  // GIVEN
  const project = new TestProject({
    devContainer: true,
  });

  // WHEN
  project.devContainer?.addPorts("80", "443");

  // THEN
  const devcontainer = synthSnapshot(project)[DEVCONTAINER_FILE];

  expect(devcontainer).toStrictEqual({
    "//": expect.anything(),
    forwardPorts: ["80", "443"],
  });
});

test("add extensions", () => {
  // GIVEN
  const project = new TestProject({
    devContainer: true,
  });

  // WHEN
  project.devContainer?.addVscodeExtensions(
    "ms-vscode-remote.remote-containers",
    "VisualStudioExptTeam.vscodeintellicode",
  );

  // THEN
  const devcontainer = synthSnapshot(project)[DEVCONTAINER_FILE];

  expect(devcontainer).toStrictEqual({
    "//": expect.anything(),
    extensions: [
      "ms-vscode-remote.remote-containers",
      "VisualStudioExptTeam.vscodeintellicode",
    ],
  });
});

test("add postCreateCommands", () => {
  // GIVEN
  const project = new TestProject({
    devContainer: true,
  });

  // WHEN
  project.devContainer?.addTasks(
    project.addTask("testCwd1"),
    project.addTask("testCwd2"),
  );

  // THEN
  const devcontainer = synthSnapshot(project)[DEVCONTAINER_FILE];

  expect(devcontainer).toStrictEqual({
    "//": expect.anything(),
    postCreateCommand:
      "( npx --yes projen testCwd1 ) && ( npx --yes projen testCwd2 )",
  });
});

test.each([
  "npx --yes projen",
  "npx -y projen",
  "node ./projen.js",
  "",
  "echo npx",
])("postCreateCommand renders %j unchanged", (projenCommand) => {
  // GIVEN
  const project = new TestProject({
    devContainer: true,
    projenCommand,
  });

  // WHEN
  project.devContainer?.addTasks(project.addTask("task"));

  // THEN
  const devcontainer = synthSnapshot(project)[DEVCONTAINER_FILE];
  expect(devcontainer.postCreateCommand).toBe(`( ${projenCommand} task )`);
});

test.each([
  ["npx projen --yes", "npx --yes projen --yes"],
  ["npx projen -y", "npx --yes projen -y"],
  ["npx -p projen projen", "npx --yes -p projen projen"],
])(
  "postCreateCommand adds --yes before the executable for %j",
  (projenCommand, expected) => {
    // GIVEN
    const project = new TestProject({
      devContainer: true,
      projenCommand,
    });

    // WHEN
    project.devContainer?.addTasks(project.addTask("task"));

    // THEN
    const devcontainer = synthSnapshot(project)[DEVCONTAINER_FILE];
    expect(devcontainer.postCreateCommand).toBe(`( ${expected} task )`);
  },
);

test("add features", () => {
  // GIVEN
  const project = new TestProject({
    devContainer: true,
  });

  // WHEN
  project.devContainer?.addFeatures(
    { name: "ghcr.io/devcontainers/features/aws-cli", version: "1" },
    { name: "ghcr.io/devcontainers-contrib/features/aws-cdk" },
  );

  // THEN
  const devcontainer = synthSnapshot(project)[DEVCONTAINER_FILE];

  expect(devcontainer).toStrictEqual({
    "//": expect.anything(),
    features: {
      "ghcr.io/devcontainers/features/aws-cli": {
        version: "1",
      },
      "ghcr.io/devcontainers-contrib/features/aws-cdk": {
        version: "latest",
      },
    },
  });
});
