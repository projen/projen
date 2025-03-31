import { IConstruct } from "constructs";
import { FileBase, FileBaseOptions, IResolver } from "./file";
import { JsonPatch } from "./json-patch";
import { deepMerge } from "./util";

/**
 * Options for `ObjectFile`.
 */
export interface ObjectFileOptions extends FileBaseOptions {
  /**
   * The object that will be serialized. You can modify the object's contents
   * before synthesis.
   *
   * Serialization of the object is similar to JSON.stringify with few enhancements:
   * - values that are functions will be called during synthesis and the result will be serialized - this allow to have lazy values.
   * - `Set` will be converted to array
   * - `Map` will be converted to a plain object ({ key: value, ... }})
   * - `RegExp` without flags will be converted to string representation of the source
   *
   *  @default {} an empty object (use `file.obj` to mutate).
   */
  readonly obj?: any;

  /**
   * Omits empty objects and arrays.
   * @default false
   */
  readonly omitEmpty?: boolean;
}

/**
 * Represents an Object file.
 */
export abstract class ObjectFile extends FileBase {
  /**
   * The output object. This object can be mutated until the project is
   * synthesized.
   */
  private readonly obj: object;

  /**
   * An object to be merged on top of `obj` after the resolver is called
   */
  private readonly rawOverrides: object;

  /**
   * Indicates if empty objects and arrays are omitted from the output object.
   */
  public readonly omitEmpty: boolean;

  /**
   * patches to be applied to `obj` after the resolver is called
   */
  private readonly patchOperations: Array<JsonPatch[]>;

  constructor(scope: IConstruct, filePath: string, options: ObjectFileOptions) {
    super(scope, filePath, options);

    this.obj = options.obj ?? {};
    this.omitEmpty = options.omitEmpty ?? false;
    this.rawOverrides = {};
    this.patchOperations = [];
  }

  /**
   * Adds an override to the synthesized object file.
   *
   * If the override is nested, separate each nested level using a dot (.) in the path parameter.
   * If there is an array as part of the nesting, specify the index in the path.
   *
   * To include a literal `.` in the property name, prefix with a `\`. In most
   * programming languages you will need to write this as `"\\."` because the
   * `\` itself will need to be escaped.
   *
   * For example,
   * ```typescript
   * project.tsconfig.file.addOverride('compilerOptions.alwaysStrict', true);
   * project.tsconfig.file.addOverride('compilerOptions.lib', ['dom', 'dom.iterable', 'esnext']);
   * ```
   * would add the overrides
   * ```json
   * "compilerOptions": {
   *   "alwaysStrict": true,
   *   "lib": [
   *     "dom",
   *     "dom.iterable",
   *     "esnext"
   *   ]
   *   ...
   * }
   * ...
   * ```
   *
   * @param path - The path of the property, you can use dot notation to
   *        override values in complex types. Any intermediate keys
   *        will be created as needed.
   * @param value - The value. Could be primitive or complex.
   */
  public addOverride(path: string, value: any) {
    const parts = splitOnPeriods(path);
    let curr: any = this.rawOverrides;

    while (parts.length > 1) {
      const key = parts.shift()!;

      // if we can't recurse further or the previous value is not an
      // object overwrite it with an object.
      const isObject =
        curr[key] != null &&
        typeof curr[key] === "object" &&
        !Array.isArray(curr[key]);
      if (!isObject) {
        curr[key] = {};
      }

      curr = curr[key];
    }

    const lastKey = parts.shift()!;
    curr[lastKey] = value;
  }

