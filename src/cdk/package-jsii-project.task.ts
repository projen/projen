import * as child from "child_process";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";

const artifactsDirectory = process.env.ARTIFACTS_DIRECTORY!;
const packageAllTaskName = process.env.PACKAGE_ALL_TASK_NAME!;
const projenCommand = process.env.PROJEN_COMMAND!;

/**
 * Copies files from source to destination, excluding files in the exclude list.
 * @param source The source directory.
 * @param destination The destination directory.
 * @param exclude A list of first-level files or directories to exclude. It doesn't exclude nested files or directories.
 */
function copyFiles(
  source: string,
  destination: string,
  exclude: string[] = []
) {
  fs.cpSync(source, destination, {
    recursive: true,
    force: true,
    filter: (src) => {
      const pathBasename = path.basename(src);
      const shouldBeCopied = !exclude.includes(pathBasename);

      return shouldBeCopied;
    },
  });
}

/**
 * Main entry point.
 */
function main() {
  // when running inside CI we just prepare the repo for packaging, which
  // takes place in separate tasks.
  // outside of CI (i.e locally) we simply package all targets.
  if (process.env.CI) {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "projen"));
    const destDir = artifactsDirectory;
    const exclude = [destDir, ".git", "node_modules"];

    // in jsii we consider the entire repo (post build) as the build artifact
    // which is then used to create the language bindings in separate jobs.
    console.info(`Copying files from the repository root to ${tempDir}`);
    copyFiles(".", tempDir, exclude);

    console.info(`Deleting ${destDir}`);
    fs.rmSync(destDir, { recursive: true, force: true });

    console.info(`Copying files from ${tempDir} to ${destDir}`);
    copyFiles(tempDir, destDir, exclude);

    console.info(`Deleting ${tempDir}`);
    fs.rmSync(tempDir, { recursive: true, force: true });
  } else {
    child.execSync(`${projenCommand} ${packageAllTaskName}`, {
      stdio: "inherit",
    });
  }
}

main();
