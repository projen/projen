import { Construct, ISynthesisSession } from 'constructs';
import * as fs from 'fs';
import * as path from 'path';

export abstract class FileBase extends Construct {
  public readonly path: string;

  constructor(scope: Construct, filePath: string) {
    super(scope, filePath);

    this.path = filePath;
  }

  protected abstract get data(): any;

  public onSynthesize(session: ISynthesisSession): void {
    const filePath = path.join(session.outdir, this.path);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, this.data);
  }
}