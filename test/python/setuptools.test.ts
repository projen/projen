import { TestPythonProject } from "./util";
import { PythonPackageManager } from "../../src/python";
import { synthSnapshot } from "../util";

test("setuptools enabled", () => {
  const p = new TestPythonProject({
    packageManager: PythonPackageManager.SETUPTOOLS,
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
