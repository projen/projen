import { existsSync, readFileSync, writeFileSync, mkdirSync } from "fs";
import * as path from "path";
import * as semver from "semver";
import * as ts from "typescript";
import { Project } from "../../src";
import type {
  TypeScriptCompilerOptions,
  TypescriptConfigOptions,
} from "../../src/javascript";
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

  test.each<[TypescriptConfigOptions["references"]]>([
    [undefined],
    [[]],
    [
      [
        { path: "../lib" },
        { path: "../other/tsconfig.build.json" },
        { path: "../lib" },
      ],
    ],
  ])("synthesizes references %p without mutating input", async (references) => {
    await withProjectDir(async (outdir) => {
      const originalReferences = references?.map((reference) => ({
        ...reference,
      }));
      references?.forEach(Object.freeze);
      Object.freeze(references);
      const project = new Project({ name: "project", outdir });
      const config = new TypescriptConfig(project, {
        compilerOptions: { strict: true },
        references,
      });

      project.synth();
      const first = readFileSync(config.file.absolutePath, "utf8");
      const loaded = ts.readConfigFile(
        config.file.absolutePath,
        ts.sys.readFile,
      );
      expect(loaded.error).toBeUndefined();
      expect(loaded.config).toStrictEqual({
        compilerOptions: { strict: true },
        include: ["**/*.ts"],
        exclude: ["node_modules"],
        ...(references === undefined ? {} : { references: originalReferences }),
      });

      project.synth();
      expect(readFileSync(config.file.absolutePath, "utf8")).toBe(first);
      expect(references).toStrictEqual(originalReferences);
    });
  });

  test.each(["directory", "file", "backslashes", "absolute"])(
    "resolves a %s reference from a nested configuration directory",
    async (kind) => {
      await withProjectDir(async (outdir) => {
        const root = new Project({ name: "root", outdir });
        const app = new Project({
          parent: root,
          name: "app",
          outdir: "packages/app",
        });
        const lib = new Project({
          parent: root,
          name: "lib",
          outdir: "packages/lib",
        });
        const target =
          kind === "directory"
            ? "tsconfig.json"
            : "configs/tsconfig.build.json";
        const relativePath =
          kind === "directory" ? "../../lib" : `../../lib/${target}`;
        const referencePath =
          kind === "absolute"
            ? path.join(lib.outdir, target)
            : kind === "backslashes"
              ? relativePath.replace(/\//g, "\\")
              : relativePath;
        const config = new TypescriptConfig(app, {
          fileName: "configs/tsconfig.app.json",
          compilerOptions: {},
          include: ["../src/**/*.ts"],
          references: [{ path: referencePath }],
        });
        mkdirSync(path.join(app.outdir, "src"), { recursive: true });
        writeFileSync(path.join(app.outdir, "src/index.ts"), "export {};\n");

        expect(existsSync(path.join(lib.outdir, target))).toBe(false);
        app.synth();
        const loaded = ts.readConfigFile(
          config.file.absolutePath,
          ts.sys.readFile,
        );
        expect(loaded.error).toBeUndefined();
        expect(loaded.config.references).toStrictEqual([
          { path: referencePath.replace(/\\/g, "/") },
        ]);
        const parsed = ts.parseJsonConfigFileContent(
          loaded.config,
          ts.sys,
          path.dirname(config.file.absolutePath),
        );
        expect(parsed.errors).toEqual([]);
        expect(
          parsed.projectReferences?.map((reference) => reference.path),
        ).toEqual([
          (kind === "directory"
            ? lib.outdir
            : path.join(lib.outdir, target)
          ).replace(/\\/g, "/"),
        ]);
        expect(existsSync(path.join(lib.outdir, target))).toBe(false);
      });
    },
  );

  test("references coexist with extends without being inherited or merged", async () => {
    await withProjectDir(async (outdir) => {
      const project = new Project({ name: "project", outdir });
      const base = new TypescriptConfig(project, {
        compilerOptions: { strict: true },
        references: [{ path: "../base-lib" }],
      });
      const inherited = new TypescriptConfig(project, {
        fileName: "tsconfig.inherited.json",
        extends: TypescriptConfigExtends.fromTypescriptConfigs([base]),
      });
      const explicit = new TypescriptConfig(project, {
        fileName: "tsconfig.explicit.json",
        extends: TypescriptConfigExtends.fromTypescriptConfigs([base]),
        references: [{ path: "../own-lib" }],
      });
      writeFileSync(path.join(outdir, "index.ts"), "export {};\n");
      project.synth();

      const parse = (config: TypescriptConfig) => {
        const loaded = ts.readConfigFile(
          config.file.absolutePath,
          ts.sys.readFile,
        );
        expect(loaded.error).toBeUndefined();
        const parsed = ts.parseJsonConfigFileContent(
          loaded.config,
          ts.sys,
          outdir,
        );
        expect(parsed.errors).toEqual([]);
        expect(parsed.options.strict).toBe(true);
        return parsed.projectReferences;
      };
      expect(parse(inherited)).toBeUndefined();
      expect(parse(explicit)?.map((reference) => reference.path)).toEqual([
        path.resolve(outdir, "../own-lib").replace(/\\/g, "/"),
      ]);
      expect(parse(base)?.map((reference) => reference.path)).toEqual([
        path.resolve(outdir, "../base-lib").replace(/\\/g, "/"),
      ]);
    });
  });

  test.each<[TypeScriptCompilerOptions]>([
    [{ composite: true }],
    [{ composite: false }],
    [{}],
  ])("synthesizes composite from %p", async (compilerOptions) => {
    await withProjectDir(async (outdir) => {
      const project = new NodeProject({
        name: "project",
        defaultReleaseBranch: "main",
        outdir,
      });
      const options = { outDir: "lib", strict: true, ...compilerOptions };
      const tsConfig = new TypescriptConfig(project, {
        compilerOptions: options,
        include: ["src/**/*.ts"],
      });
      project.synth();

      const loadedConfig = ts.readConfigFile(
        tsConfig.file.absolutePath,
        ts.sys.readFile,
      );

      expect(loadedConfig.error).toBeUndefined();
      expect(loadedConfig.config).toStrictEqual({
        compilerOptions: options,
        include: ["src/**/*.ts"],
        exclude: ["node_modules"],
      });
    });
  });

  test.each<[TypeScriptCompilerOptions]>([
    [{ erasableSyntaxOnly: true }],
    [{ erasableSyntaxOnly: false }],
    [{}],
  ])("synthesizes erasableSyntaxOnly from %p", async (compilerOptions) => {
    await withProjectDir(async (outdir) => {
      const project = new NodeProject({
        name: "project",
        defaultReleaseBranch: "main",
        outdir,
      });
      const tsConfig = new TypescriptConfig(project, { compilerOptions });
      project.synth();

      const loadedConfig = ts.readConfigFile(
        tsConfig.file.absolutePath,
        ts.sys.readFile,
      );

      expect(loadedConfig.error).toBeUndefined();
      expect(loadedConfig.config.compilerOptions).toEqual(compilerOptions);
    });
  });

  test.each<[TypeScriptCompilerOptions]>([
    [{ isolatedDeclarations: true }],
    [{ isolatedDeclarations: false }],
    [{}],
  ])("synthesizes isolatedDeclarations from %p", async (compilerOptions) => {
    await withProjectDir(async (outdir) => {
      const project = new NodeProject({
        name: "project",
        defaultReleaseBranch: "main",
        outdir,
      });
      const tsConfig = new TypescriptConfig(project, { compilerOptions });
      project.synth();

      const loadedConfig = ts.readConfigFile(
        tsConfig.file.absolutePath,
        ts.sys.readFile,
      );

      expect(loadedConfig.error).toBeUndefined();
      expect(loadedConfig.config.compilerOptions).toEqual(compilerOptions);
    });
  });

  test.each<[TypeScriptCompilerOptions]>([
    [{ preserveConstEnums: true }],
    [{ preserveConstEnums: false }],
    [{}],
  ])("synthesizes preserveConstEnums from %p", async (compilerOptions) => {
    await withProjectDir(async (outdir) => {
      const project = new NodeProject({
        name: "project",
        defaultReleaseBranch: "main",
        outdir,
      });
      const options = { outDir: "lib", ...compilerOptions };
      const tsConfig = new TypescriptConfig(project, {
        compilerOptions: options,
      });
      project.synth();

      const loadedConfig = ts.readConfigFile(
        tsConfig.file.absolutePath,
        ts.sys.readFile,
      );

      expect(loadedConfig.error).toBeUndefined();
      expect(loadedConfig.config.compilerOptions).toStrictEqual(options);
    });
  });

  test("TypeScript should parse generated config without warnings", async () => {
    await withProjectDir(async (outdir) => {
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
        ts.sys.readFile,
      );

      expect(loadedConfig.error).toBeUndefined();
      expect(loadedConfig.config).toHaveProperty(
        "compilerOptions.outDir",
        "testOurDir",
      );
    });
  });

  test("TypeScript should parse generated config with extensions without warnings", async () => {
    await withProjectDir(async (outdir) => {
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
        ts.sys.readFile,
      );
      const loadedConfig = ts.readConfigFile(
        tsConfig.file.absolutePath,
        ts.sys.readFile,
      );

      expect(loadedConfig.error).toBeUndefined();
      expect(loadedConfig.config).toHaveProperty("extends", "./tsconfig.json");
      expect(loadedBase.config).not.toHaveProperty("extends");
    });
  });

  test("TypeScript should allow parse package for extends.", async () => {
    await withProjectDir(async (outdir) => {
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
        ts.sys.readFile,
      );
      expect(loadedConfig.error).toBeUndefined();
      expect(loadedConfig.config).toHaveProperty(
        "extends",
        "@tsconfig/recommended/tsconfig.json",
      );
    });
  });

  test("TypeScript should allow parse package for extends witout compilerOptions.", async () => {
    await withProjectDir(async (outdir) => {
      const project = new NodeProject({
        name: "project",
        defaultReleaseBranch: "main",
        outdir,
      });
      const baseConfig = new TypescriptConfig(project, {
        // No compilerOptions
        extends: TypescriptConfigExtends.fromPaths([
          "@tsconfig/recommended/tsconfig.json",
        ]),
      });
      project.synth();

      const loadedConfig = ts.readConfigFile(
        baseConfig.file.absolutePath,
        ts.sys.readFile,
      );
      expect(loadedConfig.error).toBeUndefined();
      expect(loadedConfig.config).toHaveProperty(
        "extends",
        "@tsconfig/recommended/tsconfig.json",
      );
    });
  });

  test("TypescriptConfig requires either extends or compilerOptions.", () => {
    expect(() => {
      const project = new NodeProject({
        name: "project",
        defaultReleaseBranch: "main",
      });
      new TypescriptConfig(project, {
        // No compilerOptions
        // No extends
      });
    }).toThrow(/Must provide either `extends` or `compilerOptions`/);
  });

  test("TypeScript should parse generated config with multiple extensions", async () => {
    await withProjectDir(async (outdir) => {
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
        ts.sys.readFile,
      );
      const buildConfig = ts.readConfigFile(
        buildBase.file.absolutePath,
        ts.sys.readFile,
      );
      const baseConfig = ts.readConfigFile(
        commonBase.file.absolutePath,
        ts.sys.readFile,
      );

      // expect no "extends" field by default.
      expect(buildConfig.error).toBeUndefined();
      expect(buildConfig.config).not.toHaveProperty("extends");
      // expect string extends field when singular extension.
      expect(baseConfig.error).toBeUndefined();
      expect(baseConfig.config).toHaveProperty(
        "extends",
        "./tsconfig.build.json",
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
    manifestVersion?: string,
  ) => {
    return [
      {
        tsVersion,
        extends: [],
        manifestVersion,
        expectWarn: warns.none,
      },
      {
        tsVersion,
        extends: ["./tsconfig.esm.json"],
        manifestVersion,
        expectWarn: warns.single,
      },
      {
        tsVersion,
        extends: ["./tsconfig.esm.json", "./other/tsconfig.json"],
        manifestVersion,
        expectWarn: warns.multi,
      },
    ];
  };

  test.each([
    // no dependency, no tsc
    ...extendsCase("", { none: false, single: false, multi: false }, undefined),
    // no dependency, tsc 4.5.0
    ...extendsCase("", { none: false, single: false, multi: true }, "4.5.0"),
    // no dependency, tsc 5.0.0
    ...extendsCase("", { none: false, single: false, multi: false }, "5.0.0"),
    ...extendsCase(
      "typescript@*",
      {
        none: false,
        single: false,
        multi: true,
      },
      "4.5.0",
    ),
    ...extendsCase(
      "typescript@*",
      {
        none: false,
        single: false,
        multi: false,
      },
      "5.0.0",
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
    async ({
      tsVersion,
      manifestVersion,
      extends: extendsPaths,
      expectWarn,
    }) => {
      await withProjectDir(async (outdir) => {
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
        if (manifestVersion) {
          const mockManifestPath = path.join(
            outdir,
            "node_modules/typescript/package.json",
          );
          mkdirSync(path.dirname(mockManifestPath), { recursive: true });
          writeFileSync(
            mockManifestPath,
            JSON.stringify({ name: "typescript", version: manifestVersion }),
          );
        }
        project.synth();
        const doExpect = expectWarn ? expect(logSpy) : expect(logSpy).not;
        const versFromDep = semver.coerce(
          project.deps.tryGetDependency("typescript")?.version,
          { loose: true },
        );
        const vers = manifestVersion ?? versFromDep;
        doExpect.toHaveBeenCalledWith(
          "TypeScript < 5.0.0 can only extend from a single base config.",
          `TypeScript Version: ${vers}`,
          `File: ${tsconfig.file.absolutePath}`,
          `Extends: ${extendsPaths}`,
        );
      });
    },
  );

  test("Should allow adding to the includes array", () => {
    const testNodeProject = new NodeProject({
      defaultReleaseBranch: "main",
      name: "test-node-project",
    });

    const typescriptConfig = new TypescriptConfig(testNodeProject, {
      compilerOptions: {},
    });

    typescriptConfig.addInclude("test/**/*.ts");

    expect(typescriptConfig.include).toContain("test/**/*.ts");
  });

  test("Should allow adding to the excludes array", () => {
    const testNodeProject = new NodeProject({
      defaultReleaseBranch: "main",
      name: "test-node-project",
    });

    const typescriptConfig = new TypescriptConfig(testNodeProject, {
      compilerOptions: {},
    });

    typescriptConfig.addExclude("test/**/*.ts");

    expect(typescriptConfig.exclude).toContain("test/**/*.ts");
  });

  test("Should allow removing from the includes array", () => {
    const testNodeProject = new NodeProject({
      defaultReleaseBranch: "main",
      name: "test-node-project",
    });

    const typescriptConfig = new TypescriptConfig(testNodeProject, {
      compilerOptions: {},
    });

    typescriptConfig.addInclude("test/**/*.ts");
    typescriptConfig.removeInclude("test/**/*.ts");

    expect(typescriptConfig.include).not.toContain("test/**/*.ts");
  });

  test("Should allow removing from the excludes array", () => {
    const testNodeProject = new NodeProject({
      defaultReleaseBranch: "main",
      name: "test-node-project",
    });

    const typescriptConfig = new TypescriptConfig(testNodeProject, {
      compilerOptions: {},
    });

    typescriptConfig.addExclude("test/**/*.ts");
    typescriptConfig.removeExclude("test/**/*.ts");

    expect(typescriptConfig.exclude).not.toContain("test/**/*.ts");
  });
});
