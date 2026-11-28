import { readFileSync } from "node:fs";
import { mkdtemp, synthSnapshot, TestProject } from "./util";
import { JsonFile, TextFile } from "../src";
import { PROJEN_MARKER } from "../src/common";

test("empty file", () => {
  // GIVEN
  const project = new TestProject();

  // WHEN
  new TextFile(project, "hello/foo.txt");

  // THEN
  const output = synthSnapshot(project)["hello/foo.txt"];
  expect(output).toEqual("");
});

test.each([{}, { marker: false }, { marker: true }])(
  "honors marker options %j without changing the file contents",
  (options) => {
    const project = new TestProject();
    const lines = ["#!/bin/sh", "echo hello"];
    const file = new TextFile(project, "hello.sh", {
      ...options,
      executable: true,
      lines,
    });
    new JsonFile(project, "file.json", { obj: {} });

    const output = synthSnapshot(project);
    expect(file.marker).toEqual(
      options.marker ? expect.stringContaining(PROJEN_MARKER) : undefined,
    );
    expect(output["hello.sh"]).toEqual(lines.join("\n"));
    expect(output["file.json"]["//"]).toContain(PROJEN_MARKER);
  },
);

test("an ejected TextFile has no marker even if enabled", () => {
  const original = process.env.PROJEN_EJECTING;
  process.env.PROJEN_EJECTING = "true";
  try {
    const project = new TestProject({ outdir: mkdtemp() });
    const file = new TextFile(project, "hello.txt", {
      marker: true,
      lines: ["hello"],
    });

    file.synthesize();

    expect(file.marker).toBeUndefined();
    expect(readFileSync(file.absolutePath, "utf8")).toBe("hello");
  } finally {
    if (original === undefined) {
      delete process.env.PROJEN_EJECTING;
    } else {
      process.env.PROJEN_EJECTING = original;
    }
  }
});

test("initialized with some lines", () => {
  // GIVEN
  const project = new TestProject();

  // WHEN
  new TextFile(project, "boom/boom/bam.txt", {
    lines: ["line1", "line2", "line3"],
  });

  // THEN
  const output = synthSnapshot(project)["boom/boom/bam.txt"];
  expect(output).toEqual(["line1", "line2", "line3"].join("\n"));
});

test("addLine() can add lines later", () => {
  // GIVEN
  const project = new TestProject();
  const tf = new TextFile(project, "hello-world.txt", {
    lines: ["line1", "line2"],
  });

  // WHEN
  tf.addLine("hey there");
  tf.addLine("you too");

  // THEN
  const output = synthSnapshot(project)["hello-world.txt"];
  expect(output).toEqual(["line1", "line2", "hey there", "you too"].join("\n"));
});
