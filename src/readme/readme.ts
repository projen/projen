import { Component } from '../component';
import { Project } from '../project';
import { TextFile } from '../textfile';
import {
  SummaryOptions, CodeOfConductOptions, ContributingOptions, ChangelogOptions, ReadmeLicenseOptions,
  RoadmapOptions, VisionOptions, UsageOptions, AuthorOptions, BadgeOptions, ReadmeSections,
  ReadmeOptions,
} from './model';

/**
 * Represents a README.md file.
 *
 */
export class Readme extends Component {
  public filename: string;

  public tagLine: string;
  public summary: SummaryOptions;
  public codeOfConduct: CodeOfConductOptions;
  public contributing: ContributingOptions;
  public changelog: ChangelogOptions;
  public license: ReadmeLicenseOptions;
  public roadmap: RoadmapOptions;
  public vision: VisionOptions;
  public usage: UsageOptions;
  public author: AuthorOptions;
  public badges: Array<BadgeOptions>;

  public sectionOrder: ReadmeSections[];

  /**
   *
   * @param project
   * @param options
   */
  constructor(project: Project, options?: ReadmeOptions) {
    super(project);

    // Init & defaults
    this.filename = options?.filename ?? 'README.md';
    this.tagLine = options?.tagLine ?? project.name;
    this.summary = options?.summary ?? { filename: 'SUMMARY.md', link: true };
    this.codeOfConduct = options?.codeOfConduct ?? { filename: 'CODE_OF_CONDUCT.md', link: true };
    this.contributing = options?.contributing ?? { filename: 'CONTRIBUTING.md', link: true };
    this.changelog = options?.changelog ?? { link: true };
    this.license = options?.license ?? { link: true };
    this.roadmap = options?.roadmap ?? { filename: 'ROADMAP.md', link: true }; // , projects: true };
    this.vision = options?.vision ?? { filename: 'VISION.md', link: true };
    this.usage = options?.usage ?? { filename: 'USAGE.md', link: true };
    this.author = options?.author ?? { filename: 'AUTHOR.md', link: true };
    this.badges = [];

    // Order of Sections (those not present at resolve time will be skipped)
    this.sectionOrder = [
      ReadmeSections.TAG_LINE,
      ReadmeSections.TOC,
      ReadmeSections.SUMMARY,
      ReadmeSections.USAGE,
      ReadmeSections.CODE_OF_CONDUCT,
      ReadmeSections.CONTRIBUTING,
      ReadmeSections.CHANGELOG,
      ReadmeSections.LICENSE,
      ReadmeSections.ROADMAP,
      ReadmeSections.VISION,
      ReadmeSections.AUTHOR,
      ReadmeSections.BADGES,
    ];
  }

  /**
   *
   */
  public synthesize() {
    new TextFile(this.project, this.filename, {
      lines: this._renderReadme(),
    });
  }

  /**
   *
   * @internal
   */
  private _renderReadme(): string[] {
    const lines: string[] = [];

    for (const section of this.sectionOrder) {
      switch (section) {
        case ReadmeSections.TAG_LINE:
          lines.push(this._renderReadmeTagLine() + '\n');
          break;
        case ReadmeSections.TOC:
          lines.push(this._renderReadmeToc() + '\n');
          break;
        case ReadmeSections.SUMMARY:
          lines.push(this._renderReadmeSummary() + '\n');
          break;
        case ReadmeSections.USAGE:
          lines.push(this._renderReadmeUsage() + '\n');
          break;
        case ReadmeSections.CODE_OF_CONDUCT:
          lines.push(this._renderCodeOfConduct() + '\n');
          break;
        case ReadmeSections.CONTRIBUTING:
          lines.push(this._renderReadmeContributing() + '\n');
          break;
        case ReadmeSections.CHANGELOG:
          lines.push(this._renderReadmeChangelog() + '\n');
          break;
        case ReadmeSections.LICENSE:
          lines.push(this._renderReadmeLicense() + '\n');
          break;
        case ReadmeSections.ROADMAP:
          lines.push(this._renderReadmeRoadmap() + '\n');
          break;
        case ReadmeSections.VISION:
          lines.push(this._renderReadmeVision() + '\n');
          break;
        case ReadmeSections.AUTHOR:
          lines.push(this._renderReadmeAuthor() + '\n');
          break;
        case ReadmeSections.BADGES:
          lines.push(this._renderReadmeBadges() + '\n');
      }
    }
    lines.push('\n');

    return lines;
  }

