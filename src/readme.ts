import * as path from 'path';
import { Component } from './component';
import { FileBaseOptions } from './file';
import { Project } from './project';
import { fileExists, writeFile } from './util';

export interface ReadmeOptions extends FileBaseOptions {
  /**
   * The initial content of the README file.
   *
   * @default "# jsii construct"
   */
  readonly text?: string;
}


/**
 * Represents a README.md file. Unlike most other files this will only be created if the file doesn't already exist.
 * You are expected to manage this file after creation.
 */
export class Readme extends Component {
  private readonly text: string;

  constructor(project: Project, text?: string) {
    super(project);
    this.text = text ?? '# jsii construct';
  }

  synthesize(outdir: string) {
    let readmeFilename = 'README.md';
    const filePath = path.join(outdir, readmeFilename);
    if (!fileExists(readmeFilename)) {
      writeFile(filePath, this.text);
    }
  }
}