import { mkdirSync, readFileSync } from "fs";
import { join } from "path";
import { directorySnapshot, execProjenCLI, mkdtemp } from "./util";
import { Project } from "../src/project";

test('running "projen" for projects with a "default" task will execute it', async () => {
  const project = new Project({ name: "my-project" });
  project.defaultTask?.exec(
    `node -e "const fs = require('fs'); fs.writeFileSync('bar.txt', 'foo\\n');"`,
  );
  project.synth();

  await execProjenCLI(project.outdir);
  expect(directorySnapshot(project.outdir)["bar.txt"]).toStrictEqual("foo\n");
});

test('running "projen" with task in root of a project will execute task of the project', async () => {
  const project = new Project({ name: "my-project" });
  project.testTask?.exec(
    `node -e "const fs = require('fs'); fs.writeFileSync('bar.txt', 'foo\\n');"`,
  );
  project.synth();

  await execProjenCLI(project.outdir, ["test"]);
  expect(directorySnapshot(project.outdir)["bar.txt"]).toStrictEqual("foo\n");
});

test('running "projen task --inspect" displays fixed step args unambiguously', async () => {
  const project = new Project({ name: "my-project" });
  const task = project.addTask("inspect-args");
  const command =
    `node -e "require('fs').writeFileSync('args.json', ` +
    `JSON.stringify(process.argv.slice(1)))" -- "$@"`;
  const args = ["hello world", "semi;colon", "--flag"];
  task.exec(command, { args });
  project.synth();

  await execProjenCLI(project.outdir, ["inspect-args"]);
  expect(readFileSync(join(project.outdir, "args.json"), "utf-8")).toBe(
    JSON.stringify(args),
  );

  const output = (await execProjenCLI(
    project.outdir,
    ["inspect-args", "--inspect"],
    { capture: true },
  )) as string;

  expect(output.trim().split(/\r\n|\n|\r/)).toStrictEqual([
    `- exec: ${command}`,
    `  args: ${JSON.stringify(args)}`,
  ]);
});

test('running "projen task --inspect" keeps args with their nested step', async () => {
  const project = new Project({ name: "my-project" });
  const child = project.addTask("child", { exec: "echo child" });
  const task = project.addTask("inspect-nested-args");
  task.execArgs(["echo", "parent"], { args: ["two words", "$HOME"] });
  task.execArgs(["echo", "no-args"], { args: [] });
  task.spawn(child, { args: ["child value", "semi;colon"] });
  project.synth();

  const output = (await execProjenCLI(
    project.outdir,
    ["inspect-nested-args", "--inspect"],
    { capture: true },
  )) as string;

  expect(output.trim().split(/\r\n|\n|\r/)).toStrictEqual([
    "- execArgs: echo parent",
    '  args: ["two words","$HOME"]',
    "- execArgs: echo no-args",
    "- child",
    '  args: ["child value","semi;colon"]',
    "  - exec: echo child",
  ]);
});

test('running "projen" with task in root of a project that receives args will pass through --help flag', async () => {
  const project = new Project({ name: "my-project" });
  project.testTask?.exec(
    `node -e "const fs = require('fs'); fs.writeFileSync('bar.txt', '$@\\n');"`,
    { receiveArgs: true },
  );
  project.synth();

  await execProjenCLI(project.outdir, ["test", "something", "--help"]);
  expect(directorySnapshot(project.outdir)["bar.txt"]).toStrictEqual(
    "something --help\n",
  );
});

test('running "projen" with task in subdirectory of a project will execute task of the project', async () => {
  const project = new Project({ name: "my-project" });
  project.testTask?.exec(
    `node -e "const fs = require('fs'); fs.writeFileSync('bar.txt', 'foo\\n');"`,
  );
  project.synth();
  const subdirectory = mkdtemp({ dir: project.outdir });

  await execProjenCLI(subdirectory, ["test"]);
  expect(directorySnapshot(project.outdir)["bar.txt"]).toStrictEqual("foo\n");
});

test('running "projen" without specifying a task it in subdirectory of a project will execute default task of the project', async () => {
  const project = new Project({ name: "my-project" });
  project.synth();
  const subdirectory = mkdtemp({ dir: project.outdir });

  await execProjenCLI(subdirectory, []); // no task specified
});

test('running "projen" with task in root of a subproject will execute task of the subproject', async () => {
  const project = new Project({ name: "my-project" });
  const subProject = new Project({
    name: "my-subproject",
    parent: project,
    outdir: "subproject",
  });
  subProject.testTask?.exec(
    `node -e "const fs = require('fs'); fs.writeFileSync('bar.txt', 'foo\\n');"`,
  );
  project.synth();

  await execProjenCLI(subProject.outdir, ["test"]);
  expect(directorySnapshot(subProject.outdir)["bar.txt"]).toStrictEqual(
    "foo\n",
  );
});

test('running "projen" with task in subdirectory of a subproject will execute task of the subproject', async () => {
  const project = new Project({ name: "my-project" });
  const subProject = new Project({
    name: "my-subproject",
    parent: project,
    outdir: "subproject",
  });
  subProject.testTask?.exec(
    `node -e "const fs = require('fs'); fs.writeFileSync('bar.txt', 'foo\\n');"`,
  );
  project.synth();
  const subdirectory = mkdtemp({ dir: subProject.outdir });

  await execProjenCLI(subdirectory, ["test"]);
  expect(directorySnapshot(subProject.outdir)["bar.txt"]).toStrictEqual(
    "foo\n",
  );
});

test('running "projen" with task if there is no tasks.json', async () => {
  const dir = mkdtemp();

  const projen = join(dir, ".projen");
  mkdirSync(projen);

  await expect(execProjenCLI(dir, ["build"])).rejects.toThrow(
    "Unknown command: build",
  );
});

test('running "projen" with task in root of a project that receives args will respect whitespaces', async () => {
  const project = new Project({ name: "my-project" });
  project.testTask?.exec(`touch "$@"`, { receiveArgs: true });
  project.synth();

  await execProjenCLI(project.outdir, ["test", "a b", "c d"]);
  expect(directorySnapshot(project.outdir)["a b"]).toStrictEqual("");
  expect(directorySnapshot(project.outdir)["c d"]).toStrictEqual("");
});
