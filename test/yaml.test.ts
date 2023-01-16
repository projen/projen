import * as YAML from "yaml";
import { synthSnapshot, TestProject } from "./util";
import { YamlFile } from "../src";

test("yaml object can be mutated before synthesis", () => {
  const prj = new TestProject();

  const obj: any = {
    hello: "world",
  };

  new YamlFile(prj, "my/yaml/file.yaml", { obj });

  // mutate obj (should be reflected in the output)
  obj.anotherField = {
    foo: 1234,
  };

  expect(YAML.parse(synthSnapshot(prj)["my/yaml/file.yaml"])).toStrictEqual({
    hello: "world",
    anotherField: { foo: 1234 },
  });
});

test("yaml file can contain projen marker", () => {
  const prj = new TestProject();

  const obj: any = {};

  const file = new YamlFile(prj, "my/yaml/file-marker.yaml", {
    obj,
    marker: true,
  });

  const output = synthSnapshot(prj)["my/yaml/file-marker.yaml"];

  const firstLine = output.split("\n")[0];

  expect(firstLine).toBe(`# ${file.marker}`);
});
