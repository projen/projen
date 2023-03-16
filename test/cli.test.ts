import { join } from "path";
import { writeFileSync } from "fs-extra";
import * as fs from "fs-extra";
import { directorySnapshot, execProjenCLI, mkdtemp } from "./util";
import { Project } from "../src/project";

const MOCK_PROJENRC =
  "new (require('projen').Project)({ name: 'foo' }).synth()";

const MOCK_TASKS =
  '{"tasks":{"build":{"name":"build","description":"mock build","steps":[{"exec":"echo test"}]}}}';

test('the "--rc" option can be used to specify projenrc location', () => {
  const dir1 = mkdtemp();
  const dir2 = mkdtemp();

  const rcfile = join(dir1, "custom-projenrc.js");
  writeFileSync(rcfile, MOCK_PROJENRC);

  execProjenCLI(dir2, ["--rc", rcfile]);
  expect(directorySnapshot(dir2)).toMatchSnapshot();
});

test('running "projen" with no arguments will execute .projenrc.js', () => {
  const workdir = mkdtemp();
  const rcfile = join(workdir, ".projenrc.js");
  writeFileSync(rcfile, MOCK_PROJENRC);

  execProjenCLI(workdir);
  expect(directorySnapshot(workdir)).toMatchSnapshot();
});

test('running "projen" for projects with a "default" task will execute it', () => {
  const project = new Project({ name: "my-project" });
  project.defaultTask?.exec('echo "foo" > bar.txt');
  project.synth();

  execProjenCLI(project.outdir);
  expect(directorySnapshot(project.outdir)["bar.txt"]).toStrictEqual("foo\n");
});

test('running "projen" with task in a subdirectory will execute task', () => {
  const dir1 = mkdtemp();
  const dir2 = mkdtemp({ dir: dir1 });

  const rcfile = join(dir1, ".projenrc.js");
  writeFileSync(rcfile, MOCK_PROJENRC);

  const projen = join(dir1, ".projen");
  fs.mkdirSync(projen);

  const tasks = join(projen, "tasks.json");
  writeFileSync(tasks, MOCK_TASKS);

  execProjenCLI(dir2, ["build"]);
  expect(directorySnapshot(dir1)).toMatchSnapshot();
});

test('running "projen" with task in project root will execute task', () => {
  const dir1 = mkdtemp();

  const rcfile = join(dir1, ".projenrc.js");
  writeFileSync(rcfile, MOCK_PROJENRC);

  const projen = join(dir1, ".projen");
  fs.mkdirSync(projen);

  const tasks = join(projen, "tasks.json");
  writeFileSync(tasks, MOCK_TASKS);

  execProjenCLI(dir1, ["build"]);
  expect(directorySnapshot(dir1)).toMatchSnapshot();
});
