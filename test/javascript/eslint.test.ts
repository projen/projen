import { Eslint, NodeProject } from "../../src/javascript";
import { synthSnapshot } from "../util";

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

  test("error on formatting when enabled", () => {
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
    const output = synthSnapshot(project);
    expect(output[".eslintrc.json"].rules).toHaveProperty("prettier/prettier", [
      "error",
    ]);
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
  new Eslint(project, {
    dirs: ["src"],
  });

  // THEN
  const output = synthSnapshot(project);
  expect(output[".eslintrc.json"].rules).toMatchObject({
    "prettier/prettier": ["error"],
  });
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
  const output = synthSnapshot(project);
  eslint.addOverride({
    files: ["*.json", "*.json5", "*.jsonc"],
    parser: "jsonc-eslint-parser",
  });

  // THEN
  expect(output[".eslintrc.json"].overrides).toContain({
    files: ["*.json", "*.json5", "*.jsonc"],
    parser: "jsonc-eslint-parser",
  });
});
