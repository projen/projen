import { PackageJsonTransformer } from "../../src/javascript/package-json-transformer";

describe("PackageJsonTransformer", () => {
  describe("transform", () => {
    test("removes specified dependencies from dependencies field", () => {
      const packageJson = {
        name: "test-package",
        version: "1.0.0",
        dependencies: {
          yaml: "^2.0.0",
          semver: "^7.0.0",
          constructs: "^10.0.0",
        },
      };

      const result = PackageJsonTransformer.transform(packageJson, {
        removeDeps: ["yaml", "semver"],
      });

      expect(result.packageJson.dependencies).toEqual({
        constructs: "^10.0.0",
      });
      expect(result.removedDeps).toEqual({
        yaml: "^2.0.0",
        semver: "^7.0.0",
      });
    });

    test("removes bundledDependencies field by default", () => {
      const packageJson = {
        name: "test-package",
        version: "1.0.0",
        dependencies: {
          yaml: "^2.0.0",
        },
        bundledDependencies: ["yaml"],
      };

      const result = PackageJsonTransformer.transform(packageJson, {
        removeDeps: ["yaml"],
      });

      expect(result.packageJson.bundledDependencies).toBeUndefined();
    });

    test("preserves bundledDependencies when removeBundledDependencies is false", () => {
      const packageJson = {
        name: "test-package",
        version: "1.0.0",
        dependencies: {
          yaml: "^2.0.0",
        },
        bundledDependencies: ["yaml"],
      };

      const result = PackageJsonTransformer.transform(packageJson, {
        removeDeps: ["yaml"],
        removeBundledDependencies: false,
      });

      expect(result.packageJson.bundledDependencies).toEqual(["yaml"]);
    });

    test("preserves all other package.json fields", () => {
      const packageJson = {
        name: "test-package",
        version: "1.0.0",
        description: "A test package",
        main: "lib/index.js",
        scripts: {
          build: "tsc",
        },
        dependencies: {
          yaml: "^2.0.0",
        },
        devDependencies: {
          typescript: "^5.0.0",
        },
        peerDependencies: {
          constructs: "^10.0.0",
        },
        keywords: ["test"],
        author: "Test Author",
        license: "Apache-2.0",
      };

      const result = PackageJsonTransformer.transform(packageJson, {
        removeDeps: ["yaml"],
      });

      expect(result.packageJson.name).toBe("test-package");
      expect(result.packageJson.version).toBe("1.0.0");
      expect(result.packageJson.description).toBe("A test package");
      expect(result.packageJson.main).toBe("lib/index.js");
      expect(result.packageJson.scripts).toEqual({ build: "tsc" });
      expect(result.packageJson.devDependencies).toEqual({
        typescript: "^5.0.0",
      });
      expect(result.packageJson.peerDependencies).toEqual({
        constructs: "^10.0.0",
      });
      expect(result.packageJson.keywords).toEqual(["test"]);
      expect(result.packageJson.author).toBe("Test Author");
      expect(result.packageJson.license).toBe("Apache-2.0");
    });

    test("handles empty dependencies object", () => {
      const packageJson = {
        name: "test-package",
        version: "1.0.0",
        dependencies: {},
      };

      const result = PackageJsonTransformer.transform(packageJson, {
        removeDeps: ["yaml"],
      });

      expect(result.packageJson.dependencies).toEqual({});
      expect(result.removedDeps).toEqual({});
    });

    test("handles missing dependencies field", () => {
      const packageJson = {
        name: "test-package",
        version: "1.0.0",
      };

      const result = PackageJsonTransformer.transform(packageJson, {
        removeDeps: ["yaml"],
      });

      expect(result.packageJson.dependencies).toBeUndefined();
      expect(result.removedDeps).toEqual({});
    });

    test("handles missing bundledDependencies field", () => {
      const packageJson = {
        name: "test-package",
        version: "1.0.0",
        dependencies: {
          yaml: "^2.0.0",
        },
      };

      const result = PackageJsonTransformer.transform(packageJson, {
        removeDeps: ["yaml"],
      });

      // Should not throw and should not add bundledDependencies
      expect(result.packageJson.bundledDependencies).toBeUndefined();
    });

    test("does not mutate original package.json", () => {
      const packageJson = {
        name: "test-package",
        version: "1.0.0",
        dependencies: {
          yaml: "^2.0.0",
          semver: "^7.0.0",
        },
        bundledDependencies: ["yaml", "semver"],
      };

      PackageJsonTransformer.transform(packageJson, {
        removeDeps: ["yaml", "semver"],
      });

      // Original should be unchanged
      expect(packageJson.dependencies).toEqual({
        yaml: "^2.0.0",
        semver: "^7.0.0",
      });
      expect(packageJson.bundledDependencies).toEqual(["yaml", "semver"]);
    });

    test("only removes deps that exist in dependencies", () => {
      const packageJson = {
        name: "test-package",
        version: "1.0.0",
        dependencies: {
          yaml: "^2.0.0",
        },
      };

      const result = PackageJsonTransformer.transform(packageJson, {
        removeDeps: ["yaml", "nonexistent"],
      });

      expect(result.packageJson.dependencies).toEqual({});
      expect(result.removedDeps).toEqual({
        yaml: "^2.0.0",
      });
    });
  });

  describe("restore", () => {
    test("restores removed dependencies", () => {
      const packageJson = {
        name: "test-package",
        version: "1.0.0",
        dependencies: {
          constructs: "^10.0.0",
        },
      };

      const originalDeps = {
        yaml: "^2.0.0",
        semver: "^7.0.0",
      };

      const result = PackageJsonTransformer.restore(packageJson, originalDeps);

      expect(result.dependencies).toEqual({
        constructs: "^10.0.0",
        yaml: "^2.0.0",
        semver: "^7.0.0",
      });
    });

    test("creates dependencies field if missing", () => {
      const packageJson = {
        name: "test-package",
        version: "1.0.0",
      };

      const originalDeps = {
        yaml: "^2.0.0",
      };

      const result = PackageJsonTransformer.restore(packageJson, originalDeps);

      expect(result.dependencies).toEqual({
        yaml: "^2.0.0",
      });
    });

    test("does not mutate original package.json", () => {
      const packageJson = {
        name: "test-package",
        version: "1.0.0",
        dependencies: {
          constructs: "^10.0.0",
        },
      };

      const originalDeps = {
        yaml: "^2.0.0",
      };

      PackageJsonTransformer.restore(packageJson, originalDeps);

      // Original should be unchanged
      expect(packageJson.dependencies).toEqual({
        constructs: "^10.0.0",
      });
    });

    test("preserves all other package.json fields", () => {
      const packageJson = {
        name: "test-package",
        version: "1.0.0",
        description: "A test package",
        main: "lib/index.js",
        dependencies: {},
        devDependencies: {
          typescript: "^5.0.0",
        },
      };

      const result = PackageJsonTransformer.restore(packageJson, {
        yaml: "^2.0.0",
      });

      expect(result.name).toBe("test-package");
      expect(result.version).toBe("1.0.0");
      expect(result.description).toBe("A test package");
      expect(result.main).toBe("lib/index.js");
      expect(result.devDependencies).toEqual({
        typescript: "^5.0.0",
      });
    });
  });

  describe("transform and restore round-trip", () => {
    test("restore reverses transform", () => {
      const originalPackageJson = {
        name: "test-package",
        version: "1.0.0",
        dependencies: {
          yaml: "^2.0.0",
          semver: "^7.0.0",
          constructs: "^10.0.0",
        },
        bundledDependencies: ["yaml", "semver"],
      };

      // Transform
      const transformResult = PackageJsonTransformer.transform(
        originalPackageJson,
        {
          removeDeps: ["yaml", "semver"],
        }
      );

      // Restore
      const restored = PackageJsonTransformer.restore(
        transformResult.packageJson,
        transformResult.removedDeps
      );

      // Dependencies should be restored
      expect(restored.dependencies).toEqual({
        yaml: "^2.0.0",
        semver: "^7.0.0",
        constructs: "^10.0.0",
      });
    });
  });
});
