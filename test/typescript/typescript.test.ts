import * as fs from "fs";
import * as path from "path";
import { Logger, TaskRuntime } from "../../src";
import { DEFAULT_PROJEN_RC_JS_FILENAME } from "../../src/common";
import { Transform } from "../../src/javascript";
import {
  mergeTsconfigOptions,
  TsJestTsconfig,
  TypeScriptAppProject,
  TypeScriptProject,
} from "../../src/typescript";
import { execProjenCLI, synthSnapshot, withProjectDir } from "../util";

describe("TypeScriptProject with default settings", () => {
  it("synthesizes", () => {
    const project = new TypeScriptProject({
      defaultReleaseBranch: "main",
      name: "test",
    });

    const output = synthSnapshot(project);
    expect(output).toMatchSnapshot();
  });

  it("compiles", () => {
    const project = new TypeScriptProject({
      defaultReleaseBranch: "main",
      name: "test",
    });

    project.synth();

    execProjenCLI(project.outdir, ["compile"]);
  });
});

describe("mergeTsconfigOptions", () => {
  test("merging includes", () => {
    const mergedTsconfigOptions = mergeTsconfigOptions(
      {
        include: ["typescript.test.ts"],
        compilerOptions: {},
      },
      {
        include: ["abc"],
        compilerOptions: {},
      }
    );

    expect(mergedTsconfigOptions).toEqual(
      expect.objectContaining({
        include: ["typescript.test.ts", "abc"],
      })
    );
  });

  test("merging excludes", () => {
    const mergedTsconfigOptions = mergeTsconfigOptions(
      {
        exclude: ["typescript.test.ts"],
        compilerOptions: {},
      },
      {
        exclude: ["abc"],
        compilerOptions: {},
      }
    );

    expect(mergedTsconfigOptions).toEqual(
      expect.objectContaining({
        exclude: ["typescript.test.ts", "abc"],
      })
    );
  });

  test("merging compilerOptions", () => {
    const mergedTsconfigOptions = mergeTsconfigOptions(
      {
        compilerOptions: {
          esModuleInterop: false,
        },
      },
      {
        compilerOptions: {
          esModuleInterop: true,
        },
      }
    );

    expect(mergedTsconfigOptions).toEqual(
      expect.objectContaining({
        compilerOptions: {
          esModuleInterop: true,
        },
      })
    );
  });
});

test("tsconfig prop is propagated to eslint and jest tsconfigs", () => {
  const prj = new TypeScriptProject({
    name: "test",
    defaultReleaseBranch: "test",
    tsconfig: {
      include: ["typescript.test.ts"],
      compilerOptions: {
        esModuleInterop: true,
      },
    },
  });

  const out = synthSnapshot(prj);

  expect(out["tsconfig.json"]).toEqual(
    expect.objectContaining({
      include: expect.arrayContaining([
        `${prj.srcdir}/**/*.ts`,
        "typescript.test.ts",
      ]),
      compilerOptions: expect.objectContaining({
        esModuleInterop: true,
      }),
    })
  );

  expect(out["tsconfig.dev.json"]).toEqual(
    expect.objectContaining({
      include: expect.arrayContaining([
        DEFAULT_PROJEN_RC_JS_FILENAME,
        `${prj.srcdir}/**/*.ts`,
        `${prj.testdir}/**/*.ts`,
        "typescript.test.ts",
      ]),
      compilerOptions: expect.objectContaining({
        esModuleInterop: true,
      }),
    })
  );

  expect(out["tsconfig.dev.json"]).toEqual(
    expect.objectContaining({
      include: expect.arrayContaining([
        DEFAULT_PROJEN_RC_JS_FILENAME,
        `${prj.srcdir}/**/*.ts`,
        `${prj.testdir}/**/*.ts`,
        "typescript.test.ts",
      ]),
      compilerOptions: expect.objectContaining({
        esModuleInterop: true,
      }),
    })
  );
});

