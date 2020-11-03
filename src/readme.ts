import { Project } from './project';
import { SampleFile } from './sample-file';

/**
 * Represents a README.md sample file.
 * You are expected to manage this file after creation.
 *
 * @param text - The initial contents of the README.md file. Defaults to '# replace this'
 */
export class SampleReadme extends SampleFile {
  constructor(project: Project, text?: string) {
    super(project, 'README.md', { contents: text ?? '# replace this' });
  }
}
