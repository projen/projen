import { FileBase } from './file';
import { Project } from './project';

export class JsonFile extends FileBase {
  private readonly obj: object;

  constructor(project: Project, filePath: string, obj: any) {
    super(project, filePath);
    this.obj = obj;
  }

  protected get data() {
    return JSON.stringify(this.obj, undefined, 2);
  }
}