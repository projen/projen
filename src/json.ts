import { IResolver } from './file';
import { ObjectBaseFile, ObjectBaseFileOptions } from './object-file';
import { Project } from './project';

/**
 * Options for `JsonFile`.
 */
export interface JsonFileOptions extends ObjectBaseFileOptions {
  /**
   * Adds the projen marker as a "JSON-comment" to the root object.
   *
   * @default false
   */
  readonly marker?: boolean;
}

/**
 * Represents a JSON file.
 */
export class JsonFile extends ObjectBaseFile {

  /**
   * Indicates if the projen marker JSON-comment will be added to the output
   * object.
   */
  public readonly marker: boolean;

  constructor(project: Project, filePath: string, options: JsonFileOptions) {
    super(project, filePath, options);

    if (!options.obj) {
      throw new Error('"obj" cannot be undefined');
    }

    this.marker = options.marker ?? false;
  }

  protected synthesizeContent(resolver: IResolver) {
    // sanitize object references by serializing and deserializing to JSON
    const sanitized = JSON.parse(super.synthesizeContent(resolver));

    if (this.marker) {
      sanitized['//'] = JsonFile.PROJEN_MARKER;
    }

    return JSON.stringify(sanitized, undefined, 2);
  }
}
