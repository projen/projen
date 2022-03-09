import { isAbsolute, resolve } from "path";
import { Construct, IConstruct } from "constructs";
import { FileBase, FileBaseOptions, IResolver } from "./file";
import { Project } from "./project";
import { deepMerge } from "./util";

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
   * Finds an object file by name in the given scope.
   * @param filePath The file path. If this path is relative, it will be resolved
   * from the root of the nearest project.
   */
  public static tryFindObjectFile(
    scope: IConstruct,
    filePath: string
  ): ObjectFile | undefined {
    const isObjectFile = (c: IConstruct): c is ObjectFile =>
      c instanceof ObjectFile;
    const absolutePath = isAbsolute(filePath)
      ? filePath
      : resolve(Project.ofProject(scope).outdir, filePath);
    return scope.node
      .findAll()
      .filter(isObjectFile)
      .find((file) => file.absolutePath === absolutePath);
  }

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

  constructor(scope: Construct, filePath: string, options: ObjectFileOptions) {
    super(scope, filePath, options);

    this.obj = options.obj ?? {};
    this.omitEmpty = options.omitEmpty ?? false;
    this.rawOverrides = {};
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

    return resolved ? JSON.stringify(resolved, undefined, 2) : undefined;
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
