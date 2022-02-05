import { Project } from "../../src";
import { AutoDiscoverBase } from "../../src/cdk";

test("auto discover entrypoints", () => {
  // GIVEN
  const project = new Project({
    name: "project",
    outdir: __dirname,
  });

  // WHEN
  const autoDiscover = new AutoDiscoverBase(project, {
    extension: ".myext.ts",
    projectdir: "testtree",
  });

  // THEN
  expect(autoDiscover.entrypoints).toEqual(["testtree/abc.myext.ts"]);
});
