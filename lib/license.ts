import { FileBase } from './file';
import * as fs from 'fs-extra';
import { Project } from './project';

export class License extends FileBase {
  private readonly text: string;

  constructor(project: Project, spdx: string) {
    super(project, 'LICENSE');

    const textFile = `${__dirname}/license-text/${spdx}.txt`;
    if (!fs.existsSync(textFile)) {
      throw new Error(`unsupported license ${spdx}`);
    }

    this.text = fs.readFileSync(textFile, 'utf-8');
  }

  protected get data(): string {
    return this.text;
  }
}