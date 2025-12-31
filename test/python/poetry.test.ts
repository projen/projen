import * as TOML from "@iarna/toml";
import { TestPythonProject } from "./util";
import * as logging from "../../src/logging";
import { PoetryPackageFormat, PythonPackageManager } from "../../src/python";
import { synthSnapshot } from "../util";

test("poetry enabled", () => {
  const p = new TestPythonProject({
    packageManager: PythonPackageManager.POETRY,
    urls: {
      Homepage: "http://www.example.com",
    },
    authors: [{ name: "First Last", email: "email@example.com" }],
    description: "a short project description",
    license: "Apache-2.0",
    classifiers: ["Development Status :: 4 - Beta"],
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
  expect(snapshot["pyproject.toml"]).toContain(
    'requires-python = ">=3.12,<4.0"'
  ); // default python version
});

test("poetry and venv fails", () => {
  expect(
    () =>
      new TestPythonProject({
        packageManager: PythonPackageManager.POETRY,
        venv: true,
        urls: {
          Homepage: "http://www.example.com",
        },
        description: "a short project description",
        license: "Apache-2.0",
        classifiers: ["Development Status :: 4 - Beta"],
      })
  ).toThrowError();
});

test("poetry enabled", () => {
  const p = new TestPythonProject({
    packageManager: PythonPackageManager.POETRY,
    urls: {
      Homepage: "http://www.example.com",
    },
    description: "a short project description",
    license: "Apache-2.0",
    classifiers: ["Development Status :: 4 - Beta"],
    tool: { poetry: { maintainers: ["First Last <email@example.com>"] } },
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
  expect(snapshot["pyproject.toml"]).toContain(
    'requires-python = ">=3.12,<4.0"'
  ); // default python version
});

test("poetry enabled with added dependency", () => {
  const p = new TestPythonProject({
    packageManager: PythonPackageManager.POETRY,
    urls: {
      Homepage: "http://www.example.com",
    },
    description: "a short project description",
    license: "Apache-2.0",
    classifiers: ["Development Status :: 4 - Beta"],
  });
  p.addDependency("my_package@^1.1");

  const snapshot = synthSnapshot(p);
  expect(snapshot["pyproject.toml"]).toContain('my_package>=1.1,<2.0.0"');
});

describe("poetry enabled with poetry-specific options", () => {
  const p = new TestPythonProject({
    packageManager: PythonPackageManager.POETRY,
    urls: {
      Homepage: "http://www.example.com",
      "bug tracker": "https://github.com/test-python-project/issues",
    },
    description: "a short project description",
    license: "Apache-2.0",
    classifiers: ["Development Status :: 4 - Beta"],
    dependencies: ["package1@0.0.1", "package2@0.0.2", "package3"],
    tool: {
      poetry: {
        maintainers: ["First Last <first.last@example.com>"],
        repository: "https://github.com/test-python-project",
        keywords: ["Keyword1"],
        packages: [
          {
            include: "my_package",
            format: [PoetryPackageFormat.SDIST],
          },
        ],
        include: ["CHANGELOG.md"],
        exclude: ["my_package/excluded.py"],
        source: [
          {
            name: "pypi_",
            url: "https://pypi.org/simple/",
            default: true,
          },
        ],
        scripts: {
          "test-python-cli": "test-python-project.cli:cli",
        },
        extras: {
          cli: ["package1", "package2"],
        },
        plugins: {
          "blogtool.parsers": {
            ".rst": "some_module:SomeClass",
          },
        },
        packageMode: false,
      },
    },
  });
  const snapshot = synthSnapshot(p);
  const actualTomlContent = snapshot["pyproject.toml"];
  const actualObjectContent = TOML.parse(actualTomlContent) as any;
  it("should match the snapshot", () => {
    expect(snapshot).toMatchSnapshot();
  });
  it("should set package-mode correctly", () => {
    expect(actualObjectContent.tool.poetry["package-mode"]).toBe(false);
  });
});

describe("poetry correctly handles dependencies with toml inline tables", () => {
  const p = new TestPythonProject({
    packageManager: PythonPackageManager.POETRY,
    urls: {
      Homepage: "http://www.example.com",
    },
    description: "a short project description",
    license: "Apache-2.0",
    classifiers: ["Development Status :: 4 - Beta"],
    dependencies: [
      `package1@{ git = "https://github.com/numpy/numpy.git", tag = "v0.13.2", subdirectory = "foo" }`, // `git` dependencies
      `package2@{ path = "../my-package/", develop = false }`, // `path` dependencies
      `package3@{ version = "^20.1", extras = ["extra1", "extra2"], url = "https://www.example.com" }`, // Dependency `extras`
      `package4@{ version = "^2.2", markers = "python_version <= '3.4' or sys_platform == 'win32'" }`, // Using environment markers
      `package5@[{ version = "<=1.9", python = ">=3.6,<3.8" }, { version = "^2.0", python = ">=3.8" }]`, // Multiple constraints dependencies
    ],
  });

  const snapshot = synthSnapshot(p);
  const actualTomlContent = snapshot["pyproject.toml"];
  const actualObjectContent = TOML.parse(actualTomlContent) as any;
  it("should not have a value for package-mode", () => {
    expect(actualObjectContent.tool.poetry["package-mode"]).toBeUndefined();
  });
  it("should set git dependencies correctly", () => {
    // Handles TOML table with strings
    expect(actualObjectContent.project.dependencies[0]).toEqual(
      "package1 @ git+https://github.com/numpy/numpy.git@v0.13.2#subdirectory=foo"
    );
  });

  it("should set path dependencies correctly", () => {
    // Handles TOML table with boolean
    expect(actualObjectContent.project.dependencies[1]).toEqual(
      "package2 @ file://../my-package/"
    );
  });
  it("should set extras dependencies correctly", () => {
    // Handles TOML table with array
    expect(actualObjectContent.project.dependencies[2]).toEqual(
      "package3[extra1,extra2] (>=20.1,<21.0.0) @ https://www.example.com"
    );
  });
  it("should set dependency markers correctly that have both single and double quotes", () => {
    // Handles TOML table with both single and double quotes
    expect(actualObjectContent.project.dependencies[3]).toEqual(
      "package4 (>=2.2,<3.0.0) ; python_version <= '3.4' or sys_platform == 'win32'"
    );
  });

  it("should set multiple constraints dependencies correctly", () => {
    // Handles TOML array of tables
    expect(actualObjectContent.project.dependencies[4]).toEqual(
      "package5 (<=1.9) ; python_version >= '3.6' and python_version < '3.8'"
    );
    expect(actualObjectContent.project.dependencies[5]).toEqual(
      "package5 (>=2.0,<3.0.0) ; python_version >= '3.8'"
    );
  });
  it("should match the snapshot for the pyproject.toml file", () => {
    expect(actualTomlContent).toMatchSnapshot();
  });
});

test("poetry environment is setup with pythonExec", () => {
  // GIVEN
  const debug = jest.spyOn(logging, "debug");
  const p = new TestPythonProject({
    packageManager: PythonPackageManager.POETRY,
    urls: {
      Homepage: "http://www.example.com",
    },
    pythonExec: "python-exec-test-path",
  });

  // WHEN
  synthSnapshot(p);
  try {
    p.envManager.setupEnvironment();
  } catch {
    // we expect this to fail because of the nonsensical python executable
  }

  // THEN
  expect(debug).toBeCalledWith(
    expect.stringContaining("poetry env use python-exec-test-path")
  );

  // AFTER
  debug.mockRestore();
});

test("generates correct pyproject.toml content", () => {
  const project = new TestPythonProject({
    packageManager: PythonPackageManager.POETRY,
    urls: {
      Homepage: "http://www.example.com",
    },
    license: "Apache-2.0",
    dependencies: ["aws-cdk-lib@^2.128.0"],
    devDeps: ["black@^24.2.0", "flake8@^7.0.0"],
    tool: {
      poetry: {
        description: "A short project description",
        include: ["my_folder"],
      },
    },
  });

  const snapshot = synthSnapshot(project);
  const actualTomlContent = snapshot["pyproject.toml"];

  const actualContentObject = TOML.parse(actualTomlContent);

  const expectedContentObject = {
    project: {
      name: "test-python-project",
      version: "0.1.0",
      description: "A short project description",
      license: "Apache-2.0",
      readme: "README.md",
      dependencies: ["aws-cdk-lib>=2.128.0,<3.0.0"],
      "requires-python": ">=3.12,<4.0",
      urls: {
        Homepage: "http://www.example.com",
      },
    },
    "dependency-groups": {
      dev: [
        "black>=24.2.0,<25.0.0",
        "flake8>=7.0.0,<8.0.0",
        "projen==99.99.99",
        "pytest==7.4.3",
      ],
    },
    "build-system": {
      requires: ["poetry-core"],
      "build-backend": "poetry.core.masonry.api",
    },
    tool: { poetry: { include: ["my_folder"] } },
  };

  expect(actualContentObject).toEqual(expectedContentObject);
});

test("invalid author name", () => {
  expect(
    () =>
      new TestPythonProject({
        packageManager: PythonPackageManager.POETRY,
        tool: {
          poetry: {
            authors: ["First Last"],
          },
        },
      })
  ).toThrowError();
});
