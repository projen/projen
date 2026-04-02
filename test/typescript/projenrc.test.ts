import * as path from "path";
import {
  Projenrc,
  TypeScriptProject,
  TypeScriptRunner,
} from "../../src/typescript";
import { withProjectDir, synthSnapshot } from "../util";

test("assert new Typescript project in foo outdir", () => {
  withProjectDir((projectdir) => {
    const newOutDir = path.join(projectdir, "foo");
    const project = new TypeScriptProject({
      defaultReleaseBranch: "main",
      name: "test",
      outdir: newOutDir,
    });
    const projen = new Projenrc(project);

    expect(projen.project.outdir).toEqual(newOutDir);
  });
});

test("defaults to ts-node", () => {
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
  expect(snapshot["package.json"].devDependencies).toHaveProperty("ts-node");
});

test("ts-node runner", () => {
  const prj = new TypeScriptProject({
    name: "test",
    defaultReleaseBranch: "main",
    projenrcTs: true,
    projenrcTsOptions: {
      runner: TypeScriptRunner.tsNode(),
    },
  });

  const snapshot = synthSnapshot(prj);
  expect(snapshot[".projen/tasks.json"].tasks.default).toStrictEqual({
    description: "Synthesize project files",
    name: "default",
    steps: [{ exec: "ts-node --project tsconfig.dev.json .projenrc.ts" }],
  });
  expect(snapshot["package.json"].devDependencies).toHaveProperty("ts-node");
});

test("ts-node configured to use SWC via runner", () => {
  const prj = new TypeScriptProject({
    name: "test",
    defaultReleaseBranch: "main",
    projenrcTs: true,
    projenrcTsOptions: {
      runner: TypeScriptRunner.tsNode({ swc: true }),
    },
  });

  const snapshot = synthSnapshot(prj);
  expect(snapshot[".projen/tasks.json"].tasks.default).toStrictEqual({
    description: "Synthesize project files",
    name: "default",
    steps: [{ exec: "ts-node --swc --project tsconfig.dev.json .projenrc.ts" }],
  });
  expect(snapshot["package.json"].devDependencies).toHaveProperty("@swc/core");
});

test("deprecated swc option still works", () => {
  const prj = new TypeScriptProject({
    name: "test",
    defaultReleaseBranch: "main",
    projenrcTs: true,
    projenrcTsOptions: {
      swc: true,
    },
  });

  const snapshot = synthSnapshot(prj);
  expect(snapshot[".projen/tasks.json"].tasks.default).toStrictEqual({
    description: "Synthesize project files",
    name: "default",
    steps: [{ exec: "ts-node --swc --project tsconfig.dev.json .projenrc.ts" }],
  });
  expect(snapshot["package.json"].devDependencies).toHaveProperty("@swc/core");
});

test("node runner with --experimental-strip-types", () => {
  const prj = new TypeScriptProject({
    name: "test",
    defaultReleaseBranch: "main",
    projenrcTs: true,
    projenrcTsOptions: {
      runner: TypeScriptRunner.node(),
    },
  });

  const snapshot = synthSnapshot(prj);
  expect(snapshot[".projen/tasks.json"].tasks.default).toStrictEqual({
    description: "Synthesize project files",
    name: "default",
    steps: [
      {
        exec: "node --experimental-strip-types --experimental-transform-types .projenrc.ts",
      },
    ],
  });
  // node runner should not add any devDeps for the runner
  expect(snapshot["package.json"].devDependencies).not.toHaveProperty("tsx");
  expect(snapshot["package.json"].devDependencies).not.toHaveProperty(
    "ts-node",
  );
});

test("node runner with disabled flags", () => {
  const prj = new TypeScriptProject({
    name: "test",
    defaultReleaseBranch: "main",
    projenrcTs: true,
    projenrcTsOptions: {
      runner: TypeScriptRunner.node({
        stripTypes: false,
        transformTypes: false,
      }),
    },
  });

  const snapshot = synthSnapshot(prj);
  expect(snapshot[".projen/tasks.json"].tasks.default).toStrictEqual({
    description: "Synthesize project files",
    name: "default",
    steps: [{ exec: "node .projenrc.ts" }],
  });
});

test("tsx runner does not add ts-node", () => {
  const prj = new TypeScriptProject({
    name: "test",
    defaultReleaseBranch: "main",
    projenrcTs: true,
    projenrcTsOptions: {
      runner: TypeScriptRunner.tsx(),
    },
  });

  const snapshot = synthSnapshot(prj);
  expect(snapshot["package.json"].devDependencies).toHaveProperty("tsx");
  expect(snapshot["package.json"].devDependencies).not.toHaveProperty(
    "ts-node",
  );
});

test("adds .projenrc.ts to .gitignore DO NOT IGNORE and packageIgnore IGNORE", () => {
  // GIVEN / WHEN
  const prj = new TypeScriptProject({
    name: "test",
    defaultReleaseBranch: "main",
    projenrcTs: true,
  });

  // THEN
  const snapshot = synthSnapshot(prj);
  expect(snapshot[".gitignore"]).toContain("!/.projenrc.ts"); // Don't ignore here
  expect(snapshot[".npmignore"]).toContain("/.projenrc.ts"); // Ignore here
});

