import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { synthSnapshot, TestProject } from "./util";
import { JsonFile, LogLevel } from "../src";
import { writeFile } from "../src/util";

test("json object can be mutated before synthesis", () => {
  const prj = new TestProject();

  const obj: any = {
    hello: "world",
  };

  new JsonFile(prj, "my/json/file.json", { obj, marker: false });

  // mutate obj (should be reflected in the output)
  obj.anotherField = {
    foo: 1234,
  };

  expect(synthSnapshot(prj)["my/json/file.json"]).toStrictEqual({
    hello: "world",
    anotherField: { foo: 1234 },
  });
});

test("omitEmpty", () => {
  // GIVEN
  const p = new TestProject();

  // WHEN
  new JsonFile(p, "file.json", {
    omitEmpty: true,
    obj: {
      hello: 1234,
      empty: {},
      array_with_undefined: [undefined, 123, 456],
      child: {
        with: "hello",
        empty: {
          subchild: {},
        },
        empty_strings_are_not_omitted: "",
        zeros_are_not_omitted: 0,
        empty_array: [],
        array_with_empty_objects: [{}, 123],
        array_with_empty_subobjects: [
          {
            i_am_empty: {},
            i_am_not: "hi there",
          },
          {
            just: 1234,
          },
        ],
      },
    },
    marker: false,
  });

  // THEN
  expect(synthSnapshot(p)["file.json"]).toStrictEqual({
    hello: 1234,
    array_with_undefined: [123, 456], // undefined is skipped
    child: {
      with: "hello",
      empty_strings_are_not_omitted: "",
      zeros_are_not_omitted: 0,
      array_with_empty_objects: [123],
      array_with_empty_subobjects: [
        {
          i_am_not: "hi there",
        },
        {
          just: 1234,
        },
      ],
    },
  });
});

test("json file can contain projen marker", () => {
  const prj = new TestProject();

  const obj: any = {};

  const file = new JsonFile(prj, "my/json/file-marker.json", {
    obj,
    marker: true,
  });

  const output = synthSnapshot(prj)["my/json/file-marker.json"];

  expect(output["//"]).toBe(file.marker);
});

test("json5 file can contain projen marker as comment", () => {
  const prj = new TestProject();

  const obj: any = {};

  const file = new JsonFile(prj, "my/json/file-marker.json5", {
    obj,
    marker: true,
  });

  const output = synthSnapshot(prj)["my/json/file-marker.json5"];

  expect(output[Symbol.for("before-all")]).toMatchObject([
    {
      type: "LineComment",
      value: ` ${file.marker}`,
    },
  ]);
});

test("jsonc file can contain projen marker as comment", () => {
  const prj = new TestProject();

  const obj: any = {};

  const file = new JsonFile(prj, "my/json/file-marker.jsonc", {
    obj,
    marker: true,
  });

  const output = synthSnapshot(prj)["my/json/file-marker.jsonc"];

  expect(output[Symbol.for("before-all")]).toMatchObject([
    {
      type: "LineComment",
      value: ` ${file.marker}`,
    },
  ]);
});

test("json file with allowComments can contain projen marker as comment", () => {
  const prj = new TestProject();

  const obj: any = {};

  const file = new JsonFile(prj, "my/json/file-marker.json", {
    obj,
    marker: true,
    allowComments: true,
  });

  const output = synthSnapshot(prj, {
    parseJson: true,
  })["my/json/file-marker.json"];

  expect(output[Symbol.for("before-all")]).toMatchObject([
    {
      type: "LineComment",
      value: ` ${file.marker}`,
    },
  ]);
});

describe("newline", () => {
  const obj = {
    hello: "world",
  };

  test("is enabled by default", () => {
    const prj = new TestProject();

    new JsonFile(prj, "hello.json", { obj });

    prj.synth();
    const output = readFileSync(join(prj.outdir, "hello.json"), "utf-8");
    expect(output.endsWith("\n")).toBe(true);
  });

  test("can be disabled", () => {
    const prj = new TestProject();

    new JsonFile(prj, "hello.json", { obj, newline: false });

    prj.synth();
    const output = readFileSync(join(prj.outdir, "hello.json"), "utf-8");
    expect(output.endsWith("\n")).toBe(false);
  });
});

describe("changed", () => {
  const obj = { hello: "world" };

  it('is "undefined" before synthesis', () => {
    const prj = new TestProject();
    const file = new JsonFile(prj, "hello.json", { obj });
    expect(file.changed).toBeUndefined();
  });

  it('is set to "true" for new files', () => {
    const prj = new TestProject();
    const file = new JsonFile(prj, "hello.json", { obj });
    prj.synth();
    expect(file.changed).toBeTruthy();
  });

  it('is set to "true" if the file changed', () => {
    const prj = new TestProject();
    const file = new JsonFile(prj, "hello.json", { obj });
    writeFileSync(
      join(prj.outdir, "hello.json"),
      JSON.stringify({ hello: "world1" }, undefined, 2)
    );
    prj.synth();
    expect(file.changed).toBeTruthy();
  });

  it('is set to "true" if the file permissions changed', () => {
    const prj = new TestProject({ logging: { level: LogLevel.VERBOSE } });
    const file = new JsonFile(prj, "hello.json", {
      obj,
      newline: false,
      marker: false,
    });
    writeFile(
      join(prj.outdir, "hello.json"),
      JSON.stringify(obj, undefined, 2),
      { readonly: true, executable: true }
    );
    prj.synth();
    expect(file.changed).toBeTruthy();
  });

  it('is set to "false" if the file did not change', () => {
    const prj = new TestProject();
    const file = new JsonFile(prj, "hello.json", {
      obj,
      newline: false,
      marker: false,
    });
    writeFile(
      join(prj.outdir, "hello.json"),
      JSON.stringify(obj, undefined, 2),
      { readonly: true, executable: false }
    );
    prj.synth();
    expect(file.changed).toStrictEqual(false);
  });
});
