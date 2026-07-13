import { create as createxml } from "xmlbuilder2";
import type { IResolver } from "./file";
import type { ObjectFileOptions } from "./object-file";
import { ObjectFile } from "./object-file";
import type { Project } from "./project";

/**
 * Options for `XmlFile`.
 */
export interface XmlFileOptions extends ObjectFileOptions {}

/**
 * Represents an XML file.
 *
 * Objects passed in will be synthesized using the npm "xml" library.
 * @see https://www.npmjs.com/package/xml
 */
export class XmlFile extends ObjectFile {
  constructor(
    project: Project,
    filePath: string,
    options: XmlFileOptions = {},
  ) {
    super(project, filePath, options);
  }

  protected synthesizeContent(resolver: IResolver): string | undefined {
    const obj = super.synthesizeContent(resolver);
    if (!obj) {
      return undefined;
    }

    const xmlString = createxml({ encoding: "UTF-8" }, obj).end({
      prettyPrint: true,
      indent: " ".repeat(4),
    });

    return [
      xmlString,
      ...(this.marker ? [`<!-- ${this.marker} -->`] : []),
    ].join("\n");
  }
}
