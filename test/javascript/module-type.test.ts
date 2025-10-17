import { ModuleType } from "../../src/javascript/module-type";

describe("ModuleType", () => {
  describe("COMMON_JS", () => {
    test("has correct extension", () => {
      expect(ModuleType.COMMON_JS.ext).toBe("cjs");
    });

    test("isCommonJs returns true", () => {
      expect(ModuleType.COMMON_JS.isCommonJs()).toBe(true);
    });

    test("isEsm returns false", () => {
      expect(ModuleType.COMMON_JS.isEsm()).toBe(false);
    });
  });

  describe("ESM", () => {
    test("has correct extension", () => {
      expect(ModuleType.ESM.ext).toBe("mjs");
    });

    test("isEsm returns true", () => {
      expect(ModuleType.ESM.isEsm()).toBe(true);
    });

    test("isCommonJs returns false", () => {
      expect(ModuleType.ESM.isCommonJs()).toBe(false);
    });
  });

  describe("fileWithExt", () => {
    test("replaces existing extension", () => {
      expect(ModuleType.ESM.fileWithExt("config.js")).toBe("config.mjs");
      expect(ModuleType.COMMON_JS.fileWithExt("config.js")).toBe("config.cjs");
    });

    test("adds extension when none exists", () => {
      expect(ModuleType.ESM.fileWithExt("config")).toBe("config.mjs");
      expect(ModuleType.COMMON_JS.fileWithExt("config")).toBe("config.cjs");
    });

    test("handles multiple dots in filename", () => {
      expect(ModuleType.ESM.fileWithExt("eslint.config.js")).toBe(
        "eslint.config.mjs"
      );
      expect(ModuleType.COMMON_JS.fileWithExt("eslint.config.js")).toBe(
        "eslint.config.cjs"
      );
    });
  });
});
