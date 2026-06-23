import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import type { Project } from "../src";
import { installPackage } from "../src/cli/util";
import type { GitHubProjectOptions } from "../src/github/github-project";
import { GitHubProject } from "../src/github/github-project";
import * as logging from "../src/logging";
import type { Task } from "../src/task";
import { git, node } from "../src/util/exec";
import { directorySnapshot } from "../src/util/synth";

const PROJEN_CLI = require.resolve("../lib/cli/index.js");

logging.disable(); // no logging during tests

export class TestProject extends GitHubProject {
  constructor(options: Omit<GitHubProjectOptions, "name"> = {}) {
    super({
      name: "my-project",
      clobber: false,
      ...options,
    });
  }

  // override runTaskCommand in tests since the default includes the version
  // number and that will break regresion tests.
  public runTaskCommand(task: Task) {
    return `projen ${task.name}`;
  }

  postSynthesize() {
    fs.writeFileSync(path.join(this.outdir, ".postsynth"), "# postsynth");
  }
}

interface ProjenCLIExecOptions {
  preInstallProjen?: boolean;
}

export async function execProjenCLI(
  workdir: string,
  args: string[] = [],
  env?: Record<string, string>,
  { preInstallProjen = true }: ProjenCLIExecOptions = {},
) {
  // For "projen new" commands we need to pre-install the current library,
  // to ensure the latest code is used in test cases
  // https://github.com/projen/projen/issues/3410
  if (preInstallProjen && args.includes("new")) {
    await installPackage(
      workdir,
      `file:${path.normalize(path.join(__dirname, ".."))}`,
      true,
    );
  }

  // run the CLI shell-free via node
  return node.run([PROJEN_CLI, ...args], {
    cwd: workdir,
    env,
  });
}

const autoRemove = new Set<string>();

// Hook to automatically remove temporary directories without needing each
// place to actually handle this specifically.
afterAll((done) => {
  // Array.from used to get a copy, so we can safely remove from the set
  for (const dir of Array.from(autoRemove)) {
    try {
      fs.rmSync(dir, { force: true, recursive: true });
    } catch (e: any) {
      done.fail(e);
    }
    autoRemove.delete(dir);
  }
  done();
});

export function mkdtemp(opts: { cleanup?: boolean; dir?: string } = {}) {
  const tmpdir = fs.mkdtempSync(
    path.join(opts.dir ?? os.tmpdir(), "projen-test-"),
  );
  if (opts.cleanup ?? true) {
    autoRemove.add(tmpdir);
  }
  return tmpdir;
}

export function synthSnapshotWithPost(project: Project) {
  try {
    project.synth();
    return directorySnapshot(project.outdir);
  } finally {
    fs.rmSync(project.outdir, { force: true, recursive: true });
  }
}

export async function withProjectDir(
  code: (workdir: string) => void | Promise<void>,
  options: { git?: boolean; chdir?: boolean; tmpdir?: string } = {},
) {
  const origDir = process.cwd();
  const outdir = options.tmpdir ?? mkdtemp();
  try {
    // create project under "my-project" so that basedir is deterministic
    const projectdir = path.join(outdir, "my-project");
    fs.mkdirSync(projectdir);

    const runGit = (args: string[]) => git.run(args, { cwd: projectdir });
    if (options.git ?? true) {
      runGit(["init", "-b", "main"]);
      runGit(["remote", "add", "origin", "git@boom.com:foo/bar.git"]);
      runGit(["config", "user.name", "My User Name"]);
      runGit(["config", "user.email", "my@user.email.com"]);
      runGit(["config", "commit.gpgsign", "false"]);
      runGit(["config", "tag.gpgsign", "false"]);
    } else if (process.env.GITHUB_ACTIONS) {
      // if "git" is set to "false", we still want to make sure a global user is
      // defined (relevant in our GITHUB_ACTIONS context): only set the global
      // value if none is configured yet (`git config <key>` exits non-zero when
      // unset).
      try {
        runGit(["config", "user.name"]);
      } catch {
        runGit(["config", "--global", "user.name", "My User Name"]);
      }
      try {
        runGit(["config", "user.email"]);
      } catch {
        runGit(["config", "--global", "user.email", "my@user.email.com"]);
      }
    }

    if (options.chdir ?? false) {
      process.chdir(projectdir);
    }

    await code(projectdir);
  } finally {
    process.chdir(origDir);
    fs.rmSync(outdir, { force: true, recursive: true });
  }
}

/**
 * Removes any non-deterministic aspects from the synthesized output.
 * @param dir The output directory.
 */
export function sanitizeOutput(dir: string) {
  const filepath = path.join(dir, "package.json");
  const pkg = JSON.parse(fs.readFileSync(filepath, "utf-8"));
  const prev = pkg.devDependencies.projen;
  if (!prev) {
    throw new Error(
      `expecting "${filepath}" to include a devDependency on "projen"`,
    );
  }

  // replace the current projen version with * for deterministic output.
  pkg.devDependencies.projen = "*";
  fs.writeFileSync(filepath, JSON.stringify(pkg));

  // we will also patch deps.json so that all projen deps will be set to *
  const depsPath = path.join(dir, ".projen", "deps.json");
  const deps = JSON.parse(fs.readFileSync(depsPath, "utf-8"));
  for (const dep of deps.dependencies) {
    if (dep.name === "projen" && dep.version) {
      dep.version = "*";
    }
  }
  fs.chmodSync(depsPath, "777");
  fs.writeFileSync(depsPath, JSON.stringify(deps));
}

export type { DirectorySnapshotOptions, SynthOutput } from "../src/util/synth";
export { directorySnapshot, synthSnapshot } from "../src/util/synth";
