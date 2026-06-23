import * as path from "path";
import { Projenrc } from "../../src/javascript";
import { renderProjenInitOptions } from "../../src/javascript/render-options";
import { TestProject, withProjectDir } from "../util";

test("assert generateProjenrc returns the correct projenrc with correct outdir", async () => {
  await withProjectDir(async (projectdir) => {
    const newOutDir = path.join(projectdir, "foo");
    const project = new TestProject(
      renderProjenInitOptions("projen.javascript.NodeProject", {
        outdir: newOutDir,
      }),
    );
    const projen = new Projenrc(project);

    expect(projen.project.outdir).toEqual(newOutDir);
  });
});
