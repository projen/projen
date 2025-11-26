import * as TOML from "@iarna/toml";
import { TestPythonProject } from "./util";
import {
  PythonFormatter,
  PythonPackageManager,
  PythonTypeChecker,
} from "../../src/python";
import { synthSnapshot } from "../util";

test("uv enabled", () => {
  const p = new TestPythonProject({
    packageManager: PythonPackageManager.UV,
    urls: {
      Homepage: "http://www.example.com",
    },
    description: "a short project description",
    license: "Apache-2.0",
    classifiers: ["Development Status :: 4 - Beta"],
    authors: [{ name: "First Last", email: "email@example.com" }],
  });
  const snapshot = synthSnapshot(p);
  expect(snapshot["pyproject.toml"]).toContain("First Last");
  expect(snapshot["pyproject.toml"]).toContain("email@example.com");
  expect(snapshot["pyproject.toml"]).toContain("http://www.example.com");
  expect(snapshot["pyproject.toml"]).toContain("a short project description");
  expect(snapshot["pyproject.toml"]).toContain("Apache-2.0");
  expect(snapshot["pyproject.toml"]).toContain(
    "Development Status :: 4 - Beta"
  );
  expect(snapshot["pyproject.toml"]).toContain('python = ">=3.12,<4.0"'); // default python version
});

test("uv add dependency", () => {
  const p = new TestPythonProject({
    packageManager: PythonPackageManager.UV,
    urls: {
      Homepage: "http://www.example.com",
    },
    description: "a short project description",
    license: "Apache-2.0",
    classifiers: ["Development Status :: 4 - Beta"],
  });
  p.addDependency("ruff");

  const snapshot = synthSnapshot(p);
  expect(snapshot["pyproject.toml"]).toContain("ruff");
});

test("uv add dev dependency", () => {
  const p = new TestPythonProject({
    packageManager: PythonPackageManager.UV,
    urls: {
      Homepage: "http://www.example.com",
    },
    description: "a short project description",
    license: "Apache-2.0",
    classifiers: ["Development Status :: 4 - Beta"],
  });
  p.addDevDependency("ruff");

  const snapshot = synthSnapshot(p);
  expect(snapshot["pyproject.toml"]).toContain("ruff");
});

test("uv options not using uv", () => {
  expect(
    () =>
      new TestPythonProject({
        packageManager: PythonPackageManager.HATCH,
        tool: { uv: { managed: true } },
      })
  ).toThrowError("`tool.uv` only applies when using uv.");
});

test("uv enabled with uv-specific options", () => {
  const p = new TestPythonProject({
    packageManager: PythonPackageManager.UV,
    formatter: PythonFormatter.RUFF,
    name: "test-python-project",
    requiresPython: ">=3.13,<4.0",
    keywords: ["Keyword1"],
    urls: {
      Homepage: "http://www.example.com",
      Repository: "https://github.com/test-python-project",
      Documentation: "https://example.github.io/test-python-project",
    },
    description: "a short project description",
    license: "Apache-2.0",
    classifiers: ["Development Status :: 4 - Beta"],
    version: "0.0.1",
    dependencies: ["package1@0.0.1", "package2@0.0.2", "package3"],
    devDeps: ["pytest", "ruff"],
    authors: [{ name: "First Last", email: "first.last@example.com" }],
    tool: {
      uv: {
        sources: {
          httpx: [{ git: "https://github.com/encode/httpx", tag: "0.27.0" }],
          pytest: [
            {
              url: "https://files.pythonhosted.org/packages/6b/77/7440a06a8ead44c7757a64362dd22df5760f9b12dc5f11b6188cd2fc27a0/pytest-8.3.3-py3-none-any.whl",
            },
          ],
          pydantic: [{ path: "/path/to/pydantic", editable: true }],
        },
        workspace: {
          exclude: ["member1", "path/to/member2", "libs/*"],
          members: ["member2", "packages/*"],
        },
        pip: {
          allExtras: true,
          annotationStyle: "line",
          dependencyMetadata: [
            {
              name: "flask",
              version: "1.0.0",
              requiresDist: ["werkzeug"],
              requiresPython: ">=3.6",
            },
          ],
        },
      },
    },
  });
  const snapshot = synthSnapshot(p);
  expect(snapshot).toMatchSnapshot();
});

test("uv generates correct pyproject.toml content", () => {
  const project = new TestPythonProject({
    packageManager: PythonPackageManager.UV,
    urls: {
      Homepage: "http://www.example.com",
    },
    authors: [{ name: "First Last", email: "email@example.com" }],
    description: "A short project description",
    license: "Apache-2.0",
    dependencies: ["aws-cdk-lib@^2.128.0"],
    typeChecker: PythonTypeChecker.TY,
    devDeps: ["ruff@~=0.14.4", "pytest@*"],
    tool: {
      uv: {
        managed: true,
        buildBackend: {
          data: {
            headers: "include/headers",
            scripts: "bin",
          },
        },
        dependencyMetadata: [
          {
            name: "flask",
            version: "1.0.0",
            requiresDist: ["werkzeug"],
            requiresPython: ">=3.6",
          },
        ],
        extraIndexUrl: ["https://download.pytorch.org/whl/cpu"],
        index: [
          {
            name: "pytorch",
            url: "https://download.pytorch.org/whl/cu121",
            explicit: true,
          },
        ],
        sources: { torch: [{ index: "pytorch" }] },
      },
    },
  });

  const snapshot = synthSnapshot(project);
  const actualTomlContent = snapshot["pyproject.toml"];
  const actualContentObject = TOML.parse(actualTomlContent);

  const expectedContentObject = {
    "dependency-groups": {
      dev: ["projen==99.99.99", "pytest", "ruff~=0.14.4", "ty"],
    },
    "build-system": {
      "build-backend": "uv_build",
      requires: ["uv_build"],
    },
    project: {
      name: "test-python-project",
      version: "0.1.0",
      description: "A short project description",
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
      uv: {
        managed: true,
        "build-backend": {
          data: {
            headers: "include/headers",
            scripts: "bin",
          },
        },
        "dependency-metadata": [
          {
            name: "flask",
            version: "1.0.0",
            "requires-dist": ["werkzeug"],
            "requires-python": ">=3.6",
          },
        ],
        "extra-index-url": ["https://download.pytorch.org/whl/cpu"],
        index: [
          {
            name: "pytorch",
            url: "https://download.pytorch.org/whl/cu121",
            explicit: true,
          },
        ],
        sources: { torch: [{ index: "pytorch" }] },
      },
    },
  };

  expect(actualContentObject).toEqual(expectedContentObject);
});
