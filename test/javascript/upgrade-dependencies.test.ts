import * as yaml from "yaml";
import { GithubCredentials } from "../../src/github";
import {
  NodeProject,
  NodeProjectOptions,
  UpgradeDependenciesSchedule,
} from "../../src/javascript";
import { TaskRuntime } from "../../src/task-runtime";
import { synthSnapshot } from "../util";

test("upgrades command includes all dependencies", () => {
  const project = createProject({
    deps: ["some-dep"],
  });

  const tasks = synthSnapshot(project)[TaskRuntime.MANIFEST_FILE].tasks;
  expect(tasks.upgrade.steps[7].exec).toStrictEqual(`yarn upgrade`); // implicitly all dependencies
});

test("upgrades command includes dependencies added post instantiation", () => {
  const project = createProject({});

  project.addDeps("some-dep");

  const tasks = synthSnapshot(project)[TaskRuntime.MANIFEST_FILE].tasks;
  expect(tasks.upgrade.steps[7].exec).toStrictEqual(`yarn upgrade`); // implicitly all dependencies
});

test("upgrades command doesn't include ignored packages", () => {
  const project = createProject({
    deps: ["dep1", "dep2"],
    depsUpgradeOptions: {
      exclude: ["dep2"],
    },
  });

  const deps = "jest jest-junit npm-check-updates projen standard-version dep1";

  const tasks = synthSnapshot(project)[TaskRuntime.MANIFEST_FILE].tasks;
  expect(tasks.upgrade.steps[7].exec).toStrictEqual(`yarn upgrade ${deps}`);
});

test("upgrades command includes only included packages", () => {
  const project = createProject({
    deps: ["dep1", "dep2"],
    depsUpgradeOptions: {
      include: ["dep1"],
    },
  });

  const deps = "dep1";

  const tasks = synthSnapshot(project)[TaskRuntime.MANIFEST_FILE].tasks;
  expect(tasks.upgrade.steps[7].exec).toStrictEqual(`yarn upgrade ${deps}`); // implicitly all dependencies
});

test("upgrade task can be overwritten", () => {
  const project = createProject({
    depsUpgrade: true,
  });

  project.removeTask("upgrade");
  const newTask = project.addTask("upgrade");
  newTask.exec("echo 'hello world'");

  const tasks = synthSnapshot(project)[TaskRuntime.MANIFEST_FILE].tasks;

  expect(tasks.upgrade.steps[0].exec).toStrictEqual(`echo 'hello world'`);
});

test("default options", () => {
  const project = createProject();

  const snapshot = synthSnapshot(project);
  expect(snapshot[".github/workflows/upgrade-main.yml"]).toBeDefined();
  expect(snapshot[".github/workflows/upgrade-main.yml"]).toMatchSnapshot();
});

test("custom options", () => {
  const project = createProject({
    depsUpgradeOptions: {
      workflowOptions: {
        schedule: UpgradeDependenciesSchedule.MONTHLY,
      },
    },
  });

  const snapshot = synthSnapshot(project);
  expect(snapshot[".github/workflows/upgrade-main.yml"]).toBeDefined();
  expect(snapshot[".github/workflows/upgrade-main.yml"]).toMatchSnapshot();
});

test("with a GitHub app for authentication", () => {
  const project = createProject({
    githubOptions: {
      projenCredentials: GithubCredentials.fromApp(),
    },
    depsUpgradeOptions: {
      workflowOptions: {
        schedule: UpgradeDependenciesSchedule.MONTHLY,
      },
    },
  });

  const snapshot = synthSnapshot(project);
  expect(snapshot[".github/workflows/upgrade-main.yml"]).toBeDefined();
  expect(snapshot[".github/workflows/upgrade-main.yml"]).toMatchSnapshot();
});

test("branches default to release branches", () => {
  const project = createProject({
    majorVersion: 1,
    releaseBranches: {
      branch1: { majorVersion: 2 },
      branch2: { majorVersion: 3 },
    },
  });

  const snapshot = synthSnapshot(project);
  expect(snapshot[".github/workflows/upgrade-main.yml"]).toBeDefined();
  expect(snapshot[".github/workflows/upgrade-main.yml"]).toMatchSnapshot();
  expect(snapshot[".github/workflows/upgrade-branch1.yml"]).toBeDefined();
  expect(snapshot[".github/workflows/upgrade-branch1.yml"]).toMatchSnapshot();
  expect(snapshot[".github/workflows/upgrade-branch2.yml"]).toBeDefined();
  expect(snapshot[".github/workflows/upgrade-branch2.yml"]).toMatchSnapshot();
});

