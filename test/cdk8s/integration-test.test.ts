import { Cdk8sTypeScriptApp, IntegrationTest } from "../../src/cdk8s";
import { synthSnapshot } from "../util";

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
    const output = synthSnapshot(project);
    const tasks = output[".projen/tasks.json"].tasks;
    expect(tasks["integ:my-test-name:snapshot"]).toMatchSnapshot();
    expect(tasks["integ:my-test-name:deploy"]).toMatchSnapshot();
    expect(tasks["integ:my-test-name:assert"]).toMatchSnapshot();
    expect(tasks["integ:snapshot-all"]).toMatchSnapshot();
    expect(tasks.test).toMatchSnapshot();
  });
});
