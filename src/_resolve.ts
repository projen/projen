import { ResolveOptions } from './file';

export function resolve(value: any, args?: any[], options: ResolveOptions = {}): any {
  const omitEmpty = options.omitEmpty ?? false;

  if (value == null) {
    return value;
  }

  // if value is a function, call it and resolve the result.
  if (typeof(value) === 'function') {
    const resolved = value.apply(undefined, args);
    return resolve(resolved, args, options);
  }

  if (typeof(value) !== 'object') {
    return value;
  }

  if (Array.isArray(value)) {
    if (omitEmpty && value.length === 0) {
      return undefined;
    }
    return value.map(x => resolve(x, args));
  }

  const result: any = {};

  for (const [k, v] of Object.entries(value)) {
    const resolved = resolve(v, args, options);

    // skip undefined values
    if (resolved === undefined) {
      continue;
    }

    result[k] = resolved;
  }

  if (omitEmpty && Object.keys(result).length === 0) {
    return undefined;
  }

  return result;
}