import { Component } from '../component';
import { FileBase } from '../file';
import { Project } from '../project';
import { Dependabot, DependabotOptions } from './dependabot';
import {CodeOwners, CodeOwnersProps } from './codeowners'
import { Mergify } from './mergify';
import { PullRequestTemplate } from './pr-template';
import { GithubWorkflow } from './workflows';

export interface GitHubOptions {
  /**
   * Whether mergify should be enabled on this repository or not.
   *
   * @default true
   */
  readonly mergify?: boolean;

  readonly codeOwners?: CodeOwnersProps
}

export class GitHub extends Component {
  /**
   * The `Mergify` configured on this repository. This is `undefined` if Mergify
   * was not enabled when creating the repository.
   */
  public readonly mergify?: Mergify;

  /**
   * The .gitattributes file for this repository.
   */
  private readonly gitattributes: GitattributesFile;

  public constructor(project: Project, options: GitHubOptions) {
    super(project);

    this.gitattributes = new GitattributesFile(project);

    // Contents  of the .projen/ directory are generated by projen
    this.annotateGenerated('/.projen/');
    // The .gitattributes file itself is generated
    this.annotateGenerated(`/${this.gitattributes.path}`);

    if (!! options.codeOwners) {
      new CodeOwners(this, options.codeOwners )
    }

    
    

    if (options.mergify ?? true) {
      this.mergify = new Mergify(this);
    }
  }

  public addWorkflow(name: string) {
    return new GithubWorkflow(this, name);
  }

  public addPullRequestTemplate(...content: string[]) {
    return new PullRequestTemplate(this, { lines: content });
  }

  public addDependabot(options?: DependabotOptions) {
    return new Dependabot(this, options);
  }


  /**
   * Marks the provided file(s) as being generated. This is achieved using the
   * github-linguist attributes. Generated files do not count against the
   * repository statistics and language breakdown.
   *
   * @param glob the glob pattern to match (could be a file path).
   *
   * @see https://github.com/github/linguist/blob/master/docs/overrides.md
   */
  public annotateGenerated(glob: string): void {
    this.gitattributes.addAttributes(glob, 'linguist-generated');
  }
}

class GitattributesFile extends FileBase {
  private readonly attributes = new Map<string, Set<string>>();

  public constructor(project: Project) {
    super(project, '.gitattributes');
  }

  public addAttributes(glob: string, ...attributes: readonly string[]) {
    if (!this.attributes.has(glob)) {
      this.attributes.set(glob, new Set());
    }
    const set = this.attributes.get(glob)!;
    for (const attribute of attributes) {
      set.add(attribute);
    }
  }

  protected synthesizeContent(): string | undefined {
    // We can assume the file map is never empty.
    const entries = Array.from(this.attributes.entries())
      .sort(([l], [r]) => l.localeCompare(r));

    const maxLen = Math.max(...entries.map(([glob]) => glob.length));
    return [
      `# ${FileBase.PROJEN_MARKER}`,
      '',
      ...entries.map(([name, attributes]) => `${name.padEnd(maxLen, ' ')}\t${Array.from(attributes).join(' ')}`),
    ].join('\n');
  }
}
