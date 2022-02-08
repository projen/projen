import { TextFile } from "../src";
import { synthSnapshot, TestProject } from "./util";

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

test("empty file with marker", () => {
  const project = new TestProject();

  const file = new TextFile(project, "hello/foo.txt", {
    marker: true,
    projenMarkerPrefix: "#",
  });

  const output = synthSnapshot(project)["hello/foo.txt"];
  expect(output).toEqual(`# ${file.marker}\n`);
});

test("marker at start of file", () => {
  const project = new TestProject();

  const file = new TextFile(project, "hello/foo.txt", {
    marker: true,
    projenMarkerPrefix: "#",
    projenMarkerAtStart: true,
    lines: ["line1", "line2", "line3", "line4"],
  });

  const output = synthSnapshot(project)["hello/foo.txt"];
  expect(output).toEqual(
    [`# ${file.marker}`, "line1", "line2", "line3", "line4"].join("\n")
  );
});

test("marker at end of file", () => {
  const project = new TestProject();

  const file = new TextFile(project, "hello/foo.txt", {
    marker: true,
    projenMarkerPrefix: "#",
    projenMarkerAtStart: false,
    lines: ["line1", "line2", "line3", "line4"],
  });

  const output = synthSnapshot(project)["hello/foo.txt"];
  expect(output).toEqual(
    ["line1", "line2", "line3", "line4", `# ${file.marker}`].join("\n")
  );
});

test("invalid marker options throws exception", () => {
  const project = new TestProject();

  expect(() => {
    new TextFile(project, "hello/foo.txt", {
      marker: true,
    });
  }).toThrowError(
    "options.projenMarkerPrefix must be set if options.marker is true"
  );
});
