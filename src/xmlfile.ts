import * as path from "path";
import { Construct, IConstruct } from "constructs";
import { create as createxml } from "xmlbuilder2";
import { IResolver } from "./file";
import { ObjectFile, ObjectFileOptions } from "./object-file";
import { Project } from "./project";

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
  /**
   * Finds an XML file by name in the given scope.
   * @param filePath The file path. If this path is relative, it will be resolved
   * from the root of the nearest project.
   */
  public static tryFindXmlFile(
    scope: IConstruct,
    filePath: string
  ): XmlFile | undefined {
    const isXmlFile = (c: IConstruct): c is XmlFile => c instanceof XmlFile;
    const absolutePath = path.isAbsolute(filePath)
      ? filePath
      : path.resolve(Project.ofProject(scope).outdir, filePath);
    return scope.node
      .findAll()
      .filter(isXmlFile)
      .find((file) => file.absolutePath === absolutePath);
  }

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
