import * as child_process from "child_process";
import {
  accessSync,
  chmodSync,
  constants as fs_constants,
  existsSync,
  mkdirSync,
  promises as fs,
  readFileSync,
  writeFileSync,
} from "fs";
import * as path from "path";
import * as Case from "case";
import * as logging from "./logging";

const MAX_BUFFER = 10 * 1024 * 1024;

/**
 * Executes a command with STDOUT > STDERR.
 */
export function exec(
  command: string,
  options: {
    cwd: string;
    env?: Record<string, string>;
    stdio?: child_process.StdioOptions;
  }
): void {
  logging.debug(`${command} (cwd: ${options.cwd})`);

  child_process.execSync(command, {
    stdio: options.stdio || ["inherit", 2, "pipe"], // "pipe" for STDERR means it appears in exceptions
    maxBuffer: MAX_BUFFER,
    cwd: options.cwd,
    env: options.env,
  });
}

/**
 * Executes command and returns STDOUT. If the command fails (non-zero), throws an error.
 */
export function execCapture(
  command: string,
  options: { cwd: string; modEnv?: Record<string, string> }
) {
  logging.debug(`${command} (cwd: ${options.cwd})`);

  return child_process.execSync(command, {
    stdio: ["inherit", "pipe", "pipe"], // "pipe" for STDERR means it appears in exceptions
    maxBuffer: MAX_BUFFER,
    cwd: options.cwd,
    env: {
      ...process.env,
      ...options.modEnv,
    },
  });
}

/**
 * Executes `command` and returns its value or undefined if the command failed.
 */
export function execOrUndefined(
  command: string,
  options: { cwd: string }
): string | undefined {
  logging.debug(`${command} (cwd: ${options.cwd})`);

  try {
    const value = child_process
      .execSync(command, {
        stdio: ["inherit", "pipe", "pipe"], // "pipe" for STDERR means it appears in exceptions
        maxBuffer: MAX_BUFFER,
        cwd: options.cwd,
      })
      .toString("utf-8")
      .trim();

    if (!value) {
      return undefined;
    } // an empty string is the same as undefined
    return value;
  } catch {
    return undefined;
  }
}

export interface WriteFileOptions {
  /**
   * Whether the generated file should be marked as executable.
   *
   * @default false
   */
  executable?: boolean;

  /**
   * Whether the generated file should be readonly.
   *
   * @default false
   */
  readonly?: boolean;
}

export function getFilePermissions(options: WriteFileOptions): string {
  const readonly = options.readonly ?? false;
  const executable = options.executable ?? false;
  if (readonly && executable) {
    return "544";
  } else if (readonly) {
    return "444";
  } else if (executable) {
    return "755";
  } else {
    return "644";
  }
}

export function writeFile(
  filePath: string,
  data: any,
  options: WriteFileOptions = {}
) {
  if (existsSync(filePath)) {
    chmodSync(filePath, "600");
  }

  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, data);

  chmodSync(filePath, getFilePermissions(options));
}

/**
 * Decamelizes the keys of an object structure, recursing through child objects and arrays.
 * @experimental
 */
export interface DecamelizeRecursivelyOptions {
  /**
   * Max depth to recurse before erroring.
   * @default 10
   */
  maxDepth?: number;

  /**
   * Returns true when a key should be decamelized
   * @default - all keys are decamelized
   */
  shouldDecamelize?: (path: string[], value: any) => boolean;

  /**
   * Separator for decamelizing.
   * @default "_"
   */
  separator?: string;

  /**
   * Current path.
   * @internal
   */
  path?: string[];
}

export function decamelizeKeysRecursively(
  input: any,
  opt?: DecamelizeRecursivelyOptions
): any {
  const shouldAlwaysDecamelize = () => true;
  const shouldDecamelize = opt?.shouldDecamelize ?? shouldAlwaysDecamelize;
  const separator = opt?.separator ?? "_";
  const path_ = opt?.path ?? [];
  const maxDepth = opt?.maxDepth ?? 10;

  if (path_.length > maxDepth) {
    throw new Error(
      "Decamelled too deeply - check that the input has no circular references"
    );
  }

  if (Array.isArray(input)) {
    return input.map((k, i) =>
      decamelizeKeysRecursively(k, {
        ...opt,
        path: [...path_, i.toString()],
      })
    );
  }

  if (typeof input === "object" && input !== null) {
    const mappedObject: Record<string, any> = {};
    for (const [key, value] of Object.entries(input)) {
      const transformedKey = shouldDecamelize([...path_, key], value)
        ? decamelize(key, separator)
        : key;

      mappedObject[transformedKey] = decamelizeKeysRecursively(value, {
        ...opt,
        path: [...path_, key],
      });
    }

    return mappedObject;
  }

  return input;
}

/**
 * Returns false if value is unset or a falsey value, and true otherwise.
 * @param value an environment variable
 */
