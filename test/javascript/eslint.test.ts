import { execSync } from "child_process";
import { readFileSync } from "fs";
import * as path from "path";
import { SampleFile, TaskRuntime } from "../../src";
import {
  Eslint,
  EslintConfigFileFormat,
  NodeProject,
} from "../../src/javascript";
import { TypeScriptProject } from "../../src/typescript";
import { synthSnapshot, withProjectDir } from "../util";

test("devdirs", () => {
  // GIVEN
  const project = new NodeProject({
    name: "testProject",
    defaultReleaseBranch: "master",
  });

  // WHEN
  new Eslint(project, {
    devdirs: ["foo", "bar"],
    dirs: ["mysrc"],
    lintProjenRc: false,
  });

  // THEN
  expect(synthSnapshot(project)[".eslintrc.json"]).toMatchSnapshot();
});

describe("prettier", () => {
  test("snapshot", () => {
    // GIVEN
    const project = new NodeProject({
      name: "testProject",
      defaultReleaseBranch: "master",
    });

    // WHEN
    new Eslint(project, {
      dirs: ["mysrc"],
      prettier: true,
      lintProjenRc: false,
    });

    // THEN
    expect(synthSnapshot(project)[".eslintrc.json"]).toMatchSnapshot();
  });
});

describe("alias", () => {
  test("custom config", () => {
    // GIVEN
    const project = new NodeProject({
      name: "testProject",
      defaultReleaseBranch: "master",
    });

    // WHEN
    const eslint = new Eslint(project, {
      dirs: ["mysrc"],
      aliasMap: {
        "@src": "./src",
        "@foo": "./src/foo",
      },
      aliasExtensions: [".ts", ".js"],
      lintProjenRc: false,
    });

    // THEN
    expect(eslint.config.settings["import/resolver"].alias).toHaveProperty(
      "map",
      [
        ["@src", "./src"],
        ["@foo", "./src/foo"],
      ]
    );
    expect(eslint.config.settings["import/resolver"].alias).toHaveProperty(
      "extensions",
      [".ts", ".js"]
    );
  });
});

test("tsAlwaysTryTypes", () => {
  // GIVEN
  const project = new NodeProject({
    name: "testProject",
    defaultReleaseBranch: "master",
  });

  // WHEN
  const eslint = new Eslint(project, {
    dirs: ["mysrc"],
    tsAlwaysTryTypes: true,
    lintProjenRc: false,
  });

  // THEN
  expect(eslint.config.settings["import/resolver"].typescript).toHaveProperty(
    "alwaysTryTypes",
    true
  );
});

test("if the prettier is configured, eslint is configured accordingly", () => {
  // GIVEN
  const project = new NodeProject({
    name: "testProject",
    defaultReleaseBranch: "master",
    prettier: true,
  });

  // WHEN
  new Eslint(project, {
    dirs: ["src"],
    lintProjenRc: false,
  });

  // THEN
  const output = synthSnapshot(project);
  expect(output[".eslintrc.json"].extends).toContain(
    "plugin:prettier/recommended"
  );
});

test("can output yml instead of json", () => {
  // GIVEN
  const project = new NodeProject({
    name: "testProject",
    defaultReleaseBranch: "main",
    prettier: true,
  });

  // WHEN
  new Eslint(project, {
    dirs: ["src"],
    yaml: true,
    lintProjenRc: false,
  });

  // THEN
  const output = synthSnapshot(project);
  expect(output[".eslintrc.yml"]).toBeDefined();
  expect(output[".eslintrc.json"]).toBeUndefined();
});

test("can override the parser", () => {
  // GIVEN
  const project = new NodeProject({
    name: "testProject",
    defaultReleaseBranch: "master",
    prettier: true,
  });

  // WHEN
  const eslint = new Eslint(project, {
    dirs: ["src"],
    lintProjenRc: false,
  });
  eslint.addOverride({
    files: ["*.json", "*.json5", "*.jsonc"],
    parser: "jsonc-eslint-parser",
  });
  const output = synthSnapshot(project);

  // THEN
  expect(output[".eslintrc.json"].overrides).toContainEqual({
    files: ["*.json", "*.json5", "*.jsonc"],
    parser: "jsonc-eslint-parser",
  });
});

