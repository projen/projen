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
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  fs.readdirSync(source).forEach((file) => {
    if (!exclude.includes(file)) {
      const src = path.join(source, file);
      const dest = path.join(destination, file);

      if (fs.lstatSync(src).isDirectory() && !fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }

      fs.cpSync(src, dest, {
        recursive: true,
        force: true,
      });
    }
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
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "repo"));
    const destDir = artifactsDirectory;
    const exclude = [tempDir, destDir, ".git", "node_modules"];

    // in jsii we consider the entire repo (post build) as the build artifact
    // which is then used to create the language bindings in separate jobs.
    console.info(`Copying files from to ${tempDir}`);
    copyFiles(".", tempDir, exclude);

    console.info(`Deleting ${destDir}`);
    fs.rmSync(destDir, { recursive: true, force: true });

    console.info(`Copying files from ${tempDir} to ${destDir}`);
    copyFiles(tempDir, destDir, exclude);
  } else {
    child.execSync(`${projenCommand} ${packageAllTaskName}`, {
      stdio: "inherit",
    });
  }
}

main();
