import { javascript } from "../../src";
import { Eslint, NodeProject } from "../../src/javascript";
import { ProjenTaskRunner } from "../../src/task-runner";
import { TypeScriptProject } from "../../src/typescript";
import { execProjenCLI, simulateProjenNew, synthSnapshot } from "../util";

test.each([
  ["prettier is off", false],
  ["prettier is on", true],
])("eslint task passes with default config: %s", async (_, prettier) => {
  const project = new TypeScriptProject({
    name: "test",
    defaultReleaseBranch: "master",
    packageManager: javascript.NodePackageManager.NPM,
    eslint: true,
    prettier,
  });
  project.synth();

  // THEN
  await execProjenCLI(project.outdir, ["eslint"]);
});

test("can acceess file", () => {
  // GIVEN
  const project = new NodeProject({
    name: "test",
    defaultReleaseBranch: "master",
  });

  const eslint = new Eslint(project, {
    dirs: ["mysrc"],
  });

  // WHEN
  eslint.file.addOverride("env.foo", "bar");

  // THEN
  const output = synthSnapshot(project)[".eslintrc.json"];
  expect(output.env).toHaveProperty("foo", "bar");
});

describe("project service", () => {
  test("pins all files to a single project by default", () => {
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    new Eslint(project, {
      dirs: ["mysrc"],
      tsconfigPath: "tsconfig.json",
    });

    const parserOptions =
      synthSnapshot(project)[".eslintrc.json"].parserOptions;
    expect(parserOptions.project).toEqual("tsconfig.json");
    expect(parserOptions.projectService).toBeUndefined();
  });

  test("enables the typescript-eslint project service", () => {
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    new Eslint(project, {
      dirs: ["mysrc"],
      projectService: true,
    });

    const parserOptions =
      synthSnapshot(project)[".eslintrc.json"].parserOptions;
    expect(parserOptions.projectService).toBe(true);
    expect(parserOptions.project).toBeUndefined();
  });

  test("registers default project files when provided", () => {
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    const eslint = new Eslint(project, {
      dirs: ["mysrc"],
      projectService: true,
      tsconfigPath: "./tsconfig.json",
    });
    eslint.allowDefaultProjectFiles(".projenrc.ts", "scripts/run.ts");

    const parserOptions =
      synthSnapshot(project)[".eslintrc.json"].parserOptions;
    expect(parserOptions.projectService).toStrictEqual({
      allowDefaultProject: [".projenrc.ts", "scripts/run.ts"],
      defaultProject: "./tsconfig.json",
    });
  });
});

test("lintPatterns reflects the configured dirs and devdirs", () => {
  const project = new NodeProject({
    name: "test",
    defaultReleaseBranch: "master",
  });

  const eslint = new Eslint(project, {
    dirs: ["mysrc"],
    devdirs: ["mytest"],
  });

  expect(eslint.lintPatterns).toEqual(
    expect.arrayContaining(["mysrc", "mytest"]),
  );
});

test("lintPatterns is empty when no patterns are configured", () => {
  const project = new NodeProject({
    name: "test",
    defaultReleaseBranch: "master",
  });

  const eslint = new Eslint(project, { dirs: [] });

  expect(eslint.lintPatterns).toEqual([]);
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
    });

    // THEN
    expect(eslint.config.settings["import/resolver"].alias).toHaveProperty(
      "map",
      [
        ["@src", "./src"],
        ["@foo", "./src/foo"],
      ],
    );
    expect(eslint.config.settings["import/resolver"].alias).toHaveProperty(
      "extensions",
      [".ts", ".js"],
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
    });

    // THEN
    expect(eslint.config.settings["import/resolver"].typescript).toHaveProperty(
      "alwaysTryTypes",
      true,
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
    });

    // THEN
    const manifest = synthSnapshot(project)[ProjenTaskRunner.MANIFEST_FILE];
    expect(eslint.eslintTask._renderSpec()).toMatchObject(
      manifest.tasks.eslint,
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
      expect.stringContaining("--fix"),
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
      fileExtensions: [],
    });

    // THEN
    const taskStep = eslint.eslintTask.steps[0];
    expect(taskStep.exec).not.toContain("--ext");
    expect(taskStep?.args ?? []).not.toContain(
      expect.stringContaining("--ext"),
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
    });

    const taskStep = eslint.eslintTask.steps[0];
    const newTestArg = "--foo";
    eslint.eslintTask.reset(taskStep.exec, { args: [newTestArg] });

    eslint.addLintPattern("bar");

    // THEN
    expect(eslint.eslintTask.steps[0].args).toContain(newTestArg);
  });
});

describe("postProjectCreation", () => {
  test("runs the eslint task once the project is created via `projen new`", () => {
    // GIVEN
    const project = simulateProjenNew(
      NodeProject,
      "projen.javascript.NodeProject",
      {
        args: { name: "test" },
      },
    );
    const eslint = new Eslint(project, { dirs: ["src"] });
    const runTask = jest
      .spyOn(project.tasks, "runTask")
      .mockImplementation(() => {});

    // WHEN
    project.synth();

    // THEN
    expect(runTask).toHaveBeenCalledWith(eslint.eslintTask.name);
  });

  test("does not run the eslint task for a project not created via `projen new`", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });
    const eslint = new Eslint(project, { dirs: ["src"] });
    const runTask = jest
      .spyOn(project.tasks, "runTask")
      .mockImplementation(() => {});

    // WHEN
    project.synth();

    // THEN: other tasks (e.g. "install") may run, but not eslint
    expect(runTask).not.toHaveBeenCalledWith(eslint.eslintTask.name);
  });

  test("does not run the eslint task when post-synthesis steps are disabled", () => {
    // GIVEN
    const project = simulateProjenNew(
      NodeProject,
      "projen.javascript.NodeProject",
      {
        args: { name: "test" },
      },
    );
    const eslint = new Eslint(project, { dirs: ["src"] });
    const runTask = jest
      .spyOn(project.tasks, "runTask")
      .mockImplementation(() => {});

    // WHEN
    synthSnapshot(project);

    // THEN
    expect(runTask).not.toHaveBeenCalledWith(eslint.eslintTask.name);
  });
});
