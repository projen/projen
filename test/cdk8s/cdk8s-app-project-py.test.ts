import * as yaml from "yaml";
import { cdk8s } from "../../src";
import { synthSnapshot } from "../util";

test("basic options", () => {
  // GIVEN
  const project = new cdk8s.Cdk8sPythonApp({
    authorEmail: "test@cdk8spythonapp.com",
    authorName: "First Last",
    moduleName: "test_cdk8s_python_app_project",
    name: "test-cdk8s-python-app-project",
    version: "0.1.0",
    cdk8sVersion: "1.5.53",
  });

  // WHEN
  const output = synthSnapshot(project);

  // THEN
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

  expect(output["requirements.txt"]).toContain("cdk8s>=1.5.53, <2.0.0");
});

test("cdk8s version pinning", () => {
  // GIVEN
  const project = new cdk8s.Cdk8sPythonApp({
    authorEmail: "test@cdk8spythonapp.com",
    authorName: "First Last",
    moduleName: "test_cdk8s_python_app_project",
    name: "test-cdk8s-python-app-project",
    version: "0.1.0",
    cdk8sVersion: "1.0.0",
    cdk8sVersionPinning: true,
  });

  // WHEN
  const output = synthSnapshot(project);

  // THEN
  expect(output["requirements.txt"]).toContain("cdk8s==1.0.0");
});

test("constructs version undefined", () => {
  // GIVEN
  const project = new cdk8s.Cdk8sPythonApp({
    authorEmail: "test@cdk8spythonapp.com",
    authorName: "First Last",
    moduleName: "test_cdk8s_python_app_project",
    name: "test-cdk8s-python-app-project",
    version: "0.1.0",
    cdk8sVersion: "1.5.53",
  });

  // WHEN
  const output = synthSnapshot(project);

  // THEN
  expect(output["requirements.txt"]).toContain("constructs>=3.3.251, <4.0.0");
});

test("constructs version pinning", () => {
  // GIVEN
  const project = new cdk8s.Cdk8sPythonApp({
    authorEmail: "test@cdk8spythonapp.com",
    authorName: "First Last",
    moduleName: "test_cdk8s_python_app_project",
    name: "test-cdk8s-python-app-project",
    version: "0.1.0",
    cdk8sVersion: "1.0.0",
    constructsVersion: "3.2.34",
    constructsVersionPinning: true,
  });

  // WHEN
  const output = synthSnapshot(project);

  // THEN
  expect(output["requirements.txt"]).toContain("constructs==3.2.34");
});
