import { LogLevel } from "../../logger";
import { PythonProject, PythonProjectOptions } from "../../python";
import { mkdtemp, synthSnapshot } from "../util";

test("poetry enabled", () => {
  const p = new TestPythonProject({
    venv: false,
    pip: false,
    setuptools: false,
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
});

class TestPythonProject extends PythonProject {
  constructor(options: Partial<PythonProjectOptions> = {}) {
    super({
      ...options,
      clobber: false,
      name: "test-python-project",
      moduleName: "test_python_project",
      authorName: "First Last",
      authorEmail: "email@example.com",
      version: "0.1.0",
      outdir: mkdtemp(),
      logging: { level: LogLevel.OFF },
    });
  }
}
