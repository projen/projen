import { ResolveOptions } from './file';

export function resolve(value: any, options: ResolveOptions = {}): any {
  const args = options.args ?? [];
  const omitEmpty = options.omitEmpty ?? false;

  if (value == null) {
    return value;
  }

  // if value is a function, call it and resolve the result.
  if (typeof(value) === 'function') {
    const resolved = value.apply(undefined, args);
    return resolve(resolved, options);
  }

  if (typeof(value) !== 'object') {
    return value;
  }

  if (Array.isArray(value)) {
    if (omitEmpty && value.length === 0) {
      return undefined;
    }
    return value
      .map(x => resolve(x, options))
      .filter(x => x != null); // filter undefined/null/omitted
  }

  // only allow data types (i.e. objects without constructors)
  if (value.constructor && value.constructor?.name !== 'Object') {
    throw new Error(`only data types can be resolved. trying to resolve object of type ${value.constructor?.name}`);
  }

  const result: any = {};

  for (const [k, v] of Object.entries(value)) {
    const resolved = resolve(v, options);

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