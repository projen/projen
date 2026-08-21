import * as YAML from "yaml";
import { PolarisJavascriptCoverity } from "../../src/polaris/coverity-javascript";
import { synthSnapshot, TestProject } from "../util";

test("javascript preset excludes common JS/TS build artifacts and includes javascript language", () => {
  const project = new TestProject();

  new PolarisJavascriptCoverity(project, {
    commit: {},
  });

  const yaml = YAML.parse(synthSnapshot(project)["coverity.yml"]);
  expect(yaml).toStrictEqual({
    version: 1,
    capture: {
      encoding: "UTF-8",
      files: {
        "exclude-regex":
          "(node_modules/.*|lib/.*|dist/.*|coverage/.*|.*\\.d\\.ts|.*\\.js\\.map)",
      },
      languages: {
        include: ["javascript"],
      },
    },
  });
});

test("javascript preset allows overriding defaults", () => {
  const project = new TestProject();

  new PolarisJavascriptCoverity(project, {
    commit: {},
    capture: {
      files: {
        excludeRegex: "custom-regex",
      },
    },
  });

  const yaml = YAML.parse(synthSnapshot(project)["coverity.yml"]);
  expect(yaml.capture.files["exclude-regex"]).toEqual("custom-regex");
  // Language default still applies
  expect(yaml.capture.languages.include).toEqual(["javascript"]);
});

test("javascript preset deep-merges partial nested overrides with defaults", () => {
  const project = new TestProject();

  new PolarisJavascriptCoverity(project, {
    commit: {},
    // Only overriding `encoding`; the `files.excludeRegex` default should survive.
    capture: {
      encoding: "US-ASCII",
    },
  });

  const yaml = YAML.parse(synthSnapshot(project)["coverity.yml"]);
  expect(yaml.capture.encoding).toEqual("US-ASCII");
  expect(yaml.capture.files["exclude-regex"]).toEqual(
    "(node_modules/.*|lib/.*|dist/.*|coverage/.*|.*\\.d\\.ts|.*\\.js\\.map)",
  );
});
