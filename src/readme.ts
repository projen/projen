import { Project } from './project';
import { SampleFile } from './sample-file';

/**
 * SampleReadme Properties
 */
export interface SampleReadmeProps {
  /**
   * The name of the README.md file
   *
   * @default "README.md"
   * @example "readme.md"
   */
  readonly readme?: string;
}

/**
 * Represents a README.md sample file.
 * You are expected to manage this file after creation.
 *
 * @param text - The initial contents of the README.md file. Defaults to '# replace this'
 */
export class SampleReadme extends SampleFile {
  constructor(project: Project, text?: string, props?: SampleReadmeProps) {
    super(project, props?.readme ?? 'README.md', { contents: text ?? '# replace this' });
  }
}
