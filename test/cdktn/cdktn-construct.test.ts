import type { ConstructLibraryCdktnOptions } from "../../src/cdktn";
import { ConstructLibraryCdktn } from "../../src/cdktn";
import { NpmAccess } from "../../src/javascript";
import { synthSnapshot } from "../util";

describe("cdktn dependency selection", () => {
  test("user-selected version is pinned exactly by default", () => {
    // GIVEN
    // cdktnVersionPinning defaults to true for ConstructLibraryCdktn so that
    // the exact peerDependencies value written before caret ranges became
    // the default (in CdktnDeps) doesn't change for existing projects.
    const project = new TestProject({ cdktnVersion: "0.99" });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot["package.json"]?.peerDependencies?.cdktn).toBe("0.99");
    expect(snapshot["package.json"]?.devDependencies?.cdktn).toBe("0.99.0");
    expect(snapshot["package.json"]?.dependencies?.cdktn).toBeUndefined();
  });

  test("pinning can be explicitly disabled to opt into caret ranges", () => {
    // GIVEN
    const project = new TestProject({
      cdktnVersion: "0.99",
      cdktnVersionPinning: false,
    });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot["package.json"]?.peerDependencies?.cdktn).toBe("^0.99.0");
    expect(snapshot["package.json"]?.devDependencies?.cdktn).toBe("0.99.0");
  });
});

describe("constructs dependency selection", () => {
  test("user-selected constructs version", () => {
    // GIVEN
    const project = new TestProject({
      cdktnVersion: "0.99",
      constructsVersion: "10.0.1",
    });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot["package.json"]?.peerDependencies?.constructs).toBe(
      "^10.0.1",
    );
    expect(snapshot["package.json"]?.devDependencies?.constructs).toBe(
      "10.0.1",
    );
    expect(snapshot["package.json"]?.dependencies?.constructs).toBeUndefined();
  });

  test("user-selected constructs version and installed as dependency", () => {
    // GIVEN
    const project = new TestProject({
      cdktnVersion: "0.99",
      constructsVersion: "10.8.1",
      deps: ["constructs@10.8.1"],
    });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot["package.json"]?.peerDependencies?.constructs).toBe(
      "^10.8.1",
    );
    expect(snapshot["package.json"]?.dependencies?.constructs).toBe("10.8.1");
  });
});

describe("backward compatibility", () => {
  test("ConstructLibraryCdktn produces correct package name", () => {
    // GIVEN
    const project = new TestProject({ cdktnVersion: "0.24.0" });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot["package.json"]?.peerDependencies?.cdktn).toBe("0.24.0");
    expect(snapshot["package.json"]?.devDependencies?.cdktn).toBe("0.24.0");
    expect(snapshot["package.json"]?.peerDependencies?.cdktf).toBeUndefined();
    expect(snapshot["package.json"]?.devDependencies?.cdktf).toBeUndefined();
  });

  test("keywords include cdktn", () => {
    // GIVEN
    const project = new TestProject({ cdktnVersion: "0.24.0" });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot["package.json"]?.keywords).toContain("cdktn");
  });
});

describe("error handling", () => {
  test("throws error when cdktnVersion is not specified", () => {
    // GIVEN / WHEN / THEN
    expect(
      () =>
        new ConstructLibraryCdktn({
          ...defaultOptions,
          cdktnVersion: undefined as any,
        }),
    ).toThrow("Required field cdktnVersion is not specified.");
  });

  test("throws error when cdktnVersion cannot be parsed as a semver version", () => {
    // GIVEN / WHEN / THEN
    expect(
      () =>
        new ConstructLibraryCdktn({
          ...defaultOptions,
          cdktnVersion: "not-a-version",
        }),
    ).toThrow(
      '"cdktnVersion" cannot be parsed as a semver version: not-a-version',
    );
  });

  test("throws error when constructsVersion cannot be parsed as a semver version", () => {
    // GIVEN / WHEN / THEN
    expect(
      () =>
        new ConstructLibraryCdktn({
          ...defaultOptions,
          cdktnVersion: "0.24.0",
          constructsVersion: "not-a-version",
        }),
    ).toThrow(
      '"constructsVersion" cannot be parsed as a semver version: not-a-version',
    );
  });
});

describe("default constructs version selection", () => {
  test("uses older constructs version for cdktn <= 0.24.0", () => {
    // GIVEN
    const project = new TestProject({ cdktnVersion: "0.20.0" });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot["package.json"]?.peerDependencies?.constructs).toBe(
      "^10.7.2",
    );
  });

  test("uses newer constructs version for cdktn > 0.24.0", () => {
    // GIVEN
    const project = new TestProject({ cdktnVersion: "0.25.0" });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot["package.json"]?.peerDependencies?.constructs).toBe("^10");
  });
});

describe("cdktnVersion getter", () => {
  test("exposes the resolved cdktn version requirement", () => {
    const project = new TestProject({ cdktnVersion: "0.24.0" });
    expect(project.cdktnVersion).toBe("0.24.0");
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

class TestProject extends ConstructLibraryCdktn {
  constructor(
    options: Omit<ConstructLibraryCdktnOptions, keyof typeof defaultOptions>,
  ) {
    super({
      ...defaultOptions,
      ...options,
    });
  }
}
