/**
 * Options for files that may include the Projen marker.
 */
export interface MarkableFileOptions {
  /**
   * Adds the projen marker to the file.
   *
   * @default true
   */
  readonly marker?: boolean;
}

/**
 * Files that may include the Projen marker.
 */
export interface IMarkableFile {
  /**
   * Adds the projen marker to the file.
   *
   * @default true
   */
  readonly marker: boolean;
}