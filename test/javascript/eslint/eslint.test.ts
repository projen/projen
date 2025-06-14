import { NodeProject } from "../../../src/javascript";
import { PrettierConfig } from "../../../src/javascript/eslint/config/prettier-config";
import { StylisticConfig } from "../../../src/javascript/eslint/config/stylistic-config";
import { ESLint } from "../../../src/javascript/eslint/eslint";
import { synthSnapshot } from "../../util";

describe("snapshot tests", () => {
  test("basic configuration with stylistic formatting", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    new ESLint(project, {
      enablePatterns: ["**/*.ts", "**/*.tsx"],
      styleConfig: new StylisticConfig(project),
    });

    // THEN
    expect(synthSnapshot(project)["eslint.config.mjs"]).toMatchSnapshot();
  });

  test("configuration with prettier formatting", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    new ESLint(project, {
      enablePatterns: ["**/*.ts", "**/*.tsx"],
      styleConfig: new PrettierConfig(project),
    });

    // THEN
    expect(synthSnapshot(project)["eslint.config.mjs"]).toMatchSnapshot();
  });

  test("commonjs module type", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    new ESLint(project, {
      enablePatterns: ["**/*.ts", "**/*.tsx"],
      styleConfig: new StylisticConfig(project),
      moduleType: "commonjs",
    });

    // THEN
    expect(synthSnapshot(project)["eslint.config.cjs"]).toMatchSnapshot();
  });

  test("with devDirs configuration", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    new ESLint(project, {
      enablePatterns: ["**/*.ts", "**/*.tsx"],
      devDirs: ["test", "scripts"],
      styleConfig: new StylisticConfig(project),
    });

    // THEN
    expect(synthSnapshot(project)["eslint.config.mjs"]).toMatchSnapshot();
  });
});

describe("eslint command options", () => {
  test("include `--fix` flag when fix is enabled", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    const eslint = new ESLint(project, {
      enablePatterns: ["**/*.ts", "**/*.tsx"],
      styleConfig: new StylisticConfig(project),
      commandOptions: { fix: true },
    });
    eslint.synthesize();

    // THEN
    expect(eslint.task.steps[0].exec).toContain("--fix");
  });

  test("can add external args", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    const eslint = new ESLint(project, {
      enablePatterns: ["**/*.ts", "**/*.tsx"],
      styleConfig: new StylisticConfig(project),
      commandOptions: { extraArgs: ["--cache"] },
    });
    eslint.synthesize();

    // THEN
    expect(eslint.task.steps[0].exec).toContain("--cache");
  });

  test("synthesize", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    const eslint = new ESLint(project, {
      enablePatterns: ["**/*.ts", "**/*.tsx"],
      styleConfig: new StylisticConfig(project),
    });
    eslint.config.addRules({ "no-console": "warn" });
    eslint.synthesize();

    // THEN
    expect(eslint.file.content).toMatch(/"no-console": "warn"/);
  });
});
