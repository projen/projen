import * as path from "path";
import * as inventory from "../src/inventory";

const result = inventory.discover();

test("read manifest - no compression", () => {
  const manifest = inventory.readManifest(
    path.join(__dirname, "inventory/no_compression")
  );

  expect(manifest.schema).toEqual("jsii/0.10.0");
  expect(manifest.compression).toEqual("none");
});

test("read manifest - gzip compression", () => {
  const manifest = inventory.readManifest(
    path.join(__dirname, "inventory/gzip_compression")
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
    "awscdk-construct"
  );
  expect(remoteDiscoverResult.map((x) => x.pjid).sort()).toContain(
    "typescript"
  );
});

test("renderable default values simulation", () => {
  const baseOption = {
    path: ["myOption"],
    name: "myOption",
    switch: "my-option",
    simpleType: "boolean",
    fullType: { primitive: "boolean" },
    parent: "MyModule",
  };
  expect(() => throwIfNotRenderable(baseOption)).not.toThrowError();
  expect(() =>
    throwIfNotRenderable({ ...baseOption, default: "undefined" })
  ).not.toThrowError();
  expect(() =>
    throwIfNotRenderable({ ...baseOption, default: "$BASEDIR" })
  ).not.toThrowError();
  expect(() =>
    throwIfNotRenderable({ ...baseOption, default: '{ "a": 3 }' })
  ).not.toThrowError();
  expect(() =>
    throwIfNotRenderable({ ...baseOption, default: "2048" })
  ).not.toThrowError();
  expect(() =>
    throwIfNotRenderable({ ...baseOption, default: "true" })
  ).not.toThrowError();

  expect(() =>
    throwIfNotRenderable({
      ...baseOption,
      default: "MyEnum.OptionA",
      simpleType: "MyEnum",
    })
  ).not.toThrowError();
  expect(() =>
    throwIfNotRenderable({ ...baseOption, default: "MyEnum.OptionA" })
  ).toThrowError();
  expect(() =>
    throwIfNotRenderable({
      ...baseOption,
      default: "MyEnum.OptionA",
      simpleType: "BaseEnum",
    })
  ).toThrowError();

  expect(() =>
    throwIfNotRenderable({ ...baseOption, default: "- current year" })
  ).not.toThrowError();
  expect(() =>
    throwIfNotRenderable({ ...baseOption, default: "current year" })
  ).toThrowError();
});

describe("all default values in docstrings are renderable JS values", () => {
  result.forEach((project) => {
    project.options.forEach((option) => {
      test(`${project.pjid}:${option.path.join(".")}=${option.default}`, () => {
        expect(() => throwIfNotRenderable(option)).not.toThrowError();
      });
    });
  });
});

describe("different overrides annotation permutations. Project A's interface extends Project B's interface with the same variable testVarToOverride", () => {
  test("The parameter has overrides annotation in Project A but not B", () => {
    expect(() =>
      inventory.resolveProjectType(
        "test/inventory/no_compression/overrides_directive/projectA-yes_projectB-no"
      )
    ).not.toThrowError();
    expect(
      inventory
        .resolveProjectType(
          "test/inventory/no_compression/overrides_directive/projectA-yes_projectB-no"
        )
        .options.filter((option) => {
          return option.name === "testVarToOverride";
        }).length
    ).toBe(1);
    expect(
      inventory
        .resolveProjectType(
          "test/inventory/no_compression/overrides_directive/projectA-no_projectB-yes"
        )
        .options.filter((option) => {
          return option.name === "testVarToOverride";
        })[0].overrides
    ).toBe(true);
  });
  test("The parameter has overrides annotation in Project B but not A", () => {
    expect(() =>
      inventory.resolveProjectType(
        "test/inventory/no_compression/overrides_directive/projectA-no_projectB-yes"
      )
    ).not.toThrowError();
    expect(
      inventory
        .resolveProjectType(
          "test/inventory/no_compression/overrides_directive/projectA-no_projectB-yes"
        )
        .options.filter((option) => {
          return option.name === "testVarToOverride";
        }).length
    ).toBe(1);
    expect(
      inventory
        .resolveProjectType(
          "test/inventory/no_compression/overrides_directive/projectA-no_projectB-yes"
        )
        .options.filter((option) => {
          return option.name === "testVarToOverride";
        })[0].overrides
    ).toBe(true);
  });
  test("The parameter has overrides annotation in Project A and B", () => {
    expect(() =>
      inventory.resolveProjectType(
        "test/inventory/no_compression/overrides_directive/projectA-yes_projectB-yes"
      )
    ).toThrowError(/^duplicate option.*Both options use overrides flag/);
  });
  test("The parameter has no overrides annotation in Project A and B", () => {
    expect(() =>
      inventory.resolveProjectType(
        "test/inventory/no_compression/overrides_directive/projectA-no_projectB-no"
      )
    ).toThrowError(/^duplicate option.*None of the options use overrides flag/);
  });
});

function throwIfNotRenderable(option: inventory.ProjectOption) {
  return (
    option.default === undefined ||
    option.default === "undefined" ||
    option.default.startsWith("$") ||
    option.default.startsWith("-") ||
    option.default.startsWith(option.simpleType) ||
    JSON.parse(option.default)
  );
}
