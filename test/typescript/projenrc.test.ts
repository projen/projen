import * as path from "path";
import { Projenrc, TypeScriptProject } from "../../src/typescript";
import { withProjectDir } from "../util";

test("assert new Typescript project in foo outdir", () => {
  withProjectDir((projectdir) => {
    const newOutDir = path.join(projectdir, "foo");
    const project = new TypeScriptProject({
      defaultReleaseBranch: "main",
      name: "test",
      outdir: newOutDir,
    });
    const projen = new Projenrc(project);

    expect(projen.project.outdir).toEqual(newOutDir);
  });
});
