import { types } from "util";
import { ResolveOptions, IResolvable } from "./file";

function isResolvable(obj: any): obj is IResolvable {
  return (obj as IResolvable).toJSON !== undefined;
}

export function resolve(value: any, options: ResolveOptions = {}): any {
  const args = options.args ?? [];
  const omitEmpty = options.omitEmpty ?? false;

  if (value == null) {
    return value;
  }

  if (isResolvable(value)) {
    const resolved = value.toJSON();
    return resolve(resolved, options);
  }

  // Special resolution for few JavaScript built-in types
  // that by default would be stringified as empty objects ('{}')
  // as they are missing a `toJSON` implementation.
  switch (true) {
    case types.isRegExp(value):
      if (value.flags) {
        throw new Error(
          "RegExp with flags should be explicitly converted to a string"
        );
      }
      return value.source;

    case types.isSet(value):
      return resolve(Array.from(value), options);

    case types.isMap(value):
      return resolve(Object.fromEntries(value), options);

    case types.isBoxedPrimitive(value):
      return resolve(value.valueOf(), options);
  }

  // if value is a function, call it and resolve the result.
  if (typeof value === "function") {
    const resolved = value.apply(undefined, args);
    return resolve(resolved, options);
  }

  if (typeof value !== "object") {
    return value;
  }

  if (Array.isArray(value)) {
    if (omitEmpty && value.length === 0) {
      return undefined;
    }
    return value.map((x) => resolve(x, options)).filter((x) => x != null); // filter undefined/null/omitted
  }

  // only allow data types (i.e. objects without constructors)
  if (value.constructor && value.constructor?.name !== "Object") {
    throw new Error(
      `only data types can be resolved. trying to resolve object of type ${value.constructor?.name}`
    );
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
