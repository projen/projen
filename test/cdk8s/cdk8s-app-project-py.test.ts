import * as yaml from "yaml";
import { Cdk8sPythonApp } from "../../src/cdk8s";
import { synthSnapshot } from "../util";

test("basic options", () => {
  // GIVEN
  const project = new Cdk8sPythonApp({
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
    output[".projen/tasks.json"].tasks["post-compile"].steps,
  ).toStrictEqual([{ spawn: "synth" }]);

  expect(output["requirements.txt"]).toContain("cdk8s>=1.5.53, <2.0.0");
});

test("CDK8s version pinning", () => {
  // GIVEN
  const project = new Cdk8sPythonApp({
    authorEmail: "test@cdk8spythonapp.com",
    authorName: "First Last",
    moduleName: "test_cdk8s_python_app_project",
    name: "test-cdk8s-python-app-project",
    version: "0.1.0",
    cdk8sVersion: "1.1.0",
    cdk8sVersionPinning: true,
  });

  // WHEN
  const output = synthSnapshot(project);

  // THEN
  expect(output["requirements.txt"]).toContain("cdk8s==1.1.0");
});

test("CDK8s V1 and constructs version undefined", () => {
  // GIVEN
  const project = new Cdk8sPythonApp({
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
  expect(output["requirements.txt"]).toContain("cdk8s>=1.5.53, <2.0.0");
  expect(output["requirements.txt"]).toContain("constructs>=3.4.39, <4.0.0");
});

test("CDK8s V1 and constructs version defined", () => {
  // GIVEN
  const project = new Cdk8sPythonApp({
    authorEmail: "test@cdk8spythonapp.com",
    authorName: "First Last",
    moduleName: "test_cdk8s_python_app_project",
    name: "test-cdk8s-python-app-project",
    version: "0.1.0",
    cdk8sVersion: "1.1.0",
    constructsVersion: "3.2.34",
  });

  // WHEN
  const output = synthSnapshot(project);

  // THEN
  expect(output["requirements.txt"]).toContain("cdk8s>=1.1.0, <2.0.0");
  expect(output["requirements.txt"]).toContain("constructs>=3.2.34, <4.0.0");
});

test("CDK8s V2 and constructs version undefined", () => {
  // GIVEN
  const project = new Cdk8sPythonApp({
    authorEmail: "test@cdk8spythonapp.com",
    authorName: "First Last",
    moduleName: "test_cdk8s_python_app_project",
    name: "test-cdk8s-python-app-project",
    version: "0.1.0",
    cdk8sVersion: "2.3.33",
  });

  // WHEN
  const output = synthSnapshot(project);

  // THEN
  expect(output["requirements.txt"]).toContain("cdk8s>=2.3.33, <3.0.0");
  expect(output["requirements.txt"]).toContain("constructs>=10.1.42, <11.0.0");
});

test("CDK8s V2 and constructs version defined", () => {
  // GIVEN
  const project = new Cdk8sPythonApp({
    authorEmail: "test@cdk8spythonapp.com",
    authorName: "First Last",
    moduleName: "test_cdk8s_python_app_project",
    name: "test-cdk8s-python-app-project",
    version: "0.1.0",
    cdk8sVersion: "2.3.33",
    constructsVersion: "10.0.0",
  });

  // WHEN
  const output = synthSnapshot(project);

  // THEN
  expect(output["requirements.txt"]).toContain("cdk8s>=2.3.33, <3.0.0");
  expect(output["requirements.txt"]).toContain("constructs>=10.0.0, <11.0.0");
});

test("CDK8s V2 and constructs version pinning", () => {
  // GIVEN
  const project = new Cdk8sPythonApp({
    authorEmail: "test@cdk8spythonapp.com",
    authorName: "First Last",
    moduleName: "test_cdk8s_python_app_project",
    name: "test-cdk8s-python-app-project",
    version: "0.1.0",
    cdk8sVersion: "2.3.33",
    constructsVersion: "10.0.0",
    constructsVersionPinning: true,
  });

  // WHEN
  const output = synthSnapshot(project);

  // THEN
  expect(output["requirements.txt"]).toContain("cdk8s>=2.3.33, <3.0.0");
  expect(output["requirements.txt"]).toContain("constructs==10.0.0");
});

test("cdk8s-plus-22 undefined", () => {
  // GIVEN
  const project = new Cdk8sPythonApp({
    authorEmail: "test@cdk8spythonapp.com",
    authorName: "First Last",
    moduleName: "test_cdk8s_python_app_project",
    name: "test-cdk8s-python-app-project",
    version: "0.1.0",
    cdk8sVersion: "2.3.33",
  });

  // WHEN
  const output = synthSnapshot(project);

  // THEN
  expect(output["requirements.txt"]).toContain(
    "cdk8s-plus-22>=2.0.0.rc26, <3.0.0",
  );
});

test("cdk8s-plus-22 defined", () => {
  // GIVEN
  const project = new Cdk8sPythonApp({
    authorEmail: "test@cdk8spythonapp.com",
    authorName: "First Last",
    moduleName: "test_cdk8s_python_app_project",
    name: "test-cdk8s-python-app-project",
    version: "0.1.0",
    cdk8sVersion: "2.3.33",
    cdk8sPlusVersion: "2.0.0-rc.27",
  });

  // WHEN
  const output = synthSnapshot(project);

  // THEN
  expect(output["requirements.txt"]).toContain(
    "cdk8s-plus-22>=2.0.0.rc27, <3.0.0",
  );
});

test("cdk8s-plus-22 pinning", () => {
  // GIVEN
  const project = new Cdk8sPythonApp({
    authorEmail: "test@cdk8spythonapp.com",
    authorName: "First Last",
    moduleName: "test_cdk8s_python_app_project",
    name: "test-cdk8s-python-app-project",
    version: "0.1.0",
    cdk8sVersion: "2.3.33",
    cdk8sPlusVersion: "2.0.0-rc.26",
    cdk8sPlusVersionPinning: true,
  });

  // WHEN
  const output = synthSnapshot(project);

  // THEN
  expect(output["requirements.txt"]).toContain("cdk8s-plus-22==2.0.0.rc26");
});
