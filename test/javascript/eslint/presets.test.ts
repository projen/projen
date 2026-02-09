import {
  ESLintJs,
  Stylistic,
  Tseslint,
  ImportPlugin,
  ImportX,
  Prettier,
} from "../../../src/javascript/eslint/presets";
import { SharedConfig } from "../../../src/javascript/eslint/shared-config";
import { synthJsCode } from "../../util";

describe("ESLint Configs", () => {
  describe("ESLintJs", () => {
    test("ALL config", () => {
      const config = ESLintJs.ALL;
      expect(config).toBeInstanceOf(SharedConfig);
      expect(synthJsCode(config.toJSON())).toContain("js.configs.all");
    });

    test("RECOMMENDED config", () => {
      const config = ESLintJs.RECOMMENDED;
      expect(config).toBeInstanceOf(SharedConfig);
      expect(synthJsCode(config.toJSON())).toContain("js.configs.recommended");
    });
  });

  describe("Tseslint", () => {
    test("RECOMMENDED config", () => {
      const config = Tseslint.RECOMMENDED;
      expect(config).toBeInstanceOf(SharedConfig);
      expect(synthJsCode(config.toJSON())).toContain(
        "tseslint.configs.recommended",
      );
    });

    test("STRICT config", () => {
      const config = Tseslint.STRICT;
      expect(config).toBeInstanceOf(SharedConfig);
      expect(synthJsCode(config.toJSON())).toContain("tseslint.configs.strict");
    });

    test("STYLISTIC config", () => {
      const config = Tseslint.STYLISTIC;
      expect(config).toBeInstanceOf(SharedConfig);
      expect(synthJsCode(config.toJSON())).toContain(
        "tseslint.configs.stylistic",
      );
    });
  });

  describe("Stylistic", () => {
    test("RECOMMENDED config", () => {
      const config = Stylistic.RECOMMENDED;
      expect(config).toBeInstanceOf(SharedConfig);
      expect(synthJsCode(config.toJSON())).toContain(
        "stylistic.configs.recommended",
      );
    });
  });

  describe("ImportPlugin", () => {
    test("RECOMMENDED config", () => {
      const config = ImportPlugin.RECOMMENDED;
      expect(config).toBeInstanceOf(SharedConfig);
      expect(synthJsCode(config.toJSON())).toContain(
        "importPlugin.flatConfigs.recommended",
      );
    });
  });

  describe("ImportX", () => {
    test("RECOMMENDED config", () => {
      const config = ImportX.RECOMMENDED;
      expect(config).toBeInstanceOf(SharedConfig);
      expect(synthJsCode(config.toJSON())).toContain(
        "importX.flatConfigs.recommended",
      );
    });
  });

  describe("Prettier", () => {
    test("RECOMMENDED config", () => {
      const config = Prettier.RECOMMENDED;
      expect(config).toBeInstanceOf(SharedConfig);
      expect(synthJsCode(config.toJSON())).toContain(
        "prettier.configs.recommended",
      );
    });
  });
});
