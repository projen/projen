import { IConstruct } from "constructs";
import * as YAML from "yaml";
import { IResolver } from "./file";
import { ObjectFile, ObjectFileOptions } from "./object-file";

/**
 * Options for `YamlFile`.
 */
export interface YamlFileOptions extends ObjectFileOptions {
  /**
   * Maximum line width (set to 0 to disable folding).
   *
   * @default 0 - (no line folding)
   */
  readonly lineWidth?: number;

  /**
   * The number of spaces to use when indenting code.
   *
   * @default 2
   */
  readonly indent?: number;
}

/**
 * Represents a YAML file.
 */
export class YamlFile extends ObjectFile {
  /**
   * Maximum line width (set to 0 to disable folding).
   */
  public readonly lineWidth: number;

  /**
   * The number of spaces to use when indenting code.
   */
  public readonly indent: number;

  /**
   * Array of additional tags to include in the schema.
   * @internal
   */
  private readonly customTags: YAML.Tags = [];

  constructor(scope: IConstruct, filePath: string, options: YamlFileOptions) {
    super(scope, filePath, options);
    this.lineWidth = options.lineWidth ?? 0;
    this.indent = options.indent ?? 2;
  }

  protected synthesizeContent(resolver: IResolver): string | undefined {
    const yamlResolver: IResolver = {
      resolve(value, options?): any {
        // if (referenceTag.identify?.(value)) {
        //   return value;
        // }

        return resolver.resolve(value, {
          ...options,
          keepObjects: true,
        });
      },
    };
    return super.synthesizeContent(yamlResolver);
  }

  protected stringifyContent(obj: object | undefined): string | undefined {
    let yaml = YAML.stringify(obj, {
      indent: this.indent,
      lineWidth: this.lineWidth,
      customTags: this.customTags,
    });

    return [...(this.marker ? [`# ${this.marker}`] : []), "", yaml].join("\n");
  }

  /**
   * Adds additional tags to include in the schema.
   * @internal
   */
  public _useCustomTags(tags: YAML.Tags) {
    this.customTags.push(...tags);
  }
}
