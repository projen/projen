import { EslintFlatConfig, NodeProject } from "../../src/javascript";
import { synthSnapshot } from "../util";

describe("snapshot", () => {
  test("enable prettier", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    const eslint = new EslintFlatConfig(project, {
      enablePatterns: ["**/*.ts", "**/*.tsx"],
      prettier: true,
    });
    eslint.synthesize();

    // THEN
    expect(synthSnapshot(project)["eslint.config.mjs"]).toMatchSnapshot();
  });

  test("disable prettier", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    const eslint = new EslintFlatConfig(project, {
      enablePatterns: ["**/*.ts", "**/*.tsx"],
    });
    eslint.synthesize();

    // THEN
    expect(synthSnapshot(project)["eslint.config.mjs"]).toMatchSnapshot();
  });

  test("commonjs", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    const eslint = new EslintFlatConfig(project, {
      enablePatterns: ["**/*.ts", "**/*.tsx"],
      moduleType: "commonjs",
    });
    eslint.synthesize();

    // THEN
    expect(synthSnapshot(project)["eslint.config.cjs"]).toMatchSnapshot();
  });

  test("override setting", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    const eslint = new EslintFlatConfig(project, {
      enablePatterns: ["**/*.ts", "**/*.tsx"],
      prettier: true,
    });
    eslint.addOverrides({
      enablePatterns: ["projenrc.ts"],
      rules: {
        "@typescript-eslint/no-require-imports": "off",
        "import/no-extraneous-dependencies": "off",
      },
      parser: {
        importPath: "typescript-eslint",
        moduleName: "tsEslint",
        parserReference: "tsEslint.parser",
      },
    });
    eslint.synthesize();

    // THEN
    expect(synthSnapshot(project)["eslint.config.mjs"]).toMatchSnapshot();
  });
});

describe("eslint settings", () => {
  test("alias", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    const eslint = new EslintFlatConfig(project, {
      enablePatterns: ["**/*.ts", "**/*.tsx"],
      aliasMap: {
        "@src": "./src",
        "@foo": "./src/foo",
      },
      aliasExtensions: [".ts", ".tsx"],
    });
    eslint.synthesize();

    // THEN
    const pattern =
      /settings:\s*{[\s\S]*?"import\/resolver":\s*{([\s\S]*?)}[\s\S]*?}/;
    const settingsMatch = eslint.config.match(pattern);
    expect(settingsMatch).not.toBeNull();
    expect(settingsMatch![0]).toContain(
      '"alias":{"map":[["@src","./src"],["@foo","./src/foo"]],"extensions":[".ts",".tsx"]}'
    );
  });

  test("tsAlwaysTryTypes", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    const eslint = new EslintFlatConfig(project, {
      enablePatterns: ["**/*.ts", "**/*.tsx"],
      tsAlwaysTryTypes: true,
    });
    eslint.synthesize();

    // THEN
    const pattern =
      /settings:\s*{[\s\S]*?"import\/resolver":\s*{(\s*typescript:\s*{[\s\S]*?})\s*}[\s\S]*?}/;
    const settingsMatch = eslint.config.match(pattern);
    expect(settingsMatch).not.toBeNull();
    expect(settingsMatch![0]).toContain("alwaysTryTypes: true");
  });

  test("devDirs", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    const eslint = new EslintFlatConfig(project, {
      enablePatterns: ["**/*.ts", "**/*.tsx"],
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

  test("can add enable patterns", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    const eslint = new EslintFlatConfig(project, {
      enablePatterns: ["**/*.ts", "**/*.tsx"],
    });
    eslint.addEnablePatterns("src/foo", "src/bar");

    // THEN
    expect(eslint.enablePatterns.includes("src/foo")).toStrictEqual(true);
    expect(eslint.enablePatterns.includes("src/bar")).toStrictEqual(true);
  });

  test("can add ignore patterns", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    const eslint = new EslintFlatConfig(project, {
      enablePatterns: ["**/*.ts", "**/*.tsx"],
    });
    eslint.addIgnorePatterns("src/foo", "src/bar");

    // THEN
    expect(eslint.ignorePatterns.includes("src/foo")).toStrictEqual(true);
    expect(eslint.ignorePatterns.includes("src/bar")).toStrictEqual(true);
  });

  test("can add rules", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    const eslint = new EslintFlatConfig(project, {
      enablePatterns: ["**/*.ts", "**/*.tsx"],
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
    const eslint = new EslintFlatConfig(project, {
      enablePatterns: ["**/*.ts", "**/*.tsx"],
    });
    eslint.addPlugins({
      importPath: "eslint-plugin-foo",
      moduleName: "fooPlugin",
      pluginAlias: "foo",
    });
    eslint.synthesize();

    // THEN
    const pattern = /plugins:\s*{[\s\S]*?}/;
    const pluginMatch = eslint.config.match(pattern);
    expect(pluginMatch).not.toBeNull();
    expect(pluginMatch![0]).toContain('"foo": fooPlugin');
  });

  test("can add extends", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    const eslint = new EslintFlatConfig(project, {
      enablePatterns: ["**/*.ts", "**/*.tsx"],
    });
    eslint.addExtends({
      importPath: "typescript-eslint",
      moduleName: "tseslint",
      configReference: "tseslint.config.recommended",
      shouldSpreadConfig: true,
    });
    eslint.synthesize();

    // THEN
    const pattern =
      /export\s+default\s+\[[\s\S]*?,\s*(\.{3}tseslint\.config\.recommended)[\s\S]*?\]/;
    expect(pattern.test(eslint.config)).toStrictEqual(true);
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
    const eslint = new EslintFlatConfig(project, {
      enablePatterns: ["**/*.ts", "**/*.tsx"],
      commandOptions: { fix: true },
    });
    eslint.synthesize();

    // THEN
    expect(eslint.eslintTask.steps[0].exec).toContain("--fix");
  });

  test("can add external args", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    const eslint = new EslintFlatConfig(project, {
      enablePatterns: ["**/*.ts", "**/*.tsx"],
      commandOptions: { extraArgs: ["--cache"] },
    });
    eslint.synthesize();

    // THEN
    expect(eslint.eslintTask.steps[0].exec).toContain("--cache");
  });
});
