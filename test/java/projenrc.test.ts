import { ProjectOption } from "../../lib/inventory";
import { generateJavaOptionNames } from "../../lib/java";
import { Pom } from "../../src/java";
import { Projenrc } from "../../src/java/projenrc";
import { renderProjenInitOptions } from "../../src/javascript/render-options";
import { synthSnapshot, TestProject } from "../util";

test("projenrc.java support", () => {
  // GIVEN
  const project = new TestProject();
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
  expect(synthSnapshot(project)).toMatchSnapshot();
});

test("use a non-test scope", () => {
  // GIVEN
  const project = new TestProject();
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
  expect(synthSnapshot(project)).toMatchSnapshot();
});

test("set the class name", () => {
  // GIVEN
  const project = new TestProject();
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
  expect(synthSnapshot(project)).toMatchSnapshot();
});

test("generate projenrc in java", () => {
  // GIVEN
  const project = new TestProject(
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
    synthSnapshot(project)["src/test/java/projenrc.java"]
  ).toMatchSnapshot();
});

test("assert unknown manifest type doesn't throw", () => {
  // GIVEN
  const options: ProjectOption[] = [
    {
      fqn: "unknown.fqn",
      path: [],
      name: "unknownFqn",
      simpleType: "",
      switch: "",
      fullType: {},
      parent: "",
    },
    {
      fqn: "known.fqn",
      path: [],
      name: "knownFqn",
      simpleType: "",
      switch: "",
      fullType: {},
      parent: "",
    },
  ];

  const jsiiManifest: any = {
    types: {
      "known.fqn": {
        namespace: "known_namespace",
        name: "component",
      },
    },
  };

  // WHEN
  const optionNames = generateJavaOptionNames(options, jsiiManifest);

  // THEN
  const optionNameKeys = Object.keys(optionNames);
  expect(optionNameKeys.length).toEqual(1);
  expect(optionNames[optionNameKeys[0]]).toEqual("known_namespace.component");
});