test("sources and compiled output can be collocated", () => {
  const prj = new TypeScriptProject({
    name: "test",
    defaultReleaseBranch: "test",
    libdir: "lib",
    srcdir: "lib",
  });

  expect(prj.tsconfig?.exclude).not.toContain("/lib");

  const snapshot = synthSnapshot(prj);
  expect(snapshot[".gitignore"]).toMatchSnapshot();
  expect(snapshot[".npmignore"]).toMatchSnapshot();
});

test("tsconfigDevFile can be used to control the name of the tsconfig dev file", () => {
  const prj = new TypeScriptProject({
    name: "test",
    defaultReleaseBranch: "test",
    tsconfigDevFile: "tsconfig.foo.json",
    libdir: "lib",
    srcdir: "lib",
  });

  expect(prj.tsconfigDev.fileName).toBe("tsconfig.foo.json");

  const snapshot = synthSnapshot(prj);
  expect(snapshot["tsconfig.foo.json"]).not.toBeUndefined();
});

test("projenrc.ts", () => {
  const prj = new TypeScriptProject({
    name: "test",
    defaultReleaseBranch: "main",
    projenrcTs: true,
  });

  const snapshot = synthSnapshot(prj);
  expect(snapshot["tsconfig.dev.json"].include).toContain(".projenrc.ts");
  expect(snapshot["tsconfig.dev.json"].include).not.toContain(".projenrc.js");
  expect(snapshot[".projen/tasks.json"].tasks.default).toStrictEqual({
    description: "Synthesize project files",
    name: "default",
    steps: [{ exec: "ts-node --project tsconfig.dev.json .projenrc.ts" }],
  });
});

test("mentions .projenrc.ts in the file marker", () => {
  // GIVEN
  const p = new TypeScriptProject({
    name: "test",
    defaultReleaseBranch: "main",
    projenrcTs: true,
  });

  // THEN
  const snapshot = synthSnapshot(p);
  expect(snapshot[".gitignore"]).toContain("To modify, edit .projenrc.ts");
});

test("eslint configured to support .projenrc.ts and projenrc src dir", () => {
  const prj = new TypeScriptProject({
    name: "test",
    defaultReleaseBranch: "main",
    projenrcTs: true,
  });

  const snapshot = synthSnapshot(prj);
  expect(snapshot[".projen/tasks.json"].tasks.eslint).toStrictEqual({
    description: "Runs eslint against the codebase",
    name: "eslint",
    steps: [
      {
        exec: "eslint --ext .ts,.tsx --fix --no-error-on-unmatched-pattern $@ src test build-tools projenrc .projenrc.ts",
        receiveArgs: true,
      },
    ],
  });
  expect(snapshot[".eslintrc.json"]).toMatchObject({
    ignorePatterns: expect.arrayContaining([
      "!.projenrc.ts",
      "!projenrc/**/*.ts",
    ]),
    rules: expect.objectContaining({
      "import/no-extraneous-dependencies": [
        "error",
        expect.objectContaining({
          devDependencies: expect.arrayContaining([
            ".projenrc.ts",
            "projenrc/**/*.ts",
          ]),
        }),
      ],
    }),
  });
});

test("upgrade task ignores pinned versions", () => {
  const prj = new TypeScriptProject({
    defaultReleaseBranch: "main",
    name: "test",
    deps: ["npm@^8"],
    typescriptVersion: "4.4.4",
  });
  const tasks = synthSnapshot(prj)[TaskRuntime.MANIFEST_FILE].tasks;
  expect(tasks.upgrade.steps).toMatchInlineSnapshot(`
    [
      {
        "exec": "npx npm-check-updates@16 --upgrade --target=minor --peer --dep=dev,peer,prod,optional --filter=@types/jest,eslint-import-resolver-typescript,eslint-plugin-import,jest,projen,ts-jest",
      },
      {
        "exec": "yarn install --check-files",
      },
      {
        "exec": "yarn upgrade @types/jest @types/node @typescript-eslint/eslint-plugin @typescript-eslint/parser commit-and-tag-version constructs eslint-import-resolver-typescript eslint-plugin-import eslint jest jest-junit projen ts-jest typescript npm",
      },
      {
        "exec": "npx projen",
      },
      {
        "spawn": "post-upgrade",
      },
    ]
  `);
});

