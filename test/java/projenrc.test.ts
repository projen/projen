import { StandardProject, Testing } from "../../src";
import { Pom } from "../../src/java";
import { Projenrc } from "../../src/java/projenrc";
import { renderProjenInitOptions } from "../../src/javascript/render-options";

test("projenrc.java support", () => {
  // GIVEN
  const project = new StandardProject({ name: "my-project" });
  const pom = new Pom(project, {
    groupId: "my.group.id",
    artifactId: "hello-world",
    version: "1.2.3",
  });

  // WHEN
  new Projenrc(project, pom, {
    projenVersion: "1.0.0",
  });

  // THEN
  expect(Testing.synth(project)).toMatchSnapshot();
});

test("use a non-test scope", () => {
  // GIVEN
  const project = new StandardProject({ name: "my-project" });
  const pom = new Pom(project, {
    groupId: "my.group.id",
    artifactId: "hello-world",
    version: "1.2.3",
  });

  // WHEN
  new Projenrc(project, pom, {
    testScope: false,
    projenVersion: "7.7.7",
  });

  // THEN
  expect(Testing.synth(project)).toMatchSnapshot();
});

test("set the class name", () => {
  // GIVEN
  const project = new StandardProject({ name: "my-project" });
  const pom = new Pom(project, {
    groupId: "my.group.id",
    artifactId: "hello-world",
    version: "1.2.3",
  });

  // WHEN
  new Projenrc(project, pom, {
    className: "boom.bam.projenrc",
    projenVersion: "7.7.7",
  });

  // THEN
  expect(Testing.synth(project)).toMatchSnapshot();
});

test("generate projenrc in java", () => {
  // GIVEN
  const project = new StandardProject(
    renderProjenInitOptions("projen.java.JavaProject", {})
  );
  const pom = new Pom(project, {
    groupId: "my.group.id",
    artifactId: "hello-world",
    version: "1.2.3",
  });

  // WHEN
  new Projenrc(project, pom);

  // THEN
  expect(
    Testing.synth(project)["src/test/java/projenrc.java"]
  ).toMatchSnapshot();
});
