import { DependencyType } from "../../src/dependencies";
import { ChecksumPolicy, Pom, PomOptions, UpdatePolicy } from "../../src/java";
import { synthSnapshot, TestProject } from "../util";

test("group/artifact/version", () => {
  const pom = new TestPom({
    groupId: "my.group.id",
    artifactId: "mfoo-bar",
    version: "1.2.3",
  });

  expect(actualPom(pom)).toMatchSnapshot();
});

test("optional metadata", () => {
  const pom = new TestPom({
    groupId: "my.group.id",
    artifactId: "mfoo-bar",
    version: "1.2.3",

    parentPom: {
      groupId: "my.parent.group.id",
      artifactId: "foo-bar-parent",
      relativePath: "../home",
      version: "0.0.1",
    },
    description: "hello, world!",
    url: "https://foo/bar",
    packaging: "not_jar",
  });

  expect(actualPom(pom)).toMatchSnapshot();
});

test("addProperty()", () => {
  const pom = new TestPom();
  pom.addProperty("project.build.sourceEncoding", "UTF-8");
  pom.addProperty("junit.version", "5.7.0");

  expect(actualPom(pom)).toMatchSnapshot();
});

test("addDependency()", () => {
  const pom = new TestPom();
  pom.addDependency("software.amazon.awscdk/core");

  // dependencies are managed at the project level
  pom.project.deps.addDependency(
    "org.assertj/assertj-core@^3.18.1",
    DependencyType.TEST,
  );

  expect(actualPom(pom)).toMatchSnapshot();

  // check that pom.addDependency() updates the project
  expect(
    pom.project.deps.getDependency("software.amazon.awscdk/core"),
  ).toStrictEqual({
    name: "software.amazon.awscdk/core",
    type: "runtime",
  });
});

test("addPlugin()", () => {
  const pom = new TestPom();

  pom.addPlugin("org.apache.maven.plugins/maven-compiler-plugin@3.8.1", {
    dependencies: ["org.projen/projen@^0.14"],
    configuration: {
      source: "1.8",
      target: "1.8",
    },
  });

  pom.addPlugin("org.apache.maven.plugins/maven-shade-plugin@3.2.2", {
    configuration: {
      createDependencyReducedPom: false,
    },
    executions: [
      {
        id: "shade-task",
        phase: "package",
        goals: ["shade"],
      },
    ],
  });

  // alteratively
  pom.project.deps.addDependency(
    "org.codehaus.mojo/exec-maven-plugin@3.0.0",
    DependencyType.BUILD,
    {
      configuration: {
        mainClass: "com.myorg.Play202101050157App",
      },
    },
  );

  expect(actualPom(pom)).toMatchSnapshot();
});

test("addPlugin() with multiple executions", () => {
  const pom = new TestPom();

  pom.addPlugin("org.apache.maven.plugins/maven-compiler-plugin@3.8.1", {
    dependencies: ["org.projen/projen@^0.14"],
    configuration: {
      source: "1.8",
      target: "1.8",
    },
  });

  pom.addPlugin("org.apache.maven.plugins/maven-shade-plugin@3.2.2", {
    configuration: {
      createDependencyReducedPom: false,
    },
    executions: [
      {
        id: "shade-task",
        phase: "package",
        goals: ["shade"],
      },
      {
        id: "default-compile",
        phase: "none",
        goals: [],
        configuration: {
          source: 1.8,
        },
      },
    ],
  });

  expect(actualPom(pom)).toMatchSnapshot();
});

test("addRepository()", () => {
  const pom = new TestPom();

  pom.addRepository({
    id: "my-local-repository",
    url: "file://my/local/repository",
  });

  pom.addRepository({
    id: "my-remote-repository",
    name: "Remote Repo",
    url: "https://myserver/repo",
    layout: "default",
  });

  expect(actualPom(pom)).toMatchSnapshot();
});

test("addPluginRepository()", () => {
  const pom = new TestPom();

  pom.addPluginRepository({
    id: "my-local-repository",
    url: "file://my/local/repository",
  });
  pom.addPluginRepository({
    id: "my-remote-repository",
    name: "Remote Repo",
    url: "https://myserver/repo",
    layout: "default",
    snapshots: {
      checksumPolicy: ChecksumPolicy.FAIL,
      updatePolicy: UpdatePolicy.interval(50),
    },
  });
  expect(actualPom(pom)).toMatchSnapshot();
});

function actualPom(p: Pom) {
  const snap = synthSnapshot(p.project);
  return snap[p.fileName];
}

class TestPom extends Pom {
  constructor(options?: PomOptions) {
    super(
      new TestProject(),
      options ?? {
        groupId: "org.acme",
        artifactId: "my-artifact",
        version: "1.2.3",
      },
    );
  }
}
