import * as path from "path";
import * as inventory from "../src/inventory";
import { toProjectType } from "../src/inventory";

const result = inventory.discover();

test("read manifest - no compression", () => {
  const manifest = inventory.readManifest(
    path.join(__dirname, "inventory/no_compression"),
  );

  expect(manifest.schema).toEqual("jsii/0.10.0");
  expect(manifest.compression).toEqual("none");
});

test("read manifest - gzip compression", () => {
  const manifest = inventory.readManifest(
    path.join(__dirname, "inventory/gzip_compression"),
  );

  expect(manifest.schema).toEqual("jsii/0.10.0");
  expect(manifest.compression).toEqual("gzip");
});

test("project id", () => {
  expect(result.map((x) => x.pjid).sort()).toContain("jsii");
  expect(result.map((x) => x.pjid).sort()).toContain("awscdk-construct");
  expect(result.map((x) => x.pjid).sort()).toContain("typescript");
});

test("inventory", () => {
  expect(result).toMatchSnapshot();
});

test("remote discover project id simulation", () => {
  const remoteDiscoverResult = inventory.discover(path.join(__dirname, ".."));
  expect(remoteDiscoverResult.map((x) => x.pjid).sort()).toContain("jsii");
  expect(remoteDiscoverResult.map((x) => x.pjid).sort()).toContain(
    "awscdk-construct",
  );
  expect(remoteDiscoverResult.map((x) => x.pjid).sort()).toContain(
    "typescript",
  );
});

test("renderable default values simulation", () => {
  const baseOption = {
    path: ["myOption"],
    name: "myOption",
    switch: "my-option",
    simpleType: "boolean",
    type: { primitive: "boolean" },
    parent: "MyModule",
  };
  expect(() => throwIfNotRenderable(baseOption)).not.toThrow();
  expect(() =>
    throwIfNotRenderable({ ...baseOption, default: "undefined" }),
  ).not.toThrow();
  expect(() =>
    throwIfNotRenderable({ ...baseOption, default: "$BASEDIR" }),
  ).not.toThrow();
  expect(() =>
    throwIfNotRenderable({ ...baseOption, default: '{ "a": 3 }' }),
  ).not.toThrow();
  expect(() =>
    throwIfNotRenderable({ ...baseOption, default: "2048" }),
  ).not.toThrow();
  expect(() =>
    throwIfNotRenderable({ ...baseOption, default: "true" }),
  ).not.toThrow();
  expect(() =>
    throwIfNotRenderable({ ...baseOption, default: '["a", "b", "c"]' }),
  ).not.toThrow();
  expect(() =>
    throwIfNotRenderable({ ...baseOption, default: "[1, 2, 3]" }),
  ).not.toThrow();
  expect(() =>
    throwIfNotRenderable({ ...baseOption, default: "[true, false, true]" }),
  ).not.toThrow();
  expect(() =>
    throwIfNotRenderable({ ...baseOption, default: "[]" }),
  ).not.toThrow();

  expect(() =>
    throwIfNotRenderable({
      ...baseOption,
      default: "MyEnum.OptionA",
      simpleType: "MyEnum",
    }),
  ).not.toThrow();
  expect(() =>
    throwIfNotRenderable({ ...baseOption, default: "MyEnum.OptionA" }),
  ).toThrow();
  expect(() =>
    throwIfNotRenderable({
      ...baseOption,
      default: "MyEnum.OptionA",
      simpleType: "BaseEnum",
    }),
  ).toThrow();

  expect(() =>
    throwIfNotRenderable({ ...baseOption, default: "- current year" }),
  ).not.toThrow();
  expect(() =>
    throwIfNotRenderable({ ...baseOption, default: "current year" }),
  ).toThrow();
});

describe("all default values in docstrings are renderable JS values", () => {
  result.forEach((project) => {
    project.options.forEach((option) => {
      test(`${project.pjid}:${option.path.join(".")}=${option.default}`, () => {
        expect(() => throwIfNotRenderable(option)).not.toThrow();
      });
    });
  });
});

test("@pjnew is parsed as initial value", () => {
  const option = result
    .find((p) => p.pjid === "typescript")
    ?.options.find((o) => o.name === "projenrcTs");

  expect(option?.initialValue).toBe("true");
});

test("all allowed default values can be discovered and rendered", () => {
  const defaultOptionsManifest = inventory.readManifest(
    path.join(__dirname, "inventory/renderable-defaults"),
  );
  const testProject = toProjectType(
    defaultOptionsManifest.types,
    "test.TestProject",
  );
  testProject.options.forEach((option) => {
    expect(() => throwIfNotRenderable(option)).not.toThrow();
  });
});

describe("project option documentation overrides", () => {
  function struct(
    name: string,
    parents: string[],
    summary?: string,
    overrides?: string,
  ) {
    return {
      name,
      assembly: "test",
      fqn: `test.${name}`,
      kind: "interface",
      interfaces: parents.map((p) => `test.${p}`),
      properties: summary
        ? [
            {
              name: "marker",
              docs: { summary, default: overrides ? "false" : "true" },
              optional: true,
              type: { primitive: "boolean" },
              overrides,
            },
          ]
        : [],
    };
  }

  function discover(parents: string[]) {
    const { types } = inventory.readManifest(
      path.join(__dirname, "inventory/renderable-defaults"),
    );
    // Reuse the fixture's Project and its initializer.
    return toProjectType(
      {
        ...types,
        "test.Base": struct("Base", [], "base docs"),
        "test.Middle": struct("Middle", ["Base"], "middle docs", "test.Base"),
        "test.Child": struct("Child", ["Middle"], "child docs", "test.Middle"),
        "test.Left": struct("Left", ["Child"]),
        "test.Right": struct("Right", ["Child"]),
        "test.Other": struct("Other", [], "other docs"),
        "test.OtherBranch": struct("OtherBranch", ["Other"]),
        "test.Combined": struct(
          "Combined",
          ["Base", "OtherBranch"],
          "combined docs",
          "test.Base",
        ),
        "test.TestProjectOptions": struct("TestProjectOptions", parents),
      },
      "test.TestProject",
    ).options;
  }

  test.each([
    ["Child", "Base"],
    ["Base", "Child"],
    ["Left", "Right"],
  ])("uses the most specific docs with parents %s and %s", (first, second) => {
    expect(discover([first, second])).toEqual([
      expect.objectContaining({
        name: "marker",
        parent: "Child",
        docs: "child docs",
        default: "false",
      }),
    ]);
  });

  test("rejects unrelated declarations with the same name", () => {
    expect(() => discover(["Other", "Base"])).toThrow(
      'duplicate option "marker" in test.TestProject (already declared in Other)',
    );
  });

  test("a child redeclaration covers both branches although jsii names one base", () => {
    expect(discover(["Combined"])).toEqual([
      expect.objectContaining({
        name: "marker",
        parent: "Combined",
        docs: "combined docs",
      }),
    ]);
  });

  test("an override does not resolve a collision with an unrelated sibling", () => {
    expect(() => discover(["Child", "Other"])).toThrow(
      'duplicate option "marker" in test.TestProject (already declared in Child)',
    );
  });
});

function throwIfNotRenderable(option: inventory.InventoryProjectOption) {
  return (
    option.default === undefined ||
    option.default === "undefined" ||
    option.default.startsWith("$") ||
    option.default.startsWith("-") ||
    option.default.startsWith(option.simpleType) ||
    JSON.parse(option.default)
  );
}
