import { Construct } from 'constructs';
import { FileBase } from './file';

export class JsonFile extends FileBase {
  private readonly obj: object;

  constructor(scope: Construct, filePath: string, obj: any) {
    super(scope, filePath);
    this.obj = obj;
  }

  protected get data() {
    return JSON.stringify(this.obj, undefined, 2);
  }
}