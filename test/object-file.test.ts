import { ObjectFile, Project, Testing } from "../src";
import { JsonFile } from "../src/json";

class ChildObjectFile extends ObjectFile {}

test("json object can be mutated before synthesis", () => {
  const prj = new Project({ name: "my-project" });

  const obj: any = {
    hello: "world",
  };

  new ChildObjectFile(prj, "my/object/file.json", { obj, marker: false });

  // mutate obj (should be reflected in the output)
  obj.anotherField = {
    foo: 1234,
  };

  expect(Testing.synth(prj)["my/object/file.json"]).toStrictEqual({
    hello: "world",
    anotherField: { foo: 1234 },
  });
});

describe("overrides", () => {
  test("addOverride(p, v) allows assigning arbitrary values to synthesized resource definitions", () => {
    // GIVEN
    const prj = new Project({ name: "my-project" });
    const file = new JsonFile(prj, "my/object/file.json", {
      obj: { initialObj: "must be nonempty" },
      marker: false,
    });

    // WHEN
    file.addOverride("metadata", { key: 12 });
    file.addOverride("use.dot.notation", "to create subtrees");

    // THEN
    expect(Testing.synth(prj)["my/object/file.json"]).toStrictEqual({
      initialObj: "must be nonempty",
      use: { dot: { notation: "to create subtrees" } },
      metadata: { key: 12 },
    });
  });

  test("addOverride(p, v) allows indexing into arrays to reach particular paths", () => {
    // GIVEN
    const prj = new Project({ name: "my-project" });
    const file = new JsonFile(prj, "my/object/file.json", {
      obj: {
        myArray: [1, 2, { foo: "bar" }],
      },
      marker: false,
    });

    // WHEN
    file.addOverride("myArray.0", 123);
    file.addOverride("myArray.2.foo", "baz");

    // THEN
    expect(Testing.synth(prj)["my/object/file.json"]).toStrictEqual({
      myArray: [123, 2, { foo: "baz" }],
    });
  });

  test("addOverride(p, undefined) can be used to delete a value", () => {
    // GIVEN
    const prj = new Project({ name: "my-project" });
    const file = new JsonFile(prj, "my/object/file.json", {
      obj: {
        hello: {
          world: {
            value1: "Hello",
            value2: 129,
          },
        },
      },
      marker: false,
    });

    // WHEN
    file.addOverride("hello.world.value2", undefined);

    // THEN
    expect(Testing.synth(prj)["my/object/file.json"]).toStrictEqual({
      hello: {
        world: {
          value1: "Hello",
        },
      },
    });
  });

  test("addOverride(p, undefined) will not create empty trees", () => {
    // GIVEN
    const prj = new Project({ name: "my-project" });
    const file = new JsonFile(prj, "my/object/file.json", {
      obj: { initialObj: "must be nonempty" },
      marker: false,
    });

    // WHEN
    file.addOverride("tree.exists", 42);
    file.addOverride("tree.does.not.exist", undefined);

    // THEN
    expect(Testing.synth(prj)["my/object/file.json"]).toStrictEqual({
      initialObj: "must be nonempty",
      tree: {
        exists: 42,
      },
    });
  });

  test("addDeletionOverride(p) is sugar for `undefined`", () => {
    // GIVEN
    const prj = new Project({ name: "my-project" });
    const file = new JsonFile(prj, "my/object/file.json", {
      obj: {
        hello: {
          world: {
            value1: "Hello",
            value2: 129,
            value3: ["foo", "bar"],
          },
        },
      },
      marker: false,
    });

    // WHEN
    file.addDeletionOverride("hello.world.value2");

    // THEN
    expect(Testing.synth(prj)["my/object/file.json"]).toStrictEqual({
      hello: {
        world: {
          value1: "Hello",
          value3: ["foo", "bar"],
        },
      },
    });
  });

  test("addOverride(p, v) will overwrite any non-objects along the path", () => {
    // GIVEN
    const prj = new Project({ name: "my-project" });
    const file = new JsonFile(prj, "my/object/file.json", {
      obj: {
        hello: {
          world: 42,
        },
      },
      marker: false,
    });

    // WHEN
    file.addOverride("override1", ["Hello", 123]);
    file.addOverride("override1.override2", { foo: [1] });
    file.addOverride("hello.world.foo.bar", 42);

    // THEN
    expect(Testing.synth(prj)["my/object/file.json"]).toStrictEqual({
      hello: { world: { foo: { bar: 42 } } },
      override1: {
        override2: { foo: [1] },
      },
    });
  });

  test("addOverride(p, v) will not split on escaped dots", () => {
    // GIVEN
    const prj = new Project({ name: "my-project" });
    const file = new JsonFile(prj, "my/object/file.json", {
      obj: { initialObj: "cannot be empty" },
      marker: false,
    });

    // WHEN
    file.addOverride(String.raw`Hello\.World.Foo\.Bar\.Baz`, 42);
    file.addOverride(String.raw`Single\Back\Slashes`, 42);
    file.addOverride(String.raw`Escaped\\.Back\\.Slashes`, 42);
    file.addOverride(String.raw`DoublyEscaped\\\\Back\\\\Slashes`, 42);
    file.addOverride("EndWith\\", 42); // Raw string cannot end with a backslash

    // THEN
    expect(Testing.synth(prj)["my/object/file.json"]).toStrictEqual({
      initialObj: "cannot be empty",
      "Hello.World": { "Foo.Bar.Baz": 42 },
      SingleBackSlashes: 42,
      "Escaped\\": { "Back\\": { Slashes: 42 } },
      "DoublyEscaped\\\\Back\\\\Slashes": 42,
      "EndWith\\": 42,
    });
  });
});
