import { StandardProject, Testing } from "../../src";
import { renderProjenInitOptions } from "../../src/javascript/render-options";
import { ProjectType } from "../../src/project";
import { Projenrc, resolvePythonImportName } from "../../src/python/projenrc";

test("projenrc.py support", () => {
  // GIVEN
  const project = new StandardProject({ name: "my-project" });

  // WHEN
  new Projenrc(project, {
    projenVersion: "1.2.3",
  });

  // THEN
  expect(Testing.synth(project)).toMatchSnapshot();
});

test("generate projenrc in python", () => {
  // GIVEN
  const project = new StandardProject(
    renderProjenInitOptions("projen.python.PythonProject", {})
  );

  // WHEN
  new Projenrc(project);

  // THEN
  expect(Testing.synth(project)[".projenrc.py"]).toMatchSnapshot();
});

test("javascript values are translated to python", () => {
  // GIVEN
  const project = new StandardProject(
    renderProjenInitOptions("projen.python.PythonProject", {
      stringArg: "hello",
      intArg: 123,
      floatArg: 123.45,
      booleanArg: false,
      undefinedArg: undefined,
      nullArg: null,
      objectArg: { foo: "bar" },
      projectType: ProjectType.LIB,
    })
  );

  // WHEN
  new Projenrc(project);

  // THEN
  expect(Testing.synth(project)[".projenrc.py"]).toMatchSnapshot();
});

test("ensure python import is correctly resolved when python module exists", () => {
  // GIVEN
  const jsiiManifest: any = {
    targets: {
      python: {
        module: "my_module",
      },
    },
  };

  const fqnInputToExpectedImportMap = {
    "my-module.component": "my_module.component",
    "my_module.component": "my_module.component",
    "my_module.nested.component": "my_module.nested.component",
  };

  Object.entries(fqnInputToExpectedImportMap).forEach(
    ([jsiiFqn, expectedImportName]) => {
      // WHEN
      const resolvedImportName = resolvePythonImportName(jsiiFqn, jsiiManifest);

      // THEN
      expect(resolvedImportName).toEqual(expectedImportName);
    }
  );
});

test("ensure python import is correctly resolved to jsiiFqn when python module is undefined", () => {
  // GIVEN
  const jsiiManifest: any = {};
  const jsiiFqn = "my-module.component";

  // WHEN
  const resolvedImportName = resolvePythonImportName(jsiiFqn, jsiiManifest);

  // THEN
  expect(resolvedImportName).toEqual(jsiiFqn);
});
