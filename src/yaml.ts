import { Construct } from "constructs";
import * as YAML from "yaml";
import { IResolver } from "./file";
import { ObjectFile, ObjectFileOptions } from "./object-file";

/**
 * Options for `JsonFile`.
 */
export interface YamlFileOptions extends ObjectFileOptions {
  /**
   * Maximum line width (set to 0 to disable folding).
   *
   * @default - 0
   */
  readonly lineWidth?: number;
}

/**
 * Represents a YAML file.
 */
export class YamlFile extends ObjectFile {
  /**
   * Maximum line width (set to 0 to disable folding).
   */
  public lineWidth: number;

  constructor(scope: Construct, filePath: string, options: YamlFileOptions) {
    super(scope, filePath, options);
    this.lineWidth = options.lineWidth ?? 0;
  }

  protected synthesizeContent(resolver: IResolver): string | undefined {
    const json = super.synthesizeContent(resolver);
    if (!json) {
      return undefined;
    }

    return [
      ...(this.marker ? [`# ${this.marker}`] : []),
      "",
      YAML.stringify(JSON.parse(json), {
        indent: 2,
        lineWidth: this.lineWidth,
      }),
    ].join("\n");
  }
}
