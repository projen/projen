import * as YAML from "yaml";
import { PnpmWorkspaceYaml } from "../../src/javascript/pnpm-workspace";
import { synthSnapshot, TestProject } from "../util";

test("renders onlyBuiltDependencies", () => {
  const project = new TestProject();

  new PnpmWorkspaceYaml(project, {
    onlyBuiltDependencies: ["esbuild", "@biomejs/biome"],
  });

  const files = synthSnapshot(project);
  const workspaceYaml = YAML.parse(files["pnpm-workspace.yaml"]);
  expect(workspaceYaml.onlyBuiltDependencies).toStrictEqual([
    "esbuild",
    "@biomejs/biome",
  ]);
});

test("supports arbitrary pnpm-workspace.yaml settings from the generated schema", () => {
  const project = new TestProject();

  new PnpmWorkspaceYaml(project, {
    packages: ["packages/*"],
    onlyBuiltDependencies: ["esbuild"],
    neverBuiltDependencies: ["fsevents"],
    dangerouslyAllowAllBuilds: false,
  });

  const files = synthSnapshot(project);
  const workspaceYaml = YAML.parse(files["pnpm-workspace.yaml"]);
  expect(workspaceYaml).toStrictEqual({
    packages: ["packages/*"],
    onlyBuiltDependencies: ["esbuild"],
    neverBuiltDependencies: ["fsevents"],
    dangerouslyAllowAllBuilds: false,
  });
});

test("omits empty file when no options are provided", () => {
  const project = new TestProject();

  new PnpmWorkspaceYaml(project);

  const files = synthSnapshot(project);
  expect(files["pnpm-workspace.yaml"]).toBeUndefined();
});

test("of() returns the PnpmWorkspaceYaml instance associated with a project", () => {
  const project = new TestProject();
  const pnpmWorkspaceYaml = new PnpmWorkspaceYaml(project, {
    onlyBuiltDependencies: ["esbuild"],
  });

  expect(PnpmWorkspaceYaml.of(project)).toBe(pnpmWorkspaceYaml);
});

test("of() returns undefined when there is no PnpmWorkspaceYaml component", () => {
  const project = new TestProject();

  expect(PnpmWorkspaceYaml.of(project)).toBeUndefined();
});
