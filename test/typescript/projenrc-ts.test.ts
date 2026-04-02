import {
  ProjenrcTs,
  TypeScriptProject,
  TypeScriptRunner,
} from "../../src/typescript";
import { synthSnapshot, TestProject } from "../util";

describe("Creating rc file within a non-TypeScript project", () => {
  test("defaults to ts-node", () => {
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
        {
          exec: 'npx -y -p ts-node -c "ts-node --project tsconfig.projen.json .projenrc.ts"',
        },
      ],
    });
    expect(snapshot[rc.tsconfig!.fileName]).toMatchSnapshot();
    expect(snapshot[rc.tsconfig!.fileName]).toMatchObject({
      include: expect.arrayContaining([".projenrc.ts", "projenrc/**/*.ts"]),
    });
  });

  test("uses ts-node when runner is tsNode()", () => {
    // GIVEN
    const p = new TestProject({});

    // WHEN
    new ProjenrcTs(p, {
      runner: TypeScriptRunner.tsNode({
        tsconfig: "tsconfig.projen.json",
      }),
    });

    // THEN
    const snapshot = synthSnapshot(p);
    expect(snapshot[".projen/tasks.json"].tasks.default).toStrictEqual({
      description: "Synthesize project files",
      name: "default",
      steps: [
        {
          exec: 'npx -y -p ts-node -c "ts-node --project tsconfig.projen.json .projenrc.ts"',
        },
      ],
    });
  });

  test("uses node --experimental-strip-types when runner is node()", () => {
    // GIVEN
    const p = new TestProject({});

    // WHEN
    new ProjenrcTs(p, { runner: TypeScriptRunner.node() });

    // THEN
    const snapshot = synthSnapshot(p);
    expect(snapshot[".projen/tasks.json"].tasks.default).toStrictEqual({
      description: "Synthesize project files",
      name: "default",
      steps: [
        {
          exec: "node --experimental-strip-types --experimental-transform-types .projenrc.ts",
        },
      ],
    });
  });

  test("node runner does not use npx", () => {
    // GIVEN
    const p = new TestProject({});

    // WHEN
    new ProjenrcTs(p, { runner: TypeScriptRunner.node() });

    // THEN
    const snapshot = synthSnapshot(p);
    const cmd = snapshot[".projen/tasks.json"].tasks.default.steps[0].exec;
    expect(cmd).not.toContain("npx");
  });

  test("ts-node with swc uses npx with all deps", () => {
    // GIVEN
    const p = new TestProject({});

    // WHEN
    new ProjenrcTs(p, {
      runner: TypeScriptRunner.tsNode({
        swc: true,
        tsconfig: "tsconfig.projen.json",
      }),
    });

    // THEN
    const snapshot = synthSnapshot(p);
    expect(snapshot[".projen/tasks.json"].tasks.default).toStrictEqual({
      description: "Synthesize project files",
      name: "default",
      steps: [
        {
          exec: 'npx -y -p ts-node -p @swc/core -c "ts-node --swc --project tsconfig.projen.json .projenrc.ts"',
        },
      ],
    });
  });

  test("works with overridden defaults", () => {
    // GIVEN
    const p = new TestProject({});

    // WHEN
    const rc = new ProjenrcTs(p, {
      filename: ".projenrc.foo.ts",
      projenCodeDir: ".projenrc",
      tsconfigFileName: "tsconfig.foo.json",
      runner: TypeScriptRunner.tsNode({
        tsconfig: "tsconfig.foo.json",
      }),
    });

    // THEN
    const snapshot = synthSnapshot(p);
    expect(rc.tsconfig).not.toBeUndefined();
    expect(snapshot[".projen/tasks.json"].tasks.default).toStrictEqual({
      description: "Synthesize project files",
      name: "default",
      steps: [
        {
          exec: 'npx -y -p ts-node -c "ts-node --project tsconfig.foo.json .projenrc.foo.ts"',
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

  test("tsx runner wraps all steps with npx", () => {
    // GIVEN
    const p = new TestProject({});

    // WHEN
    new ProjenrcTs(p, {
      runner: TypeScriptRunner.tsx({
        tsconfig: "tsconfig.projen.json",
      }),
    });

    // THEN
    const snapshot = synthSnapshot(p);
    const steps = snapshot[".projen/tasks.json"].tasks.default.steps;
    expect(steps).toHaveLength(2);
    expect(steps[0].exec).toContain('npx -y -p tsx -c "tsc --noEmit');
    expect(steps[0].name).toBe("typecheck");
    expect(steps[1].exec).toContain('npx -y -p tsx -c "tsx --tsconfig');
  });

  test("tsx runner with typeCheck wraps all steps with npx", () => {
    // GIVEN
    const p = new TestProject({});

    // WHEN
    new ProjenrcTs(p, {
      runner: TypeScriptRunner.tsx({
        typeCheck: true,
        tsconfig: "tsconfig.projen.json",
        compilerOptions: { strict: true },
      }),
    });

    // THEN
    const snapshot = synthSnapshot(p);
    const steps = snapshot[".projen/tasks.json"].tasks.default.steps;
    expect(steps).toHaveLength(2);
    expect(steps[0].exec).toContain('npx -y -p tsx -c "tsc --noEmit');
    expect(steps[0].exec).toContain("--strict");
    expect(steps[0].exec).toContain("--skipLibCheck");
    expect(steps[0].exec).toContain('.projenrc.ts"');
    expect(steps[0].name).toBe("typecheck");
    expect(steps[1].exec).toContain('npx -y -p tsx -c "tsx --tsconfig');
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

  test("adds .projenrc.ts to .gitignore DO NOT IGNORE and packageIgnore IGNORE", () => {
    // GIVEN
    const p = new TypeScriptProject({
      defaultReleaseBranch: "main",
      name: "test",
    });

    // WHEN
    new ProjenrcTs(p, {});

    // THEN
    const snapshot = synthSnapshot(p);
    expect(snapshot[".gitignore"]).toContain("!/.projenrc.ts"); // Don't ignore here
    expect(snapshot[".npmignore"]).toContain("/.projenrc.ts"); // Ignore here
  });
});
