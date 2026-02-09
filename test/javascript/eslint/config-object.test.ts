import {
  Extends,
  Severity,
} from "../../../src/javascript/eslint/config-object";

describe("flat-config", () => {
  describe("Extends", () => {
    test("fromName creates extends from string", () => {
      const ext = Extends.fromName("recommended");
      expect(ext.config).toBe("recommended");
    });

    test("fromConfig creates extends from config object", () => {
      const config = { name: "test-config", rules: {} };
      const ext = Extends.fromConfig(config);
      expect(ext.config).toBe(config);
    });
  });

  describe("Severity", () => {
    test("has correct values", () => {
      expect(Severity.OFF).toBe("off");
      expect(Severity.WARN).toBe("warn");
      expect(Severity.ERROR).toBe("error");
    });
  });
});
