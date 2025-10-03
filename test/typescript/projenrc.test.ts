import * as path from "path";
import { Projenrc, TypeScriptProject } from "../../src/typescript";
import { withProjectDirSync, synthSnapshot } from "../util";

test("assert new Typescript project in foo outdir", () => {
  withProjectDirSync((projectdir) => {
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

test("ts-node with default configuration", () => {
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

test("ts-node configured to use SWC", () => {
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
    "<rootDir>/@(projenrc)/**/*(*.)@(spec|test).ts?(x)"
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
