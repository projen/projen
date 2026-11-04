import { mkdtempSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { TestProject } from "./util";
import { TaskRuntime } from "../src/cli/task-runtime";
import { git } from "../src/util/exec";

describe("clobber", () => {
  // Builds a project in a git repo with an `origin` remote, an existing
  // `scratch` branch and one unpushed commit on `main`.
  function setup() {
    const p = new TestProject({ clobber: true });
    p.synth();

    const cwd = p.outdir;
    const origin = mkdtempSync(join(tmpdir(), "projen-clobber-origin-"));
    git.run(["init", "-q", "--bare", origin], { cwd });
    git.run(["init", "-q", "-b", "main"], { cwd });
    git.run(["config", "user.email", "t@example.com"], { cwd });
    git.run(["config", "user.name", "t"], { cwd });
    git.run(["add", "-A"], { cwd });
    git.run(["commit", "-q", "-m", "initial"], { cwd });
    git.run(["remote", "add", "origin", origin], { cwd });
    git.run(["push", "-q", "origin", "main"], { cwd });
    git.run(["branch", "scratch"], { cwd });
    git.run(["commit", "-q", "--allow-empty", "-m", "unpushed"], { cwd });
    return p;
  }

  function revParse(cwd: string, ref: string) {
    return git.capture(["rev-parse", ref], { cwd }).trim();
  }

  test("saves unpushed commits even when a scratch branch already exists", async () => {
    const p = setup();
    const cwd = p.outdir;
    const unpushed = revParse(cwd, "HEAD");

    await new TaskRuntime(cwd).runTask("clobber");

    const headCommit = git
      .capture(["rev-parse", "--short", unpushed], { cwd })
      .trim();
    expect(revParse(cwd, "HEAD")).toEqual(revParse(cwd, "origin/main"));
    expect(revParse(cwd, `scratch-${headCommit}`)).toEqual(unpushed);
  });

  test("can run again on the same commit", async () => {
    const p = setup();
    const cwd = p.outdir;
    git.run(["reset", "-q", "--hard", "origin/main"], { cwd });

    await new TaskRuntime(cwd).runTask("clobber");
    await new TaskRuntime(cwd).runTask("clobber");

    expect(revParse(cwd, "HEAD")).toEqual(revParse(cwd, "origin/main"));
  });
});
