import { Cdk8sTypeScriptApp } from "../../src/cdk8s";
import { NodeProject } from "../../src/javascript";
import { TypeScriptProject } from "../../src/typescript";

describe("upgrade task created without projen defined versions", () => {
  test("at NodeProject", () => {
    const prj = new NodeProject({
      defaultReleaseBranch: "main",
      name: "test project",
      deps: ["npm@^8"],
    });
    // Presynthesize upgradeWorkflow to get tasks to project that can be checked
    prj.upgradeWorkflow?.preSynthesize();
    const execSteps = prj.tasks.all
      .filter((task) => task.name === "upgrade")[0]
      .steps.filter((step) =>
        step.exec?.toString().includes("npm-check-updates")
      );
    execSteps.forEach((execStep) => {
      expect(execStep.exec).toContain("npm");
    });
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
    const execSteps = prj.tasks.all
      .filter((task) => task.name === "upgrade")[0]
      .steps.filter((step) =>
        step.exec?.toString().includes("npm-check-updates")
      );
    execSteps.forEach((execStep) => {
      expect(execStep.exec).toContain("npm");
      expect(execStep.exec).toContain("typescript");
    });
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
    const execSteps = prj.tasks.all
      .filter((task) => task.name === "upgrade")[0]
      .steps.filter((step) =>
        step.exec?.toString().includes("npm-check-updates")
      );
    execSteps.forEach((execStep) => {
      expect(execStep.exec).toContain("npm");
      expect(execStep.exec).toContain("typescript");
      expect(execStep.exec).toContain("constructs");
      expect(execStep.exec).toContain("cdk8s");
    });
  });
});
