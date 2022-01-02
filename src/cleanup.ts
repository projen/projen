import * as path from "path";
import * as fs from "fs-extra";
import { existsSync, readFileSync } from "fs-extra";
import * as glob from "glob";
import { PROJEN_DIR, PROJEN_MARKER } from "./common";
import * as logging from "./logging";

export const FILE_MANIFEST = `${PROJEN_DIR}/files.json`;

export function cleanup(dir: string, exclude: string[]) {
  try {
    for (const f of findGeneratedFiles(dir, exclude)) {
      fs.removeSync(f);
    }
  } catch (e) {
    logging.warn(`warning: failed to clean up generated files: ${e.stack}`);
  }
}

function findGeneratedFiles(dir: string, exclude: string[]) {
  let files = getFilesFromManifest(dir);
  if (files.length > 0) {
    return files;
  }

  const ignore = [
    ...readGitIgnore(dir),
    "node_modules/**",
    ...exclude,
    ".git/**",
  ];

  files = glob.sync("**", {
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

function getFilesFromManifest(dir: string): string[] {
  try {
    const fileManifestPath = path.resolve(dir, FILE_MANIFEST);
    if (existsSync(fileManifestPath)) {
      const fileManifest = JSON.parse(readFileSync(fileManifestPath, "utf-8"));
      if (fileManifest.files) {
        return fileManifest.files.map((f: string) => path.resolve(dir, f));
      }
    }
  } catch (e) {
    logging.warn(
      `warning: unable to get files to clean from file manifest: ${e.stack}`
    );
  }

  return [];
}

function readGitIgnore(dir: string) {
  const filepath = path.join(dir, ".gitignore");
  if (!fs.pathExistsSync(filepath)) {
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
