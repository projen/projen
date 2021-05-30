import * as fs from 'fs-extra';
import { FileBase, IResolver } from './file';
import { Project } from './project';

export interface LicenseOptions {
  /**
   * SPDX license type.
   */
  readonly spdx: string;
}

export class License extends FileBase {
  private readonly text: string;

  constructor(project: Project, spdx: string) {
    super(project, 'LICENSE');

    const textFile = `${__dirname}/../license-text/${spdx}.txt`;
    if (!fs.existsSync(textFile)) {
      throw new Error(`unsupported license ${spdx}`);
    }

    this.text = fs.readFileSync(textFile, 'utf-8');
  }

  protected synthesizeContent(_: IResolver): string | undefined {
    return this.text;
  }
}