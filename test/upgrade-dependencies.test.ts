import * as yaml from "yaml";
import { Cdk8sTypeScriptApp } from "../src/cdk8s";
import {
  NodeProject,
  NodeProjectOptions,
  UpgradeDependenciesSchedule,
} from "../src/javascript";
import { TaskRuntime } from "../src/task-runtime";
import { TypeScriptProject } from "../src/typescript";
import { synthSnapshot } from "./util";

test("upgrades command includes all dependencies", () => {
  const project = createProject({
    deps: ["some-dep"],
  });

  const deps = "jest jest-junit npm-check-updates standard-version some-dep";

  const tasks = synthSnapshot(project)[TaskRuntime.MANIFEST_FILE].tasks;
  expect(tasks.upgrade.steps[6].exec).toStrictEqual(`yarn upgrade ${deps}`);
});

test("upgrades command includes dependencies added post instantiation", () => {
  const project = createProject({});

  project.addDeps("some-dep");

  const deps = "jest jest-junit npm-check-updates standard-version some-dep";

  const tasks = synthSnapshot(project)[TaskRuntime.MANIFEST_FILE].tasks;
  expect(tasks.upgrade.steps[6].exec).toStrictEqual(`yarn upgrade ${deps}`);
});

test("upgrades command doesnt include ignored packages", () => {
  const project = createProject({
    projenUpgradeSecret: "PROJEN_SECRET",
    deps: ["dep1", "dep2"],
    depsUpgradeOptions: {
      exclude: ["dep2"],
    },
  });

  const deps = "jest jest-junit npm-check-updates projen standard-version dep1";

  const tasks = synthSnapshot(project)[TaskRuntime.MANIFEST_FILE].tasks;
  expect(tasks.upgrade.steps[6].exec).toStrictEqual(`yarn upgrade ${deps}`);
});

test("upgrades command includes only included packages", () => {
  const project = createProject({
    projenUpgradeSecret: "PROJEN_SECRET",
    deps: ["dep1", "dep2"],
    depsUpgradeOptions: {
      include: ["dep1"],
    },
  });

  const deps = "dep1";

  const tasks = synthSnapshot(project)[TaskRuntime.MANIFEST_FILE].tasks;
  expect(tasks.upgrade.steps[6].exec).toStrictEqual(`yarn upgrade ${deps}`);
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
  const project = createProject({
    projenUpgradeSecret: "PROJEN_SECRET",
  });

  const snapshot = synthSnapshot(project);
  expect(snapshot[".github/workflows/upgrade-main.yml"]).toBeDefined();
  expect(snapshot[".github/workflows/upgrade-main.yml"]).toMatchSnapshot();
});

test("custom options", () => {
  const project = createProject({
    projenUpgradeSecret: "PROJEN_SECRET",
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
    projenUpgradeSecret: "PROJEN_SECRET",
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
    projenUpgradeSecret: "PROJEN_SECRET",
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
    projenUpgradeSecret: "PROJEN_SECRET",
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

describe("upgrade task created without projen defined versions", () => {
  test("at NodeProject", () => {
    const prj = new NodeProject({
      defaultReleaseBranch: "main",
      name: "test project",
      deps: ["npm@^8"],
    });
    // Presynthesize upgradeWorkflow to get tasks to project that can be checked
    prj.upgradeWorkflow?.preSynthesize();
    const upgradeTask = prj.tasks.tryFind("upgrade");
    expect(upgradeTask).toBeDefined();
    if (upgradeTask) {
      const execSteps = upgradeTask.steps.filter((step) =>
        step.exec?.toString().includes("npm-check-updates")
      );
      execSteps.forEach((execStep) => {
        expect(execStep.exec).toContain("npm");
      });
    }
  });

  // Extends NodeProject
  test("at TypeScriptProject", () => {
    const prj = new TypeScriptProject({
      defaultReleaseBranch: "main",
      name: "test project",
      deps: ["npm@^8"],
      typescriptVersion: "4.4.4",
    });
    // Presynthesize upgradeWorkflow to get tasks to project that can be checked
    prj.upgradeWorkflow?.preSynthesize();
    const upgradeTask = prj.tasks.tryFind("upgrade");
    expect(upgradeTask).toBeDefined();
    if (upgradeTask) {
      const execSteps = upgradeTask.steps.filter((step) =>
        step.exec?.toString().includes("npm-check-updates")
      );
      execSteps.forEach((execStep) => {
        expect(execStep.exec).toContain("npm");
        expect(execStep.exec).toContain("typescript");
      });
    }
  });

  // Extends TypescriptAppProject that extends TypesciptProject that extends NodeProject
  test("at Cdk8sTypeScriptApp", () => {
    const prj = new Cdk8sTypeScriptApp({
      defaultReleaseBranch: "main",
      name: "test project",
      typescriptVersion: "4.5.4",
      deps: ["npm@^8"],
      cdk8sVersion: "1.0.0-beta.10",
    });
    // Presynthesize upgradeWorkflow to get tasks to project that can be checked
    prj.upgradeWorkflow?.preSynthesize();
    const upgradeTask = prj.tasks.tryFind("upgrade");
    expect(upgradeTask).toBeDefined();
    if (upgradeTask) {
      const execSteps = upgradeTask.steps.filter((step) =>
        step.exec?.toString().includes("npm-check-updates")
      );
      execSteps.forEach((execStep) => {
        expect(execStep.exec).toContain("npm");
        expect(execStep.exec).toContain("typescript");
        expect(execStep.exec).toContain("constructs");
        expect(execStep.exec).toContain("cdk8s");
      });
    }
  });
});

describe("projen-upgrade task is", () => {
  test("not defined for Projen if version is set", () => {
    const prj = new NodeProject({
      defaultReleaseBranch: "main",
      name: "test project",
      packageName: "test-project",
      projenVersion: "0.50.0",
    });
    // Presynthesize projenUpgradeWorkflow to get tasks to project that can be checked
    prj.projenUpgradeWorkflow?.preSynthesize();
    const upgradeTask = prj.tasks.tryFind("upgrade-projen");
    expect(upgradeTask).toBeUndefined();
  });

  test("defined for Projen if version is not set", () => {
    const prj = new NodeProject({
      defaultReleaseBranch: "main",
      name: "test project",
    });
    // Presynthesize projenUpgradeWorkflow to get tasks to project that can be checked
    prj.projenUpgradeWorkflow?.preSynthesize();
    const upgradeTask = prj.tasks.tryFind("upgrade-projen");
    expect(upgradeTask).toBeDefined();
    if (upgradeTask) {
      const execSteps = upgradeTask.steps.filter((step) =>
        step.exec?.toString().includes("npm-check-updates")
      );
      execSteps.forEach((execStep) => {
        expect(execStep.exec).toContain("npm");
      });
    }
  });
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
