import * as YAML from "yaml";
import { PolarisJavaCoverity } from "../../src/polaris/coverity-java";
import { synthSnapshot, TestProject } from "../util";

test("java preset excludes common Java build artifacts, sets build/clean commands and includes java language", () => {
  const project = new TestProject();

  new PolarisJavaCoverity(project, {
    commit: {},
  });

  const yaml = YAML.parse(synthSnapshot(project)["coverity.yml"]);
  expect(yaml).toStrictEqual({
    version: 1,
    capture: {
      encoding: "UTF-8",
      "build-capture": {
        "build-command": "mvn package",
        "clean-command": "mvn clean",
      },
      "compiler-configuration": {
        "cov-configure": [["--java"]],
      },
      files: {
        "exclude-regex": "(\\.settings/.*|dist/java/.*|target/.*)",
      },
      languages: {
        include: ["java"],
      },
    },
  });
});

test("java preset allows overriding defaults", () => {
  const project = new TestProject();

  new PolarisJavaCoverity(project, {
    commit: {},
    capture: {
      buildCapture: {
        buildCommand: "gradle build",
        cleanCommand: "gradle clean",
      },
    },
  });

  const yaml = YAML.parse(synthSnapshot(project)["coverity.yml"]);
  expect(yaml.capture["build-capture"]["build-command"]).toEqual(
    "gradle build",
  );
  expect(yaml.capture["build-capture"]["clean-command"]).toEqual(
    "gradle clean",
  );
  // Language default still applies
  expect(yaml.capture.languages.include).toEqual(["java"]);
});

test("java preset deep-merges partial nested overrides with defaults", () => {
  const project = new TestProject();

  new PolarisJavaCoverity(project, {
    commit: {},
    // Only overriding `encoding`; the `files.excludeRegex` default should survive.
    capture: {
      encoding: "US-ASCII",
    },
  });

  const yaml = YAML.parse(synthSnapshot(project)["coverity.yml"]);
  expect(yaml.capture.encoding).toEqual("US-ASCII");
  expect(yaml.capture.files["exclude-regex"]).toEqual(
    "(\\.settings/.*|dist/java/.*|target/.*)",
  );
});
