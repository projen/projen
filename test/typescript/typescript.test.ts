import { TaskRuntime } from "../../src";
import { PROJEN_RC } from "../../src/common";
import { mergeTsconfigOptions, TypeScriptProject } from "../../src/typescript";
import { execProjenCLI, synthSnapshot } from "../util";

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
        PROJEN_RC,
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
        PROJEN_RC,
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
        exec: "eslint --ext .ts,.tsx --fix --no-error-on-unmatched-pattern src test build-tools projenrc .projenrc.ts",
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
        "exec": "yarn upgrade npm-check-updates",
      },
      {
        "exec": "npm-check-updates --upgrade --target=minor --peer --dep=dev,peer,prod,optional --filter=@types/jest,@types/node,@typescript-eslint/eslint-plugin,@typescript-eslint/parser,eslint-import-resolver-node,eslint-import-resolver-typescript,eslint-plugin-import,eslint,jest,jest-junit,npm-check-updates,projen,standard-version,ts-jest,npm",
      },
      {
        "exec": "yarn install --check-files",
      },
      {
        "exec": "yarn upgrade @types/jest @types/node @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-import-resolver-node eslint-import-resolver-typescript eslint-plugin-import eslint jest jest-junit npm-check-updates projen standard-version ts-jest npm",
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
  test("uses default values", () => {
    const prj = new TypeScriptProject({
      defaultReleaseBranch: "main",
      name: "test",
      jestOptions: {
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
    const jest = snapshot["package.json"].jest;
    expect(jest.preset).toStrictEqual("ts-jest");
    expect(jest.globals["ts-jest"].tsconfig).toStrictEqual("tsconfig.dev.json");
    expect(jest.globals["ts-jest"].shouldBePreserved).toStrictEqual(true);
  });

  test("overrides default values", () => {
    const prj = new TypeScriptProject({
      defaultReleaseBranch: "main",
      name: "test",
      jestOptions: {
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
    const jest = snapshot["package.json"].jest;
    expect(jest.preset).toStrictEqual("foo");
    expect(jest.globals["ts-jest"].tsconfig).toStrictEqual("bar");
    expect(jest.globals["ts-jest"].shouldBePreserved).toStrictEqual(true);
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
});
