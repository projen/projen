import { StandardProject, Testing } from "../../src";
import { DependencyType } from "../../src/dependencies";
import { Pom, PomOptions } from "../../src/java";

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
  pom.deps.addDependency(
    "org.assertj/assertj-core@^3.18.1",
    DependencyType.TEST
  );

  expect(actualPom(pom)).toMatchSnapshot();

  // check that pom.addDependency() updates the project
  expect(pom.deps.getDependency("software.amazon.awscdk/core")).toStrictEqual({
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

  // alteratively
  pom.deps.addDependency(
    "org.codehaus.mojo/exec-maven-plugin@3.0.0",
    DependencyType.BUILD,
    {
      configuration: {
        mainClass: "com.myorg.Play202101050157App",
      },
    }
  );

  expect(actualPom(pom)).toMatchSnapshot();
});

function actualPom(p: Pom) {
  const snap = Testing.synth(p.project);
  return snap[p.fileName];
}

class TestPom extends Pom {
  constructor(options?: PomOptions) {
    super(
      new StandardProject({ name: "my-project" }),
      options ?? {
        groupId: "org.acme",
        artifactId: "my-artifact",
        version: "1.2.3",
      }
    );
  }
}
