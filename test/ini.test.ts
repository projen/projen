import * as INI from "ini";
import { synthSnapshot, TestProject } from "./util";
import { IniFile } from "../src";

test("ini object can be mutated before synthesis", () => {
  const prj = new TestProject();

  const obj: any = {
    hello: "world",
  };

  new IniFile(prj, "my/ini/file.ini", { obj, marker: false });

  // mutate obj (should be reflected in the output)
  obj.anotherField = {
    foo: 1234,
  };

  const out = synthSnapshot(prj);
  expect(INI.parse(out["my/ini/file.ini"])).toMatchObject({
    hello: "world",
    anotherField: { foo: "1234" },
  });
});

test("ini file can contain projen marker", () => {
  const prj = new TestProject();

  const obj: any = {};

  const file = new IniFile(prj, "my/ini/file-marker.ini", {
    obj,
    marker: true,
  });

  const output = synthSnapshot(prj)["my/ini/file-marker.ini"];

  const firstLine = output.split("\n")[0];

  expect(firstLine).toBe(`# ${file.marker}`);
});
