import * as path from "path";
import { ProjectOption } from "../../lib/inventory";
import { generateJavaOptionNames } from "../../lib/java";
import { Pom } from "../../src/java";
import { Projenrc, getJavaImport } from "../../src/java/projenrc";
import { renderProjenInitOptions } from "../../src/javascript/render-options";
import { synthSnapshot, TestProject, withProjectDir } from "../util";

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

test("assert getJavaImport returns the correct import for submodules.", () => {
  // GIVEN

  const jsiiTypeWithSubmodule = {
    assembly: "@aws/lib",
    namespace: "sub_module",
    name: "Component",
  };

  const jsiiManifest: any = {
    submodules: {
      "@aws/lib.sub_module": {
        targets: {
          java: {
            package: "software.aws.sdk.submodule",
          },
        },
      },
    },
    types: {
      "@aws/lib.sub_module.Component": jsiiTypeWithSubmodule,
    },
  };

  // WHEN
  const fullNameWithSubmodule = getJavaImport(
    jsiiTypeWithSubmodule,
    jsiiManifest
  );

  // THEN
  expect(fullNameWithSubmodule).toEqual("software.aws.sdk.submodule.Component");
});

test("assert getJavaImport returns the correct import with no submodules", () => {
  // GIVEN
  const jsiiType = {
    assembly: "@aws/lib",
    name: "Component",
  };

  const jsiiManifest: any = {
    types: {
      "@aws/lib.Component": jsiiType,
    },
    targets: {
      java: {
        package: "software.aws.sdk",
      },
    },
  };

  // WHEN
  const fullName = getJavaImport(jsiiType, jsiiManifest);

  // THEN
  expect(fullName).toEqual("software.aws.sdk.Component");
});

test("assert generateProjenrc returns the correct projenrc with correct outdir", () => {
  withProjectDir((projectdir) => {
    const newOutDir = path.join(projectdir, "foo");
    const project = new TestProject(
      renderProjenInitOptions("projen.java.JavaProject", {
        outdir: newOutDir,
      })
    );
    const pom = new Pom(project, {
      groupId: "my.group.id",
      artifactId: "hello-world",
      version: "1.2.3",
    });
    const projen = new Projenrc(project, pom);
    expect(projen.project.outdir).toEqual(newOutDir);
  });
});
