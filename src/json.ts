import { FileBase, FileBaseOptions } from './file';
import { Project } from './project';

export interface JsonFileOptions extends FileBaseOptions {
  readonly obj: any;
}

export class JsonFile extends FileBase {
  protected readonly obj: object;

  constructor(project: Project, filePath: string, options: JsonFileOptions) {
    super(project, filePath, options);

    if (!options.obj) {
      throw new Error('"obj" cannot be undefined');
    }

    this.obj = options.obj;
  }

  protected get data() {
    return JSON.stringify(this.obj, undefined, 2);
  }
}