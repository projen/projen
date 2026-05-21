import * as path from "path";
import { renderProjenInitOptions } from "../../src/javascript/render-options";
import { ProjenrcYaml } from "../../src/projenrc-yaml";
import { synthSnapshot, TestProject, withProjectDir } from "../util";

test("projenrc.yaml default project", () => {
  // GIVEN
  const project = new TestProject();

  // WHEN
  new ProjenrcYaml(project);

  // THEN
  expect(synthSnapshot(project)).toMatchSnapshot();
});

test("projenrc.yaml with typed options", () => {
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
    }),
  );

  // WHEN
  new ProjenrcYaml(project);

  // THEN
  const snapshot = synthSnapshot(project);
  expect(snapshot).toMatchSnapshot();
  // Verify the YAML file was generated with correct content
  expect(snapshot[".projenrc.yaml"]).toContain("type: projen.typescript.TypeScriptProject");
  expect(snapshot[".projenrc.yaml"]).toContain("name: \"@example/foo\"");
});

test("projenrc.yaml new project in outdir", () => {
  withProjectDir((projectdir) => {
    const newOutDir = path.join(projectdir, "foo");
    const project = new TestProject(
      renderProjenInitOptions("projen.typescript.TypeScriptProject", {
        outdir: newOutDir,
      }),
    );
    const projen = new ProjenrcYaml(project);

    expect(projen.project.outdir).toEqual(newOutDir);
  });
});

test("projenrc.yaml custom filename", () => {
  // GIVEN
  const project = new TestProject();

  // WHEN
  new ProjenrcYaml(project, { filename: ".projenrc.yml" });

  // THEN
  const snapshot = synthSnapshot(project);
  expect(snapshot[".gitignore"]).toContain("!/.projenrc.yml");
});

test("projenrc.yaml sets up default task with builtin", () => {
  // GIVEN
  const project = new TestProject();

  // WHEN
  new ProjenrcYaml(project);

  // THEN
  const snapshot = synthSnapshot(project);
  const tasks = snapshot[".projen/tasks.json"];
  expect(tasks.tasks.default.steps).toEqual([
    { builtin: "run-projenrc-yaml" },
  ]);
  expect(tasks.tasks.default.env.FILENAME).toEqual(".projenrc.yaml");
});
