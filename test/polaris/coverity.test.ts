import * as YAML from "yaml";
import {
  AnalysisConfigurationLocation,
  LanguagesConfigurationInclude,
  LanguagesConfigurationExclude,
  PolarisCoverity,
} from "../../src/polaris";
import { synthSnapshot, TestProject } from "../util";

test("defaults version to 1 and capture.encoding to UTF-8", () => {
  const project = new TestProject();

  new PolarisCoverity(project, {
    commit: {
      local: {
        path: "results",
      },
    },
  });

  const yaml = YAML.parse(synthSnapshot(project)["coverity.yml"]);
  expect(yaml).toStrictEqual({
    version: 1,
    capture: {
      encoding: "UTF-8",
    },
    commit: {
      local: {
        path: "results",
      },
    },
  });
});

test("allows overriding the default version and capture.encoding", () => {
  const project = new TestProject();

  new PolarisCoverity(project, {
    version: 2,
    commit: {},
    capture: {
      encoding: "US-ASCII",
    },
  });

  const yaml = YAML.parse(synthSnapshot(project)["coverity.yml"]);
  expect(yaml).toStrictEqual({
    version: 2,
    capture: {
      encoding: "US-ASCII",
    },
  });
});

test("renders capture files and languages filters", () => {
  const project = new TestProject();

  new PolarisCoverity(project, {
    commit: {},
    capture: {
      files: {
        excludeRegex:
          "(node_modules\\/.*|dist\\/.*|bin\\/.*|cdktf\\.out\\/.*|tcons-staging\\/.*|\\.gen\\/.*|test\\/.*)",
      },
      languages: {
        include: [LanguagesConfigurationInclude.JAVASCRIPT],
      },
    },
  });

  const yaml = YAML.parse(synthSnapshot(project)["coverity.yml"]);
  expect(yaml).toStrictEqual({
    version: 1,
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
    commit: {},
    capture: {
      buildCapture: {
        buildCommand: "mvn -B install",
        cleanCommand: "mvn -B clean",
        aspnetCompiler: false,
      },
      encoding: "UTF-8",
      languages: {
        exclude: [LanguagesConfigurationExclude.PYTHON],
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
    version: 1,
    capture: {
      "build-capture": {
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

test("renders analyze section", () => {
  const project = new TestProject();

  new PolarisCoverity(project, {
    commit: {
      connect: {
        url: "https://polaris.example.com",
        stream: "my-stream",
      },
    },
    analyze: {
      location: AnalysisConfigurationLocation.LOCAL,
      connect: {
        url: "https://polaris.example.com",
      },
    },
  });

  const yaml = YAML.parse(synthSnapshot(project)["coverity.yml"]);
  expect(yaml).toStrictEqual({
    version: 1,
    capture: {
      encoding: "UTF-8",
    },
    commit: {
      connect: {
        url: "https://polaris.example.com",
        stream: "my-stream",
      },
    },
    analyze: {
      location: "local",
      connect: {
        url: "https://polaris.example.com",
      },
    },
  });
});
