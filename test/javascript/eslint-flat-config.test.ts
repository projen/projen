import { EslintFlatConfig, NodeProject } from "../../src/javascript";
import { synthSnapshot } from "../util";

describe("sample", () => {
  test("snapshot", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    const eslint = new EslintFlatConfig(project, {
      enablePatterns: ["src"],
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
