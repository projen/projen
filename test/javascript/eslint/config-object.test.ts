import {
  Extends,
  Processor,
  Severity,
} from "../../../src/javascript/eslint/config-object";

describe("flat-config", () => {
  describe("Extends", () => {
    test("fromName creates extends from string", () => {
      const ext = Extends.fromName("recommended");
      expect(ext.config).toBe("recommended");
    });

    test("fromConfig creates extends from config object", () => {
      const config = { imports: undefined, config: ["test"] };
      const ext = Extends.fromConfig(config);
      expect(ext.config).toBe(config);
    });
  });

  describe("Processor", () => {
    test("fromPlugin creates processor", () => {
      const processor = Processor.fromPlugin("pluginName/processorName");
      expect(processor.processor).toBe("pluginName/processorName");
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
