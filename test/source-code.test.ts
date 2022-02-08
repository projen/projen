import { SourceCode } from "../src";
import { synthSnapshot, TestProject } from "./util";

test("lines", () => {
  const project = new TestProject();
  const hello = new SourceCode(project, "test.txt");
  hello.line("this is my first source file");
  hello.line(); // empty line
  hello.line("last line");

  expect(synthSnapshot(project)["test.txt"]).toStrictEqual(
    ["this is my first source file", "", "last line"].join("\n")
  );
});

test("open/close", () => {
  const project = new TestProject();
  const hello = new SourceCode(project, "test.txt");
  hello.line("level0");
  hello.open();
  hello.line("level1");
  hello.open();
  hello.line("level2");
  hello.close();
  hello.line("level1");
  hello.close();
  hello.line("level0");
  expect(synthSnapshot(project)["test.txt"]).toStrictEqual(
    ["level0", "  level1", "    level2", "  level1", "level0"].join("\n")
  );
});

test("indent", () => {
  const project = new TestProject();
  const hello = new SourceCode(project, "test.txt", { indent: 4 });
  hello.line("level0");
  hello.open();
  hello.line("level1");
  hello.close();
  hello.line("level0");
  expect(synthSnapshot(project)["test.txt"]).toStrictEqual(
    ["level0", "    level1", "level0"].join("\n")
  );
});

test("trailing whitespace is trimmed", () => {
  const project = new TestProject();
  const hello = new SourceCode(project, "test.txt", { indent: 4 });
  hello.open();
  hello.line();
  hello.open();
  hello.line("hello, world.   ");
  hello.close();
  hello.close();

  expect(synthSnapshot(project)["test.txt"]).toStrictEqual(
    ["", "        hello, world."].join("\n")
  );
});

test("include projen marker at start of file", () => {
  const project = new TestProject();
  const sourceFile = new SourceCode(project, "test.txt", {
    indent: 2,
    marker: true,
    projenMarkerPrefix: "//",
  });
  sourceFile.open();
  sourceFile.line("line 1");
  sourceFile.line("line 2");
  sourceFile.close();

  expect(synthSnapshot(project)["test.txt"]).toStrictEqual(
    [`// ${sourceFile.marker}`, "  line 1", "  line 2"].join("\n")
  );
});

test("include projen marker at end of file", () => {
  const project = new TestProject();
  const sourceFile = new SourceCode(project, "test.txt", {
    indent: 2,
    marker: true,
    projenMarkerPrefix: "//",
    projenMarkerAtStart: false,
  });
  sourceFile.open();
  sourceFile.line("line 1");
  sourceFile.line("line 2");
  sourceFile.close();

  expect(synthSnapshot(project)["test.txt"]).toStrictEqual(
    ["  line 1", "  line 2", `// ${sourceFile.marker}`].join("\n")
  );
});
