import { FileBase, FileBaseOptions, IResolver } from './file';
import { Project } from './project';

/**
 * Options for `ObjectFile`.
 */
export interface ObjectFileOptions extends FileBaseOptions {
  /**
   * The object that will be serialized. You can modify the object's contents
   * before synthesis.
   *
   * @default {} an empty object (use `file.obj` to mutate).
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
  public readonly obj: object;

  /**
   * An object to be merged on top of `obj` after the resolver is called
   */
  private readonly rawOverrides: object;

  /**
   * Indicates if empty objects and arrays are omitted from the output object.
   */
  public readonly omitEmpty: boolean;

  constructor(project: Project, filePath: string, options: ObjectFileOptions) {
    super(project, filePath, options);

    if (!options.obj) {
      throw new Error('"obj" cannot be undefined');
    }

    this.obj = options.obj ?? {};
    this.omitEmpty = options.omitEmpty ?? false;
    this.rawOverrides = {};
  }

  /**
   * Adds an override to the synthesized CloudFormation resource.
   *
   * To add a property override, either use `addPropertyOverride` or prefix
   * `path` with "Properties." (i.e. `Properties.TopicName`).
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
   * project.package.manifest.addOverride('jest.clearMocks', true);
   * project.package.manifest.addOverride('jest.coverageReporters', ["json", "lcov", "clover"]);
   * ```
   * would add the overrides
   * ```json
   * "jest": {
   *   "clearMocks": true,
   *   "coverageReporters": [
   *     "json",
   *     "lcov",
   *     "clover"
   *   ]
   *   ...
   * }
   * ...
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
      const isObject = curr[key] != null && typeof(curr[key]) === 'object' && !Array.isArray(curr[key]);
      if (!isObject) {
        curr[key] = {};
      }

      curr = curr[key];
    }

    const lastKey = parts.shift()!;
    curr[lastKey] = value;
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

    const resolved = resolver.resolve(obj, {
      omitEmpty: this.omitEmpty,
    }) ?? undefined;

    if (resolved) {
      deepMerge(resolved, this.rawOverrides);
    }

    return resolved ? JSON.stringify(resolved, undefined, 2) : undefined;
  }
}

/**
 * Merges `source` into `target`, overriding any existing values.
 * `undefined`s will cause a value to be deleted.
 */
function deepMerge(target: any, ...sources: any[]) {
  for (const source of sources) {
    if (typeof(source) !== 'object' || typeof(target) !== 'object') {
      throw new Error(`Invalid usage. Both source (${JSON.stringify(source)}) and target (${JSON.stringify(target)}) must be objects`);
    }

    for (const key of Object.keys(source)) {
      const value = source[key];
      if (typeof(value) === 'object' && value != null && !Array.isArray(value)) {
        // if the value at the target is not an object, override it with an
        // object so we can continue the recursion
        if (typeof(target[key]) !== 'object') {
          target[key] = {};
        }

        deepMerge(target[key], value);

        // if the result of the merge is an empty object, it's because the
        // eventual value we assigned is `undefined`, and there are no
        // sibling concrete values alongside, so we can delete this tree.
        const output = target[key];
        if (typeof(output) === 'object' && Object.keys(output).length === 0) {
          delete target[key];
        }
      } else if (value === undefined) {
        delete target[key];
      } else {
        target[key] = value;
      }
    }
  }

  return target;
}

/**
 * Split on periods while processing escape characters \
 */
function splitOnPeriods(x: string): string[] {
  // Build this list in reverse because it's more convenient to get the "current"
  // item by doing ret[0] than by ret[ret.length - 1].
  const ret = [''];
  for (let i = 0; i < x.length; i++) {
    if (x[i] === '\\' && i + 1 < x.length) {
      ret[0] += x[i + 1];
      i++;
    } else if (x[i] === '.') {
      ret.unshift('');
    } else {
      ret[0] += x[i];
    }
  }

  ret.reverse();
  return ret;
}
