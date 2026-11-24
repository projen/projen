import { synthSnapshot, TestProject } from "./util";
import { TextFile } from "../src";

test("empty file", () => {
  // GIVEN
  const project = new TestProject();

  // WHEN
  new TextFile(project, "hello/foo.txt");

  // THEN
  const output = synthSnapshot(project)["hello/foo.txt"];
  expect(output).toEqual("");
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