describe("jestConfig", () => {
  const LEGACY_WARNING =
    "You are using a legacy version (<29) of jest and ts-jest that does not support tsJestOptions, they will be ignored.";

  describe("Modern", () => {
    test("uses default values", () => {
      const prj = new TypeScriptProject({
        defaultReleaseBranch: "main",
        name: "test",
        jestOptions: {
          // jestVersion default is latest
          jestConfig: {},
        },
      });
      const snapshot = synthSnapshot(prj);
      const jestConfig = snapshot["package.json"].jest;
      const transformConfig =
        jestConfig.transform[
          TypeScriptProject.DEFAULT_TS_JEST_TRANFORM_PATTERN
        ];

      expect(transformConfig).toBeDefined();
      expect(transformConfig[0]).toStrictEqual("ts-jest");
      expect(transformConfig[1]).toStrictEqual({
        tsconfig: "tsconfig.dev.json",
      });
    });

    test("properly merges jest transforms", () => {
      const JS_PATTERN = "^.+\\.[j]sx?$";
      const prj = new TypeScriptProject({
        defaultReleaseBranch: "main",
        name: "test",
        jestOptions: {
          // jestVersion default is latest
          jestConfig: {
            transform: {
              [JS_PATTERN]: new Transform("babel-jest"),
            },
          },
        },
      });
      const snapshot = synthSnapshot(prj);
      const jestConfig = snapshot["package.json"].jest;

      expect(Object.keys(jestConfig.transform)).toHaveLength(2);
      expect(jestConfig.transform[JS_PATTERN]).toStrictEqual("babel-jest");

      expect(Object.keys(jestConfig.transform)).toHaveLength(2);
      expect(jestConfig.transform[JS_PATTERN]).toStrictEqual("babel-jest");
    });

    test("allows overriding of ts-jest transform pattern", () => {
      const loggerWarnSpy = jest.spyOn(Logger.prototype, "warn");
      const TS_WITH_JS_PATTERN = "^.+\\.[tj]sx?$";

      // BEFORE we create the project, drop a package.json in the project
      // root to ensure that external projects don't trigger the legacy warning.
      // In order to do that, we need to make the folder ourselves instead of
      // relying on the Project calss making one for us.
      withProjectDir(
        (projectdir) => {
          fs.writeFileSync(
            path.join(projectdir, "package.json"),
            `{"dependencies": {}}`
          );

          const prj = new TypeScriptProject({
            outdir: projectdir,
            defaultReleaseBranch: "main",
            name: "test",
            jestOptions: {
              // jestVersion default is latest
              jestConfig: {},
            },
            tsJestOptions: {
              transformPattern: TS_WITH_JS_PATTERN,
            },
          });

          // This is a new project, without any reference to 'jest' or 'ts-jest'
          // so we shouldn't see any legacy warnings.
          expect(loggerWarnSpy).not.toHaveBeenCalledWith(LEGACY_WARNING);

          const snapshot = synthSnapshot(prj);
          const jestConfig = snapshot["package.json"].jest;
          const transformConfig = jestConfig.transform[TS_WITH_JS_PATTERN];

          expect(transformConfig).toBeDefined();
          expect(transformConfig[0]).toStrictEqual("ts-jest");
          expect(transformConfig[1]).toStrictEqual({
            tsconfig: "tsconfig.dev.json",
          });
        },
        { git: false }
      );
    });

    test("allows overriding of ts-jest transform options", () => {
      const prj = new TypeScriptProject({
        defaultReleaseBranch: "main",
        name: "test",
        jestOptions: {
          // jestVersion default is latest
          jestConfig: {},
        },
        tsJestOptions: {
          transformOptions: {
            isolatedModules: true,
            tsconfig: TsJestTsconfig.fromFile("bar"),
          },
        },
      });
      const snapshot = synthSnapshot(prj);
      const jestConfig = snapshot["package.json"].jest;
      const transformConfig =
        jestConfig.transform[
          TypeScriptProject.DEFAULT_TS_JEST_TRANFORM_PATTERN
        ];

      expect(transformConfig).toBeDefined();
      expect(transformConfig[0]).toStrictEqual("ts-jest");
      expect(transformConfig[1]).toStrictEqual({
        isolatedModules: true,
        tsconfig: "bar",
      });
    });

    test("sets testMatch to include src and test dirs by default", () => {
      const prj = new TypeScriptProject({
        defaultReleaseBranch: "main",
        name: "test",
        jestOptions: {
          // jestVersion default is latest
          jestConfig: {},
        },
      });
      const snapshot = synthSnapshot(prj);
      const jestConfig = snapshot["package.json"].jest;
      expect(jestConfig.testMatch).toStrictEqual([
        "<rootDir>/@(src|test)/**/*(*.)@(spec|test).ts?(x)",
        "<rootDir>/@(src|test)/**/__tests__/**/*.ts?(x)",
      ]);
    });
  });

  describe("Legacy", () => {
    test("uses default values", () => {
      const prj = new TypeScriptProject({
        defaultReleaseBranch: "main",
        name: "test",
        jestOptions: {
          jestVersion: "26",
          jestConfig: {
            globals: {
              "ts-jest": {
                shouldBePreserved: true,
              },
            },
          },
        },
      });
      const snapshot = synthSnapshot(prj);
      const jestConfig = snapshot["package.json"].jest;
      expect(jestConfig.preset).toStrictEqual("ts-jest");
      expect(jestConfig.globals["ts-jest"].tsconfig).toStrictEqual(
        "tsconfig.dev.json"
      );
      expect(jestConfig.globals["ts-jest"].shouldBePreserved).toStrictEqual(
        true
      );
    });

    test("overrides default values", () => {
      const prj = new TypeScriptProject({
        defaultReleaseBranch: "main",
        name: "test",
        jestOptions: {
          jestVersion: "26",
          jestConfig: {
            preset: "foo",
            globals: {
              "ts-jest": {
                shouldBePreserved: true,
                tsconfig: "bar",
              },
            },
          },
        },
      });
      const snapshot = synthSnapshot(prj);
      const jestConfig = snapshot["package.json"].jest;
      expect(jestConfig.preset).toStrictEqual("foo");
      expect(jestConfig.globals["ts-jest"].tsconfig).toStrictEqual("bar");
      expect(jestConfig.globals["ts-jest"].shouldBePreserved).toStrictEqual(
        true
      );
    });
  });

  test("Should warn when an attempt to set ts-jest options is made when using a legacy Jest version", () => {
    const loggerWarnSpy = jest.spyOn(Logger.prototype, "warn");

    new TypeScriptProject({
      defaultReleaseBranch: "main",
      name: "test",
      jestOptions: {
        jestVersion: "26",
      },
      tsJestOptions: {
        transformOptions: {
          isolatedModules: true,
        },
      },
    });

    expect(loggerWarnSpy).toHaveBeenCalledWith(
      "You are using a legacy version (<29) of jest and ts-jest that does not support tsJestOptions, they will be ignored."
    );

    loggerWarnSpy.mockRestore();
  });
});

