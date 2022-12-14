import { join, dirname, basename } from "path";
import { copySync } from "fs-extra";
import { glob } from "glob";
import {
  mkdtemp,
  directorySnapshot,
  execProjenCLI,
  sanitizeOutput,
} from "./util";

const samples = join(__dirname, "integration");
const files = glob.sync("**/*.projenrc.js", { cwd: samples });

for (const projenrc of files) {
  test(basename(projenrc, ".projenrc.js"), () => {
    const workdir = mkdtemp();
    const base = join(samples, dirname(projenrc));
    if (base !== samples) {
      copySync(base, workdir, { recursive: true });
    }
    copySync(join(samples, projenrc), join(workdir, ".projenrc.js"));
    execProjenCLI(workdir, ["--no-post"]);

    // patch the projen version in package.json to match the current version
    // otherwise, every bump would need to update these snapshots.
    sanitizeOutput(workdir);

    expect(
      directorySnapshot(workdir, {
        excludeGlobs: ["node_modules/**"],
        parseJson: false,
      })
    ).toMatchSnapshot();
  });
}