test("adds default projencodedir to jest testMatch patterns", () => {
  // GIVEN / WHEN
  const prj = new TypeScriptProject({
    name: "test",
    defaultReleaseBranch: "main",
    projenrcTs: true,
  });

  // THEN
  const snapshot = synthSnapshot(prj);
  const testMatch = snapshot["package.json"].jest.testMatch;
  expect(testMatch).toContain(
    "<rootDir>/@(projenrc)/**/*(*.)@(spec|test).ts?(x)",
  );
  expect(testMatch).toContain("<rootDir>/@(projenrc)/**/__tests__/**/*.ts?(x)");
});

test("adds custom projencodedir to jest testMatch patterns", () => {
  // GIVEN / WHEN
  const prj = new TypeScriptProject({
    name: "test",
    defaultReleaseBranch: "main",
    projenrcTs: true,
    projenrcTsOptions: {
      projenCodeDir: "foo",
    },
  });

  // THEN
  const snapshot = synthSnapshot(prj);
  const testMatch = snapshot["package.json"].jest.testMatch;
  expect(testMatch).toContain("<rootDir>/@(foo)/**/*(*.)@(spec|test).ts?(x)");
  expect(testMatch).toContain("<rootDir>/@(foo)/**/__tests__/**/*.ts?(x)");
});

test("project-level runner is used by projenrc by default", () => {
  const prj = new TypeScriptProject({
    name: "test",
    defaultReleaseBranch: "main",
    projenrcTs: true,
    runner: TypeScriptRunner.tsx(),
  });

  const snapshot = synthSnapshot(prj);
  const steps = snapshot[".projen/tasks.json"].tasks.default.steps;
  expect(steps).toHaveLength(2);
  expect(steps[0].exec).toContain("tsc --noEmit");
  expect(steps[0].name).toBe("typecheck");
  expect(steps[1]).toStrictEqual({
    exec: "tsx --tsconfig tsconfig.dev.json .projenrc.ts",
  });
  expect(snapshot["package.json"].devDependencies).toHaveProperty("tsx");
});

test("projenrc runner overrides project-level runner", () => {
  const prj = new TypeScriptProject({
    name: "test",
    defaultReleaseBranch: "main",
    projenrcTs: true,
    runner: TypeScriptRunner.tsx(),
    projenrcTsOptions: {
      runner: TypeScriptRunner.node(),
    },
  });

  const snapshot = synthSnapshot(prj);
  const steps = snapshot[".projen/tasks.json"].tasks.default.steps;
  expect(steps).toStrictEqual([
    {
      exec: "node --experimental-strip-types --experimental-transform-types .projenrc.ts",
    },
  ]);
});

test("tsx runner with typeCheck typechecks single file", () => {
  const prj = new TypeScriptProject({
    name: "test",
    defaultReleaseBranch: "main",
    projenrcTs: true,
    projenrcTsOptions: {
      runner: TypeScriptRunner.tsx({ typeCheck: true }),
    },
  });

  const snapshot = synthSnapshot(prj);
  const steps = snapshot[".projen/tasks.json"].tasks.default.steps;
  expect(steps).toHaveLength(2);
  expect(steps[0].exec).toContain("tsc --noEmit");
  expect(steps[0].exec).toContain("--strict");
  expect(steps[0].exec).toContain("--skipLibCheck");
  expect(steps[0].exec).toContain(".projenrc.ts");
  expect(steps[0].exec).not.toContain("--project");
  expect(steps[0].name).toBe("typecheck");
  expect(steps[1]).toStrictEqual({
    exec: "tsx --tsconfig tsconfig.dev.json .projenrc.ts",
  });
});

test("tsx runner with typeCheck and compilerOptions overrides defaults", () => {
  const prj = new TypeScriptProject({
    name: "test",
    defaultReleaseBranch: "main",
    projenrcTs: true,
    projenrcTsOptions: {
      runner: TypeScriptRunner.tsx({
        typeCheck: true,
        compilerOptions: {
          strict: false,
          esModuleInterop: false,
        },
      }),
    },
  });

  const snapshot = synthSnapshot(prj);
  const steps = snapshot[".projen/tasks.json"].tasks.default.steps;
  expect(steps[0].exec).toContain("--strict false");
  expect(steps[0].exec).toContain("--esModuleInterop false");
  expect(steps[0].exec).toContain("--skipLibCheck");
  expect(steps[0].exec).toContain(".projenrc.ts");
});

test("tsx runner with typeCheck disabled produces single step", () => {
  const prj = new TypeScriptProject({
    name: "test",
    defaultReleaseBranch: "main",
    projenrcTs: true,
    projenrcTsOptions: {
      runner: TypeScriptRunner.tsx({ typeCheck: false }),
    },
  });

  const snapshot = synthSnapshot(prj);
  const steps = snapshot[".projen/tasks.json"].tasks.default.steps;
  expect(steps).toStrictEqual([
    { exec: "tsx --tsconfig tsconfig.dev.json .projenrc.ts" },
  ]);
});
