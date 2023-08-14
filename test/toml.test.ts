import { randomUUID } from "crypto";
import * as TOML from "@iarna/toml";
import { synthSnapshot, TestProject } from "./util";
import { TomlFile } from "../src";
import { PythonProject } from "../src/python/python-project";

test("toml object can be mutated before synthesis", () => {
  const prj = new TestProject();

  const obj: any = {
    hello: "world",
  };

  new TomlFile(prj, "my/toml/file.toml", { obj });

  // mutate obj (should be reflected in the output)
  obj.anotherField = {
    foo: 1234,
  };

  const out = synthSnapshot(prj);
  expect(TOML.parse(out["my/toml/file.toml"])).toStrictEqual({
    hello: "world",
    anotherField: { foo: 1234 },
  });
});

test("toml file can contain projen marker", () => {
  const prj = new TestProject();

  const obj: any = {};

  const file = new TomlFile(prj, "my/toml/file-marker.toml", {
    obj,
    marker: true,
  });

  const output = synthSnapshot(prj)["my/toml/file-marker.toml"];

  const firstLine = output.split("\n")[0];

  expect(firstLine).toBe(`# ${file.marker}`);
});

test("marker should use correct projenrc filename and projen command", () => {
  const projenCommand = "projen" + randomUUID();
  const project = new PythonProject({
    projenCommand,
    moduleName: "hello",
    name: "test-python-project",
    authorName: "John Doe",
    authorEmail: "johndoe@example.com",
    version: "0.1.0",
  });

  new TomlFile(project, "my/toml/file-marker.toml", {
    obj: {},
    marker: true,
  });

  const output = synthSnapshot(project)["my/toml/file-marker.toml"];

  const [firstLine] = output.split("\n", 1);

  expect(firstLine).toContain(".projenrc.py");
  expect(firstLine).toContain(projenCommand);
});
