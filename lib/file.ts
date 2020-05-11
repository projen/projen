import { Construct, ISynthesisSession, Tokenization, DefaultTokenResolver, StringConcat } from 'constructs';
import * as fs from 'fs';
import * as path from 'path';

export abstract class FileBase extends Construct {
  public readonly path: string;

  constructor(scope: Construct, filePath: string) {
    super(scope, filePath);

    this.path = filePath;
  }

  protected abstract get data(): string;

  public onSynthesize(session: ISynthesisSession): void {
    const filePath = path.join(session.outdir, this.path);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    const post = Tokenization.resolve(this.data, {
      resolver: new DefaultTokenResolver(new StringConcat()),
      scope: this,
      preparing: false,
    });

    fs.writeFileSync(filePath, post);
  }
}