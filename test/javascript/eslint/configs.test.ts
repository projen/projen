import {
  EslintConfigs,
  StylisticConfigs,
  TypeScriptEslintConfigs,
  ImportConfigs,
  PrettierConfigs,
} from "../../../src/javascript/eslint/configs";
import { ProjenLegacyConfig } from "../../../src/javascript/eslint/configs/projen";

describe("ESLint Configs", () => {
  describe("EslintConfigs", () => {
    test("ALL config", () => {
      const config = EslintConfigs.ALL;
      expect(config.imports?.modules).toContain("@eslint/js");
    });

    test("RECOMMENDED config", () => {
      const config = EslintConfigs.RECOMMENDED;
      expect(config.imports?.modules).toContain("@eslint/js");
    });
  });

  describe("TypeScriptEslintConfigs", () => {
    test("RECOMMENDED config", () => {
      const config = TypeScriptEslintConfigs.RECOMMENDED;
      expect(config.imports?.modules).toContain("typescript-eslint");
    });

    test("STRICT config", () => {
      const config = TypeScriptEslintConfigs.STRICT;
      expect(config.imports?.modules).toContain("typescript-eslint");
    });

    test("STYLISTIC config", () => {
      const config = TypeScriptEslintConfigs.STYLISTIC;
      expect(config.imports?.modules).toContain("typescript-eslint");
    });
  });

  describe("StylisticConfigs", () => {
    test("RECOMMENDED config", () => {
      const config = StylisticConfigs.RECOMMENDED;
      expect(config.imports?.modules).toContain("@stylistic/eslint-plugin");
    });
  });

  describe("ImportConfigs", () => {
    test("RECOMMENDED config", () => {
      const config = ImportConfigs.RECOMMENDED;
      expect(config.imports?.modules).toContain("eslint-plugin-import");
    });
  });

  describe("PrettierConfigs", () => {
    test("RECOMMENDED config", () => {
      const config = PrettierConfigs.RECOMMENDED;
      expect(config.imports?.modules).toContain("eslint-plugin-prettier");
    });
  });

  describe("ProjenLegacyConfig", () => {
    test("creates empty config", () => {
      const config = new ProjenLegacyConfig();
      expect(config.imports).toBeDefined();
      expect(config.config).toEqual([]);
    });
  });
});
