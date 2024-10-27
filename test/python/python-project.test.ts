import { TestPythonProject } from "./util";
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
  expect(
    synthSnapshot(p)[".projen/tasks.json"].tasks.test.steps[0].exec
  ).toContain("tests");
});

test("pytest with custom testPaths", () => {
  const p = new TestPythonProject({
    pytestOptions: {
      testPaths: ["tests/foo", "tests/bar"],
    },
  });
  expect(
    synthSnapshot(p)[".projen/tasks.json"].tasks.test.steps[0].exec
  ).toContain("tests/foo tests/bar");
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
