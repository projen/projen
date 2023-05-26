import * as path from "path";
import { Projenrc, TypeScriptProject } from "../../src/typescript";
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
