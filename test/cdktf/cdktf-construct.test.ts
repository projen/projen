import {
  ConstructLibraryCdktf,
  ConstructLibraryCdktfOptions,
} from "../../src/cdktf";
import { NpmAccess } from "../../src/javascript";
import { synthSnapshot } from "../util";

describe("cdktf dependency selection", () => {
  test("user-selected", () => {
    // GIVEN
    const project = new TestProject({ cdktfVersion: "0.99" });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot["package.json"]?.peerDependencies?.cdktf).toBe("0.99");
    expect(snapshot["package.json"]?.devDependencies?.cdktf).toBe("0.99.0");
    expect(snapshot["package.json"]?.dependencies?.cdktf).toBeUndefined();
  });
});

describe("constructs dependency selection", () => {
  test("user-selected constructs version", () => {
    // GIVEN
    const project = new TestProject({
      cdktfVersion: "0.99",
      constructsVersion: "10.0.1",
    });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot["package.json"]?.peerDependencies?.constructs).toBe(
      "10.0.1",
    );
    expect(snapshot["package.json"]?.devDependencies?.constructs).toBe(
      "10.0.1",
    );
    expect(snapshot["package.json"]?.dependencies?.constructs).toBeUndefined();
  });

  test("user-selected constructs version and installed as dependency", () => {
    // GIVEN
    const project = new TestProject({
      cdktfVersion: "0.99",
      constructsVersion: "10.3.0",
      deps: ["constructs@10.3.0"],
    });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot["package.json"]?.peerDependencies?.constructs).toBe(
      "10.3.0",
    );
    expect(snapshot["package.json"]?.devDependencies?.constructs).toBe(
      "10.3.0",
    );
    expect(snapshot["package.json"]?.dependencies?.constructs).toBe("10.3.0");
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

class TestProject extends ConstructLibraryCdktf {
  constructor(
    options: Omit<ConstructLibraryCdktfOptions, keyof typeof defaultOptions>,
  ) {
    super({
      ...defaultOptions,
      ...options,
    });
  }
}