export function isTruthy(value: string | undefined): boolean {
  return !(
    value === undefined ||
    ["null", "undefined", "0", "false", ""].includes(value.toLocaleLowerCase())
  );
}

/**
 * Type of a map mapping strings to some arbitrary type
 */
export type Obj<T> = { [key: string]: T };

/**
 * Return whether the given value is a plain struct object
 *
 * Even though arrays and instances of classes technically are objects, we
 * usually want to treat them differently, so we return false in those cases.
 */
export function isObject(x: any): x is Obj<any> {
  return (
    x !== null &&
    typeof x === "object" &&
    !Array.isArray(x) &&
    x.constructor.name === "Object"
  );
}

/**
 * Configure the behavior of `deepMerge`.
 */
interface MergeOptions {
  /**
   * Whether to delete keys with `undefined` values.
   *
   * @default false
   */
  readonly destructive?: boolean;
  /**
   * Whether to merge arrays.
   *
   * @default false
   */
  readonly mergeArrays?: boolean;
}

/**
 * Recursively merge objects together
 *
 * The leftmost object is mutated and returned.
 *
 * If an object is merged into something other than an object, the non-object is lost.
 * Arrays are overwritten not merged; set `mergeArrays: true` to merge arrays and deduplicate the result.
 * An `undefined` key in a source object will persist; set `destructive: true` to fully remove the key instead.
 * Empty objects as values are preserved in the output; set `destructive: true` to remove them instead.
 */
export function deepMerge(
  objects: Array<Obj<any> | undefined>,
  { destructive = false, mergeArrays = false }: MergeOptions = {}
) {
  function mergeOne(target: Obj<any>, source: Obj<any>) {
    for (const key of Object.keys(source)) {
      // Prevent prototype pollution by blocking dangerous keys
      if (key === "__proto__" || key === "constructor" || key === "prototype") {
        continue;
      }
      const value = source[key];

      // if the current value is a plain object, we recursively merge it
      if (isObject(value)) {
        // if the value at the target is not an object, override it with an
        // object so we can continue the recursion
        if (typeof target[key] !== "object") {
          target[key] = value;
        }

        // Special handling for __$APPEND, which is used to append values to arrays
        if ("__$APPEND" in value && Array.isArray(value.__$APPEND)) {
          if (Array.isArray(target[key])) {
            target[key].push(...value.__$APPEND);
          } else {
            target[key] = value.__$APPEND;
          }
        }

        // recursively merge the object
        mergeOne(target[key], value);

        // if the result of the merge is an empty object, it's because the
        // eventual value we assigned is `undefined`, and there are no
        // sibling concrete values alongside, so we can delete this tree.
        if (
          destructive &&
          typeof target[key] === "object" &&
          Object.keys(target[key]).length === 0
        ) {
          delete target[key];
        }
        continue;
      }

      // in destructive mode, we delete the existing key if the value is undefined
      if (destructive && value === undefined) {
        delete target[key];
        continue;
      }

      // in array merging mode, we merge and deduplicate arrays
      if (mergeArrays && Array.isArray(target[key]) && Array.isArray(value)) {
        target[key] = [...new Set([...target[key], ...value])];
        continue;
      }

      // all other values are simply overwritten by overriding object
      if (typeof value !== "undefined") {
        target[key] = value;
        continue;
      }
    }
  }

  const others = objects.filter((x) => x != null) as Array<Obj<any>>;

  if (others.length === 0) {
    return {};
  }
  const into = others.splice(0, 1)[0];

  others.forEach((other) => mergeOne(into, other));
  return into;
}

/*
 * Deduplicate values in a list, returning a new array.
 * @param array list of values
 */
export function dedupArray<T>(array: T[]): T[] {
  return array.filter((val, idx) => array.indexOf(val) === idx);
}

/**
 * Returns a sorted version of `x` or `undefined` if it is an empty array or object.
 */
export function sorted<T>(x: T) {
  if (x == null) {
    return undefined;
  }
  if (Array.isArray(x)) {
    if (x.length === 0) {
      return undefined;
    }
    return (x as unknown[]).sort();
  } else if (typeof x === "object") {
    if (Object.keys(x).length === 0) {
      return undefined;
    }
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(x).sort(([l], [r]) =>
      l.localeCompare(r)
    )) {
      result[key] = value;
    }
    return result as T;
  } else {
    return x;
  }
}

export function formatAsPythonModule(name: string) {
  return name.replace(/-/g, "_").replace(/\./g, "_");
}

/**
 * Extract git version number from command line
 *
 * @param gitVersionOutput the output from `git version` CLI
 * @returns the version of git
 */
export function getGitVersion(gitVersionOutput: string) {
  const match = gitVersionOutput.match(/\d+.\d+.\d+/);
  if (!match) {
    throw new Error("Unable to retrieve git version");
  }

  return match[0];
}

