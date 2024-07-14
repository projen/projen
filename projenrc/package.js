
const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

function copyFiles(source, destination, exclude = []) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  fs.readdirSync(source).forEach((p) => {
    if (!exclude.includes(p)) {
      const src = path.join(source, p);
      const dest = path.join(destination, p);

      if (fs.lstatSync(src).isDirectory() && !fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }

      fs.cpSync(src, dest, {
        recursive: true,
        overwrite: true,
      });
    }
  });
}

function main() {
  // when running inside CI we just prepare the repo for packaging, which
  // takes place in separate tasks.
  // outside of CI (i.e locally) we simply package all targets.
  if (process.env.CI) {
    const tempDir = ".repo";
    const destDir = "dist";
    const exclude = [tempDir, destDir, ".git", "node_modules"];
    
    // in jsii we consider the entire repo (post build) as the build artifact
    // which is then used to create the language bindings in separate jobs.
    console.log(`Copying files to ${tempDir}`);
    copyFiles(".", tempDir, exclude);
    
    console.log(`Deleting ${destDir}`);
    fs.rmSync(destDir, { recursive: true, force: true });
    
    console.log(`Renaming ${tempDir} to ${destDir}`);
    fs.renameSync(tempDir, destDir);
  } else {
    execSync("node ./projen.js package-all", { stdio: "inherit" });
  }
}

main();
