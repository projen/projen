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
export class Readme {
  public filename: string;

  public toc: boolean;
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
  public badges: BadgeOptions[];

  public sectionOrder: ReadmeSections[];

  /**
   *
   * @param project
   * @param options
   */
  constructor(project: Project, options?: ReadmeOptions) {

    // Init & defaults
    this.filename = options?.filename ?? 'README.md';
    this.toc = options?.toc ?? true;
    this.tagLine = options?.tagLine ?? project.name;
    this.summary = options?.summary ?? { filename: 'SUMMARY.md', link: true };
    this.codeOfConduct = options?.codeOfConduct ?? { filename: 'CODE_OF_CONDUCT.md', link: true };
    this.contributing = options?.contributing ?? { filename: 'CONTRIBUTING.md', link: true };
    this.changelog = options?.changelog ?? { link: true };
    this.license = options?.license ?? { link: true };
    this.roadmap = options?.roadmap ?? { filename: 'ROADMAP.md', link: true };
    this.vision = options?.vision ?? { filename: 'VISION.md', link: true };
    this.usage = options?.usage ?? { filename: 'USAGE.md', link: true };
    this.author = options?.author ?? { filename: 'AUTHOR.md', link: true };
    this.badges = [];

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

    // Render content
    this._renderReadme(project);
  }

  /**
   *
   * @internal
   */
  private _renderReadme(project: Project) {
    new TextFile(project, this.filename, {
      lines: this._constructReadme(project),
    });
  }

  private _constructReadme(_project: Project): string[] {
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
    return `# ${this.tagLine}`;
  }

  /**
   *
   * @internal
   */
  private _renderReadmeToc(): string {
    return '## Table of Contents';
  }

  /**
   *
   * @internal
   */
  private _renderReadmeSummary(): string {
    return '## Summary';
  }

  /**
   *
   * @internal
   */
  private _renderReadmeUsage(): string {
    return '## Usage';
  }

  /**
   *
   * @internal
   */
  private _renderCodeOfConduct(): string {
    return '## Code of Conduct';
  }

  /**
   *
   * @internal
   */
  private _renderReadmeContributing(): string {
    return '## Contributing';
  }

  /**
   *
   * @internal
   */
  private _renderReadmeChangelog(): string {
    return '## Changelog';
  }

  /**
   *
   * @internal
   */
  private _renderReadmeLicense(): string {
    return '## License';
  }

  /**
   *
   * @internal
   */
  private _renderReadmeRoadmap(): string {
    return '## Roadmap';
  }

  /**
   *
   * @internal
   */
  private _renderReadmeVision(): string {
    return '## Vision';
  }

  /**
   *
   * @internal
   */
  private _renderReadmeAuthor(): string {
    return '## Author';
  }

  /**
   *
   * @internal
   */
  private _renderReadmeBadges(): string {
    return '## Badges';
  }
}