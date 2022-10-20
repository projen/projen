import * as path from "path";
import { renderProjenInitOptions } from "../../src/javascript/render-options";
import { Projenrc } from "../../src/projenrc-json";
import { synthSnapshot, TestProject, withProjectDir } from "../util";

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
  withProjectDir((projectdir) => {
    const newOutDir = path.join(projectdir, "foo");
    const project = new TestProject(
      renderProjenInitOptions("projen.typescript.TypeScriptProject", {
        outdir: newOutDir,
      })
    );
    const projen = new Projenrc(project);

    expect(projen.project.outdir).toEqual(newOutDir);
  });
});
