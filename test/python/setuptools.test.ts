import { python } from "../../src";
import { synthSnapshot } from "../util";

test("setuptools enabled", () => {
  const p = new TestPythonProject({
    setuptools: true,
    homepage: "http://www.example.com",
    description: "A short project description",
    classifiers: ["Development Status :: 4 - Beta"],
  });

  const snapshot = synthSnapshot(p);
  expect(snapshot["setup.py"]).toContain("First Last");
  expect(snapshot["setup.py"]).toContain("email@example.com");
  expect(snapshot["setup.py"]).toContain("http://www.example.com");
  expect(snapshot["setup.py"]).toContain("A short project description");
  expect(snapshot["setup.py"]).toContain("Apache-2.0");
  expect(snapshot["setup.py"]).toContain("Development Status :: 4 - Beta");
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
