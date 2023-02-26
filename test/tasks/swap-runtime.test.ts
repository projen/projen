import path from "path";
import { mkdirpSync } from "fs-extra";
import { CustomTaskRuntime, Project } from "../../src";
import { synthSnapshot, TestProject } from "../util";

test("minimal case", () => {
  // GIVEN
  const p = new TestProject({
    services: {
      taskRuntime: {
        produce: (project) => new CustomTaskRuntime(project),
      },
    },
  });

  // WHEN
  const t = p.addTask("regular");
  t.exec("echo regular_step1");
  t.exec("echo regular_step2");
  t.exec("echo regular_step3");

  const c = p.addTask("cond", {
    condition: "echo evaluating_condition",
  });
  c.exec("echo cond_step1");
  c.exec("echo cond_step2");

  const cwd = path.join(p.outdir, "mypwd");
  mkdirpSync(cwd);
  const pwd = p.addTask("pwd", {
    cwd,
  });
  pwd.exec("echo pwd_step1=$PWD");
  pwd.exec("echo pwd_step2=$PWD");

  const s = p.addTask("say");
  s.say("hello, world");

  const b = p.addTask("builtin");
  b.builtin("builtin-example");

  // THEN
  expect(synthTasksManifest(p)).toMatchSnapshot();
});

function synthTasksManifest(p: Project) {
  return synthSnapshot(p)[CustomTaskRuntime.MANIFEST_FILE];
}
