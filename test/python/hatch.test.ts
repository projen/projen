import * as TOML from "@iarna/toml";
import { TestPythonProject } from "./util";
import {
  PythonFormatter,
  PythonLinter,
  PythonPackageManager,
  PythonTypeChecker,
} from "../../src/python";
import { synthSnapshot } from "../util";

test("hatch enabled", () => {
  const p = new TestPythonProject({
    packageManager: PythonPackageManager.HATCH,
    authors: [{ name: "First Last", email: "email@example.com" }],
    urls: {
      Homepage: "http://www.example.com",
    },
    description: "a short project description",
    license: "Apache Software License",
    classifiers: ["Development Status :: 4 - Beta"],
  });

  const snapshot = synthSnapshot(p);
  expect(snapshot["pyproject.toml"]).toContain("First Last");
  expect(snapshot["pyproject.toml"]).toContain("email@example.com");
  expect(snapshot["pyproject.toml"]).toContain("http://www.example.com");
  expect(snapshot["pyproject.toml"]).toContain("a short project description");
  expect(snapshot["pyproject.toml"]).toContain("Apache Software License");
  expect(snapshot["pyproject.toml"]).toContain(
    "Development Status :: 4 - Beta"
  );
});

test("hatch options not using hatch", () => {
  expect(
    () =>
      new TestPythonProject({
        packageManager: PythonPackageManager.SETUPTOOLS,
        tool: { hatch: { buildConfig: { ignoreVcs: true } } },
      })
  ).toThrowError("`tool.hatch` only applies when using hatch.");
});

test("hatch generates correct pyproject.toml content", () => {
  const project = new TestPythonProject({
    packageManager: PythonPackageManager.HATCH,
    authors: [{ name: "First Last", email: "email@example.com" }],
    urls: {
      Homepage: "http://www.example.com",
    },
    description: "a short project description",
    license: "Apache-2.0",
    dependencies: ["aws-cdk-lib@^2.128.0"],
    linter: PythonLinter.RUFF,
    formatter: PythonFormatter.BLACK,
    typeChecker: PythonTypeChecker.MYPY,
    devDeps: ["pytest"],
    tool: {
      hatch: {
        metadata: {
          allowDirectReferences: true,
          allowAmbiguousFeatures: false,
        },
        envs: {
          build: {
            dependencies: ["build"],
            devMode: true,
            skipInstall: true,
            envVars: { FOO: "bar" },
          },
        },
        buildConfig: {
          ignoreVcs: true,
          skipExcludedDirs: true,
          reproducible: true,
        },
        version: {
          path: "src/test_python_project/_version.py",
          pattern: '__version__ = "{version}"',
        },
        publish: {
          index: {
            disable: false,
            repos: { url: "https://private.pypi.org/simple/" },
          },
        },
      },
    },
  });

  const snapshot = synthSnapshot(project);
  const actualTomlContent = snapshot["pyproject.toml"];
  const actualContentObject = TOML.parse(actualTomlContent);

  const expectedContentObject = {
    "dependency-groups": {
      dev: ["black", "mypy", "projen==99.99.99", "pytest", "ruff"],
    },
    "build-system": {
      "build-backend": "hatchling.build",
      requires: ["hatchling"],
    },
    project: {
      name: "test-python-project",
      version: "0.1.0",
      description: "a short project description",
      license: "Apache-2.0",
      readme: "README.md",
      authors: [{ name: "First Last", email: "email@example.com" }],
      dependencies: ["aws-cdk-lib>=2.128.0,<3.0.0"],
      "requires-python": ">=3.12,<4.0",
      urls: {
        Homepage: "http://www.example.com",
      },
    },
    tool: {
      hatch: {
        metadata: {
          "allow-direct-references": true,
          "allow-ambiguous-features": false,
        },
        envs: {
          build: {
            dependencies: ["build"],
            "dev-mode": true,
            "skip-install": true,
            "env-vars": { FOO: "bar" },
          },
        },
        build: {
          "ignore-vcs": true,
          "skip-excluded-dirs": true,
          reproducible: true,
        },
        version: {
          path: "src/test_python_project/_version.py",
          pattern: '__version__ = "{version}"',
        },
        publish: {
          index: {
            disable: false,
            repos: { url: "https://private.pypi.org/simple/" },
          },
        },
      },
    },
  };

  expect(actualContentObject).toEqual(expectedContentObject);
});
