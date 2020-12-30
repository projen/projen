import { Project } from '../project';
import { TextFile } from '../textfile';
import {
  SummaryOptions, CodeOfConductOptions, ContributingOptions, ChangelogOptions, ReadmeLicenseOptions,
  RoadmapOptions, VisionOptions, UsageOptions, AuthorOptions, BadgeOptions, ReadmeSections,
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
    this.tagLine = options?.tagLine ?? 'my project';
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
    let lines: string[];
    lines = [];

    for (const section of this.sectionOrder) {
      switch (section) {
        case ReadmeSections.TAG_LINE:
          lines.push(this._renderReadmeTagLine());
          break;
      }
    }
    lines.push('\n');

    new TextFile(project, this.filename, {
      lines: lines,
    });
  }

  /**
   *
   * @internal
   */
  private _renderReadmeTagLine(): string {
    return this.tagLine;
  }
}