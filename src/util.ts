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

export function writeFile(filePath: string, data: any, options: { readonly?: boolean } = { }) {
  if (fs.existsSync(filePath)) {
    fs.chmodSync(filePath, '600');
  }

  fs.mkdirpSync(path.dirname(filePath));
  fs.writeFileSync(filePath, data);

  if (options.readonly) {
    fs.chmodSync(filePath, '400');
  }
}

export function fileExists(filePath: string){
  return fs.existsSync(filePath);
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
   * @default '_'
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