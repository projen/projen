import { mkdirSync, mkdtempSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { TaskRuntime } from "../../src/cli/task-runtime";
import { Release } from "../../src/release";
import { git, node } from "../../src/util/exec";
import { synthSnapshot, TestProject } from "../util";

/** Synthesizes a project with a `publish:npm` task for `branch`. */
function publishTask(branch: string) {
  const project = new TestProject();
  const release = new Release(project, {
    tasks: [project.buildTask],
    versionFile: "version.json",
    branch,
    artifactsDirectory: "dist",
    publishTasks: true,
  });
  release.publisher.publishToNpm();

  return synthSnapshot(project)[".projen/tasks.json"].tasks["publish:npm"];
}

test("the branch guard compares dynamic env instead of an interpolated command", () => {
  const task = publishTask("main");

  expect(task.env).toMatchObject({
    PUBLISH_BRANCH: "main",
    CURRENT_BRANCH: "$(git rev-parse --abbrev-ref HEAD)",
  });
  // the guard is an argv, and the branch name is nowhere inside the command
  expect(task.steps[0].execArgs[0]).toBe("node");
  expect(JSON.stringify(task.steps[0].execArgs)).not.toContain("main");
});

describe("the branch guard script", () => {
  const script: string = publishTask("main").steps[0].execArgs[2];

  const run = (current: string, expected: string) => {
    try {
      node.capture(["-e", script], {
        cwd: process.cwd(),
        env: { CURRENT_BRANCH: current, PUBLISH_BRANCH: expected },
      });
      return { code: 0, stderr: "" };
    } catch (e: any) {
      return { code: e.status as number, stderr: e.stderr.toString("utf-8") };
    }
  };

  test("passes on the release branch", () => {
    expect(run("main", "main")).toEqual({ code: 0, stderr: "" });
  });

  test("fails with a diagnosable message on another branch", () => {
    const result = run("feature-x", "main");
    expect(result.code).toBe(1);
    expect(result.stderr).toContain(
      'cannot publish from branch "feature-x": this task publishes "main"',
    );
  });

  test("fails on a detached HEAD", () => {
    // `git rev-parse --abbrev-ref HEAD` yields "HEAD" when detached
    expect(run("HEAD", "main").code).toBe(1);
  });

  test("compares branch names with spaces or quotes verbatim", () => {
    expect(run("a b", "a b").code).toBe(0);
    expect(run("it's", "it's").code).toBe(0);
    expect(run('a"b', 'a"b').code).toBe(0);
    expect(run("a b", "a c").code).toBe(1);
  });
});

describe("the branch guard through the task runtime", () => {
  /**
   * Runs only the guard step of the synthesized task (not the publish itself) in
   * a real git repo, so the `$(...)` env is resolved by the runtime rather than
   * assumed.
   */
  const runGuardIn = (checkedOutBranch: string, releaseBranch: string) => {
    const task = publishTask(releaseBranch);

    const cwd = mkdtempSync(join(tmpdir(), "branch-guard-"));
    git.run(["init", "-q", "-b", checkedOutBranch], { cwd });
    git.run(["config", "user.email", "t@t.com"], { cwd });
    git.run(["config", "user.name", "t"], { cwd });
    writeFileSync(join(cwd, "f.txt"), "x");
    git.run(["add", "."], { cwd });
    git.run(["commit", "-q", "-m", "c"], { cwd });

    mkdirSync(join(cwd, ".projen"), { recursive: true });
    writeFileSync(
      join(cwd, ".projen", "tasks.json"),
      JSON.stringify({
        tasks: {
          guard: { name: "guard", env: task.env, steps: [task.steps[0]] },
        },
      }),
    );

    return new TaskRuntime(cwd).runTask("guard");
  };

  test("resolves the checked out branch and passes on a match", async () => {
    await expect(runGuardIn("main", "main")).resolves.toBeUndefined();
  });

  test("fails when checked out on another branch", async () => {
    await expect(runGuardIn("feature-x", "main")).rejects.toThrow(
      /Task "guard" failed/,
    );
  });
});
