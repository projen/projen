import * as child_process from 'child_process';
import * as path from 'path';
import * as fs from 'fs-extra';
import * as logging from './logging';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const decamelize = require('decamelize');

export function exec(command: string, options?: child_process.ExecSyncOptions) {
  logging.verbose(command);
  return child_process.execSync(command, {
    stdio: ['inherit', 'inherit', 'pipe'],
    ...options,
  });
}

/**
 * Executes `command` and returns its value or undefined if the command failed.
 */
export function execOrUndefined(command: string, options?: child_process.ExecSyncOptions): string | undefined {
  try {
    const value = child_process.execSync(command, { stdio: ['inherit', 'pipe', 'ignore'], ...options }).toString('utf-8').trim();
    if (!value) { return undefined; } // an empty string is the same as undefined
    return value;
  } catch {
    return undefined;
  }
}

export function writeFile(filePath: string, data: any, options: { readonly?: boolean } = {}) {
  if (fs.existsSync(filePath)) {
    fs.chmodSync(filePath, '600');
  }

  fs.mkdirpSync(path.dirname(filePath));
  fs.writeFileSync(filePath, data);

  if (options.readonly) {
    fs.chmodSync(filePath, '400');
  }
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

export function decamelizeKeysRecursively(input: any, opt?: DecamelizeRecursivelyOptions): any {
  const shouldAlwaysDecamelize = () => true;
  const shouldDecamelize = opt?.shouldDecamelize ?? shouldAlwaysDecamelize;
  const separator = opt?.separator ?? '_';
  const path_ = opt?.path ?? [];
  const maxDepth = opt?.maxDepth ?? 10;

  if (path_.length > maxDepth) {
    throw new Error('Decamelled too deeply - check that the input has no circular references');
  }

  if (Array.isArray(input)) {
    return input.map((k, i) => decamelizeKeysRecursively(k, {
      ...opt,
      path: [...path_, i.toString()],
    }));
  }

  if (typeof input === 'object' && input !== null) {
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
  return !(value === undefined || ['null', 'undefined', '0', 'false', ''].includes(value.toLocaleLowerCase()));
}

/**
 * Type of a map mapping strings to some arbitrary type
 */
export type Obj<T> = { [key: string]: T };

/**
 * Return whether the given value is an object
 *
 * Even though arrays technically are objects, we usually want to treat them differently,
 * so we return false in those cases.
 */
export function isObject(x: any): x is Obj<any> {
  return x !== null && typeof x === 'object' && !Array.isArray(x);
}

/**
 * Recursively merge objects together
 *
 * The leftmost object is mutated and returned. Arrays are not merged
 * but overwritten just like scalars.
 *
 * If an object is merged into a non-object, the non-object is lost.
 */
export function deepMerge(...objects: Array<Obj<any> | undefined>) {
  function mergeOne(target: Obj<any>, source: Obj<any>) {
    for (const key of Object.keys(source)) {
      const value = source[key];

      if (isObject(value)) {
        if (!isObject(target[key])) { target[key] = {}; } // Overwrite on purpose
        mergeOne(target[key], value);
      } else if (typeof value !== 'undefined') {
        target[key] = value;
      }
    }
  }

  const others = objects.filter(x => x != null) as Array<Obj<any>>;

  if (others.length === 0) { return {}; }
  const into = others.splice(0, 1)[0];

  others.forEach(other => mergeOne(into, other));
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
  if (x == null) { return undefined; }
  if (Array.isArray(x)) {
    if (x.length === 0) { return undefined; }
    return (x as unknown[]).sort();
  } else if (typeof x === 'object') {
    if (Object.keys(x).length === 0) { return undefined; }
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(x).sort(([l], [r]) => l.localeCompare(r))) {
      result[key] = value;
    }
    return result as T;
  } else {
    return x;
  }
}

