import * as YAML from "yaml";
import {
  PolarisCoverity,
  PolarisCoverityAnalyzeMode,
  PolarisCoverityLanguage,
} from "../../src/polaris";
import { synthSnapshot, TestProject } from "../util";

test("default coverity.yml only sets the schema version", () => {
  const project = new TestProject();

  new PolarisCoverity(project);

  const yaml = YAML.parse(synthSnapshot(project)["coverity.yml"]);
  expect(yaml).toStrictEqual({ version: "1" });
});

test("renders capture files and languages filters", () => {
  const project = new TestProject();

  new PolarisCoverity(project, {
    capture: {
      files: {
        excludeRegex:
          "(node_modules\\/.*|dist\\/.*|bin\\/.*|cdktf\\.out\\/.*|tcons-staging\\/.*|\\.gen\\/.*|test\\/.*)",
      },
      languages: {
        include: [PolarisCoverityLanguage.JAVASCRIPT],
      },
    },
  });

  const yaml = YAML.parse(synthSnapshot(project)["coverity.yml"]);
  expect(yaml).toStrictEqual({
    version: "1",
    capture: {
      encoding: "UTF-8",
      files: {
        "exclude-regex":
          "(node_modules\\/.*|dist\\/.*|bin\\/.*|cdktf\\.out\\/.*|tcons-staging\\/.*|\\.gen\\/.*|test\\/.*)",
      },
      languages: {
        include: ["javascript"],
      },
    },
  });
});

test("renders build capture, encoding and compiler configuration", () => {
  const project = new TestProject();

  new PolarisCoverity(project, {
    capture: {
      buildCapture: {
        buildCommand: "mvn -B install",
        cleanCommand: "mvn -B clean",
        aspnetCompiler: false,
      },
      encoding: "UTF-8",
      languages: {
        exclude: [PolarisCoverityLanguage.PYTHON],
      },
      compilerConfiguration: {
        covConfigure: [
          [
            "--template",
            "--compiler",
            "arm-linux-gnueabi-gcc",
            "--comptype",
            "gcc",
          ],
        ],
      },
    },
  });

  const yaml = YAML.parse(synthSnapshot(project)["coverity.yml"]);
  expect(yaml).toStrictEqual({
    version: "1",
    capture: {
      build: {
        "build-command": "mvn -B install",
        "clean-command": "mvn -B clean",
        "aspnet-compiler": false,
      },
      encoding: "UTF-8",
      languages: {
        exclude: ["python"],
      },
      "compiler-configuration": {
        "cov-configure": [
          [
            "--template",
            "--compiler",
            "arm-linux-gnueabi-gcc",
            "--comptype",
            "gcc",
          ],
        ],
      },
    },
  });
});

test("renders project, install and analyze sections", () => {
  const project = new TestProject();

  new PolarisCoverity(project, {
    project: {
      organization: "my-org",
      name: "my-project",
      branch: "main",
      scmUrl: "https://github.com/test/simplejava.git",
    },
    install: {
      version: "2021.06",
      directory:
        "/path/to/already/installed/coverity/coverity-tools-macosx-2021.06-1",
    },
    analyze: {
      mode: PolarisCoverityAnalyzeMode.LOCAL,
      serverUrl: "https://polaris.example.com",
    },
  });

  const yaml = YAML.parse(synthSnapshot(project)["coverity.yml"]);
  expect(yaml).toStrictEqual({
    version: "1",
    project: {
      organization: "my-org",
      name: "my-project",
      branch: "main",
      scmUrl: "https://github.com/test/simplejava.git",
    },
    install: {
      version: "2021.06",
      directory:
        "/path/to/already/installed/coverity/coverity-tools-macosx-2021.06-1",
    },
    analyze: {
      mode: "local",
      serverUrl: "https://polaris.example.com",
    },
  });
});
