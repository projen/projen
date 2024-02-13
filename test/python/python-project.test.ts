import { python } from "../../src";
import {
  AwsCdkPythonApp,
  AwsCdkPythonAppOptions,
} from "../../src/awscdk/awscdk-app-py";
import { synthSnapshot } from "../util";

test("defaults", () => {
  const p = new TestPythonProject();
  expect(synthSnapshot(p)).toMatchSnapshot();
});

test("dependencies", () => {
  const p = new TestPythonProject();
  p.addDependency("Django@3.1.5");
  p.addDependency("aws-cdk.core@*");
  p.addDevDependency("hypothesis@^6.0.3");
  expect(synthSnapshot(p)).toMatchSnapshot();
});

test("dependencies via ctor", () => {
  const p = new TestPythonProject({
    deps: ["Django@3.1.5", "aws-cdk.core"],
    devDeps: ["hypothesis@^6.0.3"],
  });
  expect(synthSnapshot(p)).toMatchSnapshot();
});

test("no pytest", () => {
  const p = new TestPythonProject({
    pytest: false,
  });

  expect(synthSnapshot(p)).toMatchSnapshot();
});

test("pytest maxfailures", () => {
  const p = new TestPythonProject({
    pytestOptions: {
      maxFailures: 3,
    },
  });

  expect(
    synthSnapshot(p)[".projen/tasks.json"].tasks.test.steps[0].exec
  ).toContain("--maxfail=3");
});

test("pytest without sample code", () => {
  const p = new TestPythonProject({
    pytest: true,
    sample: false,
  });
  expect(synthSnapshot(p)).not.toHaveProperty("tests/__init__.py");
});

test("cannot specify multiple projenrc types", () => {
  expect(
    () =>
      new TestPythonProject({
        projenrcPython: true,
        projenrcJs: true,
      })
  ).toThrow(
    /Only one of projenrcPython, projenrcJs, projenrcTs, and projenrcJson can be selected./
  );
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

test("awscdk app is set up with custom appEntrypoint", () => {
  const customAppEntrypoint = "custom_app.py";

  const options: AwsCdkPythonAppOptions = {
    authorName: "Test Author",
    authorEmail: "test@example.com",
    moduleName: "test_module",
    name: "test_project",
    version: "0.1.0",
    cdkVersion: "1.0.0",
    appEntrypoint: customAppEntrypoint,
  };

  // Instantiate AwsCdkPythonApp with custom options
  const app = new AwsCdkPythonApp(options);

  // Synthesize the project to generate the project structure
  const snapshot = synthSnapshot(app);

  // Check if the synthesized snapshot contains the custom app entrypoint
  expect(Object.keys(snapshot)).toContain(customAppEntrypoint);
});
