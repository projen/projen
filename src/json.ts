import { IResolver } from './file';
import { MarkableFileOptions, IMarkableFile } from './markable-file';
import { ObjectFile, ObjectFileOptions } from './object-file';
import { Project } from './project';

/**
 * Options for `JsonFile`.
 */
export interface JsonFileOptions extends ObjectFileOptions, MarkableFileOptions {}

/**
 * Represents a JSON file.
 */
export class JsonFile extends ObjectFile implements IMarkableFile {

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

  protected synthesizeContent(resolver: IResolver): string | undefined {
    const json = super.synthesizeContent(resolver);

    if (!json) {
      return undefined;
    }

    // sanitize object references by serializing and deserializing to JSON
    const sanitized = JSON.parse(json);

    if (this.marker) {
      sanitized['//'] = JsonFile.PROJEN_MARKER;
    }

    return JSON.stringify(sanitized, undefined, 2);
  }
}
