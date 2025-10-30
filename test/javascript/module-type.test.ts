import { ModuleType } from "../../src/javascript/module-type";

describe("ModuleType", () => {
  describe("COMMON_JS", () => {
    test("has correct extension", () => {
      expect(ModuleType.COMMON_JS._ext).toBe("cjs");
    });

    test("_isCommonJs returns true", () => {
      expect(ModuleType.COMMON_JS._isCommonJs()).toBe(true);
    });

    test("_isEsm returns false", () => {
      expect(ModuleType.COMMON_JS._isEsm()).toBe(false);
    });
  });

  describe("ESM", () => {
    test("has correct extension", () => {
      expect(ModuleType.ESM._ext).toBe("mjs");
    });

    test("_isEsm returns true", () => {
      expect(ModuleType.ESM._isEsm()).toBe(true);
    });

    test("_isCommonJs returns false", () => {
      expect(ModuleType.ESM._isCommonJs()).toBe(false);
    });
  });

  describe("_fileWithExt", () => {
    test("replaces existing extension", () => {
      expect(ModuleType.ESM._fileWithExt("config.js")).toBe("config.mjs");
      expect(ModuleType.COMMON_JS._fileWithExt("config.js")).toBe("config.cjs");
    });

    test("adds extension when none exists", () => {
      expect(ModuleType.ESM._fileWithExt("config")).toBe("config.mjs");
      expect(ModuleType.COMMON_JS._fileWithExt("config")).toBe("config.cjs");
    });

    test("handles multiple dots in filename", () => {
      expect(ModuleType.ESM._fileWithExt("eslint.config.js")).toBe(
        "eslint.config.mjs"
      );
      expect(ModuleType.COMMON_JS._fileWithExt("eslint.config.js")).toBe(
        "eslint.config.cjs"
      );
    });
  });
});
