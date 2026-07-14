import { mkdirSync } from "fs";
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
