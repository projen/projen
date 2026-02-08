import { JavaProject, JavaProjectOptions } from "../../src/java/java-project";
import { renderProjenInitOptions } from "../../src/javascript/render-options";
import { synthSnapshot } from "../util";

test("defaults", () => {
  const p = new TestJavaProject();
  expect(synthSnapshot(p)).toMatchSnapshot();
});

test("pom options", () => {
  const p = new TestJavaProject({
    groupId: "com.myorg",
    artifactId: "play-202101050157",
  });

  snapPom(p);
});

test("dependencies", () => {
  const p = new TestJavaProject();
  p.pom.addDependency("software.amazon.awscdk/core@^1.2.3");
  p.pom.addTestDependency("org.assertj/assertj-core@3.18.1");
  p.pom.addPlugin("org.apache.maven.plugins/maven-compiler-plugin@3.8.1", {
    configuration: {
      source: "1.8",
      target: "1.8",
    },
  });
  snapPom(p);
});

test("dependencies via ctor", () => {
  const p = new TestJavaProject({
    deps: [
      "software.amazon.awscdk/core@^1.2.3",
      "software.amazon.awscdk/aws-s3@^1",
    ],
    testDeps: ["org.assertj/assertj-core@^3"],
  });
  snapPom(p);
});

test("no junit", () => {
  const p = new TestJavaProject({
    junit: false,
  });

  expect(synthSnapshot(p)).toMatchSnapshot();
});

test("projenrc in java", () => {
  const p = new TestJavaProject();
  expect(synthSnapshot(p)["src/test/java/projenrc.java"]).toMatchSnapshot();
});

test("disable projenrc in java", () => {
  const p = new TestJavaProject({
    projenrcJava: false,
  });

  expect(synthSnapshot(p)["src/test/java/projenrc.java"]).toBeUndefined();
});

function snapPom(p: JavaProject) {
  expect(synthSnapshot(p)["pom.xml"]).toMatchSnapshot();
}

class TestJavaProject extends JavaProject {
  constructor(options: Partial<JavaProjectOptions> = {}) {
    super(
      renderProjenInitOptions("projen.java.JavaProject", {
        ...options,
        groupId: "org.acme",
        artifactId: "my-artifact",
        name: "test-project",
        version: "1.0.0",
        projenrcJavaOptions: {
          projenVersion: "^1.2.3",
        },
      }),
    );
  }
}
