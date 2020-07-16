import { FileBase, FileBaseOptions } from './file';
import { Project } from './project';

export interface JsonFileOptions extends FileBaseOptions {
  /**
   * Object to be parsed into JSON.
   *
   */
  readonly obj: any;
}

export class JsonFile extends FileBase {
  public readonly obj: any;

  constructor(project: Project, filePath: string, options: JsonFileOptions) {
    super(project, filePath, options);
    this.obj = options.obj;
  }

  protected get data() {
    // Just cleaning up a bit
    for (const k of Object.keys(this.obj ?? {})) {
      if (this.obj[k] instanceof Object && Object.keys(this.obj[k]).length === 0) {
        this.obj[k] = undefined;
      }
    }
    return JSON.stringify(this.obj, undefined, 2);
  }
}