import { Component } from '../component';
import { TextFile } from '../textfile';
import { GitHub } from './github';


export interface Owner {
  readonly patterns?: string;
  readonly owners?: string[];
}

export interface CodeOwnersProps {
  readonly owners?: Owner[]
}
export class CodeOwners extends Component {
  private owners: string[] = [];

  constructor(github: GitHub, options: CodeOwnersProps) {
    super(github.project);
    options.owners?.forEach(this.addOwner.bind(this));  
    this.ownerFile()
  }

  public addOwner(owner: Owner) {
    this.owners.push(`${owner.patterns} ${owner.owners?.join(' ')}`);
  }

  public ownerFile() {
    new TextFile(this.project, '.github/CODEOWNERS', {
      lines: this.owners
    })
  }
}