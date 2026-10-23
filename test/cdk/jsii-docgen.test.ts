import { Construct } from "constructs";
import { Project } from "../../src";
import type { JsiiProjectOptions } from "../../src/cdk";
import { JsiiDocgen, JsiiProject } from "../../src/cdk";
import { directorySnapshot, synthSnapshot } from "../util";

function createJsiiProject(options: Partial<JsiiProjectOptions> = {}) {
  return new JsiiProject({
    name: "test-project",
    author: "My Name",
    authorAddress: "hello@example.com",
    repositoryUrl: "https://github.com/example/test-project.git",
    defaultReleaseBranch: "main",
    release: false,
    ...options,
  });
}

test.each(["plain", "docgen disabled"])(
  "lookup does not change a project without docgen: %s",
  (kind) => {
    const project =
      kind === "plain"
        ? new Project({ name: "plain" })
        : createJsiiProject({ docgen: false });
    const components = project.components;
    const tasks = project.tasks.all;
    const files = project.files;
    const dependencies = project.deps.all;

    expect(JsiiDocgen.of(project)).toBeUndefined();

    expect(project.components).toEqual(components);
    expect(project.tasks.all).toEqual(tasks);
    expect(project.files).toEqual(files);
    expect(project.deps.all).toEqual(dependencies);
    expect(project.tasks.tryFind("docgen")).toBeUndefined();
    expect(project.deps.tryGetDependency("jsii-docgen")).toBeUndefined();
  },
);

test.each(["project", "construct"])(
  "finds the explicit component created in a %s scope",
  (scopeKind) => {
    const project = new Project({ name: "plain" });
    const scope =
      scopeKind === "project" ? project : new Construct(project, "scope");
    const docgen = new JsiiDocgen(scope);

    expect(JsiiDocgen.of(project)).toBe(docgen);
    expect(docgen.task).toBe(project.tasks.tryFind("docgen"));
  },
);

test("extends the automatic JsiiProject docgen task", () => {
  const project = createJsiiProject();
  const docgen = JsiiDocgen.of(project);
  expect(docgen).toBeInstanceOf(JsiiDocgen);
  expect(docgen!.task).toBe(project.tasks.tryFind("docgen"));

  docgen!.task.exec("jsii-docgen -f json -o API.json");

  const output = synthSnapshot(project);
  const tasks = output[".projen/tasks.json"].tasks;
  expect(tasks.docgen).toEqual({
    name: "docgen",
    description: "Generate API.md from .jsii manifest",
    steps: [
      { execArgs: ["jsii-docgen", "-o", "API.md"] },
      { exec: "jsii-docgen -f json -o API.json" },
    ],
  });
  expect(tasks["post-compile"].steps).toEqual([{ spawn: "docgen" }]);
  expect(output[".gitignore"]).not.toContain("API.json");
  expect(output[".gitattributes"]).not.toContain("API.json");
  expect(project.tryFindFile("API.json")).toBeUndefined();
});

test.each([
  { options: {}, filePath: "API.md", version: "*" },
  {
    options: { filePath: "docs/API reference.md", version: "^10.5.0" },
    filePath: "docs/API reference.md",
    version: "^10.5.0",
  },
])(
  "preserves docgen configuration for $filePath",
  ({ options, filePath, version }) => {
    const project = createJsiiProject({ docgen: false });
    const docgen = new JsiiDocgen(project, options);

    const output = synthSnapshot(project);
    expect(JsiiDocgen.of(project)).toBe(docgen);
    expect(output[".projen/tasks.json"].tasks.docgen.steps).toEqual([
      { execArgs: ["jsii-docgen", "-o", filePath] },
    ]);
    expect(output["package.json"].devDependencies["jsii-docgen"]).toBe(version);
    expect(output[".gitignore"]).toContain(`!/${filePath}`);
    expect(output[".gitattributes"]).toContain(
      `/${filePath} linguist-generated`,
    );
  },
);

test("does not find a parent, child, or sibling project's component", () => {
  const parent = new Project({ name: "parent" });
  const child = new Project({ name: "child", parent, outdir: "child" });
  const sibling = new Project({ name: "sibling", parent, outdir: "sibling" });
  const childDocgen = new JsiiDocgen(child);

  expect(JsiiDocgen.of(parent)).toBeUndefined();
  expect(JsiiDocgen.of(sibling)).toBeUndefined();
  expect(JsiiDocgen.of(child)).toBe(childDocgen);

  const parentDocgen = new JsiiDocgen(parent);
  expect(JsiiDocgen.of(parent)).toBe(parentDocgen);
  expect(JsiiDocgen.of(child)).toBe(childDocgen);
  expect(JsiiDocgen.of(sibling)).toBeUndefined();
});

test("repeated synthesis preserves the extended task and its single spawn", () => {
  const project = new Project({ name: "plain" });
  const docgen = new JsiiDocgen(project);
  JsiiDocgen.of(project)!.task.exec("jsii-docgen -f json -o API.json");

  project.synth();
  const first = directorySnapshot(project.outdir)[".projen/tasks.json"];
  const second = synthSnapshot(project)[".projen/tasks.json"];

  expect(second).toEqual(first);
  expect(second.tasks.docgen.steps).toEqual([
    { execArgs: ["jsii-docgen", "-o", "API.md"] },
    { exec: "jsii-docgen -f json -o API.json" },
  ]);
  expect(second.tasks["post-compile"].steps).toEqual([{ spawn: "docgen" }]);
  expect(JsiiDocgen.of(project)).toBe(docgen);
  expect(docgen.task).toBe(project.tasks.tryFind("docgen"));
});
