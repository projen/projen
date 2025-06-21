import { NodeProject } from "../../../src/javascript";
import { EslintFlatConfig } from "../../../src/javascript/eslint/config/eslint-flat-config";
import { EslintFlatConfigFile } from "../../../src/javascript/eslint/eslint-flat-config-file";
import { synthSnapshot } from "../../util";

describe("static methods", () => {
  test("of() returns eslint component if exists", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    const eslint = new EslintFlatConfigFile(project, {
      config: new EslintFlatConfig(project),
    });

    // THEN
    expect(EslintFlatConfigFile.of(project)).toBe(eslint);
  });

  test("of() returns undefined if no eslint component", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN & THEN
    expect(EslintFlatConfigFile.of(project)).toBeUndefined();
  });
});

describe("eslint setting", () => {
  test("defaults to module type with .mjs extension", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    const eslint = new EslintFlatConfigFile(project, {
      config: new EslintFlatConfig(project),
    });

    // THEN
    const file = synthSnapshot(project)["eslint.config.mjs"];
    expect(eslint.filename).toBe("eslint.config.mjs");
    expect(file).toContain('import globals from "globals"');
    expect(file).toContain("export default");
  });

  test("uses commonjs type with .cjs extension", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    const eslint = new EslintFlatConfigFile(project, {
      config: new EslintFlatConfig(project),
      moduleType: "commonjs",
    });

    // THEN
    const file = synthSnapshot(project)["eslint.config.cjs"];
    expect(eslint.filename).toBe("eslint.config.cjs");
    expect(file).toContain('const globals = require("globals")');
    expect(file).toContain("module.exports =");
  });

  test("uses default tsconfig path", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    const eslint = new EslintFlatConfigFile(project, {
      config: new EslintFlatConfig(project),
    });

    // THEN
    const content = eslint.content;
    expect(content).toContain('project: "./tsconfig.json"');
  });

  test("can override tsconfig path", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    const eslint = new EslintFlatConfigFile(project, {
      config: new EslintFlatConfig(project),
      tsconfigPath: "./custom-tsconfig.json",
    });

    // THEN
    const content = eslint.content;
    expect(content).toContain('project: "./custom-tsconfig.json"');
  });

  test("includes alwaysTryTypes by default", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    const eslint = new EslintFlatConfigFile(project, {
      config: new EslintFlatConfig(project),
    });

    // THEN
    const config = eslint.content;
    expect(config).toContain('"alwaysTryTypes": true');
  });

  test("can disable alwaysTryTypes", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    const eslint = new EslintFlatConfigFile(project, {
      config: new EslintFlatConfig(project),
      tsAlwaysTryTypes: false,
    });

    // THEN
    const content = eslint.content;
    expect(content).not.toContain("alwaysTryTypes: true");
  });

  test("can update config", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });
    const config = new EslintFlatConfig(project);
    const eslint = new EslintFlatConfigFile(project, {
      config,
    });

    // WHEN
    config.addRules({
      "no-console": "error",
    });
    eslint.updateConfig(config);
    eslint.synthesize();

    // THEN
    expect(eslint.content).toMatch(/"no-console": "error"/);
  });
});
