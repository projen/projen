import { Testing } from "../../src";
import { Cdk8sTypeScriptApp, IntegrationTest } from "../../src/cdk8s";

describe("IntegrationTest", () => {
  test("adding an integration test", () => {
    const project = new Cdk8sTypeScriptApp({
      cdk8sVersion: "1.0.0-beta.11",
      name: "project",
      defaultReleaseBranch: "main",
      releaseWorkflow: true,
    });

    // WHEN
    new IntegrationTest(project, {
      entrypoint: "test/my-test-name.integ.ts",
      tsconfigPath: project.tsconfigDev.fileName,
    });

    // THEN
    const output = Testing.synth(project);
    const tasks = output[".projen/tasks.json"].tasks;
    expect(tasks["integ:my-test-name:snapshot"]).toMatchSnapshot();
    expect(tasks["integ:my-test-name:deploy"]).toMatchSnapshot();
    expect(tasks["integ:my-test-name:assert"]).toMatchSnapshot();
    expect(tasks["integ:snapshot-all"]).toMatchSnapshot();
    expect(tasks.test).toMatchSnapshot();
  });

  test("explicit name", () => {
    const project = new Cdk8sTypeScriptApp({
      cdk8sVersion: "1.0.0-beta.11",
      name: "project",
      defaultReleaseBranch: "main",
      releaseWorkflow: true,
    });

    // WHEN
    new IntegrationTest(project, {
      name: "foobar",
      entrypoint: "test/my-test-name.integ.ts",
      tsconfigPath: project.tsconfigDev.fileName,
    });

    // THEN
    const output = Testing.synth(project);
    const tasks = output[".projen/tasks.json"].tasks;
    expect(tasks["integ:foobar:snapshot"]).toBeDefined();
    expect(tasks["integ:foobar:deploy"]).toBeDefined();
    expect(tasks["integ:foobar:assert"]).toBeDefined();
    expect(tasks["integ:snapshot-all"]).toMatchSnapshot();
    expect(tasks.test).toMatchSnapshot();
  });
});
