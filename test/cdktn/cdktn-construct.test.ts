import type { ConstructLibraryCdktnOptions } from "../../src/cdktn";
import { ConstructLibraryCdktn } from "../../src/cdktn";
import { NpmAccess } from "../../src/javascript";
import { synthSnapshot } from "../util";

describe("cdktn dependency selection", () => {
  test("user-selected", () => {
    // GIVEN
    const project = new TestProject({ cdktnVersion: "0.99" });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot["package.json"]?.peerDependencies?.cdktn).toBe("0.99");
    expect(snapshot["package.json"]?.devDependencies?.cdktn).toBe("0.99.0");
    expect(snapshot["package.json"]?.dependencies?.cdktn).toBeUndefined();
  });
});

describe("constructs dependency selection", () => {
  test("user-selected constructs version", () => {
    // GIVEN
    const project = new TestProject({
      cdktnVersion: "0.99",
      constructsVersion: "10.5.1",
    });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot["package.json"]?.peerDependencies?.constructs).toBe(
      "10.5.1",
    );
    expect(snapshot["package.json"]?.devDependencies?.constructs).toBe(
      "10.5.1",
    );
    expect(snapshot["package.json"]?.dependencies?.constructs).toBeUndefined();
  });

  test("user-selected constructs version and installed as dependency", () => {
    // GIVEN
    const project = new TestProject({
      cdktnVersion: "0.99",
      constructsVersion: "10.5.1",
      deps: ["constructs@10.5.1"],
    });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot["package.json"]?.peerDependencies?.constructs).toBe(
      "10.5.1",
    );
    expect(snapshot["package.json"]?.devDependencies?.constructs).toBe(
      "10.5.1",
    );
    expect(snapshot["package.json"]?.dependencies?.constructs).toBe("10.5.1");
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
});

describe("default constructs version selection", () => {
  test("uses older constructs version for cdktn <= 0.24.0", () => {
    // GIVEN
    const project = new TestProject({ cdktnVersion: "0.20.0" });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot["package.json"]?.peerDependencies?.constructs).toBe(
      "^10.5.1",
    );
  });

  test("uses newer constructs version for cdktn > 0.24.0", () => {
    // GIVEN
    const project = new TestProject({ cdktnVersion: "0.25.0" });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot["package.json"]?.peerDependencies?.constructs).toBe(
      "^10.7.0",
    );
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
