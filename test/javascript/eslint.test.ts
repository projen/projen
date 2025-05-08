import { TaskRuntime } from "../../src";
import { Eslint, NodeProject } from "../../src/javascript";
import { TypeScriptProject } from "../../src/typescript";
import { execProjenCLI, synthSnapshot } from "../util";

test.each([
  ["prettier is off", false],
  ["prettier is on", true],
])("eslint task passes with default config: %s", (_, prettier) => {
  const project = new TypeScriptProject({
    name: "test",
    defaultReleaseBranch: "master",
    eslint: true,
    prettier,
  });
  project.synth();

  // THEN
  execProjenCLI(project.outdir, ["eslint"]);
});

test("can acceess file", () => {
  // GIVEN
  const project = new NodeProject({
    name: "test",
    defaultReleaseBranch: "master",
  });

  const eslint = new Eslint(project, {
    dirs: ["mysrc"],
    lintProjenRc: false,
  });

  // WHEN
  eslint.file.addOverride("env.foo", "bar");

  // THEN
  const output = synthSnapshot(project)[".eslintrc.json"];
  expect(output.env).toHaveProperty("foo", "bar");
});

describe("prettier", () => {
  test("snapshot", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
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
      name: "test",
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

describe("eslint settings", () => {
  test("devdirs", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
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

  test("tsAlwaysTryTypes", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
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
      name: "test",
      defaultReleaseBranch: "master",
      prettier: true,
    });

    // WHEN
    const eslint = new Eslint(project, {
      dirs: ["src"],
      lintProjenRc: false,
    });

    eslint.addExtends("plugin:some-plugin/recommended");

    // THEN
    const output = synthSnapshot(project);

    // Prettier should be last in the extends array
    const extendsArray = output[".eslintrc.json"].extends;
    expect(extendsArray).toEqual([
      "plugin:import/typescript",
      "plugin:some-plugin/recommended",
      "plugin:prettier/recommended",
    ]);
  });

  test("not setting sortExtends should correctly produce the default order", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    const eslint = new Eslint(project, {
      dirs: ["src"],
      lintProjenRc: false,
    });

    // Add the prettier plugins in the incorrect order
    eslint.addExtends("prettier");
    eslint.addExtends("plugin:prettier/recommended");

    // Add some other plugins
    eslint.addExtends("plugin:some-plugin/recommended");
    eslint.addExtends("plugin:a-second-plugin/recommended");

    // THEN
    const output = synthSnapshot(project);
    const extendsArray = output[".eslintrc.json"].extends;

    expect(extendsArray).toEqual([
      "plugin:import/typescript", // always added

      // Should stay in order they were added into
      "plugin:some-plugin/recommended",
      "plugin:a-second-plugin/recommended",

      // ordered according to best practices
      "plugin:prettier/recommended",
      "prettier",
    ]);
  });

  test("setting sortExtends to a meaningless comparer should leave the extends array order alone", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
      prettier: true,
    });

    // WHEN
    const eslint = new Eslint(project, {
      dirs: ["src"],
      lintProjenRc: false,
      sortExtends: {
        compare: () => 0,
      },
    });

    eslint.addExtends("plugin:some-plugin/recommended");

    // THEN
    const output = synthSnapshot(project);

    const extendsArray = output[".eslintrc.json"].extends;

    expect(extendsArray).toEqual([
      "plugin:import/typescript",
      "plugin:prettier/recommended",
      "plugin:some-plugin/recommended",
    ]);
  });

  test("setting sortExtends to a comparer should use that to sort the extends array", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
      prettier: true,
    });

    // WHEN
    const eslint = new Eslint(project, {
      dirs: ["src"],
      lintProjenRc: false,
      sortExtends: {
        // Backwards alphanumeric
        compare: (a, b) => b.localeCompare(a),
      },
    });

    eslint.addExtends("plugin:some-plugin/recommended");

    // THEN
    const output = synthSnapshot(project);

    const extendsArray = output[".eslintrc.json"].extends;

    expect(extendsArray).toEqual([
      "plugin:some-plugin/recommended",
      "plugin:prettier/recommended",
      "plugin:import/typescript",
    ]);
  });

  test("can output yml instead of json", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
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
      name: "test",
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
      name: "test",
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
    expect(eslint.eslintTask._renderSpec()).toMatchObject(
      manifest.tasks.eslint
    );
  });

  test("excludes --fix flag when fix is disabled", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
      prettier: true,
    });

    // WHEN
    const eslint = new Eslint(project, {
      dirs: ["src"],
      commandOptions: { fix: false },
    });

    // THEN
    const taskStep = eslint.eslintTask.steps[0];
    expect(taskStep.exec).not.toContain("--fix");
    expect(taskStep?.args ?? []).not.toContain(
      expect.stringContaining("--fix")
    );
  });

  test("omit --ext when no extensions are specified", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
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
    expect(taskStep?.args ?? []).not.toContain(
      expect.stringContaining("--ext")
    );
  });

  test("add --ext when extensions are specified", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
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

  test("supports specifying extra task args", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
      prettier: true,
    });

    // WHEN
    const eslint = new Eslint(project, {
      dirs: ["src"],
      commandOptions: { extraArgs: ["--cache"] },
    });

    // THEN
    const taskStep = eslint.eslintTask.steps[0];
    expect(taskStep.exec).toContain("--cache");
  });

  test("allow modification of the eslint task", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
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
});
