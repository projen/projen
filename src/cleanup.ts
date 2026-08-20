import * as fs from "fs";
import * as path from "path";
import * as glob from "fast-glob";
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
    logging.warn(
      `Could not clean up previously generated files, so outdated files may be left behind in your project. ` +
        `Synthesis continues, but you may need to delete them yourself. Error: ${e.stack}`,
    );
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
    onlyFiles: true,
    followSymbolicLinks: false,
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
  newFiles: string[],
) {
  return oldFiles
    .filter((old) => !newFiles.includes(old))
    .map((f: string) => resolveWithinDir(dir, f))
    .filter((f): f is string => f !== undefined);
}

/**
 * Resolves a file path taken from the file manifest against the project
 * directory, making sure the result stays inside of it.
 *
 * The file manifest is checked into the repository and is therefore untrusted
 * input: without this check, a manifest containing `../` or absolute path
 * entries would make cleanup delete files outside of the project directory.
 *
 * @returns the absolute path to delete, or `undefined` if the entry does not
 * resolve to a location inside `dir`.
 */
function resolveWithinDir(dir: string, file: string): string | undefined {
  const skip = (reason: string) => {
    logging.warn(
      `Not deleting ${JSON.stringify(file)} during cleanup because ${reason}. ` +
        `projen only removes generated files inside your project directory. ` +
        `This entry in ${FILE_MANIFEST} should not be there - review it (and who changed it) in version control, ` +
        `and delete the file yourself if you really no longer need it.`,
    );
    return undefined;
  };

  if (typeof file !== "string" || file.trim() === "") {
    return skip("it is not a file path");
  }

  if (path.isAbsolute(file)) {
    return skip("it is an absolute path instead of a path in your project");
  }

  const baseDir = realpathOfClosestExisting(dir);
  const resolved = path.resolve(baseDir, file);

  if (!isPathInside(baseDir, resolved)) {
    return skip("it points outside of your project directory");
  }

  // the entry might traverse outside of the project through a symlinked
  // directory, which `path.resolve` cannot detect. The last path segment is
  // intentionally kept as-is: removing a symlink inside the project only
  // deletes the link itself, not its target.
  const realParent = realpathOfClosestExisting(path.dirname(resolved));
  if (!isPathInside(baseDir, path.join(realParent, path.basename(resolved)))) {
    return skip(
      "it points outside of your project directory through a symlink",
    );
  }

  return resolved;
}

function isPathInside(dir: string, file: string): boolean {
  const relative = path.relative(dir, file);
  return (
    relative !== "" &&
    !relative.startsWith(`..${path.sep}`) &&
    relative !== ".." &&
    !path.isAbsolute(relative)
  );
}

/**
 * Resolves symlinks in `p`, falling back to the closest existing ancestor for
 * paths that do not exist (yet).
 */
function realpathOfClosestExisting(p: string): string {
  const missing = new Array<string>();
  let current = path.resolve(p);

  while (true) {
    try {
      return path.join(fs.realpathSync(current), ...missing);
    } catch {
      const parent = path.dirname(current);
      if (parent === current) {
        return path.resolve(p);
      }
      missing.unshift(path.basename(current));
      current = parent;
    }
  }
}

function getFilesFromManifest(dir: string): string[] {
  try {
    const fileManifestPath = path.resolve(dir, FILE_MANIFEST);
    if (fs.existsSync(fileManifestPath)) {
      const fileManifest = JSON.parse(
        fs.readFileSync(fileManifestPath, "utf-8"),
      );
      if (Array.isArray(fileManifest.files)) {
        return fileManifest.files;
      }
      if (fileManifest.files) {
        logging.debug(
          `"files" in ${FILE_MANIFEST} is not a list of files, so it cannot be used to find files to clean up. Falling back to scanning your project for projen-generated files.`,
        );
      }
    }
  } catch (e: any) {
    logging.warn(
      `Could not read the list of generated files from ${FILE_MANIFEST}, so projen will scan your project for generated files instead. ` +
        `Check that the file exists in version control and contains valid JSON. Error: ${e.stack}`,
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
