import path from "path";
import { removeSync } from "fs-extra";
import { renderProjenInitOptions } from "../../src/javascript/render-options";
import { Projenrc } from "../../src/projenrc-json";
import { synthSnapshot, TestProject } from "../util";

test("projenrc.json default project", () => {
  // GIVEN
  const project = new TestProject();

  // WHEN
  new Projenrc(project);

  // THEN
  expect(synthSnapshot(project)).toMatchSnapshot();
});

test("projenrc.json with typed options", () => {
  // GIVEN
  const project = new TestProject(
    renderProjenInitOptions("projen.typescript.TypeScriptProject", {
      staleOptions: {
        issues: {
          daysBeforeStale: 100, // number, nested option
        },
        pullRequest: {
          enabled: false, // boolean, nested option
        },
      },
      name: "@example/foo", // string
      npmAccess: "public", // enum provided as string
    })
  );

  // WHEN
  new Projenrc(project);

  // THEN
  expect(synthSnapshot(project)).toMatchSnapshot();
});

test("projenrc.json new project in outdir", () => {
  const generateProjenrcSpy = jest.spyOn(
    Projenrc.prototype as any,
    "generateProjenrc"
  );
  const workDir = path.join(path.dirname(__filename), "..", ".."); // move out the test folder
  const project = new TestProject(
    renderProjenInitOptions("projen.typescript.TypeScriptProject", {
      outdir: "foo",
    })
  );
  const projen = new Projenrc(project);
  const newOutDir = path.join(workDir, "foo");

  expect(generateProjenrcSpy).toBeCalled();
  expect(projen.project.outdir).toEqual(newOutDir);

  removeSync(newOutDir);
});
