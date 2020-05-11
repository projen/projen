import { Construct, Node } from 'constructs';

export interface ProjectOptions {
  /**
   * @default . current directory
   */
  readonly outdir?: string;
}

export class Project extends Construct {
  public readonly outdir: string;

  constructor(options: ProjectOptions = { }) {
    super(undefined as any, 'project');

    this.outdir = options.outdir ?? '.';
  }

  public synth(): void {
    Node.of(this).synthesize({ outdir: this.outdir });
  }
}