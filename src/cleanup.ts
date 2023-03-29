import * as fs from "fs";
import * as path from "path";
import * as glob from "glob";
import { PROJEN_DIR, PROJEN_MARKER } from "./common";
import * as logging from "./logging";

export const FILE_MANIFEST = `${PROJEN_DIR}/files.json`;

export function cleanup(dir: string, newFiles: string[], exclude: string[]) {
  try {
    const manifestFiles = getFilesFromManifest(dir);
    if (manifestFiles.length > 0) {
      // Use `FILE_MANIFEST` to remove files that are no longer managed by projen
      removeFiles(findOrphanedFiles(dir, manifestFiles, newFiles));
    } else {
      // Remove all files managed by projen with legacy logic
      removeFiles(findGeneratedFiles(dir, exclude));
    }
  } catch (e: any) {
    logging.warn(`warning: failed to clean up generated files: ${e.stack}`);
  }
}

function removeFiles(files: string[]) {
  for (const file of files) {
    fs.rmSync(file, { force: true, recursive: true });
  }
}

function findGeneratedFiles(dir: string, exclude: string[]) {
  const ignore = [
    ...readGitIgnore(dir),
    "node_modules/**",
    ...exclude,
    ".git/**",
  ];

  const files = glob.sync("**", {
    ignore,
    cwd: dir,
    dot: true,
    nodir: true,
    absolute: true,
  });

  const generated = new Array<string>();

  for (const file of files) {
    const contents = fs.readFileSync(file, "utf-8");

    if (contents.includes(PROJEN_MARKER)) {
      generated.push(file);
    }
  }

  return generated;
}

function findOrphanedFiles(
  dir: string,
  oldFiles: string[],
  newFiles: string[]
) {
  return oldFiles
    .filter((old) => !newFiles.includes(old))
    .map((f: string) => path.resolve(dir, f));
}

function getFilesFromManifest(dir: string): string[] {
  try {
    const fileManifestPath = path.resolve(dir, FILE_MANIFEST);
    if (fs.existsSync(fileManifestPath)) {
      const fileManifest = JSON.parse(
        fs.readFileSync(fileManifestPath, "utf-8")
      );
      if (fileManifest.files) {
        return fileManifest.files;
      }
    }
  } catch (e: any) {
    logging.warn(
      `warning: unable to get files to clean from file manifest: ${e.stack}`
    );
  }

  return [];
}

function readGitIgnore(dir: string) {
  const filepath = path.join(dir, ".gitignore");
  if (!fs.existsSync(filepath)) {
    return [];
  }

  return fs
    .readFileSync(filepath, "utf-8")
    .split("\n")
    .filter((x) => x?.trim() !== "")
    .filter((x) => !x.startsWith("#") && !x.startsWith("!"))
    .map((x) => x.replace(/^\//, "")) // remove "/" prefix
    .map((x) => `${x}\n${x}/**`)
    .join("\n")
    .split("\n");
}
