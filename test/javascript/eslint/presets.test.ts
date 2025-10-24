import {
  ESLintJs,
  Stylistic,
  Tseslint,
  ImportPlugin,
  ImportX,
  Prettier,
} from "../../../src/javascript/eslint/presets";

describe("ESLint Configs", () => {
  describe("ESLintJs", () => {
    test("ALL config", () => {
      const config = ESLintJs.ALL;
      expect(config.imports?.modules).toContain("@eslint/js");
    });

    test("RECOMMENDED config", () => {
      const config = ESLintJs.RECOMMENDED;
      expect(config.imports?.modules).toContain("@eslint/js");
    });
  });

  describe("Tseslint", () => {
    test("RECOMMENDED config", () => {
      const config = Tseslint.RECOMMENDED;
      expect(config.imports?.modules).toContain("typescript-eslint");
    });

    test("STRICT config", () => {
      const config = Tseslint.STRICT;
      expect(config.imports?.modules).toContain("typescript-eslint");
    });

    test("STYLISTIC config", () => {
      const config = Tseslint.STYLISTIC;
      expect(config.imports?.modules).toContain("typescript-eslint");
    });
  });

  describe("Stylistic", () => {
    test("RECOMMENDED config", () => {
      const config = Stylistic.RECOMMENDED;
      expect(config.imports?.modules).toContain("@stylistic/eslint-plugin");
    });
  });

  describe("ImportPlugin", () => {
    test("RECOMMENDED config", () => {
      const config = ImportPlugin.RECOMMENDED;
      expect(config.imports?.modules).toContain("eslint-plugin-import");
    });
  });
  describe("ImportX", () => {
    test("RECOMMENDED config", () => {
      const config = ImportX.RECOMMENDED;
      expect(config.imports?.modules).toContain("eslint-plugin-import-x");
    });
  });

  describe("Prettier", () => {
    test("RECOMMENDED config", () => {
      const config = Prettier.RECOMMENDED;
      expect(config.imports?.modules).toContain("eslint-plugin-prettier");
    });
  });
});
