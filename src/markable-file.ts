/**
 * Options for files that include the Projen marker.
 */
export interface MarkableFileOptions {
  /**
   * Adds the projen marker to the file.
   *
   * @default false
   */
  readonly marker?: boolean;
}

export interface IMarkableFile {
  /**
   * Adds the projen marker to the file.
   *
   * @default false
   */
  readonly marker: boolean;
}