  /**
   * Adds to an array in the synthesized object file.
   *
   * If the array is nested, separate each nested level using a dot (.) in the path parameter.
   * If there is an array as part of the nesting, specify the index in the path.
   *
   * To include a literal `.` in the property name, prefix with a `\`. In most
   * programming languages you will need to write this as `"\\."` because the
   * `\` itself will need to be escaped.
   *
   * For example, with the following object file
   * ```json
   * "compilerOptions": {
   *   "exclude": ["node_modules"],
   *   "lib": ["es2023"]
   *   ...
   * }
   * ...
   * ```
   *
   * ```typescript
   * project.tsconfig.file.addToArray('compilerOptions.exclude', 'coverage');
   * project.tsconfig.file.addToArray('compilerOptions.lib', 'dom', 'dom.iterable', 'esnext');
   * ```
   * would result in the following object file
   * ```json
   * "compilerOptions": {
   *   "exclude": ["node_modules", "coverage"],
   *   "lib": ["es2023", "dom", "dom.iterable", "esnext"]
   *   ...
   * }
   * ...
   * ```
   *
   * @param path - The path of the property, you can use dot notation to
   *        att to arrays in complex types. Any intermediate keys
   *        will be created as needed.
   * @param values - The values to add. Could be primitive or complex.
   */
  public addToArray(path: string, ...values: any) {
    const parts = splitOnPeriods(path);
    let curr: any = this.rawOverrides;

    while (parts.length > 1) {
      const key = parts.shift()!;

      // if we can't recurse further or the previous value is not an
      // object overwrite it with an object.
      const isObject =
        curr[key] != null &&
        typeof curr[key] === "object" &&
        !Array.isArray(curr[key]);
      if (!isObject) {
        curr[key] = {};
      }

      curr = curr[key];
    }

    const lastKey = parts.shift()!;
    if (Array.isArray(curr[lastKey])) {
      curr[lastKey].push(...values);
    } else {
      curr[lastKey] = {
        __$APPEND: [...(curr[lastKey]?.__$APPEND ?? []), ...values],
      };
    }
  }

  /**
   * Applies an RFC 6902 JSON-patch to the synthesized object file.
   * See https://datatracker.ietf.org/doc/html/rfc6902 for more information.
   *
   * For example, with the following object file
   * ```json
   * "compilerOptions": {
   *   "exclude": ["node_modules"],
   *   "lib": ["es2023"]
   *   ...
   * }
   * ...
   * ```
   *
   * ```typescript
   * project.tsconfig.file.patch(JsonPatch.add("/compilerOptions/exclude/-", "coverage"));
   * project.tsconfig.file.patch(JsonPatch.replace("/compilerOptions/lib", ["dom", "dom.iterable", "esnext"]));
   * ```
   * would result in the following object file
   * ```json
   * "compilerOptions": {
   *   "exclude": ["node_modules", "coverage"],
   *   "lib": ["dom", "dom.iterable", "esnext"]
   *   ...
   * }
   * ...
   * ```
   *
   * @param patches - The patch operations to apply
   */
  public patch(...patches: JsonPatch[]) {
    this.patchOperations.push(patches);
  }

  /**
   * Syntactic sugar for `addOverride(path, undefined)`.
   * @param path The path of the value to delete
   */
  public addDeletionOverride(path: string) {
    this.addOverride(path, undefined);
  }

  protected synthesizeContent(resolver: IResolver): string | undefined {
    const obj = this.obj;

    const resolved =
      resolver.resolve(obj, {
        omitEmpty: this.omitEmpty,
      }) ?? undefined;

    if (resolved) {
      deepMerge([resolved, this.rawOverrides], true);
    }

    let patched = resolved;
    for (const operation of this.patchOperations) {
      patched = JsonPatch.apply(patched, ...operation);
    }
    return patched ? JSON.stringify(patched, undefined, 2) : undefined;
  }
}

/**
 * Split on periods while processing escape characters \
 */
function splitOnPeriods(x: string): string[] {
  // Build this list in reverse because it's more convenient to get the "current"
  // item by doing ret[0] than by ret[ret.length - 1].
  const ret = [""];
  for (let i = 0; i < x.length; i++) {
    if (x[i] === "\\" && i + 1 < x.length) {
      ret[0] += x[i + 1];
      i++;
    } else if (x[i] === ".") {
      ret.unshift("");
    } else {
      ret[0] += x[i];
    }
  }

  ret.reverse();
  return ret;
}
