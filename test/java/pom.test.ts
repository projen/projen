import { Construct } from "constructs";
import { DependencyType } from "../../src/dependencies";
import { Pom, PomOptions } from "../../src/java";
import { Project } from "../../src/project";
import { synthSnapshot, TestProject } from "../util";

test("group/artifact/version", () => {
  const project = new TestProject();
  const pom = new TestPom(project, {
    groupId: "my.group.id",
    artifactId: "mfoo-bar",
    version: "1.2.3",
  });

  expect(actualPom(project, pom)).toMatchSnapshot();
});

test("optional metadata", () => {
  const project = new TestProject();
  const pom = new TestPom(project, {
    groupId: "my.group.id",
    artifactId: "mfoo-bar",
    version: "1.2.3",

    description: "hello, world!",
    url: "https://foo/bar",
    packaging: "not_jar",
  });

  expect(actualPom(project, pom)).toMatchSnapshot();
});

test("addProperty()", () => {
  const project = new TestProject();
  const pom = new TestPom(project);
  pom.addProperty("project.build.sourceEncoding", "UTF-8");
  pom.addProperty("junit.version", "5.7.0");

  expect(actualPom(project, pom)).toMatchSnapshot();
});

test("addDependency()", () => {
  const project = new TestProject();
  const pom = new TestPom(project);
  pom.addDependency("software.amazon.awscdk/core");

  // dependencies are managed at the project level
  project.deps.addDependency(
    "org.assertj/assertj-core@^3.18.1",
    DependencyType.TEST
  );

  expect(actualPom(project, pom)).toMatchSnapshot();

  // check that pom.addDependency() updates the project
  expect(
    project.deps.getDependency("software.amazon.awscdk/core")
  ).toStrictEqual({
    name: "software.amazon.awscdk/core",
    type: "runtime",
  });
});

test("addPlugin()", () => {
  const project = new TestProject();
  const pom = new TestPom(project);

  pom.addPlugin("org.apache.maven.plugins/maven-compiler-plugin@3.8.1", {
    dependencies: ["org.projen/projen@^0.14"],
    configuration: {
      source: "1.8",
      target: "1.8",
    },
  });

  // alteratively
  project.deps.addDependency(
    "org.codehaus.mojo/exec-maven-plugin@3.0.0",
    DependencyType.BUILD,
    {
      configuration: {
        mainClass: "com.myorg.Play202101050157App",
      },
    }
  );

  expect(actualPom(project, pom)).toMatchSnapshot();
});

function actualPom(project: Project, pom: Pom) {
  const snap = synthSnapshot(project);
  return snap[pom.fileName];
}

class TestPom extends Pom {
  constructor(scope: Construct, options?: PomOptions) {
    super(
      scope,
      options ?? {
        groupId: "org.acme",
        artifactId: "my-artifact",
        version: "1.2.3",
      }
    );
  }
}
