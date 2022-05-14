import { StandardProject, Testing } from "../../src";
import { renderProjenInitOptions } from "../../src/javascript/render-options";
import { Projenrc } from "../../src/projenrc-json";

test("projenrc.json default project", () => {
  // GIVEN
  const project = new StandardProject({ name: "my-project" });

  // WHEN
  new Projenrc(project);

  // THEN
  expect(Testing.synth(project)).toMatchSnapshot();
});

test("projenrc.json with typed options", () => {
  // GIVEN
  const project = new StandardProject(
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
  expect(Testing.synth(project)).toMatchSnapshot();
});
