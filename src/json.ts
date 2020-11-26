import { GENERATION_DISCLAIMER } from './common';
import { FileBase, FileBaseOptions, IResolver } from './file';
import { Project } from './project';

export interface JsonFileOptions extends FileBaseOptions {
  /**
   * The object that will be serialized. You can modify the object's contents
   * before synthesis.
   */
  readonly obj: any;

  /**
   * Adds the projen marker as a "JSON-comment" to the root object.
   *
   * @default false
   */
  readonly marker?: boolean;
}

export class JsonFile extends FileBase {
  protected readonly obj: object;

  public readonly marker: boolean;

  constructor(project: Project, filePath: string, options: JsonFileOptions) {
    super(project, filePath, options);

    if (!options.obj) {
      throw new Error('"obj" cannot be undefined');
    }

    this.marker = options.marker ?? false;
    this.obj = options.obj;
  }

  protected synthesizeContent(resolver: IResolver) {
    const obj: any = {
      ...this.obj,
    };

    if (this.marker) {
      obj['//'] = GENERATION_DISCLAIMER;
    }
    return JSON.stringify(resolver.resolve(obj), undefined, 2);
  }
}