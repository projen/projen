import { synthSnapshot, TestProject } from "./util";
import { SourceCode } from "../src";

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

test("executable option is passed through to the underlying file", () => {
  const project = new TestProject();
  new SourceCode(project, "script.sh", { executable: true });

  const file = project.tryFindFile("script.sh");
  expect(file).toBeDefined();
  expect(file!.executable).toBe(true);
});

test("executable defaults to false", () => {
  const project = new TestProject();
  new SourceCode(project, "script.txt");

  const file = project.tryFindFile("script.txt");
  expect(file).toBeDefined();
  expect(file!.executable).toBe(false);
});
