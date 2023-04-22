import * as semver from "semver";
import * as ts from "typescript";
import {
  NodeProject,
  TypescriptConfig,
  TypescriptConfigExtends,
  TypeScriptModuleResolution,
} from "../../src/javascript";
import * as utils from "../../src/util";
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
        extends: TypescriptConfigExtends.fromTypescriptConfigs([baseConfig]),
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
      expect(loadedConfig.config).toHaveProperty("extends", "./tsconfig.json");
      expect(loadedBase.config).not.toHaveProperty("extends");
    });
  });

  test("TypeScript should allow parse package for extends.", () => {
    withProjectDir((outdir) => {
      const project = new NodeProject({
        name: "project",
        defaultReleaseBranch: "main",
        outdir,
      });
      const baseConfig = new TypescriptConfig(project, {
        compilerOptions: { outDir: "testOurDir" },
        extends: TypescriptConfigExtends.fromPaths([
          "@tsconfig/recommended/tsconfig.json",
        ]),
      });
      project.synth();

      const loadedConfig = ts.readConfigFile(
        baseConfig.file.absolutePath,
        ts.sys.readFile
      );
      expect(loadedConfig.error).toBeUndefined();
      expect(loadedConfig.config).toHaveProperty(
        "extends",
        "@tsconfig/recommended/tsconfig.json"
      );
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
        extends: TypescriptConfigExtends.fromTypescriptConfigs([buildBase]),
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
        "./tsconfig.build.json"
      );
      // expect array extends field when multiple extensions.
      expect(loadedConfig.error).toBeUndefined();
      expect(loadedConfig.config).toHaveProperty("extends", [
        "../tsconfig.json",
        "./b/d/c/tsconfig.bundler.json",
        "../other/bases/tsconfig.esm.json",
      ]);
    });
  });

  const extendsCase = (
    tsVersion: string,
    warns: { none: boolean; single: boolean; multi: boolean },
    tscVersion?: string,
    expectTscCalled?: boolean
  ) => {
    return [
      {
        tsVersion,
        extends: [],
        tscVersion,
        expectWarn: warns.none,
        expectTscCalled: false,
      },
      {
        tsVersion,
        extends: ["./tsconfig.esm.json"],
        tscVersion,
        expectWarn: warns.single,
        expectTscCalled: false,
      },
      {
        tsVersion,
        extends: ["./tsconfig.esm.json", "./other/tsconfig.json"],
        tscVersion,
        expectWarn: warns.multi,
        expectTscCalled: Boolean(expectTscCalled),
      },
    ];
  };

  test.each([
    // no dependency, no tsc
    ...extendsCase(
      "",
      { none: false, single: false, multi: false },
      undefined,
      true
    ),
    // no dependency, tsc 4.5.0
    ...extendsCase(
      "",
      { none: false, single: false, multi: true },
      "Version 4.5.0",
      true
    ),
    // no dependency, tsc 5.0.0
    ...extendsCase(
      "",
      { none: false, single: false, multi: false },
      "Version 5.0.0",
      true
    ),
    ...extendsCase(
      "typescript@*",
      {
        none: false,
        single: false,
        multi: true,
      },
      "Version 4.5.0",
      true
    ),
    ...extendsCase(
      "typescript@*",
      {
        none: false,
        single: false,
        multi: false,
      },
      "Version 5.0.0",
      true
    ),
    ...extendsCase("typescript@^4", {
      none: false,
      single: false,
      multi: true,
    }),
    ...extendsCase("typescript@^5", {
      none: false,
      single: false,
      multi: false,
    }),
  ])(
    "Should warn when using extends with %p",
    ({
      tsVersion,
      tscVersion,
      extends: extendsPaths,
      expectWarn,
      expectTscCalled,
    }) => {
      withProjectDir((outdir) => {
        const project = new NodeProject({
          name: "project",
          defaultReleaseBranch: "main",
          outdir,
          ...(tsVersion && { devDeps: [tsVersion] }),
        });
        const tsconfig = new TypescriptConfig(project, {
          fileName: "tsconfig.json",
          extends: TypescriptConfigExtends.fromPaths(extendsPaths),
          compilerOptions: {},
        });
        const logSpy = jest.spyOn(project.logger, "warn");
        const execUndefinedSpy = jest.spyOn(utils, "execOrUndefined");
        if (tscVersion) {
          execUndefinedSpy.mockReturnValueOnce(tscVersion);
        }
        project.synth();
        const doExpect = expectWarn ? expect(logSpy) : expect(logSpy).not;
        const doExpectTsc = expectTscCalled
          ? expect(execUndefinedSpy)
          : expect(execUndefinedSpy).not;
        const versFromDep = semver.coerce(
          project.deps.tryGetDependency("typescript")?.version,
          { loose: true }
        );
        const vers = expectTscCalled
          ? tscVersion?.split?.(" ")?.[1]
          : versFromDep;
        doExpect.toHaveBeenCalledWith(
          "TypeScript < 5.0.0 can only extend from a single base config.",
          `TypeScript Version: ${vers}`,
          `File: ${tsconfig.file.absolutePath}`,
          `Extends: ${extendsPaths}`
        );
        doExpectTsc.toHaveBeenCalled();
      });
    }
  );
});
