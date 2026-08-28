import * as YAML from "yaml";
import { PolarisGoCoverity } from "../../src/polaris/coverity-go";
import { synthSnapshot, TestProject } from "../util";

test("go preset excludes common Go build artifacts, sets a build command and includes go language", () => {
  const project = new TestProject();

  new PolarisGoCoverity(project, {
    commit: {},
  });

  const yaml = YAML.parse(synthSnapshot(project)["coverity.yml"]);
  expect(yaml).toStrictEqual({
    version: 1,
    capture: {
      encoding: "UTF-8",
      "build-capture": {
        "build-command": "go build .",
      },
      "compiler-configuration": {
        "cov-configure": [["--go"]],
      },
      files: {
        "exclude-regex": "(vendor/.*|bin/.*|dist/.*)",
      },
      languages: {
        include: ["go"],
      },
    },
  });
});

test("go preset allows overriding defaults", () => {
  const project = new TestProject();

  new PolarisGoCoverity(project, {
    commit: {},
    capture: {
      buildCapture: {
        buildCommand: "go build ./...",
      },
    },
  });

  const yaml = YAML.parse(synthSnapshot(project)["coverity.yml"]);
  expect(yaml.capture["build-capture"]["build-command"]).toEqual(
    "go build ./...",
  );
  // Language default still applies
  expect(yaml.capture.languages.include).toEqual(["go"]);
});

test("go preset deep-merges partial nested overrides with defaults", () => {
  const project = new TestProject();

  new PolarisGoCoverity(project, {
    commit: {},
    // Only overriding `encoding`; the `files.excludeRegex` default should survive.
    capture: {
      encoding: "US-ASCII",
    },
  });

  const yaml = YAML.parse(synthSnapshot(project)["coverity.yml"]);
  expect(yaml.capture.encoding).toEqual("US-ASCII");
  expect(yaml.capture.files["exclude-regex"]).toEqual(
    "(vendor/.*|bin/.*|dist/.*)",
  );
});
