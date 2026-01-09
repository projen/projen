import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { VendorBundleGenerator } from "../../src/javascript/vendor-bundle-generator";

describe("VendorBundleGenerator", () => {
  describe("analyzeSourceFiles", () => {
    let tempDir: string;

    beforeEach(() => {
      tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "vendor-test-"));
    });

    afterEach(() => {
      fs.rmSync(tempDir, { recursive: true, force: true });
    });

    test("detects ES6 named imports", () => {
      const srcDir = path.join(tempDir, "src");
      fs.mkdirSync(srcDir);
      fs.writeFileSync(
        path.join(srcDir, "index.ts"),
        `import { parse, stringify } from 'yaml';`
      );

      const result = VendorBundleGenerator.analyzeSourceFiles({
        bundledDeps: ["yaml"],
        sourceDir: srcDir,
      });

      expect(result.imports.yaml).toContain("parse");
      expect(result.imports.yaml).toContain("stringify");
      expect(result.defaultImports).not.toContain("yaml");
      expect(result.namespaceImports).not.toContain("yaml");
    });

    test("detects ES6 default imports", () => {
      const srcDir = path.join(tempDir, "src");
      fs.mkdirSync(srcDir);
      fs.writeFileSync(
        path.join(srcDir, "index.ts"),
        `import semver from 'semver';`
      );

      const result = VendorBundleGenerator.analyzeSourceFiles({
        bundledDeps: ["semver"],
        sourceDir: srcDir,
      });

      expect(result.defaultImports).toContain("semver");
    });

    test("detects ES6 namespace imports", () => {
      const srcDir = path.join(tempDir, "src");
      fs.mkdirSync(srcDir);
      fs.writeFileSync(
        path.join(srcDir, "index.ts"),
        `import * as yaml from 'yaml';`
      );

      const result = VendorBundleGenerator.analyzeSourceFiles({
        bundledDeps: ["yaml"],
        sourceDir: srcDir,
      });

      expect(result.namespaceImports).toContain("yaml");
    });

    test("detects CommonJS require with destructuring", () => {
      const srcDir = path.join(tempDir, "src");
      fs.mkdirSync(srcDir);
      fs.writeFileSync(
        path.join(srcDir, "index.js"),
        `const { parse, stringify } = require('yaml');`
      );

      const result = VendorBundleGenerator.analyzeSourceFiles({
        bundledDeps: ["yaml"],
        sourceDir: srcDir,
        extensions: [".js"],
      });

      expect(result.imports.yaml).toContain("parse");
      expect(result.imports.yaml).toContain("stringify");
    });

    test("detects CommonJS require with default assignment", () => {
      const srcDir = path.join(tempDir, "src");
      fs.mkdirSync(srcDir);
      fs.writeFileSync(
        path.join(srcDir, "index.js"),
        `const yaml = require('yaml');`
      );

      const result = VendorBundleGenerator.analyzeSourceFiles({
        bundledDeps: ["yaml"],
        sourceDir: srcDir,
        extensions: [".js"],
      });

      expect(result.namespaceImports).toContain("yaml");
    });

    test("handles scoped packages", () => {
      const srcDir = path.join(tempDir, "src");
      fs.mkdirSync(srcDir);
      fs.writeFileSync(
        path.join(srcDir, "index.ts"),
        `import { something } from '@scope/package';`
      );

      const result = VendorBundleGenerator.analyzeSourceFiles({
        bundledDeps: ["@scope/package"],
        sourceDir: srcDir,
      });

      expect(result.imports["@scope/package"]).toContain("something");
    });

    test("handles subpath imports", () => {
      const srcDir = path.join(tempDir, "src");
      fs.mkdirSync(srcDir);
      fs.writeFileSync(
        path.join(srcDir, "index.ts"),
        `import { something } from 'yaml/util';`
      );

      const result = VendorBundleGenerator.analyzeSourceFiles({
        bundledDeps: ["yaml"],
        sourceDir: srcDir,
      });

      expect(result.imports.yaml).toContain("something");
    });

    test("ignores non-bundled dependencies", () => {
      const srcDir = path.join(tempDir, "src");
      fs.mkdirSync(srcDir);
      fs.writeFileSync(
        path.join(srcDir, "index.ts"),
        `import { parse } from 'yaml';
import { something } from 'other-package';`
      );

      const result = VendorBundleGenerator.analyzeSourceFiles({
        bundledDeps: ["yaml"],
        sourceDir: srcDir,
      });

      expect(result.imports.yaml).toContain("parse");
      expect(result.imports["other-package"]).toBeUndefined();
    });

    test("scans nested directories", () => {
      const srcDir = path.join(tempDir, "src");
      const nestedDir = path.join(srcDir, "nested");
      fs.mkdirSync(nestedDir, { recursive: true });
      fs.writeFileSync(
        path.join(srcDir, "index.ts"),
        `import { parse } from 'yaml';`
      );
      fs.writeFileSync(
        path.join(nestedDir, "util.ts"),
        `import { stringify } from 'yaml';`
      );

      const result = VendorBundleGenerator.analyzeSourceFiles({
        bundledDeps: ["yaml"],
        sourceDir: srcDir,
      });

      expect(result.imports.yaml).toContain("parse");
      expect(result.imports.yaml).toContain("stringify");
    });

    test("returns empty results for non-existent directory", () => {
      const result = VendorBundleGenerator.analyzeSourceFiles({
        bundledDeps: ["yaml"],
        sourceDir: path.join(tempDir, "nonexistent"),
      });

      expect(result.imports.yaml).toEqual([]);
      expect(result.defaultImports).toEqual([]);
      expect(result.namespaceImports).toEqual([]);
    });

    test("handles multiple imports from same module", () => {
      const srcDir = path.join(tempDir, "src");
      fs.mkdirSync(srcDir);
      fs.writeFileSync(
        path.join(srcDir, "file1.ts"),
        `import { parse } from 'yaml';`
      );
      fs.writeFileSync(
        path.join(srcDir, "file2.ts"),
        `import { stringify } from 'yaml';`
      );

      const result = VendorBundleGenerator.analyzeSourceFiles({
        bundledDeps: ["yaml"],
        sourceDir: srcDir,
      });

      expect(result.imports.yaml).toContain("parse");
      expect(result.imports.yaml).toContain("stringify");
    });

    test("handles aliased named imports", () => {
      const srcDir = path.join(tempDir, "src");
      fs.mkdirSync(srcDir);
      fs.writeFileSync(
        path.join(srcDir, "index.ts"),
        `import { parse as yamlParse, stringify as yamlStringify } from 'yaml';`
      );

      const result = VendorBundleGenerator.analyzeSourceFiles({
        bundledDeps: ["yaml"],
        sourceDir: srcDir,
      });

      // Should capture the original symbol names, not aliases
      expect(result.imports.yaml).toContain("parse");
      expect(result.imports.yaml).toContain("stringify");
    });

    test("handles multiple bundled dependencies", () => {
      const srcDir = path.join(tempDir, "src");
      fs.mkdirSync(srcDir);
      fs.writeFileSync(
        path.join(srcDir, "index.ts"),
        `import { parse } from 'yaml';
import semver from 'semver';
import * as glob from 'glob';`
      );

      const result = VendorBundleGenerator.analyzeSourceFiles({
        bundledDeps: ["yaml", "semver", "glob"],
        sourceDir: srcDir,
      });

      expect(result.imports.yaml).toContain("parse");
      expect(result.defaultImports).toContain("semver");
      expect(result.namespaceImports).toContain("glob");
    });

    test("handles mixed import styles in same file", () => {
      const srcDir = path.join(tempDir, "src");
      fs.mkdirSync(srcDir);
      fs.writeFileSync(
        path.join(srcDir, "index.ts"),
        `import { parse } from 'yaml';
import * as yaml from 'yaml';`
      );

      const result = VendorBundleGenerator.analyzeSourceFiles({
        bundledDeps: ["yaml"],
        sourceDir: srcDir,
      });

      expect(result.imports.yaml).toContain("parse");
      expect(result.namespaceImports).toContain("yaml");
    });

    test("skips hidden directories", () => {
      const srcDir = path.join(tempDir, "src");
      const hiddenDir = path.join(srcDir, ".hidden");
      fs.mkdirSync(hiddenDir, { recursive: true });
      fs.writeFileSync(
        path.join(srcDir, "index.ts"),
        `import { parse } from 'yaml';`
      );
      fs.writeFileSync(
        path.join(hiddenDir, "hidden.ts"),
        `import { stringify } from 'yaml';`
      );

      const result = VendorBundleGenerator.analyzeSourceFiles({
        bundledDeps: ["yaml"],
        sourceDir: srcDir,
      });

      expect(result.imports.yaml).toContain("parse");
      // Should not include stringify from hidden directory
      expect(result.imports.yaml).not.toContain("stringify");
    });

    test("handles scoped package subpath imports", () => {
      const srcDir = path.join(tempDir, "src");
      fs.mkdirSync(srcDir);
      fs.writeFileSync(
        path.join(srcDir, "index.ts"),
        `import { something } from '@scope/package/subpath';`
      );

      const result = VendorBundleGenerator.analyzeSourceFiles({
        bundledDeps: ["@scope/package"],
        sourceDir: srcDir,
      });

      expect(result.imports["@scope/package"]).toContain("something");
    });
  });

  describe("generateEntryPoint", () => {
    test("generates namespace export for namespace imports", () => {
      const content = VendorBundleGenerator.generateEntryPoint({
        analyzeResult: {
          imports: { yaml: [] },
          defaultImports: [],
          namespaceImports: ["yaml"],
        },
      });

      expect(content).toContain("export * as yaml from 'yaml';");
    });

    test("generates named exports for specific symbols", () => {
      const content = VendorBundleGenerator.generateEntryPoint({
        analyzeResult: {
          imports: { yaml: ["parse", "stringify"] },
          defaultImports: [],
          namespaceImports: [],
        },
      });

      expect(content).toContain("export { parse, stringify } from 'yaml';");
    });

    test("generates default export for default imports", () => {
      const content = VendorBundleGenerator.generateEntryPoint({
        analyzeResult: {
          imports: { semver: [] },
          defaultImports: ["semver"],
          namespaceImports: [],
        },
      });

      // When no symbols and default import, it becomes namespace export
      expect(content).toContain("export * as semver from 'semver';");
    });

    test("handles scoped package names", () => {
      const content = VendorBundleGenerator.generateEntryPoint({
        analyzeResult: {
          imports: { "@scope/package": [] },
          defaultImports: [],
          namespaceImports: ["@scope/package"],
        },
      });

      expect(content).toContain(
        "export * as scope_package from '@scope/package';"
      );
    });

    test("includes header comments", () => {
      const content = VendorBundleGenerator.generateEntryPoint({
        analyzeResult: {
          imports: { yaml: [] },
          defaultImports: [],
          namespaceImports: ["yaml"],
        },
      });

      expect(content).toContain("// Auto-generated vendor entry point");
    });

    test("handles multiple modules", () => {
      const content = VendorBundleGenerator.generateEntryPoint({
        analyzeResult: {
          imports: {
            yaml: ["parse"],
            semver: ["valid", "clean"],
          },
          defaultImports: [],
          namespaceImports: [],
        },
      });

      expect(content).toContain("export { parse } from 'yaml';");
      expect(content).toContain("export { clean, valid } from 'semver';");
    });

    test("handles mixed import types for same module", () => {
      const content = VendorBundleGenerator.generateEntryPoint({
        analyzeResult: {
          imports: { yaml: ["parse", "stringify"] },
          defaultImports: ["yaml"],
          namespaceImports: [],
        },
      });

      // Should export named symbols and default
      expect(content).toContain("export { parse, stringify } from 'yaml';");
      expect(content).toContain(
        "export { default as yamlDefault } from 'yaml';"
      );
    });

    test("handles empty imports object", () => {
      const content = VendorBundleGenerator.generateEntryPoint({
        analyzeResult: {
          imports: {},
          defaultImports: [],
          namespaceImports: [],
        },
      });

      expect(content).toContain("// Auto-generated vendor entry point");
      // Should only have header comments, no exports
      expect(content).not.toContain("export {");
      expect(content).not.toContain("export *");
    });

    test("handles module names starting with numbers", () => {
      const content = VendorBundleGenerator.generateEntryPoint({
        analyzeResult: {
          imports: { "7zip-min": [] },
          defaultImports: [],
          namespaceImports: ["7zip-min"],
        },
      });

      // Should prefix with underscore for valid identifier
      expect(content).toContain("export * as _7zip_min from '7zip-min';");
    });

    test("sorts symbols alphabetically in exports", () => {
      const content = VendorBundleGenerator.generateEntryPoint({
        analyzeResult: {
          imports: { yaml: ["stringify", "parse", "Document"] },
          defaultImports: [],
          namespaceImports: [],
        },
      });

      // Symbols should be sorted alphabetically
      expect(content).toContain(
        "export { Document, parse, stringify } from 'yaml';"
      );
    });
  });

  describe("generateEsbuildConfig", () => {
    test("generates basic esbuild configuration", () => {
      const config = VendorBundleGenerator.generateEsbuildConfig({
        entryPoint: "lib/.vendor-entry.js",
      });

      expect(config.args).toContain("esbuild");
      expect(config.args).toContain("lib/.vendor-entry.js");
      expect(config.args).toContain("--bundle");
      expect(config.args).toContain("--platform=node");
      expect(config.args).toContain("--format=cjs");
      expect(config.args).toContain("--tree-shaking=true");
      expect(config.entryPoint).toBe("lib/.vendor-entry.js");
      expect(config.outfile).toBe("lib/vendor.js");
    });

    test("uses custom output file", () => {
      const config = VendorBundleGenerator.generateEsbuildConfig({
        entryPoint: "lib/.vendor-entry.js",
        outfile: "dist/vendor.bundle.js",
      });

      expect(config.args).toContain("--outfile=dist/vendor.bundle.js");
      expect(config.outfile).toBe("dist/vendor.bundle.js");
    });

    test("marks external dependencies", () => {
      const config = VendorBundleGenerator.generateEsbuildConfig({
        entryPoint: "lib/.vendor-entry.js",
        externalDeps: ["constructs", "aws-cdk-lib"],
      });

      expect(config.args).toContain("--external:constructs");
      expect(config.args).toContain("--external:aws-cdk-lib");
      expect(config.external).toEqual(["constructs", "aws-cdk-lib"]);
    });

    test("uses default external deps (constructs)", () => {
      const config = VendorBundleGenerator.generateEsbuildConfig({
        entryPoint: "lib/.vendor-entry.js",
      });

      expect(config.args).toContain("--external:constructs");
      expect(config.external).toEqual(["constructs"]);
    });

    test("uses custom target", () => {
      const config = VendorBundleGenerator.generateEsbuildConfig({
        entryPoint: "lib/.vendor-entry.js",
        target: "node16",
      });

      expect(config.args).toContain("--target=node16");
    });

    test("enables minification when requested", () => {
      const config = VendorBundleGenerator.generateEsbuildConfig({
        entryPoint: "lib/.vendor-entry.js",
        minify: true,
      });

      expect(config.args).toContain("--minify");
    });

    test("does not include minify flag by default", () => {
      const config = VendorBundleGenerator.generateEsbuildConfig({
        entryPoint: "lib/.vendor-entry.js",
      });

      expect(config.args).not.toContain("--minify");
    });

    test("handles empty external deps array", () => {
      const config = VendorBundleGenerator.generateEsbuildConfig({
        entryPoint: "lib/.vendor-entry.js",
        externalDeps: [],
      });

      expect(config.external).toEqual([]);
      // Should not have any --external flags
      const externalArgs = config.args.filter((arg) =>
        arg.startsWith("--external:")
      );
      expect(externalArgs).toHaveLength(0);
    });

    test("generates correct argument order", () => {
      const config = VendorBundleGenerator.generateEsbuildConfig({
        entryPoint: "lib/.vendor-entry.js",
        outfile: "lib/vendor.js",
        target: "node18",
      });

      // First arg should be esbuild command
      expect(config.args[0]).toBe("esbuild");
      // Second arg should be entry point
      expect(config.args[1]).toBe("lib/.vendor-entry.js");
      // Should include bundle flag
      expect(config.args).toContain("--bundle");
    });

    test("uses default target node18", () => {
      const config = VendorBundleGenerator.generateEsbuildConfig({
        entryPoint: "lib/.vendor-entry.js",
      });

      expect(config.args).toContain("--target=node18");
    });

    test("includes tree-shaking for bundle size optimization", () => {
      const config = VendorBundleGenerator.generateEsbuildConfig({
        entryPoint: "lib/.vendor-entry.js",
      });

      // Requirement 1.2: tree-shaking enabled to minimize bundle size
      expect(config.args).toContain("--tree-shaking=true");
    });

    test("uses CommonJS format for Node.js compatibility", () => {
      const config = VendorBundleGenerator.generateEsbuildConfig({
        entryPoint: "lib/.vendor-entry.js",
      });

      expect(config.args).toContain("--format=cjs");
    });
  });

  describe("writeEntryPoint", () => {
    let tempDir: string;

    beforeEach(() => {
      tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "vendor-write-test-"));
    });

    afterEach(() => {
      fs.rmSync(tempDir, { recursive: true, force: true });
    });

    test("writes content to file", () => {
      const outputPath = path.join(tempDir, "vendor-entry.js");
      const content = "export * as yaml from 'yaml';";

      VendorBundleGenerator.writeEntryPoint(content, outputPath);

      expect(fs.existsSync(outputPath)).toBe(true);
      expect(fs.readFileSync(outputPath, "utf-8")).toBe(content);
    });

    test("creates parent directories if needed", () => {
      const outputPath = path.join(tempDir, "nested", "dir", "vendor-entry.js");
      const content = "export * as yaml from 'yaml';";

      VendorBundleGenerator.writeEntryPoint(content, outputPath);

      expect(fs.existsSync(outputPath)).toBe(true);
      expect(fs.readFileSync(outputPath, "utf-8")).toBe(content);
    });
  });
});
