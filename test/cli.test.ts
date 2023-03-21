import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { directorySnapshot, execProjenCLI, mkdtemp } from "./util";
import { Project } from "../src/project";

const MOCK_PROJENRC =
  "new (require('projen').Project)({ name: 'foo' }).synth()";

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

test('running "projen" with task in root of a project will execute task of the project', () => {
  const project = new Project({ name: "my-project" });
  project.testTask?.exec('echo "foo" > bar.txt');
  project.synth();

  execProjenCLI(project.outdir, ["test"]);
  expect(directorySnapshot(project.outdir)["bar.txt"]).toStrictEqual("foo\n");
});

test('running "projen" with task in subdirectory of a project will execute task of the project', () => {
  const project = new Project({ name: "my-project" });
  project.testTask?.exec('echo "foo" > bar.txt');
  project.synth();
  const subdirectory = mkdtemp({ dir: project.outdir });

  execProjenCLI(subdirectory, ["test"]);
  expect(directorySnapshot(project.outdir)["bar.txt"]).toStrictEqual("foo\n");
});

test('running "projen" with task in root of a subproject will execute task of the subproject', () => {
  const project = new Project({ name: "my-project" });
  const subProject = new Project({
    name: "my-sub-project",
    parent: project,
    outdir: "sub-project",
  });
  subProject.testTask?.exec('echo "foo" > bar.txt');
  project.synth();

  execProjenCLI(subProject.outdir, ["test"]);
  expect(directorySnapshot(subProject.outdir)["bar.txt"]).toStrictEqual(
    "foo\n"
  );
});

test('running "projen" with task in subdirectory of a subproject will execute task of the subproject', () => {
  const project = new Project({ name: "my-project" });
  const subProject = new Project({
    name: "my-sub-project",
    parent: project,
    outdir: "sub-project",
  });
  subProject.testTask?.exec('echo "foo" > bar.txt');
  project.synth();
  const subdirectory = mkdtemp({ dir: subProject.outdir });

  execProjenCLI(subdirectory, ["test"]);
  expect(directorySnapshot(subProject.outdir)["bar.txt"]).toStrictEqual(
    "foo\n"
  );
});

test('running "projen" with task if there is no tasks.json', () => {
  const dir = mkdtemp();

  const projen = join(dir, ".projen");
  mkdirSync(projen);

  const t = () => {
    execProjenCLI(dir, ["build"]);
  };
  expect(t).toThrowError("Unknown command: build");
});