test("considers branches added post project instantiation", () => {
  const project = createProject({
    majorVersion: 1,
    releaseBranches: {
      branch1: { majorVersion: 2 },
    },
  });

  project.release?.addBranch("branch2", { majorVersion: 3 });

  const snapshot = synthSnapshot(project);
  expect(snapshot[".github/workflows/upgrade-main.yml"]).toBeDefined();
  expect(snapshot[".github/workflows/upgrade-main.yml"]).toMatchSnapshot();
  expect(snapshot[".github/workflows/upgrade-branch1.yml"]).toBeDefined();
  expect(snapshot[".github/workflows/upgrade-branch1.yml"]).toMatchSnapshot();
  expect(snapshot[".github/workflows/upgrade-branch2.yml"]).toBeDefined();
  expect(snapshot[".github/workflows/upgrade-branch2.yml"]).toMatchSnapshot();
});

test("can upgrade multiple branches", () => {
  const project = createProject({
    depsUpgradeOptions: {
      workflowOptions: {
        branches: ["branch1", "branch2"],
      },
    },
  });

  const snapshot = synthSnapshot(project);
  expect(snapshot[".github/workflows/upgrade-branch1.yml"]).toBeDefined();
  expect(snapshot[".github/workflows/upgrade-branch1.yml"]).toMatchSnapshot();
  expect(snapshot[".github/workflows/upgrade-branch2.yml"]).toBeDefined();
  expect(snapshot[".github/workflows/upgrade-branch2.yml"]).toMatchSnapshot();
});

test("git identity can be customized", () => {
  const project = createProject({
    depsUpgradeOptions: {
      workflowOptions: {
        gitIdentity: {
          name: "Foo Bar",
          email: "foo@bar.com",
        },
      },
    },
  });

  const snapshot = synthSnapshot(project);
  const upgrade = yaml.parse(snapshot[".github/workflows/upgrade-main.yml"]);
  expect(upgrade.jobs.pr.steps[3]).toEqual({
    name: "Set git identity",
    run: [
      'git config user.name "Foo Bar"',
      'git config user.email "foo@bar.com"',
    ].join("\n"),
  });
});

test("github runner can be customized", () => {
  const project = createProject({
    depsUpgradeOptions: {
      workflowOptions: {
        runsOn: ["self-hosted"],
      },
    },
  });

  const snapshot = synthSnapshot(project);
  const upgrade = yaml.parse(snapshot[".github/workflows/upgrade-main.yml"]);
  expect(upgrade.jobs.upgrade["runs-on"]).toEqual("self-hosted");
  expect(upgrade.jobs.pr["runs-on"]).toEqual("self-hosted");
});

test("labels and assignees can be customized", () => {
  const project = createProject({
    depsUpgradeOptions: {
      workflowOptions: {
        labels: ["deps-upgrade-label"],
        assignees: ["repo-maintainer"],
      },
    },
  });

  const snapshot = synthSnapshot(project);
  const upgrade = yaml.parse(snapshot[".github/workflows/upgrade-main.yml"]);
  expect(upgrade.jobs.pr.steps[4].with.labels).toEqual("deps-upgrade-label");
  expect(upgrade.jobs.pr.steps[4].with.assignees).toEqual("repo-maintainer");
});

test("upgrade task created without projen defined versions at NodeProject", () => {
  const prj = new NodeProject({
    defaultReleaseBranch: "main",
    name: "test project",
    deps: ["npm@^8", "axios@~0.20.0", "markdownlint@0.24.0"],
  });
  const tasks = synthSnapshot(prj)[TaskRuntime.MANIFEST_FILE].tasks;
  expect(tasks.upgrade.steps[1].exec).toStrictEqual(
    "npm-check-updates --dep dev --upgrade --target=minor --reject='axios,markdownlint'"
  );
});

function createProject(
  options: Omit<
    NodeProjectOptions,
    "outdir" | "defaultReleaseBranch" | "name" | "dependenciesUpgrade"
  > = {}
): NodeProject {
  return new NodeProject({
    defaultReleaseBranch: "main",
    name: "node-project",
    ...options,
  });
}
