import { Construct } from 'constructs';
import { FileBase } from './file';
import * as fs from 'fs';

export class License extends FileBase {
  private readonly text: string;

  constructor(scope: Construct, spdx: string) {
    super(scope, 'LICENSE');

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