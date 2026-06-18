import child_process from "child_process";
import {
  copyFileSync,
  mkdirSync,
  readdirSync,
  statSync,
  symlinkSync,
} from "fs";
import * as os from "os";
import { join, dirname, basename } from "path";
import * as glob from "fast-glob";
import { mkdtemp, directorySnapshot, sanitizeOutput } from "./util";

const samples = join(__dirname, "integration");
const files = glob.sync("**/*.projenrc.js", { cwd: samples });

// the projen package root, so the bare `.projenrc.js` fixtures (which
// `require("projen")`) can resolve the current build.
const projenModule = join(__dirname, "..");

for (const projenrc of files) {
  test(basename(projenrc, ".projenrc.js"), () => {
    const workdir = mkdtemp();
    const base = join(samples, dirname(projenrc));
    if (base !== samples) {
      copyDirSync(base, workdir);
    }
    copyFileSync(join(samples, projenrc), join(workdir, ".projenrc.js"));

    // symlink the current projen build into the workdir so `require("projen")`
    // resolves to it. this is excluded from the snapshot below via the
    // node_modules glob.
    const nodeModules = join(workdir, "node_modules");
    mkdirSync(nodeModules, { recursive: true });
    symlinkSync(
      projenModule,
      join(nodeModules, "projen"),
      os.platform() === "win32" ? "junction" : undefined,
    );

    // synthesize by running the projenrc directly, with post-synth disabled.
    child_process.execFileSync(process.execPath, [".projenrc.js"], {
      stdio: ["inherit", 2, "pipe"],
      cwd: workdir,
      env: { ...process.env, PROJEN_DISABLE_POST: "1" } as Record<
        string,
        string
      >,
    });

    // patch the projen version in package.json to match the current version
    // otherwise, every bump would need to update these snapshots.
    sanitizeOutput(workdir);

    expect(
      directorySnapshot(workdir, {
        excludeGlobs: ["node_modules/**"],
        parseJson: false,
      }),
    ).toMatchSnapshot();
  });
}

function copyDirSync(from: string, to: string) {
  mkdirSync(to, { recursive: true });
  for (const file of readdirSync(from)) {
    const filePath = join(from, file);
    const stat = statSync(filePath);
    const toFilePath = join(to, file);
    if (stat.isDirectory()) {
      copyDirSync(filePath, toFilePath);
    } else {
      copyFileSync(filePath, toFilePath);
    }
  }
}
