import { Construct, Node } from 'constructs';
import { IgnoreFile } from './ignore-file';

export interface ProjectOptions {
  /**
   * @default . current directory
   */
  readonly outdir?: string;
}

export class Project extends Construct {
  public readonly outdir: string;
  public readonly gitignore: IgnoreFile;

  constructor(options: ProjectOptions = { }) {
    super(undefined as any, 'project');
    this.outdir = options.outdir ?? '.';
    this.gitignore = new IgnoreFile(this, '.gitignore');
  }

  public synth(): void {
    Node.of(this).synthesize({ outdir: this.outdir });
  }
}