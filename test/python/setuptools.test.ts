import { TestPythonProject } from "./util";
import { synthSnapshot } from "../util";

test("setuptools enabled", () => {
  const p = new TestPythonProject({
    setuptools: true,
    homepage: "http://www.example.com",
    description: "a short project description",
    license: "Apache Software License",
    classifiers: ["Development Status :: 4 - Beta"],
  });

  const snapshot = synthSnapshot(p);
  expect(snapshot["setup.py"]).toContain("First Last");
  expect(snapshot["setup.py"]).toContain("email@example.com");
  expect(snapshot["setup.py"]).toContain("http://www.example.com");
  expect(snapshot["setup.py"]).toContain("a short project description");
  expect(snapshot["setup.py"]).toContain("Apache Software License");
  expect(snapshot["setup.py"]).toContain("Development Status :: 4 - Beta");
});
