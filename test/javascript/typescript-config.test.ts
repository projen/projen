import * as ts from "typescript";
import {
  NodeProject,
  TypescriptConfig,
  TypescriptConfigExtends,
  TypeScriptModuleResolution,
} from "../../src/javascript";
import { withProjectDir } from "../util";

describe("TypescriptConfig", () => {
  const ENV_PROJEN_DISABLE_POST = process.env.PROJEN_DISABLE_POST;
  beforeAll(() => {
    process.env.PROJEN_DISABLE_POST = "true";
  });
  afterAll(() => {
    process.env.PROJEN_DISABLE_POST = ENV_PROJEN_DISABLE_POST;
  });

  test("TypeScript should parse generated config without warnings", () => {
    withProjectDir((outdir) => {
      const project = new NodeProject({
        name: "project",
        defaultReleaseBranch: "main",
        outdir,
      });
      const tsConfig = new TypescriptConfig(project, {
        compilerOptions: { outDir: "testOurDir" },
      });
      project.synth();

      const loadedConfig = ts.readConfigFile(
        tsConfig.file.absolutePath,
        ts.sys.readFile
      );

      expect(loadedConfig.error).toBeUndefined();
      expect(loadedConfig.config).toHaveProperty(
        "compilerOptions.outDir",
        "testOurDir"
      );
    });
  });

  test("TypeScript should parse generated config with extensions without warnings", () => {
    withProjectDir((outdir) => {
      const project = new NodeProject({
        name: "project",
        defaultReleaseBranch: "main",
        outdir,
      });
      const baseConfig = new TypescriptConfig(project, {
        compilerOptions: { outDir: "testOurDir" },
      });
      const tsConfig = new TypescriptConfig(project, {
        fileName: "tsconfig.inherit.json",
        extends: TypescriptConfigExtends.fromTypeScriptConfigs([baseConfig]),
        compilerOptions: { allowJs: true },
      });
      project.synth();

      const loadedBase = ts.readConfigFile(
        baseConfig.file.absolutePath,
        ts.sys.readFile
      );
      const loadedConfig = ts.readConfigFile(
        tsConfig.file.absolutePath,
        ts.sys.readFile
      );

      expect(loadedConfig.error).toBeUndefined();
      expect(loadedConfig.config).toHaveProperty("extends", "tsconfig.json");
      expect(loadedBase.config).not.toHaveProperty("extends");
    });
  });

  test("TypeScript should parse generated config with multiple extensions", () => {
    withProjectDir((outdir) => {
      const project = new NodeProject({
        name: "project",
        defaultReleaseBranch: "main",
        outdir,
      });

      const buildBase = new TypescriptConfig(project, {
        fileName: "tsconfig.build.json",
        compilerOptions: { outDir: "buildDir" },
      });
      const commonBase = new TypescriptConfig(project, {
        fileName: "tsconfig.json",
        compilerOptions: { outDir: "testOurDir" },
        extends: TypescriptConfigExtends.fromTypeScriptConfigs([buildBase]),
      });

      const bundlerConfig = new TypescriptConfig(project, {
        fileName: "sub/b/d/c/tsconfig.bundler.json",
        compilerOptions: {
          moduleResolution: TypeScriptModuleResolution.BUNDLER,
        },
      });
      const esmConfig = new TypescriptConfig(project, {
        fileName: "other/bases/tsconfig.esm.json",
        compilerOptions: {
          module: "ESNext",
          target: "ESNext",
          lib: ["ESNext"],
        },
      });

      const tsConfig = new TypescriptConfig(project, {
        fileName: "sub/tsconfig.json",
        extends: TypescriptConfigExtends.fromPaths(["../tsconfig.json"]),
        compilerOptions: { allowJs: true },
      });
      tsConfig.addExtends(bundlerConfig);
      tsConfig.addExtends(esmConfig);

      project.synth();

      const loadedConfig = ts.readConfigFile(
        tsConfig.file.absolutePath,
        ts.sys.readFile
      );
      const buildConfig = ts.readConfigFile(
        buildBase.file.absolutePath,
        ts.sys.readFile
      );
      const baseConfig = ts.readConfigFile(
        commonBase.file.absolutePath,
        ts.sys.readFile
      );

      // expect no "extends" field by default.
      expect(buildConfig.error).toBeUndefined();
      expect(buildConfig.config).not.toHaveProperty("extends");
      // expect string extends field when singular extension.
      expect(baseConfig.error).toBeUndefined();
      expect(baseConfig.config).toHaveProperty(
        "extends",
        "tsconfig.build.json"
      );
      // expect array extends field when multiple extensions.
      expect(loadedConfig.error).toBeUndefined();
      expect(loadedConfig.config).toHaveProperty("extends", [
        "../tsconfig.json",
        "b/d/c/tsconfig.bundler.json",
        "../other/bases/tsconfig.esm.json",
      ]);
    });
  });
});
