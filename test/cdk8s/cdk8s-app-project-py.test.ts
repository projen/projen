import * as yaml from "yaml";
import { cdk8s } from "../../src";
import { synthSnapshot } from "../util";

test("", () => {
  const project = new cdk8s.Cdk8sPythonApp({
    authorEmail: "test@cdk8spythonapp.com",
    authorName: "First Last",
    moduleName: "test_cdk8s_python_app_project",
    name: "test-cdk8s-python-app-project",
    cdk8sVersion: "1.0.0",
    version: "0.1.0",
  });

  const output = synthSnapshot(project);

  // expect a synth task
  expect(output[".projen/tasks.json"].tasks.synth.steps).toStrictEqual([
    {
      exec: "cdk8s synth",
    },
  ]);

  // expect cdk8s.yaml to contain the k8s import
  expect(yaml.parse(output["cdk8s.yaml"])).toStrictEqual({
    app: "python app.py",
    imports: ["k8s"],
    language: "python",
  });

  // expect postcompile step to contain synth
  expect(
    output[".projen/tasks.json"].tasks["post-compile"].steps
  ).toStrictEqual([{ spawn: "synth" }]);
});
