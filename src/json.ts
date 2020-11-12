import { FileBase, FileBaseOptions, IResolver } from './file';
import { Project } from './projects/project';

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

  protected synthesizeContent(resolver: IResolver) {
    return JSON.stringify(resolver.resolve(this.obj), undefined, 2);
  }
}