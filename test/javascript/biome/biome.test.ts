import { Project } from "../../../src";
import { Biome, biome_config } from "../../../src/javascript";
import { NodeProject } from "../../../src/javascript/node-project";
import {
  TypeScriptProject,
  type TypeScriptProjectOptions,
} from "../../../src/typescript";
import { synthSnapshot } from "../../../src/util/synth";

const getTestProject = (
  projenOptions: Partial<TypeScriptProjectOptions>,
): TypeScriptProject => {
  return new TypeScriptProject({
    name: "test-project",
    defaultReleaseBranch: "main",
    sampleCode: false,
    githubOptions: {
      mergify: false,
    },
    ...projenOptions,
  });
};

describe("biome", () => {
  describe("with default configuration", () => {
    test("generates correct snapshot for biome.jsonc", () => {
      const project = getTestProject({
        biome: true,
        projenrcTs: true,
      });

      const config = snapshotBiomeConfig(project);
      expect(config).toMatchSnapshot();
    });
  });

  describe("with", () => {
    it("linter enabled", () => {
      const project = getTestProject({ eslint: false, prettier: false });
      new Biome(project, {
        linter: true,
        formatter: false,
        assist: false,
      });

      const config = snapshotBiomeConfig(project);
      expect(config.linter?.enabled).toBeTruthy();
      expect(config.linter?.rules?.recommended).toBeTruthy();
    });

    it("formatter enabled", () => {
      const project = getTestProject({ eslint: false, prettier: false });
      new Biome(project, {
        linter: false,
        formatter: true,
        assist: false,
      });

      const config = snapshotBiomeConfig(project);
      expect(config.formatter?.enabled).toBeTruthy();
    });

    it("assist enabled", () => {
      const project = getTestProject({ eslint: false, prettier: false });
      new Biome(project, {
        linter: false,
        formatter: false,
        assist: true,
      });

      const config = snapshotBiomeConfig(project);
      expect(config.assist?.enabled).toBeTruthy();
      expect(config.assist?.actions?.recommended).toBeTruthy();
    });

    it("custom overrides", () => {
      const project = getTestProject({ eslint: false, prettier: false });
      new Biome(project, {
        formatter: true,
        biomeConfig: {
          files: {
            includes: ["!ignored-file.txt"],
          },
        },
      });

      const config = snapshotBiomeConfig(project);
      expect(config.formatter?.enabled).toBeTruthy();
      expect(config.files?.includes).toContain("!ignored-file.txt");
    });

    test("additional file pattern", () => {
      // GIVEN
      const project = new NodeProject({
        name: "test",
        defaultReleaseBranch: "master",
        prettier: false,
      });

      // WHEN
      const biome = new Biome(project);
      biome.addFilePattern("bar");

      // THEN
      const config = snapshotBiomeConfig(project);
      expect(config.files?.includes).toContain("bar");
    });

    test("ignoreGeneratedFiles option disabled", () => {
      // GIVEN
      const project = new NodeProject({
        name: "test",
        defaultReleaseBranch: "master",
        prettier: false,
      });

      // WHEN
      new Biome(project, {
        ignoreGeneratedFiles: false,
      });

      // THEN
      const config = snapshotBiomeConfig(project);
      const ignorePatterns =
        config.files?.includes?.filter((pattern) => pattern.startsWith("!")) ??
        [];
      expect(ignorePatterns.length).toBe(0);
    });

    test("ignoreGeneratedFiles option enabled by default", () => {
      // GIVEN
      const project = new NodeProject({
        name: "test",
        defaultReleaseBranch: "master",
        prettier: false,
      });

      // WHEN
      new Biome(project);

      // THEN
      const config = snapshotBiomeConfig(project);
      const ignorePatterns =
        config.files?.includes?.filter((pattern) => pattern.startsWith("!")) ??
        [];
      expect(ignorePatterns.length).toBeGreaterThan(0);
    });
  });

  describe("of", () => {
    it("returns Biome instance when found", () => {
      const project = getTestProject({ eslint: false, prettier: false });
      const biome = new Biome(project);

      const found = Biome.of(project);
      expect(found).toBe(biome);
    });

    it("returns undefined when not found", () => {
      const project = getTestProject({ eslint: false, prettier: false });
      const found = Biome.of(project);
      expect(found).toBeUndefined();
    });
  });
});

