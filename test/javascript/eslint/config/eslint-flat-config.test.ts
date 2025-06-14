import { NodeProject } from "../../../../src/javascript";
import { EslintFlatConfig } from "../../../../src/javascript/eslint/config/eslint-flat-config";

describe("eslint setting", () => {
  test("devDirs", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    const eslint = new EslintFlatConfig(project, {
      devDirs: ["src/foo", "src/bar"],
    });

    // THEN
    expect(eslint.enablePatterns.includes("src/foo")).toEqual(true);
    expect(eslint.enablePatterns.includes("src/bar")).toEqual(true);
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
    const eslint = new EslintFlatConfig(project);

    // WHEN
    eslint.addEnablePatterns("**/*.ts", "**/*.tsx", "src/**/*.js");

    // THEN
    expect(eslint.enablePatterns).toContain("**/*.ts");
    expect(eslint.enablePatterns).toContain("**/*.tsx");
    expect(eslint.enablePatterns).toContain("src/**/*.js");
  });

  test("can add ignore patterns", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });
    const eslint = new EslintFlatConfig(project);

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
    const eslint = new EslintFlatConfig(project);

    // WHEN
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
    const eslint = new EslintFlatConfig(project);

    // WHEN
    eslint.addPlugins({
      moduleSpecifier: "eslint-plugin-foo",
      importedBinding: "foo",
      pluginAlias: "foo",
    });

    // THEN
    expect(eslint.plugins).toContainEqual({
      moduleSpecifier: "eslint-plugin-foo",
      importedBinding: "foo",
      pluginAlias: "foo",
    });
  });

  test("can add extensions", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });
    const eslint = new EslintFlatConfig(project);

    // WHEN
    eslint.addExtensions({
      moduleSpecifier: "typescript-eslint",
      importedBinding: "tseslint",
      configReference: "tseslint.config.recommended",
      spreadConfig: true,
    });

    // THEN
    expect(eslint.extensions).toContainEqual({
      moduleSpecifier: "typescript-eslint",
      importedBinding: "tseslint",
      configReference: "tseslint.config.recommended",
      spreadConfig: true,
    });
  });
});
