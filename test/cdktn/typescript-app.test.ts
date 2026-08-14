import { CdktnTypeScriptApp } from "../../src/cdktn";
import { synthSnapshot } from "../util";

describe("CdktnTypeScriptApp", () => {
  test("synthesizes with default tsconfig", () => {
    const project = new CdktnTypeScriptApp({
      name: "test-app-defaults",
      defaultReleaseBranch: "main",
      cdktnVersion: "0.24.0",
    });

    const snapshot = synthSnapshot(project);
    const tsconfig = snapshot["tsconfig.json"];

    expect(tsconfig).toMatchSnapshot();
  });

  test("excludes the cdktn output directory from tsconfig", () => {
    const project = new CdktnTypeScriptApp({
      name: "test-app-output",
      defaultReleaseBranch: "main",
      cdktnVersion: "0.24.0",
    });

    const snapshot = synthSnapshot(project);
    const tsconfig = snapshot["tsconfig.json"];

    expect(tsconfig.exclude).toEqual(expect.arrayContaining(["cdktf.out"]));
  });

  test("excludes a custom cdktn output directory from tsconfig", () => {
    const project = new CdktnTypeScriptApp({
      name: "test-app-custom-output",
      defaultReleaseBranch: "main",
      cdktnVersion: "0.24.0",
      cdktnOut: "custom.out",
    });

    const snapshot = synthSnapshot(project);
    const tsconfig = snapshot["tsconfig.json"];

    expect(tsconfig.exclude).toEqual(expect.arrayContaining(["custom.out"]));
  });

  test("honors user-provided tsconfig options and merges them", () => {
    const project = new CdktnTypeScriptApp({
      name: "test-app-overrides",
      defaultReleaseBranch: "main",
      cdktnVersion: "0.24.0",
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
    expect(tsconfig.exclude).toEqual(
      expect.arrayContaining([
        "cdktf.out",
        "custom-exclude",
        "another-exclude",
      ]),
    );
  });

  test("passes through projectId and sendCrashReports to cdktf.json", () => {
    const project = new CdktnTypeScriptApp({
      name: "test-app-project-id",
      defaultReleaseBranch: "main",
      cdktnVersion: "0.24.0",
      projectId: "my-project-id",
      sendCrashReports: false,
    });

    const snapshot = synthSnapshot(project);

    expect(snapshot["cdktf.json"].projectId).toStrictEqual("my-project-id");
    expect(snapshot["cdktf.json"].sendCrashReports).toStrictEqual(false);
  });
});
