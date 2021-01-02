import { Component } from '../component';
import { Project } from '../project';

/**
 *
 */
export interface BadgeOptions {

  /**
   * Name of the badge.
   */
  readonly name: string;

  /**
   * Alt Text To display.
   *
   * @default - `name`
   */
  readonly altText?: string;

  /**
   * Image Url.
   *
   */
  readonly imgUrl: string;

  /**
   * The Url.
   */
  readonly url: string;
}

/**
 *
 */
export class Badge extends Component {
  private name: string;
  private altText?: string;
  private imgUrl?: string;
  private url?: string;

  constructor(project: Project, options: BadgeOptions) {
    super(project);

    this.name = options.name;
    this.altText = options.altText ?? this.name;
    this.imgUrl = options.imgUrl;
    this.url = options.url;
  }

  public toMarkDown(): string {
    return `![${this.altText ?? this.name})](${this.imgUrl})](${this.url})`;
  }
}