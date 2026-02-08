import * as xml from "xmlbuilder2";
import { awscdk } from "../../src";
import { Testing } from "../../src/testing";

test("happy flow", () => {
  const p = new awscdk.AwsCdkJavaApp({
    artifactId: "my-app",
    groupId: "org.acme",
    cdkVersion: "1.130.0",
    mainClass: "org.bacme.BoomApp",
    name: "my-app",
    version: "0.1.0",
  });

  const snapshot = Testing.synth(p);
  expect(Object.keys(snapshot).sort()).toStrictEqual([
    ".gitattributes",
    ".github/workflows/pull-request-lint.yml",
    ".gitignore",
    ".projen/deps.json",
    ".projen/files.json",
    ".projen/tasks.json",
    "README.md",
    "cdk.json",
    "pom.xml",
    "src/main/java/org/bacme/BoomApp.java",
    "src/test/java/org/bacme/MyTest.java",
  ]);
  expect(snapshot["cdk.json"]).toMatchSnapshot();
  expect(snapshot["pom.xml"]).toMatchSnapshot();
  expect(snapshot["src/test/java/org/bacme/MyTest.java"]).toMatchSnapshot();
  expect(snapshot["cdk.json"].app).toStrictEqual(
    "mvn exec:java --quiet -Dexec.mainClass=org.bacme.BoomApp",
  );
});

test("mainClass", () => {
  const p = new awscdk.AwsCdkJavaApp({
    artifactId: "my-app",
    groupId: "org.acme",
    cdkVersion: "1.130.0",
    mainClass: "org.acme.jojo.MyApp",
    name: "my-app",
    version: "0.1.0",
  });

  const snapshot = Testing.synth(p);
  expect(snapshot["cdk.json"].app).toStrictEqual(
    "mvn exec:java --quiet -Dexec.mainClass=org.acme.jojo.MyApp",
  );
});

test("deps", () => {
  const p = new awscdk.AwsCdkJavaApp({
    artifactId: "my-app",
    groupId: "org.acme",
    cdkVersion: "1.120.0",
    mainClass: "org.acme.jojo.MyApp",
    name: "my-app",
    version: "0.1.0",
    cdkDependencies: [
      "software.amazon.awscdk/aws-lambda",
      "software.amazon.awscdk/aws-sns",
    ],
  });

  p.addCdkDependency("software.amazon.awscdk/aws-sqs");

  const snapshot = Testing.synth(p);
  const pom = JSON.parse(
    xml.convert(snapshot["pom.xml"], {
      format: "json",
    }),
  );

  expect(
    pom.project.dependencies.dependency.filter(
      (d: any) => d.groupId === "software.amazon.awscdk",
    ),
  ).toStrictEqual([
    {
      artifactId: "aws-lambda",
      groupId: "software.amazon.awscdk",
      version: "[1.120.0,2.0.0)",
    },
    {
      artifactId: "aws-sns",
      groupId: "software.amazon.awscdk",
      version: "[1.120.0,2.0.0)",
    },
    {
      artifactId: "aws-sqs",
      groupId: "software.amazon.awscdk",
      version: "[1.120.0,2.0.0)",
    },
    {
      artifactId: "core",
      groupId: "software.amazon.awscdk",
      version: "[1.120.0,2.0.0)",
    },
    {
      artifactId: "assertions",
      groupId: "software.amazon.awscdk",
      version: "[1.120.0,2.0.0)",
      scope: "test",
    },
  ]);

  expect(
    pom.project.dependencies.dependency.filter(
      (d: any) => d.groupId === "software.constructs",
    ),
  ).toStrictEqual([
    {
      artifactId: "constructs",
      groupId: "software.constructs",
      version: "[3.2.27,4.0.0)",
    },
  ]);
});

test("deps cdkv2", () => {
  const p = new awscdk.AwsCdkJavaApp({
    artifactId: "my-app",
    groupId: "org.acme",
    cdkVersion: "2.3.0",
    mainClass: "org.acme.jojo.MyApp",
    name: "my-app",
    version: "0.1.0",
  });

  const snapshot = Testing.synth(p);
  const pom = JSON.parse(
    xml.convert(snapshot["pom.xml"], {
      format: "json",
    }),
  );

  expect(
    pom.project.dependencies.dependency.filter(
      (d: any) => d.groupId === "software.amazon.awscdk",
    ),
  ).toStrictEqual([
    {
      artifactId: "aws-cdk-lib",
      groupId: "software.amazon.awscdk",
      version: "[2.3.0,3.0.0)",
    },
  ]);

  expect(
    pom.project.dependencies.dependency.filter(
      (d: any) => d.groupId === "software.constructs",
    ),
  ).toStrictEqual([
    {
      artifactId: "constructs",
      groupId: "software.constructs",
      version: "[10.0.5,11.0.0)",
    },
  ]);
});

test("can disable sample code", () => {
  const p = new awscdk.AwsCdkJavaApp({
    artifactId: "my-app",
    groupId: "org.acme",
    cdkVersion: "1.120.0",
    mainClass: "org.acme.jojo.MyApp",
    sampleJavaPackage: "org.acme",
    sample: false,
    name: "my-app",
    version: "0.1.0",
  });

  const snapshot = Testing.synth(p);

  expect(Object.keys(snapshot)).not.toContain(
    "src/main/java/org/acme/jojo/MyApp.java",
  );
});
