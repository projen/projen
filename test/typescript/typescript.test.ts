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
  expect(tasks.upgrade.steps[1].exec).toStrictEqual(
    "npm-check-updates --dep dev --upgrade --target=minor --reject='typescript'"
  );
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