describe("Configuration", () => {
  describe("should match snapshot", () => {
    describe("without overrides", () => {
      it("without options", () => {
        const project = getTestProject({ eslint: false, prettier: false });
        new Biome(project, {});
        const config = snapshotBiomeConfig(project);
        expect(config).toMatchSnapshot();
      });

      it("with linter", () => {
        const project = getTestProject({ eslint: false, prettier: false });
        new Biome(project, { linter: true });
        const config = snapshotBiomeConfig(project);
        expect(config).toMatchSnapshot();
      });

      it("with formatter", () => {
        const project = getTestProject({ eslint: false, prettier: false });
        new Biome(project, { formatter: true });
        const config = snapshotBiomeConfig(project);
        expect(config).toMatchSnapshot();
      });

      it("with assist", () => {
        const project = getTestProject({ eslint: false, prettier: false });
        new Biome(project, { assist: true });
        const config = snapshotBiomeConfig(project);
        expect(config).toMatchSnapshot();
      });

      it("with all features", () => {
        const project = getTestProject({ eslint: false, prettier: false });
        new Biome(project, {
          linter: true,
          formatter: true,
          assist: true,
        });
        const config = snapshotBiomeConfig(project);
        expect(config).toMatchSnapshot();
      });
    });
  });

  describe("should", () => {
    describe("merge arrays", () => {
      it("when mergeArraysInConfiguration is true", () => {
        const project = getTestProject({ eslint: false, prettier: false });
        new Biome(project, {
          linter: true,
          mergeArraysInConfiguration: true,
          biomeConfig: {
            files: {
              includes: ["**/bin"],
            },
          },
        });
        const mergedConfig = snapshotBiomeConfig(project);

        expect(mergedConfig.files?.includes).toBeDefined();
        expect(mergedConfig.files!.includes!.length >= 2).toBe(true);
      });

      it("without duplicate values", () => {
        const project = getTestProject({ eslint: false, prettier: false });
        new Biome(project, { linter: true });
        const config = snapshotBiomeConfig(project);

        expect(config.files?.includes?.[0]).toBeDefined();

        const project2 = getTestProject({ eslint: false, prettier: false });
        new Biome(project2, {
          linter: true,
          biomeConfig: {
            files: {
              includes: [...config.files!.includes!],
            },
          },
        });
        const mergedConfig = snapshotBiomeConfig(project2);

        // The merged config should have the same length since duplicates should be removed
        // This tests that the merge logic properly deduplicates entries
        expect(mergedConfig.files!.includes!.length).toBe(
          config.files!.includes!.length,
        );
      });
    });

    it("make deep merge", () => {
      const project = getTestProject({ eslint: false, prettier: false });
      new Biome(project, {
        linter: true,
        biomeConfig: {
          linter: {
            rules: {
              security: {
                noBlankTarget: "error",
              },
            },
          },
        },
      });
      const mergedConfig = snapshotBiomeConfig(project);

      expect(mergedConfig.linter?.rules).toBeDefined();
      expect(mergedConfig.linter?.rules).toMatchObject({
        recommended: true,
        security: {
          noBlankTarget: "error",
        },
      });
    });

    it("add overrides", () => {
      const project = getTestProject({ eslint: false, prettier: false });
      const biome = new Biome(project, {});

      biome.addOverride({
        includes: ["test.ts"],
        linter: {
          enabled: false,
        },
      });

      const mergedConfig = snapshotBiomeConfig(project);

      expect(mergedConfig.overrides).toBeDefined();
      expect(mergedConfig.overrides?.length).toBeGreaterThan(0);
      expect(mergedConfig.overrides?.[0]).toEqual({
        includes: ["test.ts"],
        linter: {
          enabled: false,
        },
      });
    });

    it("expand linting rules", () => {
      const project = getTestProject({ eslint: false, prettier: false });
      const biome = new Biome(project, {
        biomeConfig: {
          linter: {
            rules: {
              nursery: {
                "standard-rule": "error",
              },
              complexity: {
                "another-rule": "warn",
              },
              correctness: {
                "removed-rule": "info",
              },
            },
          },
        },
      });

      biome.expandLinterRules({
        nursery: {
          "test-rule": "warn",
        },
        correctness: undefined,
      });

      const mergedConfig = snapshotBiomeConfig(project);

      expect(mergedConfig.linter?.rules).toBeDefined();
      expect(mergedConfig.linter?.rules).toEqual({
        recommended: true,
        complexity: { "another-rule": "warn" },
        nursery: { "standard-rule": "error", "test-rule": "warn" },
      });
    });
  });
});

function snapshotBiomeConfig(
  project: Project,
): biome_config.BiomeConfiguration {
  return synthSnapshot(project)["biome.jsonc"];
}
