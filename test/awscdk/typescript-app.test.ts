import { AwsCdkTypeScriptApp } from "../../src/awscdk";
import { TypeScriptModuleResolution } from "../../src/javascript";
import { synthSnapshot } from "../util";

describe("AwsCdkTypeScriptApp", () => {
  test("synthesizes with updated tsconfig defaults", () => {
    const project = new AwsCdkTypeScriptApp({
      name: "test-app",
      defaultReleaseBranch: "main",
      cdkVersion: "2.1.0",
    });

    const snapshot = synthSnapshot(project);
    const tsconfig = snapshot["tsconfig.json"];

    // Assertions for the specific CDK defaults added/overridden
    expect(tsconfig.compilerOptions.target).toBe("ES2022");
    expect(tsconfig.compilerOptions.module).toBe("NodeNext");
    expect(tsconfig.compilerOptions.moduleResolution).toBe(
      TypeScriptModuleResolution.NODE_NEXT
    );
    expect(tsconfig.compilerOptions.lib).toEqual(["es2022"]);
    expect(tsconfig.compilerOptions.noUnusedLocals).toBe(false);
    expect(tsconfig.compilerOptions.noUnusedParameters).toBe(false);
    expect(tsconfig.compilerOptions.noFallthroughCasesInSwitch).toBe(false);
    expect(tsconfig.compilerOptions.strictPropertyInitialization).toBe(false);
    expect(tsconfig.compilerOptions.typeRoots).toEqual([
      "./node_modules/@types",
    ]);
    expect(tsconfig.exclude).toEqual(["cdk.out"]);

    // Assertions for base options to ensure merging worked
    expect(tsconfig.compilerOptions.strict).toBe(true);
    expect(tsconfig.compilerOptions.declaration).toBe(true);
    expect(tsconfig.compilerOptions.esModuleInterop).toBe(true);
    expect(tsconfig.compilerOptions.inlineSourceMap).toBe(true);
  });
});
