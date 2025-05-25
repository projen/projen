import {
  Biome,
  _createBiomeConfiguration,
} from "../../../src/javascript/biome/biome";
import type { IConfiguration } from "../../../src/javascript/biome/biome-config";
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

      const config: IConfiguration = synthSnapshot(project)["biome.jsonc"];
      expect(config.formatter?.enabled).toBeTruthy();
    });

    it("organizer enabled", () => {
      const project = getTestProject({ eslint: false, prettier: false });
      new Biome(project, {
        organizeImports: true,
      });

      const config: IConfiguration = synthSnapshot(project)["biome.jsonc"];
      expect(config.organizeImports?.enabled).toBeTruthy();
    });

    it("custom overrides", () => {
      const project = getTestProject({ eslint: false, prettier: false });
      new Biome(project, {
        formatter: true,
        overrides: {
          files: {
            ignore: ["ignored-file.txt"],
          },
        },
      });

      const config: IConfiguration = synthSnapshot(project)["biome.jsonc"];
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
        expect(_createBiomeConfiguration({})).toMatchSnapshot();
      });
      it("with linter", () => {
        expect(_createBiomeConfiguration({ linter: true })).toMatchSnapshot();
      });

      it("with formatter", () => {
        expect(
          _createBiomeConfiguration({ formatter: true })
        ).toMatchSnapshot();
      });

      it("with import organizer", () => {
        expect(
          _createBiomeConfiguration({ organizeImports: true })
        ).toMatchSnapshot();
      });

      it("with all features", () => {
        expect(
          _createBiomeConfiguration({
            linter: true,
            formatter: true,
            organizeImports: true,
          })
        ).toMatchSnapshot();
      });
    });
  });

  describe("should", () => {
    describe("merge arrays", () => {
      it("when mergeArraysInConfiguration is true", () => {
        const linterConfig = _createBiomeConfiguration({ linter: true });

        expect(linterConfig.linter?.ignore?.[0]).toBeDefined();

        const mergedConfig = _createBiomeConfiguration({
          linter: true,
          overrides: {
            linter: {
              ignore: ["**/bin"],
            },
          },
        });

        expect(mergedConfig.linter?.ignore?.length).toBe(
          linterConfig.linter!.ignore!.length + 1
        );
      });

      it("without duplicate values", () => {
        const linterConfig = _createBiomeConfiguration({ linter: true });

        expect(linterConfig.linter?.ignore?.[0]).toBeDefined();
        const mergedConfig = _createBiomeConfiguration({
          linter: true,
          overrides: {
            linter: {
              ignore: [linterConfig.linter!.ignore![0]],
            },
          },
        });

        expect(
          mergedConfig.linter?.ignore?.filter(
            (ignore) => ignore === linterConfig.linter?.ignore?.[0]
          ).length
        ).toBe(1);
      });
    });

    describe("replace whole array", () => {
      it("when mergeArraysInConfiguration is false", () => {
        const linterConfig = _createBiomeConfiguration({ linter: true });
        if (!linterConfig.linter?.ignore?.[0]) {
        }

        expect(linterConfig.linter?.ignore?.[0]).toBeDefined();
        const mergedConfig = _createBiomeConfiguration({
          linter: true,
          mergeArraysInConfiguration: false,
          overrides: {
            linter: {
              ignore: [linterConfig.linter!.ignore![0]],
            },
          },
        });

        expect(
          mergedConfig.linter?.ignore?.filter(
            (ignore) => ignore === linterConfig.linter?.ignore?.[0]
          ).length
        ).toBe(1);
      });
    });

    it("make deep merge", () => {
      const mergedConfig = _createBiomeConfiguration({
        linter: true,
        overrides: {
          linter: {
            rules: {
              a11y: {
                noBlankTarget: "error",
              },
            },
          },
        },
      });

      expect(mergedConfig.linter?.rules).toBeDefined();
      expect(Object.keys(mergedConfig.linter!.rules!).length).toBeGreaterThan(
        1
      );
    });
  });
});
