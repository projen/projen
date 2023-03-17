import * as path from "path";
import { Projenrc, TypeScriptProject } from "../../src/typescript";
import { synthSnapshot, TestProject, withProjectDir } from "../util";

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

describe("Creating rc file within a non-TypeScript project", () => {
  test("works with defaults", () => {
    // GIVEN
    const p = new TestProject({});

    // WHEN
    const rc = new Projenrc(p, {});

    // THEN
    const snapshot = synthSnapshot(p);
    expect(rc.tsconfig).not.toBeUndefined();
    expect(snapshot[".projen/tasks.json"].tasks.default).toStrictEqual({
      description: "Synthesize project files",
      name: "default",
      steps: [
        { exec: "npx -y ts-node --project tsconfig.projen.json .projenrc.ts" },
      ],
    });
    expect(snapshot[rc.tsconfig!.fileName]).toMatchSnapshot();
    expect(snapshot[rc.tsconfig!.fileName]).toMatchObject({
      include: expect.arrayContaining([".projenrc.ts", "projenrc/**/*.ts"]),
    });
  });

  test("works with overriden defaults", () => {
    // GIVEN
    const p = new TestProject({});

    // WHEN
    const rc = new Projenrc(p, {
      filename: ".projenrc.foo.ts",
      projenCodeDir: ".projenrc",
    });

    // THEN
    const snapshot = synthSnapshot(p);
    expect(rc.tsconfig).not.toBeUndefined();
    expect(snapshot[".projen/tasks.json"].tasks.default).toStrictEqual({
      description: "Synthesize project files",
      name: "default",
      steps: [
        {
          exec: "npx -y ts-node --project tsconfig.projen.json .projenrc.foo.ts",
        },
      ],
    });
    expect(snapshot[rc.tsconfig!.fileName]).toMatchObject({
      include: expect.arrayContaining([
        ".projenrc.foo.ts",
        ".projenrc/**/*.ts",
      ]),
    });
  });
});
