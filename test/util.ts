import * as cp from "child_process";
import * as os from "os";
import * as path from "path";
import * as fs from "fs-extra";
import { Project } from "../src";
import * as logging from "../src/logging";
import { exec } from "../src/util";
import { directorySnapshot } from "../src/util/synth";

const PROJEN_CLI = require.resolve("../lib/cli/index.js");

logging.disable(); // no logging during tests

export function execProjenCLI(workdir: string, args: string[] = []) {
  const command = [process.execPath, PROJEN_CLI, ...args];

  return exec(command.map((x) => `"${x}"`).join(" "), { cwd: workdir });
}

const autoRemove = new Set<string>();

// Hook to automatically remove temporary directories without needing each
// place to actually handle this specifically.
afterAll((done) => {
  // Array.from used to get a copy, so we can safely remove from the set
  for (const dir of Array.from(autoRemove)) {
    try {
      // Note - fs-extra.removeSync is idempotent, so we're safe if the
      // directory has already been cleaned up before we get there!
      fs.removeSync(dir);
    } catch (e) {
      done.fail(e);
    }
    autoRemove.delete(dir);
  }
  done();
});

export function mkdtemp(opts: { cleanup?: boolean } = {}) {
  const tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), "projen-test-"));
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
    fs.removeSync(project.outdir);
  }
}

export function withProjectDir(
  code: (workdir: string) => void,
  options: { git?: boolean; chdir?: boolean } = {}
) {
  const origDir = process.cwd();
  const outdir = mkdtemp();
  try {
    // create project under "my-project" so that basedir is deterministic
    const projectdir = path.join(outdir, "my-project");
    fs.mkdirSync(projectdir);

    const shell = (command: string) =>
      cp.execSync(command, { cwd: projectdir });
    if (options.git ?? true) {
      shell("git init -b main");
      shell("git remote add origin git@boom.com:foo/bar.git");
      shell('git config user.name "My User Name"');
      shell('git config user.email "my@user.email.com"');
    } else if (process.env.CI) {
      // if "git" is set to "false", we still want to make sure global user is defined
      // (relevant in CI context)
      shell(
        'git config user.name || git config --global user.name "My User Name"'
      );
      shell(
        'git config user.email || git config --global user.email "my@user.email.com"'
      );
    }

    if (options.chdir ?? false) {
      process.chdir(projectdir);
    }

    code(projectdir);
  } finally {
    process.chdir(origDir);
    fs.removeSync(outdir);
  }
}

/**
 * Removes any non-deterministic aspects from the synthesized output.
 * @param dir The output directory.
 */
export function sanitizeOutput(dir: string) {
  const filepath = path.join(dir, "package.json");
  const pkg = fs.readJsonSync(filepath);
  const prev = pkg.devDependencies.projen;
  if (!prev) {
    throw new Error(
      `expecting "${filepath}" to include a devDependency on "projen"`
    );
  }

  // replace the current projen version with 999.999.999 for deterministic output.
  // this will preserve any semantic version requirements (e.g. "^", "~", etc).
  pkg.devDependencies.projen = prev.replace(/\d+\.\d+\.\d+/, "999.999.999");
  fs.writeJsonSync(filepath, pkg);

  // we will also patch deps.json so that all projen deps will be set to 999.999.999
  const depsPath = path.join(dir, ".projen", "deps.json");
  const deps = fs.readJsonSync(depsPath);
  for (const dep of deps.dependencies) {
    if (dep.name === "projen" && dep.version) {
      dep.version = dep.version.replace(/\d+\.\d+\.\d+/, "999.999.999");
    }
  }
  fs.chmodSync(depsPath, "777");
  fs.writeJsonSync(depsPath, deps);
}

export {
  synthSnapshot,
  directorySnapshot,
  SynthOutput,
  DirectorySnapshotOptions,
} from "../src/util/synth";
