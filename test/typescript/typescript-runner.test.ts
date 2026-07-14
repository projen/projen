import { TypeScriptRunner } from "../../src/typescript";
import { TestProject } from "../util";

/** Attach the runner to a throwaway project and render its config. */
function configOf(runner: TypeScriptRunner, entrypoint = "x.ts") {
  const real = runner.tryAttach(new TestProject()) as TypeScriptRunner;
  return real.configFor(entrypoint);
}

describe("ts-node", () => {
  test("type-checks by default", () => {
    expect(configOf(TypeScriptRunner.tsNode())).toEqual({
      dependencies: [{ name: "ts-node" }],
      steps: [{ execArgs: ["ts-node", "x.ts"] }],
    });
  });

  test("typeCheck: false uses --transpileOnly", () => {
    expect(configOf(TypeScriptRunner.tsNode({ typeCheck: false }))).toEqual({
      dependencies: [{ name: "ts-node" }],
      steps: [{ execArgs: ["ts-node", "--transpileOnly", "x.ts"] }],
    });
  });

  test("swc adds @swc/core and --swc", () => {
    expect(configOf(TypeScriptRunner.tsNode({ swc: true }))).toEqual({
      dependencies: [{ name: "ts-node" }, { name: "@swc/core" }],
      steps: [{ execArgs: ["ts-node", "--swc", "x.ts"] }],
    });
  });

  test("tsconfig adds --project", () => {
    expect(
      configOf(TypeScriptRunner.tsNode({ tsconfig: "tsconfig.json" })),
    ).toEqual({
      dependencies: [{ name: "ts-node" }],
      steps: [{ execArgs: ["ts-node", "--project", "tsconfig.json", "x.ts"] }],
    });
  });
});

describe("tsx", () => {
  test("does not type-check by default", () => {
    expect(configOf(TypeScriptRunner.tsx())).toEqual({
      dependencies: [{ name: "tsx" }],
      steps: [{ execArgs: ["tsx", "x.ts"] }],
    });
  });

  test("tsconfig adds --tsconfig", () => {
    expect(configOf(TypeScriptRunner.tsx({ tsconfig: "t.json" }))).toEqual({
      dependencies: [{ name: "tsx" }],
      steps: [{ execArgs: ["tsx", "--tsconfig", "t.json", "x.ts"] }],
    });
  });

  test("typeCheck adds a tsc --noEmit step before running", () => {
    expect(
      configOf(TypeScriptRunner.tsx({ typeCheck: true, tsconfig: "t.json" })),
    ).toEqual({
      dependencies: [{ name: "tsx" }],
      steps: [
        { execArgs: ["tsc", "--noEmit", "-p", "t.json"], name: "typecheck" },
        { execArgs: ["tsx", "--tsconfig", "t.json", "x.ts"] },
      ],
    });
  });

  test("typeCheck without a tsconfig omits -p", () => {
    expect(configOf(TypeScriptRunner.tsx({ typeCheck: true }))).toEqual({
      dependencies: [{ name: "tsx" }],
      steps: [
        { execArgs: ["tsc", "--noEmit"], name: "typecheck" },
        { execArgs: ["tsx", "x.ts"] },
      ],
    });
  });
});

describe("nodejs", () => {
  test("runs node directly by default (no deps)", () => {
    expect(configOf(TypeScriptRunner.nodejs())).toEqual({
      dependencies: [],
      steps: [{ execArgs: ["node", "x.ts"] }],
    });
  });

  test("experimentalTransformTypes adds the node flags", () => {
    expect(
      configOf(TypeScriptRunner.nodejs({ experimentalTransformTypes: true })),
    ).toEqual({
      dependencies: [],
      steps: [
        {
          execArgs: [
            "node",
            "--experimental-transform-types",
            "--disable-warning=ExperimentalWarning",
            "x.ts",
          ],
        },
      ],
    });
  });

  test("typeCheck adds a tsc step and the typescript dependency", () => {
    expect(
      configOf(
        TypeScriptRunner.nodejs({ typeCheck: true, tsconfig: "t.json" }),
      ),
    ).toEqual({
      dependencies: [{ name: "typescript" }],
      steps: [
        { execArgs: ["tsc", "--noEmit", "-p", "t.json"], name: "typecheck" },
        { execArgs: ["node", "x.ts"] },
      ],
    });
  });
});

describe("copy", () => {
  test("overrides common options but preserves the runtime", () => {
    const base = TypeScriptRunner.tsx({ tsconfig: "a.json" });
    const copied = base.copy({ tsconfig: "b.json", typeCheck: true });

    expect(configOf(copied)).toEqual({
      dependencies: [{ name: "tsx" }],
      steps: [
        { execArgs: ["tsc", "--noEmit", "-p", "b.json"], name: "typecheck" },
        { execArgs: ["tsx", "--tsconfig", "b.json", "x.ts"] },
      ],
    });
  });

  test("returns a detached runner", () => {
    expect(TypeScriptRunner.tsx().copy().attached).toBe(false);
  });
});
