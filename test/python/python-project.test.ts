import { mkdirSync, rmSync, writeFileSync } from "fs";
import { join } from "path";
import { TestPythonProject } from "./util";
import { Pip, Poetry, Venv } from "../../src/python";
import { Tasks } from "../../src/tasks";
import { mkdtemp, synthSnapshot } from "../util";

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
    synthSnapshot(p)[".projen/tasks.json"].tasks.test.steps[0].execArgs,
  ).toContain("--maxfail=3");
});

test("pytest without sample code", () => {
  const p = new TestPythonProject({
    pytest: true,
    sample: false,
  });
  const synth = synthSnapshot(p);
  expect(synth).not.toHaveProperty("tests/__init__.py");
  expect(synth[".projen/tasks.json"].tasks.test.steps[0].execArgs).toEqual([
    "pytest",
  ]);
});

test("pytest with custom testPaths", () => {
  const p = new TestPythonProject({
    pytestOptions: {
      testMatch: ["tests/foo", "tests/bar"],
    },
  });
  expect(
    synthSnapshot(p)[".projen/tasks.json"].tasks.test.steps[0].execArgs,
  ).toEqual(["pytest", "-o", "testpaths=tests/foo tests/bar"]);
});

test("cannot specify multiple projenrc types", () => {
  expect(
    () =>
      new TestPythonProject({
        projenrcPython: true,
        projenrcJs: true,
      }),
  ).toThrow(
    /Only one of projenrcPython, projenrcJs, projenrcTs, and projenrcJson can be selected./,
  );
});

test("extras render properly", () => {
  const p = new TestPythonProject({
    deps: ["aws-lambda-powertools[tracer]"],
  });
  expect(synthSnapshot(p)["requirements.txt"]).toContain(
    "aws-lambda-powertools[tracer]",
  );
});

test("extras render properly with explicit version", () => {
  const p = new TestPythonProject({
    deps: ["aws-lambda-powertools[tracer]@1.0.0"],
  });
  expect(synthSnapshot(p)["requirements.txt"]).toContain(
    "aws-lambda-powertools[tracer]==1.0.0",
  );
});

describe("install trigger", () => {
  afterEach(() => jest.restoreAllMocks());

  /**
   * Runs a synthesis without executing the post-synthesis hooks, laying down
   * the generated files (incl. the file manifest) without side effects.
   */
  function synthWithoutPost(project: TestPythonProject) {
    const prevDisablePost = process.env.PROJEN_DISABLE_POST;
    process.env.PROJEN_DISABLE_POST = "true";
    try {
      project.synth();
    } finally {
      if (prevDisablePost === undefined) {
        delete process.env.PROJEN_DISABLE_POST;
      } else {
        process.env.PROJEN_DISABLE_POST = prevDisablePost;
      }
    }
  }

  test("does not install dependencies when the manifests are unchanged and the environment exists", () => {
    const taskMock = jest.spyOn(Tasks.prototype, "runTask").mockReturnValue();
    const outdir = mkdtemp({ cleanup: false });

    // initial synth to lay down the dependency manifests
    synthWithoutPost(new TestPythonProject({ outdir }));
    mkdirSync(join(outdir, ".env")); // the venv already exists

    const installSpy = jest.spyOn(Pip.prototype, "installDependencies");

    // second synth on the same directory, nothing changed
    new TestPythonProject({ outdir }).synth();

    expect(installSpy).not.toHaveBeenCalled();
    expect(taskMock).not.toHaveBeenCalled();

    rmSync(outdir, { recursive: true, force: true });
  });

  test("installs dependencies when a manifest has changed", () => {
    const taskMock = jest.spyOn(Tasks.prototype, "runTask").mockReturnValue();
    const outdir = mkdtemp({ cleanup: false });

    synthWithoutPost(new TestPythonProject({ outdir }));
    mkdirSync(join(outdir, ".env"));
    // generated files are written read-only, so remove before diverging
    rmSync(join(outdir, "requirements.txt"));
    writeFileSync(join(outdir, "requirements.txt"), "flask\n");

    const installSpy = jest.spyOn(Pip.prototype, "installDependencies");

    new TestPythonProject({ outdir }).synth();

    expect(installSpy).toHaveBeenCalledTimes(1);
    expect(taskMock).toHaveBeenCalledWith("install");

    rmSync(outdir, { recursive: true, force: true });
  });

  test("installs dependencies when the environment is missing", () => {
    const taskMock = jest.spyOn(Tasks.prototype, "runTask").mockReturnValue();
    const venvSpy = jest
      .spyOn(Venv.prototype, "setupEnvironment")
      .mockReturnValue(); // avoid creating a real venv
    const outdir = mkdtemp({ cleanup: false });

    // manifests are unchanged, but there is no .env directory (e.g. fresh clone)
    synthWithoutPost(new TestPythonProject({ outdir }));

    const installSpy = jest.spyOn(Pip.prototype, "installDependencies");

    new TestPythonProject({ outdir }).synth();

    expect(venvSpy).toHaveBeenCalled();
    expect(installSpy).toHaveBeenCalledTimes(1);
    expect(taskMock).toHaveBeenCalledWith("install");

    rmSync(outdir, { recursive: true, force: true });
  });

  test("installs dependencies on the first synthesis", () => {
    const taskMock = jest.spyOn(Tasks.prototype, "runTask").mockReturnValue();
    jest.spyOn(Venv.prototype, "setupEnvironment").mockReturnValue(); // avoid creating a real venv
    const outdir = mkdtemp({ cleanup: false }); // no manifests and no environment yet

    const installSpy = jest.spyOn(Pip.prototype, "installDependencies");

    new TestPythonProject({ outdir }).synth();

    expect(installSpy).toHaveBeenCalledTimes(1);
    expect(taskMock).toHaveBeenCalledWith("install");

    rmSync(outdir, { recursive: true, force: true });
  });

  test("poetry: does not install dependencies when pyproject.toml is unchanged and an environment exists", () => {
    const taskMock = jest.spyOn(Tasks.prototype, "runTask").mockReturnValue();
    jest.spyOn(Poetry.prototype, "setupEnvironment").mockReturnValue();
    jest.spyOn(Poetry.prototype, "environmentExists").mockReturnValue(true);
    const outdir = mkdtemp({ cleanup: false });

    synthWithoutPost(new TestPythonProject({ outdir, poetry: true }));

    const installSpy = jest.spyOn(Poetry.prototype, "installDependencies");

    new TestPythonProject({ outdir, poetry: true }).synth();

    expect(installSpy).not.toHaveBeenCalled();
    expect(taskMock).not.toHaveBeenCalled();

    rmSync(outdir, { recursive: true, force: true });
  });

  test("poetry: installs dependencies on the first synthesis", () => {
    const taskMock = jest.spyOn(Tasks.prototype, "runTask").mockReturnValue();
    jest.spyOn(Poetry.prototype, "setupEnvironment").mockReturnValue();
    const outdir = mkdtemp({ cleanup: false });

    const installSpy = jest.spyOn(Poetry.prototype, "installDependencies");

    new TestPythonProject({ outdir, poetry: true }).synth();

    expect(installSpy).toHaveBeenCalledTimes(1);
    expect(taskMock).toHaveBeenCalledWith("install");

    rmSync(outdir, { recursive: true, force: true });
  });
});