export function kebabCaseKeys<T = unknown>(obj: T, recursive = true): T {
  if (typeof obj !== "object" || obj == null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    if (recursive) {
      obj = obj.map((v) => kebabCaseKeys(v, recursive)) as any;
    }
    return obj;
  }

  const result: Record<string, unknown> = {};
  for (let [k, v] of Object.entries(obj)) {
    if (recursive) {
      v = kebabCaseKeys(v, recursive);
    }
    result[decamelize(k).replace(/_/gm, "-")] = v;
  }
  return result as any;
}

export function snakeCaseKeys<T = unknown>(
  obj: T,
  recursive = true,
  exclusiveForRecordKeys: string[] = []
): T {
  if (typeof obj !== "object" || obj == null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    if (recursive) {
      obj = obj.map((v) =>
        snakeCaseKeys(v, recursive, exclusiveForRecordKeys)
      ) as any;
    }
    return obj;
  }

  const result: Record<string, unknown> = {};
  for (let [k, v] of Object.entries(obj)) {
    if (recursive) {
      v = snakeCaseKeys(v, recursive, exclusiveForRecordKeys);
    }
    const modifiedKey =
      exclusiveForRecordKeys.length == 0 || exclusiveForRecordKeys.includes(k)
        ? Case.snake(k)
        : k;
    result[modifiedKey] = v;
  }
  return result as any;
}

export async function tryReadFile(file: string) {
  if (!existsSync(file)) {
    return "";
  }

  return fs.readFile(file, "utf-8");
}

export function tryReadFileSync(file: string) {
  if (!existsSync(file)) {
    return undefined;
  }

  return readFileSync(file, "utf-8");
}

export function isWritable(file: string) {
  try {
    accessSync(file, fs_constants.W_OK);
    return true;
  } catch {
    return false;
  }
}

/**
 * Asserts that the file should be executable. Always returns true on Windows.
 *
 * In Windows, the executable attribute is stored in the system setting PATHEXT, not in each file. Then, checking for executability is equivalent to checking for existence. To bypass checking for executability, we always return true on Windows.
 *
 * @param filePath The path to the file
 * @param shouldBeExecutable Whether the file should be executable
 * @returns true if `filePath` executable attribute matches `shouldBeExecutable` or if the platform is Windows, false otherwise
 */
export function assertExecutablePermissions(
  filePath: string,
  shouldBeExecutable: boolean
): boolean {
  const isWindows = process.platform === "win32";
  if (isWindows) {
    return true;
  }

  const prevExecutable = isExecutable(filePath);

  return prevExecutable === shouldBeExecutable;
}

export function isExecutable(file: string) {
  try {
    accessSync(file, fs_constants.X_OK);

    return true;
  } catch (e) {
    return false;
  }
}

function decamelize(s: string, sep: string = "_") {
  if (Case.of(s) === "camel") {
    return Case.lower(s, sep);
  } else {
    return s;
  }
}

export function getNodeMajorVersion(): number | undefined {
  const match = process.version.match(/(\d+)\.(\d+)\.(\d+)/);
  if (match) {
    const [major] = match.slice(1).map((x) => parseInt(x));
    return major;
  }
  return undefined;
}

export function anySelected(options: (boolean | undefined)[]): boolean {
  return options.some((opt) => opt);
}

export function multipleSelected(options: (boolean | undefined)[]): boolean {
  return options.filter((opt) => opt).length > 1;
}

/**
 * Checks if a path is a FS root
 *
 * Optional uses a provided OS specific path implementation,
 * defaults to use the implementation for the current OS.
 *
 * @internal
 */
export function isRoot(dir: string, osPathLib: typeof path = path): boolean {
  const parent = osPathLib.dirname(dir);
  return parent === dir;
}

/**
 * Run up project tree to find a file or directory
 *
 * @param lookFor the file or directory to look for
 * @param cwd current working directory, must be an absolute path
 * @returns path to the file or directory we are looking for, undefined if not found
 */
export function findUp(
  lookFor: string,
  cwd: string = process.cwd()
): string | undefined {
  if (existsSync(path.join(cwd, lookFor))) {
    return cwd;
  }

  if (isRoot(cwd)) {
    // This is a root
    return undefined;
  }
  return findUp(lookFor, path.dirname(cwd));
}

/**
 * Normalizes a path that is going to be persisted to have a cross platform representation.
 *
 * Normalized paths can be persisted and doesn't need to be modified when the platform changes.
 * `normalizePersistedPath` takes care of platform-specific properties like directory separator.
 * It uses `path.posix.sep` that is supported both in Windows and Unix platforms.
 *
 *
 * @param p the path to be normalized
 * @returns the normalized path
 */
export function normalizePersistedPath(p: string) {
  return p.replace(/\\/g, path.posix.sep);
}
