import { create as createxml } from 'xmlbuilder2';
import { FileBase, FileBaseOptions, IResolver } from './file';
import { Project } from './project';

/**
 * Options for `XmlFile`.
 */
export interface XmlFileOptions extends FileBaseOptions {
  /**
   * The object that represents the XML contents (see
   * https://www.npmjs.com/package/xml) for details.
   *
   * @see https://www.npmjs.com/package/xml
   * @default {}
   */
  readonly obj?: any;
}

/**
 * Represents an XML file.
 */
export class XmlFile extends FileBase {
  /**
   * The object represents the XML file.
   *
   * @see https://www.npmjs.com/package/xml
   */
  public readonly obj: any;

  constructor(project: Project, filePath: string, options: XmlFileOptions = {}) {
    super(project, filePath);

    this.obj = options.obj ?? { };
  }

  protected synthesizeContent(resolver: IResolver): string | undefined {
    const obj = resolver.resolve(this.obj);
    return createxml({ encoding: 'UTF-8' }, obj).end({
      prettyPrint: true,
      indent: ' '.repeat(4),
    });
  }
}