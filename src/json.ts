import { FileBase, FileBaseOptions, IResolver } from './file';
import { Project } from './project';

/**
 * Options for `JsonFile`.
 */
export interface JsonFileOptions extends FileBaseOptions {
  /**
   * The object that will be serialized. You can modify the object's contents
   * before synthesis.
   *
   * @default {} an empty object (use `file.obj` to mutate).
   */
  readonly obj?: any;

  /**
   * Adds the projen marker as a "JSON-comment" to the root object.
   *
   * @default false
   */
  readonly marker?: boolean;

  /**
   * Omits empty objects and arrays.
   * @default false
   */
  readonly omitEmpty?: boolean;
}

/**
 * Represents a JSON file.
 */
export class JsonFile extends FileBase {
  /**
   * The output object. This object can be mutated until the project is
   * synthesized.
   */
  public readonly obj: object;

  /**
   * Indicates if the projen marker JSON-comment will be added to the output
   * object.
   */
  public readonly marker: boolean;

  /**
   * Indicates if empty objects and arrays are omitted from the output object.
   */
  public readonly omitEmpty: boolean;

  constructor(project: Project, filePath: string, options: JsonFileOptions) {
    super(project, filePath, options);

    if (!options.obj) {
      throw new Error('"obj" cannot be undefined');
    }

    this.marker = options.marker ?? false;
    this.obj = options.obj ?? {};
    this.omitEmpty = options.omitEmpty ?? false;
  }

  protected synthesizeContent(resolver: IResolver) {
    const obj = this.obj;

    const resolved = resolver.resolve(obj, {
      omitEmpty: this.omitEmpty,
    }) ?? {};

    if (this.marker) {
      resolved['//'] = JsonFile.PROJEN_MARKER;
    }

    return JSON.stringify(resolved, undefined, 2);
  }
}
