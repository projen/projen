import { GENERATION_DISCLAIMER } from './common';
import { FileBase, FileBaseOptions, IResolver } from './file';
import { Project } from './project';

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

export class JsonFile extends FileBase {
  public readonly obj: object;

  public readonly marker: boolean;

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
    const obj: any = {
      ...this.obj,
    };

    if (this.marker) {
      obj['//'] = GENERATION_DISCLAIMER;
    }

    const resolved = resolver.resolve(obj, {
      omitEmpty: this.omitEmpty,
    });

    return JSON.stringify(resolved, undefined, 2);
  }
}
