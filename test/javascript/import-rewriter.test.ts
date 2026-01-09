import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { ImportRewriter } from "../../src/javascript/import-rewriter";

describe("ImportRewriter", () => {
  describe("getBaseModuleName", () => {
    test("returns module name for simple packages", () => {
      expect(ImportRewriter.getBaseModuleName("yaml")).toBe("yaml");
      expect(ImportRewriter.getBaseModuleName("semver")).toBe("semver");
    });

    test("extracts base name from subpath imports", () => {
      expect(ImportRewriter.getBaseModuleName("yaml/util")).toBe("yaml");
      expect(ImportRewriter.getBaseModuleName("semver/functions/valid")).toBe(
        "semver"
      );
    });

    test("handles scoped packages", () => {
      expect(ImportRewriter.getBaseModuleName("@scope/package")).toBe(
        "@scope/package"
      );
    });

    test("handles scoped packages with subpaths", () => {
      expect(ImportRewriter.getBaseModuleName("@scope/package/subpath")).toBe(
        "@scope/package"
      );
      expect(
        ImportRewriter.getBaseModuleName("@aws-cdk/core/lib/something")
      ).toBe("@aws-cdk/core");
    });
  });

  describe("calculateRelativePath", () => {
    test("returns ./vendor for files in lib root", () => {
      const result = ImportRewriter.calculateRelativePath(
        "lib/index.js",
        "lib",
        "vendor.js"
      );
      expect(result).toBe("./vendor");
    });

    test("returns ../vendor for files one level deep", () => {
      const result = ImportRewriter.calculateRelativePath(
        "lib/awscdk/index.js",
        "lib",
        "vendor.js"
      );
      expect(result).toBe("../vendor");
    });

    test("returns ../../vendor for files two levels deep", () => {
      const result = ImportRewriter.calculateRelativePath(
        "lib/awscdk/private/util.js",
        "lib",
        "vendor.js"
      );
      expect(result).toBe("../../vendor");
    });

    test("handles custom vendor file names", () => {
      const result = ImportRewriter.calculateRelativePath(
        "lib/index.js",
        "lib",
        "bundled-deps.js"
      );
      expect(result).toBe("./bundled-deps");
    });
  });

  describe("rewriteContent", () => {
    const bundledDeps = ["yaml", "semver", "fast-json-patch"];
    const externalDeps = ["constructs"];
    const vendorPath = "./vendor";

    test("rewrites require for bundled dependency", () => {
      const content = `const YAML = require("yaml");`;
      const rewrittenModules: string[] = [];

      const result = ImportRewriter.rewriteContent(
        content,
        bundledDeps,
        externalDeps,
        vendorPath,
        rewrittenModules
      );

      expect(result).toBe(`const YAML = require("./vendor");`);
      expect(rewrittenModules).toContain("yaml");
    });

    test("rewrites destructured require", () => {
      const content = `const { parse, stringify } = require("yaml");`;
      const rewrittenModules: string[] = [];

      const result = ImportRewriter.rewriteContent(
        content,
        bundledDeps,
        externalDeps,
        vendorPath,
        rewrittenModules
      );

      expect(result).toBe(`const { parse, stringify } = require("./vendor");`);
      expect(rewrittenModules).toContain("yaml");
    });

    test("preserves external dependencies", () => {
      const content = `const { Construct } = require("constructs");`;
      const rewrittenModules: string[] = [];

      const result = ImportRewriter.rewriteContent(
        content,
        bundledDeps,
        externalDeps,
        vendorPath,
        rewrittenModules
      );

      expect(result).toBe(`const { Construct } = require("constructs");`);
      expect(rewrittenModules).toHaveLength(0);
    });

    test("preserves relative imports", () => {
      const content = `const util = require("./util");`;
      const rewrittenModules: string[] = [];

      const result = ImportRewriter.rewriteContent(
        content,
        bundledDeps,
        externalDeps,
        vendorPath,
        rewrittenModules
      );

      expect(result).toBe(`const util = require("./util");`);
      expect(rewrittenModules).toHaveLength(0);
    });

    test("preserves parent relative imports", () => {
      const content = `const component = require("../component");`;
      const rewrittenModules: string[] = [];

      const result = ImportRewriter.rewriteContent(
        content,
        bundledDeps,
        externalDeps,
        vendorPath,
        rewrittenModules
      );

      expect(result).toBe(`const component = require("../component");`);
      expect(rewrittenModules).toHaveLength(0);
    });

    test("preserves non-bundled dependencies", () => {
      const content = `const lodash = require("lodash");`;
      const rewrittenModules: string[] = [];

      const result = ImportRewriter.rewriteContent(
        content,
        bundledDeps,
        externalDeps,
        vendorPath,
        rewrittenModules
      );

      expect(result).toBe(`const lodash = require("lodash");`);
      expect(rewrittenModules).toHaveLength(0);
    });

    test("rewrites multiple requires in same file", () => {
      const content = `const YAML = require("yaml");
const semver = require("semver");
const { Construct } = require("constructs");`;
      const rewrittenModules: string[] = [];

      const result = ImportRewriter.rewriteContent(
        content,
        bundledDeps,
        externalDeps,
        vendorPath,
        rewrittenModules
      );

      expect(result).toBe(`const YAML = require("./vendor");
const semver = require("./vendor");
const { Construct } = require("constructs");`);
      expect(rewrittenModules).toContain("yaml");
      expect(rewrittenModules).toContain("semver");
    });

    test("handles single quotes", () => {
      const content = `const YAML = require('yaml');`;
      const rewrittenModules: string[] = [];

      const result = ImportRewriter.rewriteContent(
        content,
        bundledDeps,
        externalDeps,
        vendorPath,
        rewrittenModules
      );

      expect(result).toBe(`const YAML = require("./vendor");`);
      expect(rewrittenModules).toContain("yaml");
    });

    test("handles subpath imports", () => {
      const content = `const { deepClone } = require("fast-json-patch");`;
      const rewrittenModules: string[] = [];

      const result = ImportRewriter.rewriteContent(
        content,
        bundledDeps,
        externalDeps,
        vendorPath,
        rewrittenModules
      );

      expect(result).toBe(`const { deepClone } = require("./vendor");`);
      expect(rewrittenModules).toContain("fast-json-patch");
    });

    test("does not duplicate module names in rewrittenModules", () => {
      const content = `const YAML = require("yaml");
const { parse } = require("yaml");`;
      const rewrittenModules: string[] = [];

      ImportRewriter.rewriteContent(
        content,
        bundledDeps,
        externalDeps,
        vendorPath,
        rewrittenModules
      );

      expect(rewrittenModules.filter((m) => m === "yaml")).toHaveLength(1);
    });
  });

  describe("rewriteFile", () => {
    let tempDir: string;

    beforeEach(() => {
      tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "import-rewriter-test-"));
    });

    afterEach(() => {
      fs.rmSync(tempDir, { recursive: true, force: true });
    });

    test("rewrites file and returns result", () => {
      const libDir = path.join(tempDir, "lib");
      fs.mkdirSync(libDir);

      const filePath = path.join(libDir, "index.js");
      fs.writeFileSync(filePath, `const YAML = require("yaml");`);

      // Create empty vendor file
      fs.writeFileSync(path.join(libDir, "vendor.js"), "");

      const result = ImportRewriter.rewriteFile(
        filePath,
        ["yaml"],
        ["constructs"],
        libDir,
        "vendor.js"
      );

      expect(result.filePath).toBe(filePath);
      expect(result.rewrittenCount).toBe(1);
      expect(result.rewrittenModules).toContain("yaml");

      const newContent = fs.readFileSync(filePath, "utf-8");
      expect(newContent).toBe(`const YAML = require("./vendor");`);
    });

    test("does not write file if no changes", () => {
      const libDir = path.join(tempDir, "lib");
      fs.mkdirSync(libDir);

      const filePath = path.join(libDir, "index.js");
      const originalContent = `const util = require("./util");`;
      fs.writeFileSync(filePath, originalContent);

      const result = ImportRewriter.rewriteFile(
        filePath,
        ["yaml"],
        ["constructs"],
        libDir,
        "vendor.js"
      );

      expect(result.rewrittenCount).toBe(0);
      expect(fs.readFileSync(filePath, "utf-8")).toBe(originalContent);
    });
  });

  describe("rewriteImports", () => {
    let tempDir: string;

    beforeEach(() => {
      tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "import-rewriter-test-"));
    });

    afterEach(() => {
      fs.rmSync(tempDir, { recursive: true, force: true });
    });

    test("rewrites imports in all JS files", () => {
      const libDir = path.join(tempDir, "lib");
      const subDir = path.join(libDir, "awscdk");
      fs.mkdirSync(subDir, { recursive: true });

      // Create files with bundled deps
      fs.writeFileSync(
        path.join(libDir, "index.js"),
        `const YAML = require("yaml");`
      );
      fs.writeFileSync(
        path.join(subDir, "util.js"),
        `const semver = require("semver");`
      );

      // Create vendor file
      fs.writeFileSync(path.join(libDir, "vendor.js"), "");

      const result = ImportRewriter.rewriteImports({
        bundledDeps: ["yaml", "semver"],
        libDir,
        vendorFile: "vendor.js",
      });

      expect(result.totalRewritten).toBe(2);
      expect(result.files).toHaveLength(2);

      // Check root file
      const rootContent = fs.readFileSync(
        path.join(libDir, "index.js"),
        "utf-8"
      );
      expect(rootContent).toBe(`const YAML = require("./vendor");`);

      // Check nested file
      const nestedContent = fs.readFileSync(
        path.join(subDir, "util.js"),
        "utf-8"
      );
      expect(nestedContent).toBe(`const semver = require("../vendor");`);
    });

    test("returns empty result for non-existent directory", () => {
      const result = ImportRewriter.rewriteImports({
        bundledDeps: ["yaml"],
        libDir: path.join(tempDir, "nonexistent"),
      });

      expect(result.totalRewritten).toBe(0);
      expect(result.files).toHaveLength(0);
    });

    test("skips files with no bundled deps", () => {
      const libDir = path.join(tempDir, "lib");
      fs.mkdirSync(libDir);

      fs.writeFileSync(
        path.join(libDir, "index.js"),
        `const util = require("./util");`
      );

      const result = ImportRewriter.rewriteImports({
        bundledDeps: ["yaml"],
        libDir,
      });

      expect(result.totalRewritten).toBe(0);
      expect(result.files).toHaveLength(0);
    });

    test("uses default values for optional parameters", () => {
      const libDir = path.join(tempDir, "lib");
      fs.mkdirSync(libDir);

      fs.writeFileSync(
        path.join(libDir, "index.js"),
        `const YAML = require("yaml");
const { Construct } = require("constructs");`
      );
      fs.writeFileSync(path.join(libDir, "vendor.js"), "");

      const result = ImportRewriter.rewriteImports({
        bundledDeps: ["yaml"],
        libDir,
      });

      expect(result.totalRewritten).toBe(1);

      const content = fs.readFileSync(path.join(libDir, "index.js"), "utf-8");
      expect(content).toContain(`require("./vendor")`);
      expect(content).toContain(`require("constructs")`);
    });

    test("skips hidden directories", () => {
      const libDir = path.join(tempDir, "lib");
      const hiddenDir = path.join(libDir, ".hidden");
      fs.mkdirSync(hiddenDir, { recursive: true });

      fs.writeFileSync(
        path.join(libDir, "index.js"),
        `const YAML = require("yaml");`
      );
      fs.writeFileSync(
        path.join(hiddenDir, "hidden.js"),
        `const YAML = require("yaml");`
      );
      fs.writeFileSync(path.join(libDir, "vendor.js"), "");

      const result = ImportRewriter.rewriteImports({
        bundledDeps: ["yaml"],
        libDir,
      });

      // Should only process the root file, not the hidden one
      expect(result.totalRewritten).toBe(1);
      expect(result.files).toHaveLength(1);
      expect(result.files[0].filePath).toBe(path.join(libDir, "index.js"));
    });
  });
});
