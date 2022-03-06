import { Construct } from "constructs";
import { create as createxml } from "xmlbuilder2";
import { IResolver } from "./file";
import { ObjectFile, ObjectFileOptions } from "./object-file";

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
    scope: Construct,
    filePath: string,
    options: XmlFileOptions = {}
  ) {
    super(scope, filePath, options);
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
