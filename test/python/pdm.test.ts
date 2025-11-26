import * as TOML from "@iarna/toml";
import { TestPythonProject } from "./util";
import {
  PdmConfigurationVersionSource,
  PythonFormatter,
  PythonLinter,
  PythonPackageManager,
  PythonTypeChecker,
} from "../../src/python";
import { synthSnapshot } from "../util";

test("pdm enabled", () => {
  const p = new TestPythonProject({
    packageManager: PythonPackageManager.PDM,
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

test("pdm options not using pdm", () => {
  expect(
    () =>
      new TestPythonProject({
        packageManager: PythonPackageManager.SETUPTOOLS,
        tool: { pdm: { distribution: true } },
      })
  ).toThrowError("`tool.pdm` only applies when using pdm.");
});

test("pdm generates correct pyproject.toml content", () => {
  const project = new TestPythonProject({
    packageManager: PythonPackageManager.PDM,
    authors: [{ name: "First Last", email: "email@example.com" }],
    urls: {
      Homepage: "http://www.example.com",
    },
    description: "a short project description",
    license: "Apache-2.0",
    dependencies: ["aws-cdk-lib@^2.128.0"],
    linter: PythonLinter.RUFF,
    formatter: PythonFormatter.RUFF,
    typeChecker: PythonTypeChecker.PYRIGHT,
    devDeps: ["pytest"],
    tool: {
      pdm: {
        distribution: true,
        ignorePackageWarnings: ["projen", "pytest"],
        resolution: { allowPrereleases: true, respectSourceOrder: true },
        options: {
          add: ["--no-isolation", "--no-self"],
          install: ["--no-self"],
          lock: ["--no-cross-platform"],
        },
        source: [
          {
            name: "private",
            url: "https://private.pypi.org/simple",
            verifySsl: true,
          },
        ],
        scripts: {
          preBuild: "{{ Run BEFORE the `build` script }}",
          postBuild: "{{ Run AFTER the `build` script }}",
        },
        version: {
          source: PdmConfigurationVersionSource.FILE,
          path: "src/test_python_project/_version.py",
        },
      },
    },
  });

  const snapshot = synthSnapshot(project);
  const actualTomlContent = snapshot["pyproject.toml"];
  const actualContentObject = TOML.parse(actualTomlContent);

  const expectedContentObject = {
    "dependency-groups": {
      dev: ["projen==99.99.99", "pyright", "pytest", "ruff"],
    },
    "build-system": {
      "build-backend": "pdm.backend",
      requires: ["pdm-backend"],
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
      pdm: {
        distribution: true,
        ignore_package_warnings: ["projen", "pytest"],
        resolution: { "allow-prereleases": true, "respect-source-order": true },
        options: {
          add: ["--no-isolation", "--no-self"],
          install: ["--no-self"],
          lock: ["--no-cross-platform"],
        },
        source: [
          {
            name: "private",
            url: "https://private.pypi.org/simple",
            verify_ssl: true,
          },
        ],
        scripts: {
          pre_build: "{{ Run BEFORE the `build` script }}",
          post_build: "{{ Run AFTER the `build` script }}",
        },
        version: {
          source: "file",
          path: "src/test_python_project/_version.py",
        },
      },
    },
  };

  expect(actualContentObject).toEqual(expectedContentObject);
});
