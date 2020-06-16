import { Construct, ISynthesisSession, Tokenization, DefaultTokenResolver, StringConcat } from 'constructs';
import * as fs from 'fs';
import * as path from 'path';
import { Project } from './project';

export interface FileBaseOptions {
  /**
   * Indicates whether this file should be committed to git or ignored. By
   * default, all generated files are committed and anti-tamper is used to
   * protect against manual modifications.
   *
   * @default true
   */
  readonly committed?: boolean;

  /**
   * Update the project's .gitignore file
   * @default true
   */
  readonly editGitignore?: boolean;
}

export abstract class FileBase extends Construct {
  public readonly path: string;

  constructor(project: Project, filePath: string, options: FileBaseOptions = { }) {
    super(project, filePath);
    this.path = filePath;

    const gitignore = options.editGitignore ?? true;
    if (gitignore) {
      const committed = options.committed ?? true;
      const pattern = `/${this.path}`;
      if (committed) {
        project.gitignore.comment('synthesized by projen, (do not modify by hand)');
        project.gitignore.include(pattern);
      } else {
        project.gitignore.comment('synthesized by projen');
        project.gitignore.exclude(pattern);
      }
    } else {
      if (options.committed != null) {
        throw new Error('"gitignore" is disabled, so it does not make sense to specify "committed"');
      }
    }
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