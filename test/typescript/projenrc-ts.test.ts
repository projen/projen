import { ProjenrcTs } from "../../src/typescript";
import { synthSnapshot, TestProject } from "../util";

describe("Creating rc file within a non-TypeScript project", () => {
  test("works with defaults", () => {
    // GIVEN
    const p = new TestProject({});

    // WHEN
    const rc = new ProjenrcTs(p, {});

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
    const rc = new ProjenrcTs(p, {
      filename: ".projenrc.foo.ts",
      projenCodeDir: ".projenrc",
      tsconfigFileName: "tsconfig.foo.json",
    });

    // THEN
    const snapshot = synthSnapshot(p);
    expect(rc.tsconfig).not.toBeUndefined();
    expect(snapshot[".projen/tasks.json"].tasks.default).toStrictEqual({
      description: "Synthesize project files",
      name: "default",
      steps: [
        {
          exec: "npx -y ts-node --project tsconfig.foo.json .projenrc.foo.ts",
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

  test("mentions .projenrc.ts in the file marker", () => {
    // GIVEN
    const p = new TestProject({});

    // WHEN
    new ProjenrcTs(p, {});

    // THEN
    const snapshot = synthSnapshot(p);
    expect(snapshot[".gitignore"]).toContain("To modify, edit .projenrc.ts");
  });
});
