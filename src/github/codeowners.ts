import { GitHub } from '.';
import { TextFile } from '../textfile';

/**
 * CodeOwners Properties
 */
export interface CodeOwnersProps {
  /**
   * The contents of the CODEOWNERS file
  */
  readonly lines?: string[];
}

export class CodeOwners extends TextFile {
  constructor(github: GitHub, props: CodeOwnersProps = { }) {
    super(github.project, '.github/CODEOWNERS', {
      lines: (props.lines && props.lines?.length > 0)
        ? props.lines
        : ['Replace me'],
    });

  }
}
