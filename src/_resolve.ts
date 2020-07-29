
export function resolve(value: any, ...args: any[]): any {
  if (value == null) {
    return value;
  }

  // if value is a function, call it and resolve the result.
  if (typeof(value) === 'function') {
    const resolved = value.apply(undefined, args);
    return resolve(resolved, ...args);
  }

  if (typeof(value) !== 'object') {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(x => resolve(x, ...args));
  }

  const result: any = {};

  for (const [k,v] of Object.entries(value)) {
    result[k] = resolve(v, ...args);
  }

  return result;
}