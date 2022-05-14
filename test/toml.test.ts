import * as TOML from "@iarna/toml";
import { Project, Testing, TomlFile } from "../src";

test("toml object can be mutated before synthesis", () => {
  const prj = new Project({ name: "my-project" });

  const obj: any = {
    hello: "world",
  };

  new TomlFile(prj, "my/toml/file.toml", { obj });

  // mutate obj (should be reflected in the output)
  obj.anotherField = {
    foo: 1234,
  };

  const out = Testing.synth(prj);
  expect(TOML.parse(out["my/toml/file.toml"])).toStrictEqual({
    hello: "world",
    anotherField: { foo: 1234 },
  });
});

test("toml file can contain projen marker", () => {
  const prj = new Project({ name: "my-project" });

  const obj: any = {};

  const file = new TomlFile(prj, "my/toml/file-marker.toml", {
    obj,
    marker: true,
  });

  const output = Testing.synth(prj)["my/toml/file-marker.toml"];

  const firstLine = output.split("\n")[0];

  expect(firstLine).toBe(`# ${file.marker}`);
});
