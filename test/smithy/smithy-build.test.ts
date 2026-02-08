import { SmithyBuild } from "../../src/smithy/smithy-build";
import { synthSnapshot, TestProject } from "../util";

test("adds default smithy-build.json file", () => {
  // WHEN
  const project = new TestProject();
  new SmithyBuild(project, {});
  const snps = synthSnapshot(project);

  // THEN
  expect(snps["smithy-build.json"].version).toBe("1.0");
});

test("does not add smithy-build.json file by default", () => {
  // WHEN
  const project = new TestProject();
  const snps = synthSnapshot(project);

  // THEN
  expect(snps["smithy-build.json"]).toBeUndefined();
});

test("can add imports", () => {
  // GIVEN
  const project = new TestProject();
  const smithyBuild = new SmithyBuild(project, {});

  // WHEN
  smithyBuild.addImport("foo.json");
  const snps = synthSnapshot(project);

  // THEN
  expect(snps["smithy-build.json"].imports).toContain("foo.json");
});

test("can add sources", () => {
  // GIVEN
  const project = new TestProject();
  const smithyBuild = new SmithyBuild(project, {});

  // WHEN
  smithyBuild.addSources("my-model-dir");
  const snps = synthSnapshot(project);

  // THEN
  expect(snps["smithy-build.json"].sources).toContain("my-model-dir");
});

test("can add plugins", () => {
  // GIVEN
  const project = new TestProject();
  const smithyBuild = new SmithyBuild(project, {});

  // WHEN
  smithyBuild.addPlugins({
    "my-plugin": {
      service: "my-service",
    },
  });
  const snps = synthSnapshot(project);

  // THEN
  expect(snps["smithy-build.json"].plugins).toStrictEqual({
    "my-plugin": {
      service: "my-service",
    },
  });
});

test("can add projections", () => {
  // GIVEN
  const project = new TestProject();
  const smithyBuild = new SmithyBuild(project, {});

  // WHEN
  smithyBuild.addProjections({
    testProjection: {
      imports: ["foo.json"],
      transforms: [
        {
          name: "changeTypes",
          args: {},
        },
      ],
    },
  });
  const snps = synthSnapshot(project);

  // THEN
  expect(snps["smithy-build.json"].projections).toStrictEqual({
    testProjection: {
      imports: ["foo.json"],
      transforms: [
        {
          name: "changeTypes",
          args: {},
        },
      ],
    },
  });
});

test("can add maven dependencies and repositories", () => {
  // GIVEN
  const project = new TestProject();
  const smithyBuild = new SmithyBuild(project, {});

  // WHEN
  smithyBuild.addMavenDependencies(
    "software.amazon.smithy:foo:1.27.0",
    "software.amazon.smithy:bar:1.27.0",
  );
  smithyBuild.addMavenDependencies("software.amazon.smithy:baz:1.27.0");
  smithyBuild.addMavenRepositories(
    { url: "https://repo1.maven.org/maven2/" },
    { url: "https://repo2.maven.org/maven2/" },
  );
  const snps = synthSnapshot(project);

  // THEN
  expect(snps["smithy-build.json"].maven).toStrictEqual({
    dependencies: [
      "software.amazon.smithy:foo:1.27.0",
      "software.amazon.smithy:bar:1.27.0",
      "software.amazon.smithy:baz:1.27.0",
    ],
    repositories: [
      { url: "https://repo1.maven.org/maven2/" },
      { url: "https://repo2.maven.org/maven2/" },
    ],
  });
});