test("creates a eslint task", () => {
  // GIVEN
  const project = new NodeProject({
    name: "testProject",
    defaultReleaseBranch: "master",
    prettier: true,
  });

  // WHEN
  const eslint = new Eslint(project, {
    dirs: ["src"],
    lintProjenRc: false,
  });

  // THEN
  const manifest = synthSnapshot(project)[TaskRuntime.MANIFEST_FILE];
  expect(eslint.eslintTask._renderSpec()).toMatchObject(manifest.tasks.eslint);
});

test("omit --ext when no extensions are specified", () => {
  // GIVEN
  const project = new NodeProject({
    name: "testProject",
    defaultReleaseBranch: "master",
    prettier: true,
  });

  // WHEN
  const eslint = new Eslint(project, {
    dirs: ["src"],
    lintProjenRc: false,
    fileExtensions: [],
  });

  // THEN
  const taskStep = eslint.eslintTask.steps[0];
  expect(taskStep.exec).not.toContain("--ext");
  expect(taskStep?.args ?? []).not.toContain(expect.stringContaining("--ext"));
});

test("add --ext when extensions are specified", () => {
  // GIVEN
  const project = new NodeProject({
    name: "testProject",
    defaultReleaseBranch: "master",
    prettier: true,
  });

  // WHEN
  const eslint = new Eslint(project, {
    dirs: ["src"],
    lintProjenRc: false,
  });

  // THEN
  const taskStep = eslint.eslintTask.steps[0];
  expect(taskStep.exec).toContain("--ext");
});

test("allow modification of the eslint task", () => {
  // GIVEN
  const project = new NodeProject({
    name: "testProject",
    defaultReleaseBranch: "master",
    prettier: true,
  });

  // WHEN
  const eslint = new Eslint(project, {
    dirs: ["src"],
    lintProjenRc: false,
  });

  const taskStep = eslint.eslintTask.steps[0];
  const newTestArg = "--foo";
  eslint.eslintTask.reset(taskStep.exec, { args: [newTestArg] });

  eslint.addLintPattern("bar");

  // THEN
  expect(eslint.eslintTask.steps[0].args).toContain(newTestArg);
});

test.each([
  EslintConfigFileFormat.JSON,
  EslintConfigFileFormat.JAVASCRIPT_OLD_CJS,
  EslintConfigFileFormat.JAVASCRIPT_FLAT_CJS,
  EslintConfigFileFormat.JAVASCRIPT_FLAT_ESM,
])(
  "eslint snapshot matches format '%s'",
  (fileFormat: EslintConfigFileFormat) => {
    // GIVEN
    const project = new NodeProject({
      name: "testProject",
      defaultReleaseBranch: "master",
      prettier: true,
    });

    // WHEN
    const eslint = new Eslint(project, {
      dirs: ["src"],
      lintProjenRc: false,
      fileFormat,
    });
    eslint.addExtends("./node_modules/coding-standard/eslintDefaults.js");
    eslint.addExtends("./node_modules/coding-standard/.eslintrc-es6");
    eslint.addExtends("./projen/eslintrc.js");

    const output = synthSnapshot(project);

    // THEN
    expect(output[eslint.fileName]).toMatchSnapshot();
  }
);

test.each([
  EslintConfigFileFormat.JSON,
  EslintConfigFileFormat.YAML,
  EslintConfigFileFormat.JAVASCRIPT_OLD_CJS,
  EslintConfigFileFormat.JAVASCRIPT_FLAT_CJS,
  EslintConfigFileFormat.JAVASCRIPT_FLAT_ESM,
])("eslint runs with %s", (fileFormat: EslintConfigFileFormat) => {
  withProjectDir((projectdir) => {
    const project = new TypeScriptProject({
      defaultReleaseBranch: "main",
      name: "testProject",
      outdir: projectdir,
      eslint: true,
      eslintOptions: {
        fileFormat,
      },
      release: true,
    });
    const testFilename = "src/format-test.ts";
    const contents = "    export  const  foo  =  { 'bar'  :   \"baz\",\n\n }  ";
    new SampleFile(project, testFilename, {
      contents,
    });
    project.synth();

    const fullTestFilename = path.join(projectdir, testFilename);
    expect(readFileSync(fullTestFilename).toString()).toEqual(contents);
    execSync("npx projen eslint", { cwd: projectdir, stdio: "inherit" });
    expect(readFileSync(fullTestFilename).toString()).toEqual(
      "export const foo = { bar: 'baz' };"
    );
  });
});
