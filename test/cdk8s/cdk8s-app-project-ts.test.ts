import * as yaml from "yaml";
import { TaskRuntime, cdk8s } from "../../src";
import { synthSnapshot } from "../util";

test("test if cdk8s synth is possible", () => {
  const project = new cdk8s.Cdk8sTypeScriptApp({
    cdk8sVersion: "1.0.0-beta.18",
    name: "project",
    defaultReleaseBranch: "main",
    releaseWorkflow: true,
    constructsVersion: "3.3.75",
  });

  const output = synthSnapshot(project);

  // expect a synth script
  expect(output["package.json"].scripts.synth).toContain("npx projen synth");

  // expect a synth task
  expect(output[".projen/tasks.json"].tasks.synth.steps).toStrictEqual([
    {
      exec: "cdk8s synth",
    },
  ]);

  // expect an import task
  expect(output[".projen/tasks.json"].tasks.import.steps).toStrictEqual([
    {
      exec: "cdk8s import -o src/imports",
    },
  ]);

  // expect cdk8s.yaml to contain the k8s import
  expect(yaml.parse(output["cdk8s.yaml"])).toStrictEqual({
    app: "node lib/main.js",
    imports: ["k8s"],
    language: "typescript",
  });

  // expect postcompile step to contain synth
  expect(
    output[".projen/tasks.json"].tasks["post-compile"].steps
  ).toStrictEqual([{ spawn: "synth" }]);

  expect(output["package.json"].dependencies).toStrictEqual({
    cdk8s: "^1.0.0-beta.18",
    constructs: "^3.3.75",
    "cdk8s-plus-22": "~1.0.0-beta.222",
  });
});

test("adding cdk8sImports", () => {
  const project = new cdk8s.Cdk8sTypeScriptApp({
    cdk8sVersion: "1.0.0-beta.18",
    name: "project",
    defaultReleaseBranch: "main",
    releaseWorkflow: true,
    constructsVersion: "3.3.75",
    k8sSpecVersion: "1.20.0",
    cdk8sImports: ["github:crossplane/crossplane@0.14.0"],
  });

  // WHEN
  const output = synthSnapshot(project);

  // THEN
  expect(output[".projen/tasks.json"].tasks.import.steps).toStrictEqual([
    {
      exec: "cdk8s import -o src/imports",
    },
  ]);
  expect(yaml.parse(output["cdk8s.yaml"])).toStrictEqual({
    app: "node lib/main.js",
    imports: ["k8s@1.20.0", "github:crossplane/crossplane@0.14.0"],
    language: "typescript",
  });
});

test("constructs version undefined", () => {
  const project = new cdk8s.Cdk8sTypeScriptApp({
    cdk8sVersion: "1.0.0-beta.11",
    name: "project",
    defaultReleaseBranch: "main",
    releaseWorkflow: true,
  });

  const output = synthSnapshot(project);

  expect(output["package.json"].dependencies).toStrictEqual({
    cdk8s: "^1.0.0-beta.11",
    constructs: "^3.4.39",
    "cdk8s-plus-22": "~1.0.0-beta.222",
  });
});

test("constructs version pinning", () => {
  const project = new cdk8s.Cdk8sTypeScriptApp({
    cdk8sVersion: "1.0.0-beta.18",
    name: "project",
    defaultReleaseBranch: "main",
    releaseWorkflow: true,
    constructsVersion: "3.3.75",
    constructsVersionPinning: true,
  });

  const output = synthSnapshot(project);

  expect(output["package.json"].dependencies).toStrictEqual({
    cdk8s: "^1.0.0-beta.18",
    constructs: "3.3.75",
    "cdk8s-plus-22": "~1.0.0-beta.222",
  });
});

test("cdk8sPlusVersion undefined", () => {
  const project = new cdk8s.Cdk8sTypeScriptApp({
    cdk8sVersion: "1.0.0-beta.11",
    name: "project",
    defaultReleaseBranch: "main",
    releaseWorkflow: true,
    constructsVersion: "3.3.75",
  });

  const output = synthSnapshot(project);

  expect(output["package.json"].dependencies).toStrictEqual({
    cdk8s: "^1.0.0-beta.11",
    constructs: "^3.3.75",
    "cdk8s-plus-22": "~1.0.0-beta.222",
  });
});

test("cdk8sPlusVersion defined", () => {
  const project = new cdk8s.Cdk8sTypeScriptApp({
    cdk8sVersion: "1.0.0-beta.11",
    name: "project",
    defaultReleaseBranch: "main",
    releaseWorkflow: true,
    constructsVersion: "3.3.75",
    cdk8sPlusVersion: "1.0.0-beta.200",
  });

  const output = synthSnapshot(project);

  expect(output["package.json"].dependencies).toStrictEqual({
    cdk8s: "^1.0.0-beta.11",
    constructs: "^3.3.75",
    "cdk8s-plus-22": "~1.0.0-beta.200",
  });
});

test("cdk8sPlusVersion pinning", () => {
  const project = new cdk8s.Cdk8sTypeScriptApp({
    cdk8sVersion: "1.0.0-beta.11",
    name: "project",
    defaultReleaseBranch: "main",
    cdk8sPlusVersionPinning: true,
    releaseWorkflow: true,
    constructsVersion: "3.3.75",
  });

  const output = synthSnapshot(project);

  expect(output["package.json"].dependencies).toStrictEqual({
    cdk8s: "^1.0.0-beta.11",
    constructs: "^3.3.75",
    "cdk8s-plus-22": "1.0.0-beta.222",
  });
});

test("upgrade task ignores pinned versions", () => {
  const project = new cdk8s.Cdk8sTypeScriptApp({
    cdk8sVersion: "1.0.0-beta.11",
    name: "project",
    defaultReleaseBranch: "main",
    constructsVersionPinning: true,
    cdk8sVersionPinning: true,
    cdk8sCliVersionPinning: true,
    cdk8sPlusVersionPinning: true,
    releaseWorkflow: true,
    constructsVersion: "3.3.75",
  });
  const tasks = synthSnapshot(project)[TaskRuntime.MANIFEST_FILE].tasks;
  expect(tasks.upgrade.steps[1].exec).toStrictEqual(
    "npm-check-updates --dep dev --upgrade --target=minor --reject='cdk8s-cli,cdk8s-plus-22,cdk8s,constructs,projen'"
  );
});
