import { existsSync, rmSync } from "fs";
import { join } from "path";
import { TestProject } from "./util";
import { TaskRuntime } from "../src/cli/task-runtime";
import { TaskShell } from "../src/task-shell";
import { git } from "../src/util/exec";
import { CHANGES_SINCE_LAST_RELEASE } from "../src/version";

// The condition shells out to `git` and `grep`, which are POSIX tools; skip the
// execution assertions on Windows. The value pin below always runs.
const posixOnly = process.platform === "win32" ? describe.skip : describe;

describe("CHANGES_SINCE_LAST_RELEASE value", () => {
  test("is the race-free drop-`-q` form and must never reintroduce `grep -q`", () => {
    // Pins the exact value so a future change is deliberate. Reintroducing
    // `grep -q` brings back the dax pipe-close race (see the comment on the
    // constant in src/version.ts); assert it stays out.
    expect(CHANGES_SINCE_LAST_RELEASE).toEqual(
      'git log --oneline -1 | grep -v "chore(release):" > /dev/null',
    );
    expect(CHANGES_SINCE_LAST_RELEASE).not.toContain("grep -q");
  });
});

posixOnly("CHANGES_SINCE_LAST_RELEASE execution", () => {
  // Build a project whose outdir is a git repo whose HEAD subject is `subject`,
  // with one task per shell gated by the release condition. Each task's step
  // drops a marker file, so a created marker means the condition proceeded and a
  // missing marker means it was skipped.
  function setup(subject: string) {
    const p = new TestProject();
    for (const shell of ["projen", "system"] as const) {
      p.addTask(`cond-${shell}`, {
        condition: CHANGES_SINCE_LAST_RELEASE,
        shell: shell === "system" ? TaskShell.system() : undefined,
        exec: `node -e "require('fs').writeFileSync('ran-${shell}.txt','1')"`,
      });
    }
    p.synth();

    const cwd = p.outdir;
    git.run(["init", "-q"], { cwd });
    git.run(["config", "user.email", "t@example.com"], { cwd });
    git.run(["config", "user.name", "t"], { cwd });
    git.run(["commit", "-q", "--allow-empty", "-m", subject], { cwd });
    return p;
  }

  async function proceeded(p: TestProject, shell: "projen" | "system") {
    const marker = join(p.outdir, `ran-${shell}.txt`);
    if (existsSync(marker)) rmSync(marker);
    await new TaskRuntime(p.outdir).runTask(`cond-${shell}`);
    return existsSync(marker);
  }

  test("a normal HEAD proceeds (exit 0) under the built-in and system shells", async () => {
    const p = setup("feat: a normal change");
    expect(await proceeded(p, "projen")).toBe(true);
    expect(await proceeded(p, "system")).toBe(true);
  });

  test("a chore(release) HEAD skips (non-zero) under the built-in and system shells", async () => {
    const p = setup("chore(release): 1.2.3");
    expect(await proceeded(p, "projen")).toBe(false);
    expect(await proceeded(p, "system")).toBe(false);
  });
});
