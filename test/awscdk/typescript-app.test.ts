import { AwsCdkTypeScriptApp } from "../../src/awscdk";
import { synthSnapshot } from "../util";

describe("AwsCdkTypeScriptApp", () => {
  test("synthesizes with updated tsconfig defaults", () => {
    const project = new AwsCdkTypeScriptApp({
      name: "test-app-defaults",
      defaultReleaseBranch: "main",
      cdkVersion: "2.1.0",
    });

    const snapshot = synthSnapshot(project);
    const tsconfig = snapshot["tsconfig.json"];

    expect(tsconfig).toMatchSnapshot();
  });

  test("honors user-provided tsconfig options and merges them", () => {
    const project = new AwsCdkTypeScriptApp({
      name: "test-app-overrides",
      defaultReleaseBranch: "main",
      cdkVersion: "2.1.0",
      tsconfig: {
        compilerOptions: {
          target: "ESNext",
          allowJs: true,
          esModuleInterop: false,
        },
        exclude: ["custom-exclude", "another-exclude"],
      },
    });

    const snapshot = synthSnapshot(project);
    const tsconfig = snapshot["tsconfig.json"];

    expect(tsconfig.compilerOptions.target).toBe("ESNext");
    expect(tsconfig.compilerOptions.allowJs).toBe(true);
    expect(tsconfig.compilerOptions.esModuleInterop).toBe(false);
    expect(tsconfig.compilerOptions.module).toBe("NodeNext");
    expect(tsconfig.compilerOptions.lib).toEqual(["es2022"]);
    expect(tsconfig.compilerOptions.typeRoots).toEqual([
      "./node_modules/@types",
    ]);
    expect(tsconfig.compilerOptions.strict).toBe(true);
    expect(tsconfig.compilerOptions.declaration).toBe(true);
    expect(tsconfig.exclude).toEqual(
      expect.arrayContaining(["cdk.out", "custom-exclude", "another-exclude"]),
    );
  });
});
