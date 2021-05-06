import {
  AwsCdkConstructLibrary,
  AwsCdkConstructLibraryOptions,
} from "../awscdk-construct";
import { LogLevel } from "../logger";
import { NpmAccess } from "../node-package";
import { mkdtemp, synthSnapshot } from "./util";

describe("constructs dependency selection", () => {
  test("user-selected", () => {
    // GIVEN
    const project = new TestProject({
      cdkVersion: "1.100.0",
      constructsVersion: "42.1337.0-ultimate.∞",
    });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot["package.json"]?.peerDependencies?.constructs).toBe(
      "^42.1337.0-ultimate.∞"
    );
    expect(snapshot["package.json"]?.devDependencies?.constructs).toBe(
      "42.1337.0-ultimate.∞"
    );
    expect(snapshot["package.json"]?.dependencies?.constructs).toBeUndefined();
  });

  test("for cdk 1.x", () => {
    // GIVEN
    const project = new TestProject({ cdkVersion: "1.100.0" });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot["package.json"]?.peerDependencies?.constructs).toMatch(
      /^\^3\./
    );
    expect(
      snapshot["package.json"]?.devDependencies?.constructs
    ).toBeUndefined();
    expect(snapshot["package.json"]?.dependencies?.constructs).toBeUndefined();
  });

  test("for cdk 2.x", () => {
    // GIVEN
    const project = new TestProject({ cdkVersion: "2.0.0-alpha.5" });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot["package.json"]?.peerDependencies?.constructs).toMatch(
      /^\^10./
    );
    expect(
      snapshot["package.json"]?.devDependencies?.constructs
    ).toBeUndefined();
    expect(snapshot["package.json"]?.dependencies?.constructs).toBeUndefined();
  });

  test("for cdk 3.x (does not exist yet)", () => {
    // GIVEN
    const project = new TestProject({ cdkVersion: "3.1337.42" });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot["package.json"]?.peerDependencies?.constructs).toBe("*");
    expect(
      snapshot["package.json"]?.devDependencies?.constructs
    ).toBeUndefined();
    expect(snapshot["package.json"]?.dependencies?.constructs).toBeUndefined();
  });
});

const defaultOptions = {
  author: "Nobody",
  authorAddress: "nobody@nowhere.com",
  clobber: false,
  defaultReleaseBranch: "main",
  jest: false,
  name: "test-project",
  npmAccess: NpmAccess.PUBLIC,
  repositoryUrl: "https://github.com/projen/projen.git",
} as const;

class TestProject extends AwsCdkConstructLibrary {
  constructor(
    options: Omit<AwsCdkConstructLibraryOptions, keyof typeof defaultOptions>
  ) {
    super({
      outdir: mkdtemp(),
      logging: {
        level: LogLevel.OFF,
      },
      ...defaultOptions,
      ...options,
    });
  }
}
