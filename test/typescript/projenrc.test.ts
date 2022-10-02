import path from "path";
import { removeSync } from "fs-extra";
import { Projenrc, TypeScriptProject } from "../../src/typescript";

test("assert new Typescript project in foo outdir", () => {
  const generateProjenrcSpy = jest.spyOn(
    Projenrc.prototype as any,
    "generateProjenrc"
  );
  const workDir = path.join(path.dirname(__filename), "..", ".."); // move out the test folder
  const project = new TypeScriptProject({
    defaultReleaseBranch: "main",
    name: "test",
    outdir: "foo",
  });
  const projen = new Projenrc(project);
  const newOutDir = path.join(workDir, "foo");

  expect(generateProjenrcSpy).toBeCalled();
  expect(projen.project.outdir).toEqual(newOutDir);

  removeSync(newOutDir);
});
