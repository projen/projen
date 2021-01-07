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
  }

  protected synthesizeContent(resolver: IResolver): string | undefined {
    const obj = this.obj;

    const resolved = resolver.resolve(obj, {
      omitEmpty: this.omitEmpty,
    }) ?? undefined;

    return resolved ? JSON.stringify(resolved, undefined, 2) : undefined;
  }
}
