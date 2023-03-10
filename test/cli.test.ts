import { join } from "path";
import { writeFileSync } from "fs-extra";
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

test('running "projen" in a subdirectory for projects with a "default" task will execute it from parent .projenrc', () => {
  const project = new Project({ name: "my-project" });
  const subProject = new Project({
    name: "my-sub-project",
    parent: project,
    outdir: "sub-project",
  });
  subProject.defaultTask?.exec('echo "foo" > bar.txt');
  project.synth();

  execProjenCLI(subProject.outdir);
  expect(directorySnapshot(subProject.outdir)["bar.txt"]).toStrictEqual(
    "foo\n"
  );
});