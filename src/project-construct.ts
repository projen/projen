import { Construct } from 'constructs';

export class ProjectConstruct extends Construct {
  /**
   * Synthesizes files to the project output directory.
   * @param _outdir The project directory*
   */
  public synthesize(_outdir: string) {}

  /**
   * Called after synthesis. Order is *not* guaranteed.
   * @param _outdir The project directory
   */
  public postSynthesize(_outdir: string) {}
}