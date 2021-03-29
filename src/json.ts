import { IResolver } from './file';
import { ObjectFile, ObjectFileOptions } from './object-file';
import { Project } from './project';

/**
 * Options for `JsonFile`.
 */
export interface JsonFileOptions extends ObjectFileOptions {}

/**
 * Represents a JSON file.
 */
export class JsonFile extends ObjectFile {
  constructor(project: Project, filePath: string, options: JsonFileOptions) {
    super(project, filePath, options);

    if (!options.obj) {
      throw new Error('"obj" cannot be undefined');
    }
  }

  protected synthesizeContent(resolver: IResolver): string | undefined {
    const json = super.synthesizeContent(resolver);
    if (!json) {
      return undefined;
    }

    const sanitized = JSON.parse(json);

    if (this.marker) {
      sanitized['//'] = JsonFile.PROJEN_MARKER;
    }

    return `${JSON.stringify(sanitized, undefined, 2)}\n`;
  }
}
