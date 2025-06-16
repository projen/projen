import { Biome, biome_config } from "../../../src/javascript/biome";
import { NodeProject } from "../../../src/javascript/node-project";
import {
  TypeScriptProject,
  type TypeScriptProjectOptions,
} from "../../../src/typescript";
import { synthSnapshot } from "../../../src/util/synth";

const getTestProject = (
  projenOptions: Partial<TypeScriptProjectOptions>
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
    describe("generates correct snapshot for", () => {
      const project = getTestProject({ eslint: false, prettier: false });
      new Biome(project);

      const snapshots = synthSnapshot(project);
      for (const file of Object.keys(snapshots)) {
        it(file, () => {
          expect(snapshots[file]).toMatchSnapshot();
        });
      }
    });
  });

  describe("with", () => {
    it("formatter enabled", () => {
      const project = getTestProject({ eslint: false, prettier: false });
      new Biome(project, {
        formatter: true,
      });

      const config: biome_config.IConfiguration =
        synthSnapshot(project)["biome.jsonc"];
      expect(config.formatter?.enabled).toBeTruthy();
    });

    it("organizer enabled", () => {
      const project = getTestProject({ eslint: false, prettier: false });
      new Biome(project, {
        organizeImports: true,
      });

      const config: biome_config.IConfiguration =
        synthSnapshot(project)["biome.jsonc"];
      expect(config.organizeImports?.enabled).toBeTruthy();
    });

    it("custom overrides", () => {
      const project = getTestProject({ eslint: false, prettier: false });
      new Biome(project, {
        formatter: true,
        biomeConfig: {
          files: {
            ignore: ["ignored-file.txt"],
          },
        },
      });

      const config: biome_config.IConfiguration =
        synthSnapshot(project)["biome.jsonc"];
      expect(config.formatter?.enabled).toBeTruthy();
      expect(config.files?.ignore).toContain("ignored-file.txt");
    });

    test("additional lint pattern", () => {
      // GIVEN
      const project = new NodeProject({
        name: "test",
        defaultReleaseBranch: "master",
        prettier: false,
      });

      // WHEN
      const biome = new Biome(project, {});

      const taskStep = biome.task.steps[0];
      const newTestArg = "--foo";
      biome.task.reset(taskStep.exec, { args: [newTestArg] });

      console.dir(biome.task.steps[0]);
      const newLintPattern = "bar";
      biome.addLintPattern(newLintPattern);

      // THEN
      expect(biome.task.steps[0].args).toContain(newTestArg);
      expect(biome.task.steps[0].exec).toContain(newLintPattern);
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
        const config = synthSnapshot(project)["biome.jsonc"];
        expect(config).toMatchSnapshot();
      });

      it("with linter", () => {
        const project = getTestProject({ eslint: false, prettier: false });
        new Biome(project, { linter: true });
        const config = synthSnapshot(project)["biome.jsonc"];
        expect(config).toMatchSnapshot();
      });

      it("with formatter", () => {
        const project = getTestProject({ eslint: false, prettier: false });
        new Biome(project, { formatter: true });
        const config = synthSnapshot(project)["biome.jsonc"];
        expect(config).toMatchSnapshot();
      });

      it("with import organizer", () => {
        const project = getTestProject({ eslint: false, prettier: false });
        new Biome(project, { organizeImports: true });
        const config = synthSnapshot(project)["biome.jsonc"];
        expect(config).toMatchSnapshot();
      });

      it("with all features", () => {
        const project = getTestProject({ eslint: false, prettier: false });
        new Biome(project, {
          linter: true,
          formatter: true,
          organizeImports: true,
        });
        const config = synthSnapshot(project)["biome.jsonc"];
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
            linter: {
              ignore: ["**/bin"],
            },
          },
        });
        const mergedConfig = synthSnapshot(project)["biome.jsonc"];

        expect(mergedConfig.linter?.ignore?.length >= 2).toBe(true);
      });

      it("without duplicate values", () => {
        const project = getTestProject({ eslint: false, prettier: false });
        new Biome(project, { linter: true });
        const config = synthSnapshot(project)["biome.jsonc"];

        expect(config.linter?.ignore?.[0]).toBeDefined();

        const project2 = getTestProject({ eslint: false, prettier: false });
        new Biome(project2, {
          linter: true,
          biomeConfig: {
            linter: {
              ignore: [...config.linter!.ignore!],
            },
          },
        });
        const mergedConfig = synthSnapshot(project2)["biome.jsonc"];

        expect(mergedConfig.linter!.ignore!.length).toBe(
          config.linter!.ignore!.length
        );
      });
    });

    describe("replace whole array", () => {
      it("when mergeArraysInConfiguration is false", () => {
        const project = getTestProject({ eslint: false, prettier: false });
        new Biome(project, {
          linter: true,
          mergeArraysInConfiguration: false,
          biomeConfig: {
            linter: {
              ignore: ["foo"],
            },
          },
        });
        const mergedConfig = synthSnapshot(project)["biome.jsonc"];

        expect(mergedConfig.linter?.ignore).toEqual(["foo"]);
      });
    });

    it("make deep merge", () => {
      const project = getTestProject({ eslint: false, prettier: false });
      new Biome(project, {
        linter: true,
        biomeConfig: {
          linter: {
            rules: {
              a11y: {
                noBlankTarget: "error",
              },
            },
          },
        },
      });
      const mergedConfig = synthSnapshot(project)["biome.jsonc"];

      expect(mergedConfig.linter!.rules).toBeDefined();
      expect(mergedConfig.linter!.rules).toMatchObject({
        recommended: true,
        a11y: {
          noBlankTarget: "error",
        },
      });
    });
  });
});