describe("tsconfig", () => {
  test("uses tsconfig.json by default", () => {
    const prj = new TypeScriptProject({
      name: "test",
      projenrcTs: true,
      defaultReleaseBranch: "main",
    });

    const snapshot = synthSnapshot(prj);
    expect(prj.tsconfig?.fileName).toBe("tsconfig.json");
    expect(snapshot["tsconfig.json"]).not.toBeUndefined();
    expect(prj.compileTask.steps[0].exec).toEqual("tsc --build");
    expect(prj.watchTask.steps[0].exec).toEqual("tsc --build -w");
  });

  test("Should allow renaming of tsconfig.json", () => {
    const prj = new TypeScriptProject({
      name: "test",
      projenrcTs: true,
      defaultReleaseBranch: "main",
      tsconfig: {
        fileName: "foo.json",
        compilerOptions: {},
      },
      tsconfigDev: {
        fileName: "dev.json", // You must also give tsconfigDev a name, or it uses foo.json
        compilerOptions: {},
      },
    });

    const snapshot = synthSnapshot(prj);
    expect(prj.tsconfig?.fileName).toBe("foo.json");
    expect(snapshot["foo.json"]).not.toBeUndefined();
    expect(prj.compileTask.steps[0].exec).toEqual("tsc --build foo.json");
    expect(prj.watchTask.steps[0].exec).toEqual("tsc --build -w foo.json");
  });
});

