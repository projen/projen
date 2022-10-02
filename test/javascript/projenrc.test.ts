import path from "path";
import { Projenrc } from "../../src/javascript";
import { renderProjenInitOptions } from "../../src/javascript/render-options";
import { TestProject } from "../util";

test("assert generateProjenrc returns the correct projenrc with correct outdir", () => {
  const generateProjenrcSpy = jest.spyOn(
    Projenrc.prototype as any,
    "generateProjenrc"
  );
  const workDir = path.join(path.dirname(__filename), "..", ".."); // move out the test folder
  const project = new TestProject(
    renderProjenInitOptions("projen.javascript.NodeProject", {
      outdir: "foo",
    })
  );
  const projen = new Projenrc(project);

  expect(generateProjenrcSpy).toBeCalled();
  expect(projen.project.outdir).toEqual(path.join(workDir, "foo"));
});
