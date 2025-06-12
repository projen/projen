import { NodeProject } from "../../../src/javascript";
import { StylisticConfig } from "../../../src/javascript/eslint/config/stylistic-config";
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
      enablePatterns: ["**/*.ts"],
      styleConfig: new StylisticConfig(project),
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
      enablePatterns: ["**/*.ts"],
      styleConfig: new StylisticConfig(project),
    });

    // THEN
    const config = synthSnapshot(project)["eslint.config.mjs"];
    expect(eslint.filename).toBe("eslint.config.mjs");
    expect(config).toContain('import globals from "globals"');
    expect(config).toContain("export default");
  });

  test("uses commonjs type with .cjs extension", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    const eslint = new EslintFlatConfigFile(project, {
      enablePatterns: ["**/*.ts"],
      styleConfig: new StylisticConfig(project),
      moduleType: "commonjs",
    });

    // THEN
    const config = synthSnapshot(project)["eslint.config.cjs"];
    expect(eslint.filename).toBe("eslint.config.cjs");
    expect(config).toContain('const globals = require("globals")');
    expect(config).toContain("module.exports =");
  });

  test("tsAlwaysTryTypes", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    const eslint = new EslintFlatConfigFile(project, {
      enablePatterns: ["**/*.ts", "**/*.tsx"],
      styleConfig: new StylisticConfig(project),
      tsAlwaysTryTypes: true,
    });
    eslint.synthesize();

    // THEN
    const pattern =
      /settings:\s*{[\s\S]*?"import\/resolver":\s*{(\s*typescript:\s*{[\s\S]*?})\s*}[\s\S]*?}/;
    expect(eslint.config).toMatch(pattern);
    expect(eslint.config.match(pattern)![0]).toContain("alwaysTryTypes: true");
  });

  test("devDirs", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    const eslint = new EslintFlatConfigFile(project, {
      enablePatterns: ["**/*.ts", "**/*.tsx"],
      styleConfig: new StylisticConfig(project),
      devDirs: ["src/foo", "src/bar"],
    });
    eslint.synthesize();

    // THEN
    expect(eslint.enablePatterns.includes("src/foo")).toStrictEqual(true);
    expect(eslint.enablePatterns.includes("src/bar")).toStrictEqual(true);
    expect(eslint.rules["import/no-extraneous-dependencies"]).toEqual([
      "error",
      {
        devDependencies: ["**/src/foo/**", "**/src/bar/**"],
        optionalDependencies: false,
        peerDependencies: true,
      },
    ]);
  });

  test("manages enable patterns correctly", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    const eslint = new EslintFlatConfigFile(project, {
      enablePatterns: ["**/*.ts", "**/*.tsx"],
      styleConfig: new StylisticConfig(project),
    });

    // THEN
    expect(eslint.enablePatterns).toEqual(["**/*.ts", "**/*.tsx"]);
  });

  test("can add enable patterns", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    const eslint = new EslintFlatConfigFile(project, {
      enablePatterns: ["**/*.ts"],
      styleConfig: new StylisticConfig(project),
    });

    // WHEN
    eslint.addEnablePatterns("**/*.tsx", "src/**/*.js");

    // THEN
    expect(eslint.enablePatterns).toContain("**/*.ts");
    expect(eslint.enablePatterns).toContain("**/*.tsx");
    expect(eslint.enablePatterns).toContain("src/**/*.js");
  });

  test("manages ignore patterns with defaults", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    const eslint = new EslintFlatConfigFile(project, {
      enablePatterns: ["**/*.ts"],
      styleConfig: new StylisticConfig(project),
    });

    // THEN
    const expected = [
      "*.js",
      "*.d.ts",
      "node_modules/",
      "*.generated.ts",
      "coverage",
    ];
    expect(eslint.ignorePatterns).toEqual(expect.arrayContaining(expected));
  });

  test("can override default ignore patterns", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    const eslint = new EslintFlatConfigFile(project, {
      enablePatterns: ["**/*.ts"],
      ignorePatterns: ["dist/**", "build/**"],
      styleConfig: new StylisticConfig(project),
    });

    // THEN
    expect(eslint.ignorePatterns).toEqual(["dist/**", "build/**"]);
  });

  test("can add ignore patterns", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    const eslint = new EslintFlatConfigFile(project, {
      enablePatterns: ["**/*.ts"],
      styleConfig: new StylisticConfig(project),
    });

    // WHEN
    eslint.addIgnorePatterns("temp/**", "*.tmp");

    // THEN
    expect(eslint.ignorePatterns).toContain("temp/**");
    expect(eslint.ignorePatterns).toContain("*.tmp");
  });

  test("can add rules", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    const eslint = new EslintFlatConfigFile(project, {
      enablePatterns: ["**/*.ts", "**/*.tsx"],
      styleConfig: new StylisticConfig(project),
    });
    eslint.addRules({
      "@typescript-eslint/no-require-imports": "off",
      "import/no-extraneous-dependencies": "off",
    });

    // THEN
    expect(eslint.rules["@typescript-eslint/no-require-imports"]).toEqual(
      "off"
    );
    expect(eslint.rules["import/no-extraneous-dependencies"]).toEqual("off");
  });

  test("can add plugins", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    const eslint = new EslintFlatConfigFile(project, {
      enablePatterns: ["**/*.ts", "**/*.tsx"],
      styleConfig: new StylisticConfig(project),
    });
    eslint.addPlugins({
      moduleSpecifier: "eslint-plugin-foo",
      importedBinding: "fooPlugin",
      pluginAlias: "foo",
    });
    eslint.synthesize();

    // THEN
    const pattern = /plugins:\s*{[\s\S]*?}/;
    expect(eslint.config).toMatch(pattern);
    expect(eslint.config.match(pattern)![0]).toContain('"foo": fooPlugin');
  });

  test("can add extends", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    const eslint = new EslintFlatConfigFile(project, {
      enablePatterns: ["**/*.ts", "**/*.tsx"],
      styleConfig: new StylisticConfig(project),
    });
    eslint.addExtends({
      moduleSpecifier: "typescript-eslint",
      importedBinding: "tseslint",
      configReference: "tseslint.config.recommended",
      spreadConfig: true,
    });
    eslint.synthesize();

    // THEN
    expect(eslint.config).toMatch(
      /export\s+default\s+\[[\s\S]*?\.\.\.tseslint\.config\.recommended[\s\S]*?\]/
    );
  });

  test("can add overrides", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    const eslint = new EslintFlatConfigFile(project, {
      enablePatterns: ["**/*.ts"],
      styleConfig: new StylisticConfig(project),
    });

    // WHEN
    eslint.addOverrides({
      enablePatterns: ["**/*.test.ts"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
      },
    });

    // THEN
    expect(eslint.overrides).toHaveLength(1);
    expect(eslint.overrides[0].enablePatterns).toEqual(["**/*.test.ts"]);
    expect(eslint.overrides[0].rules).toEqual({
      "@typescript-eslint/no-explicit-any": "off",
    });
  });

  test("uses default tsconfig path", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    const eslint = new EslintFlatConfigFile(project, {
      enablePatterns: ["**/*.ts"],
      styleConfig: new StylisticConfig(project),
    });

    // THEN
    const config = eslint.config;
    expect(config).toContain('project: "./tsconfig.json"');
  });

  test("can override tsconfig path", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    const eslint = new EslintFlatConfigFile(project, {
      enablePatterns: ["**/*.ts"],
      tsconfigPath: "./custom-tsconfig.json",
      styleConfig: new StylisticConfig(project),
    });

    // THEN
    const config = eslint.config;
    expect(config).toContain('project: "./custom-tsconfig.json"');
  });

  test("includes alwaysTryTypes by default", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    const eslint = new EslintFlatConfigFile(project, {
      enablePatterns: ["**/*.ts"],
      styleConfig: new StylisticConfig(project),
    });

    // THEN
    const config = eslint.config;
    expect(config).toContain("alwaysTryTypes: true");
  });

  test("can disable alwaysTryTypes", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    const eslint = new EslintFlatConfigFile(project, {
      enablePatterns: ["**/*.ts"],
      tsAlwaysTryTypes: false,
      styleConfig: new StylisticConfig(project),
    });

    // THEN
    const config = eslint.config;
    expect(config).not.toContain("alwaysTryTypes: true");
  });
});