describe("tsconfigDev", () => {
  test("uses tsconfig.dev.json by default", () => {
    const prj = new TypeScriptProject({
      name: "test",
      projenrcTs: true,
      defaultReleaseBranch: "main",
    });

    const snapshot = synthSnapshot(prj);
    expect(prj.tsconfigDev.fileName).toBe("tsconfig.dev.json");
    expect(snapshot["tsconfig.json"]).not.toBeUndefined();
    expect(snapshot["tsconfig.dev.json"]).not.toBeUndefined();
    expect(snapshot[".projen/tasks.json"].tasks.default).toStrictEqual(
      expect.objectContaining({
        steps: [{ exec: "ts-node --project tsconfig.dev.json .projenrc.ts" }],
      })
    );
  });

  test("uses tsconfig.json when disableTsconfigDev is passed", () => {
    const prj = new TypeScriptProject({
      name: "test",
      projenrcTs: true,
      defaultReleaseBranch: "main",
      disableTsconfigDev: true,
    });

    const snapshot = synthSnapshot(prj);
    expect(prj.tsconfigDev.fileName).toBe("tsconfig.json");
    expect(snapshot["tsconfig.json"]).not.toBeUndefined();
    expect(snapshot["tsconfig.dev.json"]).toBeUndefined();
    expect(snapshot[".projen/tasks.json"].tasks.default).toStrictEqual(
      expect.objectContaining({
        steps: [{ exec: "ts-node --project tsconfig.json .projenrc.ts" }],
      })
    );
  });

  test("throw error when both disableTsconfig and disableTsconfigDev is passed", () => {
    expect(
      () =>
        new TypeScriptProject({
          name: "test",
          projenrcTs: true,
          defaultReleaseBranch: "main",
          disableTsconfig: true,
          disableTsconfigDev: true,
        })
    ).toThrow(
      "Cannot specify both 'disableTsconfigDev' and 'disableTsconfig' fields."
    );
  });

  test("TypeScriptAppProject enables packaging when release is enabled", () => {
    const project = new TypeScriptAppProject({
      name: "test",
      projenrcTs: true,
      defaultReleaseBranch: "main",
      release: true,
    });
    project.synth();

    expect(project.packageTask.steps.length).not.toBe(0);
  });

  test("TypeScriptProject force enables packaging when release is enabled", () => {
    const loggerWarnSpy = jest.spyOn(Logger.prototype, "warn");
    const project = new TypeScriptAppProject({
      name: "test",
      projenrcTs: true,
      defaultReleaseBranch: "main",
      release: true,
      package: false,
    });
    project.synth();

    expect(project.packageTask.steps.length).not.toBe(0);
    expect(loggerWarnSpy).toHaveBeenCalledWith(
      expect.stringMatching("Force enabling `package`")
    );
  });

  test("@types/node version will match the typescriptVersion", () => {
    const project = new TypeScriptAppProject({
      name: "test",
      projenrcTs: true,
      defaultReleaseBranch: "main",
      typescriptVersion: "~5.4.0",
    });

    const packageJson = synthSnapshot(project)["package.json"];
    expect(packageJson.devDependencies["@types/node"]).toBe("ts5.4");
  });

  test("can define a custom version of @types/node", () => {
    const project = new TypeScriptAppProject({
      name: "test",
      projenrcTs: true,
      defaultReleaseBranch: "main",
      typescriptVersion: "5.6",
      devDeps: ["@types/node@ts4.8"],
    });

    const packageJson = synthSnapshot(project)["package.json"];
    expect(packageJson.devDependencies["@types/node"]).toBe("ts4.8");
  });
});
