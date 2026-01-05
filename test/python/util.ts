import { python } from "../../src";

export class TestPythonProject extends python.PythonProject {
  constructor(options: Partial<python.PythonProjectOptions> = {}) {
    super({
      ...options,
      clobber: false,
      name: "test-python-project",
      version: "0.1.0",
    });
  }
}
