import { EslintConfigFile } from "../../../src/javascript/eslint/flat-config-file";
import { ModuleType } from "../../../src/javascript/module-type";
import { ModuleImports } from "../../../src/javascript/private/modules";
import { Project } from "../../../src/project";
import { synthSnapshot } from "../../util";

describe("EslintConfigFile", () => {
  let project: Project;

  beforeEach(() => {
    project = new Project({
      name: "test-project",
    });
  });

  test("creates ESM config file by default", () => {
    const configFile = new EslintConfigFile(project, {});

    expect(configFile.path).toBe("eslint.config.mjs");
  });

  test("creates CommonJS config file when specified", () => {
    const configFile = new EslintConfigFile(project, {
      moduleType: ModuleType.COMMON_JS,
    });

    expect(configFile.path).toBe("eslint.config.cjs");
  });

  test("generates basic ESM config", () => {
    new EslintConfigFile(project, {});

    const output = synthSnapshot(project);
    const content = output["eslint.config.mjs"];

    expect(content).toContain('import { defineConfig } from "eslint/config";');
    expect(content).toContain("export default defineConfig(");
    expect(content).toContain(");");
  });

  test("generates basic CommonJS config", () => {
    new EslintConfigFile(project, {
      moduleType: ModuleType.COMMON_JS,
    });

    const output = synthSnapshot(project);
    const content = output["eslint.config.cjs"];

    expect(content).toContain(
      'const { defineConfig } = require("eslint/config");'
    );
    expect(content).toContain("module.exports = defineConfig(");
    expect(content).toContain(");");
  });

  test("adds configs to file", () => {
    const imports = new ModuleImports();
    imports.from("@eslint/js", "eslint");

    new EslintConfigFile(project, {
      configs: [
        {
          imports,
          config: ["eslint.configs.recommended"],
        },
      ],
    });

    const output = synthSnapshot(project);
    const content = output["eslint.config.mjs"];

    expect(content).toContain("eslint.configs.recommended");
  });

  test("addConfig method works", () => {
    const configFile = new EslintConfigFile(project, {});

    const imports = new ModuleImports();
    imports.from("@eslint/js", "eslint");

    configFile.addConfig({
      imports,
      config: ["eslint.configs.recommended"],
    });

    const output = synthSnapshot(project);
    const content = output["eslint.config.mjs"];

    expect(content).toContain("eslint.configs.recommended");
  });

  test("handles multiple configs", () => {
    const imports1 = new ModuleImports();
    imports1.from("@eslint/js", "eslint");

    const imports2 = new ModuleImports();
    imports2.from("typescript-eslint", "tseslint");

    new EslintConfigFile(project, {
      configs: [
        {
          imports: imports1,
          config: ["eslint.configs.recommended"],
        },
        {
          imports: imports2,
          config: ["tseslint.configs.recommended"],
        },
      ],
    });

    const output = synthSnapshot(project);
    const content = output["eslint.config.mjs"];

    expect(content).toContain("eslint.configs.recommended");
    expect(content).toContain("tseslint.configs.recommended");
  });
});
