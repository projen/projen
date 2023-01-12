import { synthSnapshot, TestProject } from "./util";
import { ObjectFile } from "../src";
import { JsonFile } from "../src/json";
import { JsonPatch } from "../src/json-patch";

class ChildObjectFile extends ObjectFile {}

test("json object can be mutated before synthesis", () => {
  const prj = new TestProject();

  const obj: any = {
    hello: "world",
  };

  new ChildObjectFile(prj, "my/object/file.json", { obj, marker: false });

  // mutate obj (should be reflected in the output)
  obj.anotherField = {
    foo: 1234,
  };

  expect(synthSnapshot(prj)["my/object/file.json"]).toStrictEqual({
    hello: "world",
    anotherField: { foo: 1234 },
  });
});

describe("overrides", () => {
  test("addOverride(p, v) allows assigning arbitrary values to synthesized resource definitions", () => {
    // GIVEN
    const prj = new TestProject();
    const file = new JsonFile(prj, "my/object/file.json", {
      obj: { initialObj: "must be nonempty" },
      marker: false,
    });

    // WHEN
    file.addOverride("metadata", { key: 12 });
    file.addOverride("use.dot.notation", "to create subtrees");

    // THEN
    expect(synthSnapshot(prj)["my/object/file.json"]).toStrictEqual({
      initialObj: "must be nonempty",
      use: { dot: { notation: "to create subtrees" } },
      metadata: { key: 12 },
    });
  });

  test("addOverride(p, v) allows indexing into arrays to reach particular paths", () => {
    // GIVEN
    const prj = new TestProject();
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
    expect(synthSnapshot(prj)["my/object/file.json"]).toStrictEqual({
      myArray: [123, 2, { foo: "baz" }],
    });
  });

  test("addOverride(p, undefined) can be used to delete a value", () => {
    // GIVEN
    const prj = new TestProject();
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
    expect(synthSnapshot(prj)["my/object/file.json"]).toStrictEqual({
      hello: {
        world: {
          value1: "Hello",
        },
      },
    });
  });

  test("addOverride(p, undefined) will not create empty trees", () => {
    // GIVEN
    const prj = new TestProject();
    const file = new JsonFile(prj, "my/object/file.json", {
      obj: { initialObj: "must be nonempty" },
      marker: false,
    });

    // WHEN
    file.addOverride("tree.exists", 42);
    file.addOverride("tree.does.not.exist", undefined);

    // THEN
    expect(synthSnapshot(prj)["my/object/file.json"]).toStrictEqual({
      initialObj: "must be nonempty",
      tree: {
        exists: 42,
      },
    });
  });

  test("addDeletionOverride(p) is sugar for `undefined`", () => {
    // GIVEN
    const prj = new TestProject();
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
    expect(synthSnapshot(prj)["my/object/file.json"]).toStrictEqual({
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
    const prj = new TestProject();
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
    expect(synthSnapshot(prj)["my/object/file.json"]).toStrictEqual({
      hello: { world: { foo: { bar: 42 } } },
      override1: {
        override2: { foo: [1] },
      },
    });
  });

  test("addOverride(p, v) will not split on escaped dots", () => {
    // GIVEN
    const prj = new TestProject();
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
    expect(synthSnapshot(prj)["my/object/file.json"]).toStrictEqual({
      initialObj: "cannot be empty",
      "Hello.World": { "Foo.Bar.Baz": 42 },
      SingleBackSlashes: 42,
      "Escaped\\": { "Back\\": { Slashes: 42 } },
      "DoublyEscaped\\\\Back\\\\Slashes": 42,
      "EndWith\\": 42,
    });
  });
});

describe("addToArray", () => {
  test("addToArray(p, v) adds to an existing array", () => {
    // GIVEN
    const prj = new TestProject();
    const file = new JsonFile(prj, "my/object/file.json", {
      obj: { first: { second: { array: ["initial value"] } } },
      marker: false,
    });

    // WHEN
    file.addToArray(
      "first.second.array",
      "first extra value",
      "second extra value"
    );

    // THEN
    expect(synthSnapshot(prj)["my/object/file.json"]).toStrictEqual({
      first: {
        second: {
          array: ["initial value", "first extra value", "second extra value"],
        },
      },
    });
  });

  test("addToArray(p, v) creates an array", () => {
    // GIVEN
    const prj = new TestProject();
    const file = new JsonFile(prj, "my/object/file.json", {
      obj: {},
      marker: false,
    });

    // WHEN
    file.addToArray(
      "first.second.array",
      "first extra value",
      "second extra value"
    );

    // THEN
    expect(synthSnapshot(prj)["my/object/file.json"]).toStrictEqual({
      first: {
        second: {
          array: ["first extra value", "second extra value"],
        },
      },
    });
  });

  test("addToArray(p, v) replaces an object", () => {
    // GIVEN
    const prj = new TestProject();
    const file = new JsonFile(prj, "my/object/file.json", {
      obj: { first: { second: { object: { some: "value" } } } },
      marker: false,
    });

    // WHEN
    file.addToArray(
      "first.second.object",
      "first extra value",
      "second extra value"
    );

    // THEN
    expect(synthSnapshot(prj)["my/object/file.json"]).toStrictEqual({
      first: {
        second: {
          object: ["first extra value", "second extra value"],
        },
      },
    });
  });

  test("addToArray(p, v) works with lazy values", () => {
    // GIVEN
    const prj = new TestProject();
    const file = new JsonFile(prj, "my/object/file.json", {
      obj: {
        first: {
          second: {
            array: () => {
              return ["initial value"];
            },
          },
        },
      },
      marker: false,
    });

    // WHEN
    file.addToArray(
      "first.second.array",
      "first extra value",
      "second extra value"
    );

    // THEN
    expect(synthSnapshot(prj)["my/object/file.json"]).toStrictEqual({
      first: {
        second: {
          array: ["initial value", "first extra value", "second extra value"],
        },
      },
    });
  });
});

describe("patch", () => {
  test("patch(p, v) can add to an existing array", () => {
    // GIVEN
    const prj = new TestProject();
    const file = new JsonFile(prj, "my/object/file.json", {
      obj: { first: { second: { array: ["initial value"] } } },
      marker: false,
    });
    // WHEN
    file.patch(JsonPatch.add("/first/second/array/-", "first extra value"));
    file.patch(JsonPatch.add("/first/second/array/-", "second extra value"));
    file.patch(JsonPatch.add("/first/second/array/1", "third extra value"));
    // THEN
    expect(synthSnapshot(prj)["my/object/file.json"]).toStrictEqual({
      first: {
        second: {
          array: [
            "initial value",
            "third extra value",
            "first extra value",
            "second extra value",
          ],
        },
      },
    });
  });
  test("patch(p, v) can create an array", () => {
    // GIVEN
    const prj = new TestProject();
    const file = new JsonFile(prj, "my/object/file.json", {
      obj: { first: { second: {} } },
      marker: false,
    });
    // WHEN
    file.patch(
      JsonPatch.add("/first/second/array", []),
      JsonPatch.add("/first/second/array/-", "first extra value"),
      JsonPatch.add("/first/second/array/-", "second extra value")
    );
    // THEN
    expect(synthSnapshot(prj)["my/object/file.json"]).toStrictEqual({
      first: {
        second: {
          array: ["first extra value", "second extra value"],
        },
      },
    });
  });

  test("patch(p, v) can work with lazy values", () => {
    // GIVEN
    const prj = new TestProject();
    const file = new JsonFile(prj, "my/object/file.json", {
      obj: {
        first: {
          second: {
            array: () => {
              return ["initial value"];
            },
          },
        },
      },
      marker: false,
    });
    // WHEN
    file.patch(
      JsonPatch.add("/first/second/array/-", "first extra value"),
      JsonPatch.add("/first/second/array/-", "second extra value")
    );
    // THEN
    expect(synthSnapshot(prj)["my/object/file.json"]).toStrictEqual({
      first: {
        second: {
          array: ["initial value", "first extra value", "second extra value"],
        },
      },
    });
  });
});
