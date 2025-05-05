import { AwsCdkTypeScriptApp } from "../../src/awscdk";
import { TypeScriptModuleResolution } from "../../src/javascript";
import { synthSnapshot } from "../util";

describe("AwsCdkTypeScriptApp", () => {
  test("synthesizes with exact CDK tsconfig defaults", () => {
    const project = new AwsCdkTypeScriptApp({
      name: "test-app",
      defaultReleaseBranch: "main",
      cdkVersion: "2.1.0",
    });

    const snapshot = synthSnapshot(project);
    const tsconfig = snapshot["tsconfig.json"];

    expect(tsconfig.compilerOptions).toEqual({
      alwaysStrict: true,
      declaration: true,
      esModuleInterop: true,
      experimentalDecorators: true,
      inlineSourceMap: true,
      inlineSources: true,
      lib: ["es2022"],
      module: "NodeNext",
      moduleResolution: TypeScriptModuleResolution.NODE_NEXT,
      noEmitOnError: false,
      noFallthroughCasesInSwitch: false,
      noImplicitAny: true,
      noImplicitReturns: true,
      noImplicitThis: true,
      noUnusedLocals: false,
      noUnusedParameters: false,
      outDir: "lib",
      resolveJsonModule: true,
      rootDir: "src",
      strict: true,
      strictNullChecks: true,
      strictPropertyInitialization: false,
      stripInternal: true,
      target: "ES2022",
    });

    expect(tsconfig.exclude).toEqual(["node_modules", "cdk.out"]);
  });
});
