import { SourceCode } from "../../src";
import {
  ArrowParens,
  NodeProject,
  PrettierOverride,
  TrailingComma,
} from "../../src/javascript";
import { synthSnapshot } from "../util";

describe("prettier", () => {
  test("snapshot", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
      prettier: true,
      prettierOptions: { settings: { printWidth: 140 } },
    });

    // THEN
    expect(synthSnapshot(project)[".prettierrc.json"]).toMatchSnapshot();
  });

  test("snapshot with ignore", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
      prettier: true,
      prettierOptions: { settings: { printWidth: 140 } },
    });

    project.prettier?.ignoreFile?.addPatterns("build");

    // THEN
    expect(synthSnapshot(project)[".prettierignore"]).toMatchSnapshot();
  });

  test("snapshot with ignore pattern (via prettierOptions)", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
      prettier: true,
      prettierOptions: {
        settings: { printWidth: 140 },
        ignoreFileOptions: { ignorePatterns: ["build"] },
      },
    });

    // THEN
    expect(synthSnapshot(project)[".prettierignore"]).toMatchSnapshot();
  });

  test("sample config is created", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
      prettier: true,
      prettierOptions: {
        settings: {
          trailingComma: TrailingComma.ALL,
          bracketSpacing: true,
          tabWidth: 2,
          semi: true,
          singleQuote: true,
          arrowParens: ArrowParens.ALWAYS,
          printWidth: 140,
          useTabs: false,
          parser: "typescript",
        },
      },
    });

    // THEN
    expect(project.prettier?.settings).toMatchObject({
      trailingComma: "all",
      bracketSpacing: true,
      tabWidth: 2,
      semi: true,
      singleQuote: true,
      arrowParens: "always",
      printWidth: 140,
      useTabs: false,
      parser: "typescript",
    });
  });

  test("snapshot with ignore", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
      prettier: true,
    });
    new SourceCode(project, "src/example.ts");

    // THEN
    expect(synthSnapshot(project)[".prettierignore"]).toMatchSnapshot();
  });

  test("add ignore file to packageIgnore", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
      prettier: true,
    });
    new SourceCode(project, "src/example.ts");

    // THEN
    expect(synthSnapshot(project)[".npmignore"]).toContain(".prettierignore");
  });

  test("overrides", () => {
    // GIVEN
    const override: PrettierOverride = {
      files: "*.js",
      options: { parser: "typescript" },
    };
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
      prettier: true,
    });
    project.prettier?.addOverride(override);

    // THEN
    expect(synthSnapshot(project)[".prettierrc.json"]).toHaveProperty(
      "overrides",
      [override],
    );
  });

  test("can output yml instead of json", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "main",
      prettier: true,
      prettierOptions: {
        yaml: true,
      },
    });

    // THEN
    const output = synthSnapshot(project);
    expect(output[".prettierrc.yml"]).toBeDefined();
    expect(output[".prettierrc.json"]).toBeUndefined();
  });

  test("add prettierrc to packageIgnore", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
      prettier: true,
    });

    // THEN
    expect(synthSnapshot(project)[".npmignore"]).toContain("/.prettierrc.json");
  });

  test("add prettierrc.yml to packageIgnore", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
      prettier: true,
      prettierOptions: {
        yaml: true,
      },
    });

    // THEN
    expect(synthSnapshot(project)[".npmignore"]).toContain("/.prettierrc.yml");
  });
});
