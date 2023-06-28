import * as child from "child_process";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";

const artifactsDirectory = process.env.ARTIFACTS_DIRECTORY!;
const PACKAGE_ALL_TASK_NAME = process.env.PACKAGE_ALL_TASK_NAME!;
const repoTempDir = fs.mkdtempSync(path.join(os.tmpdir(), "repo"));

// when running inside CI we just prepare the repo for packaging, which
// takes place in separate tasks.
// outside of CI (i.e locally) we simply package all targets.
if (process.env.CI) {
  // in jsii we consider the entire repo (post build) as the build artifact
  // which is then used to create the language bindings in separate jobs.
  copyFiles(".", repoTempDir, [".git", "node_modules"]);
  if (fs.existsSync(artifactsDirectory)) {
    fs.rmdirSync(artifactsDirectory, { recursive: true });
  }
  fs.renameSync(repoTempDir, artifactsDirectory);
} else {
  child.execSync(`npx projen ${PACKAGE_ALL_TASK_NAME}`, {
    stdio: ["inherit", "inherit", "inherit"],
  });
}

function copyFiles(source: string, destination: string, exclude: string[]) {
  const files = fs.readdirSync(source);

  for (const file of files) {
    if (!exclude.includes(file)) {
      const srcPath = path.join(source, file);
      const destPath = path.join(destination, file);

      const stats = fs.statSync(srcPath);
      if (stats.isDirectory()) {
        fs.mkdirSync(destPath);
        copyFiles(srcPath, destPath, exclude);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}
