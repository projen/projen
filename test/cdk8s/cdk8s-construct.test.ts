import { cdk8s } from "../../src";
import { synthSnapshot } from "../util";

test("constructs version defined", () => {
  const project = new cdk8s.ConstructLibraryCdk8s({
    cdk8sVersion: "1.4.9",
    name: "project",
    defaultReleaseBranch: "main",
    releaseWorkflow: true,
    constructsVersion: "3.3.75",
    repositoryUrl: "github.com/test/test",
    author: "test",
    authorAddress: "test@test.com",
  });

  const output = synthSnapshot(project);

  expect(output["package.json"].peerDependencies).toStrictEqual({
    cdk8s: "^1.4.9",
    constructs: "^3.3.75",
  });
});

test("constructs version undefined", () => {
  const project = new cdk8s.ConstructLibraryCdk8s({
    cdk8sVersion: "1.4.9",
    name: "project",
    defaultReleaseBranch: "main",
    releaseWorkflow: true,
    repositoryUrl: "github.com/test/test",
    author: "test",
    authorAddress: "test@test.com",
  });

  const output = synthSnapshot(project);

  expect(output["package.json"].peerDependencies).toStrictEqual({
    cdk8s: "^1.4.9",
    constructs: "^3.3.196",
  });
});

test("constructs version pinning", () => {
  const project = new cdk8s.ConstructLibraryCdk8s({
    cdk8sVersion: "1.4.9",
    name: "project",
    defaultReleaseBranch: "main",
    releaseWorkflow: true,
    constructsVersion: "3.3.75",
    constructsVersionPinning: true,
    repositoryUrl: "github.com/test/test",
    author: "test",
    authorAddress: "test@test.com",
  });

  const output = synthSnapshot(project);

  expect(output["package.json"].peerDependencies).toStrictEqual({
    cdk8s: "^1.4.9",
    constructs: "3.3.75",
  });
});

test("cdk8sPlusVersion undefined", () => {
  const project = new cdk8s.ConstructLibraryCdk8s({
    cdk8sVersion: "1.4.9",
    name: "project",
    defaultReleaseBranch: "main",
    releaseWorkflow: true,
    repositoryUrl: "github.com/test/test",
    author: "test",
    authorAddress: "test@test.com",
    constructsVersion: "3.3.75",
  });

  const output = synthSnapshot(project);

  expect(output["package.json"].peerDependencies).toStrictEqual({
    cdk8s: "^1.4.9",
    constructs: "^3.3.75",
  });
});

describe("cdk8s and consructs version", () => {
  test("throws if not compatible", () => {
    // Given
    const cdk8sVersion = "2.0.0";
    const constructsVersion = "3.3.196";

    // When
    const createCdk8sConstructLibrary = () => {
      new cdk8s.ConstructLibraryCdk8s({
        cdk8sVersion,
        name: "project",
        defaultReleaseBranch: "main",
        releaseWorkflow: true,
        constructsVersion,
        repositoryUrl: "github.com/test/test",
        author: "test",
        authorAddress: "test@test.com",
      });
    };

    // Then
    expect(createCdk8sConstructLibrary).toThrow(
      /cdk8s 2.x requires constructs 10.x/,
    );
  });

  test("uses constructs v10 for cdk8s v2", () => {
    // Given
    const cdk8sVersion = "2.0.0";

    // When
    const project = new cdk8s.ConstructLibraryCdk8s({
      cdk8sVersion,
      name: "project",
      defaultReleaseBranch: "main",
      releaseWorkflow: true,
      repositoryUrl: "github.com/test/test",
      author: "test",
      authorAddress: "test@test.com",
    });
    const output = synthSnapshot(project);

    // Then
    expect(output["package.json"].peerDependencies).toStrictEqual({
      cdk8s: "^2.0.0",
      constructs: "^10.0.0",
    });
  });

  test("uses constructs v3 for cdk8s v1", () => {
    // Given
    const cdk8sVersion = "1.0.0";

    // When
    const project = new cdk8s.ConstructLibraryCdk8s({
      cdk8sVersion,
      name: "project",
      defaultReleaseBranch: "main",
      releaseWorkflow: true,
      repositoryUrl: "github.com/test/test",
      author: "test",
      authorAddress: "test@test.com",
    });
    const output = synthSnapshot(project);

    // Then
    expect(output["package.json"].peerDependencies).toStrictEqual({
      cdk8s: "^1.0.0",
      constructs: "^3.3.196",
    });
  });
});
