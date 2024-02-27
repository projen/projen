import * as TOML from "@iarna/toml";
import { python } from "../../src";
import * as logging from "../../src/logging";
import { synthSnapshot } from "../util";

test("poetry enabled", () => {
  const p = new TestPythonProject({
    poetry: true,
    homepage: "http://www.example.com",
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
  expect(snapshot["pyproject.toml"]).toContain('python = "^3.8"'); // default python version
});

test("poetry and venv fails", () => {
  expect(
    () =>
      new TestPythonProject({
        poetry: true,
        venv: true,
        homepage: "http://www.example.com",
        description: "a short project description",
        license: "Apache-2.0",
        classifiers: ["Development Status :: 4 - Beta"],
      })
  ).toThrowError();
});

test("poetry and pip fails", () => {
  expect(
    () =>
      new TestPythonProject({
        poetry: true,
        pip: true,
        homepage: "http://www.example.com",
        description: "a short project description",
        license: "Apache-2.0",
        classifiers: ["Development Status :: 4 - Beta"],
      })
  ).toThrowError();
});

test("poetry and setuptools fails", () => {
  expect(
    () =>
      new TestPythonProject({
        poetry: true,
        setuptools: true,
        homepage: "http://www.example.com",
        description: "a short project description",
        license: "Apache-2.0",
        classifiers: ["Development Status :: 4 - Beta"],
      })
  ).toThrowError();
});

test("poetry enabled", () => {
  const p = new TestPythonProject({
    poetry: true,
    homepage: "http://www.example.com",
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
  expect(snapshot["pyproject.toml"]).toContain('python = "^3.8"'); // default python version
});

test("poetry enabled with specified python version", () => {
  const p = new TestPythonProject({
    poetry: true,
    homepage: "http://www.example.com",
    description: "a short project description",
    license: "Apache-2.0",
    classifiers: ["Development Status :: 4 - Beta"],
  });
  p.addDependency("python@^3.8,<=3.11");

  const snapshot = synthSnapshot(p);
  expect(snapshot["pyproject.toml"]).toContain('python = "^3.8,<=3.11"');
});

test("poetry enabled with poetry-specific options", () => {
  const p = new TestPythonProject({
    poetry: true,
    homepage: "http://www.example.com",
    description: "a short project description",
    license: "Apache-2.0",
    classifiers: ["Development Status :: 4 - Beta"],
    deps: ["package1@0.0.1", "package2@0.0.2", "package3"],
    poetryOptions: {
      maintainers: ["First-2 Last-2"],
      repository: "https://github.com/test-python-project",
      keywords: ["Keyword1"],
      packages: [
        {
          include: "my_package",
          format: "sdist",
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
      urls: {
        "bug tracker": "https://github.com/test-python-project/issues",
      },
    },
  });

  expect(synthSnapshot(p)).toMatchSnapshot();
});

test("poetry enabled with metadata in dependencies", () => {
  const p = new TestPythonProject({
    poetry: true,
    homepage: "http://www.example.com",
    description: "a short project description",
    license: "Apache-2.0",
    classifiers: ["Development Status :: 4 - Beta"],
    deps: [
      "regular-version-package@1.2.3",
      'package1@{version = "^3.3.3", extras = ["mypackage-extra"]}',
      'package2@{ path = "../mypackage/foo" }',
    ],
  });

  const snapshot = synthSnapshot(p);
  // Rendered as a "normal" version
  expect(snapshot["pyproject.toml"]).toContain(
    'regular-version-package = "1.2.3"'
  );
  // package1 metadata should be rendered as its own section, and contain the specified metadata
  expect(snapshot["pyproject.toml"]).toContain(
    "[tool.poetry.dependencies.package1]"
  );
  expect(snapshot["pyproject.toml"]).toContain('version = "^3.3.3"');
  expect(snapshot["pyproject.toml"]).toContain('extras = ["mypackage-extra"]');
  // Likewise package2 metadata should be rendered
  expect(snapshot["pyproject.toml"]).toContain(
    "[tool.poetry.dependencies.package2]"
  );
  expect(snapshot["pyproject.toml"]).toContain('path = "../mypackage/foo"');
  expect(snapshot["pyproject.toml"]).toMatchSnapshot();
});

test("poetry environment is setup with pythonExec", () => {
  // GIVEN
  const debug = jest.spyOn(logging, "debug");
  const p = new TestPythonProject({
    poetry: true,
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
  expect(debug).toBeCalledWith("poetry env use python-exec-test-path");

  // AFTER
  debug.mockRestore();
});

class TestPythonProject extends python.PythonProject {
  constructor(options: Partial<python.PythonProjectOptions> = {}) {
    super({
      ...options,
      clobber: false,
      name: "test-python-project",
      moduleName: "test_python_project",
      authorName: "First Last",
      authorEmail: "email@example.com",
      version: "0.1.0",
    });
  }
}

test("generates correct pyproject.toml content", () => {
  const project = new TestPythonProject({
    poetry: true,
    homepage: "http://www.example.com",
    description: "A short project description",
    license: "Apache-2.0",
    deps: ["aws-cdk-lib@^2.128.0"],
    devDeps: ["black@^24.2.0", "flake8@^7.0.0"],
  });

  const snapshot = synthSnapshot(project);
  const actualTomlContent = snapshot["pyproject.toml"];

  const actualContentObject = TOML.parse(actualTomlContent);

  const expectedContentObject = {
    tool: {
      poetry: {
        name: "test-python-project",
        version: "0.1.0",
        description: "A short project description",
        license: "Apache-2.0",
        authors: ["First Last <email@example.com>"],
        homepage: "http://www.example.com",
        readme: "README.md",
        dependencies: {
          "aws-cdk-lib": "^2.128.0",
          python: "^3.8",
        },
        group: {
          dev: {
            dependencies: {
              black: "^24.2.0",
              flake8: "^7.0.0",
              projen: "99.99.99",
              pytest: "7.4.3",
            },
          },
        },
      },
    },
    "build-system": {
      requires: ["poetry-core"],
      "build-backend": "poetry.core.masonry.api",
    },
  };

  expect(actualContentObject).toEqual(expectedContentObject);
});