  /**
   *
   * @internal
   */
  private _renderReadmeTagLine(): string {
    return `${this.tagLine}`;
  }

  /**
   *
   * @internal
   */
  private _renderReadmeToc(): string {
    let lines: string[] = [];

    lines.push(`# ${this.project.name}`);
    lines.push(`- [${this.project.name}](#${this.project.name})`);

    for (const section in this.sectionOrder) {
      lines.push(`  - [${section}](#${section})`);
    }

    return lines.join('\n');
  }

  /**
   *
   * @internal
   */
  private _renderReadmeSummary(): string {
    let lines: string[] = [];

    lines.push('## Summary');
    lines.push();
    if (this.summary.link) {
      lines.push(`[SUMMARY](${this.summary.filename}`);
    }
    lines.push((this.summary.lines ?? []).join('\n'));

    return lines.join('\n');
  }

  /**
   *
   * @internal
   */
  private _renderReadmeUsage(): string {
    let lines: string[] = [];

    lines.push('## Usage');
    lines.push();
    if (this.usage.link) {
      lines.push(`[USAGE](${this.summary.filename}`);
    }
    lines.push((this.usage.lines ?? []).join('\n'));

    return lines.join('\n');
  }

  /**
   *
   * @internal
   */
  private _renderCodeOfConduct(): string {
    let lines: string[] = [];

    lines.push('## Code of Conduct');
    lines.push();
    if (this.codeOfConduct.link) {
      lines.push(`[Code of Conduct](${this.codeOfConduct.filename}`);
    }
    lines.push((this.codeOfConduct.lines ?? []).join('\n'));

    return lines.join('\n');
  }

  /**
   *
   * @internal
   */
  private _renderReadmeContributing(): string {
    let lines: string[] = [];

    lines.push('## Contributing');
    lines.push();
    if (this.contributing.link) {
      lines.push(`[Contributing](${this.contributing.filename}`);
    }
    lines.push((this.contributing.lines ?? []).join('\n'));

    return lines.join('\n');
  }

  /**
   *
   * @internal
   */
  private _renderReadmeChangelog(): string {
    let lines: string[] = [];

    lines.push('## Changelog\n');
    if (this.changelog.link) {
      lines.push('[CHANGELOG](CHANGELOG.md)');
    }

    return lines.join('\n');
  }

  /**
   *
   * @internal
   */
  private _renderReadmeLicense(): string {
    let lines: string[] = [];

    lines.push('## License\n');
    if (this.license.link) {
      lines.push('[LICENSE](LICENSE.md)');
    }

    return lines.join('\n');
  }

  /**
   *
   * @internal
   */
  private _renderReadmeRoadmap(): string {
    let lines: string[] = [];

    lines.push('## Roadmap');
    lines.push();
    if (this.roadmap.link) {
      lines.push(`[ROADMAP](${this.roadmap.filename})`);
    }
    lines.push((this.roadmap.lines ?? []).join('\n'));

    return lines.join('\n');
  }

  /**
   *
   * @internal
   */
  private _renderReadmeVision(): string {
    let lines: string[] = [];

    lines.push('## Vision');
    lines.push();
    if (this.vision.link) {
      lines.push(`[VISION](${this.vision.filename})`);
    }
    lines.push((this.vision.lines ?? []).join('\n'));

    return lines.join('\n');
  }

  /**
   *
   * @internal
   */
  private _renderReadmeAuthor(): string {
    let lines: string[] = [];

    lines.push('## Author');
    lines.push();
    if (this.author.link) {
      lines.push(`[VISION](${this.author.filename})`);
    }
    lines.push((this.author.lines ?? []).join('\n'));

    return lines.join('\n');
  }

  /**
   *
   * @internal
   */
  private _renderReadmeBadges(): string {
    let lines: string[] = [];

    lines.push('## Badges');
    lines.push();

    return lines.join('\n');
  }
}