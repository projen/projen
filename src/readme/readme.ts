import { Component } from '../component';
import { Project } from '../project';
import { TextFile } from '../textfile';
import { Badge, BadgeOptions } from './badge';
import {
  AuthorOptions,
  ChangelogOptions,
  CodeOfConductOptions,
  ContributingOptions,
  ReadmeLicenseOptions,
  ReadmeOptions,
  ReadmeSection,
  RoadmapOptions,
  SummaryOptions,
  UsageOptions,
  VisionOptions,
} from './model';

/**
 * Represents a README.md file.
 *
 */
export class Readme extends Component {
  public filename: string;

  public toc: boolean;
  public tagLine: string;
  public badges: Array<Badge>;
  public summary: SummaryOptions;
  public codeOfConduct: CodeOfConductOptions;
  public contributing: ContributingOptions;
  public changelog: ChangelogOptions;
  public license: ReadmeLicenseOptions;
  public roadmap: RoadmapOptions;
  public vision: VisionOptions;
  public usage: UsageOptions;
  public author: AuthorOptions;

  public sections: ReadmeSection[];

  /**
   *
   * @param project
   * @param options
   */
  constructor(project: Project, options?: ReadmeOptions) {
    super(project);

    // Init & defaults
    this.filename = options?.filename ?? 'README.md';
    this.toc = options?.toc ?? false;
    this.tagLine = options?.tagLine ?? project.name;
    this.badges = [];
    this.summary = options?.summary ?? { filename: 'SUMMARY.md', link: true };
    this.codeOfConduct = options?.codeOfConduct ?? { filename: 'CODE_OF_CONDUCT.md', link: true };
    this.contributing = options?.contributing ?? { filename: 'CONTRIBUTING.md', link: true };
    this.changelog = options?.changelog ?? { link: true };
    this.license = options?.license ?? { link: true };
    this.roadmap = options?.roadmap ?? { filename: 'ROADMAP.md', link: true }; // , projects: true };
    this.vision = options?.vision ?? { filename: 'VISION.md', link: true };
    this.usage = options?.usage ?? { filename: 'USAGE.md', link: true };
    this.author = options?.author ?? { filename: 'AUTHOR.md', link: true };

    // Order of Sections (those not present at resolve time will be skipped)
    this.sections = [
      ReadmeSection.TAG_LINE,
      ReadmeSection.BADGES,
      ReadmeSection.TOC,
      ReadmeSection.SUMMARY,
      ReadmeSection.USAGE,
      ReadmeSection.CODE_OF_CONDUCT,
      ReadmeSection.CONTRIBUTING,
      ReadmeSection.CHANGELOG,
      ReadmeSection.LICENSE,
      ReadmeSection.ROADMAP,
      ReadmeSection.VISION,
      ReadmeSection.AUTHOR,
    ];
  }

  /**
   *
   * @param options
   */
  public addBadge(options: BadgeOptions) {
    const badge = new Badge(this.project, options);
    this.badges.push(badge);
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

    for (const section of this.sections) {
      switch (section) {
        case ReadmeSection.TAG_LINE:
          lines.push(this._renderReadmeTagLine() + '\n');
          break;
        case ReadmeSection.BADGES:
          lines.push(this._renderReadmeBadges() + '\n');
          break;
        case ReadmeSection.TOC:
          lines.push(this._renderReadmeToc() + '\n');
          break;
        case ReadmeSection.SUMMARY:
          lines.push(this._renderReadmeSummary() + '\n');
          break;
        case ReadmeSection.USAGE:
          lines.push(this._renderReadmeUsage() + '\n');
          break;
        case ReadmeSection.CODE_OF_CONDUCT:
          lines.push(this._renderCodeOfConduct() + '\n');
          break;
        case ReadmeSection.CONTRIBUTING:
          lines.push(this._renderReadmeContributing() + '\n');
          break;
        case ReadmeSection.CHANGELOG:
          lines.push(this._renderReadmeChangelog() + '\n');
          break;
        case ReadmeSection.LICENSE:
          lines.push(this._renderReadmeLicense() + '\n');
          break;
        case ReadmeSection.ROADMAP:
          lines.push(this._renderReadmeRoadmap() + '\n');
          break;
        case ReadmeSection.VISION:
          lines.push(this._renderReadmeVision() + '\n');
          break;
        case ReadmeSection.AUTHOR:
          lines.push(this._renderReadmeAuthor() + '\n');
          break;
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
    return `# ${this.tagLine}`;
  }

  /**
   *
   * @internal
   */
  private _renderReadmeBadges(): string {
    let lines: string[] = [];

    lines.push('## Badges\n');
    for (const badge of this.badges) {
      lines.push(badge.toMarkDown());
    }

    return lines.join('\n');
  }

  /**
   *
   * @internal
   */
  private _renderReadmeToc(): string {
    let lines: string[] = [];

    if (this.toc) {
      lines.push(`# ${this.project.name}`);
      lines.push(`- [${this.project.name}](#${this.project.name})`);

      for (const section in this.sections) {
        lines.push(`  - [${section}](#${section})`);
      }
    }

    return lines.join('\n');
  }

  /**
   *
   * @internal
   */
  private _renderReadmeSummary(): string {
    let lines: string[] = [];

    lines.push('## Summary\n');
    if (this.summary.link) {
      lines.push(`[SUMMARY](${this.summary.filename})`);
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

    lines.push('## Getting Started\n');
    if (this.usage.link) {
      lines.push('[Documentation Site](./doc/index.md)');
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

    lines.push('## Code of Conduct\n');
    if (this.codeOfConduct.link) {
      lines.push(`[Code of Conduct](${this.codeOfConduct.filename})`);
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

    lines.push('## Contributing\n');
    if (this.contributing.link) {
      lines.push(`[Contributing](${this.contributing.filename})`);
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
      lines.push('Distributed under the XXXNodeProjectXXX license');
    }

    return lines.join('\n');
  }

  /**
   *
   * @internal
   */
  private _renderReadmeRoadmap(): string {
    let lines: string[] = [];

    lines.push('## Roadmap\n');
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

    lines.push('## Vision\n');
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

    lines.push('## Author\n');
    if (this.author.link) {
      lines.push(`[Author](${this.author.filename})`);
    }
    lines.push((this.author.lines ?? []).join('\n'));

    return lines.join('\n');
  }
